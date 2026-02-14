/**
 * Auth API - Logout Route
 * Handles user logout by clearing the Supabase session
 */

import { createClient } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const supabase = createClient();

        // Sign out the user
        const { error } = await supabase.auth.signOut();

        if (error) {
            console.error('Logout error:', error);
            return NextResponse.json(
                { success: false, error: 'Failed to logout' },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Logged out successfully',
        });

    } catch (error) {
        console.error('Logout error:', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        );
    }
}
