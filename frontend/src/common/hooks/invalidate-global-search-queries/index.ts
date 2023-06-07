import { useQueryClient } from 'react-query';

export function useInvalidateGlobalSearchQueries() {
  const queryClient = useQueryClient();
  return () => {
    queryClient.invalidateQueries(['playlists']);
    queryClient.invalidateQueries(['combos']);
    queryClient.invalidateQueries(['USER_PLAYLISTS_SIDEBAR']);
    queryClient.invalidateQueries(['COMBO_SEARCH']);
    queryClient.invalidateQueries(['PLAYLIST_DETAILS']);
    // queryClient.invalidateQueries(
    //   ['playlists', 'combos', 'USER_PLAYLISTS_SIDEBAR', 'COMBO_SEARCH'],
    //   {
    //     stale: true,
    //   },
    //   { cancelRefetch: true },
    // );
  };
}
