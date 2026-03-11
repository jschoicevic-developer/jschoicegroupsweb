
import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase-admin';
import type { ApiResponse, BlogPost } from '@/types/crm';

interface RouteContext {
    params: Promise<{ slug: string }>;
}

/**
 * GET /api/blog/[slug] - Get a single blog post
 */
export async function GET(
    request: NextRequest,
    context: RouteContext
): Promise<NextResponse<ApiResponse<BlogPost>>> {
    try {
        const { slug } = await context.params;
        const supabase = createServerClient();
        const searchParams = request.nextUrl.searchParams;
        const isAdmin = searchParams.get('admin') === 'true';

        let query = supabase
            .from('blog_posts')
            .select('*')
            .eq('slug', slug)
            .single();

        const { data, error } = await query;

        if (error || !data) {
            return NextResponse.json(
                { success: false, error: 'Post not found' },
                { status: 404 }
            );
        }

        // Public check
        const now = new Date().toISOString();
        if (!isAdmin && data.status !== 'published') {
            // If it's scheduled but the time has passed, we treat it as live (Lazy Publishing)
            if (data.status === 'scheduled' && data.scheduled_for && data.scheduled_for <= now) {
                // Trigger lazy publish in background
                supabase
                    .from('blog_posts')
                    .update({ status: 'published', published_at: now, updated_at: now })
                    .eq('id', data.id)
                    .then(({ error }) => {
                        if (error) console.error('Lazy publish error:', error);
                    });
            } else {
                return NextResponse.json(
                    { success: false, error: 'Post not available' },
                    { status: 403 }
                );
            }
        }

        return NextResponse.json({
            success: true,
            data: data as BlogPost,
        });

    } catch (error) {
        console.error('Error fetching blog post:', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        );
    }
}

/**
 * PATCH /api/blog/[slug] - Update a blog post
 */
export async function PATCH(
    request: NextRequest,
    context: RouteContext
): Promise<NextResponse<ApiResponse<BlogPost>>> {
    try {
        const { slug: oldSlug } = await context.params;
        const body = await request.json();
        const supabase = createServerClient();

        // Ownership check: if author_id is provided in body, verify it matches the post
        if (body.author_id) {
            const { data: existing } = await supabase
                .from('blog_posts')
                .select('author_id')
                .eq('slug', oldSlug)
                .single();

            if (existing && existing.author_id && existing.author_id !== body.author_id) {
                return NextResponse.json(
                    { success: false, error: 'You do not have permission to edit this post' },
                    { status: 403 }
                );
            }
        }

        // Prepare update data
        const updateData: any = {
            updated_at: new Date().toISOString(),
        };

        const allowedFields = [
            'title', 'slug', 'excerpt', 'content', 'featured_image',
            'category', 'tags', 'author_name', 'status', 'published_at', 'scheduled_for'
        ];

        allowedFields.forEach(field => {
            if (body[field] !== undefined) {
                updateData[field] = body[field];
            }
        });

        // Handle status transitions
        if (updateData.status === 'published' && !updateData.published_at) {
            updateData.published_at = new Date().toISOString();
        }

        if (updateData.status !== 'scheduled') {
            updateData.scheduled_for = null;
        }

        const { data, error } = await supabase
            .from('blog_posts')
            .update(updateData)
            .eq('slug', oldSlug)
            .select()
            .single();

        if (error) {
            console.error('Database error updating blog post:', error);
            return NextResponse.json(
                { success: false, error: 'Failed to update blog post' },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            data: data as BlogPost,
            message: 'Blog post updated successfully',
        });

    } catch (error) {
        console.error('Error updating blog post:', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        );
    }
}

/**
 * DELETE /api/blog/[slug] - Delete a blog post
 */
export async function DELETE(
    request: NextRequest,
    context: RouteContext
): Promise<NextResponse<ApiResponse<void>>> {
    try {
        const { slug } = await context.params;
        const supabase = createServerClient();

        // Ownership check via query param (sent by blogger's delete action)
        const authorId = request.nextUrl.searchParams.get('author_id');
        if (authorId) {
            const { data: existing } = await supabase
                .from('blog_posts')
                .select('author_id')
                .eq('slug', slug)
                .single();

            if (existing && existing.author_id && existing.author_id !== authorId) {
                return NextResponse.json(
                    { success: false, error: 'You do not have permission to delete this post' },
                    { status: 403 }
                );
            }
        }

        const { error } = await supabase
            .from('blog_posts')
            .delete()
            .eq('slug', slug);

        if (error) {
            console.error('Database error deleting blog post:', error);
            return NextResponse.json(
                { success: false, error: 'Failed to delete blog post' },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Blog post deleted successfully',
        });

    } catch (error) {
        console.error('Error deleting blog post:', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        );
    }
}
