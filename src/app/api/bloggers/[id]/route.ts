/**
 * Bloggers API - Individual Blogger Route
 * GET: Get single blogger
 * PUT: Update blogger name/bio
 * DELETE: Delete blogger
 */

import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase-admin';

export async function GET(
    _request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
    try {
        const { id } = await params;
        const supabase = createServerClient();
        const { data: { user }, error } = await supabase.auth.admin.getUserById(id);

        if (error || !user) {
            return NextResponse.json({ success: false, error: 'Blogger not found' }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            data: {
                id: user.id,
                email: user.email,
                name: user.user_metadata?.name || user.email,
                bio: user.user_metadata?.bio || '',
                created_at: user.created_at,
            },
        });
    } catch (error) {
        console.error('Error fetching blogger:', error);
        return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
    try {
        const { id } = await params;
        const body = await request.json();
        const { name, bio } = body;

        const supabase = createServerClient();

        // Get existing user metadata first
        const { data: { user: existingUser } } = await supabase.auth.admin.getUserById(id);
        const existingMeta = existingUser?.user_metadata || {};

        const { data, error } = await supabase.auth.admin.updateUserById(id, {
            user_metadata: {
                ...existingMeta,
                ...(name !== undefined && { name }),
                ...(bio !== undefined && { bio }),
            },
        });

        if (error) {
            console.error('Error updating blogger:', error);
            return NextResponse.json({ success: false, error: 'Failed to update blogger' }, { status: 400 });
        }

        return NextResponse.json({
            success: true,
            data: {
                id: data.user.id,
                email: data.user.email,
                name: data.user.user_metadata?.name,
                bio: data.user.user_metadata?.bio,
            },
            message: 'Blogger updated successfully',
        });
    } catch (error) {
        console.error('Error updating blogger:', error);
        return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
    }
}

export async function DELETE(
    _request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
    try {
        const { id } = await params;
        const supabase = createServerClient();

        const { error } = await supabase.auth.admin.deleteUser(id);

        if (error) {
            console.error('Error deleting blogger:', error);
            return NextResponse.json({ success: false, error: 'Failed to delete blogger' }, { status: 400 });
        }

        return NextResponse.json({ success: true, message: 'Blogger deleted successfully' });
    } catch (error) {
        console.error('Error deleting blogger:', error);
        return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
    }
}
