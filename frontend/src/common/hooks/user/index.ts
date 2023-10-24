import { FGC_API_URLS, fgcApi } from '@/common/services/fgc-api';
import { User } from '@/common/types/user';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { useQuery } from 'react-query';

const _20_MINUTES = 20 * 60 * 1000;

interface UseUserParams {
  redirectTo?: string | null;
}
export function useUser(
  { redirectTo }: UseUserParams = { redirectTo: '/login' },
) {
  const router = useRouter();
  function onUnauthenticated() {
    if (!redirectTo) {
      return;
    }
    toast.error('Please log in again!');
    signOut({ redirect: false }).then(() => {
      router.push(redirectTo);
    });
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
      enabled: !!data,
      onError() {
        // queryClient.invalidateQueries(['user']);
        toast.error('Failed to load user info');
        onUnauthenticated();
      },
    },
  );
  // eslint-disable-next-line no-console

  const logout = () => {
    signOut({ callbackUrl: redirectTo ?? '/' });
  };

  return {
    user,
    isLoadingUser: isLoading && !isFetched,
    isLoadingSession: status === 'loading' && !data,
    isAuthenticated: !!data,
    logout,
  };
}
