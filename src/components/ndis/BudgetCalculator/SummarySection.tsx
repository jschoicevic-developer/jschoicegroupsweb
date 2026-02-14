'use client';

import { useMemo } from 'react';
import { PlanPartnersBudgetItem, SupportPurpose } from '@/types/ndis';
import { Download, Printer } from 'lucide-react';
import { downloadAsPDF, printToPDF } from '@/lib/pdf-generator';

interface Props {
    items: PlanPartnersBudgetItem[];
}

interface GroupedItems {
    purpose: SupportPurpose;
    items: PlanPartnersBudgetItem[];
    total: number;
}

// Map category numbers to support purpose
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
    17: 'Capital',
    19: 'Capital',
    21: 'Core',
};

/**
 * Summary Section - Phase 4
 * Groups items by support purpose and displays totals
 * Displayed inline below calculation table
 */
export default function SummarySection({ items }: Props) {
    // Group items by support purpose
    const groupedData = useMemo(() => {
        const groups: Record<SupportPurpose, PlanPartnersBudgetItem[]> = {
            'Core': [],
            'Capital': [],
            'Capacity Building': []
        };

        items.forEach(item => {
            const purpose = SUPPORT_PURPOSE_MAP[item.supportItem.support_category_number] || 'Core';
            groups[purpose].push(item);
        });

        // Calculate totals for each group
        const result: GroupedItems[] = [];
        (['Core', 'Capital', 'Capacity Building'] as SupportPurpose[]).forEach(purpose => {
            if (groups[purpose].length > 0) {
                result.push({
                    purpose,
                    items: groups[purpose],
                    total: groups[purpose].reduce((sum, item) => sum + item.cost, 0)
                });
            }
        });

        return result;
    }, [items]);

    const grandTotal = items.reduce((sum, item) => sum + item.cost, 0);

    const handlePrint = () => {
        printToPDF(items);
    };

    const handleDownload = () => {
        // Download as PDF using the PDF generator
        downloadAsPDF(items);
    };



    if (items.length === 0) return null;

    return (

        <div id="budget-summary" className="mt-12 bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-gray-100 animate-in fade-in slide-in-from-bottom-8 duration-700">
            {/* Header */}
            <div className="bg-white px-8 py-8 border-b border-gray-100">
                <h2 className="text-3xl font-black text-[#0B3B48] mb-2">Budget Summary</h2>
                <p className="text-gray-500 font-medium">
                    Overview of your estimated costs grouped by support purpose.
                </p>
            </div>

            {/* Content */}
            <div className="px-8 py-8 md:px-12 bg-white">
                <div className="space-y-10">
                    {groupedData.map((group) => (
                        <div key={group.purpose} className="space-y-6">
                            {/* Group Header */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className={`w-2 h-8 rounded-full ${group.purpose === 'Core' ? 'bg-[#3182CE]' :
                                        group.purpose === 'Capital' ? 'bg-[#805AD5]' : 'bg-[#D69E2E]'
                                        }`} />
                                    <h3 className="text-2xl font-black text-[#2D3748]">
                                        {group.purpose} Supports
                                    </h3>
                                </div>
                                <span className="text-2xl font-black text-[#2C7A7B]">
                                    ${group.total.toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </span>
                            </div>

                            {/* Items in this group */}
                            <div className="space-y-4">
                                {group.items.map((item) => (
                                    <div key={item.id} className="bg-gray-50/50 rounded-xl p-6 transition-all border border-gray-100/50 hover:bg-gray-50">
                                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                                            <div className="flex-1">
                                                {/* Category */}
                                                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                                                    CATEGORY {item.supportItem.support_category_number} • {item.supportItem.support_category_name}
                                                </div>

                                                {/* Item Name */}
                                                <div className="font-bold text-[#2D3748] text-lg mb-1 leading-tight">
                                                    {item.supportItem.support_item_name}
                                                    <a
                                                        href={`/tools/ndis-price-guide/${item.supportItem.support_item_number}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-block ml-2 text-gray-400 hover:text-primary transition-colors"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                                                    </a>
                                                </div>
                                                <div className="text-xs text-gray-400 font-mono tracking-wider">
                                                    {item.supportItem.support_item_number}
                                                </div>
                                            </div>

                                            {/* Cost */}
                                            <div className="text-right">
                                                <div className="text-xl font-black text-[#2C7A7B]">
                                                    ${item.cost.toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                </div>
                                                <div className="text-xs text-gray-500 font-medium mt-1">
                                                    {item.quantity} × {item.frequencyNumber} {item.frequencyType.toLowerCase()}s
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer - Total */}
            <div className="bg-[#0B3B48] text-white px-8 py-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                    <div>
                        <span className="block text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Total Estimated Annual Cost</span>
                        <span className="text-4xl md:text-5xl font-black text-white tracking-tight">
                            ${grandTotal.toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={handleDownload}
                            className="flex items-center justify-center gap-2 px-6 py-3 bg-[#136F63] hover:bg-[#0F5A50] text-white font-bold rounded-lg transition-colors shadow-lg text-sm uppercase tracking-wide"
                        >
                            <Download className="w-4 h-4" />
                            Download PDF
                        </button>

                        <button
                            onClick={handlePrint}
                            className="flex items-center justify-center gap-2 px-6 py-3 bg-[#2D3748] hover:bg-[#3A4A60] border border-gray-600 text-white font-bold rounded-lg transition-colors text-sm uppercase tracking-wide"
                        >
                            <Printer className="w-4 h-4" />
                            Print Summary
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}


