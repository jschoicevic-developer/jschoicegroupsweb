-- =====================================================================
-- Delta migration: bring `leads` table up to date with the full schema
-- needed by /api/leads and the Lead TypeScript type.
--
-- Run this on a Supabase project that already had complete_setup.sql
-- (v1) applied. Safe to re-run — uses IF NOT EXISTS / DROP IF EXISTS.
-- =====================================================================

BEGIN;

-- ---------------------------------------------------------------------
-- 1. Allow email to be NULL (API supports email-OR-phone)
-- ---------------------------------------------------------------------
ALTER TABLE leads ALTER COLUMN email DROP NOT NULL;


-- ---------------------------------------------------------------------
-- 2. Add new columns (all nullable / with safe defaults)
-- ---------------------------------------------------------------------
ALTER TABLE leads
    ADD COLUMN IF NOT EXISTS source_details          JSONB,
    ADD COLUMN IF NOT EXISTS ndis_status             VARCHAR(20),
    ADD COLUMN IF NOT EXISTS service_matcher_answers JSONB,
    ADD COLUMN IF NOT EXISTS state                   VARCHAR(10) NOT NULL DEFAULT 'VIC',
    ADD COLUMN IF NOT EXISTS preferred_contact       VARCHAR(20) NOT NULL DEFAULT 'email',
    ADD COLUMN IF NOT EXISTS budget_items            JSONB,
    ADD COLUMN IF NOT EXISTS status_reason           TEXT,
    ADD COLUMN IF NOT EXISTS priority                VARCHAR(20) NOT NULL DEFAULT 'normal',
    ADD COLUMN IF NOT EXISTS assigned_to             TEXT,
    ADD COLUMN IF NOT EXISTS assigned_at             TIMESTAMPTZ,
    ADD COLUMN IF NOT EXISTS next_followup_date      TIMESTAMPTZ,
    ADD COLUMN IF NOT EXISTS next_followup_note      TEXT,
    ADD COLUMN IF NOT EXISTS converted_at            TIMESTAMPTZ,
    ADD COLUMN IF NOT EXISTS client_id               TEXT,
    ADD COLUMN IF NOT EXISTS internal_notes          TEXT,
    ADD COLUMN IF NOT EXISTS utm_source              TEXT,
    ADD COLUMN IF NOT EXISTS utm_medium              TEXT,
    ADD COLUMN IF NOT EXISTS utm_campaign            TEXT,
    ADD COLUMN IF NOT EXISTS utm_content             TEXT,
    ADD COLUMN IF NOT EXISTS utm_term                TEXT,
    ADD COLUMN IF NOT EXISTS created_by              TEXT;


-- ---------------------------------------------------------------------
-- 3. Add / replace CHECK constraints
-- (drop-then-add so this is idempotent)
-- ---------------------------------------------------------------------
ALTER TABLE leads DROP CONSTRAINT IF EXISTS leads_source_check;
ALTER TABLE leads ADD CONSTRAINT leads_source_check
    CHECK (source IN ('contact_form','service_matcher','budget_calculator',
                      'blog_subscription','referral','phone','walk_in','other'));

ALTER TABLE leads DROP CONSTRAINT IF EXISTS leads_status_check;
ALTER TABLE leads ADD CONSTRAINT leads_status_check
    CHECK (status IN ('new','contacted','qualified','proposal',
                      'won','lost','archived'));

ALTER TABLE leads DROP CONSTRAINT IF EXISTS leads_ndis_status_check;
ALTER TABLE leads ADD CONSTRAINT leads_ndis_status_check
    CHECK (ndis_status IS NULL OR
           ndis_status IN ('funded','pending','applying','not_sure'));

ALTER TABLE leads DROP CONSTRAINT IF EXISTS leads_preferred_contact_check;
ALTER TABLE leads ADD CONSTRAINT leads_preferred_contact_check
    CHECK (preferred_contact IN ('email','phone','either'));

ALTER TABLE leads DROP CONSTRAINT IF EXISTS leads_priority_check;
ALTER TABLE leads ADD CONSTRAINT leads_priority_check
    CHECK (priority IN ('low','normal','high','urgent'));


-- ---------------------------------------------------------------------
-- 4. New indexes
-- ---------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_leads_assigned_to   ON leads (assigned_to);
CREATE INDEX IF NOT EXISTS idx_leads_priority      ON leads (priority);
CREATE INDEX IF NOT EXISTS idx_leads_source        ON leads (source);
CREATE INDEX IF NOT EXISTS idx_leads_next_followup ON leads (next_followup_date)
    WHERE next_followup_date IS NOT NULL;

COMMIT;
