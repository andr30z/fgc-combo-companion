'use client';
import { Link } from '@/common/components/link';
import { PlaylistFormWithModal } from '@/common/components/playlist-form-with-modal';
import { useBoolean } from '@/common/hooks/boolean';
import { useUser } from '@/common/hooks/user';
import { FGC_API_URLS, fgcApi } from '@/common/services/fgc-api';
import type { FGCApiPaginationResponse } from '@/common/types/fgc-api-pagination-response';
import type { Playlist } from '@/common/types/playlist';
import { usePathname, useRouter } from 'next/navigation';
import type { FC } from 'react';
import { flushSync } from 'react-dom';
import { AiFillAppstore, AiFillHome, AiOutlinePlus } from 'react-icons/ai';
import { FaSearch } from 'react-icons/fa';
import {
  HiOutlineSortAscending,
  HiOutlineSortDescending,
} from 'react-icons/hi';
import { useInView } from 'react-intersection-observer';
import { InfiniteData, useInfiniteQuery, useQueryClient } from 'react-query';

interface PlaylistSideBarMenuProps {
  currentPlaylistOpenId: string;
  playlistsInitialData?: FGCApiPaginationResponse<Playlist>;
}

export const PlaylistSideBarMenu: FC<PlaylistSideBarMenuProps> = ({
  playlistsInitialData,
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useUser();
  const [isDescendingOrdenation, { toggle: toggleOrdenation }] = useBoolean();
  const queryClient = useQueryClient();
  const queryKey = ['USER_PLAYLISTS', user?.id];
  const { data, fetchNextPage, refetch, isFetching } = useInfiniteQuery<
    FGCApiPaginationResponse<Playlist>
  >(
    queryKey,
    async ({ pageParam = 0 }) => {
      const { data } = await fgcApi.get<FGCApiPaginationResponse<Playlist>>(
        FGC_API_URLS.MY_PLAYLISTS,
        {
          params: {
            page: pageParam,
            size: 20,
            sort: `id,${isDescendingOrdenation ? 'desc' : 'asc'}`,
          },
        },
      );
      return data;
    },
    {
      getNextPageParam: (lastPage) => {
        return lastPage.hasNext ? lastPage.currentPage + 1 : undefined;
      },

      initialData: playlistsInitialData
        ? {
            pageParams: [],
            pages: [playlistsInitialData],
          }
        : undefined,
      staleTime: Infinity,
    },
  );
  const setNewOrdenation = () => {
    toggleOrdenation();
    flushSync(() => {
      refetch();
    });
  };

  const { ref } = useInView({
    onChange(inView) {
      if (inView) {
        fetchNextPage();
      }
    },
  });
  const playlistPageData = data?.pages?.map((page) => page.data).flat();
  const allPages = playlistPageData
    ? [...new Map(playlistPageData.map((item) => [item.id, item])).values()]
    : [];

  return (
    <aside className="flex flex-col w-[20%] px-2 pt-4 gap-2 max-h-full overflow-hidden">
      <div className="flex flex-col items-start justify-center gap-4 bg-secondary-dark shadow-black shadow-xl rounded-xl py-4 pl-4">
        <Link
          color="light"
          href="/dashboard/playlists"
          className="text-lg font-primary font-semibold text-left flex flex-row items-center gap-1"
        >
          <AiFillHome size={23} className="" />
          Dashboard
        </Link>
        <Link
          color="light"
          href="/dashboard/playlists"
          className="text-lg font-primary font-semibold text-left flex flex-row items-center gap-1"
        >
          <FaSearch size={23} />
          Search
        </Link>
      </div>
      <div className="bg-secondary-dark rounded-xl h-full max-h-full overflow-auto">
        <div className="flex flex-col py-4">
          <div className="flex flex-row items-center justify-between px-4 mb-3">
            <span className="text-md font-primary font-semibold text-light flex flex-row items-center gap-1">
              <AiFillAppstore size={17} />
              Your Playlists
            </span>
            <div className="flex items-center flex-row gap-2">
              <PlaylistFormWithModal
                onSuccessSavePlaylistForm={(playlist) => {
                  router.push(`/playlist/${playlist.id}`);
                  if (!data?.pages[0]) {
                    return refetch();
                  }
                  queryClient.setQueryData<
                    InfiniteData<FGCApiPaginationResponse<Playlist>> | undefined
                  >(
                    queryKey,
                    (prev) => {
                      const newData = prev ? { ...prev } : undefined;
                      if (!newData) {
                        return prev;
                      }
                      const firstPage = newData.pages[0];
                      firstPage.data.unshift(playlist);
                      return newData;
                    },
                    {},
                  );
                }}
                renderTriggerOpenForm={(openForm) => (
                  <AiOutlinePlus
                    title="Create new playlist"
                    size={17}
                    className="text-light hover:text-secondary cursor-pointer"
                    role="button"
                    onClick={openForm}
                  />
                )}
              />
              {isDescendingOrdenation ? (
                <HiOutlineSortAscending
                  role="button"
                  size={17}
                  title="Ascending"
                  onClick={setNewOrdenation}
                  className="text-light cursor-pointer hover:opacity-50"
                />
              ) : (
                <HiOutlineSortDescending
                  role="button"
                  size={17}
                  title="Descending"
                  onClick={setNewOrdenation}
                  className="text-light cursor-pointer hover:opacity-50"
                />
              )}
            </div>
          </div>
          {allPages?.map((playlist) => (
            <Link
              key={playlist.id}
              className={`text-md font-medium text-left mt-1 py-2 w-full truncate max-w-full px-4 ${
                pathname === `/playlist/${playlist.id}`
                  ? 'bg-white bg-opacity-40 text-white'
                  : 'hover:bg-white hover:bg-opacity-40 hover:text-white'
              }`}
              useHoverStyles={false}
              title={playlist.name}
              color="light"
              href={`/playlist/${playlist.id}`}
            >
              {playlist.name}
            </Link>
          ))}
          {isFetching &&
            new Array(5)
              .fill(true)
              .map((_element, index) => (
                <span
                  className="h-[40px] animate-pulse bg-white bg-opacity-40 text-white py-2 mt-1"
                  key={index}
                />
              ))}
          <div ref={ref} />
        </div>
      </div>
    </aside>
  );
};
