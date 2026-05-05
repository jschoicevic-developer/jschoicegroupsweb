/**
 * Bing URL Submission Script
 * Submits up to 100 URLs per day to Bing Webmaster API for indexing.
 * Usage: node bing-index.mjs
 * Requires: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env
 */

import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load .env manually (no dependency needed)
try {
  const envFile = readFileSync(resolve(__dirname, ".env"), "utf-8");
  for (const line of envFile.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const value = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, "");
    if (!process.env[key]) process.env[key] = value;
  }
} catch {
  // .env not found — rely on environment variables already set
}

const BING_API_KEY = "c84a2c8beb96449fad69c51ceaba4e05";
const BING_API_URL = "https://ssl.bing.com/webmaster/api.svc/json/SubmitUrlbatch";
const BASE_URL = "https://jschoicegroup.com.au";
const DAILY_LIMIT = 10000;

// ── Static URLs ────────────────────────────────────────────────────────────────
const STATIC_URLS = [
  // Core pages
  "/",
  "/about-us",
  "/contact-us",
  "/gallery",
  "/resources",
  "/career",
  "/blog",
  "/consultations",
  "/privacy-policy",
  "/terms-and-conditions",
  // Service pages
  "/assistance-with-daily-life",
  "/psychosocial-recovery-coach",
  "/assistance-with-nursing-care",
  "/emergency-respite",
  "/group-centre-activities",
  "/transportation-assistance",
  "/access-to-community-activities",
  "/support-coordination",
  "/allied-health-services",
  "/employment-education",
  "/ndis-access-requests",
  "/innovative-community-participation-including-volunteer-opportunities",
  "/ndis-accommodation",
  "/client-and-family-advocacy",
  "/client-and-family-advocacy-for-ndis-participants-only",
  // Location pages
  "/ndis-providers-altona",
  "/ndis-providers-altona-meadows",
  "/ndis-providers-altona-north",
  "/ndis-providers-craigieburn",
  "/ndis-providers-epping",
  "/ndis-providers-footscray",
  "/ndis-providers-hoppers-crossing",
  "/ndis-providers-lara",
  "/ndis-providers-laverton",
  "/ndis-providers-point-cook",
  "/ndis-providers-shepparton",
  "/ndis-providers-south-morang",
  "/ndis-providers-tarneit",
  "/ndis-providers-truganina",
  "/ndis-providers-werribee",
  "/ndis-providers-williams-landing",
  "/ndis-accommodation-geelong",
  // Tools
  "/tools",
  "/tools/ndis-budget-calculator",
  "/tools/ndis-price-guide",
  "/tools/service-matcher",
  // Landing pages
  "/ndis-support-melbourne",
].map((path) => `${BASE_URL}${path}`);

// ── Fetch blog slugs from Supabase ─────────────────────────────────────────────
async function fetchBlogUrls(limit) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.warn(
      "⚠  Supabase env vars not set — skipping blog URL fetch.\n" +
      "   Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env"
    );
    return [];
  }

  const response = await fetch(
    `${supabaseUrl}/rest/v1/blog_posts?select=slug&status=eq.published&order=created_at.desc&limit=${limit}`,
    {
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
      },
    }
  );

  if (!response.ok) {
    console.warn(`⚠  Failed to fetch blog posts: ${response.status} ${response.statusText}`);
    return [];
  }

  const posts = await response.json();
  return posts.map((p) => `${BASE_URL}/blog/${p.slug}`);
}

// ── Submit URLs to Bing ────────────────────────────────────────────────────────
async function submitToBing(urls) {
  const response = await fetch(`${BING_API_URL}?apikey=${BING_API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      siteUrl: BASE_URL,
      urlList: urls,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Bing API error ${response.status}: ${text}`);
  }

  return response.json();
}

// ── Main ───────────────────────────────────────────────────────────────────────
async function main() {
  console.log("🔍 Preparing URLs for Bing submission...\n");

  const staticUrls = STATIC_URLS;

  console.log(`📰 Fetching ALL blog post URLs from Supabase...`);
  const blogUrls = await fetchBlogUrls(DAILY_LIMIT);
  console.log(`   Found ${blogUrls.length} blog posts.\n`);

  const allUrls = [...staticUrls, ...blogUrls].slice(0, DAILY_LIMIT);

  console.log(`📋 Submitting ${allUrls.length} URLs to Bing:\n`);
  allUrls.forEach((url, i) => console.log(`  ${String(i + 1).padStart(3)}. ${url}`));
  console.log();

  try {
    const result = await submitToBing(allUrls);
    console.log("✅ Bing submission successful!");
    console.log("   Response:", JSON.stringify(result, null, 2));
  } catch (err) {
    console.error("❌ Submission failed:", err.message);
    process.exit(1);
  }
}

main();
