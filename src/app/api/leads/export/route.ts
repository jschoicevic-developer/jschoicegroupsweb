/**
 * Leads Export API
 * Export leads to CSV format
 * 
 * GET /api/leads/export - Export all leads to CSV
 */

import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase-admin';
import Papa from 'papaparse';

/**
 * GET - Export leads to CSV
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
    try {
        const supabase = createServerClient();
        const searchParams = request.nextUrl.searchParams;

        // Apply same filters as main leads endpoint
        const status = searchParams.get('status');
        const source = searchParams.get('source');
        const dateFrom = searchParams.get('dateFrom');
        const dateTo = searchParams.get('dateTo');

        let query = supabase
            .from('leads')
            .select('*')
            .order('created_at', { ascending: false });

        // Apply filters
        if (status) query = query.eq('status', status);
        if (source) query = query.eq('source', source);
        if (dateFrom) query = query.gte('created_at', dateFrom);
        if (dateTo) query = query.lte('created_at', dateTo);

        const { data, error } = await query;

        if (error) {
            console.error('Database error exporting leads:', error);
            return new NextResponse('Failed to export leads', { status: 500 });
        }

        // Transform data for CSV
        const csvData = (data || []).map((lead) => ({
            'Lead ID': lead.id,
            'First Name': lead.first_name,
            'Last Name': lead.last_name || '',
            'Email': lead.email,
            'Phone': lead.phone || '',
            'Source': lead.source,
            'Status': lead.status,
            'Priority': lead.priority,
            'NDIS Status': lead.ndis_status || '',
            'Location': lead.location || '',
            'State': lead.state,
            'Interested Services': lead.interested_services?.join(', ') || '',
            'Message': lead.message || '',
            'Created At': new Date(lead.created_at).toLocaleString(),
            'Updated At': new Date(lead.updated_at).toLocaleString(),
            'UTM Source': lead.utm_source || '',
            'UTM Medium': lead.utm_medium || '',
            'UTM Campaign': lead.utm_campaign || '',
        }));

        // Generate CSV
        const csv = Papa.unparse(csvData);

        // Generate filename with timestamp
        const timestamp = new Date().toISOString().split('T')[0];
        const filename = `leads-export-${timestamp}.csv`;

        // Return CSV file
        return new NextResponse(csv, {
            headers: {
                'Content-Type': 'text/csv; charset=utf-8',
                'Content-Disposition': `attachment; filename="${filename}"`,
            },
        });

    } catch (error) {
        console.error('Error exporting leads:', error);
        return new NextResponse('Internal server error', { status: 500 });
    }
}
