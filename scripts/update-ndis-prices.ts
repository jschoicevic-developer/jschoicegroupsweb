/**
 * NDIS Price Guide Updater Script
 *
 * This script imports NDIS support item prices from a CSV/Excel file
 * and updates the database.
 *
 * Usage:
 *   npm run update-prices -- --file path/to/price-guide.csv
 *   npm run update-prices -- --file path/to/price-guide.xlsx
 */

import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Error: Supabase credentials not found in environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

interface NdisPriceItem {
  support_item_number: string;
  support_item_name: string;
  registration_group_number?: number;
  registration_group_name?: string;
  support_category_number: number;
  support_category_name: string;
  support_purpose?: string;
  unit: string;
  price_act?: number;
  price_nsw?: number;
  price_nt?: number;
  price_qld?: number;
  price_sa?: number;
  price_tas?: number;
  price_vic?: number;
  price_wa?: number;
  price_remote?: number;
  price_very_remote?: number;
  quote_required?: boolean;
  non_face_to_face?: boolean;
  provider_travel?: boolean;
  short_notice_cancellations?: boolean;
  ndia_requested_reports?: boolean;
  irregular_sil_supports?: boolean;
}

/**
 * Parse CSV file and return array of items
 */
async function parseCSV(filePath: string): Promise<NdisPriceItem[]> {
  const items: NdisPriceItem[] = [];
  const csvParser = require('csv-parser');

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on('data', (row: any) => {
        try {
          const item: NdisPriceItem = {
            support_item_number: row['Support Item Number'] || row['Item Number'] || '',
            support_item_name: row['Support Item Name'] || row['Item Name'] || '',
            registration_group_number: parseInt(row['Registration Group Number']) || undefined,
            registration_group_name: row['Registration Group Name'] || undefined,
            support_category_number: parseInt(row['Support Category Number']) || parseInt(row['Category Number']) || 1,
            support_category_name: row['Support Category Name'] || row['Category Name'] || 'Unknown',
            support_purpose: row['Support Purpose'] || undefined,
            unit: row['Unit'] || row['Unit of Measure'] || 'H',
            price_act: parsePrice(row['ACT'] || row['Price ACT']),
            price_nsw: parsePrice(row['NSW'] || row['Price NSW']),
            price_nt: parsePrice(row['NT'] || row['Price NT']),
            price_qld: parsePrice(row['QLD'] || row['Price QLD']),
            price_sa: parsePrice(row['SA'] || row['Price SA']),
            price_tas: parsePrice(row['TAS'] || row['Price TAS']),
            price_vic: parsePrice(row['VIC'] || row['Price VIC']),
            price_wa: parsePrice(row['WA'] || row['Price WA']),
            price_remote: parsePrice(row['Remote'] || row['Price Remote']),
            price_very_remote: parsePrice(row['Very Remote'] || row['Price Very Remote']),
            quote_required: parseBoolean(row['Quote Required']),
            non_face_to_face: parseBoolean(row['Non Face to Face']),
            provider_travel: parseBoolean(row['Provider Travel']),
            short_notice_cancellations: parseBoolean(row['Short Notice Cancellations']),
            ndia_requested_reports: parseBoolean(row['NDIA Requested Reports']),
            irregular_sil_supports: parseBoolean(row['Irregular SIL Supports'])
          };

          if (item.support_item_number && item.support_item_name) {
            items.push(item);
          }
        } catch (error) {
          console.warn('⚠️  Skipping invalid row:', error);
        }
      })
      .on('end', () => {
        console.log(`✅ Parsed ${items.length} items from CSV`);
        resolve(items);
      })
      .on('error', reject);
  });
}

/**
 * Parse Excel file and return array of items
 */
async function parseExcel(filePath: string): Promise<NdisPriceItem[]> {
  const XLSX = require('xlsx');
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const data = XLSX.utils.sheet_to_json(worksheet);

  const items: NdisPriceItem[] = [];

  for (const row of data as any[]) {
    try {
      const item: NdisPriceItem = {
        support_item_number: row['Support Item Number'] || row['Item Number'] || '',
        support_item_name: row['Support Item Name'] || row['Item Name'] || '',
        registration_group_number: parseInt(row['Registration Group Number']) || undefined,
        registration_group_name: row['Registration Group Name'] || undefined,
        support_category_number: parseInt(row['Support Category Number']) || parseInt(row['Category Number']) || 1,
        support_category_name: row['Support Category Name'] || row['Category Name'] || 'Unknown',
        support_purpose: row['Support Purpose'] || undefined,
        unit: row['Unit'] || row['Unit of Measure'] || 'H',
        price_act: parsePrice(row['ACT'] || row['Price ACT']),
        price_nsw: parsePrice(row['NSW'] || row['Price NSW']),
        price_nt: parsePrice(row['NT'] || row['Price NT']),
        price_qld: parsePrice(row['QLD'] || row['Price QLD']),
        price_sa: parsePrice(row['SA'] || row['Price SA']),
        price_tas: parsePrice(row['TAS'] || row['Price TAS']),
        price_vic: parsePrice(row['VIC'] || row['Price VIC']),
        price_wa: parsePrice(row['WA'] || row['Price WA']),
        price_remote: parsePrice(row['Remote'] || row['Price Remote']),
        price_very_remote: parsePrice(row['Very Remote'] || row['Price Very Remote']),
        quote_required: parseBoolean(row['Quote Required']),
        non_face_to_face: parseBoolean(row['Non Face to Face']),
        provider_travel: parseBoolean(row['Provider Travel']),
        short_notice_cancellations: parseBoolean(row['Short Notice Cancellations']),
        ndia_requested_reports: parseBoolean(row['NDIA Requested Reports']),
        irregular_sil_supports: parseBoolean(row['Irregular SIL Supports'])
      };

      if (item.support_item_number && item.support_item_name) {
        items.push(item);
      }
    } catch (error) {
      console.warn('⚠️  Skipping invalid row:', error);
    }
  }

  console.log(`✅ Parsed ${items.length} items from Excel`);
  return items;
}

/**
 * Helper function to parse price strings
 */
function parsePrice(value: any): number | undefined {
  if (!value) return undefined;
  if (typeof value === 'number') return value;

  // Remove currency symbols and commas
  const cleaned = String(value).replace(/[$,]/g, '').trim();
  const parsed = parseFloat(cleaned);

  return isNaN(parsed) ? undefined : parsed;
}

/**
 * Helper function to parse boolean values
 */
function parseBoolean(value: any): boolean {
  if (typeof value === 'boolean') return value;
  if (!value) return false;

  const str = String(value).toLowerCase().trim();
  return str === 'yes' || str === 'true' || str === '1' || str === 'y';
}

/**
 * Insert or update items in the database
 */
async function updateDatabase(items: NdisPriceItem[]) {
  console.log('\n📦 Starting database update...');

  let added = 0;
  let updated = 0;
  let failed = 0;

  // Process in batches of 50
  const batchSize = 50;
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);

    console.log(`\n🔄 Processing batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(items.length / batchSize)}...`);

    for (const item of batch) {
      try {
        // Check if item exists
        const { data: existing } = await supabase
          .from('ndis_support_items')
          .select('id')
          .eq('support_item_number', item.support_item_number)
          .single();

        if (existing) {
          // Update existing item
          const { error } = await supabase
            .from('ndis_support_items')
            .update(item)
            .eq('support_item_number', item.support_item_number);

          if (error) {
            console.error(`❌ Failed to update ${item.support_item_number}:`, error.message);
            failed++;
          } else {
            updated++;
          }
        } else {
          // Insert new item
          const { error } = await supabase
            .from('ndis_support_items')
            .insert(item);

          if (error) {
            console.error(`❌ Failed to insert ${item.support_item_number}:`, error.message);
            failed++;
          } else {
            added++;
          }
        }
      } catch (error) {
        console.error(`❌ Error processing ${item.support_item_number}:`, error);
        failed++;
      }
    }

    // Show progress
    console.log(`   ✓ Processed ${Math.min(i + batchSize, items.length)}/${items.length} items`);
  }

  return { added, updated, failed };
}

/**
 * Log the update to the database
 */
async function logUpdate(stats: { added: number; updated: number; failed: number }, totalItems: number) {
  const { error } = await supabase
    .from('ndis_price_update_logs')
    .insert({
      total_items: totalItems,
      items_added: stats.added,
      items_removed: 0,
      prices_changed: stats.updated,
      status: stats.failed > 0 ? 'partial' : 'success',
      error_message: stats.failed > 0 ? `${stats.failed} items failed to process` : null
    });

  if (error) {
    console.error('⚠️  Failed to log update:', error.message);
  }
}

/**
 * Main function
 */
async function main() {
  console.log('🚀 NDIS Price Guide Updater\n');

  // Get file path from command line arguments
  const args = process.argv.slice(2);
  const fileIndex = args.indexOf('--file');

  if (fileIndex === -1 || !args[fileIndex + 1]) {
    console.error('❌ Error: Please provide a file path using --file flag');
    console.log('\nUsage:');
    console.log('  npm run update-prices -- --file path/to/price-guide.csv');
    console.log('  npm run update-prices -- --file path/to/price-guide.xlsx');
    process.exit(1);
  }

  const filePath = args[fileIndex + 1];

  // Check if file exists
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Error: File not found: ${filePath}`);
    process.exit(1);
  }

  console.log(`📄 Reading file: ${filePath}\n`);

  // Parse file based on extension
  const ext = path.extname(filePath).toLowerCase();
  let items: NdisPriceItem[] = [];

  try {
    if (ext === '.csv') {
      items = await parseCSV(filePath);
    } else if (ext === '.xlsx' || ext === '.xls') {
      items = await parseExcel(filePath);
    } else {
      console.error('❌ Error: Unsupported file format. Please use .csv or .xlsx files');
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Error parsing file:', error);
    process.exit(1);
  }

  if (items.length === 0) {
    console.error('❌ Error: No valid items found in file');
    process.exit(1);
  }

  // Confirm before updating
  console.log(`\n⚠️  This will update ${items.length} support items in the database.`);
  console.log('   Press Enter to continue or Ctrl+C to cancel...');

  await new Promise(resolve => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.question('', () => {
      rl.close();
      resolve(null);
    });
  });

  // Update database
  const stats = await updateDatabase(items);

  // Log the update
  await logUpdate(stats, items.length);

  // Print summary
  console.log('\n✅ Update complete!\n');
  console.log('📊 Summary:');
  console.log(`   • Total items processed: ${items.length}`);
  console.log(`   • Items added: ${stats.added}`);
  console.log(`   • Items updated: ${stats.updated}`);
  console.log(`   • Failed: ${stats.failed}`);

  if (stats.failed > 0) {
    console.log('\n⚠️  Some items failed to process. Check the logs above for details.');
  }
}

// Run the script
main().catch(error => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
