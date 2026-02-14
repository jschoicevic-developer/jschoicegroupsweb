import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase-server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q')?.trim() || searchParams.get('query')?.trim() || '';
    const category = searchParams.get('category');
    const region = searchParams.get('region') || 'vic';
    const showAll = searchParams.get('showAll') === 'true';
    const limit = Math.min(parseInt(searchParams.get('limit') || '15'), 2000); // Allow up to 2000 for category browsing
    const offset = parseInt(searchParams.get('offset') || '0');

    // Require at least 2 characters for search, or category/showAll flag
    if (query.length < 2 && !category && !showAll) {
      return NextResponse.json({
        success: true,
        data: [],
        meta: { count: 0, searchType: null }
      });
    }

    const supabase = await createServerClient();

    // Determine search type
    const isItemNumberSearch = /^[0-9]/.test(query) || query.includes('_');

    let supabaseQuery = supabase
      .from('ndis_support_items')
      .select(`
        id,
        support_item_number,
        support_item_name,
        support_category_number,
        support_category_name,
        unit,
        price_act,
        price_nsw,
        price_nt,
        price_qld,
        price_sa,
        price_tas,
        price_vic,
        price_wa,
        price_remote,
        price_very_remote
      `)
      .range(offset, offset + limit - 1);

    if (isItemNumberSearch && query.length >= 2) {
      // Item number search - prefix match for fast B-tree index usage
      supabaseQuery = supabaseQuery.ilike('support_item_number', `${query}%`);
    } else if (query.length >= 2) {
      // Keyword search - match all words in order
      const words = query.toLowerCase().split(/\s+/).filter(w => w.length > 0);

      // Build search pattern: %word1%word2%word3%
      // This ensures all words appear in the name in order
      const pattern = `%${words.join('%')}%`;

      supabaseQuery = supabaseQuery.ilike('support_item_name', pattern);
    } else if (showAll || category) {
      // Show all items OR show items in selected category (with limit)
      // No additional filtering needed here - category filter applied below
    } else {
      // No valid search criteria
      return NextResponse.json({
        success: true,
        data: [],
        meta: { count: 0, searchType: null }
      });
    }

    // Filter by category if provided
    if (category) {
      supabaseQuery = supabaseQuery.eq('support_category_number', parseInt(category));
    }

    // Order by relevance
    if (isItemNumberSearch) {
      supabaseQuery = supabaseQuery.order('support_item_number', { ascending: true });
    } else {
      supabaseQuery = supabaseQuery.order('support_item_name', { ascending: true });
    }

    const { data, error } = await supabaseQuery;

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to search support items' },
        { status: 500 }
      );
    }

    // Get price for selected region
    const priceKey = `price_${region.toLowerCase().replace(' ', '_')}` as keyof typeof data[0];

    const results = (data || []).map(item => ({
      id: item.id,
      support_item_number: item.support_item_number,
      support_item_name: item.support_item_name,
      support_category_number: item.support_category_number,
      support_category_name: item.support_category_name,
      unit: item.unit,

      // Pass through all regional prices to match NdisSupportItem interface
      price_act: item.price_act,
      price_nsw: item.price_nsw,
      price_nt: item.price_nt,
      price_qld: item.price_qld,
      price_sa: item.price_sa,
      price_tas: item.price_tas,
      price_vic: item.price_vic,
      price_wa: item.price_wa,
      price_remote: item.price_remote,
      price_very_remote: item.price_very_remote,

      price: item[priceKey] || item.price_vic || 0, // Fallback to VIC price
      all_prices: {
        act: item.price_act,
        nsw: item.price_nsw,
        nt: item.price_nt,
        qld: item.price_qld,
        sa: item.price_sa,
        tas: item.price_tas,
        vic: item.price_vic,
        wa: item.price_wa,
        remote: item.price_remote,
        very_remote: item.price_very_remote
      }
    }));

    return NextResponse.json({
      success: true,
      data: results,
      meta: {
        query,
        category,
        region,
        count: results.length,
        searchType: isItemNumberSearch ? 'item_number' : 'keyword',
      },
      // Legacy support for old API format
      items: results,
      total: results.length,
      hasMore: results.length === limit
    });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
