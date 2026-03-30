-- ============================================================
-- Facebook Leads Table
-- Stores leads captured from Facebook / Instagram ad campaigns
-- ============================================================

CREATE TABLE IF NOT EXISTS facebook_leads (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    -- Lead contact info
    full_name     TEXT NOT NULL,
    email         TEXT,
    phone         TEXT,

    -- Facebook campaign tracking
    campaign_id   TEXT,
    campaign_name TEXT,
    ad_id         TEXT,
    ad_name       TEXT,
    form_id       TEXT,
    form_name     TEXT,

    -- CRM management
    status        TEXT NOT NULL DEFAULT 'new'
                    CHECK (status IN ('new', 'contacted', 'qualified', 'quoted', 'won', 'lost')),
    notes         TEXT,

    -- Timestamps
    created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Auto-update updated_at on row change
CREATE OR REPLACE FUNCTION update_facebook_leads_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_facebook_leads_updated_at ON facebook_leads;
CREATE TRIGGER set_facebook_leads_updated_at
    BEFORE UPDATE ON facebook_leads
    FOR EACH ROW EXECUTE FUNCTION update_facebook_leads_updated_at();

-- Indexes for common query patterns
CREATE INDEX IF NOT EXISTS facebook_leads_status_idx    ON facebook_leads (status);
CREATE INDEX IF NOT EXISTS facebook_leads_campaign_idx  ON facebook_leads (campaign_name);
CREATE INDEX IF NOT EXISTS facebook_leads_created_idx   ON facebook_leads (created_at DESC);

-- Enable Row Level Security (open for service-role key used by supabase-admin)
ALTER TABLE facebook_leads ENABLE ROW LEVEL SECURITY;

-- Allow full access for authenticated service role (admin API)
CREATE POLICY "service_role_all" ON facebook_leads
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);
