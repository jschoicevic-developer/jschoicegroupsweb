'use client';

import { PlanPartnersBudgetItem } from '@/types/ndis';
import CalculationRow from './CalculationRow';
import { Plus, Download, Printer } from 'lucide-react';
import { downloadAsPDF } from '@/lib/pdf-generator';

interface Props {
  items: PlanPartnersBudgetItem[];
  onUpdate: (id: string, updates: Partial<PlanPartnersBudgetItem>) => void;
  onDelete: (id: string) => void;
  onReset: () => void;
  onAddAnother: () => void;
  totalEstimate: number;
}

/**
 * Calculation Table - Phase 3
 * Shows budget items with editable fields and live cost calculations
 */
export default function CalculationTable({
  items,
  onUpdate,
  onDelete,
  onReset,
  onAddAnother,
  totalEstimate
}: Props) {
  return (

    <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 p-8 md:p-12 mb-10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-black text-[#2D3748] mb-4 uppercase tracking-tight">Calculate costs</h2>
        <p className="text-gray-500 font-medium text-lg mb-8 max-w-2xl">
          Easily adjust the quantity and frequency of your supports to calculate an estimate of total costs.
        </p>















        {/* Desktop Table View */}
        <div className="hidden lg:block overflow-x-auto rounded-3xl border border-gray-200">
          <table className="w-full bg-white">
            <thead className="bg-[#2D3748] text-white">
              <tr>
                <th className="px-6 py-5 text-left font-bold text-sm uppercase tracking-wider rounded-tl-3xl">Support Item</th>
                <th className="px-6 py-5 text-left font-bold text-sm uppercase tracking-wider w-36">Price</th>
                <th className="px-6 py-5 text-left font-bold text-sm uppercase tracking-wider w-32">Qty</th>
                <th className="px-6 py-5 text-left font-bold text-sm uppercase tracking-wider w-48">Frequency</th>
                <th className="px-6 py-5 text-right font-bold text-sm uppercase tracking-wider w-40">Cost</th>
                <th className="px-6 py-5 w-20 rounded-tr-3xl"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {items.map((item) => (
                <CalculationRow
                  key={item.id}
                  item={item}
                  onUpdate={onUpdate}
                  onDelete={onDelete}
                />
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="lg:hidden space-y-6">
          {items.map((item) => (
            <CalculationRow
              key={item.id}
              item={item}
              onUpdate={onUpdate}
              onDelete={onDelete}
              mobile
            />
          ))}
        </div>

        {/* Total Estimate */}
        <div className="mt-8 bg-[#2D3748] rounded-2xl shadow-xl p-8 transform -rotate-1 mx-auto max-w-sm lg:max-w-none lg:mx-0 lg:ml-auto lg:w-96 text-white text-center lg:text-right relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-primary opacity-50" />
          <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-primary/20 blur-2xl rounded-full" />

          <span className="block text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Total Estimate</span>
          <span className="text-4xl font-black text-white tracking-tight">
            ${totalEstimate.toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row gap-6 items-center justify-between">
          <button
            onClick={onAddAnother}
            className="flex items-center justify-center gap-3 px-8 py-4 bg-primary text-[#1A202C] font-black uppercase tracking-wider text-sm rounded-xl
                     hover:shadow-lg hover:scale-[1.02] transition-all duration-300 w-full md:w-auto"
          >
            <Plus className="w-5 h-5" />
            Add another item
          </button>

          <div className="flex items-center gap-4 w-full md:w-auto justify-center md:justify-end">
            <button
              onClick={onReset}
              className="px-6 py-3 text-red-500 hover:text-red-700 font-bold uppercase tracking-wider text-xs transition-colors hover:bg-red-50 rounded-lg"
            >
              Reset All
            </button>
          </div>
        </div>

        {/* Download/Print Links */}
        <div className="mt-8 flex gap-6 justify-center text-sm border-t border-gray-100 pt-6">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 text-gray-500 hover:text-[#2D3748] font-bold uppercase tracking-wider transition-colors"
          >
            <Printer className="w-4 h-4" />
            Print
          </button>
          <button
            onClick={() => downloadAsPDF(items)}
            className="flex items-center gap-2 text-primary hover:text-[#2D3748] font-bold uppercase tracking-wider transition-colors"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
}
