"""
Quick script to run the NDIS import with local Excel file
This will delete all existing data and import fresh 635 records
"""

import sys
import os

# Add scripts directory to path
sys.path.insert(0, os.path.dirname(__file__))

# Set environment variables
os.environ['EXCEL_FILE_PATH'] = 'scripts/NDIS-Support Catalogue-2025-26 -v1.1 (5).xlsx'

# Import and run
from github_price_updater import main

if __name__ == '__main__':
    print("=" * 80)
    print("NDIS DATA IMPORT - AUTOMATED")
    print("=" * 80)
    print("\nThis will:")
    print("1. Delete all existing records from database")
    print("2. Import all 635 records from local Excel file")
    print("3. Verify the import")
    print("\n" + "=" * 80 + "\n")
    
    main()
