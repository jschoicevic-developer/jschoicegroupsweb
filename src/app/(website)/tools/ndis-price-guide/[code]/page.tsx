import { createServerClient } from '@/lib/supabase-server';
import PriceDetailView from '@/components/ndis/PriceDetailView';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import type { SupportItemDetail, PricesByRegion } from '@/types/ndis';

interface PageProps {
  params: Promise<{
    code: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { code } = await params;
  const supabase = await createServerClient();

  const { data } = await supabase
    .from('ndis_support_items')
    .select('support_item_name, support_item_number')
    .eq('support_item_number', code)
    .single();

  if (!data) {
    return {
      title: 'Support Item Not Found | JS Choice Group',
    };
  }

  return {
    title: `${data.support_item_name} - ${data.support_item_number} | NDIS Price Guide`,
    description: `Detailed pricing information for NDIS support item ${data.support_item_name} (${data.support_item_number}). View regional prices and claim requirements.`,
  };
}

export default async function PriceDetailPage({ params }: PageProps) {
  const { code } = await params;
  const supabase = await createServerClient();

  const { data, error } = await supabase
    .from('ndis_support_items')
    .select('*')
    .eq('support_item_number', code)
    .single();

  if (error || !data) {
    notFound();
  }

  // Format the item with prices and claim rules
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

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <Link
            href="/tools/ndis-price-guide"
            className="inline-flex items-center text-gray-500 hover:text-primary mb-8 transition-colors font-bold uppercase tracking-wider text-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Price Guide
          </Link>

          {/* Detail View Container */}
          <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden">
            <PriceDetailView item={itemDetail} />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 px-4 md:px-6 lg:px-8 bg-gray-50 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#ABB3F1]/10 -skew-x-12 z-0" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#F1ABAB]/10 rounded-full blur-3xl z-0" />

        <div className="max-w-6xl mx-auto bg-white rounded-[2rem] shadow-xl p-8 md:p-12 relative z-10 border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-block bg-[#F1ABAB]/20 px-4 py-2 rounded-full mb-6">
                <span className="text-secondary font-bold uppercase tracking-wider text-xs">Ready to Start?</span>
              </div>
              <h2 className="text-3xl font-black text-[#2D3748] mb-4 uppercase tracking-tight">Need This Service?</h2>
              <p className="text-lg text-gray-500 font-medium leading-relaxed">
                Contact JS Choice Group to learn how we can support you with this service item.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="tel:130057246423"
                className="flex-1 h-16 flex items-center justify-center rounded-full bg-primary hover:brightness-110 text-[#1A202C] font-black text-sm uppercase tracking-wider shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                Call Now
              </a>
              <Link
                href="/tools/service-matcher"
                className="flex-1 h-16 flex items-center justify-center rounded-full bg-white text-[#2D3748] border-2 border-gray-100 font-black text-sm uppercase tracking-wider shadow-lg hover:shadow-xl hover:border-primary hover:text-primary hover:-translate-y-1 transition-all duration-300"
              >
                Get Matched
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
