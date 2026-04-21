/**
 * Facebook Leads API - Send Email
 *
 * POST /api/facebook-leads/[id]/email
 */

import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase-admin';
import { sendDirectEmail } from '@/lib/email';

interface RouteContext {
    params: Promise<{ id: string }>;
}

export async function POST(request: NextRequest, context: RouteContext) {
    try {
        const { id } = await context.params;
        const body = await request.json();
        const { subject, message } = body;

        if (!subject || !message) {
            return NextResponse.json(
                { success: false, error: 'Subject and message are required' },
                { status: 400 }
            );
        }

        const supabase = createServerClient();

        const { data: lead, error: fetchError } = await supabase
            .from('facebook_leads')
            .select('*')
            .eq('id', id)
            .single();

        if (fetchError || !lead) {
            return NextResponse.json({ success: false, error: 'Lead not found' }, { status: 404 });
        }

        if (!lead.email) {
            return NextResponse.json({ success: false, error: 'Lead has no email address' }, { status: 400 });
        }

        const emailResult = await sendDirectEmail(lead.email, subject, message, lead.full_name);

        if (!emailResult.success) {
            return NextResponse.json({ success: false, error: 'Failed to send email' }, { status: 500 });
        }

        // Update status from 'new' to 'contacted'
        if (lead.status === 'new') {
            await supabase
                .from('facebook_leads')
                .update({ status: 'contacted', updated_at: new Date().toISOString() })
                .eq('id', id);
        }

        return NextResponse.json({ success: true, message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email to facebook lead:', error);
        return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
    }
}
