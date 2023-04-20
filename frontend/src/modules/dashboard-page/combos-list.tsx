'use client';
import { Button } from '@/common/components/button';
import { ComboForm } from '@/common/components/combo-form';
import { Input } from '@/common/components/input';
import { ListItems } from '@/common/components/list-items';
import { Modal } from '@/common/components/modal';
import { useApiQuery } from '@/common/hooks/api-query';
import { useBoolean } from '@/common/hooks/boolean';
import { useDebounce } from '@/common/hooks/debounce';
import { useUser } from '@/common/hooks/user';
import { FGC_API_URLS } from '@/common/services/fgc-api';
import type { Combo } from '@/common/types/combo';
import type { FGCApiPaginationResponse } from '@/common/types/fgc-api-pagination-response';
import Image from 'next/image';
import { FC, useState } from 'react';
import { AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai';
interface ComboListInterface {
  initialComboData?: FGCApiPaginationResponse<Combo> | null;
}

export const CombosList: FC<ComboListInterface> = ({ initialComboData }) => {
  const [isComboFormOpen, { setTrue: openForm, setFalse: closeForm }] =
    useBoolean();
  const [searchValue, setSearchValue] = useState('');
  const { user } = useUser();
  const { refetch, data: combosData } = useApiQuery<
    FGCApiPaginationResponse<Combo>
  >({
    apiConfig: {
      url: FGC_API_URLS.MY_COMBOS,
      params: {
        name: encodeURIComponent(searchValue),
        sort: 'id,desc',
      },
    },
    initialData: initialComboData ?? undefined,
    key: ['combos', user?.id],
  });

  const debouncedRefetch = useDebounce(refetch);
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
            onChange={() => debouncedRefetch()}
          />
          <Button
            onClick={openForm}
            color="primary"
            rightIcon={<AiOutlinePlus size={22} />}
          />
          <Modal
            title="Combo Form"
            isOpen={isComboFormOpen}
            onClose={closeForm}
            width="lg"
          >
            <ComboForm
              onSuccess={() => {
                closeForm();
                refetch();
              }}
            />
          </Modal>
        </div>
      </header>
      <ListItems
        columns={[
          {
            label: 'Name',
            name: 'name',
            size: 'w-[20%]',
          },
          {
            label: 'Game',
            name: 'game',
            size: 'w-[20%]',
          },
          {
            label: 'Description',
            name: 'description',
            size: 'w-[20%]',
          },
          {
            label: 'Created At',
            name: 'createdAt',
            size: 'w-[20%]',
            format: 'date',
          },
          {
            label: '',
            name: '',
            size: 'w-[20%]',
          },
        ]}
        emptyListComponent={
          <div className="flex flex-col flex-1 justify-center items-center min-h-[500px] text-center gap-4">
            <h1 className="text-light font-bold text-5xl">
              {searchValue.trim().length > 0
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
      />
    </div>
  );
};
