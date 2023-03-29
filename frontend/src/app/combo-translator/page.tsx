'use client';
import { ComboTranslation } from '@/common/components/combo-translation';
import { Input } from '@/common/components/input';
import { GameTypes } from '@/common/types/game-types';
import Image from 'next/image';
import { useState } from 'react';

const Card: React.FC<{ url: string; showSoonMessage?: boolean }> = ({
  url,
  showSoonMessage = false,
}) => {
  return (
    <div className="group/card-item relative ">
      <Image
        alt="next step"
        width={300}
        height={230}
        src={url}
        className="rounded-lg"
      />
      <div className="group/card-item:hover:invisible absolute top-0 bg-primary h-full w-full opacity-30 rounded-lg" />
      {showSoonMessage && (
        <div className="absolute top-0 w-full h-full flex items-center justify-center">
          <h4 className="text-light text-lg font-primary font-semibold bg-dark p-1 rounded-lg opacity-60">
            SOON
          </h4>
        </div>
      )}
    </div>
  );
};

export default function ComboTranslator() {
  const [combo, setCombo] = useState(
    'f,n,d,df+2, f,n,d,df+2, f,n,d,df+2, B+2,1 S!, {DASH} f,n,d,df+3',
  );

  return (
    <div className="w-full h-full min-h-80vh flex flex-col items-center justify-center px-10">
      <div className="flex flex-col mb-10 text-light w-full">
        <label className="mb-4">
          <span className="px-4 py-2 font-semibold text-sm bg-secondary text-light rounded-full shadow-sm font-primary font-black">
            Select a game:
          </span>
        </label>
        <div className="flex flex-row gap-4 w-full">
          <Card url="/tekken7/tekken7-select.jpg" />
          <Card
            url="/guilty-gear-strive/guilty-gear-strive-select.jpg"
            showSoonMessage
          />
          <Card
            url="/street-fighter-5/street-fighter-5-select.jpg"
            showSoonMessage
          />
        </div>
      </div>

      <Input
        value={combo}
        setValue={setCombo}
        placeholder="Type your combo..."
        height="h-[55px]"
        width="w-full"
        className="sm:text-[1.2rem] font-bold text-primary"
        containerClassName="mb-10"
      />

      <ComboTranslation combo={combo} game={GameTypes.TEKKEN_7} />
    </div>
  );
}
