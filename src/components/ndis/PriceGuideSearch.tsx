'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { Search, X, Loader2, ChevronDown } from 'lucide-react';
import { useDebounce } from '@/hooks/useDebounce';
import { useNdisSearch } from '@/hooks/useNdisSearch';
import SearchResultCard from './SearchResultCard';
import type { NdisCategory, NdisSupportItem } from '@/types/ndis';

interface PriceGuideSearchProps {
  categories?: NdisCategory[];
}

// Define support purpose groupings
const SUPPORT_PURPOSE_GROUPS = {
  'Core Supports': [1, 2, 3, 4, 16, 21],
  'Capital Supports': [5, 6, 17, 19],
  'Capacity-Building Supports': [7, 8, 9, 10, 11, 12, 13, 14, 15, 20],
  'Recurring Supports': [18],
};

interface AutocompleteSuggestion {
  number: number;
  name: string;
  purpose: string;
}

export default function PriceGuideSearch({ categories = [] }: PriceGuideSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>();
  const [showAllCategories, setShowAllCategories] = useState(true); // Default to showing all
  const [showDropdown, setShowDropdown] = useState(false);
  const [suggestions, setSuggestions] = useState<AutocompleteSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const debouncedQuery = useDebounce(searchQuery, 300);
  const { items, loading, error, search, clear } = useNdisSearch();

  // Group categories by support purpose
  const groupedCategories = useMemo(() => {
    const groups: Record<string, NdisCategory[]> = {
      'Core Supports': [],
      'Capital Supports': [],
      'Capacity-Building Supports': [],
      'Recurring Supports': [],
    };

    categories.forEach((category) => {
      for (const [groupName, categoryNumbers] of Object.entries(SUPPORT_PURPOSE_GROUPS)) {
        if (categoryNumbers.includes(category.category_number)) {
          groups[groupName].push(category);
          break;
        }
      }
    });

    return groups;
  }, [categories]);

  // Fetch autocomplete suggestions
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!debouncedQuery || debouncedQuery.length < 1) {
        setSuggestions([]);
        return;
      }

      setLoadingSuggestions(true);
      try {
        const res = await fetch(`/api/ndis/autocomplete?q=${encodeURIComponent(debouncedQuery)}&limit=10`);
        const data = await res.json();
        setSuggestions(data.suggestions || []);
      } catch (err) {
        console.error('Autocomplete error:', err);
        setSuggestions([]);
      } finally {
        setLoadingSuggestions(false);
      }
    };

    fetchSuggestions();
  }, [debouncedQuery]);

  // State for tracking visible count per group
  const [visibleCounts, setVisibleCounts] = useState<Record<string, number>>({
    'Core Supports': 9,
    'Capital Supports': 9,
    'Capacity-Building Supports': 9,
    'Recurring Supports': 9,
  });

  // State for single category view pagination
  const [visibleCountSingle, setVisibleCountSingle] = useState(9);

  const handleViewMore = (groupName: string) => {
    setVisibleCounts(prev => ({
      ...prev,
      [groupName]: (prev[groupName] || 9) + 6 // Load 6 more
    }));
  };

  const handleViewMoreSingle = () => {
    setVisibleCountSingle(prev => prev + 6);
  };

  // Trigger search when query or category changes
  useEffect(() => {
    if (debouncedQuery || selectedCategory !== undefined || showAllCategories) {
      search({
        query: debouncedQuery,
        category: selectedCategory,
        limit: 1500, // Fetch many items to support View More
        showAll: showAllCategories // Add flag to indicate show all
      });
    } else {
      clear();
    }
  }, [debouncedQuery, selectedCategory, showAllCategories, search, clear]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleClearSearch = () => {
    setSearchQuery('');
    setSelectedCategory(undefined);
    setShowAllCategories(false);
    setSuggestions([]);
    // Reset visible counts
    setVisibleCounts({
      'Core Supports': 9,
      'Capital Supports': 9,
      'Capacity-Building Supports': 9,
      'Recurring Supports': 9,
    });
    setVisibleCountSingle(9);
    clear();
  };

  const handleSelectSuggestion = (suggestion: AutocompleteSuggestion) => {
    // When user clicks a category suggestion, select that category
    setSelectedCategory(suggestion.number);
    setSearchQuery('');
    setShowSuggestions(false);
    setShowAllCategories(false);
    setVisibleCountSingle(9); // Reset when selecting from autocomplete
  };

  const handleCategorySelect = (categoryNumber: number | undefined) => {
    setSelectedCategory(categoryNumber);
    setShowAllCategories(categoryNumber === undefined);
    setShowDropdown(false);
    // Reset visible counts when mode changes
    setVisibleCounts({
      'Core Supports': 9,
      'Capital Supports': 9,
      'Capacity-Building Supports': 9,
      'Recurring Supports': 9,
    });
    setVisibleCountSingle(9);
  };

  const getSelectedCategoryName = () => {
    if (showAllCategories || selectedCategory === undefined) return 'Show all categories';
    const cat = categories.find(c => c.category_number === selectedCategory);
    return cat ? `${cat.category_number} ${cat.category_name}` : 'Select category';
  };

  // Group items by support purpose for display
  const groupedItems = useMemo(() => {
    if (!showAllCategories) return null;

    const groups: Record<string, NdisSupportItem[]> = {
      'Core Supports': [],
      'Capital Supports': [],
      'Capacity-Building Supports': [],
      'Recurring Supports': [],
    };

    items.forEach((item) => {
      for (const [groupName, categoryNumbers] of Object.entries(SUPPORT_PURPOSE_GROUPS)) {
        if (categoryNumbers.includes(item.support_category_number)) {
          groups[groupName].push(item);
          break;
        }
      }
    });

    return groups;
  }, [items, showAllCategories]);

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      {/* Search Bar with Autocomplete */}
      <div className="bg-white rounded-[2rem] shadow-xl border border-gray-100 p-8 space-y-6">
        <div className="relative" ref={searchRef}>
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            placeholder="Search by support item name or code..."
            className="w-full pl-14 pr-12 py-5 bg-gray-50 border border-gray-200 rounded-2xl text-lg font-medium text-gray-900 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 placeholder:text-gray-400"
          />
          {searchQuery && (
            <button
              onClick={handleClearSearch}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors bg-gray-200 rounded-full p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          {/* Autocomplete Suggestions Dropdown */}
          {showSuggestions && searchQuery && suggestions.length > 0 && (
            <div className="absolute z-50 w-full mt-3 bg-white border border-gray-100 rounded-2xl shadow-2xl overflow-hidden max-h-80 overflow-y-auto custom-scrollbar">
              {loadingSuggestions && (
                <div className="p-6 text-center text-gray-400">
                  <Loader2 className="w-6 h-6 animate-spin inline" />
                </div>
              )}
              {!loadingSuggestions && suggestions.map((suggestion) => (
                <button
                  key={suggestion.number}
                  onClick={() => handleSelectSuggestion(suggestion)}
                  className="w-full px-6 py-4 text-left hover:bg-gray-50 flex items-center gap-4 border-b border-gray-50 last:border-b-0 transition-all duration-200 group"
                >
                  <span className="font-bold text-primary bg-primary/10 px-2 py-1 rounded text-sm min-w-[3rem] text-center">{suggestion.number}</span>
                  <span className="text-gray-700 font-medium group-hover:text-gray-900 line-clamp-1">{suggestion.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Category Filter Dropdown */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Filter by Category</label>
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="w-full px-5 py-4 bg-white border border-gray-200 rounded-2xl hover:border-gray-300 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-300 flex items-center justify-between text-left group"
            >
              <span className={`font-medium text-lg ${selectedCategory !== undefined ? 'text-[#2D3748]' : 'text-gray-500'}`}>
                {getSelectedCategoryName()}
              </span>
              <ChevronDown className={`w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
            </button>

            {/* Grouped Dropdown Menu */}
            {showDropdown && (
              <div
                className="absolute z-50 w-full mt-3 bg-white rounded-2xl shadow-2xl overflow-hidden border border-secondary/20"
                style={{ maxHeight: '400px', overflowY: 'auto' }}
              >
                {/* Show All Categories Option */}
                <button
                  onClick={() => handleCategorySelect(undefined)}
                  className={`w-full px-6 py-4 text-left flex items-center gap-3 border-b border-gray-100 hover:bg-secondary/5 transition-all duration-200 ${showAllCategories ? 'bg-secondary text-[#1A202C]' : 'text-gray-700'}`}
                >
                  <span className="font-bold">Show all categories</span>
                </button>

                {/* Render Groups */}
                {Object.entries(groupedCategories).map(([groupName, cats]) => {
                  if (cats.length === 0) return null;
                  return (
                    <div key={groupName}>
                      <div className="px-6 py-3 bg-gray-50 text-gray-500 font-bold uppercase tracking-wider text-xs sticky top-0 border-b border-gray-100">
                        {groupName}
                      </div>
                      {cats.map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => handleCategorySelect(cat.category_number)}
                          className={`w-full px-6 py-3 text-left transition-all duration-200 flex items-start gap-3 hover:bg-secondary/10 ${selectedCategory === cat.category_number ? 'bg-secondary/20 text-gray-900' : 'text-gray-600'}`}
                        >
                          <span className={`font-mono pt-0.5 ${selectedCategory === cat.category_number ? 'opacity-100 font-bold' : 'opacity-50'}`}>{cat.category_number}</span>
                          <span className={`font-medium text-sm ${selectedCategory === cat.category_number ? 'font-bold' : ''}`}>{cat.category_name}</span>
                        </button>
                      ))}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-8">
        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
            <span className="text-gray-500 font-medium">Searching database...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-100 rounded-2xl p-6 text-red-600 font-medium text-center">
            {error}
          </div>
        )}

        {/* Results Count */}
        {!loading && items && items.length > 0 && (
          <div className="flex items-center gap-2 px-2">
            <div className="h-px bg-gray-200 flex-1" />
            <div className="text-sm text-gray-500 font-medium uppercase tracking-wide">
              Showing <span className="text-[#2D3748] font-bold">{items.length}</span> results
            </div>
            <div className="h-px bg-gray-200 flex-1" />
          </div>
        )}

        {/* Grouped Results (when "Show All Categories" is selected) */}
        {!loading && showAllCategories && groupedItems && (
          <div className="space-y-12">
            {Object.entries(groupedItems).map(([groupName, groupItems]) => {
              if (groupItems.length === 0) return null;

              const visibleCount = visibleCounts[groupName] || 9;
              const displayedItems = groupItems.slice(0, visibleCount);
              const hasMore = groupItems.length > visibleCount;

              return (
                <div key={groupName} className="bg-white rounded-[2rem] shadow-lg border border-gray-100 p-8">
                  {/* Group Header */}
                  <div className="mb-8 border-b border-gray-100 pb-6">
                    <h2 className="text-2xl font-black text-[#2D3748] mb-3 uppercase tracking-tight">{groupName}</h2>
                    <p className="text-gray-500 text-lg leading-relaxed max-w-4xl">
                      {groupName === 'Core Supports' && 'The basic things you need to function in your daily life. Examples: house cleaning, transport or help preparing meals.'}
                      {groupName === 'Capital Supports' && 'For larger, one-off items that support you in your daily life. Examples: wheelchair, assistive technology, home modifications.'}
                      {groupName === 'Capacity-Building Supports' && 'Supports that help you build skills and independence. Examples: support coordination, therapy, or employment support.'}
                      {groupName === 'Recurring Supports' && 'Ongoing supports that require regular funding. Examples: consumables and assistance with daily tasks.'}
                    </p>
                  </div>

                  {/* Cards Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {displayedItems.map((item) => (
                      <SearchResultCard key={item.id} item={item} hidePurposeBadge={true} />
                    ))}
                  </div>

                  {/* View More Button */}
                  {hasMore && (
                    <div className="flex justify-center">
                      <button
                        onClick={() => handleViewMore(groupName)}
                        className="flex items-center gap-3 px-8 py-3 bg-gray-100 text-gray-600 font-bold uppercase tracking-wider text-sm rounded-full hover:bg-gray-200 hover:text-gray-900 transition-all duration-300"
                      >
                        <span>View more {groupName}</span>
                        <ChevronDown className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Single Category Results */}
        {!loading && !showAllCategories && items && items.length > 0 && (
          <div className="bg-white rounded-[2rem] shadow-lg border border-gray-100 p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.slice(0, visibleCountSingle).map((item) => (
                <SearchResultCard key={item.id} item={item} hidePurposeBadge={true} />
              ))}
            </div>
            {items.length > visibleCountSingle && (
              <div className="flex justify-center mt-12">
                <button
                  onClick={handleViewMoreSingle}
                  className="flex items-center gap-3 px-8 py-3 bg-gray-100 text-gray-600 font-bold uppercase tracking-wider text-sm rounded-full hover:bg-gray-200 hover:text-gray-900 transition-all duration-300"
                >
                  <span>Load More Results</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Empty State */}
        {!loading && (searchQuery || selectedCategory !== undefined || showAllCategories) && items && items.length === 0 && !error && (
          <div className="text-center py-20 bg-gray-50 rounded-[2rem] border border-gray-200">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
              <Search className="w-8 h-8 text-gray-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No results found</h3>
            <p className="text-gray-500">
              We couldn't find anything matching your criteria.
            </p>
          </div>
        )}

        {/* Initial State */}
        {!loading && !searchQuery && selectedCategory === undefined && !showAllCategories && (
          <div className="text-center py-24 bg-white rounded-[2rem] border border-gray-100 shadow-lg">
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-2xl font-black text-[#2D3748] mb-3 uppercase tracking-tight">Ready to Search?</h3>
            <p className="text-gray-500 text-lg max-w-md mx-auto">
              Use the search bar above or select a category to browse the NDIS Price Guide.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
