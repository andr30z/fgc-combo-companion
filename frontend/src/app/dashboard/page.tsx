import { TabContent, Tabs } from '@/common/components/tabs';
import {
  FGC_API_URLS,
  getFgcApiInstanceWithTokenCookie,
} from '@/common/services/fgc-api';
import type { Combo } from '@/common/types/combo';
import type { FGCApiPaginationResponse } from '@/common/types/fgc-api-pagination-response';
import { promiseResultWithError } from '@/common/utils/Promises';
import { CombosList } from '@/modules/dashboard-page/combos-list';
import { DashboardProtectedValidation } from '@/modules/dashboard-page/dashboard-user-validation';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';
export const metadata: Metadata = {
  title: 'FGC - Dashboard',
  description: 'FGC Combo Companion - Dashboard page',
};

export default async function Dashboard() {
  const fgcInstance = getFgcApiInstanceWithTokenCookie(cookies());
  const { result: initialComboData } = await promiseResultWithError(
    fgcInstance.get<FGCApiPaginationResponse<Combo>>(FGC_API_URLS.MY_COMBOS),
  );
  return (
    <DashboardProtectedValidation>
      <div className="w-full h-full min-h-80vh flex flex-col items-center gap-2">
        <Tabs
          tabs={[
            { id: 'combos', label: 'Combos' },
            { id: 'playlists', label: 'Playlists' },
          ]}
          rootClassName="min-h-[500px]"
          listContainerClassName="layout-padding-x bg-dark"
        >
          <TabContent value="combos" className="outline-none layout-padding-x">
            <CombosList initialComboData={initialComboData?.data} />
          </TabContent>
          <TabContent className="layout-padding-x" value="playlists">
            <CombosList />
          </TabContent>
        </Tabs>
      </div>
    </DashboardProtectedValidation>
  );
}
