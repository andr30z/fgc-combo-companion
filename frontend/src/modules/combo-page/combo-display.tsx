'use client';

import { ColorPicker } from '@/common/components/color-picker';
import { ComboTranslation } from '@/common/components/combo-translation';
import { DownloadComponentImageButton } from '@/common/components/download-component-image-button';
import { GameTypes } from '@/common/types/game-types';
import { useRef, useState } from 'react';
interface ComboDisplayProps {
  game: GameTypes;
  combo: string;
}
export const ComboDisplay: React.FC<ComboDisplayProps> = ({ combo, game }) => {
  const [color, setColor] = useState('#da0037');
  const comboTranslatorRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <ComboTranslation
        ref={comboTranslatorRef}
        game={game}
        combo={combo}
        className="justify-center my-5"
        style={{
          backgroundColor: color,
        }}
      />
      <p className="text-light text-center font-primary font-normal text-md">
        {combo}
      </p>
      <div className="w-full flex items-center justify-center flex-row flex-wrap gap-2">
        <ColorPicker
          title="Change Background color"
          color={color}
          setColor={setColor}
          buttonText="Change color"
        />
        <DownloadComponentImageButton<HTMLDivElement>
          componentRef={comboTranslatorRef}
          title="Download Combo"
          text="Download Combo"
        />
      </div>
    </>
  );
};
