'use client';

import { Button } from '@/common/components/button';
import { Input } from '@/common/components/input';
import { LoadingBackdrop } from '@/common/components/loading-backdrop';
import { useBoolean } from '@/common/hooks/boolean';
import { useForm } from '@/common/hooks/form';
import { FGC_API_URLS, fgcApi } from '@/common/services/fgc-api';
import { User } from '@/common/types/user';
import { get } from 'lodash';
import type { FC } from 'react';
import { toast } from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

export const ProfileForm: FC<{ user: User }> = ({ user }) => {
  const [{ name, email }, { onChange }, onSubmit] = useForm(user);
  const [isLoading, { setFalse: stopLoading, setTrue: startLoading }] =
    useBoolean();
  const queryClient = useQueryClient();
  const profileMutation = useMutation(
    () => {
      startLoading();
      return fgcApi.put(FGC_API_URLS.UPDATE_PROFILE, {
        name,
        email,
      });
    },
    {
      retry: 3,
      onSuccess: () => {
        toast.success(
          `Profile updated successfully. ${
            user.email !== email
              ? 'You have changed your email, please log again.'
              : ''
          }`,
        );
      },
      onError(error) {
        const formErrors: Array<string> = get(
          error as Record<string, Array<string>>,
          'response.data.errors',
        );
        toast.error(formErrors?.join(', ') || 'Something went wrong.', {
          duration: 10000,
        });
      },
      onSettled: () => {
        stopLoading();
        queryClient.invalidateQueries(['user']);
      },
    },
  );
  return (
    <form
      onSubmit={onSubmit(async () => {
        profileMutation.mutate();
      })}
      className="gap-5 border-none layout-padding-x flex flex-1 flex-col pt-10"
    >
      <LoadingBackdrop isLoading={isLoading} />
      <Input required label="Name" value={name} onChange={onChange('name')} />
      <Input
        required
        label="Email"
        value={email}
        onChange={onChange('email')}
      />
      <Button type="submit" text="Save" extraStyles="mt-4" />
    </form>
  );
};
