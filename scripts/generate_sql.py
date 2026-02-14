import json

# Load missing records
with open('scripts/missing_records.json', 'r', encoding='utf-8') as f:
    records = json.load(f)

print(f"Generating SQL for {len(records)} records...")

# Generate SQL INSERT statements
sql_parts = []
for record in records:
    # Escape single quotes in strings
    def escape(val):
        if val is None:
            return 'NULL'
        elif isinstance(val, bool):
            return 'TRUE' if val else 'FALSE'
        elif isinstance(val, (int, float)):
            return str(val)
        else:
            return f"'{str(val).replace(chr(39), chr(39)+chr(39))}'"  # Escape quotes
    
    values = f"""(
        {escape(record['support_item_number'])},
        {escape(record['support_item_name'])},
        {escape(record.get('registration_group_number'))},
        {escape(record.get('registration_group_name'))},
        {escape(record['support_category_number'])},
        {escape(record['support_category_name'])},
        {escape(record['unit'])},
        {escape(record['quote_required'])},
        {escape(record['support_purpose'])},
        NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
        FALSE, FALSE, FALSE, FALSE, FALSE
    )"""
    sql_parts.append(values)

# Create full SQL
sql = f"""-- Import missing NDIS records (categories 9-15)
-- Generated from NDIS Support Catalogue 2025-26 v1.1

INSERT INTO ndis_support_items (
    support_item_number,
    support_item_name,
    registration_group_number,
    registration_group_name,
    support_category_number,
    support_category_name,
    unit,
    quote_required,
    support_purpose,
    price_act, price_nsw, price_nt, price_qld, price_sa, price_tas, price_vic, price_wa, price_remote, price_very_remote,
    non_face_to_face, provider_travel, short_notice_cancellations, ndia_requested_reports, irregular_sil_supports
)
VALUES
{','.join(sql_parts)}
ON CONFLICT (support_item_number) DO UPDATE SET
    support_item_name = EXCLUDED.support_item_name,
    registration_group_number = EXCLUDED.registration_group_number,
    registration_group_name = EXCLUDED.registration_group_name,
    support_category_number = EXCLUDED.support_category_number,
    support_category_name = EXCLUDED.support_category_name,
    unit = EXCLUDED.unit,
    quote_required = EXCLUDED.quote_required,
    support_purpose = EXCLUDED.support_purpose;
"""

# Save SQL file
with open('scripts/import_missing.sql', 'w', encoding='utf-8') as f:
    f.write(sql)

print(f"SQL saved to: scripts/import_missing.sql")
print(f"Total INSERT statements: {len(records)}")
