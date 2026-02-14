-- =====================================================
-- NDIS Tools Database Schema
-- Run this script in Supabase SQL Editor
-- =====================================================

-- TABLE 1: NDIS Support Items
CREATE TABLE IF NOT EXISTS ndis_support_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    support_item_number VARCHAR(50) UNIQUE NOT NULL,
    support_item_name TEXT NOT NULL,
    registration_group_number INTEGER,
    registration_group_name TEXT,
    support_category_number INTEGER NOT NULL,
    support_category_name TEXT NOT NULL,
    support_purpose VARCHAR(50),
    unit VARCHAR(20) NOT NULL DEFAULT 'H',
    price_act DECIMAL(10, 2),
    price_nsw DECIMAL(10, 2),
    price_nt DECIMAL(10, 2),
    price_qld DECIMAL(10, 2),
    price_sa DECIMAL(10, 2),
    price_tas DECIMAL(10, 2),
    price_vic DECIMAL(10, 2),
    price_wa DECIMAL(10, 2),
    price_remote DECIMAL(10, 2),
    price_very_remote DECIMAL(10, 2),
    quote_required BOOLEAN DEFAULT FALSE,
    non_face_to_face BOOLEAN DEFAULT FALSE,
    provider_travel BOOLEAN DEFAULT FALSE,
    short_notice_cancellations BOOLEAN DEFAULT FALSE,
    ndia_requested_reports BOOLEAN DEFAULT FALSE,
    irregular_sil_supports BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_support_items_name ON ndis_support_items USING GIN (to_tsvector('english', support_item_name));
CREATE INDEX IF NOT EXISTS idx_support_items_number ON ndis_support_items (support_item_number);
CREATE INDEX IF NOT EXISTS idx_support_items_category ON ndis_support_items (support_category_number);

-- TABLE 2: Categories
CREATE TABLE IF NOT EXISTS ndis_categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    category_number INTEGER UNIQUE NOT NULL,
    category_name TEXT NOT NULL,
    support_purpose VARCHAR(50) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

INSERT INTO ndis_categories (category_number, category_name, support_purpose) VALUES
    (1, 'Assistance with Daily Life', 'Core'),
    (2, 'Transport', 'Core'),
    (3, 'Consumables', 'Core'),
    (4, 'Assistance with Social and Community Participation', 'Core'),
    (5, 'Assistive Technology', 'Capital'),
    (6, 'Home Modifications', 'Capital'),
    (7, 'Support Coordination', 'Capacity Building'),
    (8, 'Improved Living Arrangements', 'Capacity Building'),
    (9, 'Increased Social and Community Participation', 'Capacity Building'),
    (10, 'Finding and Keeping a Job', 'Capacity Building'),
    (11, 'Improved Relationships', 'Capacity Building'),
    (12, 'Improved Health and Wellbeing', 'Capacity Building'),
    (13, 'Improved Learning', 'Capacity Building'),
    (14, 'Improved Life Choices', 'Capacity Building'),
    (15, 'Improved Daily Living', 'Capacity Building')
ON CONFLICT (category_number) DO NOTHING;

-- TABLE 3: JS Choice Services
CREATE TABLE IF NOT EXISTS jschoice_services (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    short_description TEXT,
    full_description TEXT,
    ndis_category_numbers INTEGER[] DEFAULT '{}',
    icon_name VARCHAR(50),
    image_url TEXT,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

INSERT INTO jschoice_services (name, slug, short_description, ndis_category_numbers, display_order) VALUES
    ('Assistance with Daily Life', 'assistance-with-daily-life', 'Get help with household and personal tasks in your home.', ARRAY[1], 1),
    ('Psychosocial Recovery Coach', 'psychosocial-recovery-coach', 'Our coaches help you overcome challenges with psychosocial disabilities.', ARRAY[7, 14], 2),
    ('Assistance with Nursing Care', 'assistance-with-nursing-care', 'Comprehensive nursing care to help you recover fast.', ARRAY[1, 12], 3),
    ('Emergency Respite', 'emergency-respite', 'Short-term accommodation when you need it on an emergency basis.', ARRAY[1], 4),
    ('Group / Centre Activities', 'group-centre-activities', 'Enhance your mental and physical well-being through group activities.', ARRAY[4, 9], 5),
    ('Transportation Assistance', 'transportation-assistance', 'Get help with mobility and reaching your destinations.', ARRAY[2], 6),
    ('Access to Community Activities', 'access-to-community-activities', 'Access community resources and develop social connections.', ARRAY[4, 9], 7),
    ('Support Coordination', 'support-coordination', 'Help connecting with NDIS providers and managing services.', ARRAY[7], 8),
    ('Allied Health Services', 'allied-health-services', 'Comprehensive allied health therapy from qualified practitioners.', ARRAY[15, 12], 9),
    ('Client and Family Advocacy', 'client-family-advocacy', 'Advocacy services for NDIS participants and their families.', ARRAY[14], 10),
    ('NDIS Access Requests', 'ndis-access-requests', 'Help with applying for NDIS access.', ARRAY[7], 11),
    ('Innovative Community Participation', 'innovative-community-participation', 'Creative community participation including volunteer opportunities.', ARRAY[4, 9], 12),
    ('NDIS Accommodation', 'ndis-accommodation', 'Quality accommodation options for NDIS participants.', ARRAY[1, 8], 13)
ON CONFLICT (slug) DO NOTHING;

-- TABLE 4: Leads (for capturing contact info)
CREATE TABLE IF NOT EXISTS leads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100),
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    source VARCHAR(100) NOT NULL,
    source_page TEXT,
    interested_services TEXT[],
    ndis_participant BOOLEAN,
    ndis_number VARCHAR(50),
    location VARCHAR(100),
    message TEXT,
    budget_estimate DECIMAL(10, 2),
    status VARCHAR(50) DEFAULT 'new',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_leads_email ON leads (email);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads (status);
CREATE INDEX IF NOT EXISTS idx_leads_created ON leads (created_at DESC);

-- TABLE 5: Price Update Logs
CREATE TABLE IF NOT EXISTS ndis_price_update_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    update_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    file_hash VARCHAR(64),
    source_url TEXT,
    total_items INTEGER DEFAULT 0,
    items_added INTEGER DEFAULT 0,
    items_removed INTEGER DEFAULT 0,
    prices_changed INTEGER DEFAULT 0,
    status VARCHAR(50) DEFAULT 'success',
    error_message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE ndis_support_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE ndis_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE jschoice_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE ndis_price_update_logs ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access to ndis_support_items"
ON ndis_support_items FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Allow public read access to ndis_categories"
ON ndis_categories FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Allow public read access to jschoice_services"
ON jschoice_services FOR SELECT
TO anon, authenticated
USING (true);

-- Leads can only be inserted (no read access for public)
CREATE POLICY "Allow public insert to leads"
ON leads FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Only authenticated service role can read/update leads
CREATE POLICY "Service role can manage leads"
ON leads FOR ALL
TO service_role
USING (true);

-- Only service role can manage price update logs
CREATE POLICY "Service role can manage price logs"
ON ndis_price_update_logs FOR ALL
TO service_role
USING (true);

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT ON ndis_support_items TO anon, authenticated;
GRANT SELECT ON ndis_categories TO anon, authenticated;
GRANT SELECT ON jschoice_services TO anon, authenticated;
GRANT INSERT ON leads TO anon, authenticated;
GRANT ALL ON leads TO service_role;
GRANT ALL ON ndis_price_update_logs TO service_role;

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_ndis_support_items_updated_at BEFORE UPDATE ON ndis_support_items
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_jschoice_services_updated_at BEFORE UPDATE ON jschoice_services
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON leads
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
