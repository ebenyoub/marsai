import { useCallback, useEffect, useState } from 'react';
import { apiRequest } from '../lib/api';

interface ApiListResponse<T> {
  data?: T;
}

export function useFetch<T>(url: string, options: RequestInit = {}) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    const token = localStorage.getItem('token');

    try {
      const result = await apiRequest<T | ApiListResponse<T>>(url, {
        ...options,
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          ...options.headers,
        },
      });

      setData('data' in Object(result) ? (result as ApiListResponse<T>).data ?? null : result as T);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setIsLoading(false);
    }
  }, [url, options]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return { data, isLoading, error, refetch: fetchData };
}
