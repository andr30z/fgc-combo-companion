'use client';
import { Tabs } from '@/common/components/tabs';
import { DashboardProtectedValidation } from '@/modules/dashboard-page/dashboard-user-validation';
import { usePathname, useRouter } from 'next/navigation';

export default function DashboardLayout(props: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const isPlaylistScreen = pathname?.includes('/playlists');
  return (
    <div className="w-full h-full min-h-80vh flex flex-col items-center gap-2">
      <DashboardProtectedValidation>
        <Tabs
          defaultTab={isPlaylistScreen ? 'playlists' : 'combos'}
          tabs={[
            { id: 'combos', label: 'Combos' },
            { id: 'playlists', label: 'Playlists' },
          ]}
          rootClassName="min-h-[500px]"
          listContainerClassName="layout-padding-x bg-dark"
          onClickTab={(id) => {
            router.push(`/dashboard/${id}`);
          }}
        >
          {props.children}
        </Tabs>
      </DashboardProtectedValidation>
    </div>
  );
}
