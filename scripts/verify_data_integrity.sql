-- ============================================================================
-- NDIS Data Integrity Verification Script
-- ============================================================================
-- Run this in Supabase SQL Editor after any import to verify data integrity
-- ============================================================================

-- 1. OVERALL COUNT CHECK
-- ============================================================================
SELECT
  '📊 TOTAL COUNT' as check_name,
  COUNT(*) as actual,
  635 as expected,
  CASE
    WHEN COUNT(*) = 635 THEN '✅ PASS'
    WHEN COUNT(*) < 635 THEN '❌ FAIL - Missing ' || (635 - COUNT(*)) || ' records'
    ELSE '⚠️ WARNING - Extra ' || (COUNT(*) - 635) || ' records'
  END as status
FROM ndis_support_items;

-- 2. CATEGORY COMPLETENESS CHECK
-- ============================================================================
SELECT
  '📋 CATEGORY COUNT' as check_name,
  COUNT(DISTINCT support_category_number) as actual,
  21 as expected,
  CASE
    WHEN COUNT(DISTINCT support_category_number) = 21 THEN '✅ PASS'
    ELSE '❌ FAIL - Only ' || COUNT(DISTINCT support_category_number) || ' categories'
  END as status
FROM ndis_support_items;

-- 3. MISSING CATEGORIES CHECK (9-15 were the problematic ones)
-- ============================================================================
SELECT
  '🔍 CATEGORIES 9-15' as check_name,
  COUNT(DISTINCT support_category_number) as actual,
  7 as expected,
  CASE
    WHEN COUNT(DISTINCT support_category_number) = 7 THEN '✅ PASS'
    ELSE '❌ FAIL - Missing ' || (7 - COUNT(DISTINCT support_category_number)) || ' categories'
  END as status
FROM ndis_support_items
WHERE support_category_number BETWEEN 9 AND 15;

-- 4. NULL VALUE CHECK
-- ============================================================================
SELECT
  '⚠️ NULL VALUES' as check_name,
  COUNT(*) FILTER (WHERE support_item_number IS NULL) as null_item_numbers,
  COUNT(*) FILTER (WHERE support_item_name IS NULL) as null_item_names,
  COUNT(*) FILTER (WHERE support_category_number IS NULL) as null_categories,
  CASE
    WHEN COUNT(*) FILTER (WHERE support_item_number IS NULL OR support_item_name IS NULL OR support_category_number IS NULL) = 0
    THEN '✅ PASS'
    ELSE '❌ FAIL - Found NULL values'
  END as status
FROM ndis_support_items;

-- 5. DETAILED CATEGORY BREAKDOWN
-- ============================================================================
SELECT
  'CATEGORY ' || support_category_number as category,
  MIN(support_category_name) as category_name,
  COUNT(*) as record_count,
  CASE
    WHEN support_category_number BETWEEN 1 AND 4 THEN 'Core'
    WHEN support_category_number BETWEEN 5 AND 6 THEN 'Capital'
    WHEN support_category_number BETWEEN 7 AND 15 THEN 'Capacity Building'
    ELSE 'Other'
  END as purpose
FROM ndis_support_items
GROUP BY support_category_number
ORDER BY support_category_number;

-- 6. FRESHNESS CHECK
-- ============================================================================
SELECT
  '⏰ DATA FRESHNESS' as check_name,
  MAX(updated_at) as last_updated,
  EXTRACT(DAY FROM NOW() - MAX(updated_at)) as days_old,
  CASE
    WHEN MAX(updated_at) > NOW() - INTERVAL '7 days' THEN '✅ FRESH (< 7 days)'
    WHEN MAX(updated_at) > NOW() - INTERVAL '14 days' THEN '⚠️ AGING (7-14 days)'
    ELSE '❌ STALE (> 14 days)'
  END as status
FROM ndis_support_items;

-- 7. REGISTRATION GROUPS CHECK
-- ============================================================================
SELECT
  '👥 REGISTRATION GROUPS' as check_name,
  COUNT(DISTINCT registration_group_number) as unique_groups,
  CASE
    WHEN COUNT(DISTINCT registration_group_number) >= 15 THEN '✅ PASS'
    ELSE '⚠️ WARNING - Only ' || COUNT(DISTINCT registration_group_number) || ' groups'
  END as status
FROM ndis_support_items
WHERE registration_group_number IS NOT NULL;

-- 8. PRICE DATA CHECK
-- ============================================================================
SELECT
  '💰 PRICE DATA' as check_name,
  COUNT(*) FILTER (WHERE price_nsw IS NOT NULL OR price_vic IS NOT NULL OR price_qld IS NOT NULL) as records_with_prices,
  COUNT(*) as total_records,
  ROUND(100.0 * COUNT(*) FILTER (WHERE price_nsw IS NOT NULL OR price_vic IS NOT NULL OR price_qld IS NOT NULL) / COUNT(*), 2) as percentage,
  CASE
    WHEN COUNT(*) FILTER (WHERE price_nsw IS NOT NULL OR price_vic IS NOT NULL OR price_qld IS NOT NULL) > 600 THEN '✅ PASS'
    ELSE '❌ FAIL - Not enough price data'
  END as status
FROM ndis_support_items;

-- 9. RECENT UPDATE LOG CHECK
-- ============================================================================
SELECT
  '📝 LAST UPDATE LOG' as check_name,
  update_date,
  total_items,
  items_added,
  items_removed,
  status,
  CASE
    WHEN status = 'success' AND total_items = 635 THEN '✅ PASS'
    WHEN status = 'success' AND total_items != 635 THEN '⚠️ WARNING - Count mismatch'
    ELSE '❌ FAIL - Import failed'
  END as verification_status
FROM ndis_price_update_logs
ORDER BY update_date DESC
LIMIT 1;

-- 10. DUPLICATE CHECK
-- ============================================================================
SELECT
  '🔍 DUPLICATE CHECK' as check_name,
  COUNT(*) as total_records,
  COUNT(DISTINCT support_item_number) as unique_item_numbers,
  COUNT(*) - COUNT(DISTINCT support_item_number) as duplicates,
  CASE
    WHEN COUNT(*) = COUNT(DISTINCT support_item_number) THEN '✅ PASS - No duplicates'
    ELSE '❌ FAIL - Found ' || (COUNT(*) - COUNT(DISTINCT support_item_number)) || ' duplicates'
  END as status
FROM ndis_support_items;

-- ============================================================================
-- FINAL SUMMARY
-- ============================================================================
SELECT
  '🎯 OVERALL STATUS' as check_name,
  CASE
    WHEN (
      SELECT COUNT(*) FROM ndis_support_items
    ) = 635
    AND (
      SELECT COUNT(DISTINCT support_category_number) FROM ndis_support_items
    ) = 21
    AND (
      SELECT COUNT(*) FROM ndis_support_items
      WHERE support_item_number IS NULL OR support_item_name IS NULL OR support_category_number IS NULL
    ) = 0
    THEN '✅ ALL CHECKS PASSED - Data integrity verified!'
    ELSE '❌ ISSUES DETECTED - Review checks above'
  END as status,
  (SELECT COUNT(*) FROM ndis_support_items) as current_record_count,
  635 as expected_record_count;

-- ============================================================================
-- EXPECTED RESULTS FOR PASSING ALL CHECKS:
-- ============================================================================
-- ✅ Total Count: 635 records
-- ✅ Categories: 21 unique categories (1-21)
-- ✅ Categories 9-15: All 7 categories present with 133 total records
-- ✅ No NULL values in required fields
-- ✅ Data updated within last 7 days
-- ✅ ~18 registration groups
-- ✅ >600 records with price data
-- ✅ Recent update log shows success with 635 items
-- ✅ No duplicate support_item_numbers
-- ✅ Overall status: PASS
-- ============================================================================
