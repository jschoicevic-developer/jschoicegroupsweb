
import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase-admin';

/**
 * GET /api/blog/scheduler
 * This route should be triggered by a cron job (e.g. every hour)
 * It finds all blog posts with status 'scheduled' where 'scheduled_for' <= now
 * and updates their status to 'published' and sets 'published_at' to current time.
 */
export async function GET(request: NextRequest) {
    try {
        const authHeader = request.headers.get('authorization');
        // Simple security check (use a secret token in production)
        const CRON_SECRET = process.env.CRON_SECRET;

        if (CRON_SECRET && authHeader !== `Bearer ${CRON_SECRET}`) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const supabase = createServerClient();
        const now = new Date().toISOString();

        // 1. Find posts to publish
        const { data: posts, error: fetchError } = await supabase
            .from('blog_posts')
            .select('id, title')
            .eq('status', 'scheduled')
            .lte('scheduled_for', now);

        if (fetchError) {
            console.error('Error fetching scheduled posts:', fetchError);
            return NextResponse.json({ error: 'Database error' }, { status: 500 });
        }

        if (!posts || posts.length === 0) {
            return NextResponse.json({ message: 'No posts to publish', processed: 0 });
        }

        // 2. Update status
        const postIds = posts.map(p => p.id);
        const { error: updateError } = await supabase
            .from('blog_posts')
            .update({
                status: 'published',
                published_at: now,
                updated_at: now
            })
            .in('id', postIds);

        if (updateError) {
            console.error('Error updating status:', updateError);
            return NextResponse.json({ error: 'Update failed' }, { status: 500 });
        }

        console.log(`✅ Scheduler published ${posts.length} posts: ${posts.map(p => p.title).join(', ')}`);

        return NextResponse.json({
            success: true,
            message: `Successfully published ${posts.length} posts`,
            published: posts
        });

    } catch (error) {
        console.error('Scheduler error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
