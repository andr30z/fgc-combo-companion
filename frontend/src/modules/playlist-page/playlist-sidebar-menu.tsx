'use client';
import { Link } from '@/common/components/link';
import { PlaylistFormWithModal } from '@/common/components/playlist-form-with-modal';
import { useMyPlaylists } from '@/common/hooks/my-playlists';
import type { FGCApiPaginationResponse } from '@/common/types/fgc-api-pagination-response';
import type { Playlist } from '@/common/types/playlist';
import { usePathname, useRouter } from 'next/navigation';
import type { FC } from 'react';
import {
  AiFillAppstore,
  AiFillHome,
  AiOutlineClose,
  AiOutlinePlus,
} from 'react-icons/ai';
import { FaSearch } from 'react-icons/fa';
import {
  HiOutlineSortAscending,
  HiOutlineSortDescending,
} from 'react-icons/hi';
import { useInView } from 'react-intersection-observer';
import { InfiniteData, useQueryClient } from 'react-query';
import { usePlaylistPage } from './playlist-page-context';

interface PlaylistSideBarMenuProps {
  currentPlaylistOpenId: string;
  playlistsInitialData?: FGCApiPaginationResponse<Playlist>;
}

export const PlaylistSideBarMenu: FC<PlaylistSideBarMenuProps> = ({
  playlistsInitialData,
}) => {
  const pathname = usePathname();
  const router = useRouter();

  const { showPlaylistPageMobileSideBar, togglePlaylistPageMobileSideBar } =
    usePlaylistPage();
  const queryClient = useQueryClient();
  const {
    data,
    allPlaylists: allPages,
    fetchNextPage,
    isDescendingOrdenation,
    isFetching,
    refetch,
    setNewOrdenation,
    queryKey,
  } = useMyPlaylists({
    initialData: playlistsInitialData,
  });
  const { ref } = useInView({
    onChange(inView) {
      if (inView) {
        fetchNextPage();
      }
    },
  });

  return (
    <>
      <aside
        className={`${
          showPlaylistPageMobileSideBar
            ? 'fixed md:relative w-screen inset-0 flex'
            : 'hidden'
        } md:flex flex-col md:w-[23%] px-2 pt-4 gap-2 max-h-full overflow-hidden bg-dark`}
      >
        <div className="relative flex flex-col items-start justify-center gap-4 bg-secondary-dark shadow-black rounded-xl py-4 pl-4">
          <Link
            color="light"
            href="/dashboard/playlists"
            className="text-lg font-primary font-semibold text-left flex flex-row items-center gap-1"
          >
            <AiFillHome size={23} />
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

          <AiOutlineClose
            size={22}
            role="button"
            className="text-light hover:bg-opacity-75 cursor-pointer md:hidden top-[15px] right-[10px] absolute"
            onClick={togglePlaylistPageMobileSideBar}
          />
        </div>
        <div className="bg-secondary-dark rounded-xl h-full max-h-full overflow-auto">
          <div className="flex flex-col">
            <div className="flex flex-row items-center justify-between px-4 mb-3 sticky top-0 bg-secondary-dark py-4">
              <span className="text-md font-primary font-semibold text-light flex flex-row items-center gap-1">
                <AiFillAppstore size={17} />
                <span className="hidden lg:flex">Your Playlists</span>
              </span>
              <div className="flex items-center flex-row gap-2">
                <PlaylistFormWithModal
                  onSuccessSavePlaylistForm={(playlist) => {
                    router.push(`/playlist/${playlist.id}`);
                    if (!data?.pages[0]) {
                      return refetch();
                    }
                    queryClient.setQueryData<
                      | InfiniteData<FGCApiPaginationResponse<Playlist>>
                      | undefined
                    >(queryKey, (prev) => {
                      const newData = prev ? { ...prev } : undefined;
                      if (!newData) {
                        return prev;
                      }
                      const firstPage = newData.pages[0];
                      firstPage.data.unshift(playlist);
                      return newData;
                    });
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
                  <HiOutlineSortDescending
                    role="button"
                    size={17}
                    title="Descending"
                    onClick={setNewOrdenation}
                    className="text-light cursor-pointer hover:opacity-50"
                  />
                ) : (
                  <HiOutlineSortAscending
                    role="button"
                    size={17}
                    title="Ascending"
                    onClick={setNewOrdenation}
                    className="text-light cursor-pointer hover:opacity-50"
                  />
                )}
              </div>
            </div>
            {allPages?.map((playlist) => {
              const isSelected = pathname === `/playlist/${playlist.id}`;
              return (
                <Link
                  key={playlist.id}
                  className={`text-md font-medium text-left mt-1 py-2 w-full truncate max-w-full px-4 ${
                    isSelected
                      ? 'bg-white bg-opacity-40 text-white'
                      : 'hover:bg-white hover:bg-opacity-40 hover:text-white'
                  }`}
                  onClick={togglePlaylistPageMobileSideBar}
                  useHoverStyles={false}
                  title={playlist.name}
                  color="light"
                  href={`/playlist/${playlist.id}`}
                >
                  {playlist.name}
                </Link>
              );
            })}
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
    </>
  );
};
