# Blog Management System — Complete Implementation Guide

**Project:** JS Choice Group Website
**Feature:** Blog Management System with Role-Based Access Control
**Date:** March 2026
**Status:** Complete (Frontend Ready, Supabase Integration Pending .env setup)

---

## Table of Contents

1. [Overview](#overview)
2. [System Architecture](#system-architecture)
3. [User Roles](#user-roles)
4. [Authentication Flow](#authentication-flow)
5. [New Files Created](#new-files-created)
6. [Modified Existing Files](#modified-existing-files)
7. [API Endpoints](#api-endpoints)
8. [Database Requirements](#database-requirements)
9. [How to Set Up Supabase](#how-to-set-up-supabase)
10. [Page-by-Page Walkthrough](#page-by-page-walkthrough)
11. [Tech Stack Used](#tech-stack-used)

---

## Overview

A complete Blog Management System was built on top of the existing JS Choice Group website. It introduces two roles — **Super Admin** and **Blogger** — each with their own separate dashboard, login page, and set of permissions.

The system uses **Supabase Authentication** to manage users. The user's role (`super_admin` or `blogger`) is stored in Supabase `user_metadata`. All blog posts are saved to the existing `blog_posts` table in Supabase and published blog posts appear automatically on the public website at `/blog`.

---

## System Architecture

```
┌─────────────────────────────────────────────────────┐
│                   PUBLIC WEBSITE                    │
│              /blog  →  Shows published posts         │
└─────────────────────────────────────────────────────┘
                         ↑
                  Published posts
                         │
┌──────────────────────────────────────────────────────┐
│              SUPABASE DATABASE                       │
│  • auth.users (stores users + role in user_metadata) │
│  • blog_posts (title, content, author_id, status)    │
└──────────────────────────────────────────────────────┘
        ↑                            ↑
        │                            │
┌───────────────┐           ┌────────────────────┐
│  SUPER ADMIN  │           │      BLOGGER       │
│  /admin/login │           │  /blogger/login    │
│  /admin/*     │           │  /blogger/*        │
└───────────────┘           └────────────────────┘
```

---

## User Roles

### Super Admin
- Logs in at: `/admin/login`
- Has access to: `/admin/*`
- **Can do:**
  - View all blogs from all bloggers
  - Edit or delete any blog post
  - Add new bloggers (creates their Supabase account)
  - Edit blogger information (name, bio)
  - Delete blogger accounts
  - View full admin dashboard (leads, referrals, gallery, analytics)
  - See total blogger count on dashboard

### Blogger
- Logs in at: `/blogger/login`
- Has access to: `/blogger/*`
- **Can do:**
  - Write new blog posts (rich text editor)
  - Edit and delete their own blog posts
  - Save as Draft or Publish immediately
  - View stats (total/published/draft count)
  - Update their own profile (name, bio, password)

---

## Authentication Flow

```
User visits /admin/login or /blogger/login
         │
         ▼
  Enter email + password
         │
         ▼
  Supabase Auth checks credentials
         │
    ┌────┴────┐
    │         │
  Admin    Blogger
    │         │
    ▼         ▼
/admin    /blogger
dashboard  dashboard
```

**Role is checked at every route** via Next.js Middleware:
- A blogger trying to access `/admin` → redirected to `/blogger`
- A super admin trying to access `/blogger` → redirected to `/admin`
- Unauthenticated user accessing `/admin/*` → redirected to `/admin/login`
- Unauthenticated user accessing `/blogger/*` → redirected to `/blogger/login`

---

## New Files Created

### 1. Blogger Login Page
**File:** `src/app/blogger/login/page.tsx`
**URL:** `/blogger/login`
**What it does:** Separate login page for bloggers only. Uses a green/emerald color theme to visually distinguish it from the admin login. Validates that the logged-in user has `role: 'blogger'` — if an admin accidentally uses this page, they are blocked with an error message.

---

### 2. Blogger Layout
**File:** `src/app/blogger/layout.tsx`
**What it does:** Wraps all `/blogger/*` pages. Checks authentication on every page load — if the user is not logged in or not a blogger, they are redirected to `/blogger/login`. Renders the sidebar and header for the blogger dashboard.

---

### 3. Blogger Dashboard
**File:** `src/app/blogger/page.tsx`
**URL:** `/blogger`
**What it does:** The home page after a blogger logs in. Shows:
- Welcome message with blogger's name
- 3 stat cards: Total Blogs Written, Published Blogs, Draft Blogs
- 4th card: Quick shortcut to write a new blog
- Recent Blogs table (last 5 posts)
- Quick Action buttons (Write New Blog, View All Blogs)

---

### 4. All Blogs Page (Blogger)
**File:** `src/app/blogger/blogs/page.tsx`
**URL:** `/blogger/blogs`
**What it does:** Shows a list of all blog posts written by the logged-in blogger. Features:
- Search by title
- Filter by status (All / Published / Draft)
- Pagination (10 posts per page)
- Actions: Edit, Delete (with confirmation modal)
- Status badges (green = published, gray = draft)

---

### 5. Write New Blog Page
**File:** `src/app/blogger/blogs/new/page.tsx`
**URL:** `/blogger/blogs/new`
**What it does:** Full blog creation form with:
- Title input (auto-generates URL slug)
- Rich text editor (WYSIWYG) for blog content
- Excerpt / short description
- Category and Tags fields
- Featured Image (upload from computer or paste URL)
- Status dropdown (Draft / Published)
- **Save Draft** and **Publish Now** buttons
- Automatically sets `author_id` and `author_name` from the logged-in blogger

---

### 6. Edit Blog Page (Blogger)
**File:** `src/app/blogger/blogs/[id]/edit/page.tsx`
**URL:** `/blogger/blogs/[id]/edit`
**What it does:** Pre-fills the blog form with existing post data fetched from Supabase by post ID. Same fields as the New Blog page. Saves changes via `PATCH /api/blog/[slug]`.

---

### 7. Profile Settings Page
**File:** `src/app/blogger/profile/page.tsx`
**URL:** `/blogger/profile`
**What it does:** Allows the blogger to:
- Update their display name and bio
- See their email (read-only)
- Change their password (requires new password + confirmation)

---

### 8. Blogger Sidebar Component
**File:** `src/components/blogger/BloggerSidebar.tsx`
**What it does:** Left-side navigation for the blogger dashboard. Contains:
- Logo and "Blogger Portal" branding
- Navigation: Dashboard, All Blogs, Write Blog, Profile Settings
- Collapsible on desktop (icon-only mode)
- Slide-in drawer on mobile
- Logout button
- User profile card at the bottom (name, email)

---

### 9. Blogger Header Component
**File:** `src/components/blogger/BloggerHeader.tsx`
**What it does:** Top bar for the blogger dashboard. Contains:
- Hamburger menu button (mobile)
- Link to view the public website
- Profile dropdown (shows name, email, logout option)

---

### 10. Blogger Manager Page (Admin)
**File:** `src/app/admin/bloggers/page.tsx`
**URL:** `/admin/bloggers`
**What it does:** Allows the Super Admin to manage all blogger accounts:
- View all bloggers in a table (name, email, bio, join date)
- **Add Blogger** button → opens modal with: Name, Email, Password, Bio fields
- **Edit** button → opens modal to update name and bio
- **Delete** button → confirmation modal before deleting the account
- Mobile-responsive card layout on small screens
- Shows total blogger count

---

### 11. Bloggers API (Collection)
**File:** `src/app/api/bloggers/route.ts`
**Endpoints:**
- `GET /api/bloggers` → Returns list of all users with `role: 'blogger'`
- `POST /api/bloggers` → Creates a new blogger account in Supabase Auth

---

### 12. Bloggers API (Individual)
**File:** `src/app/api/bloggers/[id]/route.ts`
**Endpoints:**
- `GET /api/bloggers/[id]` → Get one blogger's details
- `PUT /api/bloggers/[id]` → Update blogger's name and bio
- `DELETE /api/bloggers/[id]` → Delete blogger's Supabase account

---

### 13. Blogger Stats API
**File:** `src/app/api/blogger/me/stats/route.ts`
**Endpoint:** `GET /api/blogger/me/stats?userId=xxx`
**What it does:** Returns 3 numbers for the blogger's dashboard: total posts, published posts, draft posts — all filtered by `author_id = userId`.

---

## Modified Existing Files

> ⚠️ These files existed before. Only small targeted additions were made. No existing functionality was removed or broken.

### 1. Middleware
**File:** `src/middleware.ts`
**What changed:** Added protection for `/blogger/*` routes. Now handles:
- Both `/admin/login` and `/blogger/login` paths
- Role-based redirects when already logged in
- Sending bloggers to `/blogger/login` and admins to `/admin/login` when unauthorized

### 2. Admin Sidebar
**File:** `src/components/admin/AdminSidebar.tsx`
**What changed:** Added one new menu item — **"Bloggers"** — linking to `/admin/bloggers` with a `Users2` icon. Positioned after "Blog Posts" in the menu list.

### 3. Admin Dashboard
**File:** `src/app/admin/page.tsx`
**What changed:** Added a **"Total Bloggers"** stat card that fetches the count from `/api/bloggers`. Now shows 5 stat cards total (was 4 before).

### 4. Admin Login Page
**File:** `src/app/admin/login/page.tsx`
**What changed:** After successful login, checks `user_metadata.role`. If the user is a blogger, redirects to `/blogger` instead of `/admin`.

### 5. useAuth Hook
**File:** `src/hooks/useAuth.ts`
**What changed:** Logout now redirects bloggers to `/blogger/login` and admins to `/admin/login` based on their role.

### 6. Supabase Client
**File:** `src/lib/supabase.ts`
**What changed:** No functional change — restored to original clean implementation.

---

## API Endpoints

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| GET | `/api/bloggers` | Yes (admin) | List all bloggers |
| POST | `/api/bloggers` | Yes (admin) | Create new blogger |
| GET | `/api/bloggers/[id]` | Yes (admin) | Get single blogger |
| PUT | `/api/bloggers/[id]` | Yes (admin) | Update blogger name/bio |
| DELETE | `/api/bloggers/[id]` | Yes (admin) | Delete blogger account |
| GET | `/api/blogger/me/stats?userId=` | Yes (blogger) | Get blogger's blog stats |

**Existing blog APIs used by bloggers (unchanged):**

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/blog?admin=true` | List all blog posts |
| POST | `/api/blog` | Create new blog post |
| PATCH | `/api/blog/[slug]` | Update blog post |
| DELETE | `/api/blog/[slug]` | Delete blog post |
| POST | `/api/blog/upload` | Upload featured image |

---

## Database Requirements

Only the existing `blog_posts` table is used. No new tables were created.

**Verify this column exists** (run in Supabase SQL Editor):

```sql
-- Ensure author_id column exists in blog_posts
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'blog_posts' AND column_name = 'author_id'
  ) THEN
    ALTER TABLE blog_posts ADD COLUMN author_id UUID REFERENCES auth.users(id);
  END IF;
END $$;
```

**Roles are stored in Supabase Auth `user_metadata`** — no separate roles table needed.

---

## How to Set Up Supabase

### Step 1 — Add Environment Variables
Create/update `.env.local` in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Get these values from: **Supabase Dashboard → Settings → API**

### Step 2 — Create Super Admin
1. Go to **Supabase Dashboard → Authentication → Users → Add User**
2. Enter email and password
3. Run this SQL in the **SQL Editor**:

```sql
UPDATE auth.users
SET raw_user_meta_data = jsonb_set(
  COALESCE(raw_user_meta_data, '{}'::jsonb),
  '{role}',
  '"super_admin"'
)
WHERE email = 'your-admin@email.com';
```

### Step 3 — Create Bloggers
Bloggers are created from the Super Admin panel:
1. Login as Super Admin → go to `/admin/bloggers`
2. Click **Add New Blogger**
3. Fill in: Name, Email, Password, Bio
4. The system automatically creates the Supabase user with `role: 'blogger'`

### Step 4 — Restart Dev Server
```bash
npm run dev
```

---

## Page-by-Page Walkthrough

### Super Admin Journey
```
/admin/login  →  Enter admin credentials
      ↓
/admin        →  Dashboard (leads, blogs, bloggers stats)
      ↓
/admin/bloggers  →  See all bloggers, add/edit/delete
      ↓
/admin/blog      →  See ALL blogs from all bloggers
      ↓
/admin/blog/new  →  Create a new blog post as admin
```

### Blogger Journey
```
/blogger/login  →  Enter blogger credentials
      ↓
/blogger        →  Dashboard (my stats, recent posts)
      ↓
/blogger/blogs       →  All my posts (search, filter, delete)
      ↓
/blogger/blogs/new   →  Write a new blog post
      ↓
/blogger/blogs/[id]/edit  →  Edit an existing post
      ↓
/blogger/profile     →  Update my name, bio, password
```

---

## Tech Stack Used

| Technology | Purpose |
|------------|---------|
| **Next.js 16** (App Router) | Framework — pages, layouts, API routes |
| **TypeScript** | Type safety across all files |
| **Supabase** | Authentication (users, sessions, roles) + Database (blog posts) |
| **Tailwind CSS v4** | All styling and responsive design |
| **Framer Motion** | Animations (modals, page transitions, sidebar) |
| **Lucide React** | Icons throughout the UI |
| **TipTap (WYSIWYG)** | Rich text editor for blog writing |
| **Next.js Middleware** | Route protection and role-based redirects |

---

## File Count Summary

| Category | Files |
|----------|-------|
| New Blogger Pages | 6 |
| New Admin Pages | 1 |
| New API Routes | 3 |
| New Components | 2 |
| Modified Existing Files | 6 |
| **Total** | **18** |

---

*Document prepared for project handover — March 2026*
