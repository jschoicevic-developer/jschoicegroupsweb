#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Import NDIS data from local Excel file to Supabase
"""

import pandas as pd
import os
from supabase import create_client

# Configuration
EXCEL_FILE = "d:/Projetcs/JS-Choice-Group/jschoice-website/scripts/NDIS-Support Catalogue-2025-26 -v1.1 (5).xlsx"
SUPABASE_URL = os.getenv("SUPABASE_URL", "https://htszyyiptlahwkdgcbjq.supabase.co")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_KEY")

if not SUPABASE_KEY:
    print("[ERROR] SUPABASE_SERVICE_KEY environment variable not set!")
    print("Please set it before running this script.")
    exit(1)

print("=" * 60)
print("NDIS Data Import")
print("=" * 60)

# Initialize Supabase
print("\n[INIT] Connecting to Supabase...")
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

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
    return str(value).strip()

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

# Price columns
price_cols = {}
for state in ['ACT', 'NSW', 'NT', 'QLD', 'SA', 'TAS', 'VIC', 'WA', 'Remote', 'Very Remote']:
    price_cols[f'price_{state.lower().replace(" ", "_")}'] = find_column(df, [state, f'Price Limit ({state})'])

# Boolean columns
bool_cols = {
    'non_face_to_face': find_column(df, ['Non-Face-to-Face', 'Non Face to Face']),
    'provider_travel': find_column(df, ['Provider Travel']),
    'short_notice_cancellations': find_column(df, ['Short Notice Cancellation']),
    'ndia_requested_reports': find_column(df, ['NDIA Requested Reports']),
    'irregular_sil_supports': find_column(df, ['Irregular SIL']),
}

# Transform to records
print("\n[TRANSFORM] Converting to database records...")
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
        'quote_required': safe_bool(row.get(col_quote)) if col_quote else False,
        'support_purpose': support_purpose,
    }
    
    # Add prices
    for db_col, xlsx_col in price_cols.items():
        record[db_col] = safe_float(row.get(xlsx_col)) if xlsx_col else None
    
    # Add booleans
    for db_col, xlsx_col in bool_cols.items():
        record[db_col] = safe_bool(row.get(xlsx_col)) if xlsx_col else False
    
    records.append(record)

print(f"[SUCCESS] Prepared {len(records)} records")

# Upsert to database
print("\n[UPLOAD] Upserting to Supabase...")
batch_size = 200
for i in range(0, len(records), batch_size):
    batch = records[i:i + batch_size]
    try:
        supabase.table('ndis_support_items').upsert(batch, on_conflict='support_item_number').execute()
        print(f"  [BATCH {i//batch_size + 1}] Upserted {len(batch)} items")
    except Exception as e:
        print(f"  [ERROR] Batch failed: {e}")

print("\n[COMPLETE] Import finished!")
print(f"Total records processed: {len(records)}")
