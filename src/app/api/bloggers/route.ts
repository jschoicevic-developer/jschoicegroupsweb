/**
 * Bloggers API - Main Route
 * GET: List all bloggers (role='blogger' users)
 * POST: Create new blogger
 */

import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase-admin';

export async function GET(): Promise<NextResponse> {
    try {
        const supabase = createServerClient();

        const { data: { users }, error } = await supabase.auth.admin.listUsers();

        if (error) {
            console.error('Error listing users:', error);
            return NextResponse.json({ success: false, error: 'Failed to fetch bloggers' }, { status: 500 });
        }

        const bloggers = (users || []).filter(
            (u) => u.user_metadata?.role === 'blogger'
        ).map((u) => ({
            id: u.id,
            email: u.email,
            name: u.user_metadata?.name || u.email,
            bio: u.user_metadata?.bio || '',
            created_at: u.created_at,
        }));

        return NextResponse.json({ success: true, data: bloggers });
    } catch (error) {
        console.error('Error fetching bloggers:', error);
        return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
    }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        const body = await request.json();
        const { email, password, name, bio } = body;

        if (!email || !password || !name) {
            return NextResponse.json(
                { success: false, error: 'Email, password, and name are required' },
                { status: 400 }
            );
        }

        const supabase = createServerClient();

        const { data, error } = await supabase.auth.admin.createUser({
            email,
            password,
            email_confirm: true,
            user_metadata: {
                role: 'blogger',
                name,
                bio: bio || '',
            },
        });

        if (error) {
            console.error('Error creating blogger:', error);
            return NextResponse.json(
                { success: false, error: error.message || 'Failed to create blogger' },
                { status: 400 }
            );
        }

        return NextResponse.json({
            success: true,
            data: {
                id: data.user.id,
                email: data.user.email,
                name: data.user.user_metadata?.name,
                bio: data.user.user_metadata?.bio,
                created_at: data.user.created_at,
            },
            message: 'Blogger created successfully',
        });
    } catch (error) {
        console.error('Error creating blogger:', error);
        return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
    }
}
