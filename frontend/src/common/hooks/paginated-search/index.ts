import { FGCApiPaginationResponse } from '@/common/types/fgc-api-pagination-response';
import { useState } from 'react';
import { flushSync } from 'react-dom';
import { useApiQuery } from '../api-query';
import { useDebounce } from '../debounce';

interface UseComboSearchParams<Data> {
  url: string;
  queryKey: readonly unknown[];
  enabled?: boolean;
  initialData?: FGCApiPaginationResponse<Data>;
}

export function usePaginatedSearch<Data>({
  url,
  queryKey,
  enabled = true,
  initialData,
}: UseComboSearchParams<Data>) {
  const [page, setPage] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const { data, isFetching, refetch } = useApiQuery<
    FGCApiPaginationResponse<Data>
  >({
    key: [...queryKey, page],
    enabled,
    initialData: initialData,
    apiConfig: {
      url: url,
      params: {
        name: encodeURIComponent(searchValue),
        sort: 'id,desc',
        size: 30,
        page: page.toString(),
      },
    },
  });
  const onSelectPage = (page: number) => {
    flushSync(() => {
      setPage(page);
    });
    refetch();
  };
  const debouncedResetSearch = useDebounce(() => {
    onSelectPage(0);
    refetch();
  });

  return {
    data,
    isFetching,
    searchValue,
    onSelectPage,
    setSearchValue,
    debouncedResetSearch,
    refetch,
  };
}
