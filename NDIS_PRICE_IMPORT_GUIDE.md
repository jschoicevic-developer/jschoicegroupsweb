# 📊 NDIS Price Guide Import Guide

This guide will help you populate your database with actual NDIS support item prices.

---

## 🎯 Overview

The price updater script automatically:
- Reads NDIS price data from CSV or Excel files
- Parses and validates the data
- Inserts new items or updates existing ones
- Logs the update in your database
- Shows detailed progress and statistics

---

## 📥 Step 1: Download NDIS Price Guide

### Option A: Official NDIS Website (Recommended)

1. Visit the official NDIS website:
   **https://www.ndis.gov.au/providers/pricing-arrangements**

2. Look for the latest "Price Guide" or "Support Catalogue"
   - Usually found under "Pricing Arrangements"
   - Download the Excel (.xlsx) or CSV version

3. The file typically contains columns like:
   - Support Item Number
   - Support Item Name
   - Support Category Number/Name
   - Prices by State (ACT, NSW, NT, QLD, SA, TAS, VIC, WA)
   - Unit of Measure
   - Claim rules/requirements

### Option B: NDIS Support Catalogue

Alternatively, download from:
**https://ourguidelines.ndis.gov.au/supports-you-can-access-menu/support-catalogue**

---

## 📋 Step 2: Prepare Your Data File

The script expects a CSV or Excel file with these columns (column names may vary):

### Required Columns:
- **Support Item Number** (or "Item Number")
- **Support Item Name** (or "Item Name")
- **Support Category Number** (or "Category Number")
- **Support Category Name** (or "Category Name")
- **Unit** (or "Unit of Measure") - e.g., "H" for hour, "EA" for each

### Price Columns (at least one required):
- **ACT** (or "Price ACT")
- **NSW** (or "Price NSW")
- **NT** (or "Price NT")
- **QLD** (or "Price QLD")
- **SA** (or "Price SA")
- **TAS** (or "Price TAS")
- **VIC** (or "Price VIC")
- **WA** (or "Price WA")
- **Remote** (or "Price Remote")
- **Very Remote** (or "Price Very Remote")

### Optional Columns:
- Registration Group Number
- Registration Group Name
- Support Purpose
- Quote Required (Yes/No)
- Non Face to Face (Yes/No)
- Provider Travel (Yes/No)
- Short Notice Cancellations (Yes/No)
- NDIA Requested Reports (Yes/No)
- Irregular SIL Supports (Yes/No)

### Example CSV Format:
```csv
Support Item Number,Support Item Name,Support Category Number,Support Category Name,Unit,VIC,NSW,QLD
01_001_0106_1_1,"Active Overnight Assistance - Standard - Weekday Daytime - Non-live-in - National",1,"Assistance with Daily Life",H,63.17,63.17,63.17
01_002_0106_1_1,"Assistance With Self-Care Activities - Standard - Weekday Daytime",1,"Assistance with Daily Life",H,58.87,58.87,58.87
```

---

## 🚀 Step 3: Run the Import Script

### Basic Usage:

```bash
npm run update-prices -- --file path/to/your-price-guide.csv
```

or for Excel files:

```bash
npm run update-prices -- --file path/to/your-price-guide.xlsx
```

### Example:

If you saved the file in a `data` folder:

```bash
npm run update-prices -- --file data/ndis-price-guide-2024.xlsx
```

Or with an absolute path:

```bash
npm run update-prices -- --file "D:\Downloads\NDIS-Price-Guide-July-2024.csv"
```

### What Happens:

1. ✅ Script reads and validates your file
2. ✅ Shows how many items were found
3. ⚠️  Asks for confirmation before updating
4. 🔄 Processes items in batches of 50
5. 📊 Shows progress and statistics
6. ✅ Logs the update to `ndis_price_update_logs` table

---

## 📊 Step 4: Verify Import

After running the script, verify in Supabase:

### Check Support Items:
1. Go to Supabase Dashboard
2. Navigate to: **Table Editor → ndis_support_items**
3. You should see all imported support items

### Check Update Logs:
1. Navigate to: **Table Editor → ndis_price_update_logs**
2. View the latest import statistics:
   - Total items processed
   - Items added
   - Items updated
   - Any errors

### Test in Your App:
1. Start your dev server: `npm run dev`
2. Visit: https://jschoice-website.vercel.app/tools/ndis-price-guide
3. Search for a support item (e.g., "assistance" or "transport")
4. Verify prices appear correctly

---

## 🔄 Updating Prices Regularly

The NDIS updates their price guide periodically (usually annually). To keep your database current:

### Manual Updates:
1. Download the latest price guide
2. Run the script again with the new file
3. The script will update existing items and add new ones

### Automated Updates (Future Enhancement):
You can set up a scheduled task to:
- Automatically download the latest price guide
- Run the import script
- Send email notifications

Example cron job (Linux/Mac):
```bash
# Run monthly on the 1st at 2 AM
0 2 1 * * cd /path/to/project && npm run update-prices -- --file /path/to/latest-prices.csv
```

---

## ⚠️ Troubleshooting

### Problem: "File not found"
**Solution:** Use absolute path or ensure you're in the project root directory

### Problem: "No valid items found"
**Solution:** Check that your CSV/Excel has the correct column names. The script looks for variations like:
- "Support Item Number" OR "Item Number"
- "Support Item Name" OR "Item Name"
- etc.

### Problem: "Failed to insert/update items"
**Solution:**
- Check your Supabase credentials in `.env`
- Verify RLS policies are set up correctly
- Check that the `ndis_support_items` table exists

### Problem: Parser errors
**Solution:**
- Ensure CSV is properly formatted (no extra commas)
- For Excel, make sure data is in the first sheet
- Check for special characters in item names

### Problem: Prices not showing correctly
**Solution:**
- Verify price columns are named correctly (ACT, NSW, VIC, etc.)
- Check that prices are numeric (remove currency symbols)
- The script automatically handles "$" and "," in prices

---

## 📝 Sample Data File Format

If you can't find the official NDIS price guide, here's a sample format you can use:

### Create a file: `sample-ndis-prices.csv`
```csv
Support Item Number,Support Item Name,Support Category Number,Support Category Name,Support Purpose,Unit,ACT,NSW,NT,QLD,SA,TAS,VIC,WA,Quote Required
01_001_0106_1_1,Active Overnight Assistance - Standard - Weekday Daytime,1,Assistance with Daily Life,Core,H,63.17,63.17,63.17,63.17,63.17,63.17,63.17,63.17,No
01_002_0106_1_1,Assistance With Self-Care Activities - Standard - Weekday,1,Assistance with Daily Life,Core,H,58.87,58.87,58.87,58.87,58.87,58.87,58.87,58.87,No
02_001_0107_1_1,Transport - Use of Provider Vehicle,2,Transport,Core,KM,0.85,0.85,0.85,0.85,0.85,0.85,0.85,0.85,No
04_001_0109_1_1,Assistance to Access Community Activities,4,Assistance with Social and Community Participation,Core,H,58.87,58.87,58.87,58.87,58.87,58.87,58.87,58.87,No
07_001_0106_6_1,Support Connection - Level 1,7,Support Coordination,Capacity Building,H,86.85,86.85,86.85,86.85,86.85,86.85,86.85,86.85,No
15_001_0128_1_1,Assistance with Daily Living Activities,15,Improved Daily Living,Capacity Building,H,63.17,63.17,63.17,63.17,63.17,63.17,63.17,63.17,No
```

---

## 🎯 Quick Start Checklist

- [ ] Download NDIS price guide from official website
- [ ] Save file to an accessible location
- [ ] Ensure database tables are created (run `create-ndis-tables.sql`)
- [ ] Verify `.env` has correct Supabase credentials
- [ ] Run: `npm run update-prices -- --file path/to/file.csv`
- [ ] Press Enter to confirm import
- [ ] Verify data in Supabase Dashboard
- [ ] Test search in your app

---

## 📞 Need Help?

If you encounter issues:

1. Check the error messages in the console
2. Verify your file format matches the expected columns
3. Check Supabase Dashboard for any database errors
4. Review the `ndis_price_update_logs` table for details

---

## 🔒 Important Notes

- The script uses your **service role key** to insert data (has full access)
- Always backup your database before running bulk updates
- The script will **update** existing items if they already exist
- Price updates are logged in `ndis_price_update_logs` table
- You can re-run the script safely - it won't create duplicates

---

**You're all set!** Once you import the NDIS price data, all your tools will be fully functional. 🚀
