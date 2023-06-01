'use client';
import { Button } from '@/common/components/button';
import { Link } from '@/common/components/link';
import type { FGCApiPaginationResponse } from '@/common/types/fgc-api-pagination-response';
import type { Playlist } from '@/common/types/playlist';
import { usePathname } from 'next/navigation';
import { FC } from 'react';
import { AiFillAppstore, AiFillHome, AiOutlineSearch } from 'react-icons/ai';
import { FaSearch } from 'react-icons/fa';

interface PlaylistSideBarMenuProps {
  currentPlaylistOpenId: string;
  playlistsInitialData?: FGCApiPaginationResponse<Playlist>;
}

export const PlaylistSideBarMenu: FC<PlaylistSideBarMenuProps> = ({
  playlistsInitialData,
}) => {
  const pathname = usePathname();
  return (
    <aside className="flex flex-col w-[15%] p-2 pt-4 gap-2">
      <div className="flex flex-col items-start justify-center gap-1 bg-secondary rounded-xl py-4 pl-4">
        <Link
          color="light"
          href="/dashboard/playlists"
          className="text-xl font-primary font-bold text-left flex flex-row items-center gap-1"
        >
          <AiFillHome size={23} className="" />
          Dashboard
        </Link>
        <Link
          color="light"
          href="/dashboard/playlists"
          className="text-xl font-primary font-bold text-left flex flex-row items-center gap-1"
        >
          <FaSearch size={23} />
          Search
        </Link>
      </div>

      <div className="bg-secondary rounded-xl flex-1 flex flex-col pl-4 pt-4">
        <span className="text-xl font-primary font-bold text-light flex flex-row items-center gap-1">
          <AiFillAppstore size={23} />
          Your Playlists
        </span>
        {playlistsInitialData?.data.map((playlist) => (
          <Link
            key={playlist.id}
            title={playlist.name}
            color={pathname === `/playlist/${playlist.id}` ? 'light' : 'dark'}
            href={`/playlist/${playlist.id}`}
            className="text-lg font-semibold text-left mt-1 line-clamp-2"
          >
            {playlist.name}
          </Link>
        ))}
      </div>
    </aside>
  );
};
