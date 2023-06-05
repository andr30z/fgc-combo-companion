import {
  FGC_API_URLS,
  getFgcApiInstanceWithTokenCookie,
} from '@/common/services/fgc-api';
import type { FGCApiPaginationResponse } from '@/common/types/fgc-api-pagination-response';
import type { Playlist } from '@/common/types/playlist';
import { promiseResultWithError } from '@/common/utils/promises';
import { PlaylistSideBarMenu } from '@/modules/playlist-page/playlist-sidebar-menu';
import { cookies } from 'next/headers';

export default async function PlaylistLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const fgcInstance = getFgcApiInstanceWithTokenCookie(cookies());
  const { result: otherPlaylistsFromUser } = await promiseResultWithError(
    fgcInstance.get<FGCApiPaginationResponse<Playlist>>(
      FGC_API_URLS.MY_PLAYLISTS,
      {
        params: {
          page: 0,
          sort: 'id,desc',
          size: '20',
        },
      },
    ),
  );

  return (
    <div className="w-full h-full flex gap-2 max-h-[80vh] min-h-[500px]">
      <PlaylistSideBarMenu
        currentPlaylistOpenId={params.id ?? ''}
        playlistsInitialData={otherPlaylistsFromUser?.data}
      />
      {children}
    </div>
  );
}
