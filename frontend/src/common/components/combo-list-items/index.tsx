import { useBoolean } from '@/common/hooks/boolean';
import { useUser } from '@/common/hooks/user';
import { FGC_API_URLS, fgcApi } from '@/common/services/fgc-api';
import { Combo } from '@/common/types/combo';
import { promiseResultWithError } from '@/common/utils/Promises';
import { AxiosResponse } from 'axios';
import Image from 'next/image';
import { FC, MouseEvent as ReactMouseEvent, useState } from 'react';
import { toast } from 'react-hot-toast';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { Button } from '../button';
import { ComboForm } from '../combo-form';
import { ComboPreview } from '../combo-preview';
import { ComboTranslation } from '../combo-translation';
import { ConfirmAction } from '../confirm-action-modal';
import { ListItems, ListItemsProps } from '../list-items';
import { LoadingBackdrop } from '../loading-backdrop';
import { Modal } from '../modal';
import { get } from 'lodash';
interface ComboListItemsProps extends ListItemsProps<Combo> {
  onSuccessSaveComboForm?: () => void;
  onSuccessDeleteCombo?: () => void;
  rowIdentifier?: (combo: Combo) => string;
  useComboItemHeader?: boolean;
  isLoadingCombos?: boolean;
  emptyListMessage?: string;
  highlitedCombos?: Array<number | Combo>;
  onClickComboItem?: (
    combo: Combo,
    event: ReactMouseEvent<HTMLDivElement, MouseEvent>,
    defaultAction: () => void,
  ) => void;
  useCreateComboButtonWhenEmpty?: boolean;
  showComboOwner?: boolean;
  confirmDeleteMsg?: string;
  deleteComboAction?: (
    comboId: number,
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
  rowIdentifier = ({ id }) => id,
  ...rest
}) => {
  const [selectedItem, setSelectedItem] = useState<Combo>();
  const [isComboFormOpen, { setTrue: openForm, setFalse: closeForm }] =
    useBoolean();
  const [isLoading, { setFalse: endLoading, setTrue: startLoading }] =
    useBoolean();
  const { user } = useUser();

  const deleteCombo = (comboId: number) => async () => {
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
        width="lg"
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

      <ListItems<Combo>
        renderRow={(item) => {
          const id = rowIdentifier(item);
          const isComboHighlited = highlitedCombos.some((comboOrComboId) => {
            return (
              String(get(comboOrComboId, 'id')) === id ||
              String(comboOrComboId) === id
            );
          });
          return (
            <ComboPreview
              combo={item.combo}
              description={item.description}
              game={item.game}
            >
              {(openComboDetails) => (
                <ComboTranslation
                  className={`mt-4 border-2 border-secondary-dark hover:bg-opacity-20 ${
                    isComboHighlited ? '' : 'hover:bg-light'
                  } cursor-pointer`}
                  backgroundColor={isComboHighlited ? 'light-active' : 'dark'}
                  game={item.game}
                  combo={item.combo}
                  onClick={(e) => {
                    e.stopPropagation();
                    const defaultAction = () => {
                      setSelectedItem(item);
                      openComboDetails();
                    };
                    if (onClickComboItem) {
                      return onClickComboItem(item, e, defaultAction);
                    }
                    defaultAction();
                  }}
                  rendeHeader={() => {
                    const currentUserIsOwner = item.owner.id === user?.id;
                    return (
                      <header className=" w-full mb-4 items-center flex flex-wrap flex-row justify-between">
                        <div className="flex flex-col">
                          <h5 className="text-ellipsis truncate text-xl text-light font-primary font-bold">
                            {item.name}
                          </h5>
                          {showComboOwner && (
                            <span className="text-sub-info font-primary text-sm mt-[1px]">
                              Created by{' '}
                              {currentUserIsOwner ? 'you' : item.owner.name}
                            </span>
                          )}
                        </div>
                        {useComboItemHeader && currentUserIsOwner && (
                          <div className="flex-row flex gap-2">
                            <AiFillEdit
                              size={27}
                              className="text-light cursor-pointer hover:text-primary"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedItem(item);
                                openForm();
                              }}
                            />
                            <ConfirmAction
                              onConfirm={deleteCombo(item.id)}
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
                          </div>
                        )}
                      </header>
                    );
                  }}
                />
              )}
            </ComboPreview>
          );
        }}
        emptyListComponent={
          <div className="flex flex-col flex-1 justify-center items-center min-h-[500px] text-center gap-4">
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
