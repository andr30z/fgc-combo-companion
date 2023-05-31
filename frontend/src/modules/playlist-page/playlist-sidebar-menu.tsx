'use client';
import { Button } from '@/common/components/button';
import { Link } from '@/common/components/link';
import type { FGCApiPaginationResponse } from '@/common/types/fgc-api-pagination-response';
import type { Playlist } from '@/common/types/playlist';
import { usePathname } from 'next/navigation';
import { FC } from 'react';
import { AiFillHome } from 'react-icons/ai';

interface PlaylistSideBarMenuProps {
  currentPlaylistOpenId: string;
  playlistsInitialData?: FGCApiPaginationResponse<Playlist>;
}

export const PlaylistSideBarMenu: FC<PlaylistSideBarMenuProps> = ({
  playlistsInitialData,
}) => {
  const pathname = usePathname();
  return (
    <aside className="flex flex-col w-[15%] p-3 bg-secondary rounded-r-5xl">
      <Link
        color="light"
        href="/dashboard/playlists"
        className="text-2xl font-primary font-bold text-left flex flex-row items-center gap-1"
      >
        <AiFillHome size={23} />
        Dashboard
      </Link>

      {playlistsInitialData?.data.map((playlist) => (
        <Button
          key={playlist.id}
          color={pathname === `/playlist/${playlist.id}` ? 'light' : 'dark'}
          renderAsInnerLink
          href={`/playlist/${playlist.id}`}
          text={playlist.name}
          extraStyles="text-lg font-primary font-semibold text-left my-1"
        />
      ))}
    </aside>
  );
};
