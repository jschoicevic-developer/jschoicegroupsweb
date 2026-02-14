'use client';

import { PlanPartnersBudgetItem, SupportPurpose } from '@/types/ndis';

interface Props {
  items: PlanPartnersBudgetItem[];
}

interface GroupedItems {
  purpose: SupportPurpose;
  items: PlanPartnersBudgetItem[];
  total: number;
}

const SUPPORT_PURPOSE_MAP: Record<number, SupportPurpose> = {
  1: 'Core',
  2: 'Core',
  3: 'Core',
  4: 'Core',
  5: 'Capital',
  6: 'Capital',
  7: 'Capacity Building',
  8: 'Capacity Building',
  9: 'Capacity Building',
  10: 'Capacity Building',
  11: 'Capacity Building',
  12: 'Capacity Building',
  13: 'Capacity Building',
  14: 'Capacity Building',
  15: 'Capacity Building',
  16: 'Core',
  21: 'Core',
};

/**
 * Print View - Enhanced layout for printing
 * Hidden on screen, visible when printing
 */
export default function PrintView({ items }: Props) {
  // Group items by support purpose
  const groupedData: GroupedItems[] = [];
  const groups: Record<SupportPurpose, PlanPartnersBudgetItem[]> = {
    'Core': [],
    'Capital': [],
    'Capacity Building': []
  };

  items.forEach(item => {
    const purpose = SUPPORT_PURPOSE_MAP[item.supportItem.support_category_number] || 'Core';
    groups[purpose].push(item);
  });

  (['Core', 'Capital', 'Capacity Building'] as SupportPurpose[]).forEach(purpose => {
    if (groups[purpose].length > 0) {
      groupedData.push({
        purpose,
        items: groups[purpose],
        total: groups[purpose].reduce((sum, item) => sum + item.cost, 0)
      });
    }
  });

  const grandTotal = items.reduce((sum, item) => sum + item.cost, 0);
  const today = new Date().toLocaleDateString('en-AU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  if (items.length === 0) return null;

  return (
    <div className="print-only hidden print:block">
      {/* Print Header */}
      <div className="mb-10 pb-6 border-b-4 border-[#2D3748]">
        <div className="flex items-center justify-between mb-8">
          <div>
            {/* Logo placeholder - replace with actual logo */}
            <div className="mb-4 text-[#2D3748] font-black text-2xl uppercase tracking-tighter">
              JS Choice
            </div>
            <h2 className="text-3xl text-[#2D3748] font-black uppercase tracking-tight">
              NDIS Budget
              <div className="text-primary">Calculator Summary</div>
            </h2>
          </div>
          <div className="text-right">
            <div className="bg-[#2D3748] text-white px-4 py-2 rounded-lg font-bold text-sm uppercase tracking-wider inline-block mb-2">
              Created
            </div>
            <p className="text-xl font-bold text-gray-900">{today}</p>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
          <p className="text-gray-600 font-medium leading-relaxed text-lg">
            Compare this summary with your NDIS plan to check whether the supports you've selected align with your budgets.
            This document outlines your estimated costs based on your selected items.
          </p>
        </div>
      </div>

      {/* Grouped Items */}
      <div className="space-y-10">
        {groupedData.map((group) => (
          <div key={group.purpose} className="break-inside-avoid">
            {/* Group Header */}
            <div className="flex items-center justify-between mb-6 pb-2 border-b-2 border-gray-200">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-8 rounded-full ${group.purpose === 'Core' ? 'bg-blue-400' :
                  group.purpose === 'Capital' ? 'bg-purple-400' : 'bg-primary'
                  }`} />
                <h3 className="text-2xl font-black text-[#2D3748] uppercase tracking-wide">
                  {group.purpose} Supports
                </h3>
              </div>
              <span className="text-2xl font-black text-[#2D3748]">
                ${group.total.toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>

            {/* Items */}
            <div className="space-y-4 mb-8">
              {group.items.map((item) => (
                <div key={item.id} className="break-inside-avoid bg-gray-50 rounded-xl p-5 border border-gray-100">
                  <div className="grid grid-cols-[1fr_auto] gap-6">
                    <div>
                      {/* Category */}
                      <div className="flex items-center gap-2 mb-1">
                        <span className="bg-white border border-gray-200 px-2 py-0.5 rounded text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                          Cat {item.supportItem.support_category_number}
                        </span>
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                          {item.supportItem.support_category_name}
                        </span>
                      </div>

                      {/* Item Name */}
                      <div className="font-bold text-[#2D3748] text-lg leading-tight mb-2">
                        {item.supportItem.support_item_name}
                      </div>
                      <div className="text-xs text-gray-400 font-mono font-bold">
                        {item.supportItem.support_item_number}
                      </div>
                    </div>

                    {/* Calculation */}
                    <div className="text-right">
                      <div className="text-xl font-black text-[#2D3748] mb-1">
                        ${item.cost.toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </div>
                      <div className="text-xs font-bold text-gray-500 bg-white px-2 py-1 rounded inline-block border border-gray-200">
                        ${item.price.toFixed(2)} × {item.quantity} × {item.frequencyNumber}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Grand Total */}
      <div className="mt-10 pt-8 border-t-4 border-[#2D3748]">
        <div className="flex items-center justify-between py-8 px-8 bg-[#2D3748] rounded-2xl text-white">
          <span className="text-2xl font-bold uppercase tracking-widest text-gray-300">
            Total Estimate
          </span>
          <span className="text-5xl font-black tracking-tight">
            ${grandTotal.toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 pt-8 border-t border-gray-200 text-sm text-gray-500">
        <div className="grid grid-cols-[auto_1fr] gap-4 mb-4">
          <div className="font-black text-[#2D3748] uppercase tracking-wider">Note:</div>
          <div className="font-medium leading-relaxed">
            As you would understand, JS Choice can only reimburse costs that are approved by the NDIS.
            Any questions? Call our friendly team on <span className="font-bold text-[#2D3748]">03 9394 6305</span>.
          </div>
        </div>
        <p className="text-xs text-gray-400 italic">
          This is an estimate only. Actual costs may vary based on your specific needs, service providers,
          and plan details. Always consult with your NDIS planner or support coordinator for accurate budgeting.
        </p>
      </div>
    </div>
  );
}
