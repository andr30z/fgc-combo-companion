'use client';
import { GameTypes } from '@/common/types/game-types';
import Image from 'next/image';
import type { FC } from 'react';

type OnSelectFunction = (option: GameTypes) => void;

const Option: FC<{
  url: string;
  showSoonMessage?: boolean;
  option: GameTypes;
  onSelect: OnSelectFunction;
  selectedOption?: GameTypes;
}> = ({ url, showSoonMessage = false, option, onSelect, selectedOption }) => {
  const selected = selectedOption === option;
  return (
    <div
      className={`min-h-[180px] min-w-[280px] group overflow-hidden cursor-pointer relative rounded-lg border-4 solid  ${
        selected ? 'border-primary' : 'border-transparent'
      }`}
      onClick={() => (showSoonMessage ? null : onSelect(option))}
    >
      <Image
        alt="Fighting game image"
        className="h-full w-full scale-100 group-hover:scale-110 ease-in duration-500"
        height={230}
        width={300}
        src={url}
      />
      {!selected && (
        <div className="absolute top-0 bg-primary h-full w-full opacity-30" />
      )}
      {showSoonMessage && (
        <div className="absolute top-0 w-full h-full flex items-center justify-center">
          <h4 className="text-light font-primary font-semibold text-sm sm:text-lg bg-dark p-1 rounded-lg opacity-60 select-none">
            SOON
          </h4>
        </div>
      )}
    </div>
  );
};

export const GameSelect: FC<{
  selectedOption: GameTypes;
  onSelect: OnSelectFunction;
}> = (props) => {
  const { onSelect, selectedOption } = props;
  return (
    <div className="flex flex-col text-light w-full">
      <label className="my-4">
        <span className="px-4 py-2 text-sm bg-secondary text-light rounded-full shadow-sm font-primary font-black">
          Select a game:
        </span>
      </label>
      <div className="flex flex-row gap-4 pr-16 w-full overflow-x-auto overflow-y-hidden no-scrollbar relative">
        <Option
          option={GameTypes.TEKKEN_7}
          selectedOption={selectedOption}
          onSelect={onSelect}
          url="/tekken7/tekken7-select.webp"
        />
        <Option
          selectedOption={selectedOption}
          option={GameTypes.STREET_FIGHTER_6}
          onSelect={onSelect}
          url="/street-fighter-6/street-fighter-6-select.jpg"
        />
        <Option
          selectedOption={selectedOption}
          option={GameTypes.GUILTY_GEAR_STRIVE}
          onSelect={onSelect}
          url="/guilty-gear-strive/guilty-gear-strive-select.jpg"
        />
        <Option
          selectedOption={selectedOption}
          option={GameTypes.DB_FIGHTERZ}
          onSelect={onSelect}
          url="/dragon-ball-fighterz/db-fighterz-select.png"
          showSoonMessage
        />
        <div
          style={{ boxShadow: '50px 0px 30px 40px #000' }}
          className="min-h-full min-w-[.01px] xl:hidden  sticky right-0"
        />
      </div>
    </div>
  );
};
