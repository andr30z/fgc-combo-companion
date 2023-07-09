import {
  FGC_API_URLS,
  getFgcApiInstanceWithTokenCookie,
} from '@/common/services/fgc-api';
import type { PlaylistWithCombos } from '@/common/types/playlist';
import { promiseResultWithError } from '@/common/utils/promises';
import { PlaylistDetails } from '@/modules/playlist-page/playlist-details';
import { Metadata } from 'next';
import { cookies } from 'next/headers';
type PageProps = { params?: { id: string | undefined } };

const getPlaylistDetails = async (id: string) => {
  const fgcInstance = getFgcApiInstanceWithTokenCookie(cookies());
  return promiseResultWithError(
    fgcInstance.get<PlaylistWithCombos>(`${FGC_API_URLS.PLAYLISTS}/${id}`),
  );
};
export const revalidate = 0;
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { result, error } = await getPlaylistDetails(params?.id ?? '');
  if (error) {
    return {
      title: 'FGC - Playlist Details',
    };
  }
  const playlist = result.data;
  const url = `https://app.fgc-combo-companion.xyz/playlist/${playlist.id}`;
  return {
    title: `Playlist - ${playlist.name}`,
    description: `FGC Combo Companion - ${playlist.owner.name} - Playlist - ${playlist.name}`,
    twitter: {
      title: playlist.name,
      description: 'FGC Combo Companion',
      creator: playlist.owner.name,
      siteId: playlist.id,
      site: url,
      images: '/metatag-logo.png',
      card: 'summary',
      // players: {
      //   height: 20,
      //   width: 20,
      //   playerUrl: url,
      //   streamUrl: url,
      // },
    },
    openGraph: {
      type: 'website',
      title: playlist.name,
      description: playlist.description ?? undefined,
      url,
      images: '/metatag-logo.png',
      siteName: 'FGC Combo Companion',
    },
  };
}

export default async function PlaylistPage({ params }: PageProps) {
  const { result: playlistCombos } = await getPlaylistDetails(params?.id ?? '');
  return (
    <PlaylistDetails
      playlistId={params?.id ?? ''}
      playlistInitialData={playlistCombos?.data}
    />
  );
}
