// ============================================================================
// NDIS Price Updater - Supabase Edge Function
// ============================================================================
// 
// This runs on Supabase's edge network (Deno), which uses different IPs
// than GitHub Actions, so it's less likely to be blocked.
//
// SETUP:
// 1. Install Supabase CLI: npm install -g supabase
// 2. Login: supabase login
// 3. Link project: supabase link --project-ref YOUR_PROJECT_REF
// 4. Create function: supabase functions new ndis-price-updater
// 5. Replace the generated index.ts with this file
// 6. Deploy: supabase functions deploy ndis-price-updater
// 7. Set up a cron trigger in Supabase Dashboard
//
// ============================================================================

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import * as XLSX from 'https://esm.sh/xlsx@0.18.5'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// NDIS Download URL - Update this when NDIS releases new versions
const NDIS_CATALOGUE_URL = "https://www.ndis.gov.au/media/8038/download"

// Browser-like headers
const FETCH_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/octet-stream,*/*',
  'Accept-Language': 'en-US,en;q=0.9',
  'Referer': 'https://www.ndis.gov.au/providers/pricing-arrangements',
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    console.log('🚀 NDIS Price Updater Started')
    console.log(`⏰ Timestamp: ${new Date().toISOString()}`)

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Download NDIS catalogue
    console.log(`📥 Downloading from: ${NDIS_CATALOGUE_URL}`)

    const response = await fetch(NDIS_CATALOGUE_URL, {
      headers: FETCH_HEADERS,
    })

    if (!response.ok) {
      throw new Error(`Download failed: ${response.status} ${response.statusText}`)
    }

    const arrayBuffer = await response.arrayBuffer()
    const data = new Uint8Array(arrayBuffer)

    console.log(`✅ Downloaded ${(data.length / 1024).toFixed(1)} KB`)

    // Calculate hash to check for changes
    const hashBuffer = await crypto.subtle.digest('SHA-256', data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const newHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')

    // Get last hash
    const { data: lastLog } = await supabase
      .from('ndis_price_update_logs')
      .select('file_hash')
      .eq('status', 'success')
      .order('update_date', { ascending: false })
      .limit(1)
      .single()

    const oldHash = lastLog?.file_hash

    console.log(`📋 Old hash: ${oldHash?.substring(0, 16) || 'None'}...`)
    console.log(`📋 New hash: ${newHash.substring(0, 16)}...`)

    // Check if update needed
    const forceUpdate = new URL(req.url).searchParams.get('force') === 'true'

    if (newHash === oldHash && !forceUpdate) {
      console.log('✅ No changes detected')
      return new Response(
        JSON.stringify({
          success: true,
          message: 'No changes detected',
          updated: false
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Parse XLSX
    console.log('📊 Parsing XLSX...')
    const workbook = XLSX.read(data, { type: 'array' })
    const sheetName = workbook.SheetNames[0]
    const worksheet = workbook.Sheets[sheetName]
    const rawData = XLSX.utils.sheet_to_json(worksheet)

    console.log(`✅ Found ${rawData.length} rows`)

    // Transform data
    // Transform data
    console.log('🔄 Transforming data...')
    const recordsMap = new Map<string, any>()

    for (const row of rawData) {
      const itemNumber = findValue(row, ['Support Item Number', 'SupportItemNumber'])
      if (!itemNumber || String(itemNumber).trim() === '') continue

      const catNum = toInt(findValue(row, ['Support Category Number'])) || 0
      const supportItemNumber = String(itemNumber).trim()

      recordsMap.set(supportItemNumber, {
        support_item_number: supportItemNumber,
        support_item_name: String(findValue(row, ['Support Item Name']) || '').trim(),
        registration_group_number: toInt(findValue(row, ['Registration Group Number'])),
        registration_group_name: findValue(row, ['Registration Group Name']),
        support_category_number: catNum,
        support_category_name: findValue(row, ['Support Category Name']) || '',
        support_purpose: catNum >= 1 && catNum <= 4 ? 'Core' : catNum >= 5 && catNum <= 6 ? 'Capital' : 'Capacity Building',
        unit: findValue(row, ['Unit']) || 'H',
        price_act: toFloat(findValue(row, ['ACT', 'Price Limit (ACT)'])),
        price_nsw: toFloat(findValue(row, ['NSW', 'Price Limit (NSW)'])),
        price_nt: toFloat(findValue(row, ['NT', 'Price Limit (NT)'])),
        price_qld: toFloat(findValue(row, ['QLD', 'Price Limit (QLD)'])),
        price_sa: toFloat(findValue(row, ['SA', 'Price Limit (SA)'])),
        price_tas: toFloat(findValue(row, ['TAS', 'Price Limit (TAS)'])),
        price_vic: toFloat(findValue(row, ['VIC', 'Price Limit (VIC)'])),
        price_wa: toFloat(findValue(row, ['WA', 'Price Limit (WA)'])),
        price_remote: toFloat(findValue(row, ['Remote', 'Price Limit (Remote)'])),
        price_very_remote: toFloat(findValue(row, ['Very Remote', 'Price Limit (Very Remote)'])),
        quote_required: toBool(findValue(row, ['Quote'])),
        non_face_to_face: toBool(findValue(row, ['Non-Face-to-Face'])),
        provider_travel: toBool(findValue(row, ['Provider Travel'])),
        short_notice_cancellations: toBool(findValue(row, ['Short Notice Cancellations'])),
        ndia_requested_reports: toBool(findValue(row, ['NDIA Requested Reports'])),
        irregular_sil_supports: toBool(findValue(row, ['Irregular SIL Supports'])),
      })
    }

    const records = Array.from(recordsMap.values())

    console.log(`✅ Transformed ${records.length} records`)

    // Upsert to database in batches with retry logic
    console.log('📤 Uploading to database...')
    const batchSize = 200  // ✅ FIXED: Reduced from 500 to 200 for reliability
    let uploaded = 0
    const failedBatches: Array<{ batch: number, error: string, size: number }> = []

    // Helper function to upload a batch with retry logic
    async function uploadBatchWithRetry(
      batch: any[],
      batchNumber: number,
      maxRetries = 3
    ): Promise<boolean> {
      for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
          const { error } = await supabase
            .from('ndis_support_items')
            .upsert(batch, { onConflict: 'support_item_number' })

          if (!error) {
            console.log(`✅ Batch ${batchNumber}/${Math.ceil(records.length / batchSize)}: ${batch.length} records (attempt ${attempt})`)
            return true
          }

          console.error(`⚠️ Batch ${batchNumber} error (attempt ${attempt}/${maxRetries}): ${error.message}`)

          if (attempt === maxRetries) {
            throw new Error(`Batch ${batchNumber} failed after ${maxRetries} attempts: ${error.message}`)
          }

          // Exponential backoff: 1s, 2s, 4s
          const delay = Math.pow(2, attempt - 1) * 1000
          console.log(`⏳ Retrying batch ${batchNumber} in ${delay}ms...`)
          await new Promise(resolve => setTimeout(resolve, delay))

        } catch (err) {
          if (attempt === maxRetries) {
            throw err
          }
        }
      }
      return false
    }

    // Upload all batches
    const totalBatches = Math.ceil(records.length / batchSize)
    for (let i = 0; i < records.length; i += batchSize) {
      const batch = records.slice(i, i + batchSize)
      const batchNumber = Math.floor(i / batchSize) + 1

      try {
        const success = await uploadBatchWithRetry(batch, batchNumber)
        if (success) {
          uploaded += batch.length
        } else {
          failedBatches.push({
            batch: batchNumber,
            error: 'Upload failed after retries',
            size: batch.length
          })
        }
      } catch (error) {
        // ✅ FIXED: Fail fast on batch errors
        failedBatches.push({
          batch: batchNumber,
          error: error.message,
          size: batch.length
        })
        console.error(`❌ Batch ${batchNumber} failed permanently:`, error.message)
        throw new Error(
          `Batch ${batchNumber} failed: ${error.message}. ` +
          `Upload stopped at record ${i + 1}/${records.length}. ` +
          `${uploaded} records uploaded successfully before failure.`
        )
      }
    }

    // ✅ FIXED: Verify upload integrity
    console.log('🔍 Verifying upload integrity...')
    const { count, error: countError } = await supabase
      .from('ndis_support_items')
      .select('*', { count: 'exact', head: true })

    if (countError) {
      throw new Error(`Failed to verify upload: ${countError.message}`)
    }

    console.log(`📊 Database count: ${count}, Expected: ${records.length}`)

    // ✅ FIXED: Fail if count mismatch
    if (count !== records.length) {
      throw new Error(
        `❌ DATA INTEGRITY CHECK FAILED!\n` +
        `Expected: ${records.length} records\n` +
        `Found in database: ${count} records\n` +
        `Missing: ${records.length - (count || 0)} records\n` +
        `This indicates data loss during upload.`
      )
    }

    console.log('✅ Data integrity verified!')

    // Log the update
    await supabase.from('ndis_price_update_logs').insert({
      file_hash: newHash,
      total_items: records.length,
      items_added: records.length,
      status: 'success',
      source_url: NDIS_CATALOGUE_URL,
    })

    console.log('✅ Update completed successfully!')

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Update completed',
        updated: true,
        totalItems: records.length,
        uploaded: uploaded,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('❌ Error:', error.message)

    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})

// Helper functions
function findValue(row: any, keys: string[]): any {
  for (const key of keys) {
    if (row[key] !== undefined) return row[key]
    for (const rowKey of Object.keys(row)) {
      if (rowKey.toLowerCase().includes(key.toLowerCase())) {
        return row[rowKey]
      }
    }
  }
  return null
}

function toInt(value: any): number | null {
  if (value === null || value === undefined || value === '') return null
  const num = parseInt(String(value), 10)
  return isNaN(num) ? null : num
}

function toFloat(value: any): number | null {
  if (value === null || value === undefined || value === '') return null
  const num = parseFloat(String(value))
  return isNaN(num) ? null : num
}

function toBool(value: any): boolean {
  if (!value) return false
  return ['Y', 'YES', '1', 'TRUE'].includes(String(value).toUpperCase())
}
