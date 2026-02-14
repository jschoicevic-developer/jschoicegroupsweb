#!/usr/bin/env python3
"""
NDIS Price Guide Updater for GitHub Actions + Supabase
======================================================

FIXED VERSION - With proper headers to avoid 403 Forbidden errors

For JS Choice Group
"""

import os
import sys
import json
import hashlib
import requests
import pandas as pd
from datetime import datetime
from typing import Optional, Dict, Any, List, Tuple
from io import BytesIO

# Supabase Python client
from supabase import create_client, Client

# ============================================================================
# CONFIGURATION
# ============================================================================

# NDIS Source URLs
NDIS_PRICING_PAGE = "https://www.ndis.gov.au/providers/pricing-arrangements"

# Direct download URLs (update these when NDIS releases new versions)
# Check https://www.ndis.gov.au/providers/pricing-arrangements for latest
# Last updated: February 2026 - NDIS Support Catalogue 2025-26 v1.1
NDIS_CATALOGUE_URLS = [
    "https://www.ndis.gov.au/media/8038/download",  # Current: v1.1 effective 24 Nov 2025
    "https://www.ndis.gov.au/media/6553/download",  # Backup URL
    "https://www.ndis.gov.au/media/6356/download",  # Older backup
]

# Browser-like headers to avoid 403 errors
HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
    'Accept-Language': 'en-US,en;q=0.9',
    'Accept-Encoding': 'gzip, deflate, br',
    'Connection': 'keep-alive',
    'Upgrade-Insecure-Requests': '1',
    'Sec-Fetch-Dest': 'document',
    'Sec-Fetch-Mode': 'navigate',
    'Sec-Fetch-Site': 'none',
    'Sec-Fetch-User': '?1',
    'Cache-Control': 'max-age=0',
}

# Get from environment (GitHub Secrets)
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_KEY")
FORCE_UPDATE = os.getenv("FORCE_UPDATE", "false").lower() == "true"

# ============================================================================
# SUPABASE CLIENT
# ============================================================================

def get_supabase_client() -> Client:
    """Initialize Supabase client."""
    if not SUPABASE_URL or not SUPABASE_KEY:
        print("❌ ERROR: SUPABASE_URL and SUPABASE_SERVICE_KEY must be set")
        sys.exit(1)
    
    return create_client(SUPABASE_URL, SUPABASE_KEY)

# ============================================================================
# NDIS DATA FETCHING
# ============================================================================

def find_catalogue_url_from_page() -> Optional[str]:
    """Try to find the catalogue URL by scraping the NDIS page."""
    print("🔍 Searching for NDIS Support Catalogue URL from website...")
    
    try:
        session = requests.Session()
        response = session.get(NDIS_PRICING_PAGE, headers=HEADERS, timeout=30)
        response.raise_for_status()
        
        from bs4 import BeautifulSoup
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Look for download links containing "Support Catalogue" and ".xlsx"
        for link in soup.find_all('a', href=True):
            text = link.get_text().strip().lower()
            href = link.get('href', '')
            
            if 'support catalogue' in text and ('xlsx' in text or '/download' in href or '/media/' in href):
                full_url = href if href.startswith('http') else f"https://www.ndis.gov.au{href}"
                print(f"✅ Found catalogue URL: {full_url}")
                return full_url
        
        print("⚠️ Could not find Support Catalogue link on page")
        return None
        
    except requests.exceptions.HTTPError as e:
        print(f"⚠️ HTTP Error accessing NDIS page: {e}")
        return None
    except Exception as e:
        print(f"⚠️ Error fetching NDIS page: {e}")
        return None


def download_catalogue(url: str) -> Optional[bytes]:
    """Download the XLSX file and return as bytes."""
    print(f"📥 Downloading catalogue from: {url}")
    
    try:
        session = requests.Session()
        
        # First, visit the main page to get cookies (like a real browser would)
        try:
            session.get("https://www.ndis.gov.au", headers=HEADERS, timeout=10)
        except:
            pass  # It's okay if this fails
        
        # Now download the file
        response = session.get(url, headers=HEADERS, timeout=120, allow_redirects=True)
        response.raise_for_status()
        
        # Check if we got an actual file (not an HTML error page)
        content_type = response.headers.get('Content-Type', '')
        if 'html' in content_type.lower() and len(response.content) < 100000:
            print(f"⚠️ Received HTML instead of XLSX from {url}")
            return None
        
        print(f"✅ Downloaded {len(response.content) / 1024:.1f} KB")
        return response.content
        
    except requests.exceptions.HTTPError as e:
        print(f"⚠️ HTTP Error downloading from {url}: {e}")
        return None
    except Exception as e:
        print(f"⚠️ Error downloading from {url}: {e}")
        return None


def try_download_from_multiple_sources() -> Tuple[Optional[bytes], Optional[str]]:
    """Try downloading from multiple sources until one works."""
    
    # First, try to find the URL from the webpage
    scraped_url = find_catalogue_url_from_page()
    if scraped_url:
        data = download_catalogue(scraped_url)
        if data:
            return data, scraped_url
    
    # If that fails, try known URLs
    print("\n📋 Trying known download URLs...")
    for url in NDIS_CATALOGUE_URLS:
        print(f"\n  Trying: {url}")
        data = download_catalogue(url)
        if data:
            return data, url
    
    return None, None


def calculate_hash(data: bytes) -> str:
    """Calculate MD5 hash of data."""
    return hashlib.md5(data).hexdigest()

# ============================================================================
# DATA PROCESSING
# ============================================================================

def parse_catalogue(xlsx_data: bytes) -> pd.DataFrame:
    """Parse XLSX data into DataFrame."""
    print("📊 Parsing catalogue data...")
    
    try:
        df = pd.read_excel(BytesIO(xlsx_data), sheet_name=0)
        print(f"✅ Parsed {len(df)} rows")
        print(f"   Columns found: {list(df.columns)[:5]}...")
        return df
    except Exception as e:
        print(f"❌ Error parsing Excel file: {e}")
        raise


def transform_to_records(df: pd.DataFrame) -> List[Dict[str, Any]]:
    """Transform DataFrame to list of records for Supabase."""
    print("🔄 Transforming data...")
    
    records = []
    skipped_count = 0
    skipped_reasons = {}
    
    # Flexible column mapping - handles different NDIS file formats
    # The NDIS sometimes changes column names slightly
    
    def find_column(df, possible_names):
        """Find a column by trying multiple possible names."""
        for name in possible_names:
            for col in df.columns:
                if name.lower() in col.lower():
                    return col
        return None
    
    # Map columns
    col_item_number = find_column(df, ['Support Item Number', 'Item Number', 'Support_Item_Number'])
    col_item_name = find_column(df, ['Support Item Name', 'Item Name', 'Support_Item_Name'])
    col_reg_group_num = find_column(df, ['Registration Group Number', 'Reg Group Number'])
    col_reg_group_name = find_column(df, ['Registration Group Name', 'Reg Group Name'])
    col_cat_num = find_column(df, ['Support Category Number', 'Category Number'])
    col_cat_name = find_column(df, ['Support Category Name', 'Category Name'])
    col_unit = find_column(df, ['Unit'])
    col_quote = find_column(df, ['Quote'])
    
    # Price columns - try multiple patterns
    price_patterns = {
        'price_act': ['ACT', 'Price Limit (ACT)', 'PriceLimit_ACT'],
        'price_nsw': ['NSW', 'Price Limit (NSW)', 'PriceLimit_NSW'],
        'price_nt': ['NT', 'Price Limit (NT)', 'PriceLimit_NT'],
        'price_qld': ['QLD', 'Price Limit (QLD)', 'PriceLimit_QLD'],
        'price_sa': ['SA', 'Price Limit (SA)', 'PriceLimit_SA'],
        'price_tas': ['TAS', 'Price Limit (TAS)', 'PriceLimit_TAS'],
        'price_vic': ['VIC', 'Price Limit (VIC)', 'PriceLimit_VIC'],
        'price_wa': ['WA', 'Price Limit (WA)', 'PriceLimit_WA'],
        'price_remote': ['Remote', 'Price Limit (Remote)', 'PriceLimit_Remote'],
        'price_very_remote': ['Very Remote', 'Price Limit (Very Remote)', 'PriceLimit_VeryRemote'],
    }
    
    price_columns = {}
    for db_col, patterns in price_patterns.items():
        price_columns[db_col] = find_column(df, patterns)
    
    # Boolean columns
    bool_patterns = {
        'non_face_to_face': ['Non-Face-to-Face', 'Non Face to Face', 'NonF2F'],
        'provider_travel': ['Provider Travel', 'Travel'],
        'short_notice_cancellations': ['Short Notice Cancellation', 'Cancellation'],
        'ndia_requested_reports': ['NDIA Requested Reports', 'Reports'],
        'irregular_sil_supports': ['Irregular SIL', 'SIL'],
    }
    
    bool_columns = {}
    for db_col, patterns in bool_patterns.items():
        bool_columns[db_col] = find_column(df, patterns)
    
    print(f"   Found item number column: {col_item_number}")
    print(f"   Found item name column: {col_item_name}")
    
    if not col_item_number or not col_item_name:
        print("❌ Could not find required columns!")
        print(f"   Available columns: {list(df.columns)}")
        raise ValueError("Required columns not found in XLSX file")
    
    for idx, row in df.iterrows():
        item_number = row.get(col_item_number)
        
        # Skip empty rows
        if pd.isna(item_number) or not str(item_number).strip():
            skipped_count += 1
            reason = 'Empty item number'
            skipped_reasons[reason] = skipped_reasons.get(reason, 0) + 1
            continue
        
        try:
            record = {
                'support_item_number': str(item_number).strip(),
                'support_item_name': str(row.get(col_item_name, '')).strip() if pd.notna(row.get(col_item_name)) else '',
                'registration_group_number': safe_int(row.get(col_reg_group_num)) if col_reg_group_num else None,
                'registration_group_name': safe_str(row.get(col_reg_group_name)) if col_reg_group_name else None,
                'support_category_number': safe_int(row.get(col_cat_num)) or 0,
                'support_category_name': safe_str(row.get(col_cat_name)) if col_cat_name else '',
                'unit': safe_str(row.get(col_unit)) if col_unit else 'H',
                'quote_required': safe_bool(row.get(col_quote)) if col_quote else False,
            }
            
            # Add price columns
            for db_col, xlsx_col in price_columns.items():
                if xlsx_col:
                    record[db_col] = safe_float(row.get(xlsx_col))
                else:
                    record[db_col] = None
            
            # Add boolean columns
            for db_col, xlsx_col in bool_columns.items():
                if xlsx_col:
                    record[db_col] = safe_bool(row.get(xlsx_col))
                else:
                    record[db_col] = False
            
            
            # Add support purpose based on category number
            # Based on NDIS categorization:
            # Core: 1-4, 16, 18, 21
            # Capital: 5, 6, 17, 19
            # Capacity Building: 7-15, 20
            cat_num = record.get('support_category_number') or 0
            if cat_num in [1, 2, 3, 4, 16, 18, 21]:
                record['support_purpose'] = 'Core'
            elif cat_num in [5, 6, 17, 19]:
                record['support_purpose'] = 'Capital'
            elif cat_num in [7, 8, 9, 10, 11, 12, 13, 14, 15, 20]:
                record['support_purpose'] = 'Capacity Building'
            else:
                record['support_purpose'] = 'Core'  # Default to Core for unknown
            
            records.append(record)
        except Exception as e:
            skipped_count += 1
            reason = f'Error: {str(e)[:50]}'
            skipped_reasons[reason] = skipped_reasons.get(reason, 0) + 1
            print(f"  ⚠️ Error processing row {idx}: {e}")
    
    print(f"✅ Transformed {len(records)} valid records")
    if skipped_count > 0:
        print(f"⚠️ Skipped {skipped_count} rows:")
        for reason, count in skipped_reasons.items():
            print(f"   - {reason}: {count} rows")
    
    return records
    
    # Flexible column mapping - handles different NDIS file formats
    # The NDIS sometimes changes column names slightly
    
    def find_column(df, possible_names):
        """Find a column by trying multiple possible names."""
        for name in possible_names:
            for col in df.columns:
                if name.lower() in col.lower():
                    return col
        return None
    
    # Map columns
    col_item_number = find_column(df, ['Support Item Number', 'Item Number', 'Support_Item_Number'])
    col_item_name = find_column(df, ['Support Item Name', 'Item Name', 'Support_Item_Name'])
    col_reg_group_num = find_column(df, ['Registration Group Number', 'Reg Group Number'])
    col_reg_group_name = find_column(df, ['Registration Group Name', 'Reg Group Name'])
    col_cat_num = find_column(df, ['Support Category Number', 'Category Number'])
    col_cat_name = find_column(df, ['Support Category Name', 'Category Name'])
    col_unit = find_column(df, ['Unit'])
    col_quote = find_column(df, ['Quote'])
    
    # Price columns - try multiple patterns
    price_patterns = {
        'price_act': ['ACT', 'Price Limit (ACT)', 'PriceLimit_ACT'],
        'price_nsw': ['NSW', 'Price Limit (NSW)', 'PriceLimit_NSW'],
        'price_nt': ['NT', 'Price Limit (NT)', 'PriceLimit_NT'],
        'price_qld': ['QLD', 'Price Limit (QLD)', 'PriceLimit_QLD'],
        'price_sa': ['SA', 'Price Limit (SA)', 'PriceLimit_SA'],
        'price_tas': ['TAS', 'Price Limit (TAS)', 'PriceLimit_TAS'],
        'price_vic': ['VIC', 'Price Limit (VIC)', 'PriceLimit_VIC'],
        'price_wa': ['WA', 'Price Limit (WA)', 'PriceLimit_WA'],
        'price_remote': ['Remote', 'Price Limit (Remote)', 'PriceLimit_Remote'],
        'price_very_remote': ['Very Remote', 'Price Limit (Very Remote)', 'PriceLimit_VeryRemote'],
    }
    
    price_columns = {}
    for db_col, patterns in price_patterns.items():
        price_columns[db_col] = find_column(df, patterns)
    
    # Boolean columns
    bool_patterns = {
        'non_face_to_face': ['Non-Face-to-Face', 'Non Face to Face', 'NonF2F'],
        'provider_travel': ['Provider Travel', 'Travel'],
        'short_notice_cancellations': ['Short Notice Cancellation', 'Cancellation'],
        'ndia_requested_reports': ['NDIA Requested Reports', 'Reports'],
        'irregular_sil_supports': ['Irregular SIL', 'SIL'],
    }
    
    bool_columns = {}
    for db_col, patterns in bool_patterns.items():
        bool_columns[db_col] = find_column(df, patterns)
    
    print(f"   Found item number column: {col_item_number}")
    print(f"   Found item name column: {col_item_name}")
    
    if not col_item_number or not col_item_name:
        print("❌ Could not find required columns!")
        print(f"   Available columns: {list(df.columns)}")
        raise ValueError("Required columns not found in XLSX file")
    
    for _, row in df.iterrows():
        item_number = row.get(col_item_number)
        
        # Skip empty rows
        if pd.isna(item_number) or not str(item_number).strip():
            continue
        
        record = {
            'support_item_number': str(item_number).strip(),
            'support_item_name': str(row.get(col_item_name, '')).strip() if pd.notna(row.get(col_item_name)) else '',
            'registration_group_number': safe_int(row.get(col_reg_group_num)) if col_reg_group_num else None,
            'registration_group_name': safe_str(row.get(col_reg_group_name)) if col_reg_group_name else None,
            'support_category_number': safe_int(row.get(col_cat_num)) or 0,
            'support_category_name': safe_str(row.get(col_cat_name)) if col_cat_name else '',
            'unit': safe_str(row.get(col_unit)) if col_unit else 'H',
            'quote_required': safe_bool(row.get(col_quote)) if col_quote else False,
        }
        
        # Add price columns
        for db_col, xlsx_col in price_columns.items():
            if xlsx_col:
                record[db_col] = safe_float(row.get(xlsx_col))
            else:
                record[db_col] = None
        
        # Add boolean columns
        for db_col, xlsx_col in bool_columns.items():
            if xlsx_col:
                record[db_col] = safe_bool(row.get(xlsx_col))
            else:
                record[db_col] = False
        
        
        # Add support purpose based on category number
        # Based on NDIS categorization:
        # Core: 1-4, 16, 18, 21
        # Capital: 5, 6, 17, 19
        # Capacity Building: 7-15, 20
        cat_num = record.get('support_category_number') or 0
        if cat_num in [1, 2, 3, 4, 16, 18, 21]:
            record['support_purpose'] = 'Core'
        elif cat_num in [5, 6, 17, 19]:
            record['support_purpose'] = 'Capital'
        elif cat_num in [7, 8, 9, 10, 11, 12, 13, 14, 15, 20]:
            record['support_purpose'] = 'Capacity Building'
        else:
            record['support_purpose'] = 'Core'  # Default to Core for unknown
        
        records.append(record)
    
    print(f"✅ Transformed {len(records)} valid records")
    return records


def safe_str(value) -> Optional[str]:
    """Safely convert to string."""
    if pd.isna(value):
        return None
    return str(value).strip()


def safe_int(value) -> Optional[int]:
    """Safely convert to integer."""
    if pd.isna(value):
        return None
    try:
        return int(float(value))
    except (ValueError, TypeError):
        return None


def safe_float(value) -> Optional[float]:
    """Safely convert to float."""
    if pd.isna(value):
        return None
    try:
        return float(value)
    except (ValueError, TypeError):
        return None


def safe_bool(value) -> bool:
    """Safely convert to boolean."""
    if pd.isna(value):
        return False
    return str(value).upper() in ('Y', 'YES', 'TRUE', '1')

# ============================================================================
# SUPABASE OPERATIONS
# ============================================================================

def get_last_hash(supabase: Client) -> Optional[str]:
    """Get the hash from the last successful update."""
    try:
        result = supabase.table('ndis_price_update_logs') \
            .select('file_hash') \
            .eq('status', 'success') \
            .order('update_date', desc=True) \
            .limit(1) \
            .execute()
        
        if result.data:
            return result.data[0]['file_hash']
        return None
    except Exception as e:
        print(f"⚠️ Could not get last hash: {e}")
        return None


def count_existing_items(supabase: Client) -> int:
    """Count existing support items."""
    try:
        result = supabase.table('ndis_support_items') \
            .select('id', count='exact') \
            .execute()
        return result.count or 0
    except Exception:
        return 0


def update_support_items(supabase: Client, records: List[Dict[str, Any]]) -> Tuple[int, int, int]:
    """Update support items in Supabase."""
    print("📤 Updating Supabase...")
    
    # Get existing items
    try:
        existing_result = supabase.table('ndis_support_items') \
            .select('support_item_number') \
            .execute()
        existing_numbers = {r['support_item_number'] for r in existing_result.data}
    except:
        existing_numbers = set()
    
    new_numbers = {r['support_item_number'] for r in records}
    
    # Calculate changes
    to_add = new_numbers - existing_numbers
    to_remove = existing_numbers - new_numbers
    to_update = new_numbers & existing_numbers
    
    print(f"  📊 New: {len(to_add)}, Remove: {len(to_remove)}, Update: {len(to_update)}")
    
    # Remove old items
    if to_remove:
        try:
            for batch_start in range(0, len(list(to_remove)), 100):
                batch = list(to_remove)[batch_start:batch_start + 100]
                supabase.table('ndis_support_items') \
                    .delete() \
                    .in_('support_item_number', batch) \
                    .execute()
            print(f"  🗑️ Removed {len(to_remove)} items")
        except Exception as e:
            print(f"  ⚠️ Error removing items: {e}")
    
    # Upsert all records in batches
    batch_size = 200
    total_upserted = 0
    failed_batches = []
    
    for i in range(0, len(records), batch_size):
        batch = records[i:i + batch_size]
        batch_num = i // batch_size + 1
        total_batches = (len(records) + batch_size - 1) // batch_size
        
        try:
            result = supabase.table('ndis_support_items') \
                .upsert(batch, on_conflict='support_item_number') \
                .execute()
            total_upserted += len(batch)
            print(f"  ✅ Upserted batch {batch_num}/{total_batches} ({len(batch)} items)")
        except Exception as e:
            failed_batches.append((batch_num, len(batch)))
            print(f"  ❌ FAILED batch {batch_num}/{total_batches}: {e}")
            # Try individual inserts to find problematic records
            for record in batch:
                try:
                    supabase.table('ndis_support_items') \
                        .upsert([record], on_conflict='support_item_number') \
                        .execute()
                    total_upserted += 1
                except Exception as record_error:
                    print(f"    ❌ Failed item {record.get('support_item_number')}: {record_error}")
    
    if failed_batches:
        print(f"  ⚠️ {len(failed_batches)} batches had errors (attempted individual inserts)")
    
    print(f"  📊 Total successfully upserted: {total_upserted}/{len(records)}")
    
    return len(to_add), len(to_remove), len(to_update)


def log_update(supabase: Client, file_hash: str, total: int, added: int, removed: int, 
               source_url: str = None, status: str = 'success', error: str = None):
    """Log the update to the database."""
    try:
        supabase.table('ndis_price_update_logs').insert({
            'file_hash': file_hash,
            'total_items': total,
            'items_added': added,
            'items_removed': removed,
            'prices_changed': 0,
            'source_url': source_url,
            'status': status,
            'error_message': error,
        }).execute()
    except Exception as e:
        print(f"⚠️ Could not log update: {e}")

# ============================================================================
# GITHUB ACTIONS OUTPUT
# ============================================================================

def set_output(name: str, value: Any):
    """Set GitHub Actions output variable."""
    output_file = os.getenv('GITHUB_OUTPUT')
    if output_file:
        with open(output_file, 'a') as f:
            f.write(f"{name}={value}\n")
    print(f"  📌 Output: {name}={value}")

# ============================================================================
# MAIN
# ============================================================================

def main():
    print("=" * 60)
    print("🚀 NDIS Price Guide Updater")
    print(f"⏰ Timestamp: {datetime.now().isoformat()}")
    print("=" * 60)
    
    # Initialize Supabase
    supabase = get_supabase_client()
    
    # Check for local Excel file first
    local_excel = os.getenv('EXCEL_FILE_PATH')
    xlsx_data = None
    source_url = None
    
    if local_excel and os.path.exists(local_excel):
        print(f"\n📂 Using local Excel file: {local_excel}")
        try:
            with open(local_excel, 'rb') as f:
                xlsx_data = f.read()
            source_url = f"local:{local_excel}"
            print("✅ Loaded local Excel file successfully")
        except Exception as e:
            print(f"❌ Error reading local file: {e}")
    
    # If no local file, try to download catalogue from multiple sources
    if not xlsx_data:
        print("\n🌐 Downloading from NDIS website...")
        xlsx_data, source_url = try_download_from_multiple_sources()
    
    if not xlsx_data:
        print("\n❌ FAILED: Could not download NDIS catalogue from any source")
        print("\n💡 MANUAL FIX REQUIRED:")
        print("   1. Go to: https://www.ndis.gov.au/providers/pricing-arrangements")
        print("   2. Find the 'NDIS Support Catalogue' XLSX download link")
        print("   3. Update the NDIS_CATALOGUE_URLS list in this script with the new URL")
        
        set_output('status', 'failed')
        set_output('updated', 'false')
        set_output('error', 'Could not download catalogue - URLs may have changed')
        set_output('timestamp', datetime.now().isoformat())
        
        # Log the failure
        log_update(supabase, 'failed', 0, 0, 0, status='failed', 
                   error='Could not download catalogue from any source')
        
        sys.exit(1)
    
    # Calculate hash
    new_hash = calculate_hash(xlsx_data)
    old_hash = get_last_hash(supabase)
    
    print(f"\n📋 Hash comparison:")
    print(f"  Old: {old_hash[:16] if old_hash else 'None'}...")
    print(f"  New: {new_hash[:16]}...")
    
    # Check if update needed (skip hash check if using local file or force update)
    if new_hash == old_hash and not FORCE_UPDATE and not local_excel:
        print("\n✅ No changes detected. Catalogue is up to date.")
        set_output('status', 'success')
        set_output('updated', 'false')
        set_output('total_items', count_existing_items(supabase))
        set_output('items_added', 0)
        set_output('items_removed', 0)
        set_output('prices_changed', 0)
        set_output('timestamp', datetime.now().isoformat())
        return
    
    # Process update
    print("\n🔄 Processing update...")
    if local_excel:
        print("   (Using local file - will force update)")

    
    try:
        df = parse_catalogue(xlsx_data)
        records = transform_to_records(df)
        added, removed, updated = update_support_items(supabase, records)
        
        # Log success
        log_update(supabase, new_hash, len(records), added, removed, source_url)
        
        print("\n" + "=" * 60)
        print("✅ UPDATE COMPLETED SUCCESSFULLY!")
        print("=" * 60)
        print(f"  Total items: {len(records)}")
        print(f"  Added: {added}")
        print(f"  Removed: {removed}")
        print(f"  Updated: {updated}")
        print(f"  Source: {source_url}")
        
        # Set outputs for GitHub Actions
        set_output('status', 'success')
        set_output('updated', 'true')
        set_output('total_items', len(records))
        set_output('items_added', added)
        set_output('items_removed', removed)
        set_output('prices_changed', updated)
        set_output('timestamp', datetime.now().isoformat())
        
    except Exception as e:
        print(f"\n❌ ERROR: {e}")
        import traceback
        traceback.print_exc()
        
        log_update(supabase, new_hash, 0, 0, 0, source_url, status='failed', error=str(e))
        set_output('status', 'failed')
        set_output('updated', 'false')
        set_output('error', str(e))
        set_output('timestamp', datetime.now().isoformat())
        sys.exit(1)


if __name__ == "__main__":
    main()
