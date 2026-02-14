/**
 * Lead Tasks API
 * Handles tasks/reminders for leads
 * 
 * GET /api/leads/[id]/tasks - Get all tasks for a lead
 * POST /api/leads/[id]/tasks - Create new task
 */

import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase-admin';
import type { ApiResponse, LeadTask } from '@/types/crm';

interface RouteContext {
    params: Promise<{ id: string }>;
}

/**
 * GET - Fetch all tasks for a lead
 */
export async function GET(
    request: NextRequest,
    context: RouteContext
): Promise<NextResponse<ApiResponse<LeadTask[]>>> {
    try {
        const { id } = await context.params;
        const supabase = createServerClient();
        const searchParams = request.nextUrl.searchParams;
        const includeCompleted = searchParams.get('includeCompleted') === 'true';

        let query = supabase
            .from('lead_tasks')
            .select('*')
            .eq('lead_id', id)
            .order('due_date', { ascending: true });

        // Filter out completed tasks unless requested
        if (!includeCompleted) {
            query = query.eq('is_completed', false);
        }

        const { data, error } = await query;

        if (error) {
            console.error('Database error fetching tasks:', error);
            return NextResponse.json(
                { success: false, error: 'Failed to fetch tasks' },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            data: (data || []) as LeadTask[],
        });

    } catch (error) {
        console.error('Error fetching tasks:', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        );
    }
}

/**
 * POST - Create new task for lead
 */
export async function POST(
    request: NextRequest,
    context: RouteContext
): Promise<NextResponse<ApiResponse<LeadTask>>> {
    try {
        const { id } = await context.params;
        const body = await request.json();
        const supabase = createServerClient();

        // Validation
        if (!body.title || !body.due_date) {
            return NextResponse.json(
                { success: false, error: 'Title and due date are required' },
                { status: 400 }
            );
        }

        // Prepare task data
        const taskData = {
            lead_id: id,
            title: body.title,
            description: body.description || null,
            task_type: body.task_type || 'followup',
            due_date: body.due_date,
            due_time: body.due_time || null,
            assigned_to: body.assigned_to || null,
            priority: body.priority || 'normal',
            is_completed: false,
        };

        // Insert task
        const { data, error } = await supabase
            .from('lead_tasks')
            .insert(taskData)
            .select()
            .single();

        if (error) {
            console.error('Database error creating task:', error);
            return NextResponse.json(
                { success: false, error: 'Failed to create task' },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            data: data as LeadTask,
            message: 'Task created successfully',
        });

    } catch (error) {
        console.error('Error creating task:', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        );
    }
}
