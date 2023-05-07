'use client';

import { useBoolean } from '@/common/hooks/boolean';
import { usePaginatedSearch } from '@/common/hooks/paginated-search';
import { FGC_API_URLS } from '@/common/services/fgc-api';
import { Combo } from '@/common/types/combo';
import { FC, ReactNode, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { IoMdAddCircle } from 'react-icons/io';
import { RxCross2 } from 'react-icons/rx';
import { Button } from '../button';
import { ComboListItems } from '../combo-list-items';
import { ComboPreview } from '../combo-preview';
import { Input } from '../input';
import { Modal } from '../modal';
import { Pagination } from '../pagination';
import { unionBy } from 'lodash';

const ComboItem: FC<{ combo: Combo; onClickIcon: () => void }> = ({
  combo,
  onClickIcon,
}) => (
  <ComboPreview {...combo}>
    {(openDetails) => (
      <Button
        text={combo.name}
        usePaddingStyles={false}
        color="secondary"
        extraStyles="px-0 pl-2 overflow-hidden"
        textClassName="truncate text-elipsis max-w-[90%]"
        onClick={openDetails}
        rightIcon={
          <div
            onClick={(e) => {
              e.stopPropagation();
              onClickIcon();
            }}
            className="border-l-2 border-l-secondary hover:border-l-light px-2 flex-1 bg-light hover:bg-secondary text-secondary hover:text-light h-full flex items-center justify-center cursor-pointer"
          >
            <RxCross2 size={20} />
          </div>
        }
      />
    )}
  </ComboPreview>
);
export const SelectSearchCombo: FC<{
  selectedCombos?: Array<Combo>;
  label?: string;
  onFinish: (uniqueArray: Array<Combo>, selectedCombos: Array<Combo>) => void;
  onClickRemoveCombo?: (filteredArray: Array<Combo>, comboId: number) => void;
  renderAddIcon?: (triggerModalOpen: () => void) => ReactNode;
  containerClassName?: string;
}> = ({
  selectedCombos = [],
  onFinish,
  onClickRemoveCombo,
  label = 'Selected Combos:',
  renderAddIcon,
  containerClassName = 'flex flex-col w-full',
}) => {
  const [isOpen, { setTrue: openModal, setFalse: closeModal }] = useBoolean();
  const {
    data: combos,
    debouncedResetSearch,
    isFetching,
    onSelectPage,
    searchValue,
    setSearchValue,
  } = usePaginatedSearch<Combo>({
    queryKey: 'COMBO_SEARCH',
    enabled: isOpen,
    url: FGC_API_URLS.COMBOS,
  });
  const [selectedCombosList, setSelectedCombosList] = useState<Array<Combo>>(
    [],
  );
  const removeFromSelectedCombos = (comboId: number) => {
    setSelectedCombosList((past) => {
      return past.filter((combo) => combo.id !== comboId);
    });
  };
  return (
    <>
      <Modal title="Combos" width="xl" onClose={closeModal} isOpen={isOpen}>
        <div className="min-h-[500px]">
          <header>
            <Input
              label="Search"
              value={searchValue}
              setValue={setSearchValue}
              onChange={debouncedResetSearch}
              iconRight={<AiOutlineSearch size={23} className="text-primary" />}
            />
            {selectedCombosList.length > 0 && (
              <div className="flex flex-col mt-3">
                <label className="text-light font-lg">Selected Combos:</label>
                <div className="mt-3 flex flex-row flex-wrap gap-2">
                  {selectedCombosList.map((combo) => (
                    <ComboItem
                      key={combo.id}
                      combo={combo}
                      onClickIcon={() => removeFromSelectedCombos(combo.id)}
                    />
                  ))}
                </div>
              </div>
            )}
            {selectedCombosList.length > 0 && (
              <>
                <hr className="my-5" />
                <Button
                  color="secondary"
                  text="Submit"
                  onClick={() => {
                    const uniqArray = unionBy(
                      selectedCombosList,
                      selectedCombos,
                      'id',
                    );
                    onFinish(uniqArray, selectedCombosList);
                    setSelectedCombosList([]);
                    setSearchValue('');
                    closeModal();
                  }}
                />
              </>
            )}
          </header>
          <main className="w-full">
            <ComboListItems
              onClickComboItem={(combo) => {
                setSelectedCombosList((past) => {
                  if (past.some((pastCombo) => pastCombo.id === combo.id)) {
                    return past;
                  }
                  return [...past, combo] as Array<Combo>;
                });
              }}
              showComboOwner
              useComboItemHeader={false}
              isLoadingCombos={isFetching}
              items={combos?.data}
              className="mb-3"
            />
            {combos && (
              <Pagination
                showTotal
                pagination={combos}
                onSelectPage={onSelectPage}
              />
            )}
          </main>
        </div>
      </Modal>
      <div className={containerClassName}>
        <div
          className={`flex flex-row w-full gap-2 ${
            selectedCombos.length > 1 ? 'mb-3' : ''
          }`}
        >
          {label && <label className="text-light font-lg">{label}</label>}
          {renderAddIcon ? (
            renderAddIcon(openModal)
          ) : (
            <div className="w-[30px] h-[30px]">
              <IoMdAddCircle
                size={25}
                className="text-secondary hover:text-white cursor-pointer"
                onClick={openModal}
              />
            </div>
          )}
        </div>
        {selectedCombos.length > 1 ? (
          <div className="flex flex-row gap-2 flex-wrap">
            {selectedCombos.map((combo) => (
              <ComboItem
                key={combo.id}
                combo={combo}
                onClickIcon={() =>
                  onClickRemoveCombo?.(
                    selectedCombos.filter((item) => item.id !== combo.id),
                    combo.id,
                  )
                }
              />
            ))}
          </div>
        ) : null}
      </div>
    </>
  );
};
