# JS CHOICE GROUP - CUSTOM CRM DEVELOPMENT GUIDE
## Complete Technical Specification for Developers

---

**Document Version:** 1.0  
**Date:** February 2026  
**Project:** JS Choice Group Website CRM  
**Client:** JS Choice Care and Support (NDIS Provider)  
**Prepared For:** Development Team

---

# TABLE OF CONTENTS

1. [Project Overview](#1-project-overview)
2. [Technology Stack](#2-technology-stack)
3. [Database Schema](#3-database-schema)
4. [Feature Requirements](#4-feature-requirements)
5. [Lead Management System](#5-lead-management-system)
6. [Blog/Content Management System](#6-blogcontent-management-system)
7. [Admin Dashboard UI](#7-admin-dashboard-ui)
8. [API Endpoints](#8-api-endpoints)
9. [Authentication & Security](#9-authentication--security)
10. [Email Notifications](#10-email-notifications)
11. [Reporting & Analytics](#11-reporting--analytics)
12. [Future Enhancements](#12-future-enhancements)
13. [Testing Checklist](#13-testing-checklist)

---

# 1. PROJECT OVERVIEW

## 1.1 Business Context

JS Choice Group is an NDIS (National Disability Insurance Scheme) service provider in Melbourne, Australia. They need a custom CRM integrated into their NextJS website to:

1. **Manage Leads** - Capture and track leads from website forms
2. **Blog Management** - Create, edit, and publish blog articles
3. **Track Conversions** - Monitor lead → client conversion
4. **Team Collaboration** - Assign leads to team members

## 1.2 Lead Sources

The CRM will capture leads from these sources:

| Source | Form Location | Priority |
|--------|---------------|----------|
| **Contact Form** | `/contact-us` page | High |
| **Service Matcher** | `/tools/service-matcher` | Very High |
| **Budget Calculator** | `/tools/ndis-budget-calculator` (optional save) | Medium |
| **Blog Subscription** | Blog pages (newsletter signup) | Low |
| **Eligibility Checker** | `/tools/eligibility-checker` (future) | High |

## 1.3 Key Requirements

### Must Have (MVP)
- ✅ Lead capture from Contact Form
- ✅ Lead capture from Service Matcher
- ✅ Lead listing with search/filter
- ✅ Lead status management(New, Contacted, Converted, Lost)
- ✅ Basic lead details (name, email, phone, service interest, NDIS status, location)
- ✅ Blog post creation and management blog schedular must be added, instand publish and schedule must be added
- ✅ Admin login with authentication
- ✅ Email notification on new lead

### Should Have (Phase 1)
- ✅ Lead assignment to team members
- ✅ Notes and activity log per lead
- ✅ Lead source tracking
- ✅ NDIS-specific fields (NDIS status, location)
- ✅ Export leads to CSV
- ✅ Blog categories and tags
- ✅ Dashboard with basic stats

### Nice to Have (Phase 2)
- ⬜ Task/follow-up reminders
- ⬜ Email templates
- ⬜ Advanced analytics
- ⬜ Document uploads per lead
- ⬜ API access for integrations

---

# 2. TECHNOLOGY STACK

## 2.1 Required Technologies

| Component | Technology | Notes |
|-----------|------------|-------|
| **Frontend** | NextJS 14+ (App Router) | Already in use |
| **Styling** | Tailwind CSS | Already in use |
| **Database** | Supabase (PostgreSQL) | Already configured |
| **Authentication** | Supabase Auth | Built-in with Supabase |
| **File Storage** | Supabase Storage | For blog images |
| **Email** | Resend / SendGrid / Supabase | For notifications |
| **Hosting** | Vercel | Already configured |

## 2.2 NPM Packages to Install

```bash
npm install @supabase/supabase-js @supabase/ssr
npm install @supabase/auth-helpers-nextjs
npm install react-quill         # Rich text editor for blog
npm install date-fns            # Date formatting
npm install react-hot-toast     # Toast notifications
npm install lucide-react        # Icons
npm install papaparse           # CSV export
npm install resend              # Email (or use SendGrid)
```

## 2.3 Folder Structure

```
src/
├── app/
│   ├── admin/                      # CRM Admin pages
│   │   ├── layout.tsx              # Admin layout with sidebar
│   │   ├── page.tsx                # Dashboard
│   │   ├── leads/
│   │   │   ├── page.tsx            # Lead list
│   │   │   └── [id]/
│   │   │       └── page.tsx        # Lead detail
│   │   ├── blog/
│   │   │   ├── page.tsx            # Blog post list
│   │   │   ├── new/
│   │   │   │   └── page.tsx        # Create new post
│   │   │   └── [id]/
│   │   │       └── edit/
│   │   │           └── page.tsx    # Edit post
│   │   ├── settings/
│   │   │   └── page.tsx            # CRM settings
│   │   └── login/
│   │       └── page.tsx            # Admin login
│   ├── api/
│   │   ├── leads/
│   │   │   ├── route.ts            # GET all, POST new
│   │   │   └── [id]/
│   │   │       └── route.ts        # GET, PUT, DELETE single
│   │   ├── blog/
│   │   │   ├── route.ts            # Blog CRUD
│   │   │   └── [slug]/
│   │   │       └── route.ts        # Single post
│   │   └── auth/
│   │       └── route.ts            # Auth endpoints
│   └── blog/                       # Public blog pages
│       ├── page.tsx                # Blog listing
│       └── [slug]/
│           └── page.tsx            # Single blog post
├── components/
│   └── admin/                      # Admin components
│       ├── Sidebar.tsx
│       ├── Header.tsx
│       ├── LeadTable.tsx
│       ├── LeadForm.tsx
│       ├── LeadStatusBadge.tsx
│       ├── BlogEditor.tsx
│       ├── StatsCard.tsx
│       └── ActivityLog.tsx
├── lib/
│   ├── supabase.ts                 # Supabase client
│   ├── supabase-admin.ts           # Server-side client
│   └── email.ts                    # Email functions
└── types/
    └── crm.ts                      # CRM type definitions
```

---

# 3. DATABASE SCHEMA

## 3.1 Complete SQL Schema

Run this SQL in Supabase SQL Editor:

```sql
-- ============================================================================
-- JS CHOICE CRM DATABASE SCHEMA
-- ============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- TABLE: leads
-- Main table for storing all leads
-- ============================================================================

CREATE TABLE IF NOT EXISTS leads (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    
    -- Contact Information
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100),
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    
    -- Source Tracking
    source VARCHAR(100) NOT NULL DEFAULT 'contact_form',
    -- Values: 'contact_form', 'service_matcher', 'budget_calculator', 'blog_subscription', 'referral', 'other'
    source_page TEXT,                   -- URL where lead converted
    source_details JSONB,               -- Additional source data
    
    -- NDIS-Specific Information
    ndis_participant BOOLEAN,           -- Is NDIS participant?
    ndis_status VARCHAR(50),            -- 'funded', 'pending', 'applying', 'not_sure'
    ndis_number VARCHAR(50),            -- NDIS participant number (optional)
    
    -- Service Interest
    interested_services TEXT[],         -- Array of service slugs
    service_matcher_answers JSONB,      -- Full answers from service matcher
    
    -- Location
    location VARCHAR(100),              -- Suburb/area
    state VARCHAR(50) DEFAULT 'VIC',    -- State
    
    -- Communication
    message TEXT,                       -- Initial message/enquiry
    preferred_contact VARCHAR(50) DEFAULT 'email', -- 'email', 'phone', 'either'
    
    -- Budget (from calculator)
    budget_estimate DECIMAL(10, 2),
    budget_items JSONB,                 -- Items from budget calculator
    
    -- Lead Management
    status VARCHAR(50) DEFAULT 'new',
    -- Values: 'new', 'contacted', 'qualified', 'proposal', 'won', 'lost', 'archived'
    status_reason TEXT,                 -- Reason for won/lost
    priority VARCHAR(20) DEFAULT 'normal', -- 'low', 'normal', 'high', 'urgent'
    
    -- Assignment
    assigned_to UUID REFERENCES auth.users(id),
    assigned_at TIMESTAMP WITH TIME ZONE,
    
    -- Follow-up
    next_followup_date DATE,
    next_followup_note TEXT,
    
    -- Conversion
    converted_at TIMESTAMP WITH TIME ZONE,
    client_id VARCHAR(100),             -- Reference to client system if any
    
    -- Notes (simple text, activity log is separate)
    internal_notes TEXT,
    
    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id),
    
    -- UTM Tracking
    utm_source VARCHAR(255),
    utm_medium VARCHAR(255),
    utm_campaign VARCHAR(255),
    utm_content VARCHAR(255),
    utm_term VARCHAR(255)
);

-- Indexes for leads
CREATE INDEX idx_leads_email ON leads(email);
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_source ON leads(source);
CREATE INDEX idx_leads_assigned ON leads(assigned_to);
CREATE INDEX idx_leads_created ON leads(created_at DESC);
CREATE INDEX idx_leads_followup ON leads(next_followup_date) WHERE next_followup_date IS NOT NULL;

-- ============================================================================
-- TABLE: lead_activities
-- Activity log for each lead
-- ============================================================================

CREATE TABLE IF NOT EXISTS lead_activities (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
    
    -- Activity Type
    activity_type VARCHAR(50) NOT NULL,
    -- Values: 'created', 'status_changed', 'note_added', 'email_sent', 'call_logged', 
    --         'meeting_scheduled', 'assigned', 'followup_set', 'converted', 'other'
    
    -- Activity Details
    title VARCHAR(255) NOT NULL,
    description TEXT,
    
    -- For status changes
    old_value VARCHAR(255),
    new_value VARCHAR(255),
    
    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id),
    created_by_name VARCHAR(255)        -- Denormalized for display
);

-- Indexes for activities
CREATE INDEX idx_activities_lead ON lead_activities(lead_id);
CREATE INDEX idx_activities_created ON lead_activities(created_at DESC);

-- ============================================================================
-- TABLE: lead_tasks
-- Tasks/reminders for leads
-- ============================================================================

CREATE TABLE IF NOT EXISTS lead_tasks (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
    
    -- Task Details
    title VARCHAR(255) NOT NULL,
    description TEXT,
    task_type VARCHAR(50) DEFAULT 'followup',
    -- Values: 'followup', 'call', 'email', 'meeting', 'other'
    
    -- Due Date
    due_date DATE NOT NULL,
    due_time TIME,
    
    -- Assignment
    assigned_to UUID REFERENCES auth.users(id),
    
    -- Status
    is_completed BOOLEAN DEFAULT FALSE,
    completed_at TIMESTAMP WITH TIME ZONE,
    completed_by UUID REFERENCES auth.users(id),
    
    -- Priority
    priority VARCHAR(20) DEFAULT 'normal',
    
    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id)
);

-- Indexes for tasks
CREATE INDEX idx_tasks_lead ON lead_tasks(lead_id);
CREATE INDEX idx_tasks_due ON lead_tasks(due_date) WHERE NOT is_completed;
CREATE INDEX idx_tasks_assigned ON lead_tasks(assigned_to) WHERE NOT is_completed;

-- ============================================================================
-- TABLE: blog_posts
-- Blog articles for the website
-- ============================================================================

CREATE TABLE IF NOT EXISTS blog_posts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    
    -- Content
    title VARCHAR(500) NOT NULL,
    slug VARCHAR(500) UNIQUE NOT NULL,
    excerpt TEXT,                       -- Short summary for listing
    content TEXT NOT NULL,              -- Full HTML content
    
    -- Media
    featured_image TEXT,                -- URL to featured image
    featured_image_alt VARCHAR(255),
    
    -- Categorization
    category VARCHAR(100),
    tags TEXT[],                        -- Array of tags
    
    -- SEO
    meta_title VARCHAR(255),
    meta_description TEXT,
    canonical_url TEXT,
    
    -- Author
    author_id UUID REFERENCES auth.users(id),
    author_name VARCHAR(255),           -- Denormalized for display
    author_avatar TEXT,
    
    -- Publishing
    status VARCHAR(50) DEFAULT 'draft',
    -- Values: 'draft', 'published', 'scheduled', 'archived'
    published_at TIMESTAMP WITH TIME ZONE,
    scheduled_for TIMESTAMP WITH TIME ZONE,
    
    -- Engagement
    view_count INTEGER DEFAULT 0,
    
    -- Settings
    allow_comments BOOLEAN DEFAULT TRUE,
    is_featured BOOLEAN DEFAULT FALSE,
    
    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for blog
CREATE INDEX idx_blog_slug ON blog_posts(slug);
CREATE INDEX idx_blog_status ON blog_posts(status);
CREATE INDEX idx_blog_published ON blog_posts(published_at DESC) WHERE status = 'published';
CREATE INDEX idx_blog_category ON blog_posts(category);

-- ============================================================================
-- TABLE: blog_categories
-- Categories for blog posts
-- ============================================================================

CREATE TABLE IF NOT EXISTS blog_categories (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    parent_id UUID REFERENCES blog_categories(id),
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default categories
INSERT INTO blog_categories (name, slug, description, display_order) VALUES
    ('NDIS News', 'ndis-news', 'Latest news and updates about the NDIS', 1),
    ('Disability Support', 'disability-support', 'Information about disability support services', 2),
    ('Community', 'community', 'Community events and stories', 3),
    ('Tips & Guides', 'tips-guides', 'Helpful tips and guides for NDIS participants', 4),
    ('Company Updates', 'company-updates', 'News about JS Choice', 5)
ON CONFLICT (slug) DO NOTHING;

-- ============================================================================
-- TABLE: crm_users
-- Additional user profile data for CRM team members
-- ============================================================================

CREATE TABLE IF NOT EXISTS crm_users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    
    -- Profile
    display_name VARCHAR(255) NOT NULL,
    avatar_url TEXT,
    job_title VARCHAR(255),
    
    -- Contact
    phone VARCHAR(50),
    
    -- Role
    role VARCHAR(50) DEFAULT 'staff',
    -- Values: 'admin', 'manager', 'staff'
    
    -- Permissions (JSON for flexibility)
    permissions JSONB DEFAULT '{
        "leads": {"view": true, "edit": true, "delete": false, "export": false},
        "blog": {"view": true, "edit": true, "publish": false, "delete": false},
        "settings": {"view": false, "edit": false}
    }'::jsonb,
    
    -- Settings
    email_notifications BOOLEAN DEFAULT TRUE,
    
    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_login TIMESTAMP WITH TIME ZONE
);

-- ============================================================================
-- TABLE: email_templates
-- Reusable email templates
-- ============================================================================

CREATE TABLE IF NOT EXISTS email_templates (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    subject VARCHAR(500) NOT NULL,
    body TEXT NOT NULL,                 -- HTML content with {{variables}}
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default templates
INSERT INTO email_templates (name, slug, subject, body, description) VALUES
    (
        'New Lead Notification',
        'new-lead-notification',
        'New Lead: {{first_name}} {{last_name}} from {{source}}',
        '<h2>New Lead Received</h2>
        <p><strong>Name:</strong> {{first_name}} {{last_name}}</p>
        <p><strong>Email:</strong> {{email}}</p>
        <p><strong>Phone:</strong> {{phone}}</p>
        <p><strong>Source:</strong> {{source}}</p>
        <p><strong>Message:</strong></p>
        <p>{{message}}</p>
        <hr>
        <p><a href="{{crm_link}}">View in CRM</a></p>',
        'Sent to team when new lead is received'
    ),
    (
        'Lead Follow-up Reminder',
        'lead-followup-reminder',
        'Follow-up Reminder: {{first_name}} {{last_name}}',
        '<h2>Follow-up Reminder</h2>
        <p>You have a follow-up scheduled for <strong>{{lead_name}}</strong>.</p>
        <p><strong>Due:</strong> {{due_date}}</p>
        <p><strong>Note:</strong> {{note}}</p>
        <p><a href="{{crm_link}}">View Lead</a></p>',
        'Reminder for scheduled follow-ups'
    )
ON CONFLICT (slug) DO NOTHING;

-- ============================================================================
-- TABLE: crm_settings
-- Global CRM settings
-- ============================================================================

CREATE TABLE IF NOT EXISTS crm_settings (
    key VARCHAR(100) PRIMARY KEY,
    value JSONB NOT NULL,
    description TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default settings
INSERT INTO crm_settings (key, value, description) VALUES
    ('notification_emails', '["admin@jschoicegroup.com.au"]'::jsonb, 'Email addresses to notify on new leads'),
    ('lead_statuses', '["new", "contacted", "qualified", "proposal", "won", "lost", "archived"]'::jsonb, 'Available lead statuses'),
    ('lead_sources', '["contact_form", "service_matcher", "budget_calculator", "blog_subscription", "referral", "phone", "walk_in", "other"]'::jsonb, 'Available lead sources'),
    ('default_assignee', 'null'::jsonb, 'Default user to assign new leads to')
ON CONFLICT (key) DO NOTHING;

-- ============================================================================
-- FUNCTIONS: Auto-update timestamps
-- ============================================================================

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to tables
CREATE TRIGGER leads_updated_at
    BEFORE UPDATE ON leads
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER blog_posts_updated_at
    BEFORE UPDATE ON blog_posts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER crm_users_updated_at
    BEFORE UPDATE ON crm_users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================================
-- FUNCTIONS: Lead activity logging
-- ============================================================================

CREATE OR REPLACE FUNCTION log_lead_activity()
RETURNS TRIGGER AS $$
BEGIN
    -- Log status changes
    IF TG_OP = 'UPDATE' AND OLD.status IS DISTINCT FROM NEW.status THEN
        INSERT INTO lead_activities (lead_id, activity_type, title, old_value, new_value)
        VALUES (NEW.id, 'status_changed', 'Status changed', OLD.status, NEW.status);
    END IF;
    
    -- Log assignment changes
    IF TG_OP = 'UPDATE' AND OLD.assigned_to IS DISTINCT FROM NEW.assigned_to THEN
        INSERT INTO lead_activities (lead_id, activity_type, title, new_value)
        VALUES (NEW.id, 'assigned', 'Lead assigned', NEW.assigned_to::text);
    END IF;
    
    -- Log new leads
    IF TG_OP = 'INSERT' THEN
        INSERT INTO lead_activities (lead_id, activity_type, title, description)
        VALUES (NEW.id, 'created', 'Lead created', 'New lead from ' || NEW.source);
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER lead_activity_trigger
    AFTER INSERT OR UPDATE ON leads
    FOR EACH ROW EXECUTE FUNCTION log_lead_activity();

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================

-- Enable RLS
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_users ENABLE ROW LEVEL SECURITY;

-- Policies: Authenticated users can do everything (simplify for small team)
CREATE POLICY "Authenticated users can manage leads" ON leads
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can view activities" ON lead_activities
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage tasks" ON lead_tasks
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage blog" ON blog_posts
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Public can read published blog posts" ON blog_posts
    FOR SELECT USING (status = 'published');

CREATE POLICY "Authenticated users can view crm_users" ON crm_users
    FOR ALL USING (auth.role() = 'authenticated');

-- Public can insert leads (from website forms)
CREATE POLICY "Public can submit leads" ON leads
    FOR INSERT WITH CHECK (true);

-- ============================================================================
-- DONE!
-- ============================================================================
```

## 3.2 Entity Relationship Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                          auth.users                              │
│  (Supabase built-in authentication)                             │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            │ 1:1
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                         crm_users                                │
│  id, display_name, role, permissions, email_notifications       │
└───────────────────────────┬─────────────────────────────────────┘
                            │
              ┌─────────────┴─────────────┐
              │ assigned_to               │ author_id
              ▼                           ▼
┌──────────────────────────┐   ┌──────────────────────────┐
│         leads            │   │       blog_posts         │
│                          │   │                          │
│  id                      │   │  id                      │
│  first_name, last_name   │   │  title, slug             │
│  email, phone            │   │  content, excerpt        │
│  source, status          │   │  status, published_at    │
│  ndis_status             │   │  category, tags          │
│  interested_services     │   │  view_count              │
│  assigned_to             │   │  author_id               │
│  ...                     │   │  ...                     │
└───────────┬──────────────┘   └──────────────────────────┘
            │
            │ 1:many
            ▼
┌──────────────────────────┐   ┌──────────────────────────┐
│    lead_activities       │   │       lead_tasks         │
│                          │   │                          │
│  id                      │   │  id                      │
│  lead_id                 │   │  lead_id                 │
│  activity_type           │   │  title, due_date         │
│  title, description      │   │  assigned_to             │
│  old_value, new_value    │   │  is_completed            │
└──────────────────────────┘   └──────────────────────────┘
```

---

# 4. FEATURE REQUIREMENTS

## 4.1 Lead Management Features

### 4.1.1 Lead Capture
| Feature | Description | Priority |
|---------|-------------|----------|
| Contact Form Integration | Capture leads from `/contact-us` | Must Have |
| Service Matcher Integration | Capture leads + answers from Service Matcher | Must Have |
| Budget Calculator Save | Optional save calculation with email | Should Have |
| UTM Tracking | Capture marketing campaign data | Should Have |
| Source Page Tracking | Track which page lead came from | Must Have |

### 4.1.2 Lead Listing
| Feature | Description | Priority |
|---------|-------------|----------|
| Table View | Sortable, paginated list of leads | Must Have |
| Search | Search by name, email, phone | Must Have |
| Filter by Status | Filter: New, Contacted, Qualified, etc. | Must Have |
| Filter by Source | Filter: Contact Form, Service Matcher, etc. | Should Have |
| Filter by Date | Filter by date range | Should Have |
| Filter by Assigned | Filter by team member | Should Have |
| Bulk Actions | Select multiple + change status/assign | Nice to Have |

### 4.1.3 Lead Detail Page
| Feature | Description | Priority |
|---------|-------------|----------|
| Contact Info Display | Name, email, phone, location | Must Have |
| Edit Contact Info | Update lead details | Must Have |
| Status Management | Change status with dropdown | Must Have |
| Activity Timeline | Show all activities chronologically | Must Have |
| Add Note | Add internal notes | Must Have |
| Service Interests | Show services from Service Matcher | Must Have |
| NDIS Information | Show NDIS status, participant info | Must Have |
| Assignment | Assign to team member | Should Have |
| Tasks | View/add tasks for this lead | Should Have |
| Quick Actions | Email, Call, Schedule buttons | Nice to Have |

### 4.1.4 Lead Statuses
```
new        → Lead just submitted (auto)
contacted  → First contact made
qualified  → Confirmed as genuine opportunity
proposal   → Quote/proposal sent
won        → Converted to client ✅
lost       → Did not convert ❌
archived   → No longer active
```

## 4.2 Blog Features

### 4.2.1 Blog Management
| Feature | Description | Priority |
|---------|-------------|----------|
| Post List | Table of all blog posts | Must Have |
| Create Post | Rich text editor for new posts | Must Have |
| Edit Post | Edit existing posts | Must Have |
| Delete Post | Soft delete (archive) posts | Must Have |
| Publish/Draft | Toggle publish status | Must Have |
| Schedule Post | Set future publish date | Nice to Have |
| Featured Image | Upload header image | Must Have |
| Categories | Assign category | Must Have |
| Tags | Multiple tags per post | Should Have |
| SEO Fields | Meta title, description | Should Have |
| Preview | Preview before publishing | Should Have |
| View Count | Track page views | Should Have |

### 4.2.2 Public Blog
| Feature | Description | Priority |
|---------|-------------|----------|
| Blog Listing Page | Grid/list of published posts | Must Have |
| Single Post Page | Full article view | Must Have |
| Category Filter | Filter by category | Should Have |
| Recent Posts Widget | Sidebar with recent posts | Should Have |
| Related Posts | Show related articles | Nice to Have |
| Social Sharing | Share buttons | Nice to Have |

---

# 5. LEAD MANAGEMENT SYSTEM

## 5.1 Lead Capture Implementation

### 5.1.1 Contact Form Submission

**Frontend Component:**
```typescript
// src/components/ContactForm.tsx

'use client';

import { useState } from 'react';

interface ContactFormData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  message: string;
  preferred_contact: 'email' | 'phone' | 'either';
}

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name: formData.get('first_name'),
          last_name: formData.get('last_name'),
          email: formData.get('email'),
          phone: formData.get('phone'),
          message: formData.get('message'),
          preferred_contact: formData.get('preferred_contact'),
          source: 'contact_form',
          source_page: window.location.pathname,
          // UTM params
          utm_source: new URLSearchParams(window.location.search).get('utm_source'),
          utm_medium: new URLSearchParams(window.location.search).get('utm_medium'),
          utm_campaign: new URLSearchParams(window.location.search).get('utm_campaign'),
        }),
      });

      if (!response.ok) throw new Error('Submission failed');

      setSuccess(true);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="p-6 bg-green-50 border border-green-200 rounded-xl text-center">
        <h3 className="text-xl font-semibold text-green-800 mb-2">Thank You!</h3>
        <p className="text-green-700">
          We've received your message and will be in touch within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Form fields... */}
    </form>
  );
}
```

### 5.1.2 Service Matcher Lead Capture

The Service Matcher should capture:
1. All quiz answers
2. Contact information
3. Matched services

```typescript
// Data to send from Service Matcher

interface ServiceMatcherLead {
  // Contact info
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  
  // Source
  source: 'service_matcher';
  source_page: '/tools/service-matcher';
  
  // Quiz answers
  service_matcher_answers: {
    support_types: string[];      // ['daily_life', 'nursing', 'transport']
    ndis_status: string;          // 'yes_funded'
    location: string;             // 'point_cook'
    urgency: string;              // 'soon'
  };
  
  // Derived data
  interested_services: string[];   // Matched service slugs
  ndis_participant: boolean;
  ndis_status: string;
  location: string;
}
```

### 5.1.3 API Route for Lead Submission

```typescript
// src/app/api/leads/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase-admin';
import { sendNewLeadNotification } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const supabase = createServerClient();

    // Validate required fields
    if (!body.first_name || !body.email) {
      return NextResponse.json(
        { success: false, error: 'Name and email are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Prepare lead data
    const leadData = {
      first_name: body.first_name,
      last_name: body.last_name || null,
      email: body.email.toLowerCase().trim(),
      phone: body.phone || null,
      message: body.message || null,
      preferred_contact: body.preferred_contact || 'email',
      
      // Source
      source: body.source || 'contact_form',
      source_page: body.source_page || null,
      
      // NDIS info
      ndis_participant: body.ndis_participant || null,
      ndis_status: body.ndis_status || null,
      
      // Services
      interested_services: body.interested_services || null,
      service_matcher_answers: body.service_matcher_answers || null,
      
      // Location
      location: body.location || null,
      
      // Budget (if from calculator)
      budget_estimate: body.budget_estimate || null,
      budget_items: body.budget_items || null,
      
      // UTM
      utm_source: body.utm_source || null,
      utm_medium: body.utm_medium || null,
      utm_campaign: body.utm_campaign || null,
      
      // Default status
      status: 'new',
      priority: body.source === 'service_matcher' ? 'high' : 'normal',
    };

    // Insert lead
    const { data, error } = await supabase
      .from('leads')
      .insert(leadData)
      .select()
      .single();

    if (error) throw error;

    // Send notification email (async, don't wait)
    sendNewLeadNotification(data).catch(console.error);

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Lead submission error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to submit lead' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabase = createServerClient();
    const searchParams = request.nextUrl.searchParams;

    // Pagination
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = (page - 1) * limit;

    // Filters
    const status = searchParams.get('status');
    const source = searchParams.get('source');
    const search = searchParams.get('search');
    const assigned = searchParams.get('assigned');

    // Build query
    let query = supabase
      .from('leads')
      .select('*, crm_users!assigned_to(display_name)', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    // Apply filters
    if (status) query = query.eq('status', status);
    if (source) query = query.eq('source', source);
    if (assigned) query = query.eq('assigned_to', assigned);
    if (search) {
      query = query.or(`first_name.ilike.%${search}%,last_name.ilike.%${search}%,email.ilike.%${search}%,phone.ilike.%${search}%`);
    }

    const { data, error, count } = await query;

    if (error) throw error;

    return NextResponse.json({
      success: true,
      data: data || [],
      pagination: {
        total: count || 0,
        page,
        limit,
        totalPages: Math.ceil((count || 0) / limit),
      },
    });
  } catch (error) {
    console.error('Lead fetch error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch leads' },
      { status: 500 }
    );
  }
}
```

## 5.2 Lead Status Workflow

```
                    ┌──────────┐
                    │   NEW    │ ← Lead submitted
                    └────┬─────┘
                         │
                         ▼
                    ┌──────────┐
         ┌─────────│CONTACTED │ ← First contact made
         │         └────┬─────┘
         │              │
         │              ▼
         │         ┌──────────┐
         │         │QUALIFIED │ ← Confirmed genuine
         │         └────┬─────┘
         │              │
         │              ▼
         │         ┌──────────┐
         │         │PROPOSAL  │ ← Quote/info sent
         │         └────┬─────┘
         │              │
         │    ┌─────────┴─────────┐
         │    ▼                   ▼
         │ ┌──────┐           ┌──────┐
         │ │ WON  │ ✅        │ LOST │ ❌
         │ └──────┘           └──────┘
         │
         └─────────────────────────┐
                                   ▼
                              ┌─────────┐
                              │ARCHIVED │
                              └─────────┘
```

---

# 6. BLOG/CONTENT MANAGEMENT SYSTEM

## 6.1 Blog Editor Implementation

### 6.1.1 Rich Text Editor Setup

Use **React Quill** or **TipTap** for the editor:

```typescript
// src/components/admin/BlogEditor.tsx

'use client';

import { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';

// Dynamic import to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

interface BlogEditorProps {
  initialData?: {
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    category: string;
    tags: string[];
    featured_image: string;
    meta_title: string;
    meta_description: string;
    status: 'draft' | 'published';
  };
  onSave: (data: any) => Promise<void>;
}

export function BlogEditor({ initialData, onSave }: BlogEditorProps) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [slug, setSlug] = useState(initialData?.slug || '');
  const [content, setContent] = useState(initialData?.content || '');
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || '');
  const [category, setCategory] = useState(initialData?.category || '');
  const [tags, setTags] = useState<string[]>(initialData?.tags || []);
  const [featuredImage, setFeaturedImage] = useState(initialData?.featured_image || '');
  const [metaTitle, setMetaTitle] = useState(initialData?.meta_title || '');
  const [metaDescription, setMetaDescription] = useState(initialData?.meta_description || '');
  const [status, setStatus] = useState<'draft' | 'published'>(initialData?.status || 'draft');
  const [isSaving, setIsSaving] = useState(false);

  // Auto-generate slug from title
  const generateSlug = useCallback((text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }, []);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    if (!initialData?.slug) {
      setSlug(generateSlug(newTitle));
    }
  };

  const handleSave = async (publishStatus: 'draft' | 'published') => {
    setIsSaving(true);
    try {
      await onSave({
        title,
        slug,
        content,
        excerpt,
        category,
        tags,
        featured_image: featuredImage,
        meta_title: metaTitle || title,
        meta_description: metaDescription || excerpt,
        status: publishStatus,
        published_at: publishStatus === 'published' ? new Date().toISOString() : null,
      });
    } finally {
      setIsSaving(false);
    }
  };

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
      ['clean'],
    ],
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          placeholder="Enter post title..."
        />
      </div>

      {/* Slug */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
        <div className="flex items-center">
          <span className="text-gray-500 mr-2">/blog/</span>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>
      </div>

      {/* Content Editor */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
        <ReactQuill
          value={content}
          onChange={setContent}
          modules={quillModules}
          className="bg-white"
          style={{ height: '400px', marginBottom: '50px' }}
        />
      </div>

      {/* Excerpt */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt</label>
        <textarea
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          placeholder="Brief summary of the post..."
        />
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        >
          <option value="">Select category</option>
          <option value="ndis-news">NDIS News</option>
          <option value="disability-support">Disability Support</option>
          <option value="community">Community</option>
          <option value="tips-guides">Tips & Guides</option>
          <option value="company-updates">Company Updates</option>
        </select>
      </div>

      {/* Featured Image */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Featured Image URL</label>
        <input
          type="text"
          value={featuredImage}
          onChange={(e) => setFeaturedImage(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          placeholder="https://..."
        />
        {/* TODO: Add image upload component */}
      </div>

      {/* SEO Section */}
      <div className="p-4 bg-gray-50 rounded-lg">
        <h3 className="font-medium text-gray-900 mb-4">SEO Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Meta Title</label>
            <input
              type="text"
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder={title || 'Meta title...'}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description</label>
            <textarea
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              rows={2}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder={excerpt || 'Meta description...'}
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 pt-4 border-t">
        <button
          onClick={() => handleSave('draft')}
          disabled={isSaving}
          className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          {isSaving ? 'Saving...' : 'Save Draft'}
        </button>
        <button
          onClick={() => handleSave('published')}
          disabled={isSaving}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          {isSaving ? 'Publishing...' : 'Publish'}
        </button>
      </div>
    </div>
  );
}
```

## 6.2 Blog API Routes

```typescript
// src/app/api/blog/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase-admin';

// GET all posts (admin) or published posts (public)
export async function GET(request: NextRequest) {
  try {
    const supabase = createServerClient();
    const searchParams = request.nextUrl.searchParams;
    
    const isAdmin = searchParams.get('admin') === 'true';
    const category = searchParams.get('category');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = (page - 1) * limit;

    let query = supabase
      .from('blog_posts')
      .select('*', { count: 'exact' })
      .order('published_at', { ascending: false, nullsFirst: false })
      .range(offset, offset + limit - 1);

    // Public only sees published
    if (!isAdmin) {
      query = query.eq('status', 'published');
    }

    if (category) {
      query = query.eq('category', category);
    }

    const { data, error, count } = await query;

    if (error) throw error;

    return NextResponse.json({
      success: true,
      data: data || [],
      pagination: {
        total: count || 0,
        page,
        limit,
        totalPages: Math.ceil((count || 0) / limit),
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

// Create new post
export async function POST(request: NextRequest) {
  try {
    const supabase = createServerClient();
    const body = await request.json();

    // TODO: Add auth check

    const { data, error } = await supabase
      .from('blog_posts')
      .insert({
        title: body.title,
        slug: body.slug,
        content: body.content,
        excerpt: body.excerpt,
        category: body.category,
        tags: body.tags,
        featured_image: body.featured_image,
        meta_title: body.meta_title,
        meta_description: body.meta_description,
        status: body.status,
        published_at: body.status === 'published' ? new Date().toISOString() : null,
        author_name: 'JS Choice Team', // TODO: Get from auth
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create post' },
      { status: 500 }
    );
  }
}
```

---

# 7. ADMIN DASHBOARD UI

## 7.1 Admin Layout Structure

```typescript
// src/app/admin/layout.tsx

import { Sidebar } from '@/components/admin/Sidebar';
import { Header } from '@/components/admin/Header';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />
      <div className="ml-64">
        <Header />
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
```

## 7.2 Sidebar Navigation

```typescript
// src/components/admin/Sidebar.tsx

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Settings, 
  LogOut,
  ChevronRight
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Leads', href: '/admin/leads', icon: Users },
  { name: 'Blog', href: '/admin/blog', icon: FileText },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="fixed inset-y-0 left-0 w-64 bg-slate-800 text-white">
      {/* Logo */}
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-xl font-bold">JS Choice CRM</h1>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-blue-600 text-white' 
                  : 'text-slate-300 hover:bg-slate-700'
              }`}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-700">
        <button className="flex items-center gap-3 px-4 py-3 w-full text-slate-300 hover:bg-slate-700 rounded-lg">
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </div>
    </div>
  );
}
```

## 7.3 Dashboard Page

```typescript
// src/app/admin/page.tsx

import { createServerClient } from '@/lib/supabase-admin';
import { StatsCard } from '@/components/admin/StatsCard';
import { RecentLeadsTable } from '@/components/admin/RecentLeadsTable';

export default async function DashboardPage() {
  const supabase = createServerClient();

  // Get stats
  const { count: totalLeads } = await supabase
    .from('leads')
    .select('*', { count: 'exact', head: true });

  const { count: newLeads } = await supabase
    .from('leads')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'new');

  const { count: qualifiedLeads } = await supabase
    .from('leads')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'qualified');

  const { count: publishedPosts } = await supabase
    .from('blog_posts')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'published');

  // Get recent leads
  const { data: recentLeads } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Leads"
          value={totalLeads || 0}
          icon="users"
          color="blue"
        />
        <StatsCard
          title="New Leads"
          value={newLeads || 0}
          icon="user-plus"
          color="green"
          subtitle="Awaiting contact"
        />
        <StatsCard
          title="Qualified"
          value={qualifiedLeads || 0}
          icon="check-circle"
          color="purple"
        />
        <StatsCard
          title="Blog Posts"
          value={publishedPosts || 0}
          icon="file-text"
          color="orange"
        />
      </div>

      {/* Recent Leads */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Leads</h2>
        <RecentLeadsTable leads={recentLeads || []} />
      </div>
    </div>
  );
}
```

---

# 8. API ENDPOINTS

## 8.1 Complete API Reference

### Leads API

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/api/leads` | List all leads | Admin |
| `POST` | `/api/leads` | Create new lead | Public |
| `GET` | `/api/leads/[id]` | Get single lead | Admin |
| `PUT` | `/api/leads/[id]` | Update lead | Admin |
| `DELETE` | `/api/leads/[id]` | Delete lead | Admin |
| `GET` | `/api/leads/export` | Export to CSV | Admin |
| `POST` | `/api/leads/[id]/notes` | Add note | Admin |
| `POST` | `/api/leads/[id]/tasks` | Add task | Admin |

### Blog API

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/api/blog` | List posts | Public (published only) |
| `POST` | `/api/blog` | Create post | Admin |
| `GET` | `/api/blog/[slug]` | Get single post | Public (published) |
| `PUT` | `/api/blog/[slug]` | Update post | Admin |
| `DELETE` | `/api/blog/[slug]` | Delete post | Admin |
| `GET` | `/api/blog/categories` | List categories | Public |

### Auth API

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/api/auth/login` | Login | Public |
| `POST` | `/api/auth/logout` | Logout | Admin |
| `GET` | `/api/auth/me` | Get current user | Admin |

---

# 9. AUTHENTICATION & SECURITY

## 9.1 Supabase Auth Setup

```typescript
// src/lib/supabase.ts (Client-side)

import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
```

```typescript
// src/lib/supabase-admin.ts (Server-side)

import { createClient } from '@supabase/supabase-js';

export function createServerClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}
```

## 9.2 Auth Middleware

```typescript
// src/middleware.ts

import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options) {
          response.cookies.set({ name, value, ...options });
        },
        remove(name: string, options) {
          response.cookies.delete({ name, ...options });
        },
      },
    }
  );

  const { data: { session } } = await supabase.auth.getSession();

  // Protect admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!session && !request.nextUrl.pathname.startsWith('/admin/login')) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return response;
}

export const config = {
  matcher: ['/admin/:path*'],
};
```

## 9.3 Security Checklist

- ✅ Use Supabase RLS (Row Level Security)
- ✅ Validate all inputs server-side
- ✅ Sanitize HTML in blog content
- ✅ Rate limit API endpoints
- ✅ HTTPS only (Vercel default)
- ✅ Secure cookies for auth
- ✅ CSRF protection
- ✅ Input length limits

---

# 10. EMAIL NOTIFICATIONS

## 10.1 Email Setup with Resend

```typescript
// src/lib/email.ts

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface Lead {
  id: string;
  first_name: string;
  last_name?: string;
  email: string;
  phone?: string;
  source: string;
  message?: string;
}

export async function sendNewLeadNotification(lead: Lead) {
  const adminEmails = process.env.NOTIFICATION_EMAILS?.split(',') || [];
  
  if (adminEmails.length === 0) return;

  const sourceLabels: Record<string, string> = {
    contact_form: 'Contact Form',
    service_matcher: 'Service Matcher',
    budget_calculator: 'Budget Calculator',
  };

  try {
    await resend.emails.send({
      from: 'JS Choice CRM <noreply@jschoicegroup.com.au>',
      to: adminEmails,
      subject: `New Lead: ${lead.first_name} ${lead.last_name || ''} from ${sourceLabels[lead.source] || lead.source}`,
      html: `
        <h2>New Lead Received</h2>
        <p><strong>Name:</strong> ${lead.first_name} ${lead.last_name || ''}</p>
        <p><strong>Email:</strong> ${lead.email}</p>
        <p><strong>Phone:</strong> ${lead.phone || 'Not provided'}</p>
        <p><strong>Source:</strong> ${sourceLabels[lead.source] || lead.source}</p>
        ${lead.message ? `<p><strong>Message:</strong></p><p>${lead.message}</p>` : ''}
        <hr>
        <p><a href="${process.env.NEXT_PUBLIC_APP_URL}/admin/leads/${lead.id}">View in CRM</a></p>
      `,
    });
  } catch (error) {
    console.error('Failed to send notification:', error);
  }
}
```

## 10.2 Environment Variables for Email

```env
RESEND_API_KEY=re_xxxxxxxxxxxxx
NOTIFICATION_EMAILS=admin@jschoicegroup.com.au,manager@jschoicegroup.com.au
```

---

# 11. REPORTING & ANALYTICS

## 11.1 Lead Analytics

```typescript
// src/app/api/analytics/leads/route.ts

export async function GET() {
  const supabase = createServerClient();

  // Leads by status
  const { data: byStatus } = await supabase
    .from('leads')
    .select('status')
    .then(res => {
      const counts: Record<string, number> = {};
      res.data?.forEach(lead => {
        counts[lead.status] = (counts[lead.status] || 0) + 1;
      });
      return { data: counts };
    });

  // Leads by source
  const { data: bySource } = await supabase
    .from('leads')
    .select('source')
    .then(res => {
      const counts: Record<string, number> = {};
      res.data?.forEach(lead => {
        counts[lead.source] = (counts[lead.source] || 0) + 1;
      });
      return { data: counts };
    });

  // Leads over time (last 30 days)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const { data: overTime } = await supabase
    .from('leads')
    .select('created_at')
    .gte('created_at', thirtyDaysAgo.toISOString())
    .order('created_at');

  return NextResponse.json({
    byStatus,
    bySource,
    overTime,
  });
}
```

## 11.2 Export to CSV

```typescript
// src/app/api/leads/export/route.ts

import Papa from 'papaparse';

export async function GET() {
  const supabase = createServerClient();

  const { data: leads } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false });

  const csv = Papa.unparse(leads || []);

  return new Response(csv, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': `attachment; filename="leads-${new Date().toISOString().split('T')[0]}.csv"`,
    },
  });
}
```

---

# 12. FUTURE ENHANCEMENTS

## Phase 2 Features

| Feature | Description | Estimated Effort |
|---------|-------------|------------------|
| Email Templates | Reusable email templates | Medium |
| Task Reminders | Automated reminder emails | Medium |
| Advanced Analytics | Charts, conversion tracking | High |
| Document Uploads | Attach files to leads | Medium |
| API Webhooks | Notify external systems | Medium |
| Audit Log | Track all user actions | Medium |

## Phase 3 Features

| Feature | Description | Estimated Effort |
|---------|-------------|------------------|
| Client Portal | Let clients log in | High |
| Invoice Integration | Connect to accounting | High |
| Calendar Integration | Google Calendar sync | High |
| Mobile App | React Native CRM app | Very High |

---

# 13. TESTING CHECKLIST

## 13.1 Lead Management Tests

- [ ] Submit lead from Contact Form
- [ ] Submit lead from Service Matcher
- [ ] View lead list with pagination
- [ ] Search leads by name/email/phone
- [ ] Filter leads by status
- [ ] Filter leads by source
- [ ] View single lead details
- [ ] Update lead status
- [ ] Add note to lead
- [ ] Assign lead to team member
- [ ] Export leads to CSV
- [ ] Delete lead

## 13.2 Blog Tests

- [ ] Create new blog post (draft)
- [ ] Edit existing post
- [ ] Publish post
- [ ] Unpublish post
- [ ] Upload featured image
- [ ] Set category and tags
- [ ] View public blog listing
- [ ] View single blog post
- [ ] Filter by category
- [ ] SEO meta tags correct

## 13.3 Auth Tests

- [ ] Login with valid credentials
- [ ] Reject invalid credentials
- [ ] Redirect to login when not authenticated
- [ ] Logout successfully
- [ ] Session persists on page refresh

## 13.4 Email Tests

- [ ] Receive notification on new lead (Contact Form)
- [ ] Receive notification on new lead (Service Matcher)
- [ ] Email contains correct lead info
- [ ] Link to CRM works

---

# APPENDIX A: Type Definitions

```typescript
// src/types/crm.ts

export interface Lead {
  id: string;
  first_name: string;
  last_name: string | null;
  email: string;
  phone: string | null;
  source: LeadSource;
  source_page: string | null;
  ndis_participant: boolean | null;
  ndis_status: NdisStatus | null;
  ndis_number: string | null;
  interested_services: string[] | null;
  service_matcher_answers: Record<string, any> | null;
  location: string | null;
  state: string;
  message: string | null;
  preferred_contact: 'email' | 'phone' | 'either';
  budget_estimate: number | null;
  status: LeadStatus;
  status_reason: string | null;
  priority: 'low' | 'normal' | 'high' | 'urgent';
  assigned_to: string | null;
  assigned_at: string | null;
  next_followup_date: string | null;
  next_followup_note: string | null;
  internal_notes: string | null;
  created_at: string;
  updated_at: string;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
}

export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'proposal' | 'won' | 'lost' | 'archived';

export type LeadSource = 'contact_form' | 'service_matcher' | 'budget_calculator' | 'blog_subscription' | 'referral' | 'phone' | 'walk_in' | 'other';

export type NdisStatus = 'funded' | 'pending' | 'applying' | 'not_sure';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  featured_image: string | null;
  featured_image_alt: string | null;
  category: string | null;
  tags: string[] | null;
  meta_title: string | null;
  meta_description: string | null;
  author_id: string | null;
  author_name: string | null;
  status: 'draft' | 'published' | 'scheduled' | 'archived';
  published_at: string | null;
  view_count: number;
  created_at: string;
  updated_at: string;
}

export interface CrmUser {
  id: string;
  display_name: string;
  avatar_url: string | null;
  job_title: string | null;
  phone: string | null;
  role: 'admin' | 'manager' | 'staff';
  permissions: Record<string, any>;
  email_notifications: boolean;
  created_at: string;
  last_login: string | null;
}

export interface LeadActivity {
  id: string;
  lead_id: string;
  activity_type: string;
  title: string;
  description: string | null;
  old_value: string | null;
  new_value: string | null;
  created_at: string;
  created_by: string | null;
  created_by_name: string | null;
}
```

---

# APPENDIX B: Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# App
NEXT_PUBLIC_APP_URL=https://jschoicegroup.com.au

# Email (Resend)
RESEND_API_KEY=re_xxxxxxxxxxxxx
NOTIFICATION_EMAILS=admin@jschoicegroup.com.au

# Auth (if using custom)
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=https://jschoicegroup.com.au
```

---

**END OF DOCUMENT**

*This document provides complete specifications for building the JS Choice CRM. For questions or clarifications, contact the project lead.*
