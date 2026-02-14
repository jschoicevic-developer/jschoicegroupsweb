/**
 * Leads API - Single Lead Route
 * Handles operations on individual leads
 * 
 * GET /api/leads/[id] - Get single lead
 * PUT /api/leads/[id] - Update lead
 * DELETE /api/leads/[id] - Delete lead
 * 
 * All endpoints require authentication
 */

import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase-admin';
import type { ApiResponse, Lead } from '@/types/crm';

interface RouteContext {
    params: Promise<{ id: string }>;
}

/**
 * GET - Fetch single lead by ID
 */
export async function GET(
    request: NextRequest,
    context: RouteContext
): Promise<NextResponse<ApiResponse<Lead>>> {
    try {
        const { id } = await context.params;
        const supabase = createServerClient();

        const { data, error } = await supabase
            .from('leads')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            if (error.code === 'PGRST116') {
                return NextResponse.json(
                    { success: false, error: 'Lead not found' },
                    { status: 404 }
                );
            }
            throw error;
        }

        return NextResponse.json({
            success: true,
            data: data as Lead,
        });

    } catch (error) {
        console.error('Error fetching lead:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch lead' },
            { status: 500 }
        );
    }
}

/**
 * PUT - Update lead
 */
export async function PUT(
    request: NextRequest,
    context: RouteContext
): Promise<NextResponse<ApiResponse<Lead>>> {
    try {
        const { id } = await context.params;
        const body = await request.json();
        const supabase = createServerClient();

        // Build update object (only include provided fields)
        const updateData: Partial<Lead> = {};

        // Contact fields
        if (body.first_name !== undefined) updateData.first_name = body.first_name.trim();
        if (body.last_name !== undefined) updateData.last_name = body.last_name?.trim() || null;
        if (body.email !== undefined) updateData.email = body.email.toLowerCase().trim();
        if (body.phone !== undefined) updateData.phone = body.phone?.trim() || null;

        // Status and priority
        if (body.status !== undefined) updateData.status = body.status;
        if (body.status_reason !== undefined) updateData.status_reason = body.status_reason;
        if (body.priority !== undefined) updateData.priority = body.priority;

        // Assignment
        if (body.assigned_to !== undefined) {
            updateData.assigned_to = body.assigned_to;
            if (body.assigned_to) {
                updateData.assigned_at = new Date().toISOString();
            }
        }

        // Follow-up
        if (body.next_followup_date !== undefined) updateData.next_followup_date = body.next_followup_date;
        if (body.next_followup_note !== undefined) updateData.next_followup_note = body.next_followup_note;

        // NDIS info
        if (body.ndis_participant !== undefined) updateData.ndis_participant = body.ndis_participant;
        if (body.ndis_status !== undefined) updateData.ndis_status = body.ndis_status;
        if (body.ndis_number !== undefined) updateData.ndis_number = body.ndis_number;

        // Location
        if (body.location !== undefined) updateData.location = body.location;
        if (body.state !== undefined) updateData.state = body.state;

        // Notes
        if (body.internal_notes !== undefined) updateData.internal_notes = body.internal_notes;

        // Conversion
        if (body.status === 'won') {
            updateData.converted_at = new Date().toISOString();
            if (body.client_id !== undefined) updateData.client_id = body.client_id;
        }

        // Update lead
        const { data, error } = await supabase
            .from('leads')
            .update(updateData)
            .eq('id', id)
            .select()
            .single();

        if (error) {
            console.error('Database error updating lead:', error);
            return NextResponse.json(
                { success: false, error: 'Failed to update lead' },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            data: data as Lead,
            message: 'Lead updated successfully',
        });

    } catch (error) {
        console.error('Error updating lead:', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        );
    }
}

/**
 * DELETE - Delete lead
 */
export async function DELETE(
    request: NextRequest,
    context: RouteContext
): Promise<NextResponse<ApiResponse>> {
    try {
        const { id } = await context.params;
        const supabase = createServerClient();

        const { error } = await supabase
            .from('leads')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Database error deleting lead:', error);
            return NextResponse.json(
                { success: false, error: 'Failed to delete lead' },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Lead deleted successfully',
        });

    } catch (error) {
        console.error('Error deleting lead:', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        );
    }
}
