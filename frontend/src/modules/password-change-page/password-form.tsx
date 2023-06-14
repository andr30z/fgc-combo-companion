'use client';
import { Card } from '@/common/components/card';
import { LoadingBackdrop } from '@/common/components/loading-backdrop';
import { PasswordChangeForm } from '@/common/components/password-change-form';
import { useBoolean } from '@/common/hooks/boolean';
import { FGC_API_URLS, fgcApi } from '@/common/services/fgc-api';
import { promiseResultWithError } from '@/common/utils/promises';
import { useRouter } from 'next/navigation';
import type { FC } from 'react';
import { toast } from 'react-hot-toast';
import { useQueryClient } from 'react-query';

interface PasswordChangePageProps {
  verificationToken: string;
}

export const PasswordForm: FC<PasswordChangePageProps> = ({
  verificationToken,
}) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [isLoading, { setTrue: startLoading, setFalse: stopLoading }] =
    useBoolean();

  return (
    <div className="w-full h-full min-h-80vh flex flex-row justify-center items-center gap-2">
      <Card
        size="xl"
        shadowSize="lg"
        theme="dark"
        cardTitle="Password change"
        className="gap-2"
      >
        <PasswordChangeForm
          onSubmit={async (_oldPassword, newPassword) => {
            startLoading();
            const { error: apiError } = await promiseResultWithError(
              fgcApi.patch(
                FGC_API_URLS.CONFIRM_PASSWORD_CHANGE,
                {
                  newPassword,
                },
                { params: { token: verificationToken } },
              ),
            );
            stopLoading();

            if (apiError) {
              toast.error(
                apiError.response?.data?.errors?.join(', ') ??
                  'Something went wrong. Try again.',
              );
              return;
            }

            toast.success('Password changed successfully');
            queryClient.invalidateQueries(['user']);
            router.push('/login');
          }}
        />
      </Card>
      <LoadingBackdrop isLoading={isLoading} />
    </div>
  );
};
