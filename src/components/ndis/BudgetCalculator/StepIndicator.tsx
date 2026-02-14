'use client';

import { Info } from 'lucide-react';

/**
 * Step Indicator - START banner
 * Shows instructions for progressive disclosure
 */
export default function StepIndicator() {
  return (
    <div className="bg-white rounded-[2rem] border border-gray-100 shadow-lg p-6 md:p-8 mb-10 flex items-start gap-6 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -mr-10 -mt-10 transition-all duration-500 group-hover:bg-primary/10" />

      <div className="flex-shrink-0 relative z-10">
        <div className="w-16 h-16 bg-primary text-[#1A202C] rounded-2xl rotate-3 flex items-center justify-center font-black text-xl shadow-lg shadow-primary/20 group-hover:rotate-6 transition-transform duration-300">
          START
        </div>
      </div>
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-2">
          <Info className="w-5 h-5 text-primary" />
          <h3 className="text-xl font-black text-[#2D3748] uppercase tracking-tight">
            NDIS Budget Calculator
          </h3>
        </div>
        <p className="text-gray-500 font-medium text-lg leading-relaxed max-w-2xl">
          Follow the simple steps below. Answer the first question to unlock the next step in your budget planning journey.
        </p>
      </div>
    </div>
  );
}
