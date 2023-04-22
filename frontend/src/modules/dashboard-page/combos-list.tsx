'use client';
import { Button } from '@/common/components/button';
import { ComboForm } from '@/common/components/combo-form';
import { ComboTranslation } from '@/common/components/combo-translation';
import { ConfirmAction } from '@/common/components/confirm-action-modal';
import { Input } from '@/common/components/input';
import { ListItems } from '@/common/components/list-items';
import { LoadingBackdrop } from '@/common/components/loading-backdrop';
import { Modal } from '@/common/components/modal';
import { Pagination } from '@/common/components/pagination';
import { useApiQuery } from '@/common/hooks/api-query';
import { useBoolean } from '@/common/hooks/boolean';
import { useDebounce } from '@/common/hooks/debounce';
import { useUser } from '@/common/hooks/user';
import { FGC_API_URLS, fgcApi } from '@/common/services/fgc-api';
import type { Combo } from '@/common/types/combo';
import type { FGCApiPaginationResponse } from '@/common/types/fgc-api-pagination-response';
import { COMBO_TYPES } from '@/common/types/game-types';
import { promiseResultWithError } from '@/common/utils/Promises';
import Image from 'next/image';
import { FC, useState } from 'react';
import { flushSync } from 'react-dom';
import { toast } from 'react-hot-toast';
import {
  AiFillDelete,
  AiFillEdit,
  AiOutlinePlus,
  AiOutlineSearch,
} from 'react-icons/ai';
import { FaChevronCircleDown, FaChevronCircleUp } from 'react-icons/fa';
interface ComboListInterface {
  initialComboData?: FGCApiPaginationResponse<Combo> | null;
}

export const CombosList: FC<ComboListInterface> = ({ initialComboData }) => {
  const [isComboFormOpen, { setTrue: openForm, setFalse: closeForm }] =
    useBoolean();
  const [isLoading, { setFalse: endLoading, setTrue: startLoading }] =
    useBoolean();
  const [selectedItem, setSelectedItem] = useState<Combo>();
  const [page, setPage] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const showComboDetailsLocalStorage = localStorage.getItem(
    'COMBO_LIST_DETAILS_OPEN',
  );
  const [isComboDetailsOpen, { toggle: toggleComboDetails }] = useBoolean(
    showComboDetailsLocalStorage
      ? showComboDetailsLocalStorage === 'true'
      : true,
  );
  const { user } = useUser();
  const {
    refetch,
    data: combosData,
    isFetching: isLoadingCombos,
  } = useApiQuery<FGCApiPaginationResponse<Combo>>({
    apiConfig: {
      url: FGC_API_URLS.MY_COMBOS,
      params: {
        name: encodeURIComponent(searchValue),
        sort: 'id,desc',
        size: '30',
        page: page.toString(),
      },
    },
    initialData: initialComboData ?? undefined,
    key: ['combos', user?.id],
  });

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
    refetch();
  };

  const debouncedRefetch = useDebounce(() => {
    flushSync(() => {
      setPage(0);
    });
    refetch();
  });
  return (
    <div className="flex flex-col flex-1 w-full h-full mt-6">
      <LoadingBackdrop isLoading={isLoading} />
      <header className="border-2 border-secondary-dark bg-dark p-3 mb-12 w-full flex flex-col sm:flex-row flex-wrap items-center justify-between gap-2">
        <h5 className="text-2xl text-light font-primary font-bold">
          Your Combos
        </h5>
        <div className="flex flex-row flex-wrap justify-center gap-2">
          <Input
            iconLeft={<AiOutlineSearch size={23} className="text-primary" />}
            placeholder="Search for a combo"
            height="h-[40px]"
            width="w-[300px]"
            className=""
            value={searchValue}
            setValue={setSearchValue}
            onChange={debouncedRefetch}
          />
          <Button
            onClick={openForm}
            color="primary"
            rightIcon={<AiOutlinePlus size={22} />}
          />
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
                refetch();
              }}
              initialValues={selectedItem}
            />
          </Modal>
        </div>
      </header>
      <ListItems
        columns={[
          {
            label: 'Name',
            name: 'name',
            size: 'w-[20%] sm:max-w-[20%]',
          },
          {
            label: 'Game',
            name: 'game',
            size: 'w-[15%] sm:max-w-[15%]',
            renderColumnValue(item) {
              return COMBO_TYPES[item.game];
            },
          },
          {
            label: 'Description',
            name: 'description',
            size: 'w-[20%] sm:max-w-[20%]',
          },
          {
            label: 'Created At',
            name: 'createdAt',
            size: 'w-[25%] sm:max-w-[25%]',
            format: 'date',
          },
          {
            label: (
              <Button
                onClick={() => {
                  toggleComboDetails();
                  localStorage.setItem(
                    'COMBO_LIST_DETAILS_OPEN',
                    `${!isComboDetailsOpen}`,
                  );
                }}
                color="dark"
                extraStyles="px-[6px] py-[6px] rounded-md"
                rightIcon={
                  isComboDetailsOpen ? (
                    <FaChevronCircleUp size={20} />
                  ) : (
                    <FaChevronCircleDown size={20} />
                  )
                }
              />
            ),
            name: '',
            size: 'w-[20%] sm:max-w-[20%]',
            renderColumnValue(item) {
              return (
                <div className="flex-row flex gap-2 w-full">
                  <Button
                    onClick={() => {
                      setSelectedItem(item);
                      openForm();
                    }}
                    color="dark"
                    extraStyles="px-2 py-2"
                    rightIcon={<AiFillEdit size={22} />}
                  />
                  <ConfirmAction
                    onConfirm={deleteCombo(item.id)}
                    confirmationText="Are you sure you want to delete this combo?"
                  >
                    {({ openConfirmModal }) => (
                      <Button
                        onClick={openConfirmModal}
                        color="primary"
                        extraStyles="px-2 py-2"
                        rightIcon={<AiFillDelete size={22} />}
                      />
                    )}
                  </ConfirmAction>
                </div>
              );
            },
          },
        ]}
        rowFatherComponent={({ item, children }) => (
          <>
            {children}
            {isComboDetailsOpen ? (
              <div className="px-10 my-5 w-full">
                <ComboTranslation game={item.game} combo={item.combo} />
              </div>
            ) : null}
          </>
        )}
        emptyListComponent={
          <div className="flex flex-col flex-1 justify-center items-center min-h-[500px] text-center gap-4">
            <h1 className="text-light font-bold text-5xl">
              {searchValue.trim().length > 0 && !isLoadingCombos
                ? 'No combos found for search term: "' + searchValue + '"'
                : "You don't have any combos yet."}
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
        items={combosData?.data}
        isLoadingData={isLoadingCombos}
      />

      {combosData ? (
        <div className="mt-5 w-full">
          <Pagination
            pagination={combosData}
            onSelectPage={(page) => {
              flushSync(() => {
                setPage(page);
              });
              refetch();
            }}
          />
        </div>
      ) : null}
    </div>
  );
};
