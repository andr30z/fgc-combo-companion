import { FGC_API_URLS, fgcApi } from '@/common/services/fgc-api';
import { FGCApiPaginationResponse } from '@/common/types/fgc-api-pagination-response';
import { Playlist } from '@/common/types/playlist';
import { flushSync } from 'react-dom';
import { useInfiniteQuery } from 'react-query';
import { useBoolean } from '../boolean';
import { useUser } from '../user';
const TEN_MINUTES = 10 * 60 * 1000;

interface MyPlaylistsParams {
  initialData?: FGCApiPaginationResponse<Playlist>;
  enabled?: boolean;
  userId?: string;
}

export function useMyPlaylists({
  initialData,
  enabled,
  userId,
}: MyPlaylistsParams = {}) {
  const [isDescendingOrdenation, { toggle: toggleOrdenation }] =
    useBoolean(true);
  const { user, isAuthenticated } = useUser({ redirectTo: null });
  const queryKey = [
    userId ? 'USER_PLAYLISTS' : 'CURRENT_USER_PLAYLISTS',
    userId ?? user?.id,
  ];
  const isQueryEnabled =
    enabled !== undefined ? enabled : isAuthenticated || userId !== undefined;
  const { data, fetchNextPage, refetch, isFetching } = useInfiniteQuery<
    FGCApiPaginationResponse<Playlist>
  >(
    queryKey,
    async ({ pageParam = 0 }) => {
      const { data } = await fgcApi.get<FGCApiPaginationResponse<Playlist>>(
        userId
          ? FGC_API_URLS.USER_PLAYLISTS + '/' + userId
          : FGC_API_URLS.MY_PLAYLISTS,
        {
          params: {
            page: pageParam,
            size: 20,
            sort: `updatedAt,${isDescendingOrdenation ? 'desc' : 'asc'}`,
          },
        },
      );
      return data;
    },
    {
      getNextPageParam: (lastPage) => {
        return lastPage.hasNext ? lastPage.currentPage + 1 : undefined;
      },
      enabled: isQueryEnabled,

      initialData: initialData
        ? {
            pageParams: [undefined],
            pages: [initialData],
          }
        : undefined,
      staleTime: TEN_MINUTES,
    },
  );

  const setNewOrdenation = () => {
    flushSync(() => {
      toggleOrdenation();
    });
    refetch();
  };

  const playlistPageData = data?.pages?.map((page) => page.data).flat();
  const allPlaylists = playlistPageData
    ? [...new Map(playlistPageData.map((item) => [item.id, item])).values()]
    : [];
  return {
    isFetching,
    data,
    fetchNextPage,
    refetch,
    setNewOrdenation,
    isDescendingOrdenation,
    toggleOrdenation,
    queryKey,
    allPlaylists,
    currentUser: user,
  } as const;
}
