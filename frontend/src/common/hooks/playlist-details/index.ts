import { FGC_API_URLS, fgcApi } from '@/common/services/fgc-api';
import type { Combo } from '@/common/types/combo';
import type { PlaylistWithCombos } from '@/common/types/playlist';
import type { PlaylistCombo } from '@/common/types/playlist-combo';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useApiQuery } from '../api-query';
import { useBoolean } from '../boolean';
import { useUser } from '../user';
import { OnFinishOrdenation } from '@/common/components/list-items';
import { displayFGCApiErrors } from '@/common/utils/fgc-api';

const TEN_MINUTES = 10 * 60 * 1000;

export function usePlaylistDetails(
  playlistId: number | string,
  { playlistInitialData }: { playlistInitialData?: PlaylistWithCombos } = {},
) {
  const { user } = useUser();

  const [selectedCombos, setSelectedCombos] = useState<Array<PlaylistCombo>>(
    [],
  );

  const [
    isLoadingData,
    { setFalse: endLoadingData, setTrue: startLoadingData },
  ] = useBoolean();

  const [isDraggingCombos, { setFalse: stopDragging, setTrue: startDragging }] =
    useBoolean();
  const {
    data: playlistDetails,
    isLoading,
    refetch,
  } = useApiQuery<PlaylistWithCombos>({
    key: ['PLAYLIST_DETAILS', playlistId],
    apiConfig: {
      url: `${FGC_API_URLS.PLAYLISTS}/${playlistId}`,
    },
    staleTime: TEN_MINUTES,
    initialData: playlistInitialData,
  });
  const refetchData = () => {
    refetch();
  };

  const addCombosToPlaylist = (combos: Array<Combo>) => {
    fgcApi
      .post(FGC_API_URLS.getAddCombosToPlaylistUrl(playlistId), {
        combos: combos.map(({ id }) => id),
      })
      .then(() => {
        toast.success('Combos added to playlist successfully');
        refetchData();
      });
  };
  const orderedCombos = playlistDetails?.playlistCombos?.sort((a, b) => {
    return a.position - b.position;
  });
  const combos = orderedCombos?.map((playlistCombo) => playlistCombo.combo);
  const currentUserIsPlaylistOwner = playlistDetails?.owner.id === user?.id;

  const deleteCombosFromPlaylist = async (playlistComboIds: Array<number>) => {
    return fgcApi
      .delete(
        FGC_API_URLS.getRemoveCombosFromPlaylistUrl(
          playlistDetails?.id as number,
          playlistComboIds,
        ),
      )
      .then((res) => {
        refetchData();
        return res;
      });
  };

  const onSubmitOrdenation: OnFinishOrdenation<PlaylistCombo | Combo> = async (
    setList,
    { reordered, changed },
  ) => {
    stopDragging();
    if (!changed) {
      return;
    }
    setList(reordered);
    fgcApi
      .put(
        FGC_API_URLS.getPlaylistCombosOrdenationUrl(
          playlistDetails?.id as number,
        ),
        {
          newPlaylistCombosOrdenation: reordered.map(({ id }) => id),
        },
      )
      .then(refetchData)
      .catch(displayFGCApiErrors);
  };

  return {
    isLoading,
    isLoadingData,
    endLoadingData,
    startLoadingData,
    combos,
    addCombosToPlaylist,
    deleteCombosFromPlaylist,
    currentUserIsPlaylistOwner,
    playlistDetails,
    selectedCombos,
    setSelectedCombos,
    refetchData,
    orderedCombos,
    onSubmitOrdenation,
    startDragging,
    stopDragging,
    isDraggingCombos,
  } as const;
}
