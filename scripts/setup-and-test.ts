/**
 * Full Setup & Test: New Sydney Project (htszyyiptlahwkdgcbjq)
 * Creates admin user + runs complete API verification
 * Run: npx tsx scripts/setup-and-test.ts
 */

import { createClient } from '@supabase/supabase-js';

const NEW_URL         = 'https://htszyyiptlahwkdgcbjq.supabase.co';
const NEW_ANON_KEY    = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh0c3p5eWlwdGxhaHdrZGdjYmpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI4MjEyNTksImV4cCI6MjA4ODM5NzI1OX0.D71EUUG8qHwHHaaWYbbU0QiRK5m79jG-4vRfsVrt7YU';
const NEW_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh0c3p5eWlwdGxhaHdrZGdjYmpxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MjgyMTI1OSwiZXhwIjoyMDg4Mzk3MjU5fQ.lBygflWLZ-KS3zSRojpVGkWQ5zG5L5zUI9SwBkkrMWM';

const ADMIN_EMAIL    = 'admin@jschoicegroup.com.au';
const ADMIN_PASSWORD = 'Admin@123';

const adminDb = createClient(NEW_URL, NEW_SERVICE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});
const anonDb  = createClient(NEW_URL, NEW_ANON_KEY);

let passed = 0;
let failed = 0;

function section(title: string) {
  console.log(`\n${'─'.repeat(52)}`);
  console.log(`  ${title}`);
  console.log('─'.repeat(52));
}

function ok(test: string, detail = '') {
  passed++;
  console.log(`  ✓  ${test}${detail ? `  →  ${detail}` : ''}`);
}

function fail(test: string, reason: string) {
  failed++;
  console.log(`  ✗  ${test}  →  ${reason}`);
}

// ─── 1. ADMIN USER SETUP ─────────────────────────────────────────────────────

async function setupAdminUser(): Promise<string | null> {
  section('1 / 6  —  Admin User Setup');

  // Try to create the user via Admin API
  const res = await fetch(`${NEW_URL}/auth/v1/admin/users`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${NEW_SERVICE_KEY}`,
      'apikey': NEW_SERVICE_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      email_confirm: true,
      user_metadata: { display_name: 'Admin' },
    }),
  });

  const data = await res.json() as { id?: string; error?: string; msg?: string };

  let userId: string | null = null;

  if (res.ok && data.id) {
    userId = data.id;
    ok(`Admin user created`, `id: ${userId}`);
  } else if (
    String(data.error).includes('already') ||
    String(data.msg).includes('already')
  ) {
    // User already exists — fetch their ID
    const { data: users, error } = await adminDb.auth.admin.listUsers();
    if (!error && users) {
      const existing = users.users.find(u => u.email === ADMIN_EMAIL);
      if (existing) {
        userId = existing.id;
        ok(`Admin user already exists`, `id: ${userId}`);
      }
    }
  } else {
    fail('Create admin user', JSON.stringify(data));
    return null;
  }

  if (!userId) {
    fail('Resolve admin user ID', 'could not determine user ID');
    return null;
  }

  // Upsert profile
  const { error: profileErr } = await adminDb.from('profiles').upsert({
    id: userId,
    display_name: 'Admin',
    job_title: 'Administrator',
    role: 'admin',
    email_notifications: true,
  }, { onConflict: 'id' });

  if (profileErr) fail('Create admin profile', profileErr.message);
  else            ok('Admin profile upserted');

  return userId;
}

// ─── 2. AUTH TEST ─────────────────────────────────────────────────────────────

async function testAuth(): Promise<string | null> {
  section('2 / 6  —  Authentication');

  const { data, error } = await anonDb.auth.signInWithPassword({
    email: ADMIN_EMAIL,
    password: ADMIN_PASSWORD,
  });

  if (error || !data.session) {
    fail('Admin login', error?.message ?? 'no session returned');
    return null;
  }

  ok('Admin login successful', `token: ${data.session.access_token.slice(0, 30)}...`);
  ok('Session expiry', new Date(data.session.expires_at! * 1000).toISOString());
  return data.session.access_token;
}

// ─── 3. PUBLIC TABLE ACCESS (anon) ───────────────────────────────────────────

async function testPublicTables() {
  section('3 / 6  —  Public Table Access (anon key)');

  const checks: [string, string, number][] = [
    ['ndis_categories',           'NDIS categories',          21],
    ['ndis_support_items',        'NDIS support items',       631],
    ['jschoice_services',         'JS Choice services',       13],
    ['service_matcher_questions', 'Service matcher questions', 4],
    ['blog_categories',           'Blog categories',           5],
  ];

  for (const [table, label, expected] of checks) {
    const { count, error } = await anonDb
      .from(table)
      .select('*', { count: 'exact', head: true });

    if (error)              fail(label, error.message);
    else if (count !== expected) fail(label, `expected ${expected}, got ${count}`);
    else                    ok(label, `${count} rows`);
  }
}

// ─── 4. NDIS SEARCH ──────────────────────────────────────────────────────────

async function testNdisSearch() {
  section('4 / 6  —  NDIS Price Guide Search');

  // Full-text search
  const { data: ftSearch, error: ftErr } = await anonDb
    .from('ndis_support_items')
    .select('support_item_number, support_item_name, price_vic')
    .textSearch('support_item_name', 'daily')
    .limit(3);

  if (ftErr)                     fail('Full-text search', ftErr.message);
  else if (!ftSearch?.length)    fail('Full-text search', 'returned 0 results');
  else                           ok('Full-text search "daily"', `${ftSearch.length} results — e.g. "${ftSearch[0].support_item_name.slice(0, 40)}..."`);

  // Category filter
  const { count: catCount, error: catErr } = await anonDb
    .from('ndis_support_items')
    .select('*', { count: 'exact', head: true })
    .eq('support_category_number', 1);

  if (catErr)         fail('Category filter (cat 1)', catErr.message);
  else if (!catCount) fail('Category filter (cat 1)', 'returned 0 results');
  else                ok('Category filter (cat 1 — Daily Life)', `${catCount} items`);

  // Single item lookup
  const { data: single, error: singleErr } = await anonDb
    .from('ndis_support_items')
    .select('*')
    .eq('support_item_number', '01_002_0107_1_1')
    .single();

  if (singleErr) fail('Single item lookup', singleErr.message);
  else           ok('Single item lookup by code', `"${single?.support_item_name?.slice(0, 45)}..."`);
}

// ─── 5. AUTHENTICATED OPERATIONS ─────────────────────────────────────────────

async function testAuthenticatedOps(token: string) {
  section('5 / 6  —  Authenticated CRM Operations');

  const authedDb = createClient(NEW_URL, NEW_ANON_KEY, {
    global: { headers: { Authorization: `Bearer ${token}` } },
  });

  // Read leads
  const { data: leads, error: leadsErr } = await authedDb
    .from('leads')
    .select('id, first_name, last_name, email, status, source');

  if (leadsErr)      fail('Read leads', leadsErr.message);
  else               ok('Read leads', `${leads?.length} leads found`);

  // Read lead activities
  const { data: acts, error: actsErr } = await authedDb
    .from('lead_activities')
    .select('id, lead_id, activity_type, title');

  if (actsErr) fail('Read lead activities', actsErr.message);
  else         ok('Read lead activities', `${acts?.length} activities`);

  // Insert a test lead (simulating public form submission)
  const testLead = {
    first_name: 'Test',
    last_name: 'Migration',
    email: 'test.migration@example.com',
    phone: '0400000000',
    source: 'migration_test',
    source_page: '/test',
    message: 'Automated migration test lead — safe to delete',
    state: 'VIC',
  };

  const { data: inserted, error: insertErr } = await adminDb
    .from('leads')
    .insert(testLead)
    .select('id')
    .single();

  if (insertErr) {
    fail('Insert test lead', insertErr.message);
  } else {
    ok('Insert test lead', `id: ${inserted?.id}`);

    // Insert activity for test lead
    const { error: actErr } = await adminDb
      .from('lead_activities')
      .insert({
        lead_id: inserted?.id,
        activity_type: 'created',
        title: 'Lead created',
        description: 'Migration test lead — auto-generated',
      });

    if (actErr) fail('Insert lead activity', actErr.message);
    else        ok('Insert lead activity');

    // Clean up test lead
    await adminDb.from('lead_activities').delete().eq('lead_id', inserted?.id);
    await adminDb.from('leads').delete().eq('id', inserted?.id);
    ok('Cleanup test lead');
  }

  // Read profile
  const { data: profile, error: profErr } = await authedDb
    .from('profiles')
    .select('display_name, role')
    .single();

  if (profErr) fail('Read admin profile', profErr.message);
  else         ok('Read admin profile', `role=${profile?.role}, name=${profile?.display_name}`);
}

// ─── 6. STORAGE ───────────────────────────────────────────────────────────────

async function testStorage() {
  section('6 / 6  —  Storage Buckets');

  const { data: buckets, error } = await adminDb.storage.listBuckets();

  if (error) {
    fail('List buckets', error.message);
    return;
  }

  const expected = ['blog', 'gallery', 'profiles'];
  for (const name of expected) {
    const found = buckets?.find(b => b.name === name);
    if (found) ok(`Bucket '${name}'`, `public=${found.public}`);
    else       fail(`Bucket '${name}'`, 'not found');
  }
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('\n' + '═'.repeat(52));
  console.log('  JSChoice Sydney — Full Setup & Test Suite');
  console.log('  Project: htszyyiptlahwkdgcbjq (ap-southeast-2)');
  console.log('═'.repeat(52));

  const userId = await setupAdminUser();
  if (!userId) { console.log('\n  Halting — admin user setup failed.\n'); process.exit(1); }

  const token = await testAuth();
  await testPublicTables();
  await testNdisSearch();
  if (token) await testAuthenticatedOps(token);
  await testStorage();

  console.log('\n' + '═'.repeat(52));
  console.log(`  Results: ${passed} passed, ${failed} failed`);
  if (failed === 0) {
    console.log('  Status:  ALL TESTS PASSED ✓');
    console.log('\n  Admin credentials:');
    console.log(`    Email:    ${ADMIN_EMAIL}`);
    console.log(`    Password: ${ADMIN_PASSWORD}`);
    console.log(`    Dashboard: https://supabase.com/dashboard/project/htszyyiptlahwkdgcbjq`);
  } else {
    console.log('  Status:  SOME TESTS FAILED — review output above');
  }
  console.log('═'.repeat(52) + '\n');

  if (failed > 0) process.exit(1);
}

main().catch(e => { console.error(e); process.exit(1); });
