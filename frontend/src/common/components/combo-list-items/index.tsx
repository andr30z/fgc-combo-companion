import { useBoolean } from '@/common/hooks/boolean';
import { useGetCharacters } from '@/common/hooks/get-characters';
import { useUser } from '@/common/hooks/user';
import { FGC_API_URLS, fgcApi } from '@/common/services/fgc-api';
import type { Combo } from '@/common/types/combo';
import type { PlaylistCombo } from '@/common/types/playlist-combo';
import { User } from '@/common/types/user';
import { promiseResultWithError } from '@/common/utils/promises';
import { Draggable } from '@hello-pangea/dnd';
import type { AxiosResponse } from 'axios';
import { get } from 'lodash';
import Image from 'next/image';
import { FC, MouseEvent as ReactMouseEvent, useState } from 'react';
import { toast } from 'react-hot-toast';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { AddComboToPlaylist } from '../add-combo-to-playlist';
import { Button } from '../button';
import { ComboForm } from '../combo-form';
import { ComboPreview } from '../combo-preview';
import { ComboTranslation } from '../combo-translation';
import { ConfirmAction } from '../confirm-action-modal';
import { ListItems, ListItemsProps } from '../list-items';
import { LoadingBackdrop } from '../loading-backdrop';
import { Modal } from '../modal';
import { UserPreviewLink } from '../user-preview-link';

const HeaderCombo: FC<{
  comboOrPlaylistCombo: ComboOrPlaylistCombo;
  showComboDeleteIconValidation?: (
    comboOrPlaylistCombo: ComboOrPlaylistCombo,
  ) => boolean;
  user?: User;
  showComboOwner?: boolean;
  useComboItemHeader?: boolean;
  deleteCombo: (comboId: string) => () => Promise<void>;
  confirmDeleteMsg: string;
  onSetSelectedItem: (item: Combo) => void;
}> = ({
  comboOrPlaylistCombo,
  showComboDeleteIconValidation,
  user,
  showComboOwner,
  useComboItemHeader,
  deleteCombo,
  confirmDeleteMsg,
  onSetSelectedItem,
}) => {
  const combo: Combo = (
    typeof get(comboOrPlaylistCombo, 'combo') === 'string'
      ? comboOrPlaylistCombo
      : comboOrPlaylistCombo.combo
  ) as Combo;
  const currentUserIsOwner = combo.owner.id === user?.id;
  const showDeleteIcon = showComboDeleteIconValidation
    ? showComboDeleteIconValidation(combo)
    : currentUserIsOwner;

  const { getCharacterName } = useGetCharacters({ game: combo.game });

  const damageAndCharacter =
    combo.totalDamage || combo.character ? (
      <span className="text-sub-info font-primary text-sm mt-[1px]">
        {combo.character ? getCharacterName(combo.character) : ''}
        {combo.totalDamage
          ? ` ${combo.character ? '-' : ''} ${combo.totalDamage} Damage`
          : null}
      </span>
    ) : null;

  return (
    <header className=" w-full mb-4 items-center flex flex-wrap flex-row justify-between">
      <div className="flex flex-col max-w-[80%]">
        <h5
          title={combo.name}
          className="text-ellipsis truncate text-xl text-light font-primary font-bold"
        >
          {combo.name}
        </h5>
        {damageAndCharacter}
        {showComboOwner && (
          <UserPreviewLink
            id={combo.owner.id}
            name={combo.owner.name}
            prefix="Created by"
          />
        )}
      </div>
      {useComboItemHeader && (
        <div className="flex flex-row gap-2">
          {user && <AddComboToPlaylist iconSize={27} comboId={combo.id} />}
          {currentUserIsOwner && (
            <AiFillEdit
              size={27}
              className="text-light cursor-pointer hover:text-primary"
              onClick={(e) => {
                e.stopPropagation();
                onSetSelectedItem(combo);
                // setSelectedItem(combo);
                // openForm();
              }}
            />
          )}
          {showDeleteIcon && (
            <ConfirmAction
              onConfirm={deleteCombo(comboOrPlaylistCombo.id)}
              confirmationText={confirmDeleteMsg}
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
      )}
    </header>
  );
};

type ComboOrPlaylistCombo = Combo | PlaylistCombo;
interface ComboListItemsProps extends ListItemsProps<ComboOrPlaylistCombo> {
  onSuccessSaveComboForm?: () => void;
  onSuccessDeleteCombo?: () => void;
  showComboDeleteIconValidation?: (
    comboOrPlaylistCombo: ComboOrPlaylistCombo,
  ) => boolean;
  useComboItemHeader?: boolean;
  isLoadingCombos?: boolean;
  emptyListMessage?: string;
  highlitedCombos?: Array<string | Combo | PlaylistCombo>;
  onClickComboItem?: (
    combo: ComboOrPlaylistCombo,
    event: ReactMouseEvent<HTMLDivElement, MouseEvent>,
    defaultAction: () => void,
  ) => void;
  useCreateComboButtonWhenEmpty?: boolean;
  showComboOwner?: boolean;
  confirmDeleteMsg?: string;
  deleteComboAction?: (
    comboId: string,
  ) => Promise<AxiosResponse<unknown, unknown>>;
}

export const ComboListItems: FC<ComboListItemsProps> = ({
  items,
  onSuccessSaveComboForm,
  onSuccessDeleteCombo,
  isLoadingCombos = false,
  emptyListMessage = 'No combos to list',
  useComboItemHeader = true,
  onClickComboItem,
  useCreateComboButtonWhenEmpty = true,
  showComboOwner = false,
  confirmDeleteMsg = 'Are you sure you want to delete this combo?',
  deleteComboAction,
  highlitedCombos = [],
  showComboDeleteIconValidation,
  ...rest
}) => {
  const [selectedItem, setSelectedItem] = useState<Combo>();
  const [isComboFormOpen, { setTrue: openForm, setFalse: closeForm }] =
    useBoolean();
  const [isLoading, { setFalse: endLoading, setTrue: startLoading }] =
    useBoolean();
  const { user } = useUser({ redirectTo: null });

  const deleteCombo = (comboId: string) => async () => {
    startLoading();
    const { error } = await promiseResultWithError(
      deleteComboAction
        ? deleteComboAction(comboId)
        : fgcApi.delete(FGC_API_URLS.getDeleteComboUrl(comboId)),
    );
    endLoading();
    if (error) {
      toast.error(error.message);
      return;
    }
    if (onSuccessDeleteCombo) {
      onSuccessDeleteCombo();
    }
  };

  return (
    <>
      <LoadingBackdrop isLoading={isLoading} />
      <Modal
        title="Combo Form"
        isOpen={isComboFormOpen}
        onClose={() => {
          setSelectedItem(undefined);
          closeForm();
        }}
        width="xl"
      >
        <ComboForm
          onSuccess={() => {
            closeForm();
            if (onSuccessSaveComboForm) {
              onSuccessSaveComboForm();
            }
          }}
          initialValues={selectedItem}
        />
      </Modal>

      <ListItems<ComboOrPlaylistCombo>
        renderRow={(item, { enableOrdernation, droppableProvided, index }) => {
          const id = item.id;
          const isComboHighlited = highlitedCombos.some((comboOrComboId) => {
            return get(comboOrComboId, 'id') === id || comboOrComboId === id;
          });
          const combo: Combo = (
            typeof get(item, 'combo') === 'string' ? item : item.combo
          ) as Combo;

          return (
            <Draggable
              index={index}
              key={id.toString()}
              draggableId={id.toString()}
              isDragDisabled={!enableOrdernation}
            >
              {(provided) => (
                <div
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  ref={provided.innerRef}
                >
                  <div className="hidden">{droppableProvided.placeholder}</div>
                  <ComboPreview
                    key={`${item.id} - ${combo.game}`}
                    combo={combo.combo}
                    description={combo.description}
                    game={combo.game}
                    comboId={combo.id}
                    character={combo.character}
                    totalDamage={combo.totalDamage}
                  >
                    {(openComboDetails) => (
                      <ComboTranslation
                        className={`mt-4 border-2 border-secondary-dark hover:bg-opacity-20 ${
                          isComboHighlited ? '' : 'hover:bg-light'
                        } cursor-pointer`}
                        backgroundColor={
                          isComboHighlited ? 'light-active' : 'dark'
                        }
                        game={combo.game}
                        combo={combo.combo}
                        onClick={(e) => {
                          e.stopPropagation();
                          const defaultAction = () => {
                            setSelectedItem(combo);
                            openComboDetails();
                          };
                          if (onClickComboItem) {
                            return onClickComboItem(item, e, defaultAction);
                          }
                          defaultAction();
                        }}
                        rendeHeader={() => (
                          <HeaderCombo
                            comboOrPlaylistCombo={item}
                            confirmDeleteMsg={confirmDeleteMsg}
                            deleteCombo={deleteCombo}
                            user={user}
                            showComboDeleteIconValidation={
                              showComboDeleteIconValidation
                            }
                            showComboOwner={showComboOwner}
                            useComboItemHeader={useComboItemHeader}
                            onSetSelectedItem={(item) => {
                              setSelectedItem(item);
                              openForm();
                            }}
                          />
                        )}
                      />
                    )}
                  </ComboPreview>
                </div>
              )}
            </Draggable>
          );
        }}
        emptyListComponent={
          <div className="flex flex-col flex-1 justify-center items-center min-h-[400px] text-center gap-4">
            <h1 className="text-light font-bold text-5xl">
              {emptyListMessage}
            </h1>
            {useCreateComboButtonWhenEmpty && (
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
          </div>
        }
        isLoadingData={isLoadingCombos}
        items={items}
        {...rest}
      />
    </>
  );
};
