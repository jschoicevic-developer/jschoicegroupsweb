'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { NdisSupportItem } from '@/types/ndis';

interface SearchResultCardProps {
  item: NdisSupportItem;
  hidePurposeBadge?: boolean;
}

export default function SearchResultCard({ item }: SearchResultCardProps) {
  // Get VIC price as default display (JS Choice is in Melbourne)
  const displayPrice = item.price_vic || item.price_nsw || item.price_qld || 'Quote Required';

  return (
    <Link
      href={`/tools/ndis-price-guide/${item.support_item_number}`}
      className="group flex flex-col h-full bg-white rounded-2xl border border-gray-100 hover:border-indigo-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
    >
      <div className="p-6 flex-1 flex flex-col">
        {/* Top Row: Code and Arrow */}
        <div className="flex justify-between items-start mb-4">
          <span className="text-indigo-400 font-medium text-sm tracking-wide">
            {item.support_item_number}
          </span>
          <div className="text-gray-300 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all duration-300">
            <ArrowRight className="w-5 h-5" />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 mb-4 line-clamp-2 leading-tight">
          {item.support_item_name}
        </h3>

        {/* Category Pill */}
        <div className="mt-auto">
          <div className="inline-block bg-[#EEF2FF] text-gray-500 px-4 py-2 rounded-xl text-xs font-bold leading-relaxed">
            {item.support_category_name}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 pb-6 pt-2 flex items-end justify-between">
        <div className="flex flex-col">
          <span className="text-gray-400 text-sm font-medium">$ VIC Price</span>
        </div>
        <div className="text-right">
          <div className="text-indigo-400 font-bold text-base">
            {typeof displayPrice === 'number' ? `$${displayPrice.toFixed(2)}` : 'Quote Required'}
            {typeof displayPrice === 'number' && item.unit && (
              <span className="text-xs font-normal text-gray-400 ml-1">/{item.unit.toLowerCase()}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

