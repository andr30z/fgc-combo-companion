import { TabContent, Tabs } from '@/common/components/tabs';
import { CombosList } from '@/modules/dashboard-page/combos-list';
import { DashboardProtectedValidation } from '@/modules/dashboard-page/dashboard-user-validation';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FGC - Dashboard',
  description: 'FGC Combo Companion - Dashboard page',
};

export default function Dashboard() {
  return (
    <DashboardProtectedValidation>
      <div className="w-full h-full min-h-80vh flex flex-col items-center gap-2">
        <Tabs
          tabs={[
            { id: 'combos', label: 'Combos' },
            { id: 'playlists', label: 'Playlists' },
          ]}
          rootClassName="min-h-[500px]"
          listContainerClassName="layout-padding-x"
        >
          <TabContent value="combos" className="layout-padding-x">
            <CombosList />
          </TabContent>
          <TabContent className="layout-padding-x" value="playlists">
            <CombosList />
          </TabContent>
        </Tabs>
      </div>
    </DashboardProtectedValidation>
  );
}
