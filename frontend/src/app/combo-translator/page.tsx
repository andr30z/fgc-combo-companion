'use client';
import { ComboTranslation } from '@/common/components/combo-translation';
import { Input } from '@/common/components/input';
import { GameTypes } from '@/common/types/game-types';
import Image from 'next/image';
import { useState } from 'react';

const Card: React.FC<{
  url: string;
  showSoonMessage?: boolean;
  selected?: boolean;
}> = ({ url, showSoonMessage = false, selected }) => {
  return (
    <div className="group/card-item relative">
      <Image
        alt="next step"
        className="rounded-lg"
        height={230}
        src={url}
        width={300}
      />
      {!selected && (
        <div className="group/card-item:hover:invisible absolute top-0 bg-primary h-full w-full opacity-30 rounded-lg" />
      )}
      {showSoonMessage && (
        <div className="absolute top-0 w-full h-full flex items-center justify-center">
          <h4 className="text-light  font-primary font-semibold text-sm sm:text-lg bg-dark p-1 rounded-lg opacity-60">
            SOON
          </h4>
        </div>
      )}
    </div>
  );
};

export default function ComboTranslator() {
  const [combo, setCombo] = useState(
    'f,n,d,df+2, f,n,d,df+2, f,n,d,df+2, B+2,1 S!, {DASH} f,n,d,df+4,1',
  );

  return (
    <div className="w-full h-full min-h-80vh flex flex-col items-center justify-center px-10 gap-24">
      <div className="flex flex-col text-light w-full">
        <label className="mb-4">
          <span className="px-4 py-2 font-semibold text-sm bg-secondary text-light rounded-full shadow-sm font-primary font-black">
            Select a game:
          </span>
        </label>
        <div className="flex flex-row gap-4 w-full">
          <Card url="/tekken7/tekken7-select.jpg" selected />
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
        label={<>Type your combo</>}
        placeholder="Type your combo..."
        height="min-h-[100px] h-[10vh]"
        width="w-full"
        className="text-xm md:text-xl font-semibold text-primary"
      />

      <ComboTranslation combo={combo} game={GameTypes.TEKKEN_7} />
    </div>
  );
}
