import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase-server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const categoryNumbers = searchParams.get('categories')?.split(',').map(Number) || [];

    const supabase = await createServerClient();

    let query = supabase
      .from('jschoice_services')
      .select('*')
      .eq('is_active', true);

    // If category numbers provided, filter services that match ANY of the categories
    if (categoryNumbers.length > 0) {
      query = query.filter('ndis_category_numbers', 'ov', `{${categoryNumbers.join(',')}}`);
    }

    query = query.order('display_order', { ascending: true });

    const { data, error } = await query;

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch services' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      services: data || []
    });
  } catch (error) {
    console.error('Services error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
