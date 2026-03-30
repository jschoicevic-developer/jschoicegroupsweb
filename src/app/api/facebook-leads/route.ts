/**
 * Facebook Leads API - Main Route
 *
 * GET  /api/facebook-leads  - List Facebook leads with filters (AUTHENTICATED)
 * POST /api/facebook-leads  - Create a new Facebook lead
 */

import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase-admin';

export interface FacebookLead {
    id: string;
    full_name: string;
    email: string | null;
    phone: string | null;
    campaign_id: string | null;
    campaign_name: string | null;
    ad_id: string | null;
    ad_name: string | null;
    form_id: string | null;
    form_name: string | null;
    status: 'new' | 'contacted' | 'qualified' | 'quoted' | 'won' | 'lost';
    notes: string | null;
    created_at: string;
    updated_at: string;
}

export async function GET(request: NextRequest) {
    try {
        const supabase = createServerClient();
        const searchParams = request.nextUrl.searchParams;

        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '100');
        const offset = (page - 1) * limit;

        const status = searchParams.get('status');
        const campaign = searchParams.get('campaign');
        const search = searchParams.get('search');

        let query = supabase
            .from('facebook_leads')
            .select('*', { count: 'exact' })
            .order('created_at', { ascending: false })
            .range(offset, offset + limit - 1);

        if (status) query = query.eq('status', status);
        if (campaign) query = query.eq('campaign_name', campaign);
        if (search) {
            query = query.or(
                `full_name.ilike.%${search}%,` +
                `email.ilike.%${search}%,` +
                `phone.ilike.%${search}%,` +
                `campaign_name.ilike.%${search}%`
            );
        }

        const { data, error, count } = await query;

        if (error) {
            console.error('DB error fetching facebook_leads:', error);
            return NextResponse.json(
                { success: false, data: [], pagination: { total: 0, page, limit, totalPages: 0 } },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            data: (data || []) as FacebookLead[],
            pagination: {
                total: count || 0,
                page,
                limit,
                totalPages: Math.ceil((count || 0) / limit),
            },
        });
    } catch (error) {
        console.error('Facebook leads fetch error:', error);
        return NextResponse.json(
            { success: false, data: [], pagination: { total: 0, page: 1, limit: 100, totalPages: 0 } },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const supabase = createServerClient();

        if (!body.full_name) {
            return NextResponse.json(
                { success: false, error: 'full_name is required' },
                { status: 400 }
            );
        }

        const leadData = {
            full_name: body.full_name.trim(),
            email: body.email?.toLowerCase().trim() || null,
            phone: body.phone?.trim() || null,
            campaign_id: body.campaign_id || null,
            campaign_name: body.campaign_name || null,
            ad_id: body.ad_id || null,
            ad_name: body.ad_name || null,
            form_id: body.form_id || null,
            form_name: body.form_name || null,
            status: 'new' as const,
            notes: body.notes || null,
        };

        const { data, error } = await supabase
            .from('facebook_leads')
            .insert(leadData)
            .select()
            .single();

        if (error) {
            console.error('DB error creating facebook lead:', error);
            return NextResponse.json(
                { success: false, error: 'Failed to create lead' },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error('Facebook lead creation error:', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        );
    }
}
