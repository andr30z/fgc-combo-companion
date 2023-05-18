'use client';
import type { FGCApiPaginationResponse } from '@/common/types/fgc-api-pagination-response';
import type { Playlist } from '@/common/types/playlist';
import { FC } from 'react';

interface PlaylistSideBarMenuProps {
  currentPlaylistOpenId: string;
  playlistsInitialData?: FGCApiPaginationResponse<Playlist>;
}

export const PlaylistSideBarMenu: FC<PlaylistSideBarMenuProps> = () => {
  return (
    <aside className="static left-0 h-full">
      <h5 className="text-xl text-light font-primary font-bold">
        Other playlists
      </h5>
    </aside>
  );
};
