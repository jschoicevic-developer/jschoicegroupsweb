
import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase-admin';
import { sendDirectEmail } from '@/lib/email';
import type { ApiResponse } from '@/types/crm';

interface RouteContext {
    params: Promise<{ id: string }>;
}

export async function POST(
    request: NextRequest,
    context: RouteContext
): Promise<NextResponse<ApiResponse<any>>> {
    try {
        const { id } = await context.params;
        const body = await request.json();
        const { subject, message, created_by_name } = body;

        if (!subject || !message) {
            return NextResponse.json(
                { success: false, error: 'Subject and message are required' },
                { status: 400 }
            );
        }

        const supabase = createServerClient();

        // 1. Fetch lead data
        const { data: lead, error: fetchError } = await supabase
            .from('leads')
            .select('*')
            .eq('id', id)
            .single();

        if (fetchError || !lead) {
            return NextResponse.json(
                { success: false, error: 'Lead not found' },
                { status: 404 }
            );
        }

        // 2. Send email
        const fullName = `${lead.first_name} ${lead.last_name || ''}`.trim();
        const emailResult = await sendDirectEmail(
            lead.email,
            subject,
            message,
            fullName
        );

        if (!emailResult.success) {
            return NextResponse.json(
                { success: false, error: 'Failed to send email' },
                { status: 500 }
            );
        }

        // 3. Log activity
        const { error: activityError } = await supabase
            .from('lead_activities')
            .insert({
                lead_id: id,
                activity_type: 'email',
                title: `Email Sent: ${subject}`,
                description: message.substring(0, 500) + (message.length > 500 ? '...' : ''),
                created_by_name: created_by_name || 'Admin',
            });

        if (activityError) {
            console.error('Failed to log email activity:', activityError);
            // Don't fail the whole request because the email was already sent
        }

        // 4. Update lead status if it was 'new'
        if (lead.status === 'new') {
            await supabase
                .from('leads')
                .update({ status: 'contacted', updated_at: new Date().toISOString() })
                .eq('id', id);
        }

        return NextResponse.json({
            success: true,
            message: 'Email sent successfully',
        });

    } catch (error) {
        console.error('Error sending email to lead:', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        );
    }
}
