/**
 * Migration Script: Mumbai (htszyyiptlahwkdgcbjq) → Sydney (htszyyiptlahwkdgcbjq)
 * Run: npx tsx scripts/migrate-to-sydney.ts
 */

import { createClient } from '@supabase/supabase-js';

// ─── OLD PROJECT (Mumbai) ────────────────────────────────────────────────────
const OLD_URL = 'https://htszyyiptlahwkdgcbjq.supabase.co';
const OLD_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJyb3drenlsY2JrZ2FvYWNpanFtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDEzODU3MSwiZXhwIjoyMDg1NzE0NTcxfQ.MxVjbqQmR50Gdf6H_qU3euwFhw2THejQ_lQVATcrrE0';

// ─── NEW PROJECT (Sydney) ────────────────────────────────────────────────────
const NEW_URL = 'https://htszyyiptlahwkdgcbjq.supabase.co';
const NEW_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh0c3p5eWlwdGxhaHdrZGdjYmpxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MjgyMTI1OSwiZXhwIjoyMDg4Mzk3MjU5fQ.lBygflWLZ-KS3zSRojpVGkWQ5zG5L5zUI9SwBkkrMWM';
const NEW_PROJECT_REF = 'htszyyiptlahwkdgcbjq';
const ACCESS_TOKEN = 'sbp_22e3b1e2c587feb29d7fe1e7f896e1e69434f6ab';

const FULL_SCHEMA_SQL = `
-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ── 1. ndis_categories ──────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.ndis_categories (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  category_number integer NOT NULL UNIQUE,
  category_name text NOT NULL,
  support_purpose varchar NOT NULL,
  description text,
  icon_name varchar,
  created_at timestamptz DEFAULT now()
);

-- ── 2. ndis_support_items ───────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.ndis_support_items (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  support_item_number varchar NOT NULL UNIQUE,
  support_item_name text NOT NULL,
  registration_group_number integer,
  registration_group_name text,
  support_category_number integer NOT NULL,
  support_category_name text NOT NULL,
  support_purpose varchar,
  unit varchar NOT NULL DEFAULT 'H',
  price_act numeric, price_nsw numeric, price_nt numeric, price_qld numeric,
  price_sa numeric, price_tas numeric, price_vic numeric, price_wa numeric,
  price_remote numeric, price_very_remote numeric,
  quote_required boolean DEFAULT false,
  non_face_to_face boolean DEFAULT false,
  provider_travel boolean DEFAULT false,
  short_notice_cancellations boolean DEFAULT false,
  ndia_requested_reports boolean DEFAULT false,
  irregular_sil_supports boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- ── 3. jschoice_services ────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.jschoice_services (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name varchar NOT NULL,
  slug varchar NOT NULL UNIQUE,
  short_description text,
  full_description text,
  ndis_category_numbers integer[] DEFAULT '{}',
  icon_name varchar,
  image_url text,
  display_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  meta_title varchar,
  meta_description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- ── 4. leads ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.leads (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name varchar NOT NULL,
  last_name varchar,
  email varchar NOT NULL,
  phone varchar,
  source varchar NOT NULL,
  source_page text,
  interested_services text[],
  ndis_participant boolean,
  ndis_number varchar,
  location varchar,
  message text,
  budget_estimate numeric,
  status varchar DEFAULT 'new',
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  contacted_at timestamptz,
  source_details jsonb,
  ndis_status varchar,
  service_matcher_answers jsonb,
  state varchar DEFAULT 'VIC',
  preferred_contact varchar DEFAULT 'email',
  budget_items jsonb,
  status_reason text,
  priority varchar DEFAULT 'normal',
  assigned_to uuid,
  assigned_at timestamptz,
  next_followup_date date,
  next_followup_note text,
  converted_at timestamptz,
  client_id varchar,
  created_by uuid,
  utm_source varchar,
  utm_medium varchar,
  utm_campaign varchar,
  utm_content varchar,
  utm_term varchar
);

-- ── 5. lead_activities ──────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.lead_activities (
  id uuid DEFAULT extensions.uuid_generate_v4() PRIMARY KEY,
  lead_id uuid NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
  activity_type varchar NOT NULL,
  title varchar NOT NULL,
  description text,
  old_value varchar,
  new_value varchar,
  created_at timestamptz DEFAULT now(),
  created_by uuid,
  created_by_name varchar
);

-- ── 6. lead_tasks ───────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.lead_tasks (
  id uuid DEFAULT extensions.uuid_generate_v4() PRIMARY KEY,
  lead_id uuid NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
  title varchar NOT NULL,
  description text,
  task_type varchar DEFAULT 'followup',
  due_date date NOT NULL,
  due_time time,
  assigned_to uuid,
  is_completed boolean DEFAULT false,
  completed_at timestamptz,
  completed_by uuid,
  priority varchar DEFAULT 'normal',
  created_at timestamptz DEFAULT now(),
  created_by uuid
);

-- ── 7. blog_categories ──────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.blog_categories (
  id uuid DEFAULT extensions.uuid_generate_v4() PRIMARY KEY,
  name varchar NOT NULL,
  slug varchar NOT NULL UNIQUE,
  description text,
  parent_id uuid REFERENCES public.blog_categories(id),
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- ── 8. blog_posts ───────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id uuid DEFAULT extensions.uuid_generate_v4() PRIMARY KEY,
  title varchar NOT NULL,
  slug varchar NOT NULL UNIQUE,
  excerpt text,
  content text NOT NULL,
  featured_image text,
  featured_image_alt varchar,
  category varchar,
  tags text[],
  meta_title varchar,
  meta_description text,
  canonical_url text,
  author_id uuid,
  author_name varchar,
  author_avatar text,
  status varchar DEFAULT 'draft',
  published_at timestamptz,
  scheduled_for timestamptz,
  view_count integer DEFAULT 0,
  allow_comments boolean DEFAULT true,
  is_featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- ── 9. chat_messages ────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.chat_messages (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  conversation_id uuid DEFAULT gen_random_uuid(),
  role text CHECK (role = ANY (ARRAY['user'::text, 'assistant'::text, 'system'::text])),
  content text,
  created_at timestamptz DEFAULT now()
);

-- ── 10. gallery_items ───────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.gallery_items (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  description text,
  images text[] DEFAULT '{}',
  category text,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT timezone('utc', now()),
  updated_at timestamptz DEFAULT timezone('utc', now())
);

-- ── 11. ndis_price_update_logs ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.ndis_price_update_logs (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  update_date timestamptz DEFAULT now(),
  file_hash varchar,
  source_url text,
  total_items integer DEFAULT 0,
  items_added integer DEFAULT 0,
  items_removed integer DEFAULT 0,
  prices_changed integer DEFAULT 0,
  status varchar DEFAULT 'success',
  error_message text,
  created_at timestamptz DEFAULT now()
);

-- ── 12. service_matcher_questions ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.service_matcher_questions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  question_text text NOT NULL,
  question_type varchar NOT NULL,
  options jsonb,
  related_service_slugs text[],
  display_order integer DEFAULT 0,
  is_required boolean DEFAULT true,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- ── 13. profiles ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name text,
  avatar_url text,
  job_title text,
  phone text,
  role text DEFAULT 'admin',
  email_notifications boolean DEFAULT true,
  created_at timestamptz DEFAULT timezone('utc', now()),
  updated_at timestamptz DEFAULT timezone('utc', now())
);

-- ── INDEXES ──────────────────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_support_items_category  ON public.ndis_support_items USING btree (support_category_number);
CREATE INDEX IF NOT EXISTS idx_support_items_number    ON public.ndis_support_items USING btree (support_item_number);
CREATE INDEX IF NOT EXISTS idx_support_items_name      ON public.ndis_support_items USING gin (to_tsvector('english', support_item_name));
CREATE INDEX IF NOT EXISTS idx_leads_status            ON public.leads USING btree (status);
CREATE INDEX IF NOT EXISTS idx_leads_email             ON public.leads USING btree (email);
CREATE INDEX IF NOT EXISTS idx_leads_source            ON public.leads USING btree (source);
CREATE INDEX IF NOT EXISTS idx_leads_created           ON public.leads USING btree (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_activities_lead         ON public.lead_activities USING btree (lead_id);
CREATE INDEX IF NOT EXISTS idx_activities_created      ON public.lead_activities USING btree (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_tasks_lead              ON public.lead_tasks USING btree (lead_id);
CREATE INDEX IF NOT EXISTS idx_tasks_due               ON public.lead_tasks USING btree (due_date);
CREATE INDEX IF NOT EXISTS idx_blog_slug               ON public.blog_posts USING btree (slug);
CREATE INDEX IF NOT EXISTS idx_blog_status             ON public.blog_posts USING btree (status);
CREATE INDEX IF NOT EXISTS idx_blog_category           ON public.blog_posts USING btree (category);

-- ── ENABLE RLS ───────────────────────────────────────────────────────────────
ALTER TABLE public.ndis_categories          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ndis_support_items       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jschoice_services        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads                    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lead_activities          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lead_tasks               ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_categories          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts               ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages            ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_items            ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ndis_price_update_logs   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_matcher_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles                 ENABLE ROW LEVEL SECURITY;

-- ── RLS POLICIES ─────────────────────────────────────────────────────────────
CREATE POLICY "Allow public read access to ndis_categories"    ON public.ndis_categories    FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Allow public read access to ndis_support_items" ON public.ndis_support_items FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Allow public read access to jschoice_services"  ON public.jschoice_services  FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Anyone can submit leads"               ON public.leads FOR INSERT TO public     WITH CHECK (true);
CREATE POLICY "Allow public insert to leads"          ON public.leads FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can manage leads"  ON public.leads FOR ALL    TO public     USING (auth.role() = 'authenticated');
CREATE POLICY "Leads are viewable by authenticated"   ON public.leads FOR SELECT TO public     USING (auth.role() = 'authenticated');
CREATE POLICY "Service role can manage leads"         ON public.leads FOR ALL    TO service_role USING (true);

CREATE POLICY "Authenticated users can view activities" ON public.lead_activities FOR ALL TO public USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can manage tasks"    ON public.lead_tasks      FOR ALL TO public USING (auth.role() = 'authenticated');

CREATE POLICY "Public can view categories"          ON public.blog_categories FOR SELECT TO public USING (true);
CREATE POLICY "Public can read published blog posts" ON public.blog_posts     FOR SELECT TO public USING (status = 'published');
CREATE POLICY "Authenticated users can manage blog"  ON public.blog_posts     FOR ALL    TO public USING (auth.role() = 'authenticated');

CREATE POLICY "Users can select their own messages" ON public.chat_messages FOR SELECT TO public USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own messages" ON public.chat_messages FOR INSERT TO public WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Public Read" ON public.gallery_items FOR SELECT TO public USING (true);
CREATE POLICY "Admin All"   ON public.gallery_items FOR ALL    TO public USING (true);

CREATE POLICY "Service role can manage price logs"  ON public.ndis_price_update_logs FOR ALL TO service_role USING (true);

CREATE POLICY "Users can view own profile"   ON public.profiles FOR SELECT TO public USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR ALL    TO public USING (auth.uid() = id);
`;

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function log(msg: string) { console.log(`  ${msg}`); }
function ok(msg: string)  { console.log(`  ✓ ${msg}`); }
function err(msg: string) { console.log(`  ✗ ${msg}`); }

async function applySchema(): Promise<void> {
  console.log('\n[1/4] Applying schema to new project...');
  const res = await fetch(
    `https://api.supabase.com/v1/projects/${NEW_PROJECT_REF}/database/query`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: FULL_SCHEMA_SQL }),
    }
  );

  const body = await res.text();
  if (!res.ok) {
    err(`Schema apply failed (${res.status}): ${body}`);
    throw new Error('Schema migration failed');
  }
  ok('Schema applied successfully');
}

async function createStorageBuckets(): Promise<void> {
  console.log('\n[2/4] Creating storage buckets...');
  const buckets = [
    { id: 'blog',     name: 'blog',     public: true, fileSizeLimit: 10485760, allowedMimeTypes: ['image/*'] },
    { id: 'gallery',  name: 'gallery',  public: true, fileSizeLimit: 10485760, allowedMimeTypes: ['image/*'] },
    { id: 'profiles', name: 'profiles', public: true, fileSizeLimit: 10485760, allowedMimeTypes: ['image/*'] },
  ];

  for (const bucket of buckets) {
    const res = await fetch(`${NEW_URL}/storage/v1/bucket`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${NEW_SERVICE_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bucket),
    });
    const data = await res.json() as { name?: string; error?: string };
    if (res.ok || data?.error?.includes('already exists') || data?.error?.includes('duplicate')) {
      ok(`Bucket '${bucket.name}' ready`);
    } else {
      err(`Bucket '${bucket.name}': ${JSON.stringify(data)}`);
    }
  }
}

async function migrateTable(
  tableName: string,
  oldDb: ReturnType<typeof createClient>,
  newDb: ReturnType<typeof createClient>,
  batchSize = 500
): Promise<void> {
  // Fetch all rows from old project
  const { data, error } = await oldDb.from(tableName).select('*');
  if (error) { err(`Fetch ${tableName}: ${error.message}`); return; }
  if (!data || data.length === 0) { log(`${tableName}: 0 rows (skipped)`); return; }

  // Insert in batches
  let inserted = 0;
  for (let i = 0; i < data.length; i += batchSize) {
    const batch = data.slice(i, i + batchSize);
    const { error: insertErr } = await newDb.from(tableName).upsert(batch, { onConflict: 'id' });
    if (insertErr) {
      err(`Insert ${tableName} batch ${i}-${i + batchSize}: ${insertErr.message}`);
    } else {
      inserted += batch.length;
    }
  }
  ok(`${tableName}: ${inserted}/${data.length} rows migrated`);
}

async function migrateData(): Promise<void> {
  console.log('\n[3/4] Migrating data...');

  const oldDb = createClient(OLD_URL, OLD_SERVICE_KEY, { auth: { autoRefreshToken: false, persistSession: false } });
  const newDb = createClient(NEW_URL, NEW_SERVICE_KEY, { auth: { autoRefreshToken: false, persistSession: false } });

  // Order matters — respect FK dependencies
  await migrateTable('ndis_categories',           oldDb, newDb);
  await migrateTable('ndis_support_items',        oldDb, newDb, 200); // 631 rows in batches of 200
  await migrateTable('jschoice_services',         oldDb, newDb);
  await migrateTable('service_matcher_questions', oldDb, newDb);
  await migrateTable('blog_categories',           oldDb, newDb);
  await migrateTable('blog_posts',                oldDb, newDb);
  await migrateTable('gallery_items',             oldDb, newDb);
  await migrateTable('ndis_price_update_logs',    oldDb, newDb);
  await migrateTable('leads',                     oldDb, newDb); // leads before activities/tasks
  await migrateTable('lead_activities',           oldDb, newDb);
  await migrateTable('lead_tasks',                oldDb, newDb);
  // profiles and chat_messages skipped — require auth.users to exist first
  log('profiles / chat_messages: skipped (recreate admin user in new project dashboard first)');
}

async function verifyMigration(): Promise<void> {
  console.log('\n[4/4] Verifying row counts on new project...');
  const newDb = createClient(NEW_URL, NEW_SERVICE_KEY, { auth: { autoRefreshToken: false, persistSession: false } });

  const tables = [
    'ndis_categories', 'ndis_support_items', 'jschoice_services',
    'service_matcher_questions', 'blog_categories', 'leads',
    'lead_activities', 'ndis_price_update_logs',
  ];

  for (const table of tables) {
    const { count, error } = await newDb.from(table).select('*', { count: 'exact', head: true });
    if (error) { err(`${table}: ${error.message}`); }
    else        { ok(`${table}: ${count} rows`); }
  }
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('  JSChoice DB Migration: Mumbai → Sydney');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  try {
    await applySchema();
    await createStorageBuckets();
    await migrateData();
    await verifyMigration();
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('  Migration complete!');
    console.log('  Next: create admin user in new project dashboard');
    console.log('  Dashboard: https://supabase.com/dashboard/project/htszyyiptlahwkdgcbjq');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  } catch (e) {
    console.error('\nMigration failed:', e);
    process.exit(1);
  }
}

main();
