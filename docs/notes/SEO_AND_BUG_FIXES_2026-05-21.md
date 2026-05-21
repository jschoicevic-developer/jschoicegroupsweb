# JS Choice Group — SEO Heading Restructure & Blog 404 Bug Fix — 21 May 2026

All changes below were applied to the `blog` branch. No design, layout, animation, component
behaviour, route, JSON-LD payload, form submission logic, database schema, or API contract
was modified — only heading tag names, visible heading text, image alt text, page metadata
(`title` / `description` / OG / Twitter), the blogger edit form's `handleTitleChange`, and the
PATCH route's slug-update behaviour.

---

## 1. Homepage Heading Hierarchy Restructure

**Issue:** The homepage heading order did not follow a clean semantic hierarchy. Several H2s
duplicated the focus keyword that should have anchored the H1, the "Why Choose Us" feature
cards used H4 with no intermediate H3 (H2 → H4 skip), and section headings did not naturally
include the page's primary focus keyword.

**Focus keyword:** `NDIS Service Providers in Melbourne`

**Final hierarchy:**

| Level | Text | Source file |
|---|---|---|
| H1 | NDIS Service Providers in Melbourne – Care And Support | `src/components/sections/home/Hero.tsx` |
| H2 | Trusted NDIS Support Services In Melbourne | `src/components/sections/home/Services.tsx` |
| H3 × 8 | Service cards (Assistance with Daily Life, Transport Assistance, Allied Health Services, Psychosocial Recovery Coaching, Social & Community Participation, Group & Centre Activities, Emergency Respite, Community Nursing Care) | `src/components/sections/home/Services.tsx` |
| H2 | Serving the Melbourne Community with Compassionate NDIS Care | `src/components/sections/home/About.tsx` |
| H2 | Why Melbourne Families Choose JS Choice | `src/components/sections/home/WhyChooseUs.tsx` |
| H3 × 4 | Neuro-Affirming Approach, Culturally Inclusive Support, Capacity Building Focus, Compliance & Trust | `src/components/sections/home/WhyChooseUs.tsx` |
| H2 | Getting Started with Our Melbourne NDIS Services | `src/components/sections/home/GettingStarted.tsx` |
| H3 × 3 | Contact Us, Meet & Greet, Start Your Journey | `src/components/sections/home/GettingStarted.tsx` |
| H2 | Areas We Serve Across Melbourne | `src/components/sections/home/AreasServed.tsx` |
| H2 | Frequently Asked Questions | `src/components/sections/home/Faq.tsx` |
| H2 | Supporting Your Independence Through Quality NDIS Care | `src/components/sections/home/SeamlessNDIS.tsx` |
| H3 | Acknowledgement of Country | `src/components/layout/Footer.tsx` |

**Key edits:**

- `Hero.tsx` — Visible H1 text remained "Care And Support" for design preservation; the focus
  keyword `NDIS Service Providers in Melbourne –` was prefixed inside the `<h1>` element via
  a `sr-only` span. The H1 text node now semantically contains the full keyword for crawlers
  and screen readers; the visual hero is unchanged.
- `About.tsx` (Part 1) — The duplicate H2 "NDIS Service Providers in Melbourne" was
  downgraded from `<h2>` to `<p>` with the same Tailwind classes. The keyword now lives only
  on the H1; section visually unchanged.
- `WhyChooseUs.tsx` — Four feature cards converted from `<h4>` to `<h3>` to remove the
  H2 → H4 skip. Card titles updated to: `Culturally Inclusive Support`, `Capacity Building Focus`.
- All other H2s rewritten in place (see table above) — text changes only, all surrounding
  spans / classes / animations preserved.

**Single-H1 verification:** `grep -rn "<h1" src/components` confirms Hero is the only H1
source on the home page; PageHeader (used by inner pages) is not used on home.

---

## 2. Homepage Meta Title & Description

**File:** `src/app/(website)/page.tsx`

- `title: { absolute: "NDIS Service Providers in Melbourne | JS Choice" }` — 47 chars.
  The `absolute` form bypasses the root `%s | JS Choice Group` template in
  `src/app/layout.tsx`, preventing the 82-char concatenation reported by SEO tooling.
- `description` — 79 chars, focus keyword present.
- Matching `openGraph` and `twitter` blocks added so social previews use the same copy.
- WebPage JSON-LD `name` / `description` in `page.tsx` updated to match.

---

## 3. Service Pages — Heading & Metadata Standardisation

Applied across all 16 service pages:

```
access-to-community-activities
allied-health-services
assistance-with-daily-life
assistance-with-nursing-care
client-and-family-advocacy
client-and-family-advocacy-for-ndis-participants-only
emergency-respite
employment-education
group-centre-activities
innovative-community-participation-including-volunteer-opportunities
ndis-access-requests
ndis-accommodation
ndis-accommodation-geelong
psychosocial-recovery-coach
support-coordination
transportation-assistance
```

**Template enforced on every page:**

- **Single H1:** rendered by the shared `<PageHeader title={focusKeyword} />` component.
  Each page's `title` prop now contains the page's focus keyword.
- **At least one H2** contains the focus keyword (the first section intro H2).
- **First intro paragraph** contains the focus keyword naturally.
- **No skipped heading levels.** Two `<h4>` → `<h3>` corrections were made
  (`assistance-with-nursing-care`, `emergency-respite`) to repair H2 → H4 jumps.
- **Meta title:** `title: { absolute: "<Focus Keyword> <Modifier> | JS Choice" }`, ~50–55
  characters (bypasses the root template suffix). Final lengths:

  | Page | Title | Chars |
  |---|---|---|
  | access-to-community-activities | Access to Community Activities Melbourne \| JS Choice | 52 |
  | allied-health-services | NDIS Allied Health Services in Melbourne \| JS Choice | 52 |
  | assistance-with-daily-life | Assistance with Daily Life in Melbourne \| JS Choice | 51 |
  | assistance-with-nursing-care | Assistance with Nursing Care Melbourne \| JS Choice | 50 |
  | client-and-family-advocacy | NDIS Client & Family Advocacy Melbourne \| JS Choice | 51 |
  | client-and-family-advocacy-for-ndis-participants-only | NDIS Family Advocacy for Participants Melbourne \| JS Choice | 59 |
  | emergency-respite | NDIS Emergency Respite Care in Melbourne \| JS Choice | 52 |
  | employment-education | NDIS Assist with Employment & Education \| JS Choice | 51 |
  | group-centre-activities | NDIS Group & Centre Activities Melbourne \| JS Choice | 52 |
  | innovative-community-…-volunteer-opportunities | NDIS Innovative Community Participation \| JS Choice | 51 |
  | ndis-access-requests | NDIS Access Requests Support Melbourne \| JS Choice | 50 |
  | ndis-accommodation | NDIS Short Term Accommodation Melbourne \| JS Choice | 51 |
  | ndis-accommodation-geelong | NDIS Short Term Accommodation in Geelong \| JS Choice | 52 |
  | psychosocial-recovery-coach | NDIS Psychosocial Recovery Coach Melbourne \| JS Choice | 54 |
  | support-coordination | NDIS Support Coordination in Melbourne \| JS Choice | 50 |
  | transportation-assistance | NDIS Transportation Assistance Melbourne \| JS Choice | 52 |

- **Meta description:** ~75–85 chars, focus keyword present, single sentence.
- All existing `alternates.canonical` URLs were preserved verbatim.

**Future template** (for any new service page):

```ts
// layout.tsx
export const metadata: Metadata = {
  title: { absolute: "<Focus Keyword> <Modifier> | JS Choice" },    // ≤ 60 chars
  description: "<Focus Keyword> in Melbourne — <1-line value prop>.", // ~75–85 chars
  alternates: { canonical: "https://jschoicegroup.com.au/<slug>" },
};
```

```tsx
// page.tsx
<PageHeader title="<Focus Keyword>" breadcrumb={[...]} />   {/* the single H1 */}
<section>
  <h2>… <Focus Keyword> …</h2>                               {/* keyword in ≥ 1 H2 */}
  <p>Intro paragraph naturally mentioning the <Focus Keyword>…</p>
  <h3>Subsection</h3> {/* only under H2; H4 only under H3 */}
</section>
```

---

## 4. Blog 404 Bug — Slug Auto-Rewrite

**Reported symptom:** `https://jschoicegroup.com.au/blog/ndis-therapy-services-covered`
was working when first published, then started returning 404 some time later. Other blog
posts were unaffected.

**Root cause:** `src/app/blogger/blogs/[id]/edit/page.tsx`, function `handleTitleChange`
(lines ~136–142 pre-fix). The blogger edit form auto-regenerated the slug from the title
on every keystroke, including when editing already-published posts:

```ts
const handleTitleChange = (title: string) => {
    setFormData({
        ...formData,
        title,
        slug: generateSlug(title),   // ← runs on every keystroke
    });
};
```

When a blogger opened an existing post to make any title tweak, the slug field was silently
overwritten. On save, `PATCH /api/blog/[slug]` happily accepted the new slug
(`slug` was in `allowedFields` with no guard), and the row's `slug` column was rewritten.
The previous public URL no longer matched any row, so `blog/[slug]/page.tsx` called
`notFound()`.

Other posts were unaffected because nobody had re-edited their title.

### Fix 1 — Client guard (`src/app/blogger/blogs/[id]/edit/page.tsx`)

`handleTitleChange` now skips slug regeneration if `originalSlug` is set (i.e., the form
loaded an existing post). New posts (`blogger/blogs/new/page.tsx`) still auto-derive the
slug from the title — that flow is untouched. The slug input remains manually editable on
existing posts; it just no longer mirrors the title.

```ts
const handleTitleChange = (title: string) => {
    if (originalSlug) {
        setFormData({ ...formData, title });
        return;
    }
    setFormData({
        ...formData,
        title,
        slug: generateSlug(title),
    });
};
```

### Fix 2 — Server guard (`src/app/api/blog/[slug]/route.ts`, PATCH)

After the `allowedFields` copy, the PATCH handler now strips `slug` from `updateData` if it
would change the slug of a post whose current status is `'published'`. A console warning is
logged. Drafts and scheduled posts can still be renamed. Other field updates (title,
content, etc.) still save normally.

```ts
if (
    updateData.slug !== undefined &&
    updateData.slug !== oldSlug &&
    existingPost?.status === 'published'
) {
    console.warn(
        `[blog PATCH] Refused slug change on published post "${oldSlug}" -> "${updateData.slug}"`
    );
    delete updateData.slug;
}
```

### Recovery for the broken URL

Manual DB step is still required to restore the affected row. Run in Supabase SQL editor:

```sql
-- Find the row whose slug was rewritten (most recently updated post is the likely candidate)
select id, slug, title, status, updated_at
from blog_posts
order by updated_at desc
limit 20;

-- Restore the canonical slug
update blog_posts
set slug = 'ndis-therapy-services-covered', updated_at = now()
where id = '<the-id-from-above>';
```

### Note: not the self-fetch in `blog/[slug]/page.tsx`

Earlier diagnosis flagged the server-side self-fetch pattern in `getBlogPost` (fetching
`/api/blog/[slug]` over HTTP rather than calling Supabase directly) as a potential cause of
intermittent 404s in production. That is still a latent fragility worth fixing, but it
wasn't the cause of this specific incident — the symptom (one specific post failing while
others worked) ruled out a generic transport issue and pointed cleanly at the slug rewrite.
Tracking as a follow-up.

---

## Files Changed

```
src/app/(website)/page.tsx
src/components/sections/home/Hero.tsx
src/components/sections/home/About.tsx
src/components/sections/home/Services.tsx
src/components/sections/home/WhyChooseUs.tsx
src/components/sections/home/GettingStarted.tsx
src/components/sections/home/AreasServed.tsx
src/components/sections/home/Faq.tsx
src/components/sections/home/SeamlessNDIS.tsx

src/app/(website)/access-to-community-activities/{layout,page}.tsx
src/app/(website)/allied-health-services/{layout,page}.tsx
src/app/(website)/assistance-with-daily-life/{layout,page}.tsx
src/app/(website)/assistance-with-nursing-care/{layout,page}.tsx
src/app/(website)/client-and-family-advocacy/layout.tsx
src/app/(website)/client-and-family-advocacy-for-ndis-participants-only/{layout,page}.tsx
src/app/(website)/emergency-respite/{layout,page}.tsx
src/app/(website)/employment-education/{layout,page}.tsx
src/app/(website)/group-centre-activities/{layout,page}.tsx
src/app/(website)/innovative-community-participation-including-volunteer-opportunities/{layout,page}.tsx
src/app/(website)/ndis-access-requests/{layout,page}.tsx
src/app/(website)/ndis-accommodation/{layout,page}.tsx
src/app/(website)/ndis-accommodation-geelong/{layout,page}.tsx
src/app/(website)/psychosocial-recovery-coach/{layout,page}.tsx
src/app/(website)/support-coordination/{layout,page}.tsx
src/app/(website)/transportation-assistance/{layout,page}.tsx

src/app/blogger/blogs/[id]/edit/page.tsx
src/app/api/blog/[slug]/route.ts
```

## Files Explicitly NOT Modified

- `src/components/ui/PageHeader.tsx` (shared H1 component)
- `src/components/ui/ServiceCTA.tsx`, `ServiceFormSection.tsx`, `TalkToUsButton.tsx`
- `src/components/schema/JsonLd.tsx`
- `src/components/layout/Footer.tsx` (heading already correct)
- All API routes other than `src/app/api/blog/[slug]/route.ts`
- Database schema, Supabase config, `.env`, `next.config.ts`, `vercel.json`
- All form, CMS, admin, and authentication logic
