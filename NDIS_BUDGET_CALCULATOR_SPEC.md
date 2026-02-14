# NDIS BUDGET CALCULATOR - IMPLEMENTATION SPECIFICATION

**Reference:** https://planpartners.com.au/tools/ndis-budget-calculator
**Status:** Ready to Implement
**Priority:** High

---

## 🎯 OVERVIEW

Build an NDIS Budget Calculator that exactly matches Plan Partners' design with:
- Progressive disclosure (3 questions reveal one at a time)
- Efficient search with autocomplete
- Live cost calculations
- Summary view grouped by support purpose
- PDF download and print functionality

---

## 📸 REFERENCE SCREENSHOTS

See screenshots folder for detailed UI reference:
1. Initial state - Question 1 only
2. Question 1 answered → Question 2 reveals
3. Question 2 dropdown showing categorized options
4. Question 3 search with autocomplete dropdown
5. Calculation table with editable fields
6. Summary view with grouped totals
7. Print/PDF layout

---

## 🎨 KEY FEATURES

### 1. Progressive Question Flow
- Start with banner: "There are 3 questions in this form. Simply answer the first question to trigger the next question."
- Questions reveal with slide-down animation
- Previous selections stay visible

### 2. Smart Search
Supports:
- Item number search: `01_002` or `01_002_0107_1_1`
- Single keyword: `gardening`
- Multiple keywords: `self care activities`
- Phrase search: `yard maintenance`

Algorithm: See EFFICIENT_SEARCH_ALGORITHM section below

### 3. Live Calculations
- Cost = Price × Quantity × Frequency Number
- Updates immediately on any field change
- Total recalculates automatically

### 4. Summary View
- Groups by Core Supports, Capital Supports, Capacity Building
- Shows category and item details
- Total estimate in blue bar

### 5. Export Features
- Download as PDF
- Print-friendly layout
- JS Choice branding

---

## 🔄 USER FLOW

```
┌─────────────────────────────────────────┐
│ Question 1: Select State/Region         │
│ [Select ▼]                              │
└─────────────────────────────────────────┘
             ↓ (User selects)
┌─────────────────────────────────────────┐
│ Question 1: New South Wales ✓           │
│                                          │
│ Question 2: Select Support Category     │
│ [Select support category ▼]            │
└─────────────────────────────────────────┘
             ↓ (User selects)
┌─────────────────────────────────────────┐
│ Question 2: 1 Assistance with daily life│
│                                          │
│ Question 3: Search by support name...   │
│ [🔍 eg. Gardening or 1034567...]       │
│                                          │
│ [Dropdown with results appears]         │
└─────────────────────────────────────────┘
             ↓ (User selects item)
┌─────────────────────────────────────────┐
│ Calculate costs                          │
│                                          │
│ ┌───────────────────────────────────┐  │
│ │ Item │ Price │ Qty │ Freq │ Cost │  │
│ │ ...  │ $78.81│  1  │ 52W  │$4098 │  │
│ └───────────────────────────────────┘  │
│                                          │
│ Total Estimate: $4,098.12               │
│                                          │
│ [+ Add another item] [View summary]     │
└─────────────────────────────────────────┘
```

---

## 🎨 COLORS & STYLING

```css
/* Match Plan Partners exactly */
--teal-primary: #0d7377;       /* Main buttons */
--teal-dark: #0a5c5f;          /* Hover states */
--gold-accent: #f5c518;        /* View summary button */
--mint-bg: #e8f5f5;            /* Light backgrounds */
--blue-table-header: #1a3a4a;  /* Table header */
--purple-link: #7b2d8e;        /* Links */
```

**Dropdown Buttons:**
- Rounded pill shape
- Teal background (#0d7377)
- White text
- Chevron icon

**Section Backgrounds:**
- Alternating mint/light blue (#e8f5f5 / #f0f9f9)
- No gaps between sections (touch each other)

---

## 📊 CALCULATION LOGIC

```typescript
// Per item cost
cost = price × quantity × frequencyNumber

// Example:
// Price: $78.81/hour
// Quantity: 1 hour
// Frequency: 52 weeks
// Cost = 78.81 × 1 × 52 = $4,098.12

// Total: Sum all item costs
```

---

## 🔍 EFFICIENT SEARCH ALGORITHM

### Search Types Supported:

| Input | Matches |
|-------|---------|
| `01_002` | All items starting with this code |
| `01_002_0107_1_1` | Exact item |
| `gardening` | Items containing "gardening" |
| `self care` | Items with BOTH words |
| `assistance weekday night` | Items with ALL three words |

### Implementation:

**For item numbers** (starts with digit or contains underscore):
- Use `ILIKE 'query%'` for prefix match
- Fast with B-tree index

**For keywords** (everything else):
- Split query into words: `["self", "care", "activities"]`
- Build pattern: `%self%care%activities%`
- Use `ILIKE` to match all words in order
- Order by: exact phrase match first, then by name length

### Required Database Indexes:

```sql
CREATE INDEX idx_support_items_number_pattern
ON ndis_support_items (support_item_number varchar_pattern_ops);

CREATE INDEX idx_support_items_name_trgm
ON ndis_support_items USING GIN (support_item_name gin_trgm_ops);

CREATE EXTENSION IF NOT EXISTS pg_trgm;
```

---

## 📁 COMPONENT STRUCTURE

```
src/
├── app/
│   └── tools/
│       └── ndis-budget-calculator/
│           └── page.tsx                 # Main page
│
├── components/
│   └── ndis/
│       └── BudgetCalculator/
│           ├── index.tsx                # Container
│           ├── StepIndicator.tsx        # "START" banner
│           ├── RegionSelector.tsx       # Question 1
│           ├── CategorySelector.tsx     # Question 2
│           ├── SupportItemSearch.tsx    # Question 3
│           ├── CalculationTable.tsx     # Main table
│           ├── CalculationRow.tsx       # Single row
│           ├── SummaryModal.tsx         # Summary view
│           └── PrintView.tsx            # PDF/Print layout
│
└── hooks/
    └── useBudgetCalculator.ts           # State management
```

---

## 🔌 API ENDPOINTS NEEDED

### 1. Search Support Items
```typescript
GET /api/ndis/search?q={query}&category={num}&region={region}&limit=15

Response: {
  success: true,
  data: [{
    id: string,
    support_item_number: string,
    support_item_name: string,
    support_category_number: number,
    unit: string,
    price: number
  }],
  meta: {
    searchType: 'item_number' | 'keyword',
    count: number
  }
}
```

### 2. Get All Categories
```typescript
GET /api/ndis/categories

Response: {
  data: [{
    category_number: number,
    category_name: string,
    support_purpose: 'Core' | 'Capital' | 'Capacity Building'
  }]
}
```

---

## 💾 STATE MANAGEMENT

```typescript
interface BudgetCalculatorState {
  // Step tracking
  currentStep: 1 | 2 | 3;

  // User selections
  selectedRegion: Region | null;
  selectedCategory: number | null;

  // Budget items
  items: BudgetItem[];

  // UI
  showSummary: boolean;
}

interface BudgetItem {
  id: string;                    // Unique row ID
  supportItem: SupportItem;      // From DB
  price: number;                 // Editable
  quantity: number;              // Default 1
  frequencyNumber: number;       // Default 52
  frequencyType: FrequencyType;  // Week/Fortnight/Month/Year
}

type Region = 'ACT' | 'NSW' | 'NT' | 'QLD' | 'SA' | 'TAS' | 'VIC' | 'WA' | 'Remote' | 'Very Remote';

type FrequencyType = 'Week' | 'Fortnight' | 'Month' | 'Year';
```

---

## ✅ IMPLEMENTATION CHECKLIST

### Phase 1: Foundation
- [ ] Create component structure
- [ ] Set up state management
- [ ] Create API endpoint for categories
- [ ] Create API endpoint for search (with efficient algorithm)
- [ ] Add database indexes

### Phase 2: Step-by-Step Flow
- [ ] Step 1: Region selector (dropdown)
- [ ] Step 2: Category selector (grouped dropdown)
- [ ] Step 3: Search with autocomplete
- [ ] Progressive reveal animation
- [ ] Sticky previous selections

### Phase 3: Calculations
- [ ] Calculation table component
- [ ] Editable price, quantity, frequency fields
- [ ] Live cost calculation
- [ ] Total estimate display
- [ ] Delete row functionality
- [ ] "Add another item" button

### Phase 4: Summary & Export
- [ ] Summary modal/view
- [ ] Group by support purpose
- [ ] Download as PDF functionality
- [ ] Print-friendly CSS
- [ ] Reset with confirmation

### Phase 5: Polish
- [ ] Mobile responsive design
- [ ] Color scheme matching Plan Partners
- [ ] Animations and transitions
- [ ] Loading states
- [ ] Error handling
- [ ] Testing all search types

---

## 🎯 KEY BEHAVIORS

1. **Progressive Disclosure:** Questions reveal ONE AT A TIME as user answers
2. **Category Filtering:** Search results filtered by selected category
3. **Live Calculation:** Cost updates INSTANTLY on any field change
4. **Price Auto-fill:** Based on selected region
5. **Editable Price:** User can override price
6. **No Confirmation Delete:** Simple click to remove item
7. **Reset Warning:** Confirm before clearing all data

---

## ❌ DO NOT

- Show all 3 questions at once
- Use basic HTML `<select>` (use styled dropdowns)
- Calculate only on button click (must be live)
- Use accordion for questions (use progressive reveal)
- Skip the summary view
- Use wrong colors

---

## 📝 SAMPLE TEST DATA

```typescript
const testItem = {
  support_item_number: "01_002_0107_1_1",
  support_item_name: "Assistance With Self-Care Activities - Standard - Weekday Night",
  support_category_number: 1,
  unit: "H",
  price_vic: 78.81,
  price_nsw: 78.81,
  price_remote: 110.33
};

// Test searches:
// - "01_002" → Should find all items starting with 01_002
// - "self care" → Should find items with both words
// - "assistance weekday night" → Should find items with all three words
```

---

## 🚀 READY TO BUILD

All specifications are complete. Implementation should match Plan Partners design exactly, with focus on:
- Clean, professional UI
- Smooth animations
- Fast search
- Live calculations
- Easy-to-use flow

**Build it step by step, testing each phase before moving to the next.**

---

**Last Updated:** 2026-02-05
**Document Status:** Complete & Ready for Implementation
