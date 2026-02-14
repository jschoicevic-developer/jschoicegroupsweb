-- ============================================================================
-- Verify NDIS Category Counts vs Competitor
-- ============================================================================

-- 1. Check total records
SELECT 'Total Records' as check_type, COUNT(*) as count
FROM ndis_support_items;
-- Expected: 631

-- 2. Check for duplicates (should be 0)
SELECT 'Duplicate Check' as check_type, COUNT(*) - COUNT(DISTINCT support_item_number) as duplicates
FROM ndis_support_items;
-- Expected: 0

-- 3. Category 1 count (THE PROBLEM)
SELECT 'Category 1' as category, COUNT(*) as count
FROM ndis_support_items
WHERE support_category_number = 1;
-- Expected: 116 (from competitor)
-- Your system: 142 (26 extra records!)

-- 4. All category counts
SELECT
  support_category_number as category,
  support_category_name,
  COUNT(*) as count
FROM ndis_support_items
GROUP BY support_category_number, support_category_name
ORDER BY support_category_number;

-- 5. Find potential duplicate support item numbers
SELECT
  support_item_number,
  COUNT(*) as count
FROM ndis_support_items
GROUP BY support_item_number
HAVING COUNT(*) > 1;
-- Should return 0 rows

-- 6. List Category 1 items to compare with competitor
SELECT
  support_item_number,
  support_item_name,
  registration_group_name
FROM ndis_support_items
WHERE support_category_number = 1
ORDER BY support_item_number;

-- ============================================================================
-- COMPETITOR COUNTS (from their website):
-- ============================================================================
-- Category 1: 116 items
-- Category 5: 192 items
-- Category 6: 29 items
-- Category 9-15: ~133 items
-- Total: 631 items
-- ============================================================================
