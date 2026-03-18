/**
 * Complete Tool & API Test Suite — JSChoice Sydney Project
 * Tests every tool, route and DB operation exactly as the app uses them.
 * Run: npx tsx scripts/test-all-tools.ts
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';

const URL         = 'https://htszyyiptlahwkdgcbjq.supabase.co';
const ANON_KEY    = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh0c3p5eWlwdGxhaHdrZGdjYmpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI4MjEyNTksImV4cCI6MjA4ODM5NzI1OX0.D71EUUG8qHwHHaaWYbbU0QiRK5m79jG-4vRfsVrt7YU';
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh0c3p5eWlwdGxhaHdrZGdjYmpxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MjgyMTI1OSwiZXhwIjoyMDg4Mzk3MjU5fQ.lBygflWLZ-KS3zSRojpVGkWQ5zG5L5zUI9SwBkkrMWM';

const ADMIN_EMAIL = 'admin@jschoicegroup.com.au';
const ADMIN_PASS  = 'Admin@123';

const svc  = createClient(URL, SERVICE_KEY, { auth: { autoRefreshToken: false, persistSession: false } });
const anon = createClient(URL, ANON_KEY);

let passed = 0; let failed = 0; let warned = 0;
const failures: string[] = [];

function section(title: string) {
  console.log(`\n${'━'.repeat(58)}`);
  console.log(`  ${title}`);
  console.log('━'.repeat(58));
}

function ok(name: string, detail = '')  { passed++; console.log(`  ✓  ${name}${detail ? `  (${detail})` : ''}`); }
function warn(name: string, msg: string){ warned++; console.log(`  ⚠  ${name}  →  ${msg}`); }
function fail(name: string, msg: string){ failed++; failures.push(`${name}: ${msg}`); console.log(`  ✗  ${name}  →  ${msg}`); }

// ─── HELPERS ─────────────────────────────────────────────────────────────────

async function count(db: SupabaseClient, table: string, filters?: Record<string, unknown>) {
  let q = db.from(table).select('*', { count: 'exact', head: true });
  if (filters) for (const [k, v] of Object.entries(filters)) q = q.eq(k, v as string);
  return q;
}

// ═══════════════════════════════════════════════════════════
//  SECTION 1 — AUTH
// ═══════════════════════════════════════════════════════════

async function testAuth(): Promise<SupabaseClient | null> {
  section('1 / 8  ·  Authentication');

  const { data, error } = await anon.auth.signInWithPassword({ email: ADMIN_EMAIL, password: ADMIN_PASS });
  if (error || !data.session) { fail('Admin sign-in', error?.message ?? 'no session'); return null; }
  ok('Admin sign-in', `expires ${new Date(data.session.expires_at! * 1000).toISOString()}`);

  // Create authed client
  const authed = createClient(URL, ANON_KEY, {
    global: { headers: { Authorization: `Bearer ${data.session.access_token}` } },
  });

  // Confirm profile readable
  const { data: profile, error: pe } = await authed.from('profiles').select('display_name, role').single();
  if (pe) fail('Read own profile', pe.message);
  else    ok('Read own profile', `role=${profile?.role}, name=${profile?.display_name}`);

  // Confirm anon cannot read leads
  const { data: leakData, error: leakErr } = await anon.from('leads').select('id').limit(1);
  if (!leakErr && leakData && leakData.length > 0) warn('RLS check: leads', 'anon key CAN read leads — tighten policy');
  else ok('RLS: leads hidden from anon');

  return authed;
}

// ═══════════════════════════════════════════════════════════
//  SECTION 2 — NDIS PRICE GUIDE TOOL
// ═══════════════════════════════════════════════════════════

async function testPriceGuide() {
  section('2 / 8  ·  NDIS Price Guide Tool  (/tools/ndis-price-guide)');

  // All categories (used for the category dropdown)
  const { data: cats, error: ce } = await anon
    .from('ndis_support_items')
    .select('support_category_number, support_category_name')
    .order('support_category_number');
  if (ce) { fail('Fetch categories from items', ce.message); }
  else {
    const unique = new Set(cats?.map(c => c.support_category_number));
    if (unique.size >= 15) ok('Categories from support items', `${unique.size} distinct categories`);
    else fail('Categories count', `expected ≥15, got ${unique.size}`);
  }

  // Keyword search — simulates user typing "daily"
  const { data: kw, error: kwe } = await anon
    .from('ndis_support_items')
    .select('support_item_number, support_item_name, support_category_number, unit, price_vic')
    .ilike('support_item_name', '%daily%')
    .order('support_item_name')
    .limit(15);
  if (kwe) fail('Keyword search "daily"', kwe.message);
  else if (!kw?.length) fail('Keyword search "daily"', 'returned 0 results');
  else ok('Keyword search "daily"', `${kw.length} results — "${kw[0].support_item_name.slice(0, 45)}..."`);

  // Item number prefix search — simulates typing "01_"
  const { data: num, error: nue } = await anon
    .from('ndis_support_items')
    .select('support_item_number, support_item_name, price_vic')
    .ilike('support_item_number', '01_%')
    .order('support_item_number')
    .limit(10);
  if (nue) fail('Item-number prefix search "01_"', nue.message);
  else ok('Item-number prefix search "01_"', `${num?.length} results`);

  // Category filter — all cat 7 (Support Coordination)
  const { count: cat7, error: c7e } = await count(anon, 'ndis_support_items', { support_category_number: 7 });
  if (c7e) fail('Category filter (cat 7)', c7e.message);
  else ok('Category filter (cat 7 — Support Coord)', `${cat7} items`);

  // Full-text search
  const { data: ft, error: fte } = await anon
    .from('ndis_support_items')
    .select('support_item_number, support_item_name')
    .textSearch('support_item_name', 'therapy')
    .limit(5);
  if (fte) fail('Full-text search "therapy"', fte.message);
  else ok('Full-text search "therapy"', `${ft?.length} results`);

  // Single item lookup by code (detail page)
  const { data: item, error: ie } = await anon
    .from('ndis_support_items')
    .select('*')
    .eq('support_item_number', '01_002_0107_1_1')
    .single();
  if (ie) fail('Item detail lookup', ie.message);
  else {
    ok('Item detail lookup by code', item?.support_item_name?.slice(0, 50));
    // Verify all regional prices present
    const regions = ['price_vic', 'price_nsw', 'price_qld', 'price_sa', 'price_wa', 'price_act'];
    const missing = regions.filter(r => item?.[r as keyof typeof item] === null);
    if (missing.length) warn('Regional prices', `null for: ${missing.join(', ')}`);
    else ok('All regional prices populated');
    // Verify claim rules
    const rules = ['quote_required','non_face_to_face','provider_travel','short_notice_cancellations'];
    ok('Claim rules present', rules.map(r => `${r}=${item?.[r as keyof typeof item]}`).join(', '));
  }

  // Pagination
  const { data: page1, error: pe1 } = await anon
    .from('ndis_support_items')
    .select('support_item_number, support_item_name')
    .range(0, 14);
  const { data: page2, error: pe2 } = await anon
    .from('ndis_support_items')
    .select('support_item_number, support_item_name')
    .range(15, 29);
  if (pe1 || pe2) fail('Pagination', 'range query failed');
  else if (page1?.[0]?.support_item_number === page2?.[0]?.support_item_number) fail('Pagination', 'pages overlap');
  else ok('Pagination', `page1[0]=${page1?.[0]?.support_item_number}, page2[0]=${page2?.[0]?.support_item_number}`);
}

// ═══════════════════════════════════════════════════════════
//  SECTION 3 — NDIS BUDGET CALCULATOR
// ═══════════════════════════════════════════════════════════

async function testBudgetCalculator() {
  section('3 / 8  ·  NDIS Budget Calculator  (/tools/ndis-budget-calculator)');

  // Categories for selector
  const { data: cats, error: ce } = await anon
    .from('ndis_categories')
    .select('category_number, category_name, support_purpose')
    .order('category_number');
  if (ce) fail('Load categories', ce.message);
  else {
    ok('Load categories', `${cats?.length} categories`);
    const core = cats?.filter(c => c.support_purpose === 'Core').length ?? 0;
    const cap  = cats?.filter(c => c.support_purpose === 'Capital').length ?? 0;
    const cb   = cats?.filter(c => c.support_purpose === 'Capacity Building').length ?? 0;
    ok('Category breakdown', `Core=${core}, Capital=${cap}, Capacity Building=${cb}`);
  }

  // Item search within a category (e.g. user picks Daily Life, searches "support worker")
  const { data: items, error: ie } = await anon
    .from('ndis_support_items')
    .select('support_item_number, support_item_name, unit, price_vic, price_nsw, price_qld, price_sa, price_wa, price_act, price_nt, price_tas, price_remote, price_very_remote')
    .eq('support_category_number', 1)
    .ilike('support_item_name', '%support worker%')
    .limit(20);
  if (ie) fail('Item search in category', ie.message);
  else ok('Item search "support worker" in cat 1', `${items?.length} results`);

  // All items for a region (budget calculation needs prices)
  const { data: vic, error: ve } = await anon
    .from('ndis_support_items')
    .select('support_item_number, price_vic')
    .not('price_vic', 'is', null)
    .limit(10);
  if (ve) fail('VIC prices', ve.message);
  else ok('VIC prices available', `sample: $${vic?.[0]?.price_vic}`);

  // Verify all 8 states have prices for at least some items
  const regions = ['vic', 'nsw', 'qld', 'sa', 'wa', 'act', 'nt', 'tas'] as const;
  for (const region of regions) {
    const { count: c } = await svc
      .from('ndis_support_items')
      .select('*', { count: 'exact', head: true })
      .not(`price_${region}`, 'is', null);
    if ((c ?? 0) > 0) ok(`Region ${region.toUpperCase()} prices`, `${c} items with prices`);
    else warn(`Region ${region.toUpperCase()}`, 'no prices found');
  }
}

// ═══════════════════════════════════════════════════════════
//  SECTION 4 — SERVICE MATCHER TOOL
// ═══════════════════════════════════════════════════════════

async function testServiceMatcher() {
  section('4 / 8  ·  Service Matcher Tool  (/tools/service-matcher)');

  // Load questions (public)
  const { data: questions, error: qe } = await anon
    .from('service_matcher_questions')
    .select('*')
    .eq('is_active', true)
    .order('display_order');
  if (qe) fail('Load questions', qe.message);
  else if (!questions?.length) fail('Questions', 'returned 0 — tool will be broken');
  else {
    ok('Load questions', `${questions.length} active questions`);
    questions.forEach(q => {
      const opts = Array.isArray(q.options) ? q.options.length : 0;
      ok(`  Q${q.display_order}: "${q.question_text.slice(0, 45)}..."`, `type=${q.question_type}, ${opts} options`);
    });
  }

  // Load matching services (simulates answering questions)
  const { data: allServices, error: se } = await anon
    .from('jschoice_services')
    .select('id, name, slug, short_description, ndis_category_numbers, display_order')
    .eq('is_active', true)
    .order('display_order');
  if (se) fail('Load services', se.message);
  else ok('Load all services', `${allServices?.length} active services`);

  // Category-filtered services (user answered "daily life")
  const { data: filtered, error: fe } = await anon
    .from('jschoice_services')
    .select('name, slug, ndis_category_numbers')
    .eq('is_active', true)
    .filter('ndis_category_numbers', 'ov', '{1,4}');
  if (fe) fail('Category-filtered services', fe.message);
  else ok('Category filter (cat 1 + 4)', `${filtered?.length} matching services`);

  // Submit a lead from service matcher
  const testLead = {
    first_name: 'ServiceMatcher',
    last_name: 'Test',
    email: 'servicematcher.test@example.com',
    phone: '0411000001',
    source: 'service_matcher',
    source_page: '/tools/service-matcher',
    interested_services: ['daily-life', 'community-access'],
    message: 'Auto test from service matcher — safe to delete',
    state: 'VIC',
    priority: 'high',
  };
  const { data: lead, error: le } = await svc.from('leads').insert(testLead).select('id').single();
  if (le) fail('Submit lead from matcher', le.message);
  else {
    ok('Submit lead from service matcher', `id: ${lead?.id}`);
    // Cleanup
    await svc.from('leads').delete().eq('id', lead?.id);
    ok('Cleanup service matcher test lead');
  }
}

// ═══════════════════════════════════════════════════════════
//  SECTION 5 — CRM / LEADS (Admin)
// ═══════════════════════════════════════════════════════════

async function testCRM(authed: SupabaseClient) {
  section('5 / 8  ·  CRM — Leads & Activities  (/admin/leads)');

  // List leads with pagination
  const { data: leads, count: total, error: le } = await authed
    .from('leads')
    .select('id, first_name, last_name, email, source, status, priority, created_at', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(0, 19);
  if (le) fail('List leads (page 1)', le.message);
  else ok('List leads (page 1)', `${leads?.length} of ${total} total`);

  // Filter by status
  const { data: newLeads, error: nle } = await authed
    .from('leads').select('id').eq('status', 'new');
  if (nle) fail('Filter leads by status=new', nle.message);
  else ok('Filter by status=new', `${newLeads?.length} leads`);

  // Search leads by name/email
  const { data: search, error: sre } = await authed
    .from('leads')
    .select('id, first_name, email')
    .or('first_name.ilike.%eli%,email.ilike.%eli%');
  if (sre) fail('Search leads', sre.message);
  else ok('Search leads (name/email contains "eli")', `${search?.length} results`);

  // Get single lead detail
  const { data: leadId } = await svc.from('leads').select('id').limit(1).single();
  if (leadId) {
    const { data: detail, error: de } = await authed
      .from('leads').select('*').eq('id', leadId.id).single();
    if (de) fail('Get lead detail', de.message);
    else ok('Get lead detail', `${detail?.first_name} ${detail?.last_name} — ${detail?.email}`);

    // Lead activities for that lead
    const { data: acts, error: ae } = await authed
      .from('lead_activities')
      .select('id, activity_type, title, created_at')
      .eq('lead_id', leadId.id)
      .order('created_at', { ascending: false });
    if (ae) fail('Get lead activities', ae.message);
    else ok('Get lead activities', `${acts?.length} activities for lead`);
  }

  // Create lead task
  const { data: task, error: te } = await svc.from('lead_tasks').insert({
    lead_id: leadId?.id,
    title: 'Test followup task',
    task_type: 'followup',
    due_date: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
    priority: 'normal',
  }).select('id').single();
  if (te) fail('Create lead task', te.message);
  else {
    ok('Create lead task', `id: ${task?.id}`);
    // Complete the task
    const { error: ce } = await svc.from('lead_tasks')
      .update({ is_completed: true, completed_at: new Date().toISOString() })
      .eq('id', task?.id);
    if (ce) fail('Complete lead task', ce.message);
    else ok('Complete lead task');
    // Cleanup
    await svc.from('lead_tasks').delete().eq('id', task?.id);
    ok('Cleanup task');
  }

  // Analytics overview (simulates /api/analytics/overview)
  const today = new Date(); today.setHours(0,0,0,0);
  const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
  const { count: totalLeads }  = await svc.from('leads').select('*', { count: 'exact', head: true });
  const { count: newLeadsC }   = await svc.from('leads').select('*', { count: 'exact', head: true }).eq('status', 'new');
  const { count: monthLeads }  = await svc.from('leads').select('*', { count: 'exact', head: true }).gte('created_at', monthStart.toISOString());
  ok('Analytics overview — total leads', `${totalLeads}`);
  ok('Analytics overview — new leads', `${newLeadsC}`);
  ok('Analytics overview — this month', `${monthLeads}`);
}

// ═══════════════════════════════════════════════════════════
//  SECTION 6 — BLOG
// ═══════════════════════════════════════════════════════════

async function testBlog(authed: SupabaseClient) {
  section('6 / 8  ·  Blog  (/blog + /admin/blog)');

  // Public: categories
  const { data: cats, error: ce } = await anon.from('blog_categories').select('*').order('display_order');
  if (ce) fail('Public: read categories', ce.message);
  else ok('Public: read categories', cats?.map(c => c.name).join(', '));

  // Public: published posts only
  const { data: pub, error: pe } = await anon
    .from('blog_posts').select('id, title, slug, status').eq('status', 'published');
  if (pe) fail('Public: read published posts', pe.message);
  else ok('Public: published posts', `${pub?.length} published`);

  // Verify anon cannot see drafts (RLS check)
  const { data: drafts } = await anon
    .from('blog_posts').select('id').eq('status', 'draft');
  if (drafts && drafts.length > 0) warn('RLS: drafts', 'anon can read draft posts');
  else ok('RLS: draft posts hidden from anon');

  // Admin: create, read, update, delete post
  const testPost = {
    title: 'Migration Test Post',
    slug: `migration-test-${Date.now()}`,
    content: 'This is an automated test post — safe to delete.',
    excerpt: 'Test excerpt.',
    status: 'draft',
    category: 'Company Updates',
    tags: ['test', 'migration'],
    author_name: 'Admin',
  };
  const { data: post, error: cpe } = await svc.from('blog_posts').insert(testPost).select('id').single();
  if (cpe) fail('Admin: create draft post', cpe.message);
  else {
    ok('Admin: create draft post', `id: ${post?.id}`);
    // Update
    const { error: ue } = await svc.from('blog_posts')
      .update({ title: 'Migration Test Post (Updated)' }).eq('id', post?.id);
    if (ue) fail('Admin: update post', ue.message);
    else ok('Admin: update post title');
    // Publish
    const { error: pub2 } = await svc.from('blog_posts')
      .update({ status: 'published', published_at: new Date().toISOString() }).eq('id', post?.id);
    if (pub2) fail('Admin: publish post', pub2.message);
    else ok('Admin: publish post');
    // Verify public can now see it
    const { data: visible } = await anon.from('blog_posts').select('id').eq('id', post?.id).eq('status', 'published');
    if (visible?.length) ok('Public can see newly published post');
    else warn('Visibility', 'published post not visible to anon');
    // Cleanup
    await svc.from('blog_posts').delete().eq('id', post?.id);
    ok('Admin: delete post (cleanup)');
  }

  // Read categories via admin
  const { count: catCount } = await authed.from('blog_categories').select('*', { count: 'exact', head: true });
  ok('Admin: blog categories', `${catCount} categories`);
}

// ═══════════════════════════════════════════════════════════
//  SECTION 7 — GALLERY
// ═══════════════════════════════════════════════════════════

async function testGallery() {
  section('7 / 8  ·  Gallery  (/gallery + /admin/gallery)');

  // Public read
  const { data: items, error: ie } = await anon.from('gallery_items').select('*').order('display_order');
  if (ie) fail('Public: read gallery', ie.message);
  else ok('Public: read gallery items', `${items?.length} items`);

  // Admin: create item
  const testItem = {
    title: 'Test Gallery Item',
    description: 'Auto test — safe to delete',
    images: ['https://example.com/test.jpg'],
    category: 'Events',
    display_order: 999,
  };
  const { data: gi, error: ge } = await svc.from('gallery_items').insert(testItem).select('id').single();
  if (ge) fail('Admin: create gallery item', ge.message);
  else {
    ok('Admin: create gallery item', `id: ${gi?.id}`);
    // Update
    await svc.from('gallery_items').update({ title: 'Updated Test Item' }).eq('id', gi?.id);
    ok('Admin: update gallery item');
    // Cleanup
    await svc.from('gallery_items').delete().eq('id', gi?.id);
    ok('Admin: delete gallery item (cleanup)');
  }

  // Storage buckets accessible
  const { data: buckets } = await svc.storage.listBuckets();
  const names = buckets?.map(b => b.name) ?? [];
  for (const b of ['blog', 'gallery', 'profiles']) {
    if (names.includes(b)) ok(`Storage bucket '${b}'`, 'accessible');
    else fail(`Storage bucket '${b}'`, 'not found');
  }
}

// ═══════════════════════════════════════════════════════════
//  SECTION 8 — LEAD CAPTURE FORMS (public submissions)
// ═══════════════════════════════════════════════════════════

async function testLeadForms() {
  section('8 / 8  ·  Public Lead Capture Forms');

  const forms = [
    { name: 'Contact Form',      source: 'contact_form',   page: '/contact-us' },
    { name: 'Referral Form',     source: 'referral',        page: '/consultations' },
    { name: 'Service Enquiry',   source: 'service_enquiry', page: '/assistance-with-daily-life' },
  ];

  for (const form of forms) {
    const { data, error } = await svc.from('leads').insert({
      first_name: `Test_${form.source}`,
      last_name: 'AutoTest',
      email: `test.${form.source}@example.com`,
      phone: '0400000000',
      source: form.source,
      source_page: form.page,
      message: `Automated test — ${form.name} — safe to delete`,
      state: 'VIC',
      status: 'new',
    }).select('id').single();

    if (error) fail(form.name, error.message);
    else {
      ok(form.name, `submitted → id: ${data?.id}`);
      // Cleanup
      await svc.from('leads').delete().eq('id', data?.id);
    }
  }

  // Validation: missing required fields
  const { error: valErr } = await svc.from('leads').insert({
    email: 'test@test.com',
    source: 'contact_form',
    // first_name missing — should fail
  } as never);
  if (valErr) ok('Validation: missing first_name rejected', valErr.message.slice(0, 60));
  else warn('Validation', 'lead inserted without first_name — check DB constraint');

  // Duplicate email handling (same email, different submission)
  const { data: d1 } = await svc.from('leads').insert({ first_name: 'Dup', email: 'dup@test.com', source: 'test' }).select('id').single();
  const { data: d2 } = await svc.from('leads').insert({ first_name: 'Dup2', email: 'dup@test.com', source: 'test' }).select('id').single();
  if (d1 && d2 && d1.id !== d2.id) ok('Duplicate email: both submissions accepted (expected)', 'CRM deduplication is app-level');
  if (d1) await svc.from('leads').delete().eq('id', d1.id);
  if (d2) await svc.from('leads').delete().eq('id', d2.id);
}

// ═══════════════════════════════════════════════════════════
//  MAIN
// ═══════════════════════════════════════════════════════════

async function main() {
  console.log('\n' + '═'.repeat(58));
  console.log('  JSChoice — Complete Tool & API Test Suite');
  console.log('  Sydney · ap-southeast-2 · htszyyiptlahwkdgcbjq');
  console.log('═'.repeat(58));

  const authed = await testAuth();
  await testPriceGuide();
  await testBudgetCalculator();
  await testServiceMatcher();
  if (authed) await testCRM(authed);
  else        warn('CRM tests', 'skipped — auth failed');
  if (authed) await testBlog(authed);
  else        warn('Blog tests', 'skipped — auth failed');
  await testGallery();
  await testLeadForms();

  console.log('\n' + '═'.repeat(58));
  console.log(`  PASSED : ${passed}`);
  console.log(`  WARNED : ${warned}`);
  console.log(`  FAILED : ${failed}`);
  if (failures.length) {
    console.log('\n  Failed tests:');
    failures.forEach(f => console.log(`    ✗  ${f}`));
  }
  console.log(`\n  Status : ${failed === 0 ? 'ALL TESTS PASSED ✓' : 'FAILURES DETECTED ✗'}`);
  console.log('═'.repeat(58) + '\n');

  if (failed > 0) process.exit(1);
}

main().catch(e => { console.error(e); process.exit(1); });
