# Service Page CTA Fix — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans

**Goal:** Fix all service pages to convert Google Ads traffic — inline forms, mid-page CTAs, remove competing actions, fix phone numbers.

**Architecture:** Make LandingForm reusable via props, create 2 new shared components (ServiceCTA strip, ServiceFormSection), embed on key pages, bulk-fix remaining pages.

**Tech Stack:** Next.js, React, Tailwind CSS, Google Ads API

---

### Task 1: Make LandingForm accept props
- Modify: `src/components/landing/LandingForm.tsx`
- Add props: source, sourcePage, defaultService, redirectPath
- Keep backward-compatible defaults for the landing page

### Task 2: Create ServiceCTA component
- Create: `src/components/ui/ServiceCTA.tsx`
- Mid-page strip: "Ready to get started?" + scroll-to-form button
- Brand colors, consistent with landing page style

### Task 3: Create ServiceFormSection component
- Create: `src/components/ui/ServiceFormSection.tsx`
- Wraps LandingForm with heading, trust badges, container styling
- Props: serviceName for context

### Task 4: Update 3 Google Ads service pages with inline forms
- Modify: `src/app/(website)/emergency-respite/page.tsx`
- Modify: `src/app/(website)/support-coordination/page.tsx`
- Modify: `src/app/(website)/assistance-with-daily-life/page.tsx`
- Add: ServiceFormSection after content, ServiceCTA mid-page, StickyMobileCTA
- Remove: /contact-us links, replace bottom CTA with form anchor
- Fix: phone number to 1300 572 464

### Task 5: Bulk-fix remaining service pages
- All other service pages: replace /contact-us bottom CTA → /referral
- Add ServiceCTA mid-page strip
- Fix phone numbers 03 9395 3746 → 1300 572 464

### Task 6: Update Google Ads campaign landing pages
- Campaign 1 (Support Coordination) → /support-coordination
- Campaign 2 (Daily Life) → /assistance-with-daily-life
- Campaign 3 (Respite) → /emergency-respite

### Task 7: Commit and push
