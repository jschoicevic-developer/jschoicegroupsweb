/**
 * Dashboard Overview Analytics API
 * Provides high-level stats for the admin dashboard
 * 
 * GET /api/analytics/overview - Overall CRM statistics
 */

import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase-admin';

/**
 * GET - Dashboard overview statistics
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
    try {
        const supabase = createServerClient();

        // Calculate date ranges
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const thisWeekStart = new Date(today);
        thisWeekStart.setDate(today.getDate() - today.getDay());
        const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);

        // ========================================
        // LEAD COUNTS
        // ========================================

        const { count: totalLeads } = await supabase
            .from('leads')
            .select('*', { count: 'exact', head: true });

        const { count: newLeads } = await supabase
            .from('leads')
            .select('*', { count: 'exact', head: true })
            .eq('status', 'new');

        const { count: qualifiedLeads } = await supabase
            .from('leads')
            .select('*', { count: 'exact', head: true })
            .eq('status', 'qualified');

        const { count: wonLeads } = await supabase
            .from('leads')
            .select('*', { count: 'exact', head: true })
            .eq('status', 'won');

        const { count: todayLeads } = await supabase
            .from('leads')
            .select('*', { count: 'exact', head: true })
            .gte('created_at', today.toISOString());

        const { count: thisWeekLeads } = await supabase
            .from('leads')
            .select('*', { count: 'exact', head: true })
            .gte('created_at', thisWeekStart.toISOString());

        const { count: thisMonthLeads } = await supabase
            .from('leads')
            .select('*', { count: 'exact', head: true })
            .gte('created_at', thisMonthStart.toISOString());

        // ========================================
        // BLOG COUNTS
        // ========================================

        const { count: totalPosts } = await supabase
            .from('blog_posts')
            .select('*', { count: 'exact', head: true });

        const { count: publishedPosts } = await supabase
            .from('blog_posts')
            .select('*', { count: 'exact', head: true })
            .eq('status', 'published');

        const { count: draftPosts } = await supabase
            .from('blog_posts')
            .select('*', { count: 'exact', head: true })
            .eq('status', 'draft');

        const { count: scheduledPosts } = await supabase
            .from('blog_posts')
            .select('*', { count: 'exact', head: true })
            .eq('status', 'scheduled');

        // ========================================
        // TASK COUNTS
        // ========================================

        const { count: pendingTasks } = await supabase
            .from('lead_tasks')
            .select('*', { count: 'exact', head: true })
            .eq('is_completed', false);

        const { count: overdueTasks } = await supabase
            .from('lead_tasks')
            .select('*', { count: 'exact', head: true })
            .eq('is_completed', false)
            .lt('due_date', today.toISOString().split('T')[0]);

        const { count: todayTasks } = await supabase
            .from('lead_tasks')
            .select('*', { count: 'exact', head: true })
            .eq('is_completed', false)
            .eq('due_date', today.toISOString().split('T')[0]);

        // ========================================
        // RECENT ACTIVITY
        // ========================================

        const { data: recentLeads } = await supabase
            .from('leads')
            .select('id, first_name, last_name, email, source, status, created_at')
            .order('created_at', { ascending: false })
            .limit(5);

        const { data: recentActivities } = await supabase
            .from('lead_activities')
            .select('*, leads(first_name, last_name)')
            .order('created_at', { ascending: false })
            .limit(10);

        // ========================================
        // RESPONSE
        // ========================================

        return NextResponse.json({
            success: true,
            data: {
                leads: {
                    total: totalLeads || 0,
                    new: newLeads || 0,
                    qualified: qualifiedLeads || 0,
                    won: wonLeads || 0,
                    today: todayLeads || 0,
                    thisWeek: thisWeekLeads || 0,
                    thisMonth: thisMonthLeads || 0,
                },
                blog: {
                    total: totalPosts || 0,
                    published: publishedPosts || 0,
                    draft: draftPosts || 0,
                    scheduled: scheduledPosts || 0,
                },
                tasks: {
                    pending: pendingTasks || 0,
                    overdue: overdueTasks || 0,
                    today: todayTasks || 0,
                },
                recent: {
                    leads: recentLeads || [],
                    activities: recentActivities || [],
                },
            },
        });

    } catch (error) {
        console.error('Dashboard overview error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch dashboard data' },
            { status: 500 }
        );
    }
}
