import { ProtectedContent } from '@/common/components/with-protected-content';
import {
  FGC_API_URLS,
  getFgcApiInstanceWithTokenCookie,
} from '@/common/services/fgc-api';
import type { PlaylistWithCombos } from '@/common/types/playlist';
import { promiseResultWithError } from '@/common/utils/promises';
import { PlaylistDetails } from '@/modules/playlist-page/playlist-details';
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
  const { result: playlistCombos } = await getPlaylistDetails(params?.id ?? '');
  // console.log(error, cookies());
  return (
    <ProtectedContent>
      <PlaylistDetails
        playlistId={params?.id ?? ''}
        playlistInitialData={playlistCombos?.data}
      />
    </ProtectedContent>
  );
}
