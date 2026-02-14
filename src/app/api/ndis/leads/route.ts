import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase-server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      firstName,
      lastName,
      email,
      phone,
      source,
      sourcePage,
      interestedServices,
      ndisParticipant,
      ndisNumber,
      location,
      message,
      budgetEstimate
    } = body;

    // Validate required fields
    if (!firstName || !email || !source) {
      return NextResponse.json(
        { error: 'Missing required fields: firstName, email, source' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const supabase = await createServerClient();

    const { data, error } = await supabase
      .from('leads')
      .insert({
        first_name: firstName,
        last_name: lastName || null,
        email,
        phone: phone || null,
        source,
        source_page: sourcePage || null,
        interested_services: interestedServices || [],
        ndis_participant: ndisParticipant || null,
        ndis_number: ndisNumber || null,
        location: location || null,
        message: message || null,
        budget_estimate: budgetEstimate || null,
        status: 'new'
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to submit lead' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      lead: data
    }, { status: 201 });
  } catch (error) {
    console.error('Lead submission error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
