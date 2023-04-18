'use client';
import { Button } from '@/common/components/button';
import { ComboForm } from '@/common/components/combo-form';
import { Input } from '@/common/components/input';
import { Modal } from '@/common/components/modal';
import { useApiQuery } from '@/common/hooks/api-query';
import { useBoolean } from '@/common/hooks/boolean';
import { useDebounce } from '@/common/hooks/debounce';
import { useUser } from '@/common/hooks/user';
import { FGC_API_URLS } from '@/common/services/fgc-api';
import type { Combo } from '@/common/types/combo';
import type { FGCApiPaginationResponse } from '@/common/types/fgc-api-pagination-response';
import Image from 'next/image';
import { useState } from 'react';
import { AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai';

export const CombosList = () => {
  const [isComboFormOpen, { setTrue: openForm, setFalse: closeForm }] =
    useBoolean();
  const [searchValue, setSearchValue] = useState('');
  const { user } = useUser();
  const { refetch } = useApiQuery<FGCApiPaginationResponse<Combo>>({
    apiConfig: {
      url: FGC_API_URLS.COMBOS,
      params: {
        name: encodeURIComponent(searchValue),
      },
    },
    key: ['combos', user?.id],
  });

  const debouncedRefetch = useDebounce(refetch);
  return (
    <div className="flex flex-col flex-1 w-full h-full mt-6">
      <header className="w-full flex flex-row flex-wrap items-center justify-end gap-2">
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
      </header>
      <div className="flex flex-col flex-1 justify-center items-center min-h-[500px] text-center gap-4">
        <h1 className="text-light font-bold text-5xl">
          You {"don't"} have any combos yet.
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
    </div>
  );
};
