import { FGC_API_URLS, fgcApi } from '@/common/services/fgc-api';
import { Combo } from '@/common/types/combo';
import { displayFGCApiErrors } from '@/common/utils/fgc-api';
import { get } from 'lodash';
import { toast } from 'react-hot-toast';
import { useMutation } from 'react-query';
import { useInvalidateGlobalSearchQueries } from '../invalidate-global-search-queries';

interface AddCombosToPlaylistParams {
  onSuccess?: (
    playlistId: number,
    combos: Array<Combo> | Array<number>,
  ) => void;
}

export function useAddCombosToPlaylist({
  onSuccess,
}: AddCombosToPlaylistParams = {}) {
  const invalidateQueries = useInvalidateGlobalSearchQueries();
  return useMutation(
    async ({
      playlistId,
      combos,
    }: {
      playlistId: number;
      combos: Array<Combo> | Array<number>;
    }) => {
      return fgcApi
        .post(FGC_API_URLS.getAddCombosToPlaylistUrl(playlistId), {
          combos: combos.map((comboOrId) => get(comboOrId, 'id') || comboOrId),
        })
        .then(() => {
          toast.success('Combos added to playlist successfully');
          if (onSuccess) {
            onSuccess(playlistId, combos);
          }
        });
    },
    {
      retry: 3,
      onError(error) {
        displayFGCApiErrors(error, { duration: 10000 });
      },
      onSettled: () => {
        invalidateQueries();
      },
    },
  );
}
