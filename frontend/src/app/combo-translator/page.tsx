'use client';
import { ComboTranslation } from '@/common/components/combo-translation';
import { Input } from '@/common/components/input';
import { GameTypes } from '@/common/types/game-types';
import { useState } from 'react';

export default function ComboTranslator() {
  const [combo, setCombo] = useState(
    'f,n,d,df+2, f,n,d,df+2, f,n,d,df+2, S! B+2,1, {DASH} f,n,d,df+3',
  );

  return (
    <div className="w-full h-full min-h-80vh flex flex-col items-center justify-center px-10">
      <Input
        value={combo}
        setValue={setCombo}
        placeholder="Type your combo..."
        height="h-[55px]"
        width="w-full"
        className="text-xl sm:text-2xl font-bold text-primary"
      />

      <ComboTranslation combo={combo} game={GameTypes.TEKKEN_7} />
    </div>
  );
}
