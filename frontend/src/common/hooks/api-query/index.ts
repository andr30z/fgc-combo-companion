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
  initialData?: Response | null;
}

export function useApiQuery<Response>({
  apiConfig,
  staleTime = ONE_HOUR,
  key,
  enabled = true,
  retryMaxCount = 3,
  onError,
  initialData,
}: UseApiParams<Response>) {
  return useQuery(
    key,
    async () => (await fgcApi.request<Response>(apiConfig))?.data,
    {
      staleTime,
      onError,
      enabled,
      retry: retryMaxCount,
      initialData,
    },
  );
}
