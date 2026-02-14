#!/usr/bin/env node
/**
 * Quick script to check NDIS support items count in Supabase
 * Run with: node scripts/check_ndis_count.js
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

async function checkNdisCount() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Missing Supabase environment variables');
    console.error('Required: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY');
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  console.log('📊 Checking NDIS Support Items...\n');

  // Total count
  const { count: totalCount, error: countError } = await supabase
    .from('ndis_support_items')
    .select('*', { count: 'exact', head: true });

  if (countError) {
    console.error('❌ Error fetching count:', countError.message);
    process.exit(1);
  }

  // Category count
  const { data: categories, error: catError } = await supabase
    .from('ndis_support_items')
    .select('support_category_number')
    .not('support_category_number', 'is', null);

  const uniqueCategories = categories
    ? new Set(categories.map(c => c.support_category_number)).size
    : 0;

  // Display results
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📊 TOTAL RECORDS');
  console.log(`   Actual: ${totalCount}`);
  console.log(`   Expected: 635`);
  console.log(`   Status: ${totalCount === 635 ? '✅ PASS' : '❌ FAIL'}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📋 CATEGORIES');
  console.log(`   Unique Categories: ${uniqueCategories}`);
  console.log(`   Expected: 21`);
  console.log(`   Status: ${uniqueCategories === 21 ? '✅ PASS' : '❌ FAIL'}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  if (totalCount !== 635) {
    console.log(`⚠️  Missing ${635 - totalCount} records!`);
    console.log('   Run: npm run verify-ndis-data\n');
  }

  process.exit(totalCount === 635 && uniqueCategories === 21 ? 0 : 1);
}

checkNdisCount().catch(error => {
  console.error('❌ Unexpected error:', error);
  process.exit(1);
});
