'use client';

import { TabContent } from '@/common/components/tabs';
import { usePageTitle } from '@/common/hooks/page-title';
import { useUser } from '@/common/hooks/user';
import { ProfileForm } from '@/modules/profile-page/profile-form';

export default function ProfilePage() {
  const { user } = useUser();
  usePageTitle('FGC - Profile');
  return (
    <TabContent value="/user/profile" className="h-full w-full flex flex-1">
      {user && <ProfileForm key={user.updatedAt} user={user} />}
    </TabContent>
  );
}
