'use client';

import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import QuestionnaireModal from './QuestionnaireModal';

export default function ServiceMatcher() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="w-full max-w-5xl mx-auto text-center">
        <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 p-12 md:p-16 flex flex-col items-center gap-6">
          <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center">
            <Sparkles className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-3xl font-black text-[#2D3748] uppercase tracking-tight">
            Find Your Perfect Match
          </h2>
          <p className="text-gray-500 font-medium max-w-md">
            Answer a few quick questions and we'll match you with the right care providers in your area — free and with no obligation.
          </p>
          <button
            onClick={() => setOpen(true)}
            className="h-14 px-10 bg-primary text-[#1A202C] font-black uppercase tracking-wider text-sm rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            Get Matched Now
          </button>
        </div>
      </div>

      <QuestionnaireModal
        isOpen={open}
        onClose={() => setOpen(false)}
        source="service_matcher"
        sourcePage="/tools/service-matcher"
      />
    </>
  );
}
