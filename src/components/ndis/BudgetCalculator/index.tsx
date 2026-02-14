'use client';

import { useState } from 'react';
import { PlanPartnersBudgetItem, Region, BudgetFrequencyType } from '@/types/ndis';
import StepIndicator from './StepIndicator';
import RegionSelector from './RegionSelector';
import CategorySelector from './CategorySelector';
import SupportItemSearch from './SupportItemSearch';
import CalculationTable from './CalculationTable';
import SummarySection from './SummarySection';
import PrintView from './PrintView';
import { Plus } from 'lucide-react';


/**
 * NDIS Budget Calculator - Plan Partners Design
 *
 * Progressive disclosure pattern:
 * 1. Select Region
 * 2. Select Category
 * 3. Search Items
 * 4. Calculate Costs
 * 5. View Summary
 */
export default function BudgetCalculator() {
  // State Management
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [items, setItems] = useState<PlanPartnersBudgetItem[]>([]);

  // Handlers
  const handleRegionSelect = (region: Region) => {
    setSelectedRegion(region);
    setCurrentStep(2); // Reveal next question
  };

  const handleCategorySelect = (categoryNumber: number) => {
    setSelectedCategory(categoryNumber);
    setCurrentStep(3); // Reveal search
  };

  const handleItemAdd = (supportItem: any) => {
    // Get price for selected region
    const regionKey = selectedRegion?.toLowerCase() || 'vic';
    const priceKey = `price_${regionKey}` as keyof typeof supportItem;
    const price = supportItem[priceKey] || supportItem.price || 0;

    const newItem: PlanPartnersBudgetItem = {
      id: `${supportItem.id}-${Date.now()}`,
      supportItem,
      price,
      quantity: 1,
      frequencyNumber: 52, // Default to weekly
      frequencyType: 'Week',
      cost: price * 1 * 52
    };

    setItems([...items, newItem]);
  };

  const handleItemUpdate = (id: string, updates: Partial<PlanPartnersBudgetItem>) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const updated = { ...item, ...updates };
        // Recalculate cost
        updated.cost = updated.price * updated.quantity * updated.frequencyNumber;
        return updated;
      }
      return item;
    }));
  };

  const handleItemDelete = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleReset = () => {
    if (confirm('Reset your calculations? Calculations you have made will no longer be available.')) {
      setItems([]);
      setSelectedCategory(null);
      setSelectedRegion(null);
      setCurrentStep(1);
    }
  };

  // Calculate total
  const totalEstimate = items.reduce((sum, item) => sum + item.cost, 0);

  return (
    <div className="w-full max-w-5xl mx-auto budget-calculator">
      <div className="print:hidden">
        {/* Step Indicator */}
        <StepIndicator />

        {/* Question 1: Region */}
        <RegionSelector
          selectedRegion={selectedRegion}
          onSelect={handleRegionSelect}
        />

        {/* Question 2: Category (revealed after region selected) */}
        {currentStep >= 2 && (
          <CategorySelector
            selectedCategory={selectedCategory}
            onSelect={handleCategorySelect}
          />
        )}

        {/* Question 3: Search (revealed after category selected) */}
        {currentStep >= 3 && selectedRegion && selectedCategory && (
          <SupportItemSearch
            selectedRegion={selectedRegion}
            selectedCategory={selectedCategory}
            onItemSelect={handleItemAdd}
          />
        )}

        {/* Calculation Table or Empty State */}
        {items.length > 0 ? (
          <>
            <CalculationTable
              items={items}
              onUpdate={handleItemUpdate}
              onDelete={handleItemDelete}
              onReset={handleReset}
              onAddAnother={() => {
                // Scroll to search
                const searchSection = document.getElementById('support-item-search');
                searchSection?.scrollIntoView({ behavior: 'smooth' });
              }}
              totalEstimate={totalEstimate}
            />

            {/* Summary Section - Inline below table */}
            <SummarySection items={items} />
          </>
        ) : currentStep >= 3 && (
          <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 p-8 md:p-12 mb-10 overflow-hidden">
            <div className="max-w-4xl mx-auto text-center py-12">
              <div className="w-24 h-24 bg-primary/10 rounded-3xl rotate-3 flex items-center justify-center mx-auto mb-8 shadow-lg shadow-primary/20 transition-transform hover:rotate-6">
                <Plus className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-3xl font-black text-[#2D3748] mb-4 uppercase tracking-tight">
                No items added yet
              </h3>
              <p className="text-gray-500 font-medium text-lg mb-8 max-w-lg mx-auto leading-relaxed">
                Search for NDIS support items above and add them to your budget calculator.
                You can adjust quantities and frequencies after adding items.
              </p>
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-gray-50 rounded-xl border border-gray-200 text-gray-400 font-bold text-sm uppercase tracking-wider">
                <span>💡 Try searching for: "self care", "transport", or "therapy"</span>
              </div>
            </div>
          </div>
        )}
      </div>



      {/* Print View (hidden on screen, visible when printing) */}
      <PrintView items={items} />
    </div>
  );
}
