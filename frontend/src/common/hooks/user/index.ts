import { FGC_API_URLS, fgcApi } from '@/common/services/fgc-api';
import { User } from '@/common/types/user';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { useQuery } from 'react-query';
const ONE_HOUR = 1000 * 60 * 60;

interface UseUserParams {
  redirectOnError?: boolean;
}
export function useUser(
  { redirectOnError }: UseUserParams = { redirectOnError: true },
) {
  const router = useRouter();
  const { update, data, status } = useSession({
    required: true,
    onUnauthenticated() {
      if (!redirectOnError) {
        return;
      }
      toast.error('Please log in again!');
      router.replace('/login');
    },
  });
  const { data: user, isLoading } = useQuery(
    ['user', data?.user.id],
    async () => {
      const result = await fgcApi.get<User>(FGC_API_URLS.ME);
      await update(result.data);
      return result?.data;
    },
    {
      staleTime: ONE_HOUR,
      enabled: data !== null,
      onError() {
        toast.error('Failed to load user info');
      },
    },
  );

  return {
    user,
    isLoadingUser: isLoading,
    isLoadingSession: status === 'loading',
    isAuthenticated: status === 'authenticated',
  };
}
