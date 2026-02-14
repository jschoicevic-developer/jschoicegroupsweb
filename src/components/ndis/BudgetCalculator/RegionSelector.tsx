'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { Region, REGION_LABELS } from '@/types/ndis';

interface Props {
  selectedRegion: Region | null;
  onSelect: (region: Region) => void;
}

const REGION_OPTIONS: Region[] = [
  'ACT',
  'NSW',
  'NT',
  'QLD',
  'SA',
  'TAS',
  'VIC',
  'WA',
  'REMOTE',
  'VERY_REMOTE'
];

 
export default function RegionSelector({ selectedRegion, onSelect }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (region: Region) => {
    onSelect(region);
    setIsOpen(false);
  };

  return (
    <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 p-8 md:p-12 mb-8 relative overflow-hidden transition-all duration-300 hover:shadow-2xl">
      <div className="max-w-4xl">
        <h2 className="text-3xl font-black text-[#2D3748] mb-4 uppercase tracking-tight">
          <span className="text-primary mr-3">01.</span>
          Which state/region do you live in?
        </h2>

        <p className="text-gray-500 font-medium text-lg mb-2">
          <span className="text-[#2D3748] font-bold">Why does this matter?</span> NDIS price limits vary depending on where you live.
        </p>

        <a
          href="https://www.health.gov.au/topics/health-workforce/health-workforce-classifications/modified-monash-model"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-primary hover:text-[#2D3748] font-bold text-sm mb-8 transition-colors uppercase tracking-wider"
        >
          Check Health Workforce Location
          <ExternalLink className="w-4 h-4" />
        </a>

         <div className="relative max-w-sm">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full px-8 py-5 bg-[#2D3748] text-white rounded-2xl
                     font-bold text-lg flex items-center justify-between gap-4
                     hover:bg-[#1A202C] hover:scale-[1.02] transition-all duration-300 shadow-lg group"
            aria-label="Select region or state"
            aria-expanded={isOpen}
            aria-haspopup="listbox"
          >
            <span>{selectedRegion ? REGION_LABELS[selectedRegion] : 'Select Region'}</span>
            {isOpen ? (
              <ChevronUp className="w-6 h-6 text-primary" />
            ) : (
              <ChevronDown className="w-6 h-6 text-gray-400 group-hover:text-primary transition-colors" />
            )}
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div
              className="absolute z-50 mt-3 w-full bg-white rounded-2xl shadow-2xl border border-gray-100 max-h-96 overflow-y-auto custom-scrollbar animate-in fade-in slide-in-from-top-2 duration-200"
              role="listbox"
              aria-label="Select your region"
            >
              {REGION_OPTIONS.map((region) => (
                <button
                  key={region}
                  onClick={() => handleSelect(region)}
                  role="option"
                  aria-selected={selectedRegion === region}
                  className={`w-full px-8 py-4 text-left hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0
                             ${selectedRegion === region ? 'bg-primary/10 text-primary font-bold' : 'text-gray-600 font-medium'}`}
                >
                  {REGION_LABELS[region]}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
