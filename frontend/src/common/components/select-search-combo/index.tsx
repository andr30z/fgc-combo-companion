'use client';

import { useBoolean } from '@/common/hooks/boolean';
import { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { IoMdAddCircle } from 'react-icons/io';
import { Input } from '../input';
import { Modal } from '../modal';

export const SelectSearchCombo = () => {
  const [isOpen, { setTrue: openModal, setFalse: closeModal }] = useBoolean();
  const [searchValue, setSearchValue] = useState('');
  return (
    <>
      <Modal title="Combos" onClose={closeModal} isOpen={isOpen}>
        <header>
          <Input
            label="Search"
            value={searchValue}
            setValue={setSearchValue}
            iconLeft={<AiOutlineSearch size={23} className="text-primary" />}
          />
        </header>
      </Modal>
      <div className="flex flex-row gap-2">
        <label className="font-light font-lg"></label>
        <div className="w-[30px] h-[30px]">
          <IoMdAddCircle
            size={15}
            className="text-primary cursor-pointer"
            onClick={openModal}
          />
        </div>
      </div>
    </>
  );
};
