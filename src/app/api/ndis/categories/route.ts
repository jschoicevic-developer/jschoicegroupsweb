import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase-server';

// Category to Support Purpose mapping based on NDIS structure
const SUPPORT_PURPOSE_MAP: Record<number, 'Core' | 'Capital' | 'Capacity Building'> = {
  1: 'Core',  // Assistance with daily life
  2: 'Core',  // Transport
  3: 'Core',  // Consumables
  4: 'Core',  // Assistance with social, economic and community participation
  5: 'Capital',  // Assistive Technology
  6: 'Capital',  // Home Modifications
  7: 'Capacity Building',  // Support Coordination
  8: 'Capacity Building',  // Improved Living Arrangements
  9: 'Capacity Building',  // Increased Social and Community Participation
  10: 'Capacity Building',  // Finding and Keeping a Job
  11: 'Capacity Building',  // Improved Relationships
  12: 'Capacity Building',  // Improved Health and Wellbeing
  13: 'Capacity Building',  // Improved Learning
  14: 'Capacity Building',  // Improved Life Choices
  15: 'Capacity Building',  // Improved Daily Living
  16: 'Core',  // Home and Living
  21: 'Core',  // YPIRAC - Cross Billing
};

export async function GET() {
  try {
    const supabase = await createServerClient();

    // Get distinct categories from the support items table
    const { data, error } = await supabase
      .from('ndis_support_items')
      .select('support_category_number, support_category_name')
      .order('support_category_number', { ascending: true });

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to fetch categories' },
        { status: 500 }
      );
    }

    // Remove duplicates and add support purpose
    const uniqueCategories = Array.from(
      new Map(
        data.map(item => [
          item.support_category_number,
          {
            category_number: item.support_category_number,
            category_name: item.support_category_name,
            support_purpose: SUPPORT_PURPOSE_MAP[item.support_category_number] || 'Core'
          }
        ])
      ).values()
    );

    // Group by support purpose for frontend convenience
    const grouped = {
      core: uniqueCategories.filter(c => c.support_purpose === 'Core'),
      capital: uniqueCategories.filter(c => c.support_purpose === 'Capital'),
      capacity_building: uniqueCategories.filter(c => c.support_purpose === 'Capacity Building')
    };

    return NextResponse.json({
      success: true,
      data: uniqueCategories,
      grouped,
      meta: {
        total: uniqueCategories.length
      },
      // Legacy format for backwards compatibility
      categories: uniqueCategories
    });
  } catch (error) {
    console.error('Categories API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
