-- ============================================================================
-- CLEAR NDIS DATABASE - Run this in Supabase SQL Editor
-- ============================================================================
--
-- ⚠️ WARNING: This will delete ALL NDIS price data from your database
-- Run this before re-importing with the fixed edge function
--
-- ============================================================================

-- Step 1: Count existing records (for verification)
SELECT
  'BEFORE DELETE' as stage,
  COUNT(*) as total_records,
  COUNT(DISTINCT support_category_number) as categories_present,
  MIN(created_at) as oldest_record,
  MAX(updated_at) as last_updated
FROM ndis_support_items;

-- Step 2: Show category breakdown (to see what's missing)
SELECT
  support_category_number,
  COUNT(*) as count,
  MIN(support_category_name) as category_name
FROM ndis_support_items
GROUP BY support_category_number
ORDER BY support_category_number;

-- Step 3: DELETE ALL RECORDS
-- Uncomment the line below when you're ready to delete:
-- DELETE FROM ndis_support_items;

-- Step 4: Verify deletion
-- SELECT
--   'AFTER DELETE' as stage,
--   COUNT(*) as total_records
-- FROM ndis_support_items;
-- Expected: 0

-- ============================================================================
-- NOTES:
-- ============================================================================
-- After running this, trigger the re-import using one of these methods:
--
-- Method 1: Edge Function (Recommended - after deploying fix)
--   curl -X POST https://YOUR_PROJECT.supabase.co/functions/v1/ndis-price-updater \
--     -H "Authorization: Bearer YOUR_ANON_KEY" \
--     -H "Content-Type: application/json" \
--     -d '{"force": true}'
--
-- Method 2: Python Script (Reliable fallback)
--   cd scripts && python3 github_price_updater.py
--
-- Method 3: SQL Batches (Manual but guaranteed)
--   Run scripts/full_batch_01.sql through full_batch_13.sql sequentially
--
-- ============================================================================
