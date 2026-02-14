import { useState, useEffect, useCallback } from 'react';
import type { NdisSupportItem, SearchParams } from '@/types/ndis';

interface UseNdisSearchResult {
  items: NdisSupportItem[];
  loading: boolean;
  error: string | null;
  total: number;
  hasMore: boolean;
  search: (params: SearchParams) => Promise<void>;
  clear: () => void;
}

/**
 * Hook to search NDIS support items
 */
export function useNdisSearch(): UseNdisSearchResult {
  const [items, setItems] = useState<NdisSupportItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  const search = useCallback(async (params: SearchParams) => {
    // Require either a query (min 1 char) OR a category OR showAll flag
    const hasValidQuery = params.query && params.query.trim().length >= 1;
    const hasCategory = params.category !== undefined;
    const showAll = params.showAll === true;

    if (!hasValidQuery && !hasCategory && !showAll) {
      setItems([]);
      setTotal(0);
      setHasMore(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const queryParams = new URLSearchParams();
      if (params.query && params.query.trim().length >= 1) {
        queryParams.set('query', params.query);
      }
      if (params.category !== undefined) {
        queryParams.set('category', params.category.toString());
      }
      if (params.showAll) {
        queryParams.set('showAll', 'true');
      }
      if (params.limit) {
        queryParams.set('limit', params.limit.toString());
      }
      if (params.offset) {
        queryParams.set('offset', params.offset.toString());
      }

      const response = await fetch(`/api/ndis/search?${queryParams}`);

      if (!response.ok) {
        throw new Error('Failed to search NDIS items');
      }

      const data = await response.json();

      setItems(data.items || []);
      setTotal(data.total);
      setHasMore(data.hasMore);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setItems([]);
      setTotal(0);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, []);

  const clear = useCallback(() => {
    setItems([]);
    setTotal(0);
    setHasMore(false);
    setError(null);
  }, []);

  return {
    items,
    loading,
    error,
    total,
    hasMore,
    search,
    clear
  };
}
