#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Diagnostic script to analyze locally downloaded NDIS Excel file
"""

import pandas as pd
import os

# Local file path
EXCEL_FILE = "d:/Projetcs/JS-Choice-Group/jschoice-website/scripts/NDIS-Support Catalogue-2025-26 -v1.1 (5).xlsx"

print("=" * 60)
print("NDIS Excel Parsing Diagnostic (Local File)")
print("=" * 60)

# Check if file exists
if not os.path.exists(EXCEL_FILE):
    print(f"\n[ERROR] File not found: {EXCEL_FILE}")
    print("\nPlease download the NDIS Support Catalogue from:")
    print("https://www.ndis.gov.au/providers/pricing-arrangements")
    print(f"\nAnd save it as: {EXCEL_FILE}")
    exit(1)

# Parse Excel
print(f"\n[PARSE] Parsing: {EXCEL_FILE}")
try:
    df = pd.read_excel(EXCEL_FILE, sheet_name=0)
    print(f"[SUCCESS] Total rows in Excel: {len(df)}")
    print(f"   Columns: {list(df.columns)[:5]}...")
except Exception as e:
    print(f"[ERROR] Parsing failed: {e}")
    exit(1)

# Find item number column
def find_column(df, possible_names):
    for name in possible_names:
        for col in df.columns:
            if name.lower() in col.lower():
                return col
    return None

col_item_number = find_column(df, ['Support Item Number', 'Item Number'])
col_cat_num = find_column(df, ['Support Category Number', 'Category Number'])

if not col_item_number:
    print("[ERROR] Could not find 'Support Item Number' column!")
    print(f"   Available columns: {list(df.columns)}")
    exit(1)

print(f"\n[COLUMNS] Found columns:")
print(f"   Item Number: {col_item_number}")
print(f"   Category Number: {col_cat_num}")

# Count valid vs empty rows
valid_count = 0
empty_count = 0
category_counts = {}

for idx, row in df.iterrows():
    item_number = row.get(col_item_number)
    
    if pd.isna(item_number) or not str(item_number).strip():
        empty_count += 1
    else:
        valid_count += 1
        
        # Count by category
        if col_cat_num:
            cat_num = row.get(col_cat_num)
            if pd.notna(cat_num):
                try:
                    cat_num = int(float(cat_num))
                    category_counts[cat_num] = category_counts.get(cat_num, 0) + 1
                except:
                    pass

print(f"\n[ANALYSIS] Row Analysis:")
print(f"   Total rows: {len(df)}")
print(f"   Valid items (with item number): {valid_count}")
print(f"   Empty/skipped rows: {empty_count}")
print(f"   Difference: {len(df) - valid_count}")

print(f"\n[CATEGORIES] Items by Category:")
for cat_num in sorted(category_counts.keys()):
    print(f"   Category {cat_num}: {category_counts[cat_num]} items")

print(f"\n[RESULT] Total valid items that would be imported: {valid_count}")
print(f"   Database currently has: 500 items")
print(f"   Missing from database: {valid_count - 500}")

# Check for Category 20 specifically
if 20 in category_counts:
    print(f"\n[CATEGORY 20] Behaviour Support: {category_counts[20]} items found")
else:
    print(f"\n[CATEGORY 20] Behaviour Support: NOT FOUND in Excel file")
