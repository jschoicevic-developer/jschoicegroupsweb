-- Add indexes for efficient NDIS support item search
-- These indexes dramatically improve search performance for the Budget Calculator

-- 1. Enable trigram extension for fuzzy/pattern text search
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- 2. Trigram index on support_item_name for keyword search
-- Allows fast ILIKE searches like: %gardening%, %self%care%
CREATE INDEX IF NOT EXISTS idx_support_items_name_trgm
ON ndis_support_items USING GIN (support_item_name gin_trgm_ops);

-- 3. Pattern matching index on support_item_number for item number prefix search
-- Allows fast searches like: 01_002%, 01_002_0107_1_1%
CREATE INDEX IF NOT EXISTS idx_support_items_number_pattern
ON ndis_support_items (support_item_number varchar_pattern_ops);

-- 4. B-tree index on category number for filtering
CREATE INDEX IF NOT EXISTS idx_support_items_category
ON ndis_support_items (support_category_number);

-- 5. Index on support_item_name for ordering results
CREATE INDEX IF NOT EXISTS idx_support_items_name_btree
ON ndis_support_items (support_item_name);

-- Verify indexes were created
SELECT
  schemaname,
  tablename,
  indexname,
  indexdef
FROM pg_indexes
WHERE tablename = 'ndis_support_items'
ORDER BY indexname;
