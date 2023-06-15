'use client';

import { TabContent } from '@/common/components/tabs';
import { usePageTitle } from '@/common/hooks/page-title';
import { useUser } from '@/common/hooks/user';
import { SettingsItem } from '@/modules/profile-page/settings-item';
import { signOut } from 'next-auth/react';
import {
  AiFillDelete,
  AiOutlineBgColors,
  AiOutlineLogout,
  AiOutlineMail,
} from 'react-icons/ai';
import { IoGameController } from 'react-icons/io5';

export default function SettingsPage() {
  usePageTitle('FGC - Settings');
  const { user } = useUser();
  return (
    <TabContent
      value="/user/profile/settings"
      className="h-full w-full flex flex-col flex-1 layout-padding-x gap-3"
    >
      <SettingsItem
        onClick={() => null}
        icon={IoGameController}
        text="Select favorite game"
      />
      <SettingsItem
        onClick={() => null}
        icon={AiOutlineBgColors}
        text="Change the default background color in preview combos"
      />
      {!user?.emailVerified && (
        <SettingsItem
          onClick={() => null}
          icon={AiOutlineMail}
          text="Send email verification"
        />
      )}
      <SettingsItem
        onClick={() => signOut({ callbackUrl: '/' })}
        icon={AiOutlineLogout}
        textColor="text-secondary"
        text="Logout"
      />
      <SettingsItem
        onClick={() => null}
        icon={AiFillDelete}
        textColor="text-secondary"
        text="Delete account"
      />
    </TabContent>
  );
}
