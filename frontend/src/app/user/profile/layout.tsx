'use client';
import { Tabs } from '@/common/components/tabs';
import { ProtectedContent } from '@/common/components/with-protected-content';
import { usePathname, useRouter } from 'next/navigation';

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <ProtectedContent>
      <div className="min-h-80vh w-full flex flex-col">
        <Tabs
          key={pathname}
          defaultTab={pathname ?? '/user/profile'}
          rootClassName="h-full w-full flex-1"
          listContainerClassName="layout-padding-x mb-0"
          tabs={[
            { label: 'Profile', id: '/user/profile' },
            { label: 'Password', id: '/user/profile/password' },
            { label: 'Settings', id: '/user/profile/settings' },
          ]}
          onClickTab={(id) => {
            router.push(id);
          }}
        >
          {children}
        </Tabs>
      </div>
    </ProtectedContent>
  );
}
