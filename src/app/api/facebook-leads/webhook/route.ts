/**
 * Facebook Lead Ads Webhook
 *
 * Meta hits https://jschoicegroup.com.au/admin/facebook-leads
 * next.config.ts rewrites that path → this route when:
 *   • GET  — query contains ?hub.mode  (verification handshake)
 *   • POST — header contains x-hub-signature-256  (live lead delivery)
 *
 * GET  /api/facebook-leads/webhook  — Meta webhook verification
 * POST /api/facebook-leads/webhook  — Receive lead payloads
 */

import { NextRequest, NextResponse } from 'next/server';
import { createHmac } from 'crypto';
import { createServerClient } from '@/lib/supabase-admin';
import { sendFacebookLeadAdminEmail, sendFacebookLeadClientEmail } from '@/lib/email';

// ─── Types ────────────────────────────────────────────────────────────────────

interface FieldData {
    name: string;
    values: string[];
}

interface LeadgenValue {
    leadgen_id: string;
    page_id: string;
    form_id: string;
    ad_id?: string;
    ad_name?: string;
    adset_id?: string;
    adset_name?: string;
    campaign_id?: string;
    campaign_name?: string;
}

interface WebhookChange {
    field: string;
    value: LeadgenValue;
}

interface WebhookEntry {
    id: string;
    time: number;
    changes: WebhookChange[];
}

interface WebhookBody {
    object: string;
    entry: WebhookEntry[];
}

interface GraphLeadResponse {
    id: string;
    created_time?: string;
    field_data: FieldData[];
    form_id?: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function extractField(fieldData: FieldData[], fieldName: string): string | null {
    const field = fieldData.find(
        (f) => f.name.toLowerCase() === fieldName.toLowerCase()
    );
    return field?.values?.[0] ?? null;
}

/**
 * Verify the x-hub-signature-256 header Meta sends on every POST.
 * Uses FACEBOOK_APP_SECRET from env.
 */
function verifySignature(rawBody: string, signatureHeader: string | null): boolean {
    const secret = process.env.FACEBOOK_APP_SECRET;
    if (!secret || !signatureHeader) return false;

    const [algo, digest] = signatureHeader.split('=');
    if (algo !== 'sha256') return false;

    const expected = createHmac('sha256', secret).update(rawBody).digest('hex');
    // Constant-time compare to prevent timing attacks
    return expected.length === digest.length &&
        Buffer.from(expected).equals(Buffer.from(digest));
}

async function fetchLeadFromGraph(leadgenId: string): Promise<GraphLeadResponse | null> {
    const token = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;
    if (!token) {
        console.error('FACEBOOK_PAGE_ACCESS_TOKEN is not set');
        return null;
    }

    // Only request fields that actually exist on the Lead object
    // ad/campaign/page metadata comes from the webhook payload, not Graph API
    const fields = 'id,created_time,field_data,form_id';
    const graphVersion = process.env.FACEBOOK_GRAPH_VERSION || 'v21.0';
    const url = `https://graph.facebook.com/${graphVersion}/${leadgenId}?fields=${fields}&access_token=${token}`;

    try {
        const res = await fetch(url);
        if (!res.ok) {
            const err = await res.text();
            console.error(`Graph API error for leadgen_id ${leadgenId}:`, err);
            return null;
        }
        return await res.json() as GraphLeadResponse;
    } catch (err) {
        console.error('Failed to fetch lead from Graph API:', err);
        return null;
    }
}

// ─── GET — Webhook verification ───────────────────────────────────────────────

export async function GET(request: NextRequest) {
    const params = request.nextUrl.searchParams;

    const mode      = params.get('hub.mode');
    const token     = params.get('hub.verify_token');
    const challenge = params.get('hub.challenge');

    const expectedToken = process.env.FACEBOOK_VERIFY_TOKEN ?? 'jschoiceleads';

    if (mode === 'subscribe' && token === expectedToken) {
        console.log('Facebook webhook verified successfully');
        return new NextResponse(challenge, { status: 200 });
    }

    console.warn('Facebook webhook verification failed — token mismatch or wrong mode');
    return new NextResponse('Forbidden', { status: 403 });
}

// ─── POST — Receive lead data ─────────────────────────────────────────────────

export async function POST(request: NextRequest) {
    // Read raw body text so we can verify the HMAC signature
    const rawBody = await request.text();

    // Validate signature — reject anything not from Meta
    const signature = request.headers.get('x-hub-signature-256');
    if (!verifySignature(rawBody, signature)) {
        console.warn('Facebook webhook: invalid signature — request rejected');
        return new NextResponse('Forbidden', { status: 403 });
    }

    let body: WebhookBody;
    try {
        body = JSON.parse(rawBody);
    } catch {
        // Malformed body — still ACK so Meta doesn't keep retrying
        return new NextResponse('EVENT_RECEIVED', { status: 200 });
    }

    if (body.object !== 'page') {
        return new NextResponse('EVENT_RECEIVED', { status: 200 });
    }

    const supabase = createServerClient();

    for (const entry of body.entry ?? []) {
        for (const change of entry.changes ?? []) {
            if (change.field !== 'leadgen') continue;

            const {
                leadgen_id,
                page_id,
                form_id,
                ad_id,
                ad_name,
                campaign_id,
                campaign_name,
            } = change.value;

            console.log(`Processing Facebook lead: leadgen_id=${leadgen_id}, page_id=${page_id}`);

            // Skip duplicate leads (Meta retries on timeout)
            const { data: existing } = await supabase
                .from('facebook_leads')
                .select('id')
                .ilike('notes', `%Leadgen ID: ${leadgen_id}%`)
                .maybeSingle();

            if (existing) {
                console.log(`Duplicate lead skipped: leadgen_id=${leadgen_id}`);
                continue;
            }

            // Fetch full lead details from Graph API
            const leadData = await fetchLeadFromGraph(leadgen_id);

            if (!leadData) {
                console.error(`Could not fetch lead details for leadgen_id=${leadgen_id}`);
                continue;
            }

            const fieldData = leadData.field_data ?? [];

            // Facebook forms use various field name conventions — check common variants
            const fullName =
                (
                    extractField(fieldData, 'full_name') ??
                    extractField(fieldData, 'name') ??
                    [
                        extractField(fieldData, 'first_name'),
                        extractField(fieldData, 'last_name'),
                    ].filter(Boolean).join(' ')
                ) || 'Unknown';

            const email = extractField(fieldData, 'email') ?? extractField(fieldData, 'email_address');
            const phone = extractField(fieldData, 'phone_number') ?? extractField(fieldData, 'phone');

            const baseRecord = {
                full_name:     fullName,
                email:         email,
                phone:         phone,
                campaign_id:   campaign_id   ?? null,
                campaign_name: campaign_name ?? null,
                ad_id:         ad_id         ?? null,
                ad_name:       ad_name       ?? null,
                form_id:       form_id       ?? leadData.form_id ?? null,
                form_name:     null,
                status:        'new' as const,
                notes:         `Leadgen ID: ${leadgen_id} | Page ID: ${page_id}`,
            };

            // Try with leadgen_id column first; fall back without it if column doesn't exist yet
            let savedLead: { id: string; created_at: string } | null = null;
            let error;

            const result = await supabase
                .from('facebook_leads')
                .insert({ ...baseRecord, leadgen_id })
                .select('id, created_at')
                .single();

            if (result.error?.message?.includes('leadgen_id')) {
                // Column doesn't exist yet — insert without it
                const fallback = await supabase
                    .from('facebook_leads')
                    .insert(baseRecord)
                    .select('id, created_at')
                    .single();
                savedLead = fallback.data;
                error = fallback.error;
            } else {
                savedLead = result.data;
                error = result.error;
            }

            if (error) {
                console.error(`DB error saving facebook lead ${leadgen_id}:`, error);
            } else {
                console.log(`Saved facebook lead: ${fullName} (${email ?? 'no email'})`);

                const emailData = {
                    ...baseRecord,
                    id:         savedLead?.id,
                    created_at: savedLead?.created_at,
                };

                // Fire both emails — errors are caught inside each function
                void Promise.all([
                    sendFacebookLeadAdminEmail(emailData),
                    sendFacebookLeadClientEmail(emailData),
                ]);
            }
        }
    }

    // Always respond 200 — Meta will retry on anything else
    return new NextResponse('EVENT_RECEIVED', { status: 200 });
}
