import glob
import os

# Find all batch SQL files
batch_files = sorted(glob.glob('scripts/batch_*.sql'))

print(f"Found {len(batch_files)} batch files")
print("\nTo import all batches, run these commands in the Supabase SQL Editor:")
print("=" * 60)

for i, batch_file in enumerate(batch_files, 1):
    with open(batch_file, 'r', encoding='utf-8') as f:
        sql = f.read()
    
    # Count records in this batch
    record_count = sql.count("),(") + 1
    
    print(f"\n-- Batch {i} ({record_count} records)")
    print(f"-- File: {os.path.basename(batch_file)}")
    print(sql)
    print()

print("=" * 60)
print(f"\nTotal batches: {len(batch_files)}")
print("After running all batches, verify with:")
print("SELECT COUNT(*) FROM ndis_support_items;")
print("-- Should be 633 total (500 existing + 133 new)")
