'use client';

import { MapPin, DollarSign, CheckCircle2, AlertCircle, Info, Check, X } from 'lucide-react';
import type { SupportItemDetail } from '@/types/ndis';
import { REGION_LABELS } from '@/types/ndis';

interface PriceDetailViewProps {
  item: SupportItemDetail;
}

export default function PriceDetailView({ item }: PriceDetailViewProps) {
  const priceEntries = Object.entries(item.prices).filter(([_, price]) => price !== null);

  const claimRulesData = [
    { label: 'Quote Required', value: item.claimRules.quoteRequired },
    { label: 'Non Face-to-Face', value: item.claimRules.nonFaceToFace },
    { label: 'Provider Travel', value: item.claimRules.providerTravel },
    { label: 'Short Notice Cancellations', value: item.claimRules.shortNoticeCancellations },
    { label: 'NDIA Requested Reports', value: item.claimRules.ndiaRequestedReports },
    { label: 'Irregular SIL Supports', value: item.claimRules.irregularSilSupports }
  ];

  return (
    <div className="w-full space-y-6">
      {/* Header Card */}
      <div className="bg-primary rounded-[2rem] shadow-xl p-8 md:p-10 text-[#1A202C] relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-white/20 -skew-x-12 z-0" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/30 rounded-full blur-2xl z-0" />

        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-white text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
                  Support Item Code
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-black mb-3 text-[#1A202C] tracking-tight">{item.support_item_number}</h1>
              <h2 className="text-xl md:text-2xl font-bold text-[#2D3748] leading-relaxed opacity-90">{item.support_item_name}</h2>
            </div>
            <div className="bg-white/40 backdrop-blur-md border border-white/30 rounded-2xl px-6 py-4 min-w-[120px] text-center shadow-sm">
              <p className="text-xs font-bold text-[#2D3748] uppercase tracking-widest mb-1 opacity-70">Unit</p>
              <p className="text-2xl font-black text-[#1A202C]">{item.unit}</p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <span className="px-4 py-2 bg-white/60 border border-white/20 backdrop-blur-sm rounded-xl text-sm font-bold text-[#2D3748]">
              {item.support_category_name}
            </span>
            {item.support_purpose && (
              <span className="px-4 py-2 bg-secondary text-white border border-secondary/20 backdrop-blur-sm rounded-xl text-sm font-bold">
                {item.support_purpose}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Two Column Layout for Prices and Rules */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Regional Prices */}
        <div className="bg-white rounded-[2rem] shadow-lg border border-gray-100 p-8 h-full">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-black text-[#2D3748] uppercase tracking-wide">Regional Prices</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {priceEntries.map(([region, price]) => (
              <div
                key={region}
                className="group flex flex-col p-4 bg-gray-50 rounded-2xl border border-primary/90 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-2">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">{REGION_LABELS[region as keyof typeof REGION_LABELS]}</p>
                  <DollarSign className="w-4 h-4 text-gray-300 group-hover:text-primary transition-colors" />
                </div>
                <p className="text-xl font-bold text-[#2D3748] group-hover:text-primary transition-colors">
                  ${price!.toFixed(2)}
                  <span className="text-sm font-medium text-gray-400 ml-1">/{item.unit}</span>
                </p>
              </div>
            ))}
          </div>

          {priceEntries.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
              <AlertCircle className="w-10 h-10 text-gray-400 mb-3" />
              <p className="text-gray-500 font-medium">No pricing information available.</p>
              <p className="text-sm text-gray-400 mt-1">Contact provider for a quote.</p>
            </div>
          )}
        </div>

        {/* Claim Rules */}
        <div className="bg-white rounded-[2rem] shadow-lg border border-gray-100 p-8 h-full">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-black text-[#2D3748] uppercase tracking-wide">Claim Rules & Requirements</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {claimRulesData.map((rule, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-2xl border border-gray-100 bg-white hover:border-primary/30 hover:shadow-md transition-all duration-300"
              >
                <span className="font-medium text-gray-700 text-sm">{rule.label}</span>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${rule.value ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center ${rule.value ? 'bg-green-500' : 'bg-red-500'
                    }`}>
                    {rule.value ? (
                      <Check className="w-3 h-3 text-white" strokeWidth={4} />
                    ) : (
                      <X className="w-3 h-3 text-white" strokeWidth={4} />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Information */}
      {item.registration_group_name && (
        <div className="bg-gray-50 rounded-[2rem] border border-gray-200 p-8">
          <h3 className="flex items-center gap-2 text-lg font-black text-[#2D3748] uppercase tracking-wide mb-6">
            <Info className="w-5 h-5 text-primary" />
            Additional Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
              <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Registration Group</span>
              <span className="block font-bold text-gray-800 text-lg">{item.registration_group_name}</span>
            </div>
            {item.registration_group_number && (
              <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Group Number</span>
                <span className="block font-bold text-gray-800 text-lg font-mono tracking-wider">{item.registration_group_number}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
