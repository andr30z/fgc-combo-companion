'use client';

import { Button } from '@/common/components/button';
import { LoadingBackdrop } from '@/common/components/loading-backdrop';
import { PasswordChangeForm } from '@/common/components/password-change-form';
import { TabContent } from '@/common/components/tabs';
import { useBoolean } from '@/common/hooks/boolean';
import { usePageTitle } from '@/common/hooks/page-title';
import { useUser } from '@/common/hooks/user';
import { FGC_API_URLS, fgcApi } from '@/common/services/fgc-api';
import { displayFGCApiErrors } from '@/common/utils/fgc-api';
import { promiseResultWithError } from '@/common/utils/promises';
import { toast } from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

export default function ChangePasswordPage() {
  usePageTitle('FGC - Change Password');
  const [isLoading, { setFalse: stopLoading, setTrue: startLoading }] =
    useBoolean();
  const { user } = useUser();
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
      className="h-full w-full layout-padding-x flex flex-1 gap-4 flex-col"
    >
      <LoadingBackdrop isLoading={isLoading} />
      {user?.oauthId && (
        <>
          <h6 className="text-light font-primary text-xl font-semibold">
            OAuth
          </h6>
          <hr className="my-2" />

          <p className="text-light text-md font-primary">
            If you want to remove your auth provider (eg: google login) and
            replace it with login and password, you have to request your
            password reset first. After that, you&apos;re going to lose your
            auth provider and the only way to enter this account will be through
            login and password.
          </p>
          <div>
            <Button
              onClick={async () => {
                startLoading();
                const { error } = await promiseResultWithError(
                  fgcApi.post(FGC_API_URLS.PASSWORD_CHANGE_SOLICITATION, null, {
                    params: { email: user.email },
                  }),
                );
                stopLoading();
                if (error) {
                  return displayFGCApiErrors(error, { duration: 10000 });
                }
                toast.success('Reset password email sent successfully!');
              }}
              text="Send reset password email"
            />
          </div>
        </>
      )}
      <h6 className="text-light font-primary text-xl font-semibold">
        Password Change
      </h6>
      <hr className="my-2" />
      <PasswordChangeForm
        useOldPasswordInput
        onSubmit={async (oldPassword, newPassword) =>
          passwordMutation.mutate({ oldPassword, newPassword })
        }
      />
    </TabContent>
  );
}
