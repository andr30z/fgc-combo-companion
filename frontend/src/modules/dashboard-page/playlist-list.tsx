'use client';
import { Button } from '@/common/components/button';
import { ConfirmAction } from '@/common/components/confirm-action-modal';
import { Input } from '@/common/components/input';
import { Link } from '@/common/components/link';
import { ListItems } from '@/common/components/list-items';
import { LoadingBackdrop } from '@/common/components/loading-backdrop';
import { Modal } from '@/common/components/modal';
import { Pagination } from '@/common/components/pagination';
import { PlaylistForm } from '@/common/components/playlist-form';
import { useBoolean } from '@/common/hooks/boolean';
import { useInvalidateGlobalSearchQueries } from '@/common/hooks/invalidate-global-search-queries';
import { usePaginatedSearch } from '@/common/hooks/paginated-search';
import { useUser } from '@/common/hooks/user';
import { FGC_API_URLS, fgcApi } from '@/common/services/fgc-api';
import { FGCApiPaginationResponse } from '@/common/types/fgc-api-pagination-response';
import type { Playlist } from '@/common/types/playlist';
import { promiseResultWithError } from '@/common/utils/promises';
import { FC, useState } from 'react';
import { toast } from 'react-hot-toast';
import {
  AiFillDelete,
  AiFillEdit,
  AiFillEye,
  AiOutlinePlus,
  AiOutlineSearch,
} from 'react-icons/ai';

export const PlaylistList: FC<{
  initialPlaylistsData?: FGCApiPaginationResponse<Playlist>;
}> = ({ initialPlaylistsData }) => {
  const [isLoading, { setFalse: stopLoading, setTrue: startLoading }] =
    useBoolean();
  const { user } = useUser();

  const {
    data: playlistsData,
    debouncedResetSearch: refetch,
    isFetching: isLoadingPlaylists,
    onSelectPage,
    searchValue,
    setSearchValue,
  } = usePaginatedSearch<Playlist>({
    queryKey: ['playlists', user?.id],
    url: FGC_API_URLS.MY_PLAYLISTS,
    initialData: initialPlaylistsData ?? undefined,
  });

  const [selectedItem, setSelectedItem] = useState<Playlist>();

  const [
    isPlaylistFormOpen,
    { setFalse: closePlaylistForm, setTrue: openPlaylistForm },
  ] = useBoolean();
  const resetQueries = useInvalidateGlobalSearchQueries();

  const deletePlaylists = (playlistId: string) => async () => {
    startLoading();
    const { error } = await promiseResultWithError(
      fgcApi.delete(FGC_API_URLS.getDeletePlaylistUrl(playlistId)),
    );
    stopLoading();
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success('Playlist deleted successfully!');
    resetQueries();
  };

  return (
    <div className="flex flex-col flex-1 w-full h-full mt-6">
      <LoadingBackdrop isLoading={isLoading} />
      <header className="rounded-md bg-secondary-dark p-3 mb-12 w-full flex flex-col sm:flex-row flex-wrap items-center justify-between gap-2">
        <h5 className="text-2xl text-light font-primary font-bold">
          Your Playlists
        </h5>
        <div className="flex flex-row flex-wrap justify-center gap-2">
          <Input
            iconLeft={<AiOutlineSearch size={23} className="text-primary" />}
            placeholder="Search for playlists"
            height="h-[40px]"
            width="w-full sm:w-[300px]"
            className=""
            value={searchValue}
            setValue={setSearchValue}
            onChange={refetch}
          />
          <Button
            onClick={openPlaylistForm}
            color="primary"
            rightIcon={<AiOutlinePlus size={22} />}
          />
          <Modal
            title="Playlist Form"
            isOpen={isPlaylistFormOpen}
            onClose={() => {
              setSelectedItem(undefined);
              closePlaylistForm();
            }}
            width="xl"
          >
            <PlaylistForm
              initialValues={selectedItem}
              onSuccess={() => {
                setSelectedItem(undefined);
                refetch();
                closePlaylistForm();
              }}
            />
          </Modal>
        </div>
      </header>
      <ListItems
        items={playlistsData?.data ?? []}
        columns={[
          {
            label: 'Name',
            name: 'name',
            size: 'w-[30%]',
          },
          {
            label: 'Description',
            name: 'description',
            size: 'w-[30%]',
          },
          {
            label: 'Created At',
            name: 'createdAt',
            format: 'date',
            size: 'w-[20%]',
          },
          {
            label: 'Actions',
            name: 'actions',
            size: 'w-[20%]',
            renderColumnValue(item) {
              return (
                <div className="flex flex-row flex-wrap gap-2">
                  <Link href={`/playlist/${item.id}`}>
                    <AiFillEye
                      title="View playlist"
                      size={27}
                      className="text-light cursor-pointer hover:text-primary"
                    />
                  </Link>
                  <AiFillEdit
                    size={27}
                    className="text-light cursor-pointer hover:text-primary"
                    onClick={() => {
                      setSelectedItem(item);
                      openPlaylistForm();
                    }}
                  />
                  <ConfirmAction
                    onConfirm={deletePlaylists(item.id)}
                    confirmationText="Are you sure you want to delete this playlist?"
                  >
                    {({ openConfirmModal }) => (
                      <AiFillDelete
                        size={27}
                        className="text-light cursor-pointer hover:text-primary"
                        onClick={(e) => {
                          e.stopPropagation();
                          openConfirmModal();
                        }}
                      />
                    )}
                  </ConfirmAction>
                </div>
              );
            },
          },
        ]}
        getRowClassName={() => 'bg-secondary-dark'}
        emptyListComponent={
          <div className="flex flex-col flex-1 justify-center items-center min-h-[500px] text-center gap-4">
            <h1 className="text-light font-bold text-5xl">
              {searchValue.trim().length > 0 && !isLoadingPlaylists
                ? 'No playlists found for search term: "' + searchValue + '"'
                : "You don't have any playlists yet."}
            </h1>
            <Button
              onClick={openPlaylistForm}
              text="Create Playlist"
              color="light"
            />
          </div>
        }
      />

      {playlistsData ? (
        <div className="mt-5 w-full">
          <Pagination pagination={playlistsData} onSelectPage={onSelectPage} />
        </div>
      ) : null}
    </div>
  );
};
