'use client';

import { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { CategoryWithPurpose } from '@/types/ndis';

interface Props {
  selectedCategory: number | null;
  onSelect: (categoryNumber: number) => void;
}

interface GroupedCategories {
  core: CategoryWithPurpose[];
  capital: CategoryWithPurpose[];
  capacity_building: CategoryWithPurpose[];
}

/**
 * Question 2: Support Category Selector
 * Grouped dropdown (Core, Capital, Capacity Building)
 */
export default function CategorySelector({ selectedCategory, onSelect }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState<CategoryWithPurpose[]>([]);
  const [grouped, setGrouped] = useState<GroupedCategories | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setError(null);
      const response = await fetch('/api/ndis/categories');

      if (!response.ok) {
        throw new Error('Failed to load categories');
      }

      const data = await response.json();

      if (data.success) {
        setCategories(data.data);
        setGrouped(data.grouped);
      } else {
        throw new Error(data.error || 'Failed to load categories');
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      setError('Unable to load categories. Please refresh the page.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (categoryNumber: number) => {
    onSelect(categoryNumber);
    setIsOpen(false);
  };

  const selectedCategoryName = categories.find(
    c => c.category_number === selectedCategory
  )?.category_name;

  return (
    <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 p-8 md:p-12 mb-8 relative overflow-hidden transition-all duration-300 hover:shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="max-w-4xl">
        <h2 className="text-3xl font-black text-[#2D3748] mb-4 uppercase tracking-tight">
          <span className="text-primary mr-3">02.</span>
          Select support category
        </h2>

        <p className="text-gray-500 font-medium text-lg mb-2">
          Unsure which category to select?{' '}
          <a
            href="/tools/ndis-price-guide"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:text-[#2D3748] font-bold transition-colors ml-1 uppercase tracking-wider text-sm"
          >
            Read Guide
            <ExternalLink className="w-4 h-4" />
          </a>
        </p>

        {/* Error Message */}
        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 flex items-center gap-3">
            <div className="w-2 h-2 bg-red-500 rounded-full" />
            <p className="font-bold text-sm">⚠️ {error}</p>
            <button
              onClick={() => {
                setLoading(true);
                fetchCategories();
              }}
              className="ml-auto text-sm text-red-700 underline font-bold hover:text-red-900"
            >
              Try again
            </button>
          </div>
        )}

        {/* Dropdown Button */}
        {!error && (
          <div className="relative mt-8 max-w-md">
            <button
              onClick={() => setIsOpen(!isOpen)}
              disabled={loading}
              className="w-full px-8 py-5 bg-[#2D3748] text-white rounded-2xl
                       font-bold text-lg flex items-center justify-between gap-4
                       hover:bg-[#1A202C] hover:scale-[1.02] transition-all duration-300 shadow-lg group
                       disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              aria-label="Select support category"
              aria-expanded={isOpen}
              aria-haspopup="listbox"
            >
              <span className="truncate">
                {loading
                  ? 'Loading...'
                  : selectedCategory && selectedCategoryName
                    ? `${selectedCategory} ${selectedCategoryName}`
                    : 'Select Category'}
              </span>
              {isOpen ? (
                <ChevronUp className="w-6 h-6 text-primary" />
              ) : (
                <ChevronDown className="w-6 h-6 text-gray-400 group-hover:text-primary transition-colors" />
              )}
            </button>

            {/* Dropdown Menu with Grouped Options */}
            {isOpen && grouped && (
              <div
                className="absolute z-50 mt-3 w-full bg-white rounded-2xl shadow-2xl border border-gray-100 max-h-[32rem] overflow-y-auto custom-scrollbar animate-in fade-in slide-in-from-top-2 duration-200"
                role="listbox"
                aria-label="Support categories"
              >
                {/* Core Supports + All Option */}
                <div className="border-b border-gray-100">
                  <div className="px-6 py-3 bg-gray-50 font-black text-[#2D3748] text-xs uppercase tracking-wider sticky top-0 border-b border-gray-100 backdrop-blur-sm bg-gray-50/90">
                    Core Supports
                  </div>
                  <button
                    onClick={() => handleSelect(0)}
                    className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors border-b border-gray-50 text-primary font-bold"
                  >
                    + Core supports - All
                  </button>
                  {grouped.core.map((category) => (
                    <button
                      key={category.category_number}
                      onClick={() => handleSelect(category.category_number)}
                      className={`w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors border-b border-gray-50 relative group
                               ${selectedCategory === category.category_number ? 'bg-primary/5 text-[#2D3748]' : 'text-gray-600'}`}
                    >
                      <span className={`font-bold mr-2 ${selectedCategory === category.category_number ? 'text-primary' : 'text-gray-400 group-hover:text-primary transition-colors'}`}>{category.category_number}</span>
                      <span className="font-medium group-hover:text-[#2D3748] transition-colors">{category.category_name}</span>
                    </button>
                  ))}
                </div>

                {/* Capacity Building */}
                <div className="border-b border-gray-100">
                  <div className="px-6 py-3 bg-gray-50 font-black text-[#2D3748] text-xs uppercase tracking-wider sticky top-0 border-b border-gray-100 backdrop-blur-sm bg-gray-50/90">
                    Capacity Building
                  </div>
                  {grouped.capacity_building.map((category) => (
                    <button
                      key={category.category_number}
                      onClick={() => handleSelect(category.category_number)}
                      className={`w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors border-b border-gray-50 relative group
                               ${selectedCategory === category.category_number ? 'bg-primary/5 text-[#2D3748]' : 'text-gray-600'}`}
                    >
                      <span className={`font-bold mr-2 ${selectedCategory === category.category_number ? 'text-primary' : 'text-gray-400 group-hover:text-primary transition-colors'}`}>{category.category_number}</span>
                      <span className="font-medium group-hover:text-[#2D3748] transition-colors">{category.category_name}</span>
                    </button>
                  ))}
                </div>

                {/* Capital */}
                <div>
                  <div className="px-6 py-3 bg-gray-50 font-black text-[#2D3748] text-xs uppercase tracking-wider sticky top-0 border-b border-gray-100 backdrop-blur-sm bg-gray-50/90">
                    Capital
                  </div>
                  {grouped.capital.map((category) => (
                    <button
                      key={category.category_number}
                      onClick={() => handleSelect(category.category_number)}
                      className={`w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0 relative group
                               ${selectedCategory === category.category_number ? 'bg-primary/5 text-[#2D3748]' : 'text-gray-600'}`}
                    >
                      <span className={`font-bold mr-2 ${selectedCategory === category.category_number ? 'text-primary' : 'text-gray-400 group-hover:text-primary transition-colors'}`}>{category.category_number}</span>
                      <span className="font-medium group-hover:text-[#2D3748] transition-colors">{category.category_name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
