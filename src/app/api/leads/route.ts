/**
 * Leads API - Main Route
 * Handles lead creation (public) and listing (authenticated)
 * 
 * POST /api/leads - Create new lead (PUBLIC - from website forms)
 * GET /api/leads - List leads with filters (AUTHENTICATED)
 */

import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase-admin';
import { sendNewLeadNotification, sendClientConfirmation } from '@/lib/email';
import type { ApiResponse, PaginatedResponse, Lead } from '@/types/crm';

/**
 * POST - Create new lead
 * PUBLIC endpoint - called from website forms
 */
export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse<Lead>>> {
    try {
        const body = await request.json();
        const supabase = createServerClient();

        // ========================================
        // VALIDATION
        // ========================================

        if (!body.first_name || (!body.email && !body.phone)) {
            return NextResponse.json(
                { success: false, error: 'First name and email or phone are required' },
                { status: 400 }
            );
        }

        // Email format validation (only if email provided)
        if (body.email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(body.email)) {
                return NextResponse.json(
                    { success: false, error: 'Invalid email format' },
                    { status: 400 }
                );
            }
        }

        // ========================================
        // PREPARE LEAD DATA
        // ========================================

        const leadData = {
            // Contact Information
            first_name: body.first_name.trim(),
            last_name: body.last_name?.trim() || null,
            email: body.email.toLowerCase().trim(),
            phone: body.phone?.trim() || null,

            // Source Tracking
            source: body.source || 'contact_form',
            source_page: body.source_page || null,
            source_details: body.source_details || null,

            // NDIS Information
            ndis_participant: body.ndis_participant ?? null,
            ndis_status: body.ndis_status || null,
            ndis_number: body.ndis_number || null,

            // Service Interest
            interested_services: body.interested_services || null,
            service_matcher_answers: body.service_matcher_answers || null,

            // Location
            location: body.location || null,
            state: body.state || 'VIC',

            // Communication
            message: body.message || null,
            preferred_contact: body.preferred_contact || 'email',

            // Budget
            budget_estimate: body.budget_estimate || null,
            budget_items: body.budget_items || null,

            // Lead Management
            status: 'new' as const,
            priority: body.source === 'service_matcher' ? 'high' : 'normal',

            // UTM Tracking
            utm_source: body.utm_source || null,
            utm_medium: body.utm_medium || null,
            utm_campaign: body.utm_campaign || null,
            utm_content: body.utm_content || null,
            utm_term: body.utm_term || null,
        };

        // ========================================
        // INSERT LEAD
        // ========================================

        const { data, error } = await supabase
            .from('leads')
            .insert(leadData)
            .select()
            .single();

        if (error) {
            console.error('Database error creating lead:', error);
            return NextResponse.json(
                { success: false, error: 'Failed to create lead' },
                { status: 500 }
            );
        }

        // ========================================
        // SEND NOTIFICATION (async, don't wait)
        // ========================================

        Promise.all([
            sendNewLeadNotification(data as Lead),
            sendClientConfirmation(data as Lead)
        ]).catch((err) => {
            console.error('Failed to send notifications:', err);
        });

        // ========================================
        // RETURN SUCCESS
        // ========================================

        return NextResponse.json({
            success: true,
            data: data as Lead,
            message: 'Lead created successfully',
        });

    } catch (error) {
        console.error('Lead creation error:', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        );
    }
}

/**
 * GET - List leads with filters and pagination
 * AUTHENTICATED endpoint
 */
export async function GET(request: NextRequest): Promise<NextResponse<PaginatedResponse<Lead>>> {
    try {
        const supabase = createServerClient();
        const searchParams = request.nextUrl.searchParams;

        // ========================================
        // PAGINATION
        // ========================================

        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '20');
        const offset = (page - 1) * limit;

        // ========================================
        // FILTERS
        // ========================================

        const status = searchParams.get('status');
        const source = searchParams.get('source');
        const search = searchParams.get('search');
        const assigned = searchParams.get('assigned');
        const priority = searchParams.get('priority');
        const dateFrom = searchParams.get('dateFrom');
        const dateTo = searchParams.get('dateTo');

        // ========================================
        // BUILD QUERY
        // ========================================

        let query = supabase
            .from('leads')
            .select('*', { count: 'exact' })
            .order('created_at', { ascending: false })
            .range(offset, offset + limit - 1);

        // Apply filters
        if (status) {
            query = query.eq('status', status);
        }

        if (source) {
            query = query.eq('source', source);
        }

        if (assigned) {
            if (assigned === 'unassigned') {
                query = query.is('assigned_to', null);
            } else {
                query = query.eq('assigned_to', assigned);
            }
        }

        if (priority) {
            query = query.eq('priority', priority);
        }

        if (dateFrom) {
            query = query.gte('created_at', dateFrom);
        }

        if (dateTo) {
            query = query.lte('created_at', dateTo);
        }

        if (search) {
            // Search across multiple fields
            query = query.or(
                `first_name.ilike.%${search}%,` +
                `last_name.ilike.%${search}%,` +
                `email.ilike.%${search}%,` +
                `phone.ilike.%${search}%`
            );
        }

        // ========================================
        // EXECUTE QUERY
        // ========================================

        const { data, error, count } = await query;

        if (error) {
            console.error('Database error fetching leads:', error);
            return NextResponse.json(
                {
                    success: false,
                    data: [],
                    pagination: { total: 0, page, limit, totalPages: 0 }
                },
                { status: 500 }
            );
        }

        // ========================================
        // RETURN RESULTS
        // ========================================

        return NextResponse.json({
            success: true,
            data: (data || []) as Lead[],
            pagination: {
                total: count || 0,
                page,
                limit,
                totalPages: Math.ceil((count || 0) / limit),
            },
        });

    } catch (error) {
        console.error('Lead fetch error:', error);
        return NextResponse.json(
            {
                success: false,
                data: [],
                pagination: { total: 0, page: 1, limit: 20, totalPages: 0 }
            },
            { status: 500 }
        );
    }
}
