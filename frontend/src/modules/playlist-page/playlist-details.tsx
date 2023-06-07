'use client';
import { Button } from '@/common/components/button';
import { ComboFormWithModal } from '@/common/components/combo-form-with-modal';
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
import Image from 'next/image';
import { FC, useState } from 'react';
import { toast } from 'react-hot-toast';
import {
  AiFillDelete,
  AiFillEdit,
  AiFillInfoCircle,
  AiOutlineMenuUnfold,
  AiOutlineSearch,
} from 'react-icons/ai';
import { IoIosAddCircle } from 'react-icons/io';
import { usePlaylistPage } from './playlist-page-context';
import { PopOver } from '@/common/components/pop-over';
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
  const refetchData = () => {
    refetch();
  };

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
        refetchData();
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
          <header className="w-full flex flex-col items-start gap-2">
            <h1
              title={playlistDetails?.name}
              className="text-6xl text-light font-primary font-bold truncate w-full"
            >
              {playlistDetails?.name}
            </h1>
            {playlistDetails?.description && (
              <p
                title={playlistDetails?.description}
                className="text-sm text-sub-info font-primary line-clamp-3 w-full"
              >
                {playlistDetails?.description}
              </p>
            )}
            <div className="w-full justify-between flex flex-row flex-wrap">
              <p className="text-sub-info font-primary text-md">
                {playlistDetails?.owner.name} - {combos?.length} combo
                {combos?.length === 1 ? '' : 's'}
              </p>
              <div className="flex flex-row flex-wrap gap-2">
                {currentUserIsPlaylistOwner && (
                  <>
                    <PopOver
                      trigger={
                        <button>
                          <AiFillInfoCircle
                            size={25}
                            className="cursor-pointer text-light hover:text-secondary"
                            title="Playlist command hint"
                          />
                        </button>
                      }
                    >
                      <p>
                        <code className="bg-light-darker text-xs p-1">
                          Ctrl + Mouse Left Click
                        </code>{' '}
                        enables multiple row selection
                      </p>
                    </PopOver>
                    <PlaylistFormWithModal
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
                        <AiOutlineSearch
                          title="Search combos to add to this playlist"
                          className="text-white hover:text-secondary cursor-pointer"
                          onClick={openSearch}
                          size={25}
                        />
                      )}
                      onFinish={addCombosToPlaylist}
                    />
                    <ComboFormWithModal
                      customUrl={`${FGC_API_URLS.getCreateAndAddCombosToPlaylistUrl(
                        playlistId,
                      )}`}
                      renderTriggerOpenForm={(openForm) => (
                        <IoIosAddCircle
                          title="Create a new combo and add it to this playlist"
                          className="text-white hover:text-secondary cursor-pointer"
                          size={25}
                          onClick={openForm}
                        />
                      )}
                    />
                  </>
                )}
                {selectedCombos.length > 0 && (
                  <ConfirmAction
                    onConfirm={async () => {
                      startLoadingData();
                      await deleteCombosFromPlaylist(
                        selectedCombos.map(({ id }) => id),
                      );
                      setSelectedCombos([]);
                      endLoadingData();
                      refetchData();
                    }}
                    confirmationText="Are you sure you want to remove the selected combos from this playlist?"
                  >
                    {({ openConfirmModal }) => (
                      <AiFillDelete
                        size={25}
                        title="Remove all selected combos from this playlist"
                        className="text-light cursor-pointer hover:text-primary"
                        onClick={(e) => {
                          e.stopPropagation();
                          openConfirmModal();
                        }}
                      />
                    )}
                  </ConfirmAction>
                )}
              </div>
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
            emptyListComponent={
              <div className="flex flex-col flex-1 justify-center items-center min-h-[400px] text-center gap-4">
                <h1 className="text-light font-bold text-5xl">
                  This playlist is empty
                </h1>

                <ComboFormWithModal
                  customUrl={FGC_API_URLS.getCreateAndAddCombosToPlaylistUrl(
                    playlistId,
                  )}
                  onSuccessSaveComboForm={refetchData}
                  renderTriggerOpenForm={(openForm) => (
                    <Button
                      onClick={openForm}
                      text="Create Combo"
                      color="light"
                      useHoverStyles={false}
                      extraStyles="group/combo"
                      rightIcon={
                        <Image
                          priority
                          className="group-hover/combo:scale-125 group-hover/combo:transition-all group-hover/combo:duration-300 group-hover/combo:ease-in-out"
                          alt="FGC Combo"
                          src="/combo-fist.svg"
                          height={23}
                          width={23}
                        />
                      }
                    />
                  )}
                />
              </div>
            }
            confirmDeleteMsg="Are you sure you want to remove this combo from this playlist?"
            onSuccessDeleteCombo={refetchData}
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
