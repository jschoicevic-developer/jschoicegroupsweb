/**
 * Auth API - Session Route
 * Returns current user session information
 */

import { createClient } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const supabase = createClient();

        // Get current session
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error) {
            console.error('Session error:', error);
            return NextResponse.json(
                { success: false, error: 'Failed to get session' },
                { status: 500 }
            );
        }

        if (!session) {
            return NextResponse.json({
                success: true,
                data: null,
                message: 'No active session',
            });
        }

        return NextResponse.json({
            success: true,
            data: {
                user: session.user,
                expiresAt: session.expires_at,
            },
        });

    } catch (error) {
        console.error('Session error:', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        );
    }
}
