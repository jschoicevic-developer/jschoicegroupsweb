/**
 * Analytics API
 * Provides analytics data for the CRM dashboard
 * 
 * GET /api/analytics/leads - Lead analytics
 * GET /api/analytics/overview - Overall CRM stats
 */

import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase-admin';

/**
 * GET - Lead analytics
 * Returns lead statistics and trends
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
    try {
        const supabase = createServerClient();
        const searchParams = request.nextUrl.searchParams;
        const days = parseInt(searchParams.get('days') || '30');

        // Calculate date range
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - days);
        const startDateStr = startDate.toISOString();

        // ========================================
        // LEADS BY STATUS
        // ========================================

        const { data: allLeads } = await supabase
            .from('leads')
            .select('status, source, priority, created_at');

        const byStatus: Record<string, number> = {};
        const bySource: Record<string, number> = {};
        const byPriority: Record<string, number> = {};
        const recentLeads: Record<string, number> = {};

        (allLeads || []).forEach((lead) => {
            // Count by status
            byStatus[lead.status] = (byStatus[lead.status] || 0) + 1;

            // Count by source
            bySource[lead.source] = (bySource[lead.source] || 0) + 1;

            // Count by priority
            byPriority[lead.priority] = (byPriority[lead.priority] || 0) + 1;

            // Count recent leads by date
            const leadDate = new Date(lead.created_at);
            if (leadDate >= startDate) {
                const dateKey = leadDate.toISOString().split('T')[0];
                recentLeads[dateKey] = (recentLeads[dateKey] || 0) + 1;
            }
        });

        // ========================================
        // CONVERSION RATE
        // ========================================

        const totalLeads = allLeads?.length || 0;
        const wonLeads = byStatus['won'] || 0;
        const lostLeads = byStatus['lost'] || 0;
        const conversionRate = totalLeads > 0 ? (wonLeads / totalLeads) * 100 : 0;

        // ========================================
        // RECENT ACTIVITY
        // ========================================

        const { data: recentActivity } = await supabase
            .from('lead_activities')
            .select('created_at')
            .gte('created_at', startDateStr);

        const activityByDate: Record<string, number> = {};
        (recentActivity || []).forEach((activity) => {
            const dateKey = new Date(activity.created_at).toISOString().split('T')[0];
            activityByDate[dateKey] = (activityByDate[dateKey] || 0) + 1;
        });

        // ========================================
        // RESPONSE
        // ========================================

        return NextResponse.json({
            success: true,
            data: {
                summary: {
                    total: totalLeads,
                    new: byStatus['new'] || 0,
                    contacted: byStatus['contacted'] || 0,
                    qualified: byStatus['qualified'] || 0,
                    won: wonLeads,
                    lost: lostLeads,
                    conversionRate: parseFloat(conversionRate.toFixed(2)),
                },
                byStatus,
                bySource,
                byPriority,
                trends: {
                    leads: recentLeads,
                    activity: activityByDate,
                },
                period: {
                    days,
                    startDate: startDateStr,
                    endDate: new Date().toISOString(),
                },
            },
        });

    } catch (error) {
        console.error('Analytics error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch analytics' },
            { status: 500 }
        );
    }
}
