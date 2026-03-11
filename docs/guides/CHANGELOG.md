# JS Choice Group Website — Full Changelog
**Project:** JS Choice Group Website
**Documented:** March 2026
**Total Files Changed/Added:** 34 files | 4,411 insertions

---

## Table of Contents

1. [Blogger Management System](#1-blogger-management-system)
2. [Admin Panel Updates](#2-admin-panel-updates)
3. [Public Website UI Updates](#3-public-website-ui-updates)
4. [Rich Text Editor Upgrades](#4-rich-text-editor-upgrades)
5. [Authentication & Routing](#5-authentication--routing)
6. [API Routes](#6-api-routes)
7. [Infrastructure & Config](#7-infrastructure--config)
8. [File Reference Table](#8-file-reference-table)

---

## 1. Blogger Management System

A complete Blogger Portal was built from scratch. Bloggers can log in at their own dedicated URL, write and manage blog posts, and update their profile — all separate from the Admin panel.

---

### NEW — `src/app/blogger/login/page.tsx`
**URL:** `/blogger/login`

Dedicated login page for bloggers only. Matches the website's purple/primary colour theme (same gradient and style as the admin login). Includes role validation — if an admin account tries to log in here, they get an error and are blocked.

**Features:**
- Email + password login via Supabase Auth
- Role check: only `role: 'blogger'` accounts are allowed
- Error messages displayed inline
- Animated background blobs (purple/indigo)
- Right panel: feature card listing blogger capabilities
- Back to Site button
- Link to Admin login

---

### NEW — `src/app/blogger/layout.tsx`

Layout wrapper for all `/blogger/*` pages. Runs on every page load to verify the session.

**Features:**
- Checks Supabase session on mount
- If not logged in → redirects to `/blogger/login`
- If logged in but role is not `blogger` → redirects to `/admin`
- Renders `BloggerSidebar` + `BloggerHeader` around page content
- Manages mobile sidebar open/close state
- Shows loading spinner during auth check

---

### NEW — `src/app/blogger/page.tsx`
**URL:** `/blogger`

Blogger dashboard home. Shows a summary of the blogger's activity.

**Features:**
- Welcome message with blogger's first name
- 4 stat cards:
  - Total Blogs Written
  - Published Blogs
  - Draft Blogs
  - Quick Write shortcut (links to new post)
- Recent Blogs table (last 5 posts by this blogger, filtered server-side)
- Quick Actions section (Write New Blog + View All Blogs)
- All data fetched from `/api/blogger/me/stats` and `/api/blog?author_id=`

---

### NEW — `src/app/blogger/blogs/page.tsx`
**URL:** `/blogger/blogs`

Full list of all blog posts written by the logged-in blogger.

**Features:**
- Search by title or excerpt
- Filter by status: All / Published / Draft / Scheduled
- Stats row: total posts, published count, drafts count
- Desktop table view (Title, Status, Category, Date, Actions)
- Mobile card view
- Pagination (10 posts per page)
- Edit button → goes to `/blogger/blogs/[id]/edit`
- View button (published posts) → opens public blog in new tab
- Delete button → opens confirmation modal
- All posts filtered server-side by `author_id`

---

### NEW — `src/app/blogger/blogs/new/page.tsx`
**URL:** `/blogger/blogs/new`

Full blog creation page with rich text editor.

**Features:**
- Title input with auto-generated URL slug
- Rich text editor (WYSIWYG — TipTap)
- Excerpt / short description textarea
- Category and tags (comma-separated) inputs
- Featured image: paste URL or upload from computer (via `/api/blog/upload`)
- Status selector: Draft / Published
- Author info panel (read-only, auto-filled from session)
- Save Draft button and Publish Now button
- On save: calls `POST /api/blog` with `author_id` and `author_name`

---

### NEW — `src/app/blogger/blogs/[id]/edit/page.tsx`
**URL:** `/blogger/blogs/[id]/edit`

Edit an existing blog post. Pre-fills all fields from the existing post data.

**Features:**
- Loads post by ID directly from Supabase client
- Same fields as new post page (title, slug, excerpt, content, category, tags, image, status)
- Save Draft and Publish Now buttons
- Sends `PATCH /api/blog/[slug]` with ownership data
- Redirects to `/blogger/blogs` on success

---

### NEW — `src/app/blogger/profile/page.tsx`
**URL:** `/blogger/profile`

Blogger profile settings page.

**Features:**
- Avatar initials display
- Edit display name and bio (calls `PUT /api/bloggers/[id]`)
- Email shown as read-only
- Change password section (calls `supabase.auth.updateUser()` client-side)
- Password confirmation validation
- Success and error feedback messages

---

### NEW — `src/components/blogger/BloggerSidebar.tsx`

Left navigation sidebar for the blogger portal.

**Navigation items:**
- Dashboard → `/blogger`
- All Blogs → `/blogger/blogs`
- Write Blog → `/blogger/blogs/new`
- Profile Settings → `/blogger/profile`

**Features:**
- JS Choice logo + "Blogger Portal" branding
- Collapsible on desktop (icon-only mode with tooltips)
- Slide-in drawer on mobile with dark overlay backdrop
- Active route highlighted with primary colour
- User profile card at bottom (initials avatar, name, email)
- Logout button (redirects to `/blogger/login`)
- Auto-closes on route navigation (mobile)

---

### NEW — `src/components/blogger/BloggerHeader.tsx`

Top header bar for the blogger portal.

**Features:**
- Hamburger menu button (triggers mobile sidebar)
- "Blogger Portal" + "Content Management" branding
- Link to public website (opens in new tab)
- User avatar (gradient initials)
- Profile dropdown: name, email, Profile Settings link, Logout button
- Sticky positioning with backdrop blur

---

## 2. Admin Panel Updates

---

### NEW — `src/app/admin/bloggers/page.tsx`
**URL:** `/admin/bloggers`

Admin page to manage all blogger accounts.

**Features:**
- Total Bloggers stat card
- Desktop table: Name, Email, Bio, Joined date, Actions
- Mobile card layout
- Add New Blogger modal (Name, Email, Password, Bio fields)
- Edit Blogger modal (Name and Bio only)
- Delete Blogger modal (confirmation required)
- Password visibility toggle in add form
- Calls `GET/POST /api/bloggers` and `PUT/DELETE /api/bloggers/[id]`
- Framer Motion animations on modals and rows

---

### MODIFIED — `src/app/admin/page.tsx`

Admin dashboard now shows 5 stat cards (was 4 before).

**What was added:**
- 5th stat card: **Total Bloggers** (pink colour, Users2 icon)
- Fetches count from `GET /api/bloggers`

---

### MODIFIED — `src/components/admin/AdminSidebar.tsx`

**What was added:**
- New menu item: **Bloggers** linking to `/admin/bloggers`
- Icon: `Users2` from Lucide
- Positioned after "Blog Posts" in the menu list

---

### MODIFIED — `src/app/admin/login/page.tsx`

**What was added:**
- After successful login, checks `user_metadata.role`
- If the logged-in user is a `blogger`, redirects to `/blogger` instead of `/admin`
- Prevents bloggers from accidentally accessing the admin panel

---

## 3. Public Website UI Updates

---

### MODIFIED — `src/components/layout/Topbar.tsx`

Top navigation bar — social media icons updated.

**What was added/changed:**
- Updated social media icon links and styling
- Social platforms now shown: **Facebook, Pinterest, TikTok, Instagram**
- Hover effects on all social icons
- Animated entrance with Framer Motion

**Social links:**
- Facebook: `https://www.facebook.com/profile.php?id=100091940106564`
- Pinterest: `https://www.pinterest.com/jschoice/`
- TikTok: `https://www.tiktok.com/@js.choicecare.and`
- Instagram: `https://www.instagram.com/jschoicegroup`

---

### MODIFIED — `src/components/layout/Footer.tsx`

Footer significantly expanded with new sections and styling.

**What was added/changed:**
- **Resources section** — new column added with 8 links:
  - NDIS Government Website (external)
  - NDIS Commission (external)
  - My Aged Care (external)
  - Training modules link
  - Behaviour Support Training link
  - Resources (internal)
  - Careers (internal)
  - Blog (internal)
  - About Us (internal)
- Social media links in brand column: Facebook, Pinterest, TikTok, Instagram
- Bottom gap removed — footer now sits flush at the bottom of the page
- Dark background (`#0F172A`) with purple and pink accents
- Acknowledgement of Country section
- Copyright, ABN (`54 644 196 270`), Licence (`4050118332`)

---

### MODIFIED — `src/components/layout/FloatingActions.tsx`

Floating action button dock on the right side of every page.

**What was added/changed:**
- Updated social icon links and colours
- **5 floating buttons:**
  1. Tools → `/tools` (Wrench icon, pink `#F2A7A0`)
  2. Facebook (blue `#1877F2`)
  3. Pinterest (red `#E60023`)
  4. TikTok (black `#010101`)
  5. Instagram (pink `#E1306C`)
- Hover tooltips with labels appear on the left
- Scale animation on hover (1.25×)
- All social links open in new tab

---

### MODIFIED — `src/app/layout.tsx`

Minor update to the root layout.

**What was changed:**
- Updated GTM script or metadata fields (layout adjustments)

---

## 4. Rich Text Editor Upgrades

### MODIFIED — `src/components/admin/RichTextEditor.tsx`

The WYSIWYG editor used by both Admin and Blogger for writing blog posts received major upgrades.

**New features added:**
- **Word count + character count** — live counter displayed in the toolbar (updates as you type)
- **Text colour picker** — `T` button with colour underbar, 14 colour options (Black, Gray, Red, Orange, Amber, Green, Teal, Blue, Indigo, Purple, Pink, Rose + Default/reset)
- **Highlight colour picker** — 6 highlight colours (Yellow, Green, Blue, Pink, Orange, Purple) + remove highlight button
- **Sticky toolbar** — toolbar is now `sticky top-0` so it stays visible as content grows; the editor content area expands downward
- All dropdowns close when clicking outside (click-outside handler)

**New TipTap extensions installed:**
- `@tiptap/extension-text-style` — enables inline text styling
- `@tiptap/extension-color` — enables text colour
- `@tiptap/extension-character-count` — provides word/char count

**Styling:**
- All UI uses Tailwind CSS + `cn()` utility
- Inline `style` only used on dynamic colour swatches (necessary — Tailwind cannot generate arbitrary dynamic colours)
- CSS file (`RichTextEditor.css`) retained only for ProseMirror content styles

---

### MODIFIED — `src/components/admin/RichTextEditor.css`

Minor additions to support new editor features:
- Rule to allow inline `color` styles to render on `<span>` elements
- Updated `<mark>` styling for highlight colours

---

## 5. Authentication & Routing

---

### NEW — `src/proxy.ts`  *(replaces `src/middleware.ts`)*

Next.js 16 renamed `middleware.ts` to `proxy.ts` and the exported function from `middleware` to `proxy`.

**Route protection rules (unchanged in logic):**

| Route | Rule |
|-------|------|
| `/admin/login` | If already logged in → redirect to `/admin` (or `/blogger` if blogger role) |
| `/blogger/login` | If already logged in → redirect to `/blogger` (or `/admin` if admin) |
| `/admin/*` | Requires session; blogger role → redirected to `/blogger` |
| `/blogger/*` | Requires session; non-blogger role → redirected to `/admin` |

---

### DELETED — `src/middleware.ts`

Replaced by `src/proxy.ts` (Next.js 16 convention change).

---

### MODIFIED — `src/hooks/useAuth.ts`

**What was changed:**
- `logout()` now checks the user's role before redirecting
- Bloggers are sent to `/blogger/login` on logout
- Admins are sent to `/admin/login` on logout
- Previously all users were sent to `/admin/login` regardless of role

---

## 6. API Routes

---

### NEW — `src/app/api/bloggers/route.ts`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/bloggers` | Lists all Supabase Auth users with `role: 'blogger'` |
| `POST` | `/api/bloggers` | Creates a new Supabase Auth user with `role: 'blogger'`, `name`, `bio` |

---

### NEW — `src/app/api/bloggers/[id]/route.ts`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/bloggers/[id]` | Get a single blogger's details |
| `PUT` | `/api/bloggers/[id]` | Update blogger's `name` and `bio` in `user_metadata` |
| `DELETE` | `/api/bloggers/[id]` | Delete blogger's Supabase Auth account |

---

### NEW — `src/app/api/blogger/me/stats/route.ts`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/blogger/me/stats?userId=` | Returns `{ total, published, drafts }` post counts for the given `author_id` |

---

### MODIFIED — `src/app/api/blog/route.ts`

**What was changed:**

1. `POST` handler now saves `author_id` to the database (was missing — critical bug fix)
2. `GET` handler now supports `?author_id=` query parameter for server-side filtering (bloggers now fetch only their own posts — was previously fetching all posts and filtering client-side)

---

### MODIFIED — `src/app/api/blog/[slug]/route.ts`

**What was changed:**

1. `PATCH` — added ownership check: if `author_id` is sent in the request body, verifies it matches the post's stored `author_id` before allowing the update. Returns `403` if mismatch.
2. `DELETE` — added ownership check: reads `?author_id=` from query params, verifies against stored `author_id` before allowing deletion. Returns `403` if mismatch.

---

## 7. Infrastructure & Config

---

### MODIFIED — `next.config.ts`

**What was changed:**

1. **Content Security Policy (CSP) — `connect-src`:**
   - Added `https://*.supabase.co` (wildcard — covers all Supabase project IDs)
   - Added `https://www.googleadservices.com`
   - Added `https://www.google.com`
   - Added `https://www.google.com.pk`
   - Added `https://googleads.g.doubleclick.net`
   - *These were blocking Supabase auth calls and Google Ads conversion tracking*

2. **CSP — `script-src` and `script-src-elem`:**
   - Added `https://googleads.g.doubleclick.net`
   - Added `https://www.googleadservices.com`

3. **`images.remotePatterns`:**
   - Changed hardcoded Supabase project hostname to wildcard `*.supabase.co`
   - Prevents breaking if Supabase project is ever migrated

---

### MODIFIED — `package.json` + `package-lock.json`

**New packages added:**

| Package | Version | Purpose |
|---------|---------|---------|
| `@tiptap/extension-text-style` | `^3.x` | Enables inline text style (required for colour) |
| `@tiptap/extension-color` | `^3.x` | Text colour in the editor |
| `@tiptap/extension-character-count` | `^3.x` | Word and character count |

---

### MODIFIED — `src/lib/email.ts`

Minor update to email utility (formatting or template adjustment).

---

### MODIFIED — `next-env.d.ts`

Auto-generated by Next.js — updated when Next.js version or config changed.

---

## 8. File Reference Table

| File | Status | Category |
|------|--------|----------|
| `src/app/blogger/login/page.tsx` | **NEW** | Blogger Portal |
| `src/app/blogger/layout.tsx` | **NEW** | Blogger Portal |
| `src/app/blogger/page.tsx` | **NEW** | Blogger Portal |
| `src/app/blogger/blogs/page.tsx` | **NEW** | Blogger Portal |
| `src/app/blogger/blogs/new/page.tsx` | **NEW** | Blogger Portal |
| `src/app/blogger/blogs/[id]/edit/page.tsx` | **NEW** | Blogger Portal |
| `src/app/blogger/profile/page.tsx` | **NEW** | Blogger Portal |
| `src/components/blogger/BloggerSidebar.tsx` | **NEW** | Blogger Portal |
| `src/components/blogger/BloggerHeader.tsx` | **NEW** | Blogger Portal |
| `src/app/admin/bloggers/page.tsx` | **NEW** | Admin Panel |
| `src/app/api/bloggers/route.ts` | **NEW** | API |
| `src/app/api/bloggers/[id]/route.ts` | **NEW** | API |
| `src/app/api/blogger/me/stats/route.ts` | **NEW** | API |
| `src/proxy.ts` | **NEW** | Auth/Routing |
| `docs/guides/BLOG_MANAGEMENT_SYSTEM.md` | **NEW** | Documentation |
| `src/app/admin/page.tsx` | **MODIFIED** | Admin Panel |
| `src/app/admin/login/page.tsx` | **MODIFIED** | Admin Panel |
| `src/components/admin/AdminSidebar.tsx` | **MODIFIED** | Admin Panel |
| `src/components/admin/AdminHeader.tsx` | **MODIFIED** | Admin Panel |
| `src/components/admin/RichTextEditor.tsx` | **MODIFIED** | Editor |
| `src/components/admin/RichTextEditor.css` | **MODIFIED** | Editor |
| `src/components/layout/Topbar.tsx` | **MODIFIED** | Public Website |
| `src/components/layout/Footer.tsx` | **MODIFIED** | Public Website |
| `src/components/layout/FloatingActions.tsx` | **MODIFIED** | Public Website |
| `src/app/layout.tsx` | **MODIFIED** | Public Website |
| `src/app/api/blog/route.ts` | **MODIFIED** | API |
| `src/app/api/blog/[slug]/route.ts` | **MODIFIED** | API |
| `src/hooks/useAuth.ts` | **MODIFIED** | Auth/Routing |
| `src/lib/email.ts` | **MODIFIED** | Utilities |
| `next.config.ts` | **MODIFIED** | Config |
| `next-env.d.ts` | **MODIFIED** | Config |
| `package.json` | **MODIFIED** | Config |
| `package-lock.json` | **MODIFIED** | Config |
| `src/middleware.ts` | **DELETED** | Auth/Routing |

---

**Total:** 15 new files · 18 modified files · 1 deleted file
*Documented March 2026 — JS Choice Group Website*
