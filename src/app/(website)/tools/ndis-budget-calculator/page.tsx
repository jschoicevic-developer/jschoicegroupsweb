import BudgetCalculator from '@/components/ndis/BudgetCalculator';
import { ArrowLeft, Calculator } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NDIS Budget Calculator | JS Choice Group',
  description: 'Calculate your estimated annual NDIS support costs. Add support items, set frequency, and download your budget summary.',
};

import { createServerClient } from '@/lib/supabase-server';

export default async function BudgetCalculatorPage() {
  // Fetch categories for the calculator
  const supabase = await createServerClient();
  const { data: categories } = await supabase
    .from('ndis_categories')
    .select('*')
    .order('category_number', { ascending: true });

  return (
    <main className="min-h-screen bg-white">
      {/* Header - Now simplified because Layout handles the main banner */}
      <section className="relative pt-12 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/tools"
            className="inline-flex items-center text-gray-500 hover:text-primary mb-8 transition-colors font-bold uppercase tracking-wider text-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Tools
          </Link>

          <div className="text-center max-w-6xl mx-auto">
            <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-6 rotate-3 hover:rotate-6 transition-transform duration-300">
              <Calculator className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-[#2D3748] mb-6 uppercase tracking-tight">
              NDIS Budget <span className="text-primary">Calculator</span>
            </h1>
            <p className="text-xl text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed">
              Estimate your annual NDIS support costs. Search and add support items, set quantities and frequency, then download or print your budget summary.
            </p>
            <p className="mt-4 text-sm text-gray-400 font-medium">
              Source by <a href="https://www.ndis.gov.au/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline transition-all font-bold">NDIS government website</a>
            </p>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <BudgetCalculator categories={categories || []} />
      </section>

      {/* Info Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 p-8 md:p-12">
            <h2 className="text-2xl font-black text-[#2D3748] mb-8 uppercase tracking-wide">How to Use This Calculator</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
              <div className="flex flex-col gap-3">
                <span className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-[#1A202C] font-black text-lg shadow-lg">1</span>
                <strong className="text-gray-900 block text-lg font-bold">Select Region</strong>
                <p className="text-gray-500 text-sm leading-relaxed">Choose your state or territory to see accurate pricing.</p>
              </div>
              <div className="flex flex-col gap-3">
                <span className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-[#1A202C] font-black text-lg shadow-lg">2</span>
                <strong className="text-gray-900 block text-lg font-bold">Add Items</strong>
                <p className="text-gray-500 text-sm leading-relaxed">Search for services you need and add them to your budget.</p>
              </div>
              <div className="flex flex-col gap-3">
                <span className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-[#1A202C] font-black text-lg shadow-lg">3</span>
                <strong className="text-gray-900 block text-lg font-bold">Set Frequency</strong>
                <p className="text-gray-500 text-sm leading-relaxed">Adjust how often you'll use each service (weekly, monthly, etc.).</p>
              </div>
              <div className="flex flex-col gap-3">
                <span className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-[#1A202C] font-black text-lg shadow-lg">4</span>
                <strong className="text-gray-900 block text-lg font-bold">Review</strong>
                <p className="text-gray-500 text-sm leading-relaxed">See your total estimated annual costs broken down by category.</p>
              </div>
              <div className="flex flex-col gap-3">
                <span className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-[#1A202C] font-black text-lg shadow-lg">5</span>
                <strong className="text-gray-900 block text-lg font-bold">Download</strong>
                <p className="text-gray-500 text-sm leading-relaxed">Save your budget summary for reference or share with your planner.</p>
              </div>
            </div>

            <div className="mt-12 p-8 bg-[#2D3748] rounded-[2rem] relative overflow-hidden">
              {/* Decorative */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl -mr-10 -mt-10" />

              <p className="font-bold text-primary mb-2 uppercase tracking-wide text-xs">Important Note</p>
              <p className="text-gray-300 font-medium leading-relaxed relative z-10">
                This calculator provides estimates based on NDIS maximum prices. Actual costs may vary based on your specific needs, service providers, and plan details. Always consult with your NDIS planner or support coordinator for accurate budgeting.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 px-4 md:px-6 lg:px-8 bg-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#ABB3F1]/10 -skew-x-12 z-0" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#F1ABAB]/10 rounded-full blur-3xl z-0" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-block bg-[#F1ABAB]/20 px-4 py-2 rounded-full mb-6">
            <span className="text-secondary font-bold uppercase tracking-wider text-xs">Expert Guidance</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-[#2D3748] mb-6 uppercase tracking-tight">Need Help Planning <span className="text-secondary">Your Budget?</span></h2>
          <p className="text-xl text-gray-500 font-medium mb-10 max-w-2xl mx-auto leading-relaxed">
            Our support coordinators can help you understand your NDIS plan and make informed decisions about your supports.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:1300572464"
              className="h-14 px-8 flex items-center justify-center rounded-full bg-primary hover:brightness-110 text-[#1A202C] font-black text-sm uppercase tracking-wider shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              Call: 1300572464
            </a>
            <Link
              href="/tools/service-matcher"
              className="h-14 px-8 flex items-center justify-center rounded-full bg-white text-[#2D3748] border-2 border-gray-100 font-black text-sm uppercase tracking-wider shadow-lg hover:shadow-xl hover:border-primary hover:text-primary hover:-translate-y-1 transition-all duration-300"
            >
              Find Your Services
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
