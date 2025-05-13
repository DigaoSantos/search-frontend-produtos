type FetchOptions = {
  query?: Record<string, any>
  body?: any
  headers?: HeadersInit
}

export function useApi<T>(endpoint: string, options: FetchOptions & { method?: string } = {}) {
  const config = useRuntimeConfig();

    return useFetch<T>(endpoint, {
      baseURL: config.public.apiBase,
      ...options,
    } as FetchOptions);
  }

export function apiGet<T>(endpoint: string, query: Record<string, any> = {}) {
  return useApi<T>(endpoint, { method: 'GET', query });
}

export function apiPost<T>(endpoint: string, body: any) {
  return useApi<T>(endpoint, {
    method: 'POST',
    body,
    headers: { 'Content-Type': 'application/json' },
  });
}

export function apiPut<T>(endpoint: string, body: any) {
  return useApi<T>(endpoint, {
    method: 'PUT',
    body,
    headers: { 'Content-Type': 'application/json' },
  });
}

export function apiDelete<T>(endpoint: string) {
  return useApi<T>(endpoint, { method: 'DELETE' });
}

