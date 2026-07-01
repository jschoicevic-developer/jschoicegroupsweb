/**
 * CRM Type Definitions
 * Complete TypeScript types for the CRM system
 */

// ============================================================================
// LEAD TYPES
// ============================================================================

export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'proposal' | 'won' | 'lost' | 'archived';

export type LeadSource =
    | 'contact_form'
    | 'service_matcher'
    | 'budget_calculator'
    | 'blog_subscription'
    | 'referral'
    | 'phone'
    | 'walk_in'
    | 'other'
    | 'ndis_provider_melbourne'
    | 'google_ads_landing';

export type NdisStatus = 'funded' | 'pending' | 'applying' | 'not_sure';

export type LeadPriority = 'low' | 'normal' | 'high' | 'urgent';

export type PreferredContact = 'email' | 'phone' | 'either';

export interface Lead {
    id: string;

    // Contact Information
    first_name: string;
    last_name: string | null;
    email: string | null;
    phone: string | null;

    // Source Tracking
    source: LeadSource;
    source_page: string | null;
    source_details: Record<string, any> | null;

    // NDIS-Specific Information
    ndis_participant: boolean | null;
    ndis_status: NdisStatus | null;
    ndis_number: string | null;

    // Service Interest
    interested_services: string[] | null;
    service_matcher_answers: Record<string, any> | null;

    // Location
    location: string | null;
    state: string;

    // Communication
    message: string | null;
    preferred_contact: PreferredContact;

    // Budget (from calculator)
    budget_estimate: number | null;
    budget_items: Record<string, any> | null;

    // Lead Management
    status: LeadStatus;
    status_reason: string | null;
    priority: LeadPriority;

    // Assignment
    assigned_to: string | null;
    assigned_at: string | null;

    // Follow-up
    next_followup_date: string | null;
    next_followup_note: string | null;

    // Conversion
    converted_at: string | null;
    client_id: string | null;

    // Notes
    internal_notes: string | null;

    // Metadata
    created_at: string;
    updated_at: string;
    created_by: string | null;

    // UTM Tracking
    utm_source: string | null;
    utm_medium: string | null;
    utm_campaign: string | null;
    utm_content: string | null;
    utm_term: string | null;
}

// ============================================================================
// LEAD ACTIVITY TYPES
// ============================================================================

export type ActivityType =
    | 'created'
    | 'status_changed'
    | 'note_added'
    | 'email_sent'
    | 'call_logged'
    | 'meeting_scheduled'
    | 'assigned'
    | 'followup_set'
    | 'converted'
    | 'other';

export interface LeadActivity {
    id: string;
    lead_id: string;
    activity_type: ActivityType;
    title: string;
    description: string | null;
    old_value: string | null;
    new_value: string | null;
    created_at: string;
    created_by: string | null;
    created_by_name: string | null;
}

// ============================================================================
// LEAD TASK TYPES
// ============================================================================

export type TaskType = 'followup' | 'call' | 'email' | 'meeting' | 'other';

export interface LeadTask {
    id: string;
    lead_id: string;
    title: string;
    description: string | null;
    task_type: TaskType;
    due_date: string;
    due_time: string | null;
    assigned_to: string | null;
    is_completed: boolean;
    completed_at: string | null;
    completed_by: string | null;
    priority: LeadPriority;
    created_at: string;
    created_by: string | null;
}

// ============================================================================
// BLOG TYPES
// ============================================================================

export type BlogStatus = 'draft' | 'published' | 'scheduled' | 'archived';

export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    description: string | null;
    table_of_contents: string | null;
    content: string;
    featured_image: string | null;
    featured_image_alt: string | null;
    category: string | null;
    tags: string[] | null;
    meta_title: string | null;
    meta_description: string | null;
    canonical_url: string | null;
    author_id: string | null;
    author_name: string | null;
    author_avatar: string | null;
    status: BlogStatus;
    published_at: string | null;
    scheduled_for: string | null;
    view_count: number;
    allow_comments: boolean;
    is_featured: boolean;
    faqs: BlogFaq[] | null;
    created_at: string;
    updated_at: string;
}

export interface BlogFaq {
    question: string;
    answer: string;
}

export interface BlogCategory {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    parent_id: string | null;
    display_order: number;
    created_at: string;
}

// ============================================================================
// GALLERY TYPES
// ============================================================================

export interface GalleryItem {
    id: string;
    title: string;
    description: string | null;
    images: string[];
    display_order: number;
    category: string | null;
    created_at: string;
    updated_at: string;
}

// ============================================================================
// USER TYPES
// ============================================================================

export type UserRole = 'admin' | 'manager' | 'staff';

export interface CrmUser {
    id: string;
    display_name: string;
    avatar_url: string | null;
    job_title: string | null;
    phone: string | null;
    role: UserRole;
    permissions: Record<string, any>;
    email_notifications: boolean;
    created_at: string;
    updated_at: string;
    last_login: string | null;
}

// ============================================================================
// API RESPONSE TYPES
// ============================================================================

export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}

export interface PaginatedResponse<T = any> {
    success: boolean;
    data: T[];
    pagination: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}

// ============================================================================
// FORM SUBMISSION TYPES
// ============================================================================

export interface ContactFormData {
    first_name: string;
    last_name?: string;
    email: string;
    phone?: string;
    message?: string;
    preferred_contact?: PreferredContact;
    source?: LeadSource;
    source_page?: string;
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
}

export interface ServiceMatcherLeadData extends ContactFormData {
    source: 'service_matcher';
    service_matcher_answers: Record<string, any>;
    interested_services: string[];
    ndis_participant?: boolean;
    ndis_status?: NdisStatus;
    location?: string;
}
