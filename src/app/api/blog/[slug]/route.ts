
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

        // Always fetch existing post to verify ownership and preserve published_at
        const { data: existingPost } = await supabase
            .from('blog_posts')
            .select('author_id, author_name, published_at, created_at, status')
            .eq('slug', oldSlug)
            .single();

        // Block edit only if the requester is neither the uploader nor the credited author
        if (body.author_id && existingPost?.author_id) {
            const isUploader = existingPost.author_id === body.author_id;
            const isCreditedAuthor = body.author_name && existingPost.author_name === body.author_name;
            if (!isUploader && !isCreditedAuthor) {
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
            'title', 'slug', 'excerpt', 'description', 'table_of_contents', 'content', 'featured_image',
            'category', 'tags', 'author_name', 'status', 'scheduled_for'
        ];

        allowedFields.forEach(field => {
            if (body[field] !== undefined) {
                updateData[field] = body[field];
            }
        });

        // Handle status transitions
        if (updateData.status === 'published') {
            if (existingPost?.published_at) {
                // Already published with a date: do not include published_at in the update payload
                // so the database preserves it exactly, avoiding any timezone/formatting shifts.
                delete updateData.published_at;
            } else if (existingPost?.status === 'published') {
                // If the post was already published but didn't have a published_at (legacy data), 
                // use created_at so it doesn't jump to today.
                updateData.published_at = existingPost.created_at;
            } else {
                // Newly published post
                updateData.published_at = new Date().toISOString();
            }
        }

        if (updateData.status === 'scheduled' && body.scheduled_for) {
            updateData.scheduled_for = new Date(body.scheduled_for).toISOString();
        } else if (updateData.status !== 'scheduled') {
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

        // Ownership check via query params (sent by blogger's delete action)
        const authorId = request.nextUrl.searchParams.get('author_id');
        const authorName = request.nextUrl.searchParams.get('author_name');
        if (authorId) {
            const { data: existing } = await supabase
                .from('blog_posts')
                .select('author_id, author_name')
                .eq('slug', slug)
                .single();

            const isUploader = existing?.author_id && existing.author_id === authorId;
            const isCreditedAuthor = authorName && existing?.author_name === authorName;

            if (existing && !isUploader && !isCreditedAuthor) {
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
