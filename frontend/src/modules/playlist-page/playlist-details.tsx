'use client';
import { ComboListItems } from '@/common/components/combo-list-items';
import { ConfirmAction } from '@/common/components/confirm-action-modal';
import { LoadingBackdrop } from '@/common/components/loading-backdrop';
import { PlaylistFormWithModal } from '@/common/components/playlist-form-with-modal';
import { SelectSearchCombo } from '@/common/components/select-search-combo';
import { Spinner } from '@/common/components/spinner';
import { useApiQuery } from '@/common/hooks/api-query';
import { useBoolean } from '@/common/hooks/boolean';
import { useHideScrollbar } from '@/common/hooks/hide-scrollbar';
import { useUser } from '@/common/hooks/user';
import { FGC_API_URLS, fgcApi } from '@/common/services/fgc-api';
import { Combo } from '@/common/types/combo';
import { PlaylistWithCombos } from '@/common/types/playlist';
import { PlaylistCombo } from '@/common/types/playlist-combo';
import { FC, useState } from 'react';
import { toast } from 'react-hot-toast';
import { AiFillDelete, AiFillEdit, AiOutlineMenuUnfold } from 'react-icons/ai';
import { IoIosAddCircle } from 'react-icons/io';
import { usePlaylistPage } from './playlist-page-context';
const TEN_MINUTES = 10 * 60 * 1000;
export const PlaylistDetails: FC<{
  playlistInitialData?: PlaylistWithCombos;
  playlistId: string;
}> = ({ playlistInitialData, playlistId }) => {
  const { user } = useUser();
  useHideScrollbar();

  const [selectedCombos, setSelectedCombos] = useState<Array<PlaylistCombo>>(
    [],
  );
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

  const { togglePlaylistPageMobileSideBar } = usePlaylistPage();

  const [
    isLoadingData,
    { setFalse: endLoadingData, setTrue: startLoadingData },
  ] = useBoolean();

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

  const deleteCombosFromPlaylist = (playlistComboIds: Array<number>) => {
    return fgcApi.delete(
      FGC_API_URLS.getRemoveCombosFromPlaylistUrl(
        playlistDetails?.id as number,
        playlistComboIds,
      ),
    );
  };
  return (
    <>
      <LoadingBackdrop isLoading={isLoadingData} />
      {isLoading && !playlistDetails ? (
        <div className="w-[75%] flex items-center justify-center">
          <Spinner color="primary" />
        </div>
      ) : (
        <main className="flex-1 h-[80vh] md:pl-0 px-4 overflow-y-auto rounded-lg">
          <AiOutlineMenuUnfold
            size={35}
            onClick={togglePlaylistPageMobileSideBar}
            role="button"
            className="text-light cursor-pointer hover:text-secondary md:hidden"
          />
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
                  {selectedCombos.length > 0 && (
                    <ConfirmAction
                      onConfirm={async () => {
                        startLoadingData();
                        await deleteCombosFromPlaylist(
                          selectedCombos.map(({ id }) => id),
                        );
                        setSelectedCombos([]);
                        endLoadingData();
                        refetch();
                      }}
                      confirmationText="Are you sure you want to remove the selected combos from this playlist?"
                    >
                      {({ openConfirmModal }) => (
                        <AiFillDelete
                          size={25}
                          className="text-light cursor-pointer hover:text-primary"
                          onClick={(e) => {
                            e.stopPropagation();
                            openConfirmModal();
                          }}
                        />
                      )}
                    </ConfirmAction>
                  )}
                  <PlaylistFormWithModal
                    onSuccessSavePlaylistForm={() => refetch()}
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
            showComboDeleteIconValidation={() => {
              return true;
            }}
            highlitedCombos={selectedCombos}
            onClickComboItem={(combo, event, defaultAction) => {
              if (!event.ctrlKey) {
                setSelectedCombos([]);
                return defaultAction();
              }

              setSelectedCombos((current) => {
                if (current.some((entry) => entry.id === combo.id)) {
                  return current.filter((entry) => entry.id !== combo.id);
                }
                return [...current, combo] as Array<PlaylistCombo>;
              });
            }}
            useCreateComboButtonWhenEmpty={false}
            onSuccessSaveComboForm={refetch}
            confirmDeleteMsg="Are you sure you want to remove this combo from this playlist?"
            onSuccessDeleteCombo={refetch}
            deleteComboAction={(playlistComboId) =>
              deleteCombosFromPlaylist([playlistComboId])
            }
            items={orderedCombos}
          />
        </main>
      )}
    </>
  );
};
