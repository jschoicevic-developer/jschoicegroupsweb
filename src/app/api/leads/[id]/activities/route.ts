/**
 * Lead Activities API
 * Handles activity log for leads
 * 
 * GET /api/leads/[id]/activities - Get all activities for a lead
 * POST /api/leads/[id]/activities - Add new activity
 */

import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase-admin';
import type { ApiResponse, LeadActivity } from '@/types/crm';

interface RouteContext {
    params: Promise<{ id: string }>;
}

/**
 * GET - Fetch all activities for a lead
 */
export async function GET(
    request: NextRequest,
    context: RouteContext
): Promise<NextResponse<ApiResponse<LeadActivity[]>>> {
    try {
        const { id } = await context.params;
        const supabase = createServerClient();

        const { data, error } = await supabase
            .from('lead_activities')
            .select('*')
            .eq('lead_id', id)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Database error fetching activities:', error);
            return NextResponse.json(
                { success: false, error: 'Failed to fetch activities' },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            data: (data || []) as LeadActivity[],
        });

    } catch (error) {
        console.error('Error fetching activities:', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        );
    }
}

/**
 * POST - Add new activity to lead
 */
export async function POST(
    request: NextRequest,
    context: RouteContext
): Promise<NextResponse<ApiResponse<LeadActivity>>> {
    try {
        const { id } = await context.params;
        const body = await request.json();
        const supabase = createServerClient();

        // Validation
        if (!body.activity_type || !body.title) {
            return NextResponse.json(
                { success: false, error: 'Activity type and title are required' },
                { status: 400 }
            );
        }

        // Prepare activity data
        const activityData = {
            lead_id: id,
            activity_type: body.activity_type,
            title: body.title,
            description: body.description || null,
            old_value: body.old_value || null,
            new_value: body.new_value || null,
            created_by_name: body.created_by_name || 'System',
        };

        // Insert activity
        const { data, error } = await supabase
            .from('lead_activities')
            .insert(activityData)
            .select()
            .single();

        if (error) {
            console.error('Database error creating activity:', error);
            return NextResponse.json(
                { success: false, error: 'Failed to create activity' },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            data: data as LeadActivity,
            message: 'Activity added successfully',
        });

    } catch (error) {
        console.error('Error creating activity:', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        );
    }
}
