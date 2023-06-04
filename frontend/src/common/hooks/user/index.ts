import { FGC_API_URLS, fgcApi } from '@/common/services/fgc-api';
import { User } from '@/common/types/user';
import { signOut, useSession } from 'next-auth/react';
import { toast } from 'react-hot-toast';
import { useQuery, useQueryClient } from 'react-query';

const _20_MINUTES = 20 * 60 * 1000;

interface UseUserParams {
  redirectTo?: string | null;
}
export function useUser(
  { redirectTo }: UseUserParams = { redirectTo: '/login' },
) {
  const queryClient = useQueryClient();
  function onUnauthenticated() {
    if (!redirectTo) {
      return;
    }
    toast.error('Please log in again!');

    signOut({ callbackUrl: redirectTo });
  }
  const { update, data, status } = useSession({
    required: true,
    onUnauthenticated,
  });
  const {
    data: user,
    isLoading,
    isFetched,
  } = useQuery(
    ['user'],
    async () => {
      const result = await fgcApi.get<User>(FGC_API_URLS.ME);
      await update(result.data);
      return result?.data;
    },
    {
      staleTime: _20_MINUTES,
      retry: 3,
      enabled: data !== null,
      onError() {
        queryClient.invalidateQueries(['user']);
        toast.error('Failed to load user info');
        onUnauthenticated();
      },
    },
  );

  return {
    user,
    isLoadingUser: isLoading && !isFetched,
    isLoadingSession: status === 'loading' && !data,
    isAuthenticated: !!data,
  };
}
