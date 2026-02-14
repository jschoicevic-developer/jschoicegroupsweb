'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, Plus, Calculator, Trash2, Check, ChevronDown, RefreshCw } from 'lucide-react';
import { useDebounce } from '@/hooks/useDebounce';
import { useNdisSearch } from '@/hooks/useNdisSearch';
import BudgetItemRow from './BudgetItemRow';
import SummarySection from './BudgetCalculator/SummarySection';
import type { PlanPartnersBudgetItem, Region, NdisSupportItem, NdisCategory } from '@/types/ndis';
import { FREQUENCY_MULTIPLIERS, REGION_LABELS } from '@/types/ndis';

interface BudgetCalculatorProps {
  categories?: NdisCategory[];
}

export default function BudgetCalculator({ categories = [] }: BudgetCalculatorProps) {
  const [region, setRegion] = useState<Region | ''>('');
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>();
  const [searchQuery, setSearchQuery] = useState('');
  const [budgetItems, setBudgetItems] = useState<PlanPartnersBudgetItem[]>([]);
  const [showSearch, setShowSearch] = useState(false);

  // Refs for scrolling
  const q2Ref = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const debouncedQuery = useDebounce(searchQuery, 400);
  const { items, loading, search, clear } = useNdisSearch();

  // Trigger search
  useEffect(() => {
    if ((debouncedQuery || selectedCategory !== undefined) && showSearch) {
      search({
        query: debouncedQuery,
        category: selectedCategory,
        limit: 50
      });
    } else {
      clear();
    }
  }, [debouncedQuery, selectedCategory, showSearch, search, clear]);

  const handleRegionChange = (newRegion: string) => {
    setRegion(newRegion as Region);
    // Auto-scroll to next step after a brief delay
    setTimeout(() => {
      q2Ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  const handleCategoryChange = (catId: string) => {
    const catNum = parseInt(catId);
    setSelectedCategory(isNaN(catNum) ? undefined : catNum);
    setShowSearch(true);
    // Auto-scroll to search results
    setTimeout(() => {
      searchRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const addItem = (supportItem: NdisSupportItem) => {
    if (!region) {
      alert('Please select a region first');
      return;
    }

    const priceKey = `price_${region.toLowerCase()}` as keyof NdisSupportItem;
    const price = (supportItem[priceKey] as number) || 0;

    // Allow adding items even if price is 0 (Quote Required items)

    const frequencyNumber = 52;
    const quantity = 1;
    const cost = price * quantity * frequencyNumber;

    const newItem: PlanPartnersBudgetItem = {
      id: `${supportItem.id}-${Date.now()}`,
      supportItem,
      price,
      quantity,
      frequencyNumber,
      frequencyType: 'Week',
      cost
    };

    setBudgetItems([...budgetItems, newItem]);
    // Don't clear category, let them add more from same category if they want
    // But maybe clear specific query
    setSearchQuery('');
  };

  const updateItem = (id: string, updates: Partial<PlanPartnersBudgetItem>) => {
    setBudgetItems(budgetItems.map(item =>
      item.id === id ? { ...item, ...updates } : item
    ));
  };

  const removeItem = (id: string) => {
    setBudgetItems(budgetItems.filter(item => item.id !== id));
  };

  const resetCalculator = () => {
    if (confirm('Are you sure you want to clear your budget and start over?')) {
      setRegion('');
      setSelectedCategory(undefined);
      setBudgetItems([]);
      setShowSearch(false);
      setSearchQuery('');
    }
  };

  const totalAnnualCost = budgetItems.reduce((sum, item) => sum + item.cost, 0);



  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <div className="space-y-8">
        {/* Main Controls - Steps Flow */}
        <div className="space-y-8">

          {/* Intro Banner */}
          <div className="bg-[#E6FFFA] rounded-2xl p-6 flex items-start gap-4 border border-[#38B2AC]/20">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-[#38B2AC] rounded-full flex items-center justify-center shadow-md">
                <span className="text-white font-black text-xs uppercase tracking-wider">Start</span>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-[#2C7A7B] text-lg mb-1">NDIS Budget Calculator</h3>
              <p className="text-[#285E61] text-sm leading-relaxed">
                Follow the questions below to build your estimated budget. Simply answer the first question to reveal the next step.
              </p>
            </div>
          </div>

          {/* Question 1: Region */}
          <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8 relative overflow-hidden group hover:shadow-md transition-shadow">
            <div className={`absolute top-0 left-0 w-2 h-full ${region ? 'bg-[#38B2AC]' : 'bg-gray-200'}`} />
            <h2 className="text-xl font-bold text-[#2D3748] mb-2">Question 1: Which state/region do you live in?</h2>
            <p className="text-gray-500 text-sm mb-6">Why does this matter? NDIS price limits vary depending on where you live.</p>

            <div className="relative max-w-md">
              <select
                value={region}
                onChange={(e) => handleRegionChange(e.target.value)}
                className={`w-full p-4 pr-10 rounded-xl border-2 font-bold text-[#2D3748] appearance-none cursor-pointer outline-none transition-all ${region ? 'bg-[#E6FFFA] border-[#38B2AC] text-[#2C7A7B]' : 'bg-gray-50 border-gray-200 hover:border-gray-300'}`}
              >
                <option value="" disabled>Select your region</option>
                {Object.entries(REGION_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
              <ChevronDown className={`absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none ${region ? 'text-[#38B2AC]' : 'text-gray-400'}`} />
            </div>
          </div>

          {/* Question 2: Category (Reveals after Region selected) */}
          {region && (
            <div ref={q2Ref} className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8 relative overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className={`absolute top-0 left-0 w-2 h-full ${selectedCategory ? 'bg-[#38B2AC]' : 'bg-gray-200'}`} />
              <h2 className="text-xl font-bold text-[#2D3748] mb-2">Question 2: Select support category</h2>
              <p className="text-gray-500 text-sm mb-6">Unsure which category to select? Choose 'Show All' or browse the list.</p>

              <div className="relative max-w-md">
                <select
                  value={selectedCategory || ''}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className={`w-full p-4 pr-10 rounded-xl border-2 font-bold text-[#2D3748] appearance-none cursor-pointer outline-none transition-all ${selectedCategory ? 'bg-[#E6FFFA] border-[#38B2AC] text-[#2C7A7B]' : 'bg-gray-50 border-gray-200 hover:border-gray-300'}`}
                >
                  <option value="" disabled>Select support category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.category_number}>
                      {cat.category_number}. {cat.category_name}
                    </option>
                  ))}
                </select>
                <ChevronDown className={`absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none ${selectedCategory ? 'text-[#38B2AC]' : 'text-gray-400'}`} />
              </div>
            </div>
          )}

          {/* Filtered Search / Add Items (Reveals after Category selected) */}
          {region && showSearch && (
            <div ref={searchRef} className="bg-white rounded-[2rem] shadow-xl border border-gray-100 p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-[#2D3748]">Add Support Items</h2>
                  <p className="text-gray-500 text-sm">Select items from the list below to add them to your budget.</p>
                </div>
                {/* Search Box */}
                <div className="relative w-full max-w-xs">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search specific item..."
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium text-sm"
                  />
                </div>
              </div>

              {/* Results List */}
              <div className="space-y-3 max-h-[500px] overflow-y-auto custom-scrollbar pr-2">
                {loading && (
                  <div className="text-center py-12">
                    <p className="text-gray-500">Loading items...</p>
                  </div>
                )}

                {!loading && items.length === 0 && (
                  <div className="text-center py-12 bg-gray-50 rounded-xl border-dashed border-2 border-gray-200">
                    <p className="text-gray-500">No items found in this category matching your search.</p>
                  </div>
                )}

                {!loading && items.map((item) => (
                  <div key={item.id} className="flex flex-col sm:flex-row items-center justify-between p-4 border border-gray-100 rounded-xl hover:border-primary/50 hover:bg-primary/5 transition-all group">
                    <div className="mb-2 sm:mb-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="bg-gray-100 text-gray-500 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                          {item.support_item_number}
                        </span>
                        <span className="text-[10px] font-bold text-gray-400 uppercase">{item.unit}</span>
                      </div>
                      <h4 className="font-bold text-[#2D3748] text-sm leading-tight group-hover:text-primary transition-colors">
                        {item.support_item_name}
                      </h4>
                    </div>
                    <div className="flex items-center gap-4 w-full sm:w-auto mt-2 sm:mt-0 justify-between sm:justify-end">
                      <div className="text-right">
                        <span className="block font-black text-[#2D3748]">
                          ${((item[`price_${region.toLowerCase()}` as keyof NdisSupportItem] as number) || 0).toFixed(2)}
                        </span>
                      </div>
                      <button
                        onClick={() => addItem(item)}
                        className="p-2 bg-[#2D3748] text-white rounded-lg hover:bg-primary hover:text-white transition-colors shadow-md"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {budgetItems.length > 0 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-500">

              {/* Header Text */}
              <div>
                <h3 className="text-2xl font-black text-[#2D3748] mb-2">Calculate costs</h3>
                <p className="text-gray-500">Easily adjust the quantity and frequency of your supports to calculate an estimate of total costs.</p>
              </div>

              {/* Table Container */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">

                {/* Dark Header */}
                <div className="bg-[#0B3B48] text-white p-6 grid grid-cols-12 gap-4 hidden lg:grid">
                  <div className="col-span-4 font-bold">Support Item</div>
                  <div className="col-span-2 font-bold">Price</div>
                  <div className="col-span-1 font-bold">Quantity</div>
                  <div className="col-span-3 font-bold pl-8">Frequency</div>
                  <div className="col-span-2 font-bold text-right pr-12">Cost</div>
                </div>

                {/* Rows */}
                <div>
                  {budgetItems.map((item) => (
                    <BudgetItemRow
                      key={item.id}
                      item={item}
                      onUpdate={updateItem}
                      onRemove={removeItem}
                    />
                  ))}
                </div>
              </div>

              {/* Total Estimate Bar */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                <h3 className="text-2xl font-black text-[#2D3748]">Total Estimate</h3>
                <span className="text-4xl font-black text-[#2C7A7B]">
                  ${totalAnnualCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>

            </div>
          )}

        </div>

      </div>

      {/* Summary Section - Now at the bottom */}
      {budgetItems.length > 0 && (
        <SummarySection items={budgetItems} />
      )}
    </div>

  );
}
