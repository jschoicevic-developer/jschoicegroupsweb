import json

# Load the JSON data
with open('scripts/ndis_records.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

print(f"Total records: {len(data)}")

# Count by category
from collections import Counter
cats = Counter([r['support_category_number'] for r in data])
print("\nRecords by category:")
for cat in sorted(cats.keys()):
    print(f"  Category {cat}: {cats[cat]} items")

# Find missing categories (9-15)
missing_cats = [r for r in data if r['support_category_number'] in [9,10,11,12,13,14,15]]
print(f"\nCategories 9-15 (missing from DB): {len(missing_cats)} items")

# Save just the missing ones
with open('scripts/missing_records.json', 'w', encoding='utf-8') as f:
    json.dump(missing_cats, f, indent=2, ensure_ascii=False)

print(f"Saved {len(missing_cats)} missing records to scripts/missing_records.json")
