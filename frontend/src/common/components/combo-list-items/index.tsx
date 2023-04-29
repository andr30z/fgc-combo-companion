import { FC, useState } from 'react';
import { ListItems, ListItemsProps } from '../list-items';
import { ComboTranslation } from '../combo-translation';
import { Button } from '../button';
import Image from 'next/image';
import { Combo } from '@/common/types/combo';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { Modal } from '../modal';
import { ComboForm } from '../combo-form';
import { useBoolean } from '@/common/hooks/boolean';
import { ConfirmAction } from '../confirm-action-modal';
import { LoadingBackdrop } from '../loading-backdrop';
import { promiseResultWithError } from '@/common/utils/Promises';
import { FGC_API_URLS, fgcApi } from '@/common/services/fgc-api';
import { toast } from 'react-hot-toast';
import { ComboPreview } from '../combo-preview';

interface ComboListItemsProps extends ListItemsProps<Combo> {
  onSuccessSaveComboForm?: () => void;
  onSuccessDeleteCombo?: () => void;
  useComboItemHeader?: boolean;
  isLoadingCombos?: boolean;
  emptyListMessage?: string;
  onClickComboItem?: (combo: Combo) => void;
}

export const ComboListItems: FC<ComboListItemsProps> = ({
  items,
  onSuccessSaveComboForm,
  onSuccessDeleteCombo,
  isLoadingCombos = false,
  emptyListMessage = 'No combos to list',
  useComboItemHeader = true,
  onClickComboItem,
  ...rest
}) => {
  const [selectedItem, setSelectedItem] = useState<Combo>();
  const [isComboFormOpen, { setTrue: openForm, setFalse: closeForm }] =
    useBoolean();
  const [isLoading, { setFalse: endLoading, setTrue: startLoading }] =
    useBoolean();

  const deleteCombo = (comboId: number) => async () => {
    startLoading();
    const { error } = await promiseResultWithError(
      fgcApi.delete(FGC_API_URLS.getDeleteComboUrl(comboId)),
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
        renderRow={(item) => (
          <ComboPreview
            combo={item.combo}
            description={item.description}
            game={item.game}
          >
            {(openComboDetails) => (
              <ComboTranslation
                className="mt-4 border-2 border-secondary-dark hover:bg-opacity-20 hover:bg-light cursor-pointer"
                backgroundColor="dark"
                game={item.game}
                combo={item.combo}
                onClick={(e) => {
                  e.stopPropagation();
                  if (onClickComboItem) {
                    return onClickComboItem(item);
                  }
                  setSelectedItem(item);
                  openComboDetails();
                }}
                rendeHeader={() => {
                  return (
                    <header className=" w-full mb-4 items-center flex flex-wrap flex-row justify-between">
                      <h5 className="text-ellipsis truncate text-xl text-light font-primary font-bold">
                        {item.name}
                      </h5>
                      {useComboItemHeader && (
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
                            confirmationText="Are you sure you want to delete this combo?"
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
        )}
        emptyListComponent={
          <div className="flex flex-col flex-1 justify-center items-center min-h-[500px] text-center gap-4">
            <h1 className="text-light font-bold text-5xl">
              {emptyListMessage}
            </h1>
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
          </div>
        }
        items={items}
        isLoadingData={isLoadingCombos}
        {...rest}
      />
    </>
  );
};
