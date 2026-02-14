# How to See the NDIS Grouped Display Changes

## IMPORTANT: The changes only appear when viewing "Show All Categories"

The grouped display with headings (without individual badges on cards) **ONLY shows when you select "Show all categories"** from the dropdown.

---

## Step-by-Step Guide:

### Step 1: Open the NDIS Price Guide
Go to: **https://jschoice-website.vercel.app/tools/ndis-price-guide**

### Step 2: Select "Show all categories"
1. Click on the **"Filter by Category"** dropdown
2. Select the first option: **"Show all categories"** (with chevron down icon)

### Step 3: You should now see:

**BEFORE (Old View):**
```
Each card had a badge at the top:
┌──────────────────────┐
│ 🔵 Core Supports     │  ← Badge on EACH card
│ 01_001_0107_1_1      │
│ Card Title...        │
└──────────────────────┘
```

**AFTER (New Grouped View):**
```
Section heading at the top, cards below WITHOUT badges:

Core Supports                              ← Big heading
The basic things you need to function...   ← Description

┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│ 01_001_0107_1_1  │  │ 01_002_0107_1_1  │  │ 01_003_0107_1_1  │
│ Card Title...    │  │ Card Title...    │  │ Card Title...    │  ← NO badges!
└──────────────────┘  └──────────────────┘  └──────────────────┘

[View more Core Supports]                  ← Blue button

Capital Supports                           ← Next section heading
For larger, one-off items...               ← Description

┌──────────────────┐  ┌──────────────────┐
│ Card...          │  │ Card...          │  ← NO badges!
└──────────────────┘  └──────────────────┘
```

---

## If You Still Don't See Changes:

### Option 1: Hard Refresh Browser
Press: **Ctrl + Shift + R** (Windows) or **Cmd + Shift + R** (Mac)

### Option 2: Clear Next.js Cache
```bash
# Stop dev server (Ctrl+C)
# Then run:
rm -rf .next
npm run dev
```

### Option 3: Check Browser Console
1. Press **F12** to open DevTools
2. Go to **Console** tab
3. Look for any errors (red text)

---

## What Changed:

### Files Modified:
1. **`src/components/ndis/SearchResultCard.tsx`**
   - Added `hidePurposeBadge` prop
   - Badge only shows when prop is false

2. **`src/components/ndis/PriceGuideSearch.tsx`**
   - Passes `hidePurposeBadge={true}` to cards in grouped view
   - Added white background containers around each group
   - Improved section descriptions
   - Better "View More" button styling

---

## When Do Cards Show Badges?

**Badges are SHOWN when:**
- Searching with a text query
- Viewing a single specific category
- Results might be from different support purposes

**Badges are HIDDEN when:**
- "Show all categories" is selected
- Items are already grouped by support purpose
- Heading already shows the support purpose

---

## Visual Comparison:

### Old Implementation (Redundant):
```
Core Supports (heading)
↓
Card 1: 🔵 Core Supports (badge)    ← Redundant!
Card 2: 🔵 Core Supports (badge)    ← Redundant!
Card 3: 🔵 Core Supports (badge)    ← Redundant!
```

### New Implementation (Clean):
```
Core Supports (heading)
↓
Card 1: (no badge)    ← Clean!
Card 2: (no badge)    ← Clean!
Card 3: (no badge)    ← Clean!
```

---

## Troubleshooting:

### Issue: "I see cards but they still have badges"
**Solution:** Make sure you selected "Show all categories" from the dropdown, not a specific category.

### Issue: "I don't see any cards at all"
**Solution:** The database might be empty. Run the import script first:
```bash
cd scripts
python3 github_price_updater.py
```

### Issue: "Page won't load"
**Solution:** Check if dev server is running:
```bash
npm run dev
```

### Issue: "Changes still not visible after refresh"
**Solution:** Clear browser cache completely:
- Chrome: Settings → Privacy → Clear browsing data → Cached images and files
- Or use Incognito/Private mode

---

## Expected Behavior Summary:

| View Mode | Card Badges | Group Headings |
|-----------|-------------|----------------|
| **Show all categories** | ❌ Hidden | ✅ Shown |
| **Single category** | ✅ Shown | ❌ Hidden |
| **Search query** | ✅ Shown | ❌ Hidden |

---

**Last Updated:** 2026-02-04
**Changes Status:** ✅ Implemented and ready
