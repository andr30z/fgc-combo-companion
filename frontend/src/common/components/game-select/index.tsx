'use client';
import { GameTypes } from '@/common/types/game-types';
import Image from 'next/image';
import type { FC } from 'react';

type OnSelectFunction = (option: GameTypes) => void;

const Option: FC<{
  imageSource: string;
  showSoonMessage?: boolean;
  option: GameTypes;
  onSelect: OnSelectFunction;
  selectedOption?: GameTypes;
}> = ({
  imageSource,
  showSoonMessage = false,
  option,
  onSelect,
  selectedOption,
}) => {
  const selected = selectedOption === option;
  return (
    <div
      className={`min-h-[180px] min-w-[300px] group overflow-hidden cursor-pointer relative rounded-lg border-4 solid  ${
        selected ? 'border-primary' : 'border-transparent'
      }`}
      onClick={() => (showSoonMessage ? null : onSelect(option))}
    >
      <Image
        alt="Fighting game image"
        className="scale-100 group-hover:scale-110 ease-in duration-500 min-h-[180px] min-w-[300px]"
        height="180"
        width="300"
        src={imageSource}
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
  alwaysShowScroll?: boolean;
}> = (props) => {
  const { onSelect, selectedOption, alwaysShowScroll = true } = props;
  return (
    <div className="flex flex-col text-light w-full">
      <label className="my-4">
        <span className="px-4 py-2 text-sm bg-secondary text-light rounded-full shadow-sm font-primary font-black">
          Select a game:
        </span>
      </label>
      <div
        className={`flex flex-row gap-3 pr-16 w-full ${
          alwaysShowScroll ? 'py-3 scroll-bar-sm' : 'no-scrollbar'
        } overflow-y-hidden relative overflow-x-auto`}
      >
        <Option
          selectedOption={selectedOption}
          option={GameTypes.TEKKEN_8}
          onSelect={onSelect}
          imageSource="/tekken/tekken8/tekken8-select.png"
        />
        <Option
          selectedOption={selectedOption}
          option={GameTypes.STREET_FIGHTER_6}
          onSelect={onSelect}
          imageSource="/street-fighter-6/street-fighter-6-select.jpg"
        />
        <Option
          selectedOption={selectedOption}
          option={GameTypes.GUILTY_GEAR_STRIVE}
          onSelect={onSelect}
          imageSource="/guilty-gear-strive/guilty-gear-strive-select.jpg"
        />
        <Option
          selectedOption={selectedOption}
          option={GameTypes.DB_FIGHTERZ}
          onSelect={onSelect}
          imageSource="/dragon-ball-fighterz/dragon-ball-fighterz-select.webp"
        />
        <Option
          option={GameTypes.TEKKEN_7}
          selectedOption={selectedOption}
          onSelect={onSelect}
          imageSource="/tekken/tekken7/tekken7-select.webp"
        />
        <Option
          option={GameTypes.TWOXKO}
          showSoonMessage
          selectedOption={selectedOption}
          onSelect={() => null}
          imageSource="/2xko/2xko-select.jpg"
        />
        <div
          style={{ boxShadow: '50px 0px 30px 40px #000' }}
          className={`min-h-full min-w-[.01px] ${
            alwaysShowScroll ? '' : 'xl:hidden'
          }  sticky right-0`}
        />
      </div>
    </div>
  );
};
