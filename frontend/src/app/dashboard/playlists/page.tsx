import { TabContent } from '@/common/components/tabs';
import {
  FGC_API_URLS,
  getFgcApiInstanceWithTokenCookie,
} from '@/common/services/fgc-api';
import { Combo } from '@/common/types/combo';
import { FGCApiPaginationResponse } from '@/common/types/fgc-api-pagination-response';
import { promiseResultWithError } from '@/common/utils/Promises';
import { CombosList } from '@/modules/dashboard-page/combos-list';
import { cookies } from 'next/headers';

export default async function DashboardPlaylistPage() {
  const fgcInstance = getFgcApiInstanceWithTokenCookie(cookies());
  const { result: initialComboData } = await promiseResultWithError(
    fgcInstance.get<FGCApiPaginationResponse<Combo>>(FGC_API_URLS.MY_COMBOS, {
      params: {
        sort: 'id,desc',
        size: '30',
      },
    }),
  );
  return (
    <TabContent value="playlists" className="outline-none layout-padding-x">
      <CombosList initialComboData={initialComboData?.data} />
    </TabContent>
  );
}
