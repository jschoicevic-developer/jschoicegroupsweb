#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Generate SQL INSERT statements from Excel file for manual import
"""

import pandas as pd
import json

# Local file path
EXCEL_FILE = "d:/Projetcs/JS-Choice-Group/jschoice-website/scripts/NDIS-Support Catalogue-2025-26 -v1.1 (5).xlsx"

print("=" * 60)
print("Generate SQL for NDIS Import")
print("=" * 60)

# Parse Excel
print(f"\n[PARSE] Reading: {EXCEL_FILE}")
df = pd.read_excel(EXCEL_FILE, sheet_name=0)
print(f"[SUCCESS] Loaded {len(df)} rows")

# Helper functions
def find_column(df, possible_names):
    for name in possible_names:
        for col in df.columns:
            if name.lower() in col.lower():
                return col
    return None

def safe_str(value):
    if pd.isna(value):
        return None
    s = str(value).strip().replace("'", "''")  # Escape single quotes
    return s if s else None

def safe_int(value):
    if pd.isna(value):
        return None
    try:
        return int(float(value))
    except:
        return None

def safe_float(value):
    if pd.isna(value):
        return None
    try:
        return float(value)
    except:
        return None

def safe_bool(value):
    if pd.isna(value):
        return False
    return str(value).upper() in ('Y', 'YES', 'TRUE', '1')

# Map columns
col_item_number = find_column(df, ['Support Item Number'])
col_item_name = find_column(df, ['Support Item Name'])
col_reg_group_num = find_column(df, ['Registration Group Number'])
col_reg_group_name = find_column(df, ['Registration Group Name'])
col_cat_num = find_column(df, ['Support Category Number'])
col_cat_name = find_column(df, ['Support Category Name'])
col_unit = find_column(df, ['Unit'])
col_quote = find_column(df, ['Quote'])

# Transform to JSON for MCP import
print("\n[TRANSFORM] Converting to records...")
records = []
for idx, row in df.iterrows():
    item_number = row.get(col_item_number)
    if pd.isna(item_number) or not str(item_number).strip():
        continue
    
    cat_num = safe_int(row.get(col_cat_num)) or 0
    
    # Determine support purpose
    if cat_num in [1, 2, 3, 4]:
        support_purpose = 'Core'
    elif cat_num in [5, 6]:
        support_purpose = 'Capital'
    elif cat_num in [7, 8, 9, 10, 11, 12, 13, 14, 15]:
        support_purpose = 'Capacity Building'
    else:
        support_purpose = 'Core'
    
    record = {
        'support_item_number': str(item_number).strip(),
        'support_item_name': safe_str(row.get(col_item_name)) or '',
        'registration_group_number': safe_int(row.get(col_reg_group_num)),
        'registration_group_name': safe_str(row.get(col_reg_group_name)),
        'support_category_number': cat_num,
        'support_category_name': safe_str(row.get(col_cat_name)) or '',
        'unit': safe_str(row.get(col_unit)) or 'H',
        'quote_required': safe_bool(row.get(col_quote)),
        'support_purpose': support_purpose,
    }
    
    records.append(record)

print(f"[SUCCESS] Prepared {len(records)} records")

# Save to JSON file
output_file = "d:/Projetcs/JS-Choice-Group/jschoice-website/scripts/ndis_records.json"
with open(output_file, 'w', encoding='utf-8') as f:
    json.dump(records, f, indent=2, ensure_ascii=False)

print(f"\n[SAVED] Records saved to: {output_file}")
print(f"Total records: {len(records)}")
