# Reusable Prompt — Blog Scheduling & Auto-Publishing

Copy and paste this prompt into any Next.js + Supabase project to implement the same blog scheduling system.

---

## Prompt

```
Implement a blog scheduling system so that blog posts can be written in advance,
set to a future publish date/time, and automatically published when that time arrives.
The status of each post must update in the database automatically.

Stack: Next.js (App Router), Supabase, deployed on Vercel.

---

### 1. DATABASE

Add these columns to the `blog_posts` table (or your equivalent posts table):

- `status` — enum/text: 'draft' | 'published' | 'scheduled' | 'archived'
- `scheduled_for` — timestamptz, nullable — the target publish datetime
- `published_at` — timestamptz, nullable — set when post is actually published
- `updated_at` — timestamptz, not null — updated on every write

TypeScript type:
```typescript
export type BlogStatus = 'draft' | 'published' | 'scheduled' | 'archived';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  status: BlogStatus;
  scheduled_for: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  // ... other fields
}
```

---

### 2. VERCEL CRON JOB

In `vercel.json` at the project root, add:

```json
{
  "crons": [
    {
      "path": "/api/blog/scheduler",
      "schedule": "0 * * * *"
    }
  ]
}
```

Use `"0 * * * *"` to run every hour, or `"0 0 * * *"` for once daily at midnight UTC.
Adjust the schedule to match how precise your scheduling needs to be.

---

### 3. CRON ENDPOINT

Create `src/app/api/blog/scheduler/route.ts`:

```typescript
import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // Verify this is called by Vercel cron (not a random request)
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY! // Must use service role to bypass RLS
  );

  const now = new Date().toISOString();

  const { data, error } = await supabase
    .from('blog_posts')
    .update({
      status: 'published',
      published_at: now,
      updated_at: now,
    })
    .eq('status', 'scheduled')
    .lte('scheduled_for', now)
    .select('id, title');

  if (error) {
    console.error('Scheduler error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    published: data?.length ?? 0,
    posts: data,
  });
}
```

---

### 4. LAZY SCHEDULER FALLBACK

In your main blog list API route (`src/app/api/blog/route.ts`), add a fire-and-forget
background query at the top of the GET handler for public (non-admin) requests.
This ensures posts publish even if the cron job misses a run:

```typescript
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const isAdmin = searchParams.get('admin') === 'true';
  const now = new Date().toISOString();

  // Lazy scheduler: fire-and-forget, does not block the response
  if (!isAdmin) {
    supabase
      .from('blog_posts')
      .update({ status: 'published', published_at: now, updated_at: now })
      .eq('status', 'scheduled')
      .lte('scheduled_for', now)
      .then(({ error }) => {
        if (error) console.error('Lazy scheduler error:', error);
      });
  }

  // ... rest of your GET handler
}
```

Also update your public query filter so that overdue scheduled posts appear
immediately (even before the background update commits):

```typescript
// Show posts that are published OR scheduled-but-overdue
query = query.or(
  `status.eq.published,and(status.eq.scheduled,scheduled_for.lte.${now})`
);
```

---

### 5. STATUS TRANSITION LOGIC

In your blog create (`POST`) handler:

```typescript
if (body.status === 'published') {
  postData.published_at = new Date().toISOString();
} else if (body.status === 'scheduled' && body.scheduled_for) {
  postData.scheduled_for = body.scheduled_for;
}
```

In your blog update (`PATCH`) handler:

```typescript
// Auto-set published_at when publishing
if (updateData.status === 'published' && !updateData.published_at) {
  updateData.published_at = new Date().toISOString();
}

// Clear the schedule if no longer in 'scheduled' state
if (updateData.status !== 'scheduled') {
  updateData.scheduled_for = null;
}
```

---

### 6. FRONTEND SCHEDULING UI

In your blog create/edit form, add a status selector with three options:
- Draft
- Publish Now
- Schedule

When "Schedule" is selected, show a `datetime-local` input for `scheduled_for`.

Validate before submission:

```typescript
if (status === 'scheduled') {
  if (!formData.scheduled_for) {
    alert('Please select a date and time to schedule the post.');
    return;
  }
  if (new Date(formData.scheduled_for) <= new Date()) {
    alert('Scheduled time must be in the future.');
    return;
  }
}
```

Send to the API:
```typescript
const payload = {
  ...formData,
  status,
  scheduled_for: status === 'scheduled' ? formData.scheduled_for : null,
};
```

---

### 7. ADMIN DASHBOARD — DISPLAY SCHEDULED POSTS

Show a "Scheduled" filter tab and display the scheduled time in the post list:

```typescript
function getDateLabel(post: BlogPost) {
  if (post.status === 'scheduled' && post.scheduled_for) {
    const date = new Date(post.scheduled_for);
    return `Scheduled: ${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  }
  if (post.published_at) {
    return new Date(post.published_at).toLocaleDateString();
  }
  return 'Draft';
}
```

Status badge colors: Green = Published, Gray = Draft, Blue = Scheduled.

---

### 8. ENVIRONMENT VARIABLES

Add to your Vercel project settings (not just .env):

```
CRON_SECRET=your-random-secret-string
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

`CRON_SECRET` — a random string you generate. Vercel automatically sends it as
`Authorization: Bearer <CRON_SECRET>` when invoking the cron job.

---

### SUMMARY OF FILES TO CREATE/MODIFY

| File | Action |
|------|--------|
| `vercel.json` | Add crons array |
| `src/app/api/blog/scheduler/route.ts` | Create — cron endpoint |
| `src/app/api/blog/route.ts` | Add lazy scheduler + OR query filter |
| `src/app/api/blog/[slug]/route.ts` | Add status transition logic to PATCH |
| `src/types/blog.ts` (or equivalent) | Add `scheduled_for`, `published_at`, update `BlogStatus` |
| Blog create form | Add status selector + datetime-local input |
| Blog edit form | Load and allow editing of `scheduled_for` |
| Admin blog list | Add Scheduled filter tab + date label |
| Supabase DB migration | Add columns: `status`, `scheduled_for`, `published_at`, `updated_at` |

---

### HOW IT ALL FITS TOGETHER

1. Author picks "Schedule" + a future datetime → saved as `status='scheduled'`
2. Vercel cron fires hourly (or daily) → calls `/api/blog/scheduler` → publishes overdue posts
3. Any public blog page load → lazy query fires in background → catches any cron misses
4. Public query filter shows overdue scheduled posts immediately (before DB update commits)
5. Admin can always manually change status to 'published' at any time
```
