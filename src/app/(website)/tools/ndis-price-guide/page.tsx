import { createServerClient } from '@/lib/supabase-server';
import PriceGuideSearch from '@/components/ndis/PriceGuideSearch';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NDIS Price Guide Navigator',
  description: 'Search NDIS support item prices by name or code. Compare regional pricing and view detailed claim requirements for all NDIS services.',
};

export default async function PriceGuidePage() {
  // Fetch categories for filter
  const supabase = await createServerClient();
  const { data: categories, error } = await supabase
    .from('ndis_categories')
    .select('*')
    .order('category_number', { ascending: true });

  if (error || !categories || categories.length === 0) {
    const { notFound } = await import('next/navigation');
    notFound();
  }

  return (
    <div className="w-full bg-white">
      {/* Header - Now simplified because Layout handles the main banner */}
      <section className="relative pt-12 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-black text-[#2D3748] mb-6 uppercase tracking-tight">
            Price Guide <span className="text-primary">Navigator</span>
          </h1>
          <p className="text-xl text-gray-500 font-medium max-w-3xl mx-auto leading-relaxed">
            Search for NDIS support items by name or code. Compare prices across different regions and view detailed pricing information.
          </p>
          <p className="mt-4 text-sm text-gray-400 font-medium">
            Source by <a href="https://www.ndis.gov.au/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline transition-all font-bold">NDIS government website</a>
          </p>
        </div>
      </section>

      {/* Search Section */}
      <section className="pb-12 px-4 sm:px-6 lg:px-8">
        <PriceGuideSearch categories={categories || []} />
      </section>

      {/* Info Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-[2rem] shadow-lg p-8 md:p-12 border border-gray-100">
            <h2 className="text-2xl font-black text-[#2D3748] mb-6 uppercase tracking-wide">About NDIS Pricing</h2>
            <div className="space-y-4 text-gray-600 font-medium text-lg leading-relaxed">
              <p>
                The NDIS Price Guide sets the maximum price that registered providers can charge for supports. Prices may vary based on:
              </p>
              <ul className="list-disc list-inside space-y-3 ml-4 text-gray-700">
                <li>Your location (state or territory)</li>
                <li>Time of service delivery (business hours, evenings, weekends)</li>
                <li>Whether the support is provided face-to-face or remotely</li>
                <li>Specific claim requirements and conditions</li>
              </ul>
              <div className="mt-8 p-6 bg-[#ABB3F1]/10 rounded-2xl border border-[#ABB3F1]/20">
                <p className="text-[#2D3748]">
                  <strong className="text-primary">Note:</strong> Prices shown are the maximum allowable rates. Some providers, including JS Choice Group, may offer competitive pricing. Contact us for a detailed quote.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 px-4 md:px-6 lg:px-8 bg-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#F1ABAB]/10 -skew-x-12 z-0" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#ABB3F1]/10 rounded-full blur-3xl z-0" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-block bg-[#ABB3F1]/20 px-4 py-2 rounded-full mb-6">
            <span className="text-primary font-bold uppercase tracking-wider text-xs">Expert Support</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-[#2D3748] mb-6 uppercase tracking-tight">Need Help Understanding <span className="text-secondary">Your Plan?</span></h2>
          <p className="text-xl text-gray-500 font-medium mb-10 max-w-2xl mx-auto leading-relaxed">
            Our support coordinators can help you understand NDIS pricing and make the most of your plan budget.
          </p>
          <Link
            href="/tools/service-matcher"
            className="inline-flex h-14 px-10 rounded-full bg-primary hover:brightness-110 text-[#1A202C] font-black text-sm uppercase tracking-wider shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 items-center justify-center"
          >
            Get Personalised Support
          </Link>
        </div>
      </section>
    </div>
  );
}
