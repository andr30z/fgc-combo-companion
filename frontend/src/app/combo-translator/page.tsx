'use client';
import { Input } from '@/common/components/Input';
import { useState } from 'react';

export default function ComboTranslator() {
  const [combo, setCombo] = useState('F*DF2, F*DF2, DASH, F*DF2, B2, 1, F*DF3');

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
    </div>
  );
}
