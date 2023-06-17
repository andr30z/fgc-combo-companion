'use client';

import { Button } from '@/common/components/button';
import { Input } from '@/common/components/input';
import { LoadingBackdrop } from '@/common/components/loading-backdrop';
import { useBoolean } from '@/common/hooks/boolean';
import { useForm } from '@/common/hooks/form';
import { FGC_API_URLS, fgcApi } from '@/common/services/fgc-api';
import { User } from '@/common/types/user';
import { displayFGCApiErrors } from '@/common/utils/fgc-api';
import type { FC } from 'react';
import { toast } from 'react-hot-toast';
import { AiOutlineTwitter } from 'react-icons/ai';
import { FaYoutubeSquare } from 'react-icons/fa';
import { FiInstagram } from 'react-icons/fi';
import { useMutation, useQueryClient } from 'react-query';

const SOCIAL_MEDIA_URL = {
  instagram: 'https://instagram.com/',
  twitter: 'https://twitter.com/',
  youtube: 'https://youtube.com/',
};

export const ProfileForm: FC<{ user: User }> = ({ user }) => {
  const [
    {
      name,
      email,
      bio,
      instagramProfileUrl: originalInstagramProfileUrl,
      twitterProfileUrl: originalIwitterProfileUrl,
      youtubeChannelUrl: originalIoutubeChannelUrl,
    },
    { onChange },
    onSubmit,
  ] = useForm(user);
  const [isLoading, { setFalse: stopLoading, setTrue: startLoading }] =
    useBoolean();

  const instagramProfileUrl =
    originalInstagramProfileUrl?.split(SOCIAL_MEDIA_URL.instagram).at(1) ??
    originalInstagramProfileUrl;
  const twitterProfileUrl =
    originalIwitterProfileUrl?.split(SOCIAL_MEDIA_URL.twitter).at(1) ??
    originalIwitterProfileUrl;
  const youtubeChannelUrl =
    originalIoutubeChannelUrl?.split(SOCIAL_MEDIA_URL.youtube).at(1) ??
    originalIoutubeChannelUrl;

  const queryClient = useQueryClient();
  const profileMutation = useMutation(
    () => {
      startLoading();
      return fgcApi.put(FGC_API_URLS.UPDATE_PROFILE, {
        name,
        email,
        bio,
        instagramProfileUrl: instagramProfileUrl
          ? SOCIAL_MEDIA_URL.instagram + instagramProfileUrl
          : null,
        twitterProfileUrl: twitterProfileUrl
          ? SOCIAL_MEDIA_URL.twitter + twitterProfileUrl
          : null,
        youtubeChannelUrl: youtubeChannelUrl
          ? SOCIAL_MEDIA_URL.youtube + youtubeChannelUrl
          : null,
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
        displayFGCApiErrors(error, { duration: 10000 });
      },
      onSettled: () => {
        stopLoading();
        queryClient.invalidateQueries(['user']);
        queryClient.invalidateQueries(['user-details']);
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
      <Input label="Bio" value={bio || ''} onChange={onChange('bio')} />
      <div className="w-full flex flex-col gap-2">
        <h6 className="text-light font-primary text-lg font-semibold">
          Change your social links:{' '}
        </h6>
        <div className="flex flex-row lg:gap-3 gap-5 flex-wrap">
          <Input
            placeholder="yourusername"
            className="pl-0"
            height="h-[53px]"
            width="w-full lg:flex-1"
            value={twitterProfileUrl || ''}
            onChange={onChange('twitterProfileUrl')}
            iconLeft={
              <span className="flex flex-row h-full items-center justify-center text-dark text-opacity-40">
                <AiOutlineTwitter className="text-blue-400 mr-1" size={27} />
                {SOCIAL_MEDIA_URL.twitter}
              </span>
            }
          />
          <Input
            placeholder="yourusername"
            height="h-[53px]"
            className="pl-0"
            width="w-full lg:flex-1"
            value={instagramProfileUrl || ''}
            onChange={onChange('instagramProfileUrl')}
            iconLeft={
              <span className="flex flex-row h-full items-center justify-center text-dark text-opacity-40">
                <FiInstagram className="text-pink-500 mr-1" size={27} />
                {SOCIAL_MEDIA_URL.instagram}
              </span>
            }
          />
          <Input
            placeholder="yourchannelname"
            height="h-[53px]"
            width="w-full lg:flex-1"
            className="pl-0"
            value={youtubeChannelUrl || ''}
            onChange={onChange('youtubeChannelUrl')}
            iconLeft={
              <span className="flex flex-row h-full items-center justify-center text-dark text-opacity-40">
                <FaYoutubeSquare className="text-secondary mr-1" size={27} />
                {SOCIAL_MEDIA_URL.youtube}
              </span>
            }
          />
        </div>
      </div>

      <Button type="submit" text="Submit" extraStyles="mt-4" />
    </form>
  );
};
