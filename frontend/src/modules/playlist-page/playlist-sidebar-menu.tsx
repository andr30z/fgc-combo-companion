'use client';
import { Link } from '@/common/components/link';
import { PlaylistFormWithModal } from '@/common/components/playlist-form-with-modal';
import type { FGCApiPaginationResponse } from '@/common/types/fgc-api-pagination-response';
import type { Playlist } from '@/common/types/playlist';
import { usePathname, useRouter } from 'next/navigation';
import { FC } from 'react';
import { AiFillAppstore, AiFillHome, AiOutlinePlus } from 'react-icons/ai';
import { FaSearch } from 'react-icons/fa';

interface PlaylistSideBarMenuProps {
  currentPlaylistOpenId: string;
  playlistsInitialData?: FGCApiPaginationResponse<Playlist>;
}

export const PlaylistSideBarMenu: FC<PlaylistSideBarMenuProps> = ({
  playlistsInitialData,
}) => {
  const pathname = usePathname();
  const router = useRouter();
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
            <PlaylistFormWithModal
              onSuccessSavePlaylistForm={(playlist) => {
                router.push(`/playlist/${playlist.id}`);
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
          </div>
          {playlistsInitialData?.data.map((playlist) => (
            <Link
              key={playlist.id}
              className={`text-md font-medium text-left mt-1 line-clamp-2 py-2 w-full px-4 ${
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
        </div>
      </div>
    </aside>
  );
};
