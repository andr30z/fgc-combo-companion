import { TabContent } from '@/common/components/tabs';
import { ProtectedContent } from '@/common/components/with-protected-content';
import {
  FGC_API_URLS,
  getFgcApiInstanceWithTokenCookie,
} from '@/common/services/fgc-api';
import type { Combo } from '@/common/types/combo';
import { FGCApiPaginationResponse } from '@/common/types/fgc-api-pagination-response';
import { promiseResultWithError } from '@/common/utils/promises';
import { CombosList } from '@/modules/dashboard-page/combos-list';
import { Metadata } from 'next';
import { cookies } from 'next/headers';

export const metadata: Metadata = {
  title: 'FGC - Dashboard - Combos',
  description: 'FGC Combo Companion - Dashboard Combo',
};

export default async function DashboardCombosPage() {
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
    <ProtectedContent>
      <TabContent value="combos" className="outline-none layout-padding-x">
        <CombosList initialComboData={initialComboData?.data} />
      </TabContent>
    </ProtectedContent>
  );
}
