import { fgcApi } from '@/common/services/fgc-api';
import { AxiosRequestConfig } from 'axios';
import { useQuery } from 'react-query';

const ONE_HOUR = 1000 * 60 * 60;

interface UseApiParams<Response> {
  key: string | readonly unknown[];
  staleTime?: number;
  apiConfig: AxiosRequestConfig<Response>;
  onError?: (err: unknown) => void;
  enabled?: boolean;
  retryMaxCount?: number;
}

export function useApiQuery<Response>({
  apiConfig,
  staleTime = ONE_HOUR,
  key,
  enabled = true,
  retryMaxCount = 3,
  onError,
}: UseApiParams<Response>) {
  return useQuery(key, () => fgcApi.request<Response>(apiConfig), {
    staleTime,
    onError,
    enabled,
    retry: retryMaxCount,
  });
}
