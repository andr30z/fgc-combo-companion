import {
  FGC_API_URLS,
  getFgcApiInstanceWithTokenCookie,
} from '@/common/services/fgc-api';
import type { FGCApiPaginationResponse } from '@/common/types/fgc-api-pagination-response';
import type { Playlist } from '@/common/types/playlist';
import { promiseResultWithError } from '@/common/utils/promises';
import { PlaylistPageProvider } from '@/modules/playlist-page/playlist-page-context';
import { PlaylistSideBarMenu } from '@/modules/playlist-page/playlist-sidebar-menu';
import { cookies } from 'next/headers';

export default async function PlaylistLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const getUrlWithParams = (url = '', pageParam = 0) => {
    return `${url}?page=${pageParam}&size=20&sort=updatedAt,desc&sort=playlistCombos.addedAt,desc`;
  };
  const fgcInstance = getFgcApiInstanceWithTokenCookie(cookies());
  const { result: otherPlaylistsFromUser } = await promiseResultWithError(
    fgcInstance.get<FGCApiPaginationResponse<Playlist>>(
      getUrlWithParams(FGC_API_URLS.MY_PLAYLISTS, 0),
    ),
  );
  return (
    <PlaylistPageProvider>
      <div className="w-full flex gap-2 h-[80vh] min-h-[400px]">
        <PlaylistSideBarMenu
          playlistsInitialData={otherPlaylistsFromUser?.data}
          currentPlaylistOpenId={params.id ?? ''}
        />
        {children}
      </div>
    </PlaylistPageProvider>
  );
}
