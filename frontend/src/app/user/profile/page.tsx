'use client';

import { TabContent, Tabs } from '@/common/components/tabs';
import { useUser } from '@/common/hooks/user';
import { ProfileForm } from '@/modules/profile-page/profile-form';

export default function ProfilePage() {
  const { user } = useUser();
  return (
    <div className="min-h-80vh w-full flex flex-col">
      <Tabs
        rootClassName="h-full w-full flex-1"
        listContainerClassName="layout-padding-x mb-0"
        tabs={[
          { label: 'Profile', id: 'profile' },
          { label: 'Password', id: 'password' },
          { label: 'Settings', id: 'settings' },
        ]}
      >
        {
          <TabContent value="profile" className="h-full w-full flex flex-1">
            {user && <ProfileForm user={user} />}
          </TabContent>
        }
      </Tabs>
    </div>
  );
}
