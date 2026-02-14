import glob

# Get all batch files except batch 1 (already imported)
batch_files = sorted(glob.glob('scripts/batch_*.sql'))[1:]  # Skip batch_01

print(f"Found {len(batch_files)} remaining batches to import\n")

for batch_file in batch_files:
    with open(batch_file, 'r', encoding='utf-8') as f:
        sql = f.read()
    
    # Count records
    record_count = sql.count("),(") + 1
    
    print(f"Batch: {batch_file}")
    print(f"Records: {record_count}")
    print(f"SQL Length: {len(sql)} characters")
    print("-" * 60)

print(f"\nTotal batches to import: {len(batch_files)}")
print(f"Total records remaining: {sum([int(open(f, 'r').read().count('),(') + 1) for f in batch_files])}")
