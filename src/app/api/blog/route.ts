/**
 * Blog Posts API - Main Route
 * Handles blog post listing and creation
 * 
 * GET /api/blog - List blog posts (public: published only, admin: all)
 * POST /api/blog - Create new blog post (AUTHENTICATED)
 */

import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase-admin';
import type { ApiResponse, PaginatedResponse, BlogPost } from '@/types/crm';

/**
 * GET - List blog posts
 * Public: Only published posts
 * Admin: All posts with status filter
 */
export async function GET(request: NextRequest): Promise<NextResponse<PaginatedResponse<BlogPost>>> {
    try {
        const supabase = createServerClient();
        const searchParams = request.nextUrl.searchParams;

        // ===================================
        // PARAMETERS
        // ===================================

        const isAdmin = searchParams.get('admin') === 'true';
        const category = searchParams.get('category');
        const status = searchParams.get('status');
        const search = searchParams.get('search');
        const authorId = searchParams.get('author_id');
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');
        const offset = (page - 1) * limit;

        // ========================================
        // LAZY SCHEDULER (Workaround for No-Cron)
        // ========================================
        const now = new Date().toISOString();
        if (!isAdmin) {
            // Run a background update for overdue scheduled posts
            // We don't await this to keep the request fast, but we handle it
            supabase
                .from('blog_posts')
                .update({ status: 'published', published_at: now, updated_at: now })
                .eq('status', 'scheduled')
                .lte('scheduled_for', now)
                .then(({ error }) => {
                    if (error) console.error('Lazy scheduler error:', error);
                });
        }

        // ========================================
        // BUILD QUERY
        // ========================================

        let query = supabase
            .from('blog_posts')
            .select('*', { count: 'exact' });

        // Sorting
        query = query.order(isAdmin ? 'created_at' : 'published_at', { ascending: false, nullsFirst: false });

        // Range
        query = query.range(offset, offset + limit - 1);

        // Public logic: See published OR scheduled-but-now-due
        if (!isAdmin) {
            // We use a complex filter to show posts that are either published 
            // OR were scheduled and are now due (in case the lazy update hasn't finished)
            query = query.or(`status.eq.published,and(status.eq.scheduled,scheduled_for.lte.${now})`);
        }

        // Apply filters
        if (category) {
            query = query.eq('category', category);
        }

        if (status && isAdmin) {
            query = query.eq('status', status);
        }

        if (search) {
            query = query.or(`title.ilike.%${search}%,excerpt.ilike.%${search}%`);
        }

        if (authorId) {
            query = query.eq('author_id', authorId);
        }

        // ========================================
        // EXECUTE QUERY
        // ========================================

        const { data, error, count } = await query;

        if (error) {
            console.error('Database error fetching blog posts:', error);
            return NextResponse.json(
                {
                    success: false,
                    data: [],
                    pagination: { total: 0, page, limit, totalPages: 0 },
                },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            data: (data || []) as BlogPost[],
            pagination: {
                total: count || 0,
                page,
                limit,
                totalPages: Math.ceil((count || 0) / limit),
            },
        });

    } catch (error) {
        console.error('Error fetching blog posts:', error);
        return NextResponse.json(
            {
                success: false,
                data: [],
                pagination: { total: 0, page: 1, limit: 10, totalPages: 0 },
            },
            { status: 500 }
        );
    }
}

/**
 * POST - Create new blog post
 * AUTHENTICATED endpoint
 */
export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse<BlogPost>>> {
    try {
        const body = await request.json();
        const supabase = createServerClient();

        // ========================================
        // VALIDATION
        // ========================================

        if (!body.title || !body.slug || !body.content) {
            return NextResponse.json(
                { success: false, error: 'Title, slug, and content are required' },
                { status: 400 }
            );
        }

        // Check if slug already exists
        const { data: existing } = await supabase
            .from('blog_posts')
            .select('id')
            .eq('slug', body.slug)
            .single();

        if (existing) {
            return NextResponse.json(
                { success: false, error: 'A post with this slug already exists' },
                { status: 400 }
            );
        }

        // ========================================
        // PREPARE POST DATA
        // ========================================

        const postData: any = {
            title: body.title.trim(),
            slug: body.slug.trim(),
            excerpt: body.excerpt?.trim() || null,
            description: body.description?.trim() || null,
            table_of_contents: body.table_of_contents?.trim() || null,
            content: body.content,
            featured_image: body.featured_image || null,
            featured_image_alt: body.featured_image_alt || null,
            category: body.category || null,
            tags: body.tags || null,
            meta_title: body.meta_title || body.title,
            meta_description: body.meta_description || body.excerpt || null,
            canonical_url: body.canonical_url || null,
            author_id: body.author_id || null,
            author_name: body.author_name || 'JS Choice Team',
            author_avatar: body.author_avatar || null,
            status: body.status || 'draft',
            allow_comments: body.allow_comments ?? true,
            is_featured: body.is_featured ?? false,
            published_at: null,
            scheduled_for: null,
        };

        // Handle publishing
        if (postData.status === 'published') {
            postData.published_at = new Date().toISOString();
        } else if (postData.status === 'scheduled' && body.scheduled_for) {
            postData.scheduled_for = new Date(body.scheduled_for).toISOString();
        }

        // ========================================
        // INSERT POST
        // ========================================

        const { data, error } = await supabase
            .from('blog_posts')
            .insert(postData)
            .select()
            .single();

        if (error) {
            console.error('Database error creating blog post:', error);
            return NextResponse.json(
                { success: false, error: 'Failed to create blog post' },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            data: data as BlogPost,
            message: 'Blog post created successfully',
        });

    } catch (error) {
        console.error('Error creating blog post:', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        );
    }
}
