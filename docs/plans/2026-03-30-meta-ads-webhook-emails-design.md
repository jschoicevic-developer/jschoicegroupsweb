# Meta Ads Webhook Email Notifications — Design

**Date:** 2026-03-30
**Status:** Approved
**Branch:** meta_ad

## Problem

The Facebook Lead Ads webhook (`/api/facebook-leads/webhook`) correctly saves leads to Supabase and the admin dashboard displays them. However, no emails are sent when a lead arrives — neither to the client (thank you) nor to the admin team (notification).

## Scope

**In scope:**
- Add client thank-you email on Facebook lead arrival (if email exists)
- Add admin notification email on Facebook lead arrival
- Wire emails into the existing webhook handler

**Out of scope:**
- Meta App creation (already exists)
- Admin dashboard changes
- New database schema changes

## Architecture

```
Meta Ads Lead Form
       │
       ▼  (webhook POST with HMAC signature)
/api/facebook-leads/webhook/route.ts
       │
       ├── 1. Verify HMAC signature (existing)
       ├── 2. Fetch full lead from Graph API (existing)
       ├── 3. Save to Supabase facebook_leads table (existing)
       └── 4. [NEW] Fire two emails in parallel:
               ├── sendFacebookLeadAdminEmail()  → admin team
               └── sendFacebookLeadClientEmail() → client (if email present)
```

## Files Changed

| File | Change |
|---|---|
| `src/lib/email.ts` | Add `sendFacebookLeadAdminEmail()` and `sendFacebookLeadClientEmail()` |
| `src/app/api/facebook-leads/webhook/route.ts` | Import + call both after successful DB insert |

## Email Specs

### Client Email — `sendFacebookLeadClientEmail()`
- **From:** `JS Choice Group <info@jschoicegroup.com.au>`
- **To:** lead email (only if not null)
- **Subject:** `Thank you for your interest in JS Choice Group`
- **Body:** Branded HTML — Hi [Name], thanks for filling in our form. Team will be in touch. Phone: 1300 572 464
- **Fallback:** Resend sandbox if verified domain fails (matches existing pattern)

### Admin Email — `sendFacebookLeadAdminEmail()`
- **From:** `JS Choice CRM <onboarding@resend.dev>`
- **To:** `ADMIN_EMAIL`, `team@cruxlabs.com.au`, `sadoon.mukhtar@gmail.com`
- **Subject:** `New Facebook Lead: [Name] from [Campaign Name]`
- **Body:** Table with Name, Email, Phone, Campaign, Ad Name, Form Name, Lead ID, Timestamp + CTA button to `/admin/facebook-leads`

## Required Env Vars

```env
RESEND_API_KEY=re_...
ADMIN_EMAIL=info@jschoicegroup.com.au
FACEBOOK_APP_SECRET=...
FACEBOOK_VERIFY_TOKEN=jschoiceleads
FACEBOOK_PAGE_ACCESS_TOKEN=...
NEXT_PUBLIC_APP_URL=https://jschoicegroup.com.au
```

## Meta Webhook Setup (reference)

The Facebook App must have:
1. Webhook URL: `https://jschoicegroup.com.au/api/facebook-leads/webhook`
2. Verify token: value of `FACEBOOK_VERIFY_TOKEN` env var
3. Subscribed fields: `leadgen`
4. Subscribed to the correct Page
5. `leads_retrieval` permission granted on the Page Access Token

## Error Handling

- Email failures are caught and logged — they do NOT throw or cause webhook to return non-200
- Meta requires a 200 response to stop retrying; email errors are silent failures only
- DB errors are also non-fatal to the webhook response
