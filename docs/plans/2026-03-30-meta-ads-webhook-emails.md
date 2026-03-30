# Meta Ads Webhook Email Notifications — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Send a client thank-you email and an admin notification email every time a Facebook Lead Ads lead arrives via webhook.

**Architecture:** The existing webhook handler at `src/app/api/facebook-leads/webhook/route.ts` already saves leads to Supabase. We add two new email functions to `src/lib/email.ts` (reusing the existing Resend client and brand style), then call both inside the webhook's `POST` handler after a successful DB insert. Email failures are caught silently so they never cause the webhook to return non-200.

**Tech Stack:** Next.js 15 App Router, TypeScript, Resend (`resend` npm package), Supabase

---

## Context: What Already Exists

- `src/lib/email.ts` — Resend email helpers; `COLORS`, `getResend()`, and fallback patterns already defined. Append new functions at the bottom.
- `src/app/api/facebook-leads/webhook/route.ts` — Line 216 inserts the lead. Lines 218-222 handle the result. **We edit lines 218-222 to also fire emails on success.**
- Required env vars already expected to be set: `RESEND_API_KEY`, `ADMIN_EMAIL`, `NEXT_PUBLIC_APP_URL`

---

## Task 1: Add `sendFacebookLeadClientEmail` to email.ts

**Files:**
- Modify: `src/lib/email.ts` (append at bottom of file)

**Step 1: Add the function**

Append the following to the end of `src/lib/email.ts`:

```typescript
// ─── Facebook Lead Emails ─────────────────────────────────────────────────────

export interface FacebookLeadEmailData {
  full_name: string;
  email: string | null;
  phone: string | null;
  campaign_name: string | null;
  ad_name: string | null;
  form_name: string | null;
  id?: string;
  created_at?: string;
}

/**
 * Send thank-you confirmation email to client after Facebook Lead Ad form submission.
 * Only called when lead.email is not null.
 */
export async function sendFacebookLeadClientEmail(lead: FacebookLeadEmailData): Promise<void> {
  if (!lead.email) return;

  const firstName = lead.full_name.split(' ')[0] || lead.full_name;
  const resend = getResend();

  try {
    const { error } = await resend.emails.send({
      from: 'JS Choice Group <info@jschoicegroup.com.au>',
      to: lead.email,
      subject: 'Thank you for your interest in JS Choice Group',
      html: generateFacebookLeadClientHtml(firstName),
    });

    if (!error) {
      console.log(`✅ Facebook lead client email sent to: ${lead.email}`);
      return;
    }

    // Fallback to Resend sandbox
    const { error: sandboxError } = await resend.emails.send({
      from: 'JS Choice Group <onboarding@resend.dev>',
      to: lead.email,
      subject: 'Thank you for your interest in JS Choice Group',
      html: generateFacebookLeadClientHtml(firstName),
    });

    if (!sandboxError) {
      console.log(`✅ Facebook lead client email sent via sandbox to: ${lead.email}`);
    } else {
      console.warn(`⚠️ Could not send client email to ${lead.email}:`, sandboxError);
    }
  } catch (err) {
    console.error('❌ sendFacebookLeadClientEmail failed:', err);
  }
}

function generateFacebookLeadClientHtml(firstName: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Thank You — JS Choice Group</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: ${COLORS.background}; color: ${COLORS.text};">
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: ${COLORS.white}; border-radius: 8px; overflow: hidden; margin-top: 20px; margin-bottom: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">

        <!-- Header -->
        <tr>
          <td align="center" style="padding: 40px 0; background-color: ${COLORS.primary}; background-image: linear-gradient(135deg, ${COLORS.primary} 0%, #9FA8E8 100%);">
            <h1 style="color: ${COLORS.text}; font-size: 28px; font-weight: 700; margin: 0;">JS Choice Group</h1>
            <p style="color: ${COLORS.text}; margin: 5px 0 0 0; font-size: 14px; opacity: 0.9;">Empowering Lives, Enhancing Choices</p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding: 40px 30px;">
            <p style="font-size: 18px; margin-bottom: 20px;">Hi <strong>${firstName}</strong>,</p>

            <p style="font-size: 16px; line-height: 1.6; color: ${COLORS.textLight}; margin-bottom: 20px;">
              Thank you for your interest in <strong>JS Choice Group</strong>. We've received your details and one of our friendly care coordinators will be in touch with you shortly.
            </p>

            <p style="font-size: 16px; line-height: 1.6; color: ${COLORS.textLight}; margin-bottom: 30px;">
              We look forward to supporting you on your NDIS journey.
            </p>

            <div style="border-top: 1px solid ${COLORS.border}; padding-top: 30px;">
              <p style="font-size: 16px; margin-bottom: 15px; color: ${COLORS.text};">Need to speak with us sooner?</p>
              <a href="tel:1300572464" style="display: inline-block; background-color: ${COLORS.secondary}; color: ${COLORS.text}; text-decoration: none; font-weight: bold; padding: 12px 24px; border-radius: 50px;">
                📞 1300 572 464
              </a>
            </div>

            <div style="margin-top: 30px; font-size: 14px; color: ${COLORS.textLight};">
              <p style="margin: 0;"><strong>Office Hours:</strong> 8:00 AM – 6:00 PM</p>
              <p style="margin: 5px 0 0 0;"><strong>Care Services:</strong> 24/7 Available</p>
            </div>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background-color: #F7FAFC; padding: 30px; text-align: center; border-top: 1px solid ${COLORS.border};">
            <p style="font-size: 14px; color: ${COLORS.textLight}; margin-bottom: 10px;">&copy; ${new Date().getFullYear()} JS Choice Group. All rights reserved.</p>
            <p style="font-size: 12px; color: #A0AEC0;">
              Suite 104, Level 1, C5, 2 Main Street, Point Cook VIC 3030<br>
              <a href="mailto:info@jschoicegroup.com.au" style="color: ${COLORS.primary}; text-decoration: none;">info@jschoicegroup.com.au</a>
            </p>
          </td>
        </tr>

      </table>
    </body>
    </html>
  `;
}
```

**Step 2: Verify the file compiles**

```bash
cd /d/CruxLabs/Projects/JSChoice/JSChoiceGroups
npx tsc --noEmit 2>&1 | grep -i "email.ts"
```

Expected: no output (no errors in email.ts)

**Step 3: Commit**

```bash
git add src/lib/email.ts
git commit -m "feat: add sendFacebookLeadClientEmail for Meta Ads webhook"
```

---

## Task 2: Add `sendFacebookLeadAdminEmail` to email.ts

**Files:**
- Modify: `src/lib/email.ts` (append after Task 1 functions)

**Step 1: Add the function**

Append the following after `generateFacebookLeadClientHtml` in `src/lib/email.ts`:

```typescript
/**
 * Send admin notification email when a Facebook Lead Ad form is submitted.
 */
export async function sendFacebookLeadAdminEmail(lead: FacebookLeadEmailData): Promise<void> {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://jschoicegroup.com.au';

  const adminEmails = [
    process.env.ADMIN_EMAIL || 'info@jschoicegroup.com.au',
    'team@cruxlabs.com.au',
    'sadoon.mukhtar@gmail.com',
  ];

  try {
    await getResend().emails.send({
      from: 'JS Choice CRM <onboarding@resend.dev>',
      to: adminEmails,
      subject: `🔔 New Facebook Lead: ${lead.full_name}${lead.campaign_name ? ` from ${lead.campaign_name}` : ''}`,
      html: generateFacebookLeadAdminHtml(lead, appUrl),
    });
    console.log(`✅ Facebook lead admin notification sent for: ${lead.full_name}`);
  } catch (err) {
    console.error('❌ sendFacebookLeadAdminEmail failed:', err);
  }
}

function generateFacebookLeadAdminHtml(lead: FacebookLeadEmailData, appUrl: string): string {
  const rows = [
    { label: 'Name',     value: lead.full_name },
    { label: 'Email',    value: lead.email    ? `<a href="mailto:${lead.email}" style="color: #4A5568;">${lead.email}</a>`   : '—' },
    { label: 'Phone',    value: lead.phone    ? `<a href="tel:${lead.phone}" style="color: #4A5568;">${lead.phone}</a>`         : '—' },
    { label: 'Campaign', value: lead.campaign_name ?? '—' },
    { label: 'Ad',       value: lead.ad_name       ?? '—' },
    { label: 'Form',     value: lead.form_name      ?? '—' },
    { label: 'Lead ID',  value: `<span style="font-family: monospace; font-size: 12px;">${lead.id ?? '—'}</span>` },
    { label: 'Received', value: lead.created_at ? new Date(lead.created_at).toLocaleString('en-AU', { timeZone: 'Australia/Melbourne' }) : new Date().toLocaleString('en-AU', { timeZone: 'Australia/Melbourne' }) },
  ];

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: ${COLORS.background}; color: ${COLORS.text};">
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: ${COLORS.white}; border-radius: 8px; overflow: hidden; margin-top: 20px; margin-bottom: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">

        <!-- Header -->
        <tr>
          <td style="padding: 20px 30px; background-color: ${COLORS.primary}; border-bottom: 4px solid ${COLORS.secondary};">
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
              <tr>
                <td>
                  <h2 style="margin: 0; color: ${COLORS.text}; font-size: 20px;">📣 New Facebook Lead</h2>
                  <p style="margin: 4px 0 0; font-size: 13px; color: ${COLORS.text}; opacity: 0.8;">via Meta Lead Ads</p>
                </td>
                <td align="right">
                  <div style="background: rgba(255,255,255,0.3); padding: 4px 10px; border-radius: 4px; font-size: 12px; font-weight: bold; color: ${COLORS.text};">
                    ${new Date().toLocaleDateString('en-AU')}
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Lead Details Table -->
        <tr>
          <td style="padding: 30px;">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: separate; border-spacing: 0; border: 1px solid ${COLORS.border}; border-radius: 8px; overflow: hidden;">
              ${rows.map(row => `
              <tr>
                <td style="padding: 12px 15px; border-bottom: 1px solid ${COLORS.border}; background-color: #F8FAFC; color: ${COLORS.textLight}; font-weight: 600; font-size: 13px; width: 30%;">
                  ${row.label}
                </td>
                <td style="padding: 12px 15px; border-bottom: 1px solid ${COLORS.border}; color: ${COLORS.text}; font-size: 14px;">
                  ${row.value}
                </td>
              </tr>
              `).join('')}
            </table>

            <!-- CTA -->
            <div style="margin-top: 30px; text-align: center;">
              <a href="${appUrl}/admin/facebook-leads" style="display: inline-block; background-color: ${COLORS.text}; color: ${COLORS.white}; text-decoration: none; padding: 14px 28px; border-radius: 6px; font-weight: bold; font-size: 14px;">
                View in Dashboard →
              </a>
            </div>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background-color: #F7FAFC; padding: 20px 30px; text-align: center; border-top: 1px solid ${COLORS.border};">
            <p style="font-size: 12px; color: #A0AEC0; margin: 0;">Automated notification from JS Choice CRM</p>
          </td>
        </tr>

      </table>
    </body>
    </html>
  `;
}
```

**Step 2: Verify the file compiles**

```bash
cd /d/CruxLabs/Projects/JSChoice/JSChoiceGroups
npx tsc --noEmit 2>&1 | grep -i "email.ts"
```

Expected: no output

**Step 3: Commit**

```bash
git add src/lib/email.ts
git commit -m "feat: add sendFacebookLeadAdminEmail for Meta Ads webhook"
```

---

## Task 3: Wire emails into webhook handler

**Files:**
- Modify: `src/app/api/facebook-leads/webhook/route.ts`

**Step 1: Add import at top of file**

At line 15, after the existing imports, add:

```typescript
import { sendFacebookLeadAdminEmail, sendFacebookLeadClientEmail } from '@/lib/email';
```

The top of the file should now look like:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { createHmac } from 'crypto';
import { createServerClient } from '@/lib/supabase-admin';
import { sendFacebookLeadAdminEmail, sendFacebookLeadClientEmail } from '@/lib/email';
```

**Step 2: Fire emails after successful DB insert**

Find the block at lines 216-222 (the `supabase.insert` result handler):

```typescript
            const { error } = await supabase.from('facebook_leads').insert(record);

            if (error) {
                console.error(`DB error saving facebook lead ${leadgen_id}:`, error);
            } else {
                console.log(`Saved facebook lead: ${fullName} (${email ?? 'no email'})`);
            }
```

Replace it with:

```typescript
            const { data: savedLead, error } = await supabase
                .from('facebook_leads')
                .insert(record)
                .select('id, created_at')
                .single();

            if (error) {
                console.error(`DB error saving facebook lead ${leadgen_id}:`, error);
            } else {
                console.log(`Saved facebook lead: ${fullName} (${email ?? 'no email'})`);

                const emailData = {
                    ...record,
                    id:         savedLead?.id,
                    created_at: savedLead?.created_at,
                };

                // Fire both emails — errors are caught inside each function
                void Promise.all([
                    sendFacebookLeadAdminEmail(emailData),
                    sendFacebookLeadClientEmail(emailData),
                ]);
            }
```

**Step 3: Verify the file compiles**

```bash
cd /d/CruxLabs/Projects/JSChoice/JSChoiceGroups
npx tsc --noEmit 2>&1 | grep -i "webhook"
```

Expected: no output

**Step 4: Commit**

```bash
git add src/app/api/facebook-leads/webhook/route.ts
git commit -m "feat: send client + admin emails on Facebook lead webhook"
```

---

## Task 4: End-to-End Verification

**Step 1: Verify env vars are set**

Check that your `.env.local` (or Vercel environment) has:

```env
RESEND_API_KEY=re_...
ADMIN_EMAIL=info@jschoicegroup.com.au
FACEBOOK_APP_SECRET=...
FACEBOOK_VERIFY_TOKEN=jschoiceleads
FACEBOOK_PAGE_ACCESS_TOKEN=...
NEXT_PUBLIC_APP_URL=https://jschoicegroup.com.au
```

**Step 2: Test webhook verification (GET)**

```bash
curl "https://jschoicegroup.com.au/api/facebook-leads/webhook?hub.mode=subscribe&hub.verify_token=jschoiceleads&hub.challenge=TEST123"
```

Expected response: `TEST123`

**Step 3: Send a test lead via Meta's Lead Ads Testing Tool**

1. Go to: https://developers.facebook.com/tools/lead-ads-testing
2. Select your Page and the Lead Form
3. Click "Preview Form" → fill it in → Submit
4. Wait ~10 seconds
5. Check admin dashboard at `/admin/facebook-leads` — new lead should appear
6. Check admin email inboxes — notification email should arrive
7. Check the submitted email inbox — client thank-you should arrive

**Step 4: Check server logs if emails don't arrive**

```bash
# On Vercel: check Function Logs for the webhook route
# Locally: run dev server and watch console
npm run dev
```

Look for:
- `✅ Saved facebook lead: [Name]`
- `✅ Facebook lead admin notification sent for: [Name]`
- `✅ Facebook lead client email sent to: [email]`

---

## Meta App Webhook Setup Reference

If the webhook is not yet connected in Meta:

1. Go to https://developers.facebook.com → Your App → Webhooks
2. Add webhook: `https://jschoicegroup.com.au/api/facebook-leads/webhook`
3. Verify token: `jschoiceleads` (matches `FACEBOOK_VERIFY_TOKEN`)
4. Subscribe to field: `leadgen`
5. Go to your Page → Settings → Subscribed Apps → ensure your app is listed
6. Make sure your Page Access Token has `leads_retrieval` permission

---

## Summary of Changes

| File | Lines Changed |
|---|---|
| `src/lib/email.ts` | ~100 lines appended (2 new functions + 2 HTML generators) |
| `src/app/api/facebook-leads/webhook/route.ts` | 1 import line + ~12 line replacement in POST handler |
