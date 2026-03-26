"""
Script to print SQL commands for manual execution in Supabase SQL Editor
Since MCP has character limits, we'll provide instructions for manual import
"""

import glob

batch_files = sorted(glob.glob('scripts/batch_*.sql'))[1:]  # Skip batch_01 (already imported)

print("=" * 80)
print("NDIS DATA IMPORT - REMAINING BATCHES")
print("=" * 80)
print(f"\nTotal batches to import: {len(batch_files)}")
print(f"Total records: 113\n")

print("INSTRUCTIONS:")
print("1. Open Supabase SQL Editor:")
print("   https://supabase.com/dashboard/project/htszyyiptlahwkdgcbjq/sql/new")
print("\n2. Copy and paste each batch SQL below (one at a time)")
print("\n3. Click 'Run' after pasting each batch")
print("\n4. Verify completion after all batches:")
print("   SELECT COUNT(*) FROM ndis_support_items;")
print("   -- Should show 633 total\n")

print("=" * 80)

for i, batch_file in enumerate(batch_files, 2):
    with open(batch_file, 'r', encoding='utf-8') as f:
        sql = f.read()
    
    record_count = sql.count("),(") + 1
    
    print(f"\n{'='*80}")
    print(f"BATCH {i} - {record_count} RECORDS")
    print(f"File: {batch_file}")
    print(f"{'='*80}\n")
    print(sql)
    print()

print("=" * 80)
print("IMPORT COMPLETE!")
print("After running all batches, verify with:")
print("SELECT support_category_number, COUNT(*) FROM ndis_support_items")
print("GROUP BY support_category_number ORDER BY support_category_number;")
print("=" * 80)
