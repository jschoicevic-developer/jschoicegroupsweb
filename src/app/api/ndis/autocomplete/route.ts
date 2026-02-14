import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase-server';

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const query = searchParams.get('q');
        const limit = parseInt(searchParams.get('limit') || '10');

        if (!query || query.length < 1) {
            return NextResponse.json({ suggestions: [] });
        }

        const supabase = await createServerClient();

        // Get category names that START with the query
        const { data, error } = await supabase
            .from('ndis_categories')
            .select('category_number, category_name, support_purpose')
            .ilike('category_name', `${query}%`)
            .order('category_number', { ascending: true })
            .limit(limit);

        if (error) {
            console.error('Supabase error:', error);
            return NextResponse.json(
                { error: 'Failed to fetch suggestions' },
                { status: 500 }
            );
        }

        // Format the suggestions
        const suggestions = (data || []).map((cat) => ({
            number: cat.category_number,
            name: cat.category_name,
            purpose: cat.support_purpose,
        }));

        return NextResponse.json({ suggestions });
    } catch (error) {
        console.error('Autocomplete error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
