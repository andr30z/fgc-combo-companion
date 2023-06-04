import { ProtectedContent } from '@/common/components/with-protected-content';
import {
  FGC_API_URLS,
  getFgcApiInstanceWithTokenCookie,
} from '@/common/services/fgc-api';
import { FGCApiPaginationResponse } from '@/common/types/fgc-api-pagination-response';
import type { Playlist, PlaylistWithCombos } from '@/common/types/playlist';
import { promiseResultWithError } from '@/common/utils/promises';
import { PlaylistDetails } from '@/modules/playlist-page/playlist-details';
import { PlaylistSideBarMenu } from '@/modules/playlist-page/playlist-sidebar-menu';
import { cookies } from 'next/headers';
type PageProps = { params?: { id: string | undefined } };

const getPlaylistDetails = async (id: string) => {
  const fgcInstance = getFgcApiInstanceWithTokenCookie(cookies());
  return await promiseResultWithError(
    fgcInstance.get<PlaylistWithCombos>(`${FGC_API_URLS.PLAYLISTS}/${id}`),
  );
};

export async function generateMetadata({ params }: PageProps) {
  const { result, error } = await getPlaylistDetails(params?.id ?? '');
  if (error) {
    return {
      title: 'FGC - Playlist Details',
    };
  }
  return {
    title: `Playlist - ${result?.data.name}`,
    description: `FGC Combo Companion - ${result?.data.owner.name} - Playlist - ${result?.data.name}`,
  };
}

export default async function PlaylistPage({ params }: PageProps) {
  const fgcInstance = getFgcApiInstanceWithTokenCookie(cookies());
  const [{ result: playlistCombos }, { result: otherPlaylistsFromUser }] =
    await Promise.all([
      getPlaylistDetails(params?.id ?? ''),
      promiseResultWithError(
        fgcInstance.get<FGCApiPaginationResponse<Playlist>>(
          FGC_API_URLS.MY_PLAYLISTS,
          {
            params: {
              sort: 'id,desc',
              size: '20',
            },
          },
        ),
      ),
    ]);
  // console.log(error, cookies());
  return (
    <ProtectedContent>
      <PlaylistDetails
        playlistId={params?.id ?? ''}
        playlistInitialData={playlistCombos?.data}
      >
        <PlaylistSideBarMenu
          currentPlaylistOpenId={params?.id ?? ''}
          playlistsInitialData={otherPlaylistsFromUser?.data}
        />
      </PlaylistDetails>
    </ProtectedContent>
  );
}
