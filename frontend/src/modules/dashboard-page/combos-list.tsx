'use client';
import { Button } from '@/common/components/button';
import { ComboForm } from '@/common/components/combo-form';
import { ComboListItems } from '@/common/components/combo-list-items';
import { Input } from '@/common/components/input';
import { Modal } from '@/common/components/modal';
import { Pagination } from '@/common/components/pagination';
import { useApiQuery } from '@/common/hooks/api-query';
import { useBoolean } from '@/common/hooks/boolean';
import { useDebounce } from '@/common/hooks/debounce';
import { useUser } from '@/common/hooks/user';
import { FGC_API_URLS } from '@/common/services/fgc-api';
import type { Combo } from '@/common/types/combo';
import type { FGCApiPaginationResponse } from '@/common/types/fgc-api-pagination-response';
import { FC, useState } from 'react';
import { flushSync } from 'react-dom';
import { AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai';
interface ComboListInterface {
  initialComboData?: FGCApiPaginationResponse<Combo> | null;
}

export const CombosList: FC<ComboListInterface> = ({ initialComboData }) => {
  const [isComboFormOpen, { setTrue: openForm, setFalse: closeForm }] =
    useBoolean();

  const [page, setPage] = useState(0);
  const [selectedItem, setSelectedItem] = useState<Combo>();
  const [searchValue, setSearchValue] = useState('');

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
        page: page.toString(),
      },
    },
    initialData: initialComboData ?? undefined,
    key: ['combos', user?.id],
  });

  const debouncedRefetch = useDebounce(() => {
    flushSync(() => {
      setPage(0);
    });
    refetch();
  });
  return (
    <div className="flex flex-col flex-1 w-full h-full mt-6">
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
            width="xl"
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
      <ComboListItems
        isLoadingCombos={isLoadingCombos}
        items={combosData?.data ?? []}
        onSuccessDeleteCombo={refetch}
        onSuccessSaveComboForm={refetch}
        emptyListMessage={
          searchValue.trim().length > 0 && !isLoadingCombos
            ? 'No combos found for search term: "' + searchValue + '"'
            : "You don't have any combos yet."
        }
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
