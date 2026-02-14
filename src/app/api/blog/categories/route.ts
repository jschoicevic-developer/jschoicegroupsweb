
import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase-admin';

export async function GET(request: NextRequest) {
    try {
        const supabase = createServerClient();

        const { data, error } = await supabase
            .from('blog_posts')
            .select('category')
            .not('category', 'is', null);

        if (error) {
            return NextResponse.json({ success: false, error: error.message }, { status: 500 });
        }

        // Get unique categories and filter out nulls/empties
        const uniqueCategories = Array.from(new Set(data.map(item => item.category)))
            .filter(cat => cat && cat.trim() !== '')
            .sort();

        // Default categories if none found
        const categories = uniqueCategories.length > 0
            ? uniqueCategories
            : ['NDIS', 'Healthcare', 'News', 'Community', 'Resources'];

        return NextResponse.json({
            success: true,
            data: categories
        });

    } catch (error) {
        console.error('Error fetching categories:', error);
        return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
    }
}
