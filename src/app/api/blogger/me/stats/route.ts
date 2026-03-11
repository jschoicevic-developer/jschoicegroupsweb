/**
 * Blogger Stats API
 * GET: Returns stats for the authenticated blogger
 */

import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase-admin';

export async function GET(request: NextRequest): Promise<NextResponse> {
    try {
        const searchParams = request.nextUrl.searchParams;
        const userId = searchParams.get('userId');

        if (!userId) {
            return NextResponse.json({ success: false, error: 'userId is required' }, { status: 400 });
        }

        const supabase = createServerClient();

        const { count: totalBlogs } = await supabase
            .from('blog_posts')
            .select('*', { count: 'exact', head: true })
            .eq('author_id', userId);

        const { count: publishedBlogs } = await supabase
            .from('blog_posts')
            .select('*', { count: 'exact', head: true })
            .eq('author_id', userId)
            .eq('status', 'published');

        const { count: draftBlogs } = await supabase
            .from('blog_posts')
            .select('*', { count: 'exact', head: true })
            .eq('author_id', userId)
            .eq('status', 'draft');

        return NextResponse.json({
            success: true,
            data: {
                total: totalBlogs || 0,
                published: publishedBlogs || 0,
                drafts: draftBlogs || 0,
            },
        });
    } catch (error) {
        console.error('Error fetching blogger stats:', error);
        return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
    }
}
