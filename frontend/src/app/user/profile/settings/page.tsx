'use client';

import { ConfirmAction } from '@/common/components/confirm-action-modal';
import { GameSelect } from '@/common/components/game-select';
import { LoadingBackdrop } from '@/common/components/loading-backdrop';
import { TabContent } from '@/common/components/tabs';
import { LOCAL_STORAGE_KEYS } from '@/common/constants/local-storage-keys';
import { useBoolean } from '@/common/hooks/boolean';
import { usePageTitle } from '@/common/hooks/page-title';
import { useUser } from '@/common/hooks/user';
import { FGC_API_URLS, fgcApi } from '@/common/services/fgc-api';
import { GameTypes } from '@/common/types/game-types';
import { displayFGCApiErrors } from '@/common/utils/fgc-api';
import { SettingsItem } from '@/modules/profile-page/settings-item';
import { signOut } from 'next-auth/react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { AiFillDelete, AiOutlineLogout, AiOutlineMail } from 'react-icons/ai';
import { IoGameController } from 'react-icons/io5';

export default function SettingsPage() {
  usePageTitle('FGC - Settings');
  const { user, logout } = useUser();
  const [isLoading, { setFalse: stopLoading, setTrue: startLoading }] =
    useBoolean();
  const [isSelectGameOpen, { toggle }] = useBoolean();
  const localStorageFavoriteGame = localStorage.getItem(
    LOCAL_STORAGE_KEYS.FAVORITE_GAME,
  ) as GameTypes;
  const [favoriteGame, setFavoriteGame] = useState(localStorageFavoriteGame);
  const sendVerificationEmail = () => {
    startLoading();
    fgcApi
      .post(
        FGC_API_URLS.USER_EMAIL_VERIFICATION,
        {},
        {
          params: {
            email: user?.email,
          },
        },
      )
      .then(() => {
        toast.success('Email verification sent!');
      })
      .catch(displayFGCApiErrors)
      .finally(stopLoading);
  };

  const deleteUser = () => {
    startLoading();
    fgcApi
      .delete(FGC_API_URLS.ME)
      .then(() => {
        toast.success('User deleted successfully!');
        logout();
      })
      .catch(displayFGCApiErrors)
      .finally(stopLoading);
  };
  return (
    <TabContent
      value="/user/profile/settings"
      className="h-full w-full flex flex-col flex-1 layout-padding-x gap-3"
    >
      <LoadingBackdrop isLoading={isLoading} />
      <SettingsItem
        onClick={toggle}
        icon={IoGameController}
        text="Select favorite game"
      />
      {isSelectGameOpen && (
        <GameSelect
          onSelect={(game) => {
            localStorage.setItem(LOCAL_STORAGE_KEYS.FAVORITE_GAME, game);
            setFavoriteGame(game);
          }}
          selectedOption={favoriteGame}
        />
      )}
      {/* <SettingsItem
        onClick={() => null}
        icon={AiOutlineBgColors}
        text="Change the default background color in preview combos"
      /> */}
      {!user?.emailVerified && (
        <SettingsItem
          onClick={sendVerificationEmail}
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

      <ConfirmAction
        modalTitle="Delete account"
        confirmationText="Are you sure you want to delete your account? This action cannot be undone."
        onConfirm={deleteUser}
      >
        {({ openConfirmModal }) => (
          <SettingsItem
            onClick={openConfirmModal}
            icon={AiFillDelete}
            textColor="text-secondary"
            text="Delete account"
          />
        )}
      </ConfirmAction>
    </TabContent>
  );
}
