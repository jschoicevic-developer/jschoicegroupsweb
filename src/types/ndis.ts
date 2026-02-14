// =====================================================
// NDIS Types & Interfaces
// =====================================================

export type Region =
  | 'ACT'
  | 'NSW'
  | 'NT'
  | 'QLD'
  | 'SA'
  | 'TAS'
  | 'VIC'
  | 'WA'
  | 'REMOTE'
  | 'VERY_REMOTE';

export type SupportPurpose = 'Core' | 'Capital' | 'Capacity Building';

export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'converted' | 'closed';

export type FrequencyType = 'weekly' | 'fortnightly' | 'monthly' | 'yearly';

// Plan Partners Budget Calculator frequency types (capitalized)
export type BudgetFrequencyType = 'Week' | 'Fortnight' | 'Month' | 'Year' | 'Day' | 'One-off';

// =====================================================
// Database Tables
// =====================================================

export interface NdisSupportItem {
  id: string;
  support_item_number: string;
  support_item_name: string;
  registration_group_number: number | null;
  registration_group_name: string | null;
  support_category_number: number;
  support_category_name: string;
  support_purpose: string | null;
  unit: string;
  price_act: number | null;
  price_nsw: number | null;
  price_nt: number | null;
  price_qld: number | null;
  price_sa: number | null;
  price_tas: number | null;
  price_vic: number | null;
  price_wa: number | null;
  price_remote: number | null;
  price_very_remote: number | null;
  quote_required: boolean;
  non_face_to_face: boolean;
  provider_travel: boolean;
  short_notice_cancellations: boolean;
  ndia_requested_reports: boolean;
  irregular_sil_supports: boolean;
  created_at: string;
  updated_at: string;
}

export interface NdisCategory {
  id: string;
  category_number: number;
  category_name: string;
  support_purpose: SupportPurpose;
  created_at: string;
}

export interface JsChoiceService {
  id: string;
  name: string;
  slug: string;
  short_description: string | null;
  full_description: string | null;
  ndis_category_numbers: number[];
  icon_name: string | null;
  image_url: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Lead {
  id: string;
  first_name: string;
  last_name: string | null;
  email: string;
  phone: string | null;
  source: string;
  source_page: string | null;
  interested_services: string[] | null;
  ndis_participant: boolean | null;
  ndis_number: string | null;
  location: string | null;
  message: string | null;
  budget_estimate: number | null;
  status: LeadStatus;
  created_at: string;
  updated_at: string;
}

export interface NdisPriceUpdateLog {
  id: string;
  update_date: string;
  file_hash: string | null;
  source_url: string | null;
  total_items: number;
  items_added: number;
  items_removed: number;
  prices_changed: number;
  status: string;
  error_message: string | null;
  created_at: string;
}

// =====================================================
// API Request/Response Types
// =====================================================

export interface SearchParams {
  query: string;
  category?: number;
  limit?: number;
  offset?: number;
  showAll?: boolean; // Flag to fetch all items without filter
}

export interface SearchResult {
  items: NdisSupportItem[];
  total: number;
  hasMore: boolean;
}

export interface PricesByRegion {
  ACT: number | null;
  NSW: number | null;
  NT: number | null;
  QLD: number | null;
  SA: number | null;
  TAS: number | null;
  VIC: number | null;
  WA: number | null;
  REMOTE: number | null;
  VERY_REMOTE: number | null;
}

export interface SupportItemDetail extends NdisSupportItem {
  prices: PricesByRegion;
  claimRules: {
    quoteRequired: boolean;
    nonFaceToFace: boolean;
    providerTravel: boolean;
    shortNoticeCancellations: boolean;
    ndiaRequestedReports: boolean;
    irregularSilSupports: boolean;
  };
}

// =====================================================
// Budget Calculator Types
// =====================================================

// Legacy budget item (old calculator)
export interface BudgetItem {
  id: string;
  supportItem: NdisSupportItem;
  quantity: number;
  frequency: FrequencyType;
  region: Region;
  totalAnnualCost: number;
}

// Plan Partners Budget Calculator item
export interface PlanPartnersBudgetItem {
  id: string;                        // Unique row ID
  supportItem: NdisSupportItem;      // From database
  price: number;                     // Editable price
  quantity: number;                  // Hours/units (default 1)
  frequencyNumber: number;           // 52 for weekly, 26 fortnightly, etc.
  frequencyType: BudgetFrequencyType; // Week/Fortnight/Month/Year
  cost: number;                      // Calculated: price × quantity × frequencyNumber
}

// Budget Calculator State
export interface BudgetCalculatorState {
  currentStep: 1 | 2 | 3;            // Progressive disclosure step
  selectedRegion: Region | null;      // Selected region/state
  selectedCategory: number | null;    // Selected category number
  items: PlanPartnersBudgetItem[];   // Budget items
  showSummary: boolean;              // Summary modal visibility
}

// Category with support purpose
export interface CategoryWithPurpose {
  category_number: number;
  category_name: string;
  support_purpose: SupportPurpose;
}

export interface BudgetSummary {
  items: BudgetItem[];
  totalAnnualCost: number;
  totalByCategory: Record<string, number>;
  totalByPurpose: Record<SupportPurpose, number>;
}

// Summary grouped by support purpose
export interface PlanPartnersSummary {
  core: {
    items: PlanPartnersBudgetItem[];
    total: number;
  };
  capital: {
    items: PlanPartnersBudgetItem[];
    total: number;
  };
  capacityBuilding: {
    items: PlanPartnersBudgetItem[];
    total: number;
  };
  grandTotal: number;
}

// =====================================================
// Service Matcher Types
// =====================================================

export interface ServiceMatcherAnswers {
  supportTypes: string[];
  isNdisParticipant: boolean;
  melbourneArea: string;
}

export interface MatchedService extends JsChoiceService {
  matchScore: number;
  matchReason: string;
}

export interface LeadFormData {
  firstName: string;
  lastName?: string;
  email: string;
  phone?: string;
  message?: string;
  ndisNumber?: string;
}

export interface ServiceMatchResult {
  answers: ServiceMatcherAnswers;
  matchedServices: MatchedService[];
  leadCaptured: boolean;
}

// =====================================================
// Helper Types
// =====================================================

export interface MelbourneArea {
  name: string;
  suburbs: string[];
}

export const MELBOURNE_AREAS: MelbourneArea[] = [
  {
    name: 'Western Suburbs',
    suburbs: ['Point Cook', 'Werribee', 'Hoppers Crossing', 'Williams Landing', 'Laverton', 'Altona', 'Truganina', 'Footscray', 'Tarneit', 'Altona Meadows']
  },
  {
    name: 'Northern Suburbs',
    suburbs: ['Craigieburn', 'South Morang', 'Epping', 'Greensborough', 'Reservoir']
  },
  {
    name: 'Eastern Suburbs',
    suburbs: ['Box Hill', 'Ringwood', 'Blackburn', 'Doncaster']
  },
  {
    name: 'South Eastern Suburbs',
    suburbs: ['Dandenong', 'Berwick', 'Cranbourne', 'Frankston']
  },
  {
    name: 'Regional Victoria',
    suburbs: ['Geelong', 'Lara', 'Shepperton', 'Ballarat']
  }
];

export const FREQUENCY_MULTIPLIERS: Record<FrequencyType, number> = {
  weekly: 52,
  fortnightly: 26,
  monthly: 12,
  yearly: 1
};

export const REGION_LABELS: Record<Region, string> = {
  ACT: 'Australian Capital Territory',
  NSW: 'New South Wales',
  NT: 'Northern Territory',
  QLD: 'Queensland',
  SA: 'South Australia',
  TAS: 'Tasmania',
  VIC: 'Victoria',
  WA: 'Western Australia',
  REMOTE: 'Remote Areas',
  VERY_REMOTE: 'Very Remote Areas'
};
