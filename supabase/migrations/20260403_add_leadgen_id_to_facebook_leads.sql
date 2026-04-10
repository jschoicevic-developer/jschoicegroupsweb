-- Add leadgen_id column for duplicate detection
-- Meta retries webhook deliveries on timeout, so we need to deduplicate

ALTER TABLE facebook_leads
    ADD COLUMN IF NOT EXISTS leadgen_id TEXT;

-- Unique constraint prevents duplicate leads at the DB level
CREATE UNIQUE INDEX IF NOT EXISTS facebook_leads_leadgen_id_idx
    ON facebook_leads (leadgen_id)
    WHERE leadgen_id IS NOT NULL;
