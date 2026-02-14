import json

# Load missing records
with open('scripts/missing_records.json', 'r', encoding='utf-8') as f:
    records = json.load(f)

print(f"Splitting {len(records)} records into batches...")

# Split into batches of 20
batch_size = 20
batches = [records[i:i + batch_size] for i in range(0, len(records), batch_size)]

print(f"Created {len(batches)} batches")

# Generate SQL for each batch
for batch_num, batch in enumerate(batches, 1):
    sql_parts = []
    for record in batch:
        def escape(val):
            if val is None:
                return 'NULL'
            elif isinstance(val, bool):
                return 'TRUE' if val else 'FALSE'
            elif isinstance(val, (int, float)):
                return str(val)
            else:
                return f"'{str(val).replace(chr(39), chr(39)+chr(39))}'"
        
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
    
    sql = f"""INSERT INTO ndis_support_items (
        support_item_number, support_item_name, registration_group_number, registration_group_name,
        support_category_number, support_category_name, unit, quote_required, support_purpose,
        price_act, price_nsw, price_nt, price_qld, price_sa, price_tas, price_vic, price_wa, price_remote, price_very_remote,
        non_face_to_face, provider_travel, short_notice_cancellations, ndia_requested_reports, irregular_sil_supports
    )
    VALUES
    {','.join(sql_parts)}
    ON CONFLICT (support_item_number) DO UPDATE SET
        support_item_name = EXCLUDED.support_item_name,
        support_category_number = EXCLUDED.support_category_number,
        support_purpose = EXCLUDED.support_purpose;"""
    
    filename = f'scripts/batch_{batch_num:02d}.sql'
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(sql)
    
    print(f"  Batch {batch_num}: {len(batch)} records -> {filename}")

print(f"\nDone! Created {len(batches)} SQL batch files")
