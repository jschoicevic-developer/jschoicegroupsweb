'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { Region } from '@/types/ndis';

interface SearchResult {
  id: string;
  support_item_number: string;
  support_item_name: string;
  support_category_number: number;
  unit: string;
  price: number;
}

interface Props {
  selectedRegion: Region;
  selectedCategory: number | null;
  onItemSelect: (item: SearchResult) => void;
}

// Simple debounce hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Question 3: Support Item Search
 * Smart autocomplete with debounce
 */
export default function SupportItemSearch({
  selectedRegion,
  selectedCategory,
  onItemSelect
}: Props) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<SearchResult | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const debouncedQuery = useDebounce(query, 300);

  // Search when debounced query changes
  useEffect(() => {
    // Don't search if we have a selected item and the query matches its name
    // This prevents searching again when we select an item and populate the input
    if (selectedItem && query === selectedItem.support_item_name) {
      return;
    }

    if (debouncedQuery.length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const search = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams({
          q: debouncedQuery,
          region: selectedRegion,
          limit: '15',
        });

        // Add category filter if not "All" (0)
        if (selectedCategory && selectedCategory !== 0) {
          params.append('category', selectedCategory.toString());
        }

        const response = await fetch(`/api/ndis/search?${params}`);

        if (!response.ok) {
          throw new Error('Search failed');
        }

        const data = await response.json();

        if (data.success) {
          setResults(data.data);
          setIsOpen(data.data.length > 0);
          setHighlightedIndex(0);
        } else {
          throw new Error(data.error || 'Search failed');
        }
      } catch (error) {
        console.error('Search error:', error);
        setError('Unable to search. Please try again.');
        setResults([]);
        setIsOpen(false);
      } finally {
        setIsLoading(false);
      }
    };

    search();
  }, [debouncedQuery, selectedRegion, selectedCategory, selectedItem]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev =>
          prev < results.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => prev > 0 ? prev - 1 : 0);
        break;
      case 'Enter':
        e.preventDefault();
        if (results[highlightedIndex]) {
          handleSelect(results[highlightedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        break;
    }
  };

  const handleSelect = (item: SearchResult) => {
    setSelectedItem(item);
    setQuery(item.support_item_name);
    setResults([]);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const handleAddItem = () => {
    if (selectedItem) {
      onItemSelect(selectedItem);
      handleReset();
    }
  };

  const handleReset = () => {
    setQuery('');
    setSelectedItem(null);
    setResults([]);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div id="support-item-search" className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 p-8 md:p-12 mb-10 relative overflow-hidden transition-all duration-300 hover:shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="max-w-4xl">
        <h2 className="text-3xl font-black text-[#2D3748] mb-4 uppercase tracking-tight">
          <span className="text-primary mr-3">03.</span>
          Search Items
        </h2>

        <p className="text-gray-500 font-medium text-lg mb-8">
          Search by support name, keyword or line item number to add to your budget.
        </p>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 flex items-center gap-3">
            <div className="w-2 h-2 bg-red-500 rounded-full" />
            <p className="font-bold text-sm">⚠️ {error}</p>
          </div>
        )}

        {/* Search Input */}
        <div className="relative" ref={dropdownRef}>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
              {isLoading ? (
                <Loader2 className="h-6 w-6 text-primary animate-spin" />
              ) : (
                <Search className="h-6 w-6 text-gray-400 group-focus-within:text-primary transition-colors" />
              )}
            </div>

            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                if (selectedItem && e.target.value !== selectedItem.support_item_name) {
                  setSelectedItem(null);
                }
              }}
              onKeyDown={handleKeyDown}
              onFocus={() => {
                if (!selectedItem && results.length > 0) setIsOpen(true);
              }}
              placeholder="eg. Gardening or 1034567 or House Maintenance"
              className={`w-full pl-16 pr-6 py-5 text-lg border rounded-2xl
                       outline-none transition-all duration-300
                       ${selectedItem
                  ? 'border-primary/50 bg-primary/5 text-[#2D3748] font-bold'
                  : 'bg-gray-50 border-gray-200 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 text-gray-900 font-medium'}`}
              aria-label="Search for support items"
              aria-autocomplete="list"
              aria-controls="search-results"
              aria-expanded={isOpen}
            />
          </div>

          {/* Dropdown Results */}
          {isOpen && results.length > 0 && (
            <div
              id="search-results"
              role="listbox"
              className="absolute z-50 w-full mt-3 bg-white border border-gray-100 rounded-2xl shadow-2xl max-h-96 overflow-y-auto custom-scrollbar animate-in fade-in slide-in-from-top-2 duration-200"
            >
              {results.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  className={`w-full px-6 py-5 text-left hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0
                             ${index === highlightedIndex ? 'bg-gray-50' : ''}`}
                >
                  <div className="font-bold text-[#2D3748] mb-1.5 flex flex-wrap gap-2 text-lg">
                    {item.support_item_name}
                  </div>
                  <div className="text-sm font-medium flex items-center justify-between">
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs uppercase tracking-wide font-bold">{item.support_item_number}</span>
                    <span className="font-bold text-primary text-base">
                      ${item.price.toFixed(2)} <span className="text-gray-400 font-normal text-sm">/ {item.unit}</span>
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* No results message */}
          {isOpen && query.length >= 2 && results.length === 0 && !isLoading && (
            <div className="absolute z-50 w-full mt-3 bg-white border border-gray-100 rounded-2xl shadow-xl p-8 text-center animate-in fade-in zoom-in duration-200">
              <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3">
                <Search className="w-5 h-5 text-gray-400" />
              </div>
              <p className="text-[#2D3748] font-bold text-lg mb-1">
                No items found for "{query}"
              </p>
              <p className="text-sm text-gray-500">
                Try a different keyword or item number
              </p>
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-4 mt-8">
          <button
            onClick={handleAddItem}
            disabled={!selectedItem}
            className="px-10 py-4 bg-primary text-[#1A202C] font-black uppercase tracking-wider text-sm rounded-xl
                     hover:shadow-lg hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none
                     transition-all duration-300 shadow-md"
          >
            Add To Budget
          </button>

          <button
            onClick={handleReset}
            className="px-6 py-4 text-gray-500 hover:text-[#2D3748] font-bold uppercase tracking-wider text-sm transition-colors"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
