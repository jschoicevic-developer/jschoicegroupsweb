# Blog Scheduling & Auto-Publishing System

## Overview

The blog scheduling system allows admins and bloggers to write posts in advance and have them automatically published at a set date/time. It uses a **dual-mechanism** approach: a primary Vercel cron job plus a lazy fallback that fires on every public blog request.

---

## How It Works — End to End

### 1. Author Schedules a Post

- In the admin or blogger dashboard, the author selects **"Schedule Post"** as the status.
- A `datetime-local` input appears (animated via Framer Motion) for them to pick the publish date/time.
- Frontend validates that the chosen time is in the future before submitting.
- A `POST /api/blog` request is sent with:
  ```json
  { "status": "scheduled", "scheduled_for": "2026-04-01T09:00:00.000Z" }
  ```
- The post is saved to the `blog_posts` table with `status = 'scheduled'` and `scheduled_for` set.

---

### 2. Post Is Auto-Published (Three Mechanisms)

#### Mechanism A — Vercel Cron Job (Primary)

**File:** `vercel.json`
```json
{
  "crons": [{ "path": "/api/blog/scheduler", "schedule": "0 0 * * *" }]
}
```

- Runs **daily at 00:00 UTC**.
- Calls `GET /api/blog/scheduler` with a `Bearer <CRON_SECRET>` authorization header.
- The endpoint queries Supabase for all posts where `status = 'scheduled'` AND `scheduled_for <= now`.
- Updates those posts: sets `status = 'published'` and `published_at = now`.

**File:** `src/app/api/blog/scheduler/route.ts`

---

#### Mechanism B — Lazy Scheduler (Fallback)

**File:** `src/app/api/blog/route.ts` (lines 37–51)

Every time the public blog list is fetched (`GET /api/blog` without `admin=true`), a fire-and-forget background query runs:

```typescript
supabase
  .from('blog_posts')
  .update({ status: 'published', published_at: now, updated_at: now })
  .eq('status', 'scheduled')
  .lte('scheduled_for', now)
  .then(({ error }) => { if (error) console.error('Lazy scheduler error:', error); });
```

This ensures posts are published even if the cron job missed a run. It does **not** slow down the response because it is non-awaited.

Additionally, the public blog list query uses an OR filter so overdue scheduled posts appear immediately even before the background update commits:
```typescript
query = query.or(`status.eq.published,and(status.eq.scheduled,scheduled_for.lte.${now})`);
```

---

#### Mechanism C — Manual by Admin

Any admin can open a post and change its status to `Published` manually via `PATCH /api/blog/[slug]`. The API sets `published_at` to the current time and clears `scheduled_for`.

---

### 3. Status Transitions in the API

**File:** `src/app/api/blog/[slug]/route.ts`

```typescript
// On PATCH
if (updateData.status === 'published' && !updateData.published_at) {
    updateData.published_at = new Date().toISOString();
}
if (updateData.status !== 'scheduled') {
    updateData.scheduled_for = null; // Clear schedule if status changes
}
```

---

## Database Fields

Table: `blog_posts`

| Field | Type | Purpose |
|-------|------|---------|
| `status` | `'draft' \| 'published' \| 'scheduled' \| 'archived'` | Current post state |
| `scheduled_for` | `timestamp \| null` | When to auto-publish |
| `published_at` | `timestamp \| null` | When the post was published |
| `updated_at` | `timestamp` | Last modification time |

---

## Environment Variables Required

| Variable | Purpose |
|----------|---------|
| `CRON_SECRET` | Bearer token that Vercel sends to authenticate the cron endpoint |
| `SUPABASE_SERVICE_ROLE_KEY` | Admin key used by the scheduler to bypass RLS |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public Supabase key |

Set `CRON_SECRET` in Vercel → Project → Settings → Environment Variables. Vercel automatically injects it as the Bearer token when invoking the cron.

---

## Files Involved

| File | Role |
|------|------|
| `vercel.json` | Declares the cron schedule |
| `src/app/api/blog/scheduler/route.ts` | Cron endpoint — queries and publishes overdue posts |
| `src/app/api/blog/route.ts` | Lazy scheduler + public list query |
| `src/app/api/blog/[slug]/route.ts` | Status transition logic on update |
| `src/types/crm.ts` | `BlogPost` type and `BlogStatus` enum |
| `src/app/admin/blog/new/page.tsx` | Admin UI — schedule picker |
| `src/app/admin/blog/edit/[slug]/page.tsx` | Admin UI — edit schedule |
| `src/app/admin/blog/page.tsx` | Dashboard — shows scheduled status badge |
| `src/app/blogger/blogs/new/page.tsx` | Blogger UI — schedule picker with future-date validation |
| `src/app/blogger/blogs/[id]/edit/page.tsx` | Blogger UI — edit schedule |
| `src/components/sections/blog/BlogList.tsx` | Public list — triggers lazy scheduler |

---

## Admin Dashboard — Status Display

```typescript
// src/app/admin/blog/page.tsx
if (post.status === 'scheduled' && post.scheduled_for) {
    return `Scheduled: ${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
}
```

Status badge colors: **Green** = Published, **Gray** = Draft, **Blue** = Scheduled.

---

## Flow Diagram

```
Author fills form
      │
      ▼
status='scheduled', scheduled_for='2026-04-01T09:00Z'
      │
      ▼
Saved to DB (status='scheduled')
      │
      ├─── Vercel Cron (daily 00:00 UTC) ──► GET /api/blog/scheduler ──► DB update to 'published'
      │
      └─── Any public blog list request ──► Lazy fire-and-forget query ──► DB update to 'published'
```

---

## Reusable Prompt for Other Projects

See `docs/blog-scheduling-prompt.md` for a copy-paste implementation prompt.
