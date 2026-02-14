
import pandas as pd
import os

file_path = r"d:\Projetcs\JS-Choice-Group\jschoice-website\scripts\NDIS-Support Catalogue-2025-26 -v1.1 (5).xlsx"

print(f"Inspecting file: {file_path}")

try:
    if not os.path.exists(file_path):
        print("Error: File not found.")
        exit(1)

    # Load the Excel file
    df = pd.read_excel(file_path)
    
    # Normalize column names (strip whitespace)
    df.columns = df.columns.str.strip()
    
    # Check for 'Support Category Number' column
    col_name = 'Support Category Number'
    if col_name not in df.columns:
        print(f"Error: Column '{col_name}' not found. Available columns:")
        print(df.columns.tolist())
        exit(1)
        
    # Get unique categories
    unique_categories = df[col_name].dropna().unique()
    unique_categories.sort()
    
    print(f"\nUnique Support Category Numbers found in file ({len(unique_categories)} total):")
    print(unique_categories)
    
    # Check specifically for Category 16
    if 16 in unique_categories:
        count_16 = df[df[col_name] == 16].shape[0]
        print(f"\n✅ Category 16 DOES exist in this file with {count_16} records.")
    else:
        print("\n❌ Category 16 does NOT exist in this file.")
        
    # Also print Category 1 count for comparison
    if 1 in unique_categories:
        count_1 = df[df[col_name] == 1].shape[0]
        print(f"Category 1 count: {count_1}")

except Exception as e:
    print(f"An error occurred: {e}")
