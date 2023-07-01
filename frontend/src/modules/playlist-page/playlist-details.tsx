'use client';
import { Button } from '@/common/components/button';
import { ComboFormWithModal } from '@/common/components/combo-form-with-modal';
import { ComboListItems } from '@/common/components/combo-list-items';
import { ConfirmAction } from '@/common/components/confirm-action-modal';
import { LoadingBackdrop } from '@/common/components/loading-backdrop';
import { PlaylistFormWithModal } from '@/common/components/playlist-form-with-modal';
import { PopOver } from '@/common/components/pop-over';
import { SelectSearchCombo } from '@/common/components/select-search-combo';
import { Spinner } from '@/common/components/spinner';
import { useHideScrollbar } from '@/common/hooks/hide-scrollbar';
import { usePlaylistDetails } from '@/common/hooks/playlist-details';
import { FGC_API_URLS } from '@/common/services/fgc-api';
import type { PlaylistWithCombos } from '@/common/types/playlist';
import type { PlaylistCombo } from '@/common/types/playlist-combo';
import Image from 'next/image';
import type { FC } from 'react';
import {
  AiFillDelete,
  AiFillEdit,
  AiFillInfoCircle,
  AiOutlineMenuUnfold,
  AiOutlineSearch,
} from 'react-icons/ai';
import { IoIosAddCircle } from 'react-icons/io';
import { usePlaylistPage } from './playlist-page-context';
import { UserPreview } from '@/common/components/user-preview';
import { Link } from '@/common/components/link';
export const PlaylistDetails: FC<{
  playlistInitialData?: PlaylistWithCombos;
  playlistId: string;
}> = ({ playlistInitialData, playlistId }) => {
  const { togglePlaylistPageMobileSideBar } = usePlaylistPage();

  useHideScrollbar();
  const {
    addCombosToPlaylist,
    combos,
    orderedCombos,
    currentUserIsPlaylistOwner,
    deleteCombosFromPlaylist,
    endLoadingData,
    isLoading,
    isLoadingData,
    startLoadingData,
    selectedCombos,
    setSelectedCombos,
    playlistDetails,
    refetchData,
    onSubmitOrdenation,
    isDraggingCombos,
    startDragging,
  } = usePlaylistDetails(playlistId, { playlistInitialData });
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
              <span className="text-sub-info font-primary text-md">
                {playlistDetails && (
                  <UserPreview
                    userId={playlistDetails.owner.id}
                    trigger={
                      <Link
                        href={`/user/${playlistDetails.owner.id}`}
                        useHoverStyles={false}
                        onClick={(e) => e.stopPropagation()}
                        className="text-sub-info"
                      >
                        {playlistDetails.owner.name} - {combos?.length} combo
                        {combos?.length === 1 ? '' : 's'}
                      </Link>
                    }
                  />
                )}{' '}
              </span>
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
                      <br />
                      <p>
                        <code className="bg-light-darker text-xs p-1">
                          Mouse Left Click + HOLD
                        </code>{' '}
                        enables multiple combos ordenation
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
                  </>
                )}
              </div>
            </div>
          </header>
          <ComboListItems
            showComboOwner
            showComboDeleteIconValidation={() => {
              return currentUserIsPlaylistOwner;
            }}
            onDragStart={startDragging}
            className={isDraggingCombos ? 'pb-80' : undefined}
            onFinishOrdenation={onSubmitOrdenation}
            enableOrdernation={currentUserIsPlaylistOwner}
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

                {currentUserIsPlaylistOwner && (
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
                )}
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
