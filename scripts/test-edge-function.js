// Test script for NDIS Price Updater Edge Function
// Run with: node scripts/test-edge-function.js

const SUPABASE_URL = "https://htszyyiptlahwkdgcbjq.supabase.co";
const ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJyb3drenlsY2JrZ2FvYWNpanFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAxMzg1NzEsImV4cCI6MjA4NTcxNDU3MX0.sSoMamM_-AOGayl79_LNohIld86Y1pqNpqBjgGpSXJI";

async function testEdgeFunction() {
    console.log("🚀 Testing NDIS Price Updater Edge Function...\n");

    try {
        const response = await fetch(`${SUPABASE_URL}/functions/v1/ndis-price-updater`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${ANON_KEY}`,
                "Content-Type": "application/json"
            }
        });

        const data = await response.json();

        console.log("📋 Response Status:", response.status);
        console.log("📋 Response Data:", JSON.stringify(data, null, 2));

        if (data.success) {
            console.log("\n✅ Edge function is working!");
        } else {
            console.log("\n⚠️ Edge function returned an error:", data.error);
        }
    } catch (error) {
        console.error("❌ Error calling edge function:", error.message);
    }
}

testEdgeFunction();
