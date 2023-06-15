'use client';

import { Playlist } from '@/common/types/playlist';
import { ListItems } from '../list-items';
import { AiFillDelete, AiFillEdit, AiFillEye } from 'react-icons/ai';
import { ConfirmAction } from '../confirm-action-modal';
import Link from 'next/link';
import { useUser } from '@/common/hooks/user';
import { Button } from '../button';

interface PlaylistsProps {
  items?: Playlist[];
  onEdit?: (item: Playlist) => void;
  onDelete?: (item: Playlist) => void;
  emptyListMessage?: string;
  useCreatePlaylistButton?: boolean;
  openPlaylistForm?: () => void;
}

export const PlaylistList: React.FC<PlaylistsProps> = ({
  items,
  onEdit,
  onDelete,
  useCreatePlaylistButton = false,
  emptyListMessage = "This playlist doesn't have any combos yet.",
  openPlaylistForm,
}) => {
  const { user } = useUser();
  return (
    <ListItems
      items={items ?? []}
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
            const userIsOwner = user?.id === item.owner.id;
            return (
              <div className="flex flex-row flex-wrap gap-2">
                <Link href={`/playlist/${item.id}`}>
                  <AiFillEye
                    title="View playlist"
                    size={27}
                    className="text-light cursor-pointer hover:text-primary"
                  />
                </Link>
                {userIsOwner && (
                  <AiFillEdit
                    size={27}
                    className="text-light cursor-pointer hover:text-primary"
                    onClick={onEdit ? () => onEdit(item) : undefined}
                  />
                )}
                {userIsOwner && onDelete && (
                  <ConfirmAction
                    onConfirm={() => onDelete(item)}
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
                )}
              </div>
            );
          },
        },
      ]}
      hideHeader
      getRowClassName={() => 'bg-secondary-dark'}
      emptyListComponent={
        <div className="flex flex-col flex-1 justify-center items-center min-h-[400px] text-center gap-4">
          <h1 className="text-light font-bold text-5xl">{emptyListMessage}</h1>
          {useCreatePlaylistButton && (
            <Button
              onClick={openPlaylistForm}
              text="Create Playlist"
              color="light"
            />
          )}
        </div>
      }
    />
  );
};
