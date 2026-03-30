/**
 * Facebook Leads API - Single Lead Route
 *
 * GET    /api/facebook-leads/[id]  - Fetch single lead
 * PUT    /api/facebook-leads/[id]  - Update lead
 * DELETE /api/facebook-leads/[id]  - Delete lead
 */

import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase-admin';

interface RouteContext {
    params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, context: RouteContext) {
    try {
        const { id } = await context.params;
        const supabase = createServerClient();

        const { data, error } = await supabase
            .from('facebook_leads')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            if (error.code === 'PGRST116') {
                return NextResponse.json({ success: false, error: 'Lead not found' }, { status: 404 });
            }
            return NextResponse.json({ success: false, error: 'Failed to fetch lead' }, { status: 500 });
        }

        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error('Error fetching facebook lead:', error);
        return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
    }
}

export async function PUT(request: NextRequest, context: RouteContext) {
    try {
        const { id } = await context.params;
        const body = await request.json();
        const supabase = createServerClient();

        const allowedFields = ['status', 'notes', 'campaign_name', 'campaign_id'];
        const updates: Record<string, any> = { updated_at: new Date().toISOString() };
        for (const field of allowedFields) {
            if (field in body) updates[field] = body[field];
        }

        const { data, error } = await supabase
            .from('facebook_leads')
            .update(updates)
            .eq('id', id)
            .select()
            .single();

        if (error) {
            return NextResponse.json({ success: false, error: 'Failed to update lead' }, { status: 500 });
        }

        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error('Error updating facebook lead:', error);
        return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
    try {
        const { id } = await context.params;
        const supabase = createServerClient();

        const { error } = await supabase
            .from('facebook_leads')
            .delete()
            .eq('id', id);

        if (error) {
            return NextResponse.json({ success: false, error: 'Failed to delete lead' }, { status: 500 });
        }

        return NextResponse.json({ success: true, message: 'Lead deleted successfully' });
    } catch (error) {
        console.error('Error deleting facebook lead:', error);
        return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
    }
}
