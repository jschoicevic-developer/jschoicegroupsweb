#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Simple diagnostic script to test NDIS Excel file parsing
"""

import pandas as pd
import requests
from io import BytesIO

# NDIS Catalogue URLs (try multiple)
NDIS_CATALOGUE_URLS = [
    "https://www.ndis.gov.au/media/8038/download",
    "https://www.ndis.gov.au/media/6553/download",
    "https://www.ndis.gov.au/media/6356/download",
]

# Browser headers to avoid 403
HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.9',
    'Accept-Encoding': 'gzip, deflate, br',
    'Connection': 'keep-alive',
    'Upgrade-Insecure-Requests': '1',
    'Sec-Fetch-Dest': 'document',
    'Sec-Fetch-Mode': 'navigate',
    'Sec-Fetch-Site': 'none',
    'Sec-Fetch-User': '?1',
}

print("=" * 60)
print("NDIS Excel Parsing Diagnostic")
print("=" * 60)

# Try downloading from multiple URLs
xlsx_data = None
for url in NDIS_CATALOGUE_URLS:
    print(f"\n[DOWNLOAD] Trying: {url}")
    try:
        session = requests.Session()
        # Visit main page first to get cookies
        try:
            session.get("https://www.ndis.gov.au", headers=HEADERS, timeout=10)
        except:
            pass
        
        response = session.get(url, headers=HEADERS, timeout=60, allow_redirects=True)
        response.raise_for_status()
        
        # Check if we got actual file (not HTML error page)
        content_type = response.headers.get('Content-Type', '')
        if 'html' in content_type.lower() and len(response.content) < 100000:
            print(f"[SKIP] Received HTML instead of Excel file")
            continue
            
        xlsx_data = response.content
        print(f"[SUCCESS] Downloaded {len(xlsx_data) / 1024:.1f} KB")
        break
    except Exception as e:
        print(f"[ERROR] Failed: {e}")

if not xlsx_data:
    print("\n[FATAL] Could not download from any URL!")
    print("Please manually download the file from:")
    print("https://www.ndis.gov.au/providers/pricing-arrangements")
    exit(1)

# Parse Excel
print("\n[PARSE] Parsing Excel file...")
try:
    df = pd.read_excel(BytesIO(xlsx_data), sheet_name=0)
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

