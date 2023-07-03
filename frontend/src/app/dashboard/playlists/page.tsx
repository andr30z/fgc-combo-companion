import { TabContent } from '@/common/components/tabs';
import { protectedRouteValidator } from '@/common/server/protected-route-validator';
import {
  FGC_API_URLS,
  getFgcApiInstanceWithTokenCookie,
} from '@/common/services/fgc-api';
import { FGCApiPaginationResponse } from '@/common/types/fgc-api-pagination-response';
import type { Playlist } from '@/common/types/playlist';
import { promiseResultWithError } from '@/common/utils/promises';
import { PlaylistList } from '@/modules/dashboard-page/playlist-list';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';
export const metadata: Metadata = {
  title: 'FGC - Dashboard - Playlists',
  description: 'FGC Combo Companion - Dashboard Playlists',
};
export const revalidate = 0;
export default async function DashboardPlaylistPage() {
  protectedRouteValidator();
  const fgcInstance = getFgcApiInstanceWithTokenCookie(cookies());
  const { result: initialPlaylistData } = await promiseResultWithError(
    fgcInstance.get<FGCApiPaginationResponse<Playlist>>(
      FGC_API_URLS.MY_PLAYLISTS,
      {
        params: {
          sort: 'id,desc',
          size: '30',
        },
      },
    ),
  );
  return (
    <TabContent value="playlists" className="outline-none layout-padding-x">
      <PlaylistList initialPlaylistsData={initialPlaylistData?.data} />
    </TabContent>
  );
}
