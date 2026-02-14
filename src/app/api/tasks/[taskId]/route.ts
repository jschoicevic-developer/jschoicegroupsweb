/**
 * Task Update API
 * Handles updating and completing individual tasks
 * 
 * PUT /api/tasks/[taskId] - Update task
 * PATCH /api/tasks/[taskId]/complete - Mark task as complete
 */

import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase-admin';
import type { ApiResponse, LeadTask } from '@/types/crm';

interface RouteContext {
    params: Promise<{ taskId: string }>;
}

/**
 * PUT - Update task
 */
export async function PUT(
    request: NextRequest,
    context: RouteContext
): Promise<NextResponse<ApiResponse<LeadTask>>> {
    try {
        const { taskId } = await context.params;
        const body = await request.json();
        const supabase = createServerClient();

        // Build update object
        const updateData: Partial<LeadTask> = {};

        if (body.title !== undefined) updateData.title = body.title;
        if (body.description !== undefined) updateData.description = body.description;
        if (body.task_type !== undefined) updateData.task_type = body.task_type;
        if (body.due_date !== undefined) updateData.due_date = body.due_date;
        if (body.due_time !== undefined) updateData.due_time = body.due_time;
        if (body.assigned_to !== undefined) updateData.assigned_to = body.assigned_to;
        if (body.priority !== undefined) updateData.priority = body.priority;

        const { data, error } = await supabase
            .from('lead_tasks')
            .update(updateData)
            .eq('id', taskId)
            .select()
            .single();

        if (error) {
            console.error('Database error updating task:', error);
            return NextResponse.json(
                { success: false, error: 'Failed to update task' },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            data: data as LeadTask,
            message: 'Task updated successfully',
        });

    } catch (error) {
        console.error('Error updating task:', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        );
    }
}

/**
 * PATCH - Mark task as complete/incomplete
 */
export async function PATCH(
    request: NextRequest,
    context: RouteContext
): Promise<NextResponse<ApiResponse<LeadTask>>> {
    try {
        const { taskId } = await context.params;
        const body = await request.json();
        const supabase = createServerClient();

        const isCompleted = body.is_completed ?? true;

        const { data, error } = await supabase
            .from('lead_tasks')
            .update({
                is_completed: isCompleted,
                completed_at: isCompleted ? new Date().toISOString() : null,
            })
            .eq('id', taskId)
            .select()
            .single();

        if (error) {
            console.error('Database error completing task:', error);
            return NextResponse.json(
                { success: false, error: 'Failed to complete task' },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            data: data as LeadTask,
            message: isCompleted ? 'Task completed' : 'Task reopened',
        });

    } catch (error) {
        console.error('Error completing task:', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        );
    }
}

/**
 * DELETE - Delete task
 */
export async function DELETE(
    request: NextRequest,
    context: RouteContext
): Promise<NextResponse<ApiResponse>> {
    try {
        const { taskId } = await context.params;
        const supabase = createServerClient();

        const { error } = await supabase
            .from('lead_tasks')
            .delete()
            .eq('id', taskId);

        if (error) {
            console.error('Database error deleting task:', error);
            return NextResponse.json(
                { success: false, error: 'Failed to delete task' },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Task deleted successfully',
        });

    } catch (error) {
        console.error('Error deleting task:', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        );
    }
}
