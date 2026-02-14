import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase-server';
import type { SupportItemDetail, PricesByRegion } from '@/types/ndis';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  try {
    const { code } = await params;

    if (!code) {
      return NextResponse.json(
        { error: 'Support item code is required' },
        { status: 400 }
      );
    }

    const supabase = await createServerClient();

    const { data, error } = await supabase
      .from('ndis_support_items')
      .select('*')
      .eq('support_item_number', code)
      .single();

    if (error || !data) {
      return NextResponse.json(
        { error: 'Support item not found' },
        { status: 404 }
      );
    }

    // Format the response with regional prices and claim rules
    const prices: PricesByRegion = {
      ACT: data.price_act,
      NSW: data.price_nsw,
      NT: data.price_nt,
      QLD: data.price_qld,
      SA: data.price_sa,
      TAS: data.price_tas,
      VIC: data.price_vic,
      WA: data.price_wa,
      REMOTE: data.price_remote,
      VERY_REMOTE: data.price_very_remote
    };

    const claimRules = {
      quoteRequired: data.quote_required,
      nonFaceToFace: data.non_face_to_face,
      providerTravel: data.provider_travel,
      shortNoticeCancellations: data.short_notice_cancellations,
      ndiaRequestedReports: data.ndia_requested_reports,
      irregularSilSupports: data.irregular_sil_supports
    };

    const itemDetail: SupportItemDetail = {
      ...data,
      prices,
      claimRules
    };

    return NextResponse.json({
      item: itemDetail
    });
  } catch (error) {
    console.error('Item detail error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
