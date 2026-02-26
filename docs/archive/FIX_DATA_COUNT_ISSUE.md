# Fix NDIS Data Count Mismatch Issue

**Date**: 2026-02-04
**Issue**: Category 1 shows 142 items instead of 116 items (26 extra records)
**Impact**: ALL category counts are likely wrong

---

## 🔴 Critical Issues Found

### Issue 1: Display Text ✅ FIXED
**Problem**: "View 142 results of 142 NDIS Support items"
**Should be**: "View 142 results of 631 NDIS Support items"
**Status**: ✅ Fixed in code

### Issue 2: Wrong Data Counts ❌ NEEDS ACTION
**Problem**: Your database has different counts than the official NDIS data

| Category | Competitor (Correct) | Your System (Wrong) | Difference |
|----------|---------------------|---------------------|------------|
| Category 1 | 116 items | 142 items | +26 ❌ |
| Total | 631 items | ??? | ??? |

---

## 🔍 Root Cause Analysis

The count mismatch could be due to:

1. **Duplicate Records** - Items imported multiple times
2. **Wrong Data Source** - Different NDIS catalogue version
3. **Import Error** - Recent edge function update caused double import
4. **Database Corruption** - Old + new data mixed together

---

## 🚀 SOLUTION: Clean Re-Import

Follow these steps to fix the data:

### Step 1: Verify the Problem

Run this SQL in Supabase SQL Editor:

```sql
-- Check total records
SELECT COUNT(*) as total FROM ndis_support_items;
-- Should be: 631

-- Check Category 1 count
SELECT COUNT(*) FROM ndis_support_items WHERE support_category_number = 1;
-- Should be: 116 (but you have 142)

-- Check for duplicates
SELECT
  support_item_number,
  COUNT(*) as count
FROM ndis_support_items
GROUP BY support_item_number
HAVING COUNT(*) > 1;
-- Should return 0 rows (if duplicates found, that's the problem!)
```

**Or run the complete verification:**
```sql
-- See scripts/verify_category_counts.sql
```

---

### Step 2: Clean the Database

**Option A: Delete ALL data and re-import** (Recommended)

```sql
-- 1. Backup current count
SELECT COUNT(*) as current_count FROM ndis_support_items;

-- 2. Delete all records
DELETE FROM ndis_support_items;

-- 3. Verify deletion
SELECT COUNT(*) FROM ndis_support_items;
-- Should be: 0
```

**Option B: Remove only duplicates** (If duplicates found)

```sql
-- Remove duplicate records, keeping only the first occurrence
DELETE FROM ndis_support_items a
USING ndis_support_items b
WHERE a.id > b.id
AND a.support_item_number = b.support_item_number;
```

---

### Step 3: Re-Import Fresh Data

**Use Python script** (Most reliable):

```bash
cd scripts
python3 github_price_updater.py
```

This will:
- Download latest NDIS catalogue
- Import exactly 631 records
- Use batch size 200 (proven reliable)
- Verify count after import

---

### Step 4: Verify the Fix

Run this SQL:

```sql
-- 1. Total should be 631
SELECT COUNT(*) as total FROM ndis_support_items;

-- 2. Category 1 should be 116
SELECT COUNT(*) as cat1_count
FROM ndis_support_items
WHERE support_category_number = 1;

-- 3. All categories
SELECT
  support_category_number,
  COUNT(*) as count
FROM ndis_support_items
GROUP BY support_category_number
ORDER BY support_category_number;

-- 4. No duplicates
SELECT COUNT(*) - COUNT(DISTINCT support_item_number) as duplicates
FROM ndis_support_items;
-- Should be: 0
```

---

### Step 5: Test Frontend

1. Go to: https://jschoice-website.vercel.app/tools/ndis-price-guide
2. Select "1 Assistance with Daily Life"
3. Should now show: **"View 116 results from this category of 631 NDIS Support items"**
4. Compare with competitor - counts should match!

---

## 📊 Expected Correct Counts

Based on competitor website (official NDIS data):

```
Total: 631 items

Category 1 (Assistance with Daily Life): 116 items
Category 2 (Transport): ~15 items
Category 3 (Consumables): ~11 items
Category 5 (Assistive Technology): 192 items
Category 6 (Home Modifications): 29 items
Categories 9-15 (Capacity Building): 133 items
... (other categories)
```

---

## 🛡️ Prevention

To prevent this from happening again:

### 1. Add Duplicate Prevention

Update edge function to check for existing records:

```typescript
// Before upserting, check current count
const { count: beforeCount } = await supabase
  .from('ndis_support_items')
  .select('*', { count: 'exact', head: true })

// After upsert, verify count didn't increase incorrectly
const { count: afterCount } = await supabase
  .from('ndis_support_items')
  .select('*', { count: 'exact', head: true })

// Alert if unexpected count
if (afterCount > 631) {
  throw new Error(`Too many records: ${afterCount} > 631`)
}
```

### 2. Add Data Validation

```sql
-- Add unique constraint if not already present
ALTER TABLE ndis_support_items
ADD CONSTRAINT unique_support_item_number
UNIQUE (support_item_number);
```

### 3. Monitor Category Counts

Create a monitoring query:

```sql
-- Save this as a Supabase saved query
SELECT
  support_category_number,
  COUNT(*) as count,
  CASE
    WHEN support_category_number = 1 AND COUNT(*) != 116 THEN '❌ Wrong count!'
    WHEN support_category_number = 5 AND COUNT(*) != 192 THEN '❌ Wrong count!'
    WHEN support_category_number = 6 AND COUNT(*) != 29 THEN '❌ Wrong count!'
    ELSE '✅ OK'
  END as status
FROM ndis_support_items
GROUP BY support_category_number
ORDER BY support_category_number;
```

---

## 🔧 Quick Fix Commands

```bash
# 1. Stop dev server (Ctrl+C)

# 2. Clear cache
cd D:\Projetcs\JS-Choice-Group\jschoice-website
rmdir /s /q .next

# 3. Delete database data (run in Supabase SQL Editor)
# DELETE FROM ndis_support_items;

# 4. Re-import
cd scripts
python3 github_price_updater.py

# 5. Verify
# Run verify_category_counts.sql in Supabase SQL Editor

# 6. Restart dev server
npm run dev

# 7. Test frontend
# https://jschoice-website.vercel.app/tools/ndis-price-guide
```

---

## ✅ Success Criteria

After following these steps, you should have:

- ✅ Total: **631 records** (not more, not less)
- ✅ Category 1: **116 items** (matches competitor)
- ✅ No duplicates
- ✅ Display shows: "View X results from this category of **631** NDIS Support items"
- ✅ All category counts match competitor website

---

## 📞 If Issue Persists

If after re-import the counts still don't match:

1. **Check NDIS Source File**:
   - Download from: https://www.ndis.gov.au/media/8038/download
   - Open in Excel
   - Count rows manually for Category 1
   - Compare with competitor and your database

2. **Check Competitor's Data Source**:
   - They might be using a different version
   - Check their "Last Updated" date
   - Compare catalogue version numbers

3. **Verify Database Schema**:
   ```sql
   \d ndis_support_items
   ```
   - Check for any filters or views that might affect counts

---

**Status**: Ready to fix - follow steps above
**Priority**: 🔴 HIGH - Data integrity issue
**Estimated Time**: 10 minutes
