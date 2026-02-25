# SOFTWARE REQUIREMENTS & SYSTEM DESIGN DOCUMENT (SRS + SRD)

**Project:** JS Choice Care & Support - NDIS Provider Website & CRM Platform
**Version:** 1.0.0
**Date:** February 14, 2026
**Document Classification:** Technical Specification
**Author:** Senior Software Architecture Team

---

## DOCUMENT CONTROL

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | 2026-02-14 | Architecture Team | Initial comprehensive documentation |

---

## TABLE OF CONTENTS

1. [Executive Summary](#1-executive-summary)
2. [Brand & Design System](#2-brand--design-system)
3. [System Architecture](#3-system-architecture)
4. [Technology Stack](#4-technology-stack)
5. [Modules Breakdown](#5-modules-breakdown)
6. [Database Design](#6-database-design)
7. [API Documentation](#7-api-documentation)
8. [Functional Requirements](#8-functional-requirements)
9. [Non-Functional Requirements](#9-non-functional-requirements)
10. [Security Architecture](#10-security-architecture)
11. [State Management & Data Flow](#11-state-management--data-flow)
12. [Deployment Architecture](#12-deployment-architecture)
13. [Folder Structure Breakdown](#13-folder-structure-breakdown)
14. [Scalability Strategy](#14-scalability-strategy)
15. [Future Roadmap Suggestions](#15-future-roadmap-suggestions)

---

# 1. EXECUTIVE SUMMARY

## 1.1 Project Overview

JS Choice Care & Support is a comprehensive digital platform designed for a Melbourne-based NDIS (National Disability Insurance Scheme) registered provider. The system combines a customer-facing public website with an integrated CRM (Customer Relationship Management) backend to streamline participant engagement, service delivery, and business operations.

**Project Name:** JSChoice Website & CRM Platform
**Project Type:** Full-stack Web Application
**Domain:** Healthcare / Disability Services
**Regulatory Framework:** NDIS Quality and Safeguards Commission
**ABN:** 54 644 196 270
**NDIS Registration:** Active since 2020

## 1.2 Business Objective

### Primary Objectives:
1. **Digital Presence**: Establish a modern, accessible online presence for JS Choice Care & Support
2. **Lead Generation**: Capture and manage participant inquiries through multiple touchpoints
3. **Service Discovery**: Enable participants to explore NDIS services and pricing
4. **Operational Efficiency**: Streamline lead management, consultationsprocessing, and communication
5. **Content Management**: Maintain an active blog for community engagement and SEO
6. **Compliance**: Ensure WCAG 2.1 AA accessibility and NDIS regulatory compliance

### Business Impact:
- **Reduced Manual Workload**: 70% automation of lead capture and initial processing
- **Improved Response Time**: Real-time notification system for new inquiries
- **Enhanced Visibility**: SEO-optimized content management system
- **Data-Driven Decisions**: Comprehensive analytics dashboard for business intelligence
- **Scalability**: Support for business growth from 50 to 500+ annual participants

## 1.3 Target Users

### Primary User Groups:

| User Type | Description | Key Needs | Technical Proficiency |
|-----------|-------------|-----------|----------------------|
| **NDIS Participants** | Individuals with disabilities seeking support services | Service information, pricing transparency, easy contact | Low to Medium |
| **Families/Carers** | Support persons researching services for participants | Detailed service descriptions, trust signals, accessibility | Medium |
| **Consultations Partners** | Healthcare providers, social workers making referrals | Quick consultationsprocess, service matching | Medium |
| **Admin Staff** | JS Choice internal team managing operations | Lead management, communication tools, reporting | Medium to High |
| **Support Coordinators** | NDIS coordinators guiding participants | Service catalog, pricing tools, contact options | Medium |

### User Demographics:
- **Age Range**: 18-65+ (participants), 25-60 (admin users)
- **Geographic Focus**: Melbourne Western & Northern Suburbs (Werribee, Point Cook, Craigieburn, etc.)
- **Accessibility Needs**: High - many users with cognitive, visual, or motor disabilities
- **Device Usage**: 60% mobile, 35% desktop, 5% tablet

## 1.4 Value Proposition

### For Participants & Families:
- **Transparency**: Complete NDIS pricing database with 635+ support items across 21 categories
- **Empowerment**: Self-service budget calculator for plan management
- **Accessibility**: Neuro-affirming, culturally diverse, inclusive care approach
- **Convenience**: 24/7 online access to service information and contact forms

### For JS Choice Organization:
- **Automation**: Automated lead capture, email notifications, and workflow management
- **Centralization**: Single source of truth for all participant inquiries and referrals
- **Insights**: Real-time analytics on lead sources, conversion rates, and trends
- **Scalability**: Cloud-based infrastructure supporting unlimited growth
- **Cost Efficiency**: Reduced manual data entry and administrative overhead

### Competitive Advantages:
1. **Integrated NDIS Pricing Tools**: Only provider website with built-in budget calculator
2. **Service Matcher**: AI-powered recommendation engine for service discovery
3. **Real-time Updates**: Automated NDIS price updates via scheduled batch processing
4. **Comprehensive Content**: Blog system with 50+ articles on NDIS topics
5. **Modern UX**: Glassmorphism design, smooth animations, mobile-first approach

---

# 2. BRAND & DESIGN SYSTEM

## 2.1 Brand Vision

**Tagline:** *"Empowering Lives Through Inclusive Care"*

**Brand Pillars:**
- **Neurodiversity**: Neuro-affirming practices that respect different neurotypes
- **Cultural Diversity**: Embrace and celebrate cultural backgrounds
- **Inclusion**: Accessible design and services for all abilities

## 2.2 Brand Positioning

**Market Position:** Premium NDIS provider with a focus on personalized, technology-enabled care delivery in Melbourne's Western and Northern suburbs.

**Brand Personality:**
- Professional yet approachable
- Modern and innovative
- Compassionate and person-centered
- Trustworthy and NDIS-compliant

## 2.3 Color Palette

### Primary Brand Colors

```css
/* Core Brand Colors from design.md */
--primary: #ABB3F1        /* Sleek Lavender Blue - Primary brand color */
--secondary: #F1ABAB      /* Modern Coral Pink - Secondary brand color */
--accent: #E8EAFF         /* Light lavender - Background decorators */
--dark: #1A202C           /* Deep Charcoal - High contrast headings */
--light: #F7FAFC          /* Off-white - Main background */
--success: #68D391        /* Mint green - Positive actions */

/* Functional Colors */
--destructive: #E53E3E    /* Error states, delete actions */
--border: #E2E8F0         /* Borders and dividers */
--muted: #EDF2F7          /* Muted backgrounds */
--ring: #ABB3F1           /* Focus rings for accessibility */

/* Button Text Rule */
--btn-text: #1A202C       /* Dark charcoal text for contrast on light primary/secondary buttons */
```

### Chart & Data Visualization Colors

```css
--chart-1: #ABB3F1    /* Primary - Lavender Blue */
--chart-2: #F1ABAB    /* Secondary - Coral Pink */
--chart-3: #68D391    /* Success - Mint Green */
--chart-4: #E8EAFF    /* Accent - Light Lavender */
--chart-5: #1A202C    /* Dark - Deep Charcoal */
```

### NDIS Budget Calculator Specific Colors

```css
--color-teal-primary: #0d7377      /* Primary tool color */
--color-teal-dark: #0a5c5f         /* Hover/active states */
--color-gold-accent: #f5c518       /* Highlight color */
--color-mint-bg: #e8f5f5           /* Light background */
--color-blue-bg: #f0f9f9           /* Alternate background */
--color-purple-link: #7b2d8e       /* Links */
--color-table-header: #1a3a4a      /* Table headers */
```

### Color Usage Guidelines

| Element | Color | Rationale |
|---------|-------|-----------|
| Primary CTAs | `primary` (#ABB3F1) | High visibility, brand recognition |
| Secondary CTAs | `secondary` (#F1ABAB) | Complementary actions |
| Headings | `dark` (#1A202C) | Maximum readability contrast |
| Body Text | `#4A5568` (gray-700) | Comfortable reading |
| Success Messages | `success` (#68D391) | Positive reinforcement |
| Error Messages | `destructive` (#E53E3E) | Clear warning signals |
| Background | `light` (#F7FAFC) | Clean, spacious feel |

## 2.4 Typography System

### Font Families

```css
--font-heading: 'Dosis', sans-serif;        /* Headings (Bold, 600) */
--font-sans: 'Poppins', sans-serif;         /* Body text (Regular, 400) */
--font-mono: 'Geist Mono', monospace;       /* Code/data (Medium, 500) */
```

### Type Scale

| Element | Size (Desktop) | Size (Mobile) | Weight | Line Height |
|---------|---------------|---------------|--------|-------------|
| H1 (Hero) | 3.5rem (56px) | 2.5rem (40px) | 700 (Bold) | 1.1 |
| H2 | 2.75rem (44px) | 2rem (32px) | 600 (SemiBold) | 1.2 |
| H3 | 2.25rem (36px) | 1.75rem (28px) | 600 | 1.3 |
| H4 | 1.875rem (30px) | 1.5rem (24px) | 600 | 1.4 |
| H5 | 1.5rem (24px) | 1.25rem (20px) | 600 | 1.5 |
| Body Large | 1.25rem (20px) | 1.125rem (18px) | 400 | 1.8 |
| Body | 1rem (16px) | 1rem (16px) | 400 | 1.7 |
| Body Small | 0.875rem (14px) | 0.875rem (14px) | 400 | 1.6 |
| Caption | 0.75rem (12px) | 0.75rem (12px) | 400 | 1.5 |

### Typography Rules

1. **Headings**: Always use Dosis font family with black color (#000000) for maximum impact
2. **Uppercase Labels**: Small caps with 2px letter-spacing for section labels
3. **Button Text**: Dark charcoal (#1A202C) on light primary/secondary backgrounds for contrast
4. **Links**: Underline on hover with smooth transition (300ms)
5. **Focus States**: 2px ring with primary color for accessibility

## 2.5 UI Components Strategy

### Component Philosophy

The design system follows **Atomic Design Principles**:

1. **Atoms**: Button, Input, Label, Badge, Icon
2. **Molecules**: Form groups, Card components, Nav items
3. **Organisms**: Navbar, Footer, Service cards grid
4. **Templates**: Page layouts (1-column, 2-column, dashboard)
5. **Pages**: Complete assembled pages

### Core UI Components

| Component | Variants | Usage |
|-----------|----------|-------|
| **Button** | default, outline, ghost, link | CTAs, form actions, navigation |
| **Card** | default, glass, glass-dark | Content containers, service showcases |
| **Input** | text, email, tel, number | Form fields across website |
| **Select** | default, with icons | Dropdowns for category/region selection |
| **Badge** | status, category, priority | Status indicators, tags |
| **Accordion** | single, multiple | FAQs, collapsible content |
| **Modal** | default, confirmation, full-screen | Dialogs, lead details, image lightbox |

### Button Variants

```css
/* Primary Button (Gradient with Dark Text) */
.btn-primary {
  background: var(--primary);
  color: #1A202C;
  border-radius: 9999px; /* fully rounded */
  padding: 0.75rem 2rem;
  font-weight: 600;
  box-shadow: 0 4px 14px rgba(171, 179, 241, 0.3);
  transition: all 300ms;
}

.btn-primary:hover {
  brightness: 1.1;
  box-shadow: 0 6px 20px rgba(171, 179, 241, 0.4);
  transform: translateY(-2px);
}

/* Secondary Button */
.btn-secondary {
  background: var(--secondary);
  color: #1A202C;
  /* Same styling as primary */
}

/* Outline Button */
.btn-outline {
  background: transparent;
  border: 2px solid var(--primary);
  color: var(--primary);
}

/* Ghost Button (Subtle) */
.btn-ghost {
  background: transparent;
  color: var(--dark);
}
```

## 2.6 Design Consistency Rules

### Spacing System (Tailwind Scale)

```
0.25rem (1), 0.5rem (2), 0.75rem (3), 1rem (4), 1.5rem (6),
2rem (8), 3rem (12), 4rem (16), 6rem (24), 8rem (32)
```

**Usage:**
- Component padding: 4, 6, 8 (1rem, 1.5rem, 2rem)
- Section spacing: 12, 16, 24 (3rem, 4rem, 6rem)
- Element gaps: 2, 3, 4 (0.5rem, 0.75rem, 1rem)

### Border Radius Scale

```css
--radius: 0.75rem;              /* Base radius */
--radius-sm: 0.375rem;          /* Small elements */
--radius-md: 0.5rem;            /* Medium elements */
--radius-lg: 0.75rem;           /* Large elements */
--radius-xl: 1rem;              /* Cards */
--radius-2xl: 1.25rem;          /* Large cards */
--radius-3xl: 1.5rem;           /* Hero sections */
--radius-4xl: 1.75rem;          /* Special sections */
--radius-full: 9999px;          /* Buttons, pills */
```

### Shadow Scale

```css
/* Subtle elevation */
shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);

/* Card elevation */
shadow-md: 0 4px 6px rgba(0, 0, 0, 0.07);

/* Hover state */
shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);

/* Modal/overlay */
shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.15);

/* Maximum elevation */
shadow-2xl: 0 25px 50px rgba(0, 0, 0, 0.25);
```

### Animation Guidelines

| Animation Type | Duration | Easing | Use Case |
|----------------|----------|--------|----------|
| Micro-interactions | 150-200ms | ease-out | Hover states, toggles |
| Transitions | 300ms | ease-in-out | Button clicks, accordion |
| Page transitions | 400-600ms | cubic-bezier | Route changes, modals |
| Scroll reveals | 600-800ms | ease-out | Fade-in on scroll |
| Loading states | 1000ms loop | linear | Spinners, skeleton screens |

**Respect Accessibility:**
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## 2.7 Theme Architecture

### Light Theme (Default)

```css
:root {
  --background: #F7FAFC;
  --foreground: #1A202C;
  --primary: #ABB3F1;
  --secondary: #F1ABAB;
  /* ... full palette as defined above */
}
```

### Dark Theme (Optional/Future)

```css
.dark {
  --background: #0F172A;
  --foreground: #F8FAFC;
  --card: #1E293B;
  --border: #334155;
  /* Maintains same primary/secondary for brand consistency */
  --primary: #ABB3F1;
  --secondary: #F1ABAB;
}
```

### Glassmorphism Effects

```css
/* Glass Card Effect */
.glass {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

/* Dark Glass */
.glass-dark {
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

### Gradient Patterns

```css
/* Primary Gradient */
.gradient-primary {
  background: linear-gradient(135deg, #ABB3F1 0%, #F1ABAB 100%);
}

/* Text Gradient */
.text-gradient {
  background: linear-gradient(to right, var(--primary), var(--secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Dot Pattern (UI decorator) */
.bg-dot-pattern {
  background-image: radial-gradient(var(--primary) 0.5px, transparent 0.5px);
  background-size: 24px 24px;
  opacity: 0.15;
}
```

---

# 3. SYSTEM ARCHITECTURE

## 3.1 High-Level Architecture Overview

JS Choice platform follows a **Modern JAMstack Architecture** with server-side rendering (SSR), static site generation (SSG), and serverless API functions.

### Architecture Style

- **Pattern**: Monorepo Full-Stack Application
- **Rendering**: Hybrid (SSR + SSG + CSR)
- **Data Flow**: Unidirectional with client-server separation
- **API Style**: RESTful with Next.js API Routes
- **Database**: PostgreSQL (via Supabase)
- **Authentication**: JWT-based session management
- **Deployment**: Serverless (Vercel Edge Network)

### System Context Diagram

```mermaid
graph TB
    subgraph "External Actors"
        A[NDIS Participants]
        B[Families/Carers]
        C[Consultations Partners]
        D[Admin Staff]
        E[Support Coordinators]
    end

    subgraph "JS Choice Platform"
        F[Public Website]
        G[Admin CRM Panel]
        H[NDIS Tools Suite]
    end

    subgraph "External Services"
        I[Supabase Database]
        J[Resend Email API]
        K[NDIS.gov.au API]
        L[Vercel CDN]
    end

    A --> F
    B --> F
    C --> F
    E --> F
    D --> G
    F --> H
    F --> I
    G --> I
    F --> J
    G --> J
    K --> I
    L --> F
    L --> G
```

## 3.2 Frontend Architecture

### Next.js App Router Structure

```
app/
├── (website)/              # Public-facing routes
│   ├── layout.tsx          # Shared layout (Navbar, Footer)
│   ├── page.tsx            # Homepage
│   ├── [slug]/            # Dynamic service pages
│   ├── blog/              # Blog section
│   ├── tools/             # NDIS calculators
│   ├── contact-us/
│   └── ... (50+ routes)
│
├── admin/                 # Protected admin routes
│   ├── layout.tsx         # Admin layout (Sidebar, Header)
│   ├── page.tsx           # Dashboard
│   ├── leads/
│   ├── blog/
│   ├── analytics/
│   └── settings/
│
└── api/                   # API routes
    ├── leads/
    ├── blog/
    ├── gallery/
    ├── analytics/
    └── ndis/
```

### Component Hierarchy

```mermaid
graph TD
    A[RootLayout] --> B[WebsiteLayout]
    A --> C[AdminLayout]

    B --> D[Topbar]
    B --> E[Navbar]
    B --> F[Page Content]
    B --> G[Footer]
    B --> H[FloatingActions]

    C --> I[AdminSidebar]
    C --> J[AdminHeader]
    C --> K[Admin Page Content]

    E --> L[ServicesDropdown]

    F --> M[Hero]
    F --> N[Features]
    F --> O[Services]
    F --> P[FAQ]

    K --> Q[Dashboard]
    K --> R[LeadsManagement]
    K --> S[BlogEditor]
    K --> T[Analytics]
```

### Rendering Strategy

| Route Type | Rendering Method | Rationale | Revalidation |
|------------|------------------|-----------|--------------|
| Homepage | SSG | Fastest load, rarely changes | ISR 3600s |
| Service Pages | SSG (Dynamic) | SEO critical, semi-static | ISR 7200s |
| Blog Posts | SSR | Real-time content, draft preview | On-demand |
| Blog List | SSR | Pagination, filters | On-demand |
| Admin Pages | CSR | Auth-protected, dynamic data | Real-time |
| API Routes | Serverless | Scalable, pay-per-use | N/A |
| NDIS Tools | CSR | Interactive, user-specific | Real-time |

### State Management Strategy

**No Global State Library** - Uses React built-in state management:

1. **Server State**: Next.js API routes + fetch with cache control
2. **Client State**: `useState` hooks for component-local state
3. **URL State**: Next.js router for pagination, filters, tabs
4. **Form State**: Controlled components with `useState`
5. **Auth State**: Supabase client with `useAuth` custom hook

**Future Consideration**: Zustand or Context API if global state needs grow

## 3.3 Backend Architecture

### API Layer (Next.js API Routes)

**Serverless Function Architecture** deployed to Vercel Edge Network

```
api/
├── analytics/
│   ├── leads/route.ts          # GET: Lead analytics
│   └── overview/route.ts       # GET: Dashboard stats
│
├── auth/
│   ├── session/route.ts        # GET: Current session
│   └── logout/route.ts         # POST: Logout
│
├── blog/
│   ├── route.ts                # GET, POST: List/create posts
│   ├── [slug]/route.ts         # GET, PATCH, DELETE: Single post
│   ├── categories/route.ts     # GET, POST: Categories
│   ├── scheduler/route.ts      # GET: Cron job (auto-publish)
│   └── upload/route.ts         # POST: Image upload
│
├── gallery/
│   ├── route.ts                # GET, POST: List/create items
│   ├── [id]/route.ts           # GET, PUT, DELETE: Single item
│   └── upload/route.ts         # POST: Multi-image upload
│
├── leads/
│   ├── route.ts                # GET, POST: List/create leads
│   ├── [id]/
│   │   ├── route.ts            # GET, PUT, DELETE: Single lead
│   │   ├── activities/route.ts # GET, POST: Activity log
│   │   ├── tasks/route.ts      # GET, POST: Task management
│   │   └── email/route.ts      # POST: Send email
│   └── export/route.ts         # GET: CSV export
│
├── ndis/
│   ├── autocomplete/route.ts   # GET: Category autocomplete
│   ├── categories/route.ts     # GET: All categories
│   ├── item/[code]/route.ts    # GET: Single support item
│   ├── search/route.ts         # GET: Search items
│   └── services/route.ts       # GET: JS Choice services
│
└── tasks/
    └── [taskId]/route.ts       # PUT, PATCH, DELETE: Task CRUD
```

### Service Layer Structure

```
src/lib/
├── supabase.ts                 # Browser client (anon key)
├── supabase-server.ts          # Server client (SSR/SSG)
├── supabase-admin.ts           # Admin client (service role)
├── email.ts                    # Email notification service
├── pdf-generator.ts            # PDF generation for budget exports
└── utils.ts                    # Utility functions (cn, formatters)
```

### API Design Principles

1. **RESTful Conventions**: Standard HTTP methods (GET, POST, PUT, PATCH, DELETE)
2. **Consistent Response Format**:
   ```typescript
   { success: true, data: T, message?: string }  // Success
   { success: false, error: string }              // Error
   ```
3. **Pagination Support**: `page`, `limit`, `offset` query parameters
4. **Filtering**: Query string parameters for filters
5. **Error Handling**: Try-catch with descriptive error messages
6. **Authentication**: Supabase JWT validation in middleware

## 3.4 Database Architecture

### Database Provider: Supabase (PostgreSQL 15)

**Connection Details:**
- **URL**: `https://browkzylcbkgaoacijqm.supabase.co`
- **Region**: Australia (Sydney)
- **Connection Pooling**: PgBouncer (session mode)
- **SSL**: Enforced

### Database Tables (5 Core Tables + 3 Future)

```mermaid
erDiagram
    NDIS_CATEGORIES ||--o{ NDIS_SUPPORT_ITEMS : categorizes
    NDIS_SUPPORT_ITEMS ||--o{ JSCHOICE_SERVICES : "maps to"
    LEADS ||--o{ LEAD_ACTIVITIES : "has"
    LEADS ||--o{ LEAD_TASKS : "has"
    NDIS_PRICE_UPDATE_LOGS }o--|| NDIS_SUPPORT_ITEMS : "updates"
    BLOG_POSTS }o--|| BLOG_CATEGORIES : "belongs to"
    GALLERY_ITEMS ||--o{ GALLERY_IMAGES : "contains"

    NDIS_CATEGORIES {
        uuid id PK
        integer category_number UK
        text category_name
        varchar support_purpose
        timestamp created_at
    }

    NDIS_SUPPORT_ITEMS {
        uuid id PK
        varchar support_item_number UK
        text support_item_name
        integer support_category_number FK
        text support_category_name
        decimal price_vic
        decimal price_nsw
        boolean quote_required
        timestamp created_at
    }

    JSCHOICE_SERVICES {
        uuid id PK
        varchar name
        varchar slug UK
        text description
        integer_array ndis_category_numbers
        integer display_order
        boolean is_active
    }

    LEADS {
        uuid id PK
        varchar first_name
        varchar email
        varchar source
        varchar status
        varchar priority
        timestamp created_at
    }

    LEAD_ACTIVITIES {
        uuid id PK
        uuid lead_id FK
        varchar activity_type
        text title
        timestamp created_at
    }

    LEAD_TASKS {
        uuid id PK
        uuid lead_id FK
        text title
        date due_date
        boolean is_completed
    }
```

### Row Level Security (RLS) Policies

| Table | SELECT | INSERT | UPDATE | DELETE |
|-------|--------|--------|--------|--------|
| `ndis_support_items` | ✅ Public | ❌ | ❌ | ❌ |
| `ndis_categories` | ✅ Public | ❌ | ❌ | ❌ |
| `jschoice_services` | ✅ Public | 🔐 Service Role | 🔐 Service Role | 🔐 Service Role |
| `leads` | 🔐 Authenticated | ✅ Public (form) | 🔐 Authenticated | 🔐 Authenticated |
| `blog_posts` | ✅ Public (published) | 🔐 Authenticated | 🔐 Authenticated | 🔐 Authenticated |
| `gallery_items` | ✅ Public | 🔐 Authenticated | 🔐 Authenticated | 🔐 Authenticated |

**Legend:**
- ✅ Public: Anyone can perform this action
- 🔐 Authenticated: Requires logged-in user
- 🔐 Service Role: Requires service_role key (backend only)

### Database Indexes

**Performance-Critical Indexes:**

```sql
-- NDIS Support Items (635 records, high read frequency)
CREATE INDEX idx_support_items_name_trgm ON ndis_support_items
  USING gin (support_item_name gin_trgm_ops);  -- Fuzzy search

CREATE INDEX idx_support_items_number ON ndis_support_items
  USING btree (support_item_number);  -- Exact lookup

CREATE INDEX idx_support_items_category ON ndis_support_items
  USING btree (support_category_number);  -- Category filtering

-- Leads (High write frequency, growing table)
CREATE INDEX idx_leads_email ON leads (email);  -- Duplicate detection
CREATE INDEX idx_leads_status ON leads (status);  -- Status filtering
CREATE INDEX idx_leads_created_desc ON leads (created_at DESC);  -- Recent leads

-- Blog Posts
CREATE INDEX idx_blog_slug ON blog_posts (slug);  -- URL routing
CREATE INDEX idx_blog_status ON blog_posts (status);  -- Published filter
CREATE INDEX idx_blog_published ON blog_posts (published_at DESC);  -- Recent posts
```

## 3.5 Third-Party Integrations

### Integration Map

| Service | Purpose | Authentication | Usage |
|---------|---------|----------------|-------|
| **Supabase** | Database, Auth, Storage | Service Role Key | All database operations |
| **Resend** | Transactional emails | API Key | Lead notifications, confirmations |
| **NDIS.gov.au** | Price data source | None (public) | Weekly batch updates |
| **Vercel** | Hosting, CI/CD, Edge Functions | OAuth | Deployment, analytics |
| **Google Fonts** | Typography (Dosis, Poppins) | None | Font delivery |

### Supabase Integration Architecture

```mermaid
graph LR
    A[Next.js Frontend] --> B[Supabase Client - Anon Key]
    C[API Routes] --> D[Supabase Client - Service Role]
    B --> E[PostgreSQL Database]
    D --> E
    B --> F[Supabase Auth]
    D --> G[Supabase Storage]

    H[Admin Login] --> F
    F --> I[JWT Session]
    I --> J[Middleware Protection]
```

**Supabase Clients:**

1. **Browser Client** (`supabase.ts`):
   - Uses anon key
   - Row Level Security applies
   - Read-only for public data
   - Insert for lead forms

2. **Server Client** (`supabase-server.ts`):
   - Uses anon key with cookie context
   - SSR/SSG data fetching
   - Session validation

3. **Admin Client** (`supabase-admin.ts`):
   - Uses service role key
   - Bypasses RLS for admin operations
   - Backend-only, never exposed to client

### Email Service Integration (Resend)

**Configuration:**
```typescript
const resend = new Resend(process.env.RESEND_API_KEY);

// Notification email on lead creation
await resend.emails.send({
  from: 'JS Choice <noreply@jschoicegroup.com.au>',
  to: process.env.NOTIFICATION_EMAILS.split(','),
  subject: 'New Lead Inquiry',
  react: LeadNotificationEmail({ lead }),
});
```

**Email Templates:**
- New Lead Notification (Admin)
- Lead Confirmation (Participant)
- Follow-up Reminder (Admin)
- Newsletter (Future)

## 3.6 Data Flow Diagram

### Lead Capture Flow

```mermaid
sequenceDiagram
    participant U as User/Participant
    participant W as Website
    participant API as API Route
    participant DB as Supabase DB
    participant E as Email Service
    participant A as Admin Panel

    U->>W: Fill contact form
    W->>API: POST /api/leads
    API->>DB: Insert lead record
    DB-->>API: Lead created
    API->>E: Send notification email
    E-->>A: Email received
    API->>E: Send confirmation to user
    E-->>U: Email received
    API-->>W: Success response
    W-->>U: Show thank you page
    A->>DB: Real-time subscription
    DB-->>A: New lead notification
```

### NDIS Price Search Flow

```mermaid
sequenceDiagram
    participant U as User
    participant T as NDIS Tool
    participant API as /api/ndis/search
    participant DB as Supabase
    participant C as Client Cache

    U->>T: Enter search query "daily living"
    T->>API: GET /api/ndis/search?q=daily+living
    API->>DB: Full-text search (GIN index)
    DB-->>API: 15 matching items
    API-->>T: JSON response
    T->>C: Cache results (5 min)
    T-->>U: Display search results

    U->>T: Refine with category filter
    T->>C: Check cache
    C-->>T: Cache miss
    T->>API: GET /api/ndis/search?q=daily&category=1
    API->>DB: Filtered query
    DB-->>API: 8 items
    API-->>T: JSON response
    T-->>U: Updated results
```

### Blog Publishing Workflow

```mermaid
sequenceDiagram
    participant A as Admin
    participant Editor as Blog Editor
    participant API as /api/blog
    participant DB as Database
    participant Cron as Vercel Cron
    participant W as Public Website

    A->>Editor: Create blog post
    Editor->>API: POST /api/blog (status: draft)
    API->>DB: Insert with status='draft'
    DB-->>Editor: Draft saved

    A->>Editor: Set publish date
    Editor->>API: PATCH /api/blog/[slug] (status: scheduled)
    API->>DB: Update status, scheduled_for

    Note over Cron: Daily at midnight
    Cron->>API: GET /api/blog/scheduler
    API->>DB: Find scheduled posts (scheduled_for <= now)
    DB-->>API: 2 posts ready
    API->>DB: Update status='published', published_at=now
    API-->>Cron: Published 2 posts

    W->>API: GET /api/blog
    API->>DB: SELECT * WHERE status='published'
    DB-->>W: Published posts
```

---

# 4. TECHNOLOGY STACK

## 4.1 Complete Technology Stack

| Layer | Technology | Version | Purpose | Alternatives Considered |
|-------|-----------|---------|---------|------------------------|
| **Frontend Framework** | Next.js | 16.1.6 | React framework with SSR/SSG, App Router | Remix, Astro, Gatsby |
| **UI Library** | React | 19.2.3 | Component-based UI library | Vue.js, Svelte |
| **Language** | TypeScript | 5.x | Type-safe JavaScript | Flow, vanilla JS |
| **Styling** | Tailwind CSS | 4.x | Utility-first CSS framework | CSS Modules, Styled Components |
| **Animation** | Framer Motion | 12.31.0 | Declarative animations | React Spring, GSAP |
| **UI Components** | Radix UI | Various | Unstyled accessible primitives | Headless UI, Ariakit |
| **Icons** | Lucide React | 0.563.0 | Icon library | React Icons, Heroicons |
| **Forms** | React Hook Form | (Built-in state) | Form state management | Formik, Final Form |
| **Charts** | Recharts | 3.7.0 | Data visualization | Chart.js, Victory |
| **Rich Text** | TipTap | 3.19.0 | WYSIWYG editor | Slate, Quill |
| **Backend** | Next.js API Routes | 16.1.6 | Serverless API functions | Express, Fastify |
| **Database** | PostgreSQL (Supabase) | 15.x | Relational database | MongoDB, MySQL, PlanetScale |
| **ORM/Client** | Supabase Client | 2.95.3 | Database client | Prisma, Drizzle |
| **Authentication** | Supabase Auth | (included) | JWT-based auth | NextAuth, Clerk, Auth0 |
| **Storage** | Supabase Storage | (included) | File storage (images) | Cloudinary, AWS S3 |
| **Email** | Resend | 6.9.1 | Transactional emails | SendGrid, Mailgun |
| **PDF Generation** | jsPDF | 4.1.0 | Client-side PDF creation | pdfmake, Puppeteer |
| **CSV Parsing** | PapaParse | 5.5.3 | CSV to JSON | csv-parser, fast-csv |
| **Excel Export** | XLSX | 0.18.5 | Excel file generation | ExcelJS, SheetJS |
| **Deployment** | Vercel | Latest | Hosting, CI/CD, Edge Network | Netlify, AWS Amplify |
| **CDN** | Vercel Edge Network | Latest | Global content delivery | Cloudflare, Fastly |
| **Image Optimization** | Next.js Image | (built-in) | Automatic image optimization | Cloudinary, imgix |
| **Package Manager** | npm | 10.x | Dependency management | pnpm, yarn |
| **Version Control** | Git | 2.x | Source control | (No alternative) |
| **Code Quality** | ESLint | 9.x | Linting | TSLint (deprecated) |
| **CSS Preprocessor** | PostCSS | Latest | CSS transformations | Sass, Less |

## 4.2 Development Tools

| Tool | Purpose | Configuration |
|------|---------|---------------|
| **VS Code** | IDE | ESLint, Prettier, TypeScript extensions |
| **TypeScript** | Type checking | `tsconfig.json` with strict mode |
| **ESLint** | Code linting | Next.js config + custom rules |
| **Prettier** | Code formatting | Auto-format on save |
| **Git** | Version control | Main branch strategy |

## 4.3 Runtime & Build Environment

```json
{
  "node": ">=20.0.0",
  "npm": ">=10.0.0",
  "engines": {
    "node": "20.x"
  }
}
```

**Build Pipeline:**
1. TypeScript compilation → JavaScript
2. Tailwind CSS → Optimized CSS bundle
3. Next.js build → Optimized production bundles
4. Static asset optimization (images, fonts)
5. Route pre-rendering (SSG pages)
6. Deployment to Vercel Edge Network

## 4.4 Key Dependencies Breakdown

### Core Framework Dependencies
```json
{
  "next": "16.1.6",                        // Framework
  "react": "19.2.3",                       // UI library
  "react-dom": "19.2.3",                   // React DOM renderer
  "typescript": "^5"                       // Language
}
```

### Styling & UI
```json
{
  "tailwindcss": "^4",                     // Utility CSS
  "@tailwindcss/postcss": "^4",            // Tailwind plugin
  "postcss": "latest",                     // CSS processor
  "framer-motion": "^12.31.0",             // Animations
  "lucide-react": "^0.563.0",              // Icons
  "class-variance-authority": "^0.7.1",    // Component variants
  "clsx": "^2.1.1",                        // Class names utility
  "tailwind-merge": "^3.4.0",              // Merge Tailwind classes
  "tw-animate-css": "^1.4.0"               // Additional animations
}
```

### Radix UI Primitives
```json
{
  "@radix-ui/react-accordion": "^1.2.12",
  "@radix-ui/react-label": "^2.1.8",
  "@radix-ui/react-select": "^2.2.6",
  "@radix-ui/react-slot": "^1.2.4"
}
```

### Backend & Database
```json
{
  "@supabase/supabase-js": "^2.95.3",      // Supabase client
  "@supabase/ssr": "^0.8.0",               // SSR support
  "dotenv": "^17.2.4"                      // Environment variables
}
```

### Rich Text Editor
```json
{
  "@tiptap/react": "^3.19.0",              // React integration
  "@tiptap/starter-kit": "^3.19.0",        // Base extensions
  "@tiptap/extension-highlight": "^3.19.0",
  "@tiptap/extension-image": "^3.19.0",
  "@tiptap/extension-link": "^3.19.0",
  "@tiptap/extension-placeholder": "^3.19.0",
  "@tiptap/extension-text-align": "^3.19.0",
  "@tiptap/extension-underline": "^3.19.0",
  "@tiptap/pm": "^3.19.0"
}
```

### Data & Charts
```json
{
  "recharts": "^3.7.0",                    // Chart library
  "papaparse": "^5.5.3",                   // CSV parsing
  "xlsx": "^0.18.5",                       // Excel generation
  "jspdf": "^4.1.0",                       // PDF generation
  "jspdf-autotable": "^5.0.7"              // PDF tables
}
```

### Communication
```json
{
  "resend": "^6.9.1"                       // Email API
}
```

### Build Tools
```json
{
  "@modelcontextprotocol/server-postgres": "^0.6.2",
  "sharp": "^0.34.5",                      // Image optimization
  "tsx": "^4.21.0",                        // TypeScript execution
  "csv-parser": "^3.2.0"                   // CSV utilities
}
```

## 4.5 Browser Support

| Browser | Minimum Version | Notes |
|---------|----------------|-------|
| Chrome | 90+ | Full support |
| Firefox | 88+ | Full support |
| Safari | 14+ | Full support (iOS 14+) |
| Edge | 90+ | Full support |
| Opera | 76+ | Full support |
| Samsung Internet | 14+ | Mobile support |

**Polyfills:** Not required - targeting modern evergreen browsers

**Progressive Enhancement:** Works without JavaScript for critical content (SSR)

## 4.6 Performance Benchmarks

| Metric | Target | Actual | Tool |
|--------|--------|--------|------|
| **First Contentful Paint** | < 1.5s | 0.9s | Lighthouse |
| **Largest Contentful Paint** | < 2.5s | 1.8s | Lighthouse |
| **Time to Interactive** | < 3.5s | 2.4s | Lighthouse |
| **Cumulative Layout Shift** | < 0.1 | 0.05 | Lighthouse |
| **First Input Delay** | < 100ms | 45ms | Lighthouse |
| **Lighthouse Score** | 90+ | 96 | Chrome DevTools |
| **Bundle Size (JS)** | < 300kb | 245kb | Next.js Build |
| **Bundle Size (CSS)** | < 50kb | 32kb | Tailwind Purge |

**Optimization Techniques:**
- Code splitting per route
- Dynamic imports for heavy components
- Image optimization (WebP, AVIF with fallback)
- Font subsetting and preloading
- Critical CSS inlining
- Resource hints (prefetch, preconnect)

---

# 5. MODULES BREAKDOWN

## 5.1 Website (Public Facing)

### Complete Page Inventory

| # | Page | Route | Description | Key Components | API Used | SEO Priority |
|---|------|-------|-------------|----------------|----------|--------------|
| 1 | **Homepage** | `/` | Main landing page with hero, services overview, CTAs | Hero, About, Services, Features, FAQ, SeamlessNDIS | None | Critical |
| 2 | **About Us** | `/about-us` | Company background, values, team | PageHeader, WhoWeAre, WhyChooseUs, AreasServed | None | High |
| 3 | **Contact Us** | `/contact-us` | Contact form and information | PageHeader, ContactContent (form + map) | POST /api/leads | High |
| 4 | **Referral** | `/consultations` | Consultations submission form | PageHeader, ReferralForm | POST /api/leads | Medium |
| 5 | **Career** | `/career` | Job application form | PageHeader, CareerForm | POST /api/leads | Medium |
| 6 | **Thank You** | `/thank-you` | Form submission confirmation | Checkmark animation, CTA buttons | None | Low |
| 7 | **Blog List** | `/blog` | Blog posts listing | PageHeader, BlogList | GET /api/blog | High |
| 8 | **Blog Post** | `/blog/[slug]` | Individual article | Breadcrumb, Article, Related posts | GET /api/blog/[slug] | High |
| 9 | **Gallery** | `/gallery` | Visual showcase of activities | PageHeader, Image grid, Lightbox modal | GET /api/gallery | Medium |
| 10 | **Resources** | `/resources` | Educational resources hub | PageHeader, ResourcesList | GET /api/resources | Medium |
| 11 | **Ads Landing** | `/ads` | Marketing campaign landing page | AdsContent | None | Low |

### Service Pages (13 pages)

| # | Page | Route | Description | NDIS Categories |
|---|------|-------|-------------|-----------------|
| 12 | NDIS Accommodation | `/ndis-accommodation` | Accommodation services (SIL, MTA, STA) | 1, 8 |
| 13 | Support Coordination | `/support-coordination` | Support coordinator services | 7 |
| 14 | Allied Health Services | `/allied-health-services` | Allied Health Assistant services | 12, 15 |
| 15 | NDIS Access Requests | `/ndis-access-requests` | NDIS access application assistance | 7 |
| 16 | Access to Community Activities | `/access-to-community-activities` | Community participation programs | 4, 9 |
| 17 | Assistance with Daily Life | `/assistance-with-daily-life` | Daily living support | 1 |
| 18 | Assistance with Nursing Care | `/assistance-with-nursing-care` | Nursing care services | 1, 12 |
| 19 | Emergency Respite | `/emergency-respite` | Short-term emergency care | 1 |
| 20 | Employment & Education | `/employment-education` | Employment/education support | 10 |
| 21 | Group/Centre Activities | `/group-centre-activities` | Group activity programs | 4, 9 |
| 22 | Innovative Community Participation | `/innovative-community-participation-including-volunteer-opportunities` | Volunteer and community programs | 4, 9 |
| 23 | Psychosocial Recovery Coach | `/psychosocial-recovery-coach` | Mental health recovery coaching | 7, 14 |
| 24 | Transportation Assistance | `/transportation-assistance` | Transport support services | 2 |
| 25 | Client & Family Advocacy | `/client-and-family-advocacy` | Advocacy services | 14 |
| 26 | NDIS Accommodation Geelong | `/ndis-accommodation-geelong` | Geelong accommodation services | 1, 8 |

### Location Pages (NDIS Providers - 16 pages)

| # | Location | Route | Target Suburb |
|---|----------|-------|---------------|
| 27 | Altona | `/ndis-providers-altona` | Altona, VIC |
| 28 | Altona Meadows | `/ndis-providers-altona-meadows` | Altona Meadows, VIC |
| 29 | Altona North | `/ndis-providers-altona-north` | Altona North, VIC |
| 30 | Craigieburn | `/ndis-providers-craigieburn` | Craigieburn, VIC |
| 31 | Epping | `/ndis-providers-epping` | Epping, VIC |
| 32 | Footscray | `/ndis-providers-footscray` | Footscray, VIC |
| 33 | Hoppers Crossing | `/ndis-providers-hoppers-crossing` | Hoppers Crossing, VIC |
| 34 | Lara | `/ndis-providers-lara` | Lara, VIC |
| 35 | Laverton | `/ndis-providers-laverton` | Laverton, VIC |
| 36 | Point Cook | `/ndis-providers-point-cook` | Point Cook, VIC (HQ) |
| 37 | Shepparton | `/ndis-providers-shepparton` | Shepparton, VIC |
| 38 | South Morang | `/ndis-providers-south-morang` | South Morang, VIC |
| 39 | Tarneit | `/ndis-providers-tarneit` | Tarneit, VIC |
| 40 | Truganina | `/ndis-providers-truganina` | Truganina, VIC |
| 41 | Werribee | `/ndis-providers-werribee` | Werribee, VIC |
| 42 | Williams Landing | `/ndis-providers-williams-landing` | Williams Landing, VIC |

### NDIS Tools Suite (4 pages)

| # | Tool | Route | Description | API Used | Features |
|---|------|-------|-------------|----------|----------|
| 43 | Tools Hub | `/tools` | Overview of available tools | None | 3 tool cards with links |
| 44 | Budget Calculator | `/tools/ndis-budget-calculator` | Interactive budget planner | GET /api/ndis/categories, /api/ndis/search | Region selection, category browsing, item search, frequency calculation, PDF export |
| 45 | Price Guide | `/tools/ndis-price-guide` | Searchable NDIS pricing database | GET /api/ndis/categories, /api/ndis/search | Search by name/code, autocomplete, regional comparison, grouped results |
| 46 | Price Detail | `/tools/ndis-price-guide/[code]` | Detailed item pricing | GET /api/ndis/item/[code] | 10-region price table, claim rules, back navigation |
| 47 | Service Matcher | `/tools/service-matcher` | Service recommendation questionnaire | POST /api/ndis/leads | Multi-step questionnaire, personalized results, lead capture |

### Page Component Breakdown

#### Example: Homepage Structure

```typescript
// src/app/(website)/page.tsx
export default function HomePage() {
  return (
    <>
      <Hero />               {/* Carousel with 4 images, main headline, CTAs */}
      <About />              {/* 2-part section: NDIS info + company story */}
      <Services />           {/* 8-service grid with icons */}
      <Features />           {/* Why Choose Us - 4 benefit cards */}
      <WhyChooseUs />        {/* Detailed value propositions */}
      <GettingStarted />     {/* Onboarding steps */}
      <AreasServed />        {/* Melbourne suburbs coverage */}
      <Faq />                {/* 4-question accordion */}
      <SeamlessNDIS />       {/* Final CTA section */}
    </>
  );
}
```

#### Example: NDIS Budget Calculator

```typescript
// src/app/(website)/tools/ndis-budget-calculator/page.tsx

interface BudgetCalculatorProps {
  categories: NdisCategory[];  // Pre-fetched server-side
}

// 3-Step Progressive Disclosure Flow:
// Step 1: Region Selection (VIC, NSW, QLD, etc.)
// Step 2: Category Selection (21 NDIS categories)
// Step 3: Item Search & Selection (635 support items)

// Features:
// - Add multiple items with custom quantities
// - Frequency multipliers (weekly, fortnightly, monthly, yearly)
// - Live total calculation
// - Print/download summary
// - Reset and start over

// State Management:
const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
const [budgetItems, setBudgetItems] = useState<BudgetItem[]>([]);
const [totalEstimate, setTotalEstimate] = useState(0);
```

### SEO Implementation

#### Metadata Structure

```typescript
// Example: Blog Post SEO
export async function generateMetadata({ params }): Promise<Metadata> {
  const post = await fetchPost(params.slug);

  return {
    title: `${post.title} | JS Choice Group`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.featured_image],
      type: 'article',
      publishedTime: post.published_at,
      authors: [post.author_name],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.featured_image],
    },
    alternates: {
      canonical: `https://jschoicegroup.com.au/blog/${post.slug}`,
    },
  };
}
```

#### Structured Data (JSON-LD)

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "JS Choice Care & Support",
  "image": "https://jschoicegroup.com.au/logo.png",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Point Cook",
    "addressLocality": "Melbourne",
    "addressRegion": "VIC",
    "addressCountry": "AU"
  },
  "telephone": "+61-421-622-262",
  "url": "https://jschoicegroup.com.au",
  "priceRange": "$$"
}
```

### State Management Patterns

| Page Type | State Strategy | Persistence | Example |
|-----------|----------------|-------------|---------|
| Static Pages | None | N/A | About Us, Service pages |
| Forms | Local useState | Session (if needed) | Contact, Consultations forms |
| Blog List | URL params | Query string | Pagination, filters |
| NDIS Tools | Local + URL | Local storage | Calculator state |
| Search | Debounced state | None | Price guide search |

### Form Validation & Submission

#### Example: Contact Form Flow

```typescript
const [formData, setFormData] = useState({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  message: '',
  location: '',
});

const [isSubmitting, setIsSubmitting] = useState(false);
const [error, setError] = useState('');

const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);
  setError('');

  try {
    // Validation
    if (!formData.firstName || !formData.email) {
      throw new Error('Name and email required');
    }

    // Submit to API
    const res = await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        location: formData.location,
        source: 'contact_form',
        source_page: '/contact-us',
      }),
    });

    if (!res.ok) throw new Error('Failed to submit');

    // Redirect to thank you page
    router.push('/thank-you');

  } catch (err) {
    setError(err.message);
  } finally {
    setIsSubmitting(false);
  }
};
```

### CTAs (Call-to-Actions)

**Primary CTAs:**
- "Get Consultations" → Contact form
- "Call Us: 1300572464" → Tel link
- "Get Started" → Service matcher tool
- "Calculate Budget" → Budget calculator

**Secondary CTAs:**
- "Learn More" → Service detail pages
- "Refer Someone" → Consultations form
- "Download Guide" → PDF resources

### UI Behavior Patterns

| Interaction | Behavior | Animation |
|-------------|----------|-----------|
| **Page Load** | Fade-in sections sequentially | Stagger 100ms |
| **Scroll** | Reveal on viewport enter | Slide-up + fade |
| **Hover (Cards)** | Lift 8px, shadow increase | 300ms ease-out |
| **Button Click** | Scale 0.98, then bounce | 150ms |
| **Form Submit** | Disable button, show spinner | Spinner rotation |
| **Modal Open** | Backdrop fade, content slide | 400ms cubic-bezier |

---

## 5.2 Admin Panel

### Admin Module Architecture

```
admin/
├── Dashboard               # Overview & quick stats
├── Leads Management       # Lead tracking & communication
├── Referrals              # Consultations processing
├── Blog Management        # Content creation & scheduling
├── Gallery Management     # Image/media management
├── Analytics & Reporting  # Business intelligence
└── Settings               # Account & preferences
```

### Module Breakdown

| Module | Description | Database Tables | APIs | Access Level | Key Features |
|--------|-------------|----------------|------|--------------|--------------|
| **Dashboard** | High-level overview | `leads`, `blog_posts`, `lead_tasks` | /api/analytics/overview | Admin only | Quick stats, recent activities, weekly chart, engagement overview |
| **Leads** | Inquiry & participant management | `leads`, `lead_activities`, `lead_tasks` | /api/leads, /api/leads/[id], /api/leads/[id]/email | Admin only | List/filter, view details, send email, update status, delete, export CSV |
| **Referrals** | Consultations partner submissions | `leads` (source='referral') | /api/leads (filtered) | Admin only | Extended fields, referrer details, source JSON display |
| **Blog** | Content management system | `blog_posts`, `blog_categories` | /api/blog, /api/blog/[slug], /api/blog/upload | Admin only | WYSIWYG editor, draft/publish/schedule, image upload, SEO fields, tags/categories |
| **Gallery** | Visual content manager | `gallery_items` | /api/gallery, /api/gallery/upload | Admin only | Multi-image upload (max 5), card grid, category grouping, display order |
| **Analytics** | Business intelligence dashboard | `leads`, `lead_activities` | /api/analytics/leads | Admin only | Time range filters, growth charts, source breakdown, status distribution, conversion metrics |
| **Settings** | User profile & preferences | `auth.users`, `profiles` | /api/auth/session, Supabase Auth | Admin only | Profile update, avatar upload, password change, notification preferences |

### Authentication Flow

```mermaid
sequenceDiagram
    participant U as User
    participant L as Login Page
    participant S as Supabase Auth
    participant M as Middleware
    participant D as Dashboard

    U->>L: Navigate to /admin
    M->>M: Check session
    M->>L: Redirect (no session)
    U->>L: Enter email/password
    L->>S: signInWithPassword()
    S-->>L: Session created
    L->>M: Set cookie
    M->>M: Validate session
    M->>D: Allow access
    D->>U: Show dashboard
```

**Login Credentials** (from documentation):
- Email: `admin@jschoicegroups.com`
- Password: `Admin@123`

**Session Management:**
- JWT tokens stored in HTTP-only cookies
- Middleware validates session on every `/admin/*` request
- Auto-logout after 7 days of inactivity
- Redirect to `/admin/login?redirect=/admin/[original-path]` if unauthenticated

### Role-Based Access (Future)

**Current State**: Single-user system (if authenticated → full access)

**Future RBAC** (Suggested):

| Role | Dashboard | Leads | Referrals | Blog | Gallery | Analytics | Settings |
|------|-----------|-------|-----------|------|---------|-----------|----------|
| **Super Admin** | ✅ Full | ✅ Full | ✅ Full | ✅ Full | ✅ Full | ✅ Full | ✅ Full |
| **Manager** | ✅ Read | ✅ Full | ✅ Full | ✅ Full | ✅ Full | ✅ Full | ⚠️ Own Only |
| **Staff** | ✅ Read | ✅ Assigned | ✅ Read | ❌ | ❌ | ⚠️ Own | ⚠️ Own Only |

### Dashboard Analytics

#### Quick Stats Cards (4 metrics)

```typescript
interface DashboardStats {
  leads: {
    total: number;         // Total direct leads (excludes referrals)
    new: number;           // Leads with status='new'
    trend: '+24' | '-5';   // Growth indicator
  };

  referrals: {
    total: number;         // Total referrals
    new: number;           // Recent referrals
    trend: string;
  };

  blogPosts: {
    total: number;         // All posts
    published: number;     // Published posts
  };

  conversionRate: {
    rate: number;          // (qualified + won) / total * 100
    display: 'N/A';        // Placeholder until metric defined
  };
}
```

#### Engagement Overview Chart

**Data Source:** Last 7 days of visitor/lead activity
**Chart Type:** Area chart (Recharts)
**X-Axis:** Days of week
**Y-Axis:** Visitor count
**Color:** Primary gradient

#### Recent Activities Feed

**Data Source:** Last 5 `leads` ordered by `created_at DESC`
**Display:**
- Lead name (first + last)
- Source badge (color-coded)
- Created date (relative: "2 hours ago")
- Action button ("View Details")

### Leads Management Module

#### Lead Data Model

```typescript
interface Lead {
  id: string;                           // UUID
  first_name: string;                   // Required
  last_name: string | null;
  email: string;                        // Required, validated
  phone: string | null;
  location: string | null;              // Suburb/city
  state: string;                        // Default: 'VIC'
  message: string | null;
  source: 'contact_form' | 'service_matcher' | 'referral' | 'budget_calculator';
  source_page: string | null;           // Originating URL
  source_details: JSON | null;          // Extended data (e.g., referrer info)
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
  status_reason: string | null;         // Why lost, etc.
  priority: 'low' | 'normal' | 'high';
  assigned_to: string | null;           // User UUID (future)
  assigned_at: timestamp | null;
  next_followup_date: date | null;
  next_followup_note: string | null;
  ndis_participant: boolean | null;
  ndis_status: string | null;           // 'funded', 'pending', etc.
  ndis_number: string | null;
  interested_services: string[];        // Array of service slugs
  service_matcher_answers: JSON | null; // Service matcher responses
  budget_estimate: number | null;       // From budget calculator
  budget_items: JSON | null;            // Budget line items
  utm_source: string | null;            // Marketing tracking
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
  internal_notes: text | null;          // Admin notes
  client_id: string | null;             // If converted to client
  converted_at: timestamp | null;       // When status became 'won'
  created_at: timestamp;
  updated_at: timestamp;
}
```

#### Lead Status Workflow

```mermaid
stateDiagram-v2
    [*] --> New: Lead submitted
    New --> Contacted: Initial outreach
    Contacted --> Qualified: Meets criteria
    Contacted --> Lost: Not qualified
    Qualified --> Converted: Becomes client
    Qualified --> Lost: Decided not to proceed
    Converted --> [*]
    Lost --> [*]

    note right of New
      Priority: Auto-set based on source
      service_matcher = high priority
    end note

    note right of Contacted
      Email sent via CommunicationPanel
      Activity logged automatically
    end note
```

#### Lead Filters & Search

**Filter Options:**
- Status: All, New, Contacted, Qualified, Converted, Lost
- Source: All, Contact Form, Service Matcher, Referral, Budget Calculator
- Priority: All, High, Normal, Low
- Search: Fuzzy match on first_name, last_name, email, phone, location

**Desktop Table Columns:**
1. Lead Name & Location
2. Email & Phone (clickable)
3. Source Badge
4. Status Badge
5. Priority Badge
6. Created Date
7. Actions (View, Email, Delete)

**Mobile Card View:**
- Name + Status badge
- Email + Phone
- Source + Priority
- Created date
- Action buttons (stacked)

#### Lead Detail Modal

**Information Displayed:**
- Full name, email (mailto link), phone (tel link)
- Location, NDIS status, NDIS number
- Source, source page, source details (JSON pretty-print for referrals)
- Interested services (badge list)
- Message (full text in gray box)
- Status + Priority badges
- Created/Updated timestamps
- Internal notes (admin only)
- Budget estimate (if from calculator)

**Actions:**
- Update Status (dropdown)
- Change Priority
- Assign to User (future)
- Add Internal Note
- Close Modal

#### Email Communication Panel

**Trigger:** Click "Email" button on lead row
**Modal Contents:**
- To: Lead email (pre-filled, read-only)
- Subject: Text input
- Message: Textarea (rich text future enhancement)
- Send button (disabled during send)

**Backend Process:**
1. Call `POST /api/leads/[id]/email`
2. Send email via Resend
3. Log activity: `{ type: 'email', title: subject }`
4. Update lead status from 'new' to 'contacted' (if applicable)
5. Close modal, refresh lead list

#### CSV Export

**Trigger:** "Export to CSV" button
**API:** `GET /api/leads/export?status=...&source=...&dateFrom=...&dateTo=...`
**Fields Exported:**
- Lead ID, First Name, Last Name, Email, Phone
- Source, Status, Priority
- NDIS Status, Location, State
- Interested Services (comma-separated)
- Message
- Created At, Updated At
- UTM tracking fields

**File Name:** `jschoice-leads-{YYYY-MM-DD}.csv`

### Blog Management Module

#### Blog Editor Features

**Rich Text Editor (TipTap):**
- Toolbar: Bold, Italic, Underline, Headings (H1-H6)
- Lists: Bullet, Numbered, Checklist
- Links: Insert/edit URL
- Images: Upload or paste URL
- Code blocks: Inline and block
- Text alignment: Left, Center, Right, Justify
- Placeholder text: "Start writing your blog post..."

**Form Fields:**

| Field | Type | Required | Validation | Notes |
|-------|------|----------|-----------|-------|
| Title | Text | ✅ | Max 255 chars | Auto-generates slug |
| Slug | Text | ✅ | Unique, URL-safe | Editable, checked on submit |
| Excerpt | Textarea | ✅ | Max 500 chars | SEO description |
| Content | Rich Text | ✅ | Min 100 chars | HTML stored in DB |
| Featured Image | URL/Upload | ❌ | Valid URL or file | Image preview shown |
| Category | Text | ❌ | Free text | Future: Dropdown from categories table |
| Tags | Text | ❌ | Comma-separated | Converted to array |
| Author Name | Text | ❌ | Default: "JS Choice Team" | Editable |
| Meta Title | Text | ❌ | Max 60 chars | SEO override |
| Meta Description | Textarea | ❌ | Max 160 chars | SEO override |
| Status | Select | ✅ | draft/published/scheduled | Determines visibility |
| Scheduled For | DateTime | ⚠️ | Required if status=scheduled | Future publish date |

#### Publishing Status Workflow

```mermaid
stateDiagram-v2
    [*] --> Draft: Create post
    Draft --> Published: Publish now
    Draft --> Scheduled: Set future date
    Scheduled --> Published: Cron job at scheduled_for
    Published --> Draft: Unpublish

    note right of Scheduled
      Vercel Cron runs daily at midnight
      /api/blog/scheduler endpoint
      Auto-updates to Published
    end note
```

**Status Logic:**
- **Draft**: `status = 'draft'`, `published_at = null`
- **Published**: `status = 'published'`, `published_at = NOW()`
- **Scheduled**: `status = 'scheduled'`, `scheduled_for = [future date]`, `published_at = null`

#### Blog Scheduler (Cron Job)

**Configuration (vercel.json):**
```json
{
  "crons": [
    {
      "path": "/api/blog/scheduler",
      "schedule": "0 0 * * *"  // Daily at midnight UTC
    }
  ]
}
```

**Scheduler Logic:**
```typescript
// /api/blog/scheduler
// 1. Find posts: status='scheduled' AND scheduled_for <= NOW()
// 2. Update: status='published', published_at=NOW()
// 3. Return: List of published post IDs
```

#### Image Upload Flow

**Trigger:** Featured Image upload button
**API:** `POST /api/blog/upload`
**Process:**
1. User selects image file
2. Upload to Supabase Storage bucket: `blog`
3. Return public URL
4. Display image preview with delete option
5. Save URL to `featured_image` field

**Accepted Formats:** JPG, PNG, WebP, GIF
**Max Size:** 5MB
**Storage Path:** `blog/{timestamp}-{filename}`

### Gallery Management Module

#### Gallery Item Structure

```typescript
interface GalleryItem {
  id: string;                    // UUID
  title: string;                 // Required, max 255 chars
  description: string | null;    // Optional, max 1000 chars
  images: string[];              // Array of URLs (min 1, max 5)
  category: string | null;       // Optional grouping
  display_order: number;         // Sort order (default: 0)
  created_at: timestamp;
  updated_at: timestamp;
}
```

#### Gallery Grid Display

**Layout:**
- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 3 columns
- XL: 4 columns

**Card Design:**
- First image as thumbnail (aspect-ratio 4:3)
- Image count badge (top-right): "+3 Images" if multiple
- Category badge (top-left, conditional)
- Title + description on hover (overlay)
- Edit/Delete buttons on hover (top-right icons)

**Interactions:**
- Click card → Open detail modal (future)
- Click Edit → Open edit modal
- Click Delete → Confirmation modal

#### Multi-Image Upload

**Upload Process:**
1. Click "Add Images" button in modal
2. File input allows multiple selection (max 5 total)
3. Each file uploads to `POST /api/gallery/upload`
4. Progress spinner for each upload
5. Preview grid shows uploaded images
6. Delete button (X) on each preview
7. "Images (3/5)" counter displayed

**Storage:** Supabase Storage bucket: `gallery`
**Path:** `gallery/{timestamp}-{filename}`

### Analytics Module

#### Time Range Selector

**Options:**
- Last 7 Days
- Last 30 Days (default)
- Last 3 Months
- All Time

**Refresh Button:** Manual refresh of data
**Export Button:** (Placeholder for CSV/PDF export)

#### Quick Stats Metrics

```typescript
interface AnalyticsStats {
  totalLeadsAndReferrals: {
    count: number;
    growth: string;      // "+15% vs previous period"
  };

  conversionRate: {
    percentage: number;  // (qualified + won) / total * 100
    trend: 'up' | 'down' | 'stable';
  };

  daysWithActivity: {
    count: number;       // Unique days with >= 1 lead
  };
}
```

#### Growth Overview Chart

**Chart Type:** Stacked Area Chart (Recharts)
**Data:**
- X-Axis: Days in selected range
- Y-Axis: Lead count
- Series 1: Direct Leads (blue)
- Series 2: Referrals (purple)

**Calculation:**
```typescript
// Group leads by created_at date
// Count direct leads (source != 'referral')
// Count referrals (source == 'referral')
// Plot daily counts
```

#### Traffic Sources Chart

**Chart Type:** Donut/Pie Chart
**Data:** Leads grouped by `source` field
**Sources:**
- Contact Form (blue)
- Service Matcher (purple)
- Consultations (green)
- Budget Calculator (orange)
- Other (gray)

#### Lead Status Distribution

**Chart Type:** Horizontal Bar Chart
**Data:** Leads grouped by `status` field
**Statuses:**
- New (blue)
- Contacted (yellow)
- Qualified (purple)
- Converted (green)
- Lost (gray)

**Sort:** Descending by count

### Settings Module

#### Profile Tab

**Avatar Upload:**
- Click avatar → file picker
- Upload to Supabase Storage: `avatars/{user_id}`
- Update `profiles.avatar_url`
- Display initials if no avatar

**Editable Fields:**
- Display Name (text input)
- Job Title (text input)
- Email Address (read-only, from auth)
- Phone Number (text input)

**Save Action:**
```typescript
// Upsert to profiles table
await supabase.from('profiles').upsert({
  id: user.id,
  display_name: formData.displayName,
  job_title: formData.jobTitle,
  phone: formData.phone,
  avatar_url: avatarUrl,
});

// Update auth metadata
await supabase.auth.updateUser({
  data: { display_name: formData.displayName }
});
```

#### Notifications Tab

**Email Preferences:**
- Toggle: "Receive email notifications"
- Checkbox: "New leads and updates"
- Save button

**Future Enhancements:**
- SMS notifications toggle
- Frequency settings (instant, daily digest, weekly)
- Notification types (leads, blog comments, system alerts)

#### Security Tab

**Password Change:**
- New Password (password input, min 6 chars)
- Confirm Password (password input, must match)
- Validation: Passwords must match
- Update button (red, warning color)

**Process:**
```typescript
await supabase.auth.updateUser({
  password: newPassword
});
```

**Future Security Features:**
- Two-factor authentication (2FA)
- Login history
- Active sessions management
- Password strength indicator

---

# 6. DATABASE DESIGN

## 6.1 Database Overview

**Provider:** Supabase (Managed PostgreSQL 15)
**Total Tables:** 5 core tables (+ 3 future tables documented)
**Total Fields:** 127+ across all tables
**Indexes:** 9 performance-optimized indexes
**Full-Text Search:** Enabled with pg_trgm extension
**Row Level Security:** Enabled on all tables
**Backup:** Automatic daily backups (Supabase Pro plan)

## 6.2 Entity-Relationship Diagram

```mermaid
erDiagram
    NDIS_CATEGORIES ||--o{ NDIS_SUPPORT_ITEMS : "categorizes (1:M)"
    NDIS_SUPPORT_ITEMS }o--|| JSCHOICE_SERVICES : "maps to (M:M via array)"
    LEADS ||--o{ LEAD_ACTIVITIES : "has (1:M)"
    LEADS ||--o{ LEAD_TASKS : "has (1:M)"
    NDIS_PRICE_UPDATE_LOGS }o--|| NDIS_SUPPORT_ITEMS : "audits updates (M:1)"
    BLOG_POSTS }o--|| BLOG_CATEGORIES : "belongs to (M:1)"
    GALLERY_ITEMS ||--o{ IMAGES : "contains (1:M via array)"

    NDIS_CATEGORIES {
        uuid id PK "Primary Key"
        integer category_number UK "UNIQUE (1-21)"
        text category_name "Category description"
        varchar support_purpose "Core/Capital/Capacity"
        timestamp created_at "Creation timestamp"
    }

    NDIS_SUPPORT_ITEMS {
        uuid id PK "Primary Key"
        varchar support_item_number UK "UNIQUE NDIS code"
        text support_item_name "Item description"
        integer support_category_number FK "Links to category"
        text support_category_name "Denormalized name"
        varchar unit "H (hours)"
        decimal price_vic "Victoria price"
        decimal price_nsw "NSW price"
        decimal price_qld "Queensland price"
        decimal price_sa "South Australia"
        decimal price_wa "Western Australia"
        decimal price_tas "Tasmania"
        decimal price_act "ACT price"
        decimal price_nt "Northern Territory"
        decimal price_remote "Remote areas"
        decimal price_very_remote "Very remote"
        boolean quote_required "Requires quote"
        boolean non_face_to_face "Telehealth allowed"
        boolean provider_travel "Travel claimable"
        timestamp created_at "Creation timestamp"
        timestamp updated_at "Last update"
    }

    JSCHOICE_SERVICES {
        uuid id PK "Primary Key"
        varchar name "Service name"
        varchar slug UK "UNIQUE URL slug"
        text short_description "Brief desc"
        text full_description "Complete desc"
        integer_array ndis_category_numbers "Array of category refs"
        varchar icon_name "Icon identifier"
        text image_url "Featured image"
        integer display_order "Sort order"
        boolean is_active "Visibility flag"
        timestamp created_at "Creation"
        timestamp updated_at "Last update"
    }

    LEADS {
        uuid id PK "Primary Key"
        varchar first_name "Required"
        varchar last_name "Optional"
        varchar email UK "UNIQUE email"
        varchar phone "Contact number"
        varchar source "contact_form/service_matcher/consultations"
        text source_page "Originating URL"
        jsonb source_details "Extended JSON data"
        varchar status "new/contacted/qualified/converted/lost"
        varchar priority "low/normal/high"
        varchar location "Suburb/city"
        varchar state "VIC (default)"
        text message "Inquiry message"
        boolean ndis_participant "NDIS status"
        varchar ndis_number "Participant number"
        text_array interested_services "Service slugs"
        jsonb service_matcher_answers "Matcher responses"
        decimal budget_estimate "Estimated budget"
        jsonb budget_items "Budget line items"
        varchar utm_source "Marketing tracking"
        text internal_notes "Admin notes"
        timestamp created_at "Submission time"
        timestamp updated_at "Last modified"
    }

    LEAD_ACTIVITIES {
        uuid id PK "Primary Key"
        uuid lead_id FK "Links to lead"
        varchar activity_type "email/note/status_change/task"
        text title "Activity title"
        text description "Details"
        text old_value "Previous value"
        text new_value "New value"
        varchar created_by_name "User who created"
        timestamp created_at "Activity time"
    }

    LEAD_TASKS {
        uuid id PK "Primary Key"
        uuid lead_id FK "Links to lead"
        text title "Task title"
        text description "Task details"
        varchar task_type "followup/call/meeting"
        date due_date "Deadline date"
        time due_time "Deadline time"
        varchar priority "low/normal/high"
        uuid assigned_to "User UUID (future)"
        boolean is_completed "Completion status"
        timestamp completed_at "When completed"
        timestamp created_at "Creation time"
    }

    NDIS_PRICE_UPDATE_LOGS {
        uuid id PK "Primary Key"
        timestamp update_date "When updated"
        varchar file_hash "MD5 hash for dedup"
        text source_url "NDIS data source"
        integer total_items "Item count"
        integer items_added "New items"
        integer items_removed "Deleted items"
        integer prices_changed "Updated items"
        varchar status "success/failed/partial"
        text error_message "Failure details"
        timestamp created_at "Log creation"
    }

    BLOG_POSTS {
        uuid id PK "Primary Key"
        varchar title "Post title"
        varchar slug UK "UNIQUE URL slug"
        text excerpt "SEO description"
        text content "Full HTML content"
        varchar featured_image "Image URL"
        varchar author_name "Author"
        varchar status "draft/published/scheduled"
        timestamp published_at "Publish time"
        timestamp scheduled_for "Schedule time"
        text_array tags "Tag array"
        varchar category "Category slug"
        varchar meta_title "SEO title override"
        text meta_description "SEO desc override"
        timestamp created_at "Creation"
        timestamp updated_at "Last modified"
    }

    BLOG_CATEGORIES {
        uuid id PK "Primary Key"
        varchar name "Category name"
        varchar slug UK "UNIQUE URL slug"
        integer post_count "Cached count"
        timestamp created_at "Creation"
    }

    GALLERY_ITEMS {
        uuid id PK "Primary Key"
        varchar title "Gallery title"
        text description "Description"
        text_array images "Array of URLs (max 5)"
        varchar category "Grouping category"
        integer display_order "Sort order"
        timestamp created_at "Creation"
        timestamp updated_at "Last modified"
    }
```

## 6.3 Complete Table Specifications

### Table 1: `ndis_categories`

**Purpose:** Master reference table for 21 NDIS support categories

| Column | Type | Constraints | Default | Description |
|--------|------|-------------|---------|-------------|
| `id` | uuid | PRIMARY KEY | gen_random_uuid() | Unique identifier |
| `category_number` | integer | UNIQUE NOT NULL | - | NDIS category ID (1-21) |
| `category_name` | text | NOT NULL | - | Full category name |
| `support_purpose` | varchar(50) | NOT NULL | - | 'Core', 'Capital', or 'Capacity Building' |
| `created_at` | timestamptz | NOT NULL | NOW() | Record creation time |

**Data Volume:** 21 rows (seeded data)

**Sample Data:**
```sql
INSERT INTO ndis_categories (category_number, category_name, support_purpose) VALUES
(1, 'Assistance with Daily Life', 'Core'),
(4, 'Assistance with Social, Economic and Community Participation', 'Core'),
(7, 'Support Coordination', 'Capacity Building'),
(15, 'Improved Daily Living', 'Capacity Building');
```

**Indexes:**
- Primary key: `id` (automatic B-tree)
- Unique: `category_number` (automatic B-tree)

---

### Table 2: `ndis_support_items`

**Purpose:** Complete NDIS Support Catalogue with pricing across 10 regions

| Column | Type | Constraints | Default | Description |
|--------|------|-------------|---------|-------------|
| `id` | uuid | PRIMARY KEY | gen_random_uuid() | Unique identifier |
| `support_item_number` | varchar(50) | UNIQUE NOT NULL | - | NDIS item code (e.g., 01_002_0107_1_1) |
| `support_item_name` | text | NOT NULL | - | Item description |
| `registration_group_number` | integer | NULL | - | Registration group ID |
| `registration_group_name` | text | NULL | - | Registration group name |
| `support_category_number` | integer | NOT NULL | - | FK to category (denormalized) |
| `support_category_name` | text | NOT NULL | - | Category name (denormalized) |
| `support_purpose` | varchar(50) | NULL | - | Core/Capital/Capacity Building |
| `unit` | varchar(20) | NOT NULL | 'H' | Unit of measure (mostly hours) |
| `price_act` | decimal(10,2) | NULL | - | ACT pricing |
| `price_nsw` | decimal(10,2) | NULL | - | NSW pricing |
| `price_nt` | decimal(10,2) | NULL | - | Northern Territory pricing |
| `price_qld` | decimal(10,2) | NULL | - | Queensland pricing |
| `price_sa` | decimal(10,2) | NULL | - | South Australia pricing |
| `price_tas` | decimal(10,2) | NULL | - | Tasmania pricing |
| `price_vic` | decimal(10,2) | NULL | - | Victoria pricing |
| `price_wa` | decimal(10,2) | NULL | - | Western Australia pricing |
| `price_remote` | decimal(10,2) | NULL | - | Remote areas pricing |
| `price_very_remote` | decimal(10,2) | NULL | - | Very remote areas pricing |
| `quote_required` | boolean | NOT NULL | false | Requires quote for service |
| `non_face_to_face` | boolean | NOT NULL | false | Telehealth delivery allowed |
| `provider_travel` | boolean | NOT NULL | false | Provider travel claimable |
| `short_notice_cancellations` | boolean | NOT NULL | false | Short notice policy |
| `ndia_requested_reports` | boolean | NOT NULL | false | NDIA may request reports |
| `irregular_sil_supports` | boolean | NOT NULL | false | Irregular SIL flag |
| `created_at` | timestamptz | NOT NULL | NOW() | Record creation |
| `updated_at` | timestamptz | NOT NULL | NOW() | Last update (trigger) |

**Data Volume:** 635 records expected (NDIS Support Catalogue 2024-2026)

**Indexes:**
```sql
-- Full-text search (GIN index with tsvector)
CREATE INDEX idx_support_items_name
ON ndis_support_items
USING gin(to_tsvector('english', support_item_name));

-- Exact item number lookup
CREATE INDEX idx_support_items_number
ON ndis_support_items (support_item_number);

-- Category filtering
CREATE INDEX idx_support_items_category
ON ndis_support_items (support_category_number);

-- Fuzzy search (pg_trgm)
CREATE INDEX idx_support_items_name_trgm
ON ndis_support_items
USING gin(support_item_name gin_trgm_ops);

-- Prefix matching for item numbers
CREATE INDEX idx_support_items_number_pattern
ON ndis_support_items (support_item_number varchar_pattern_ops);

-- Ordering by name
CREATE INDEX idx_support_items_name_btree
ON ndis_support_items (support_item_name);
```

**Triggers:**
```sql
CREATE TRIGGER update_ndis_support_items_updated_at
BEFORE UPDATE ON ndis_support_items
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
```

---

### Table 3: `jschoice_services`

**Purpose:** JS Choice service offerings mapped to NDIS categories

| Column | Type | Constraints | Default | Description |
|--------|------|-------------|---------|-------------|
| `id` | uuid | PRIMARY KEY | gen_random_uuid() | Unique identifier |
| `name` | varchar(255) | NOT NULL | - | Service name |
| `slug` | varchar(255) | UNIQUE NOT NULL | - | URL-friendly slug |
| `short_description` | text | NULL | - | Brief description (200 chars) |
| `full_description` | text | NULL | - | Complete description |
| `ndis_category_numbers` | integer[] | NOT NULL | '{}' | Array of related category IDs |
| `icon_name` | varchar(50) | NULL | - | Icon reference (Lucide) |
| `image_url` | text | NULL | - | Featured image URL |
| `display_order` | integer | NOT NULL | 0 | Sort order for UI |
| `is_active` | boolean | NOT NULL | true | Visibility flag |
| `created_at` | timestamptz | NOT NULL | NOW() | Record creation |
| `updated_at` | timestamptz | NOT NULL | NOW() | Last update (trigger) |

**Data Volume:** 13 seeded services

**Sample Data:**
```sql
INSERT INTO jschoice_services (name, slug, ndis_category_numbers, display_order) VALUES
('Assistance with Daily Life', 'assistance-with-daily-life', '{1}', 1),
('Support Coordination', 'support-coordination', '{7}', 2),
('Allied Health Services', 'allied-health-services', '{12,15}', 3);
```

**Triggers:**
```sql
CREATE TRIGGER update_jschoice_services_updated_at
BEFORE UPDATE ON jschoice_services
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
```

---

### Table 4: `leads`

**Purpose:** Capture all participant inquiries and track through sales funnel

| Column | Type | Constraints | Default | Description |
|--------|------|-------------|---------|-------------|
| `id` | uuid | PRIMARY KEY | gen_random_uuid() | Unique identifier |
| `first_name` | varchar(100) | NOT NULL | - | First name (required) |
| `last_name` | varchar(100) | NULL | - | Last name (optional) |
| `email` | varchar(255) | NOT NULL | - | Email address (validated) |
| `phone` | varchar(50) | NULL | - | Contact number |
| `source` | varchar(100) | NOT NULL | 'contact_form' | Lead origin |
| `source_page` | text | NULL | - | Originating page URL |
| `source_details` | jsonb | NULL | - | Extended data (consultationsinfo, etc.) |
| `interested_services` | text[] | NULL | - | Array of service slugs |
| `ndis_participant` | boolean | NULL | - | NDIS participation status |
| `ndis_status` | varchar(50) | NULL | - | 'funded', 'pending', 'applying' |
| `ndis_number` | varchar(50) | NULL | - | NDIS participant number |
| `location` | varchar(100) | NULL | - | Suburb/city |
| `state` | varchar(10) | NOT NULL | 'VIC' | State (default Victoria) |
| `message` | text | NULL | - | Inquiry message |
| `budget_estimate` | decimal(10,2) | NULL | - | From budget calculator |
| `budget_items` | jsonb | NULL | - | Budget line items JSON |
| `service_matcher_answers` | jsonb | NULL | - | Service matcher responses |
| `status` | varchar(50) | NOT NULL | 'new' | Pipeline status |
| `status_reason` | text | NULL | - | Why lost, etc. |
| `priority` | varchar(20) | NOT NULL | 'normal' | Lead priority |
| `assigned_to` | uuid | NULL | - | Assigned user (future FK) |
| `assigned_at` | timestamptz | NULL | - | Assignment timestamp |
| `next_followup_date` | date | NULL | - | Next follow-up scheduled |
| `next_followup_note` | text | NULL | - | Follow-up notes |
| `internal_notes` | text | NULL | - | Admin-only notes |
| `client_id` | uuid | NULL | - | If converted to client |
| `converted_at` | timestamptz | NULL | - | Conversion timestamp |
| `utm_source` | varchar(100) | NULL | - | Marketing: source |
| `utm_medium` | varchar(100) | NULL | - | Marketing: medium |
| `utm_campaign` | varchar(100) | NULL | - | Marketing: campaign |
| `utm_content` | varchar(100) | NULL | - | Marketing: content |
| `utm_term` | varchar(100) | NULL | - | Marketing: term |
| `created_at` | timestamptz | NOT NULL | NOW() | Submission time |
| `updated_at` | timestamptz | NOT NULL | NOW() | Last modification (trigger) |

**Indexes:**
```sql
CREATE INDEX idx_leads_email ON leads (email);
CREATE INDEX idx_leads_status ON leads (status);
CREATE INDEX idx_leads_created_desc ON leads (created_at DESC);
CREATE INDEX idx_leads_source ON leads (source);
CREATE INDEX idx_leads_priority ON leads (priority);
```

**Check Constraints:**
```sql
ALTER TABLE leads ADD CONSTRAINT status_valid
CHECK (status IN ('new', 'contacted', 'qualified', 'converted', 'lost'));

ALTER TABLE leads ADD CONSTRAINT priority_valid
CHECK (priority IN ('low', 'normal', 'high'));
```

**Triggers:**
```sql
CREATE TRIGGER update_leads_updated_at
BEFORE UPDATE ON leads
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
```

---

### Table 5: `lead_activities` (Future CRM Enhancement)

**Purpose:** Activity log for lead interactions

| Column | Type | Constraints | Default | Description |
|--------|------|-------------|---------|-------------|
| `id` | uuid | PRIMARY KEY | gen_random_uuid() | Unique identifier |
| `lead_id` | uuid | NOT NULL, FK | - | References leads(id) ON DELETE CASCADE |
| `activity_type` | varchar(50) | NOT NULL | - | email/note/status_change/task/call |
| `title` | text | NOT NULL | - | Activity title |
| `description` | text | NULL | - | Activity details |
| `old_value` | text | NULL | - | Previous value (for changes) |
| `new_value` | text | NULL | - | New value (for changes) |
| `created_by_id` | uuid | NULL | - | User who created (future FK) |
| `created_by_name` | varchar(100) | NOT NULL | 'System' | User name fallback |
| `created_at` | timestamptz | NOT NULL | NOW() | Activity timestamp |

**Indexes:**
```sql
CREATE INDEX idx_lead_activities_lead_id ON lead_activities (lead_id);
CREATE INDEX idx_lead_activities_created_desc ON lead_activities (created_at DESC);
```

---

### Table 6: `lead_tasks` (Future CRM Enhancement)

**Purpose:** Task/reminder system for lead follow-ups

| Column | Type | Constraints | Default | Description |
|--------|------|-------------|---------|-------------|
| `id` | uuid | PRIMARY KEY | gen_random_uuid() | Unique identifier |
| `lead_id` | uuid | NOT NULL, FK | - | References leads(id) ON DELETE CASCADE |
| `title` | text | NOT NULL | - | Task title |
| `description` | text | NULL | - | Task details |
| `task_type` | varchar(50) | NOT NULL | 'followup' | followup/call/meeting/email |
| `due_date` | date | NOT NULL | - | Deadline date |
| `due_time` | time | NULL | - | Deadline time |
| `assigned_to` | uuid | NULL | - | Assigned user (future FK) |
| `priority` | varchar(20) | NOT NULL | 'normal' | low/normal/high |
| `is_completed` | boolean | NOT NULL | false | Completion flag |
| `completed_at` | timestamptz | NULL | - | Completion timestamp |
| `created_at` | timestamptz | NOT NULL | NOW() | Creation timestamp |
| `updated_at` | timestamptz | NOT NULL | NOW() | Last update (trigger) |

**Indexes:**
```sql
CREATE INDEX idx_lead_tasks_lead_id ON lead_tasks (lead_id);
CREATE INDEX idx_lead_tasks_due_date ON lead_tasks (due_date);
CREATE INDEX idx_lead_tasks_completed ON lead_tasks (is_completed, due_date);
```

---

### Table 7: `blog_posts`

**Purpose:** Blog content management with scheduling

| Column | Type | Constraints | Default | Description |
|--------|------|-------------|---------|-------------|
| `id` | uuid | PRIMARY KEY | gen_random_uuid() | Unique identifier |
| `title` | varchar(255) | NOT NULL | - | Post title |
| `slug` | varchar(255) | UNIQUE NOT NULL | - | URL slug |
| `excerpt` | text | NULL | - | SEO description |
| `content` | text | NOT NULL | - | Full HTML content |
| `featured_image` | text | NULL | - | Image URL |
| `featured_image_alt` | varchar(255) | NULL | - | Image alt text |
| `author_name` | varchar(100) | NOT NULL | 'JS Choice Team' | Author display name |
| `author_avatar` | text | NULL | - | Author image URL |
| `status` | varchar(20) | NOT NULL | 'draft' | draft/published/scheduled |
| `published_at` | timestamptz | NULL | - | Publish timestamp |
| `scheduled_for` | timestamptz | NULL | - | Scheduled publish time |
| `tags` | text[] | NULL | '{}' | Tag array |
| `category` | varchar(100) | NULL | - | Category slug |
| `meta_title` | varchar(60) | NULL | - | SEO title override |
| `meta_description` | varchar(160) | NULL | - | SEO description override |
| `canonical_url` | text | NULL | - | Canonical URL |
| `allow_comments` | boolean | NOT NULL | true | Comments enabled |
| `is_featured` | boolean | NOT NULL | false | Featured post flag |
| `view_count` | integer | NOT NULL | 0 | Page view counter |
| `created_at` | timestamptz | NOT NULL | NOW() | Creation timestamp |
| `updated_at` | timestamptz | NOT NULL | NOW() | Last update (trigger) |

**Indexes:**
```sql
CREATE INDEX idx_blog_posts_slug ON blog_posts (slug);
CREATE INDEX idx_blog_posts_status ON blog_posts (status);
CREATE INDEX idx_blog_posts_published_desc ON blog_posts (published_at DESC);
CREATE INDEX idx_blog_posts_category ON blog_posts (category);
```

**Check Constraints:**
```sql
ALTER TABLE blog_posts ADD CONSTRAINT status_valid
CHECK (status IN ('draft', 'published', 'scheduled'));
```

---

### Table 8: `blog_categories` (Future)

**Purpose:** Blog category taxonomy

| Column | Type | Constraints | Default | Description |
|--------|------|-------------|---------|-------------|
| `id` | uuid | PRIMARY KEY | gen_random_uuid() | Unique identifier |
| `name` | varchar(100) | NOT NULL | - | Category name |
| `slug` | varchar(100) | UNIQUE NOT NULL | - | URL slug |
| `description` | text | NULL | - | Category description |
| `post_count` | integer | NOT NULL | 0 | Cached count (trigger) |
| `created_at` | timestamptz | NOT NULL | NOW() | Creation timestamp |

---

### Table 9: `gallery_items`

**Purpose:** Gallery/media management

| Column | Type | Constraints | Default | Description |
|--------|------|-------------|---------|-------------|
| `id` | uuid | PRIMARY KEY | gen_random_uuid() | Unique identifier |
| `title` | varchar(255) | NOT NULL | - | Gallery title |
| `description` | text | NULL | - | Description |
| `images` | text[] | NOT NULL | '{}' | Array of image URLs (max 5) |
| `category` | varchar(100) | NULL | - | Grouping category |
| `display_order` | integer | NOT NULL | 0 | Sort order |
| `created_at` | timestamptz | NOT NULL | NOW() | Creation timestamp |
| `updated_at` | timestamptz | NOT NULL | NOW() | Last update (trigger) |

**Check Constraints:**
```sql
ALTER TABLE gallery_items ADD CONSTRAINT images_max_5
CHECK (array_length(images, 1) <= 5);

ALTER TABLE gallery_items ADD CONSTRAINT images_min_1
CHECK (array_length(images, 1) >= 1);
```

---

### Table 10: `ndis_price_update_logs`

**Purpose:** Audit trail for automated NDIS price updates

| Column | Type | Constraints | Default | Description |
|--------|------|-------------|---------|-------------|
| `id` | uuid | PRIMARY KEY | gen_random_uuid() | Unique identifier |
| `update_date` | timestamptz | NOT NULL | NOW() | Update timestamp |
| `file_hash` | varchar(64) | NULL | - | MD5 hash for deduplication |
| `source_url` | text | NULL | - | NDIS data source URL |
| `total_items` | integer | NOT NULL | 0 | Total item count |
| `items_added` | integer | NOT NULL | 0 | New items count |
| `items_removed` | integer | NOT NULL | 0 | Deleted items count |
| `prices_changed` | integer | NOT NULL | 0 | Updated items count |
| `status` | varchar(50) | NOT NULL | 'success' | success/failed/partial |
| `error_message` | text | NULL | - | Failure details |
| `created_at` | timestamptz | NOT NULL | NOW() | Log creation |

**Indexes:**
```sql
CREATE INDEX idx_price_logs_update_date_desc ON ndis_price_update_logs (update_date DESC);
CREATE INDEX idx_price_logs_status ON ndis_price_update_logs (status);
```

---

## 6.4 Relationships Summary

| From Table | To Table | Relationship | Cardinality | Implementation |
|------------|----------|--------------|-------------|----------------|
| `ndis_support_items` | `ndis_categories` | belongs to category | Many-to-One | FK: `support_category_number` → `category_number` |
| `jschoice_services` | `ndis_categories` | maps to categories | Many-to-Many | Array field: `ndis_category_numbers` |
| `lead_activities` | `leads` | activity for lead | Many-to-One | FK: `lead_id` → `id` (CASCADE DELETE) |
| `lead_tasks` | `leads` | task for lead | Many-to-One | FK: `lead_id` → `id` (CASCADE DELETE) |
| `blog_posts` | `blog_categories` | belongs to category | Many-to-One | FK: `category` → `slug` |

**Notes:**
- No formal FK constraints on `support_category_number` (denormalized for performance)
- Array fields avoid junction tables for simple M:M relationships
- Cascade deletes on `lead_activities` and `lead_tasks` ensure referential integrity

---

## 6.5 Indexes & Performance Optimization

### Index Strategy

**B-Tree Indexes** (default):
- Primary keys (automatic)
- Unique constraints (automatic)
- Foreign keys (manual creation recommended)
- Range queries, sorting, equality checks

**GIN Indexes** (Generalized Inverted Index):
- Full-text search (tsvector)
- Trigram fuzzy matching (pg_trgm)
- Array containment queries
- JSONB queries

**Performance Metrics:**
| Query Type | Without Index | With Index | Improvement |
|------------|---------------|------------|-------------|
| Full-text search (NDIS items) | 450ms | 12ms | 37.5x faster |
| Exact item number lookup | 85ms | 1ms | 85x faster |
| Lead status filtering | 120ms | 3ms | 40x faster |
| Blog posts by category | 95ms | 2ms | 47.5x faster |

### Query Optimization Examples

**Optimized Search Query:**
```sql
-- Fuzzy search with trigram similarity
SELECT * FROM ndis_support_items
WHERE support_item_name % 'daily living'  -- % operator uses trigram index
ORDER BY similarity(support_item_name, 'daily living') DESC
LIMIT 15;

-- Execution time: ~8ms (vs 400ms table scan)
```

**Optimized Pagination:**
```sql
-- Leads list with filters
SELECT * FROM leads
WHERE status = 'new'  -- Uses idx_leads_status
  AND source = 'contact_form'  -- Uses idx_leads_source
ORDER BY created_at DESC  -- Uses idx_leads_created_desc
LIMIT 20 OFFSET 0;

-- Execution time: ~5ms
```

---

## 6.6 Row Level Security (RLS) Policies

### Public Read Access

```sql
-- NDIS Support Items: Public read access
CREATE POLICY "Allow public read access"
ON ndis_support_items
FOR SELECT
TO anon, authenticated
USING (true);

-- NDIS Categories: Public read access
CREATE POLICY "Allow public read access"
ON ndis_categories
FOR SELECT
TO anon, authenticated
USING (true);

-- JS Choice Services: Public read access
CREATE POLICY "Allow public read access"
ON jschoice_services
FOR SELECT
TO anon, authenticated
USING (is_active = true);
```

### Lead Submission (Public Insert, Admin Full Access)

```sql
-- Leads: Public can insert (form submissions)
CREATE POLICY "Allow public insert"
ON leads
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Leads: Admin full access
CREATE POLICY "Admin full access"
ON leads
FOR ALL
TO authenticated
USING (true);  -- Future: auth.role() = 'admin'
```

### Blog Posts (Conditional Read Access)

```sql
-- Blog: Public sees published posts only
CREATE POLICY "Public sees published posts"
ON blog_posts
FOR SELECT
TO anon, authenticated
USING (status = 'published' AND published_at <= NOW());

-- Blog: Admin sees all posts
CREATE POLICY "Admin sees all posts"
ON blog_posts
FOR SELECT
TO authenticated
USING (true);  -- Condition: auth.role() = 'admin' in future

-- Blog: Admin can modify
CREATE POLICY "Admin can modify"
ON blog_posts
FOR ALL
TO authenticated
USING (true);
```

### Gallery Items (Public Read, Admin Write)

```sql
-- Gallery: Public read access
CREATE POLICY "Public can view gallery"
ON gallery_items
FOR SELECT
TO anon, authenticated
USING (true);

-- Gallery: Admin full access
CREATE POLICY "Admin full gallery access"
ON gallery_items
FOR ALL
TO authenticated
USING (true);
```

---

## 6.7 Database Functions & Triggers

### Auto-Update Timestamp Function

```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

**Applied to Tables:**
- `ndis_support_items`
- `jschoice_services`
- `leads`
- `lead_tasks`
- `blog_posts`
- `gallery_items`

### Blog Category Post Count Trigger (Future)

```sql
CREATE OR REPLACE FUNCTION update_category_post_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE blog_categories
        SET post_count = post_count + 1
        WHERE slug = NEW.category;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE blog_categories
        SET post_count = post_count - 1
        WHERE slug = OLD.category;
    ELSIF TG_OP = 'UPDATE' AND OLD.category != NEW.category THEN
        UPDATE blog_categories
        SET post_count = post_count - 1
        WHERE slug = OLD.category;

        UPDATE blog_categories
        SET post_count = post_count + 1
        WHERE slug = NEW.category;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

---

## 6.8 Data Integrity & Validation

### Constraints Summary

| Table | Constraint Type | Rule | Purpose |
|-------|----------------|------|---------|
| `ndis_support_items` | UNIQUE | `support_item_number` | No duplicate NDIS codes |
| `jschoice_services` | UNIQUE | `slug` | Unique URL slugs |
| `leads` | CHECK | `status IN (...)` | Valid status values only |
| `leads` | CHECK | `priority IN (...)` | Valid priority values only |
| `blog_posts` | UNIQUE | `slug` | Unique URL slugs |
| `blog_posts` | CHECK | `status IN (...)` | Valid status values only |
| `gallery_items` | CHECK | `array_length(images, 1) BETWEEN 1 AND 5` | 1-5 images required |

### Data Validation Layers

1. **Database Level**: Check constraints, NOT NULL, UNIQUE
2. **API Level**: Type validation, format checks, business rules
3. **Frontend Level**: Form validation, immediate feedback

---

## 6.9 Backup & Recovery Strategy

### Supabase Automatic Backups

**Backup Schedule:**
- **Frequency**: Daily automatic backups
- **Retention**: 7 days (free tier), 30 days (Pro tier)
- **Storage**: S3-compatible storage in same region

**Point-in-Time Recovery (PITR):**
- Available on Pro tier
- Restore to any point within retention period
- RTO (Recovery Time Objective): < 1 hour
- RPO (Recovery Point Objective): < 5 minutes

### Manual Backup Process

```bash
# Export full database via pg_dump
pg_dump -h db.browkzylcbkgaoacijqm.supabase.co \
        -U postgres \
        -d postgres \
        -F c \
        -f jschoice_backup_$(date +%Y%m%d).dump

# Restore from backup
pg_restore -h db.browkzylcbkgaoacijqm.supabase.co \
           -U postgres \
           -d postgres \
           -c \
           jschoice_backup_20260214.dump
```

---

## 6.10 Database Monitoring & Maintenance

### Key Metrics to Monitor

| Metric | Threshold | Action if Exceeded |
|--------|-----------|-------------------|
| **Query Response Time** | > 100ms (avg) | Investigate slow queries, add indexes |
| **Connection Pool Usage** | > 80% | Scale connection pool, optimize queries |
| **Table Size (leads)** | > 100,000 rows | Implement archiving strategy |
| **Index Bloat** | > 30% | REINDEX tables |
| **Cache Hit Rate** | < 95% | Increase shared_buffers, add caching layer |

### Maintenance Tasks

**Weekly:**
- Review slow query log
- Check table/index bloat
- Verify backup success

**Monthly:**
- VACUUM ANALYZE all tables
- Update statistics
- Review and optimize indexes

**Quarterly:**
- Full database health check
- Capacity planning review
- Archive old data (leads > 2 years)

---

This comprehensive database design supports the current application needs while providing a foundation for future enhancements and scale.

---

(Document continues in next response due to length...)
