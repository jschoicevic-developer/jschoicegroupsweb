# Frontend Changes Log

**Branch:** `development`  
**Scope:** Frontend only — no backend, API routes, database, or form submission logic was modified.

---

## 1. New Components Created

### `src/components/ui/ServiceCTA.tsx`
- New mid-page CTA banner component used across service pages.
- Accepts optional `heading` and `subheading` props.
- Styled with a pink/coral gradient matching the site theme, with a bouncing arrow icon.

### `src/components/ui/TalkToUsButton.tsx`
- Standalone reusable button that wraps an `<a href="tel:...">` link using the `CONTACT_DETAILS.national.tel` from `src/config/contact.ts`.
- Replaced inline "Talk to Us" buttons across multiple service pages for consistency.

### `src/components/blog/TableOfContents.tsx`
- Client component (`'use client'`) for the blog article sidebar.
- Renders a numbered, collapsible list of headings (default: open).
- Each item smooth-scrolls to its heading on click, with a 112px offset to account for the sticky navbar.

### `src/components/blog/BlogContent.tsx`
- Client component that renders CMS-sourced blog HTML via `dangerouslySetInnerHTML`.
- On mount (`useEffect`), scans the rendered HTML for FAQ sections using keyword matching (`frequently asked`, `faq`, `common questions`, etc.).
- Transforms FAQ sections into interactive accordion UI entirely via DOM manipulation — no re-render needed.
- **FAQ accordion behaviour:**
  - Question headings become toggle buttons.
  - Answer paragraphs collapse/expand with smooth animation.
  - Entire FAQ section is wrapped in a visually distinct card with a dark gradient header and light purple body.
- Guarded against React Strict Mode double-invoke via `data-faq-section` attribute check.
- Falls back to collapsing standalone `h3`/`h4` headings ending in `?` if no keyword-matched FAQ section is found.

---

## 2. Blog Article Page — Full Redesign

**File:** `src/app/(website)/blog/[slug]/page.tsx`

### Layout changes
- Previous layout: single-column, hero → full-width article body.
- New layout: two-column after the hero section.
  - **Left column** (`flex-1`): Overview card → Table of Contents → Featured image with caption → Article body → Back link.
  - **Right column** (`lg:w-[300px] xl:w-[320px]`, sticky): Dark CTA card (phone + Get in Touch + Book Consultation) → More Articles card.
- Right column is `lg:sticky lg:top-28 lg:self-start` so it stays fixed while content scrolls.

### Heading anchor links (server-side)
- Added `processContent()` function that runs server-side.
- Uses a regex to inject `id` attributes into all `h2`, `h3`, `h4` tags in the CMS HTML, generating slugs from the heading text (strips inner HTML tags, lowercases, replaces spaces with hyphens).
- Skips headings that already have an `id`.
- Returns both the processed HTML and a structured `headings[]` array for the Table of Contents.

### Scroll offset for headings
- Article wrapper has `[&_h2]:scroll-mt-28 [&_h3]:scroll-mt-28 [&_h4]:scroll-mt-28` to prevent the sticky navbar from covering headings when jumping to anchors.

### Featured image
- Wrapped in a `<figure>` element with a `<figcaption>` showing the post title.

---

## 3. Service & Provider Pages — "Call Now" Button Fix

**Affected files (16 total):**
- `access-to-community-activities/page.tsx`
- `allied-health-services/page.tsx`
- `assistance-with-daily-life/page.tsx`
- `client-and-family-advocacy-for-ndis-participants-only/page.tsx`
- `innovative-community-participation-including-volunteer-opportunities/page.tsx`
- `ndis-access-requests/page.tsx`
- `ndis-accommodation/page.tsx`
- `ndis-accommodation-geelong/page.tsx`
- `ndis-providers-altona-north/page.tsx`
- `ndis-providers-craigieburn/page.tsx`
- `ndis-providers-epping/page.tsx`
- `ndis-providers-footscray/page.tsx`
- `ndis-providers-hoppers-crossing/page.tsx`
- `psychosocial-recovery-coach/page.tsx`
- `support-coordination/page.tsx`
- `transportation-assistance/page.tsx`

### What changed
- Every "Call Now" `<Button>` in CTA sections was non-functional (no `href`, no link).
- Added `asChild` prop to the Button and wrapped its content in `<a href="tel:1300572464">`.
- Clicking "Call Now" on any device now initiates a phone call to **1300 572 464**.
- The following ndis-providers pages already had this fix applied prior to this session and were not modified: `altona`, `altona-meadows`, `tarneit`, `south-morang`, `shepparton`, `point-cook`, `laverton`, `lara`, `werribee`, `truganina`, `williams-landing`.

---

## 4. Bug Fix — `ndis-accommodation/page.tsx`

- Fixed broken JSX: the hero CTA section had an unclosed `<Link href="/consultations">` tag wrapping both a `<TalkToUsButton />` and a nested second `<Link>`, which caused a build/render error.
- Corrected to a clean flex row: `<TalkToUsButton />` + `<Link href="/consultations"><Button>Consultations</Button></Link>`.
- Removed unused Lucide icon imports: `Phone`, `UserCheck`, `Heart`, `Utensils`.

---

## 5. No Backend Changes

- No API routes were created or modified.
- No Supabase queries, mutations, or schema changes were made.
- No form submission handlers were touched.
- The existing lead capture form (with services dropdown, name, phone, email, message fields and its integrated backend) was left completely untouched.
- The `ServiceFormSection.tsx` component was briefly created during this session but was deleted before any page shipped with it — all pages retain their original form implementations.
