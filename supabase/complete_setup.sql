-- =====================================================================
-- JS Choice Groups — Complete Supabase Setup
-- Single script to provision a fresh Supabase project with the full
-- schema needed by the website + admin app.
--
-- Run order: paste the entire file into the Supabase SQL Editor and
-- execute it once. Safe to re-run (uses IF NOT EXISTS / OR REPLACE
-- / ON CONFLICT DO NOTHING throughout).
--
-- After running this script:
--   1. Create the three storage buckets listed at the bottom
--      (profiles, blog, gallery) from the Supabase dashboard.
--   2. Import NDIS price data — run scripts/full_batch_01.sql through
--      scripts/full_batch_13.sql in order. These are large data-only
--      INSERTs for the ndis_support_items table.
-- =====================================================================


-- =====================================================================
-- 0. EXTENSIONS
-- =====================================================================

CREATE EXTENSION IF NOT EXISTS "pgcrypto";   -- gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS pg_trgm;      -- trigram search on NDIS items


-- =====================================================================
-- 1. SHARED HELPER FUNCTION
-- Auto-update updated_at column on row change
-- =====================================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


-- =====================================================================
-- 2. PROFILES  (extends auth.users)
-- =====================================================================

CREATE TABLE IF NOT EXISTS profiles (
    id                  UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    display_name        TEXT,
    avatar_url          TEXT,
    job_title           TEXT,
    phone               TEXT,
    email_notifications BOOLEAN NOT NULL DEFAULT true,
    role                TEXT NOT NULL DEFAULT 'staff'
                          CHECK (role IN ('admin', 'manager', 'staff')),
    permissions         JSONB NOT NULL DEFAULT '{}'::jsonb,
    last_login          TIMESTAMPTZ,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS profiles_role_idx ON profiles (role);

DROP TRIGGER IF EXISTS set_profiles_updated_at ON profiles;
CREATE TRIGGER set_profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "service_role_all" ON profiles;
CREATE POLICY "service_role_all" ON profiles
    FOR ALL TO service_role USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "users_read_own_profile" ON profiles;
CREATE POLICY "users_read_own_profile" ON profiles
    FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "users_update_own_profile" ON profiles;
CREATE POLICY "users_update_own_profile" ON profiles
    FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);


-- =====================================================================
-- 3. LEADS  (website contact/referral capture + CRM)
-- =====================================================================

CREATE TABLE IF NOT EXISTS leads (
    id                       UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    -- Contact
    first_name               VARCHAR(100) NOT NULL,
    last_name                VARCHAR(100),
    email                    VARCHAR(255),
    phone                    VARCHAR(50),

    -- Source tracking
    source                   VARCHAR(100) NOT NULL DEFAULT 'contact_form'
                               CHECK (source IN ('contact_form','service_matcher','budget_calculator',
                                                 'blog_subscription','referral','phone','walk_in','other')),
    source_page              TEXT,
    source_details           JSONB,

    -- NDIS info
    ndis_participant         BOOLEAN,
    ndis_status              VARCHAR(20)
                               CHECK (ndis_status IS NULL OR
                                      ndis_status IN ('funded','pending','applying','not_sure')),
    ndis_number              VARCHAR(50),

    -- Service interest
    interested_services      TEXT[],
    service_matcher_answers  JSONB,

    -- Location
    location                 VARCHAR(100),
    state                    VARCHAR(10) NOT NULL DEFAULT 'VIC',

    -- Communication
    message                  TEXT,
    preferred_contact        VARCHAR(20) NOT NULL DEFAULT 'email'
                               CHECK (preferred_contact IN ('email','phone','either')),

    -- Budget
    budget_estimate          DECIMAL(10, 2),
    budget_items             JSONB,

    -- Lead management
    status                   VARCHAR(50) NOT NULL DEFAULT 'new'
                               CHECK (status IN ('new','contacted','qualified','proposal',
                                                 'won','lost','archived')),
    status_reason            TEXT,
    priority                 VARCHAR(20) NOT NULL DEFAULT 'normal'
                               CHECK (priority IN ('low','normal','high','urgent')),

    -- Assignment
    assigned_to              TEXT,
    assigned_at              TIMESTAMPTZ,

    -- Follow-up
    next_followup_date       TIMESTAMPTZ,
    next_followup_note       TEXT,

    -- Conversion
    converted_at             TIMESTAMPTZ,
    client_id                TEXT,

    -- Notes
    internal_notes           TEXT,

    -- UTM tracking
    utm_source               TEXT,
    utm_medium               TEXT,
    utm_campaign             TEXT,
    utm_content              TEXT,
    utm_term                 TEXT,

    -- Audit
    created_by               TEXT,
    created_at               TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at               TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_leads_email       ON leads (email);
CREATE INDEX IF NOT EXISTS idx_leads_status      ON leads (status);
CREATE INDEX IF NOT EXISTS idx_leads_created     ON leads (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_assigned_to ON leads (assigned_to);
CREATE INDEX IF NOT EXISTS idx_leads_priority    ON leads (priority);
CREATE INDEX IF NOT EXISTS idx_leads_source      ON leads (source);
CREATE INDEX IF NOT EXISTS idx_leads_next_followup ON leads (next_followup_date)
    WHERE next_followup_date IS NOT NULL;

DROP TRIGGER IF EXISTS update_leads_updated_at ON leads;
CREATE TRIGGER update_leads_updated_at
    BEFORE UPDATE ON leads
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public insert to leads" ON leads;
CREATE POLICY "Allow public insert to leads" ON leads
    FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "Service role can manage leads" ON leads;
CREATE POLICY "Service role can manage leads" ON leads
    FOR ALL TO service_role USING (true);


-- =====================================================================
-- 4. LEAD_TASKS  (CRM tasks attached to a lead)
-- =====================================================================

CREATE TABLE IF NOT EXISTS lead_tasks (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_id       UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
    title         TEXT NOT NULL,
    description   TEXT,
    task_type     TEXT NOT NULL DEFAULT 'followup'
                    CHECK (task_type IN ('followup', 'call', 'email', 'meeting', 'other')),
    due_date      TEXT NOT NULL,
    due_time      TEXT,
    assigned_to   TEXT,
    priority      TEXT NOT NULL DEFAULT 'normal'
                    CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
    is_completed  BOOLEAN NOT NULL DEFAULT false,
    completed_at  TIMESTAMPTZ,
    completed_by  TEXT,
    created_by    TEXT,
    created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS lead_tasks_lead_id_idx      ON lead_tasks (lead_id);
CREATE INDEX IF NOT EXISTS lead_tasks_due_date_idx     ON lead_tasks (due_date);
CREATE INDEX IF NOT EXISTS lead_tasks_is_completed_idx ON lead_tasks (is_completed);
CREATE INDEX IF NOT EXISTS lead_tasks_assigned_to_idx  ON lead_tasks (assigned_to);

ALTER TABLE lead_tasks ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "service_role_all" ON lead_tasks;
CREATE POLICY "service_role_all" ON lead_tasks
    FOR ALL TO service_role USING (true) WITH CHECK (true);


-- =====================================================================
-- 5. LEAD_ACTIVITIES  (audit/activity log per lead)
-- =====================================================================

CREATE TABLE IF NOT EXISTS lead_activities (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_id         UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
    activity_type   TEXT NOT NULL
                      CHECK (activity_type IN ('created', 'status_changed', 'note_added',
                                               'email_sent', 'call_logged', 'meeting_scheduled',
                                               'assigned', 'followup_set', 'converted',
                                               'email', 'other')),
    title           TEXT NOT NULL,
    description     TEXT,
    old_value       TEXT,
    new_value       TEXT,
    created_by      UUID,
    created_by_name TEXT NOT NULL DEFAULT 'System',
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS lead_activities_lead_id_idx       ON lead_activities (lead_id);
CREATE INDEX IF NOT EXISTS lead_activities_created_at_idx    ON lead_activities (created_at DESC);
CREATE INDEX IF NOT EXISTS lead_activities_activity_type_idx ON lead_activities (activity_type);

ALTER TABLE lead_activities ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "service_role_all" ON lead_activities;
CREATE POLICY "service_role_all" ON lead_activities
    FOR ALL TO service_role USING (true) WITH CHECK (true);


-- =====================================================================
-- 6. FACEBOOK_LEADS  (Meta/Instagram ad lead webhook capture)
-- =====================================================================

CREATE TABLE IF NOT EXISTS facebook_leads (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name     TEXT NOT NULL,
    email         TEXT,
    phone         TEXT,
    campaign_id   TEXT,
    campaign_name TEXT,
    ad_id         TEXT,
    ad_name       TEXT,
    form_id       TEXT,
    form_name     TEXT,
    leadgen_id    TEXT,
    status        TEXT NOT NULL DEFAULT 'new'
                    CHECK (status IN ('new', 'contacted', 'qualified', 'quoted', 'won', 'lost')),
    notes         TEXT,
    created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS facebook_leads_status_idx   ON facebook_leads (status);
CREATE INDEX IF NOT EXISTS facebook_leads_campaign_idx ON facebook_leads (campaign_name);
CREATE INDEX IF NOT EXISTS facebook_leads_created_idx  ON facebook_leads (created_at DESC);

-- Deduplicate webhook retries from Meta
CREATE UNIQUE INDEX IF NOT EXISTS facebook_leads_leadgen_id_idx
    ON facebook_leads (leadgen_id) WHERE leadgen_id IS NOT NULL;

DROP TRIGGER IF EXISTS set_facebook_leads_updated_at ON facebook_leads;
CREATE TRIGGER set_facebook_leads_updated_at
    BEFORE UPDATE ON facebook_leads
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE facebook_leads ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "service_role_all" ON facebook_leads;
CREATE POLICY "service_role_all" ON facebook_leads
    FOR ALL TO service_role USING (true) WITH CHECK (true);


-- =====================================================================
-- 7. BLOG_POSTS  (including faqs column from 20260508 migration)
-- =====================================================================

CREATE TABLE IF NOT EXISTS blog_posts (
    id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title              TEXT NOT NULL,
    slug               TEXT NOT NULL UNIQUE,
    excerpt            TEXT,
    description        TEXT,
    table_of_contents  TEXT,
    content            TEXT NOT NULL,
    featured_image     TEXT,
    featured_image_alt TEXT,
    category           TEXT,
    tags               TEXT[],
    meta_title         TEXT,
    meta_description   TEXT,
    canonical_url      TEXT,
    author_id          UUID,
    author_name        TEXT,
    author_avatar      TEXT,
    status             TEXT NOT NULL DEFAULT 'draft'
                         CHECK (status IN ('draft', 'published', 'scheduled', 'archived')),
    published_at       TIMESTAMPTZ,
    scheduled_for      TIMESTAMPTZ,
    view_count         INTEGER NOT NULL DEFAULT 0,
    allow_comments     BOOLEAN NOT NULL DEFAULT true,
    is_featured        BOOLEAN NOT NULL DEFAULT false,
    faqs               JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at         TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at         TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS blog_posts_slug_idx         ON blog_posts (slug);
CREATE INDEX IF NOT EXISTS blog_posts_status_idx       ON blog_posts (status);
CREATE INDEX IF NOT EXISTS blog_posts_author_id_idx    ON blog_posts (author_id);
CREATE INDEX IF NOT EXISTS blog_posts_category_idx     ON blog_posts (category);
CREATE INDEX IF NOT EXISTS blog_posts_created_at_idx   ON blog_posts (created_at DESC);
CREATE INDEX IF NOT EXISTS blog_posts_published_at_idx ON blog_posts (published_at DESC);
CREATE INDEX IF NOT EXISTS blog_posts_scheduled_idx
    ON blog_posts (status, scheduled_for) WHERE status = 'scheduled';

DROP TRIGGER IF EXISTS set_blog_posts_updated_at ON blog_posts;
CREATE TRIGGER set_blog_posts_updated_at
    BEFORE UPDATE ON blog_posts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "service_role_all" ON blog_posts;
CREATE POLICY "service_role_all" ON blog_posts
    FOR ALL TO service_role USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public read of published posts" ON blog_posts;
CREATE POLICY "Allow public read of published posts" ON blog_posts
    FOR SELECT TO anon, authenticated USING (status = 'published');


-- =====================================================================
-- 8. GALLERY_ITEMS
-- =====================================================================

CREATE TABLE IF NOT EXISTS gallery_items (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title         TEXT NOT NULL,
    description   TEXT,
    images        TEXT[] NOT NULL,
    category      TEXT,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS gallery_items_display_order_idx ON gallery_items (display_order);
CREATE INDEX IF NOT EXISTS gallery_items_category_idx      ON gallery_items (category);
CREATE INDEX IF NOT EXISTS gallery_items_created_at_idx    ON gallery_items (created_at DESC);

DROP TRIGGER IF EXISTS set_gallery_items_updated_at ON gallery_items;
CREATE TRIGGER set_gallery_items_updated_at
    BEFORE UPDATE ON gallery_items
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE gallery_items ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "service_role_all" ON gallery_items;
CREATE POLICY "service_role_all" ON gallery_items
    FOR ALL TO service_role USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public read gallery" ON gallery_items;
CREATE POLICY "Public read gallery" ON gallery_items
    FOR SELECT TO anon, authenticated USING (true);


-- =====================================================================
-- 9. NDIS_SUPPORT_ITEMS  (NDIS price catalogue — pricing/budget tools)
-- =====================================================================

CREATE TABLE IF NOT EXISTS ndis_support_items (
    id                          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    support_item_number         VARCHAR(50) UNIQUE NOT NULL,
    support_item_name           TEXT NOT NULL,
    registration_group_number   INTEGER,
    registration_group_name     TEXT,
    support_category_number     INTEGER NOT NULL,
    support_category_name       TEXT NOT NULL,
    support_purpose             VARCHAR(50),
    unit                        VARCHAR(20) NOT NULL DEFAULT 'H',
    price_act                   DECIMAL(10, 2),
    price_nsw                   DECIMAL(10, 2),
    price_nt                    DECIMAL(10, 2),
    price_qld                   DECIMAL(10, 2),
    price_sa                    DECIMAL(10, 2),
    price_tas                   DECIMAL(10, 2),
    price_vic                   DECIMAL(10, 2),
    price_wa                    DECIMAL(10, 2),
    price_remote                DECIMAL(10, 2),
    price_very_remote           DECIMAL(10, 2),
    quote_required              BOOLEAN DEFAULT FALSE,
    non_face_to_face            BOOLEAN DEFAULT FALSE,
    provider_travel             BOOLEAN DEFAULT FALSE,
    short_notice_cancellations  BOOLEAN DEFAULT FALSE,
    ndia_requested_reports      BOOLEAN DEFAULT FALSE,
    irregular_sil_supports      BOOLEAN DEFAULT FALSE,
    created_at                  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at                  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Search/filter indexes
CREATE INDEX IF NOT EXISTS idx_support_items_name
    ON ndis_support_items USING GIN (to_tsvector('english', support_item_name));
CREATE INDEX IF NOT EXISTS idx_support_items_name_trgm
    ON ndis_support_items USING GIN (support_item_name gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_support_items_number
    ON ndis_support_items (support_item_number);
CREATE INDEX IF NOT EXISTS idx_support_items_number_pattern
    ON ndis_support_items (support_item_number varchar_pattern_ops);
CREATE INDEX IF NOT EXISTS idx_support_items_category
    ON ndis_support_items (support_category_number);
CREATE INDEX IF NOT EXISTS idx_support_items_name_btree
    ON ndis_support_items (support_item_name);

DROP TRIGGER IF EXISTS update_ndis_support_items_updated_at ON ndis_support_items;
CREATE TRIGGER update_ndis_support_items_updated_at
    BEFORE UPDATE ON ndis_support_items
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE ndis_support_items ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access to ndis_support_items" ON ndis_support_items;
CREATE POLICY "Allow public read access to ndis_support_items" ON ndis_support_items
    FOR SELECT TO anon, authenticated USING (true);


-- =====================================================================
-- 10. NDIS_CATEGORIES  (lookup with seed data)
-- =====================================================================

CREATE TABLE IF NOT EXISTS ndis_categories (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_number INTEGER UNIQUE NOT NULL,
    category_name   TEXT NOT NULL,
    support_purpose VARCHAR(50) NOT NULL,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO ndis_categories (category_number, category_name, support_purpose) VALUES
    (1,  'Assistance with Daily Life',                          'Core'),
    (2,  'Transport',                                           'Core'),
    (3,  'Consumables',                                         'Core'),
    (4,  'Assistance with Social and Community Participation',  'Core'),
    (5,  'Assistive Technology',                                'Capital'),
    (6,  'Home Modifications',                                  'Capital'),
    (7,  'Support Coordination',                                'Capacity Building'),
    (8,  'Improved Living Arrangements',                        'Capacity Building'),
    (9,  'Increased Social and Community Participation',        'Capacity Building'),
    (10, 'Finding and Keeping a Job',                           'Capacity Building'),
    (11, 'Improved Relationships',                              'Capacity Building'),
    (12, 'Improved Health and Wellbeing',                       'Capacity Building'),
    (13, 'Improved Learning',                                   'Capacity Building'),
    (14, 'Improved Life Choices',                               'Capacity Building'),
    (15, 'Improved Daily Living',                               'Capacity Building')
ON CONFLICT (category_number) DO NOTHING;

ALTER TABLE ndis_categories ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access to ndis_categories" ON ndis_categories;
CREATE POLICY "Allow public read access to ndis_categories" ON ndis_categories
    FOR SELECT TO anon, authenticated USING (true);


-- =====================================================================
-- 11. JSCHOICE_SERVICES  (service catalogue with seed data)
-- =====================================================================

CREATE TABLE IF NOT EXISTS jschoice_services (
    id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name                  VARCHAR(255) NOT NULL,
    slug                  VARCHAR(255) UNIQUE NOT NULL,
    short_description     TEXT,
    full_description      TEXT,
    ndis_category_numbers INTEGER[] DEFAULT '{}',
    icon_name             VARCHAR(50),
    image_url             TEXT,
    display_order         INTEGER DEFAULT 0,
    is_active             BOOLEAN DEFAULT TRUE,
    created_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at            TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO jschoice_services (name, slug, short_description, ndis_category_numbers, display_order) VALUES
    ('Assistance with Daily Life',          'assistance-with-daily-life',          'Get help with household and personal tasks in your home.',                       ARRAY[1],     1),
    ('Psychosocial Recovery Coach',         'psychosocial-recovery-coach',         'Our coaches help you overcome challenges with psychosocial disabilities.',       ARRAY[7,14],  2),
    ('Assistance with Nursing Care',        'assistance-with-nursing-care',        'Comprehensive nursing care to help you recover fast.',                           ARRAY[1,12],  3),
    ('Emergency Respite',                   'emergency-respite',                   'Short-term accommodation when you need it on an emergency basis.',               ARRAY[1],     4),
    ('Group / Centre Activities',           'group-centre-activities',             'Enhance your mental and physical well-being through group activities.',          ARRAY[4,9],   5),
    ('Transportation Assistance',           'transportation-assistance',           'Get help with mobility and reaching your destinations.',                         ARRAY[2],     6),
    ('Access to Community Activities',      'access-to-community-activities',      'Access community resources and develop social connections.',                     ARRAY[4,9],   7),
    ('Support Coordination',                'support-coordination',                'Help connecting with NDIS providers and managing services.',                     ARRAY[7],     8),
    ('Allied Health Services',              'allied-health-services',              'Comprehensive allied health therapy from qualified practitioners.',              ARRAY[15,12], 9),
    ('Client and Family Advocacy',          'client-family-advocacy',              'Advocacy services for NDIS participants and their families.',                    ARRAY[14],    10),
    ('NDIS Access Requests',                'ndis-access-requests',                'Help with applying for NDIS access.',                                            ARRAY[7],     11),
    ('Innovative Community Participation',  'innovative-community-participation',  'Creative community participation including volunteer opportunities.',            ARRAY[4,9],   12),
    ('NDIS Accommodation',                  'ndis-accommodation',                  'Quality accommodation options for NDIS participants.',                           ARRAY[1,8],   13)
ON CONFLICT (slug) DO NOTHING;

DROP TRIGGER IF EXISTS update_jschoice_services_updated_at ON jschoice_services;
CREATE TRIGGER update_jschoice_services_updated_at
    BEFORE UPDATE ON jschoice_services
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE jschoice_services ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access to jschoice_services" ON jschoice_services;
CREATE POLICY "Allow public read access to jschoice_services" ON jschoice_services
    FOR SELECT TO anon, authenticated USING (true);


-- =====================================================================
-- 12. NDIS_PRICE_UPDATE_LOGS  (audit table for the price-updater job)
-- =====================================================================

CREATE TABLE IF NOT EXISTS ndis_price_update_logs (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    update_date     TIMESTAMPTZ DEFAULT NOW(),
    file_hash       VARCHAR(64),
    source_url      TEXT,
    total_items     INTEGER DEFAULT 0,
    items_added     INTEGER DEFAULT 0,
    items_removed   INTEGER DEFAULT 0,
    prices_changed  INTEGER DEFAULT 0,
    status          VARCHAR(50) DEFAULT 'success',
    error_message   TEXT,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE ndis_price_update_logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Service role can manage price logs" ON ndis_price_update_logs;
CREATE POLICY "Service role can manage price logs" ON ndis_price_update_logs
    FOR ALL TO service_role USING (true);


-- =====================================================================
-- 13. GRANTS  (anon / authenticated permissions)
-- =====================================================================

GRANT USAGE ON SCHEMA public TO anon, authenticated;

GRANT SELECT ON ndis_support_items     TO anon, authenticated;
GRANT SELECT ON ndis_categories        TO anon, authenticated;
GRANT SELECT ON jschoice_services      TO anon, authenticated;
GRANT SELECT ON gallery_items          TO anon, authenticated;
GRANT SELECT ON blog_posts             TO anon, authenticated;

GRANT INSERT ON leads                  TO anon, authenticated;

GRANT ALL ON leads                     TO service_role;
GRANT ALL ON lead_tasks                TO service_role;
GRANT ALL ON lead_activities           TO service_role;
GRANT ALL ON blog_posts                TO service_role;
GRANT ALL ON gallery_items             TO service_role;
GRANT ALL ON facebook_leads            TO service_role;
GRANT ALL ON profiles                  TO service_role;
GRANT ALL ON ndis_price_update_logs    TO service_role;


-- =====================================================================
-- 14. STORAGE BUCKETS  (manual step — create from dashboard)
-- =====================================================================
-- The app uploads to these three buckets. Create each as PUBLIC in the
-- Supabase dashboard (Storage → New bucket), then add a permissive
-- policy so the service role can manage and anon can read:
--
--   - profiles     (avatars under avatars/{userId}-{random}.{ext})
--   - blog         (featured/inline images under blog/{uuid}.{ext})
--   - gallery      (gallery photos under gallery/{uuid}.{ext})
--
-- Or run the inserts below (also works, but bucket-level toggles like
-- public access are easier from the dashboard):
--
-- INSERT INTO storage.buckets (id, name, public)
-- VALUES ('profiles', 'profiles', true),
--        ('blog',     'blog',     true),
--        ('gallery',  'gallery',  true)
-- ON CONFLICT (id) DO NOTHING;


-- =====================================================================
-- DONE. Next step: import NDIS price data.
-- Run scripts/full_batch_01.sql ... scripts/full_batch_13.sql in order.
-- =====================================================================
