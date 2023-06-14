'use client';

import { LoadingBackdrop } from '@/common/components/loading-backdrop';
import { PasswordChangeForm } from '@/common/components/password-change-form';
import { TabContent } from '@/common/components/tabs';
import { useBoolean } from '@/common/hooks/boolean';
import { usePageTitle } from '@/common/hooks/page-title';
import { FGC_API_URLS, fgcApi } from '@/common/services/fgc-api';
import { displayFGCApiErrors } from '@/common/utils/fgc-api';
import { toast } from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

export default function ChangePasswordPage() {
  usePageTitle('FGC - Change Password');
  const [isLoading, { setFalse: stopLoading, setTrue: startLoading }] =
    useBoolean();
  const queryClient = useQueryClient();
  const passwordMutation = useMutation<
    unknown,
    unknown,
    {
      oldPassword: string;
      newPassword: string;
    }
  >(
    ({ oldPassword, newPassword }) => {
      startLoading();
      return fgcApi.patch(FGC_API_URLS.PASSWORD_CHANGE, {
        oldPassword,
        newPassword,
      });
    },
    {
      retry: 3,
      onSuccess: () => {
        toast.success('Password updated sucessfully!');
      },
      onError(error) {
        displayFGCApiErrors(error, { duration: 10000 });
      },
      onSettled: () => {
        stopLoading();
        queryClient.invalidateQueries(['user']);
      },
    },
  );
  return (
    <TabContent
      value="/user/profile/password"
      className="h-full w-full text-light layout-padding-x flex flex-1 gap-4 flex-col"
    >
      <LoadingBackdrop isLoading={isLoading} />
      <PasswordChangeForm
        useOldPasswordInput
        onSubmit={async (oldPassword, newPassword) =>
          passwordMutation.mutate({ oldPassword, newPassword })
        }
      />
    </TabContent>
  );
}
