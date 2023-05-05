'use client';
import { ComboListItems } from '@/common/components/combo-list-items';
import { PlaylistFormWithModal } from '@/common/components/playlist-form-with-modal';
import { SelectSearchCombo } from '@/common/components/select-search-combo';
import { Spinner } from '@/common/components/spinner';
import { useApiQuery } from '@/common/hooks/api-query';
import { useBoolean } from '@/common/hooks/boolean';
import { useUser } from '@/common/hooks/user';
import { FGC_API_URLS, fgcApi } from '@/common/services/fgc-api';
import { Combo } from '@/common/types/combo';
import { PlaylistWithCombos } from '@/common/types/playlist';
import { FC, useState } from 'react';
import { toast } from 'react-hot-toast';
import { AiFillEdit } from 'react-icons/ai';
import { IoIosAddCircle } from 'react-icons/io';
const TEN_MINUTES = 10 * 60 * 1000;
export const PlaylistDetails: FC<{
  playlistInitialData?: PlaylistWithCombos;
  playlistId: string;
}> = ({ playlistInitialData, playlistId }) => {
  const { user } = useUser();
  const [selectedCombos, setSelectedCombos] = useState<Array<Combo>>([]);
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

  const addCombosToPlaylist = (combos: Array<Combo>) => {
    fgcApi
      .post(FGC_API_URLS.getAddCombosToPlaylistUrl(playlistId), {
        combos: combos.map(({ id }) => id),
      })
      .then(() => {
        toast.success('Combos added to playlist successfully');
        refetch();
      });
  };
  const orderedCombos = playlistDetails?.playlistCombos?.sort((a, b) => {
    return a.position - b.position;
  });
  const combos = orderedCombos?.map((playlistCombo) => playlistCombo.combo);
  const currentUserIsPlaylistOwner = playlistDetails?.owner.id === user?.id;
  return (
    <div className="w-full h-full min-h-80vh flex flex-col-reverse md:flex-row justify-between gap-2 layout-padding-x mt-5">
      {isLoading && !playlistDetails ? (
        <div className="w-[75%] flex items-center justify-center">
          <Spinner color="primary" />
        </div>
      ) : (
        <main className="w-[75%]">
          <header className="truncate w-full flex flex-col items-start gap-2">
            <h1
              title={playlistDetails?.name}
              className="text-6xl text-light font-primary font-bold"
            >
              {playlistDetails?.name}
            </h1>
            {playlistDetails?.description && (
              <p
                title={playlistDetails?.description}
                className="text-sm text-sub-info font-primary"
              >
                {playlistDetails?.description}
              </p>
            )}
            <div className="w-full justify-between flex flex-row flex-wrap">
              <p className="text-sub-info font-primary text-md">
                {playlistDetails?.owner.name} - {combos?.length} combo
                {combos?.length === 1 ? '' : 's'}
              </p>
              {currentUserIsPlaylistOwner && (
                <div className="flex flex-row flex-wrap gap-2">
                  <PlaylistFormWithModal
                    onSuccessSavePlaylistForm={refetch}
                    initialValues={playlistDetails}
                    renderTriggerOpenForm={(openForm) => (
                      <AiFillEdit
                        size={25}
                        onClick={openForm}
                        title="Edit playlist"
                        className="cursor-pointer text-light hover:text-secondary"
                      />
                    )}
                  />
                  <SelectSearchCombo
                    label=""
                    containerClassName=""
                    renderAddIcon={(openSearch) => (
                      <IoIosAddCircle
                        className="text-white hover:text-secondary cursor-pointer"
                        onClick={openSearch}
                        size={25}
                      />
                    )}
                    onFinish={addCombosToPlaylist}
                  />
                </div>
              )}
            </div>
          </header>
          <ComboListItems
            showComboOwner
            highlitedCombos={selectedCombos}
            onClickComboItem={(combo, event, defaultAction) => {
              console.log(event.ctrlKey);
              if (!event.ctrlKey) {
                setSelectedCombos([]);
                return defaultAction();
              }

              setSelectedCombos((current) => {
                if (current.some((entry) => entry.id === combo.id)) {
                  return current.filter((entry) => entry.id !== combo.id);
                }
                return [...current, combo];
              });
            }}
            useCreateComboButtonWhenEmpty={false}
            onSuccessSaveComboForm={refetch}
            confirmDeleteMsg="Are you sure you want to remove this combo from this playlist?"
            onSuccessDeleteCombo={refetch}
            deleteComboAction={(comboId) =>
              fgcApi.delete(
                FGC_API_URLS.getRemoveCombosFromPlaylistUrl(
                  playlistDetails?.id as number,
                ),
                {
                  params: {
                    playlistComboId: orderedCombos?.find(
                      (playlistCombo) => playlistCombo.combo.id === comboId,
                    )?.id,
                  },
                },
              )
            }
            items={combos}
          />
        </main>
      )}
      <aside className="flex-1">
        <h5 className="text-xl text-light font-primary font-bold">
          Other playlists
        </h5>
      </aside>
    </div>
  );
};
