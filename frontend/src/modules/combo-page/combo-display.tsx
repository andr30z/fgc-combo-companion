'use client';

import { ColorPicker } from '@/common/components/color-picker';
import { ComboTranslation } from '@/common/components/combo-translation';
import { GameTypes } from '@/common/types/game-types';
import { useState } from 'react';
interface ComboDisplayProps {
  game: GameTypes;
  combo: string;
}
export const ComboDisplay: React.FC<ComboDisplayProps> = ({ combo, game }) => {
  const [color, setColor] = useState('#da0037');
  return (
    <>
      <ComboTranslation
        className="justify-self-center my-5"
        game={game}
        combo={combo}
        style={{
          backgroundColor: color,
        }}
      />
      <p className="text-light text-center font-primary font-normal text-md">
        {combo}
      </p>
      <div className="w-full flex items-center justify-center">
        <ColorPicker
          title="Change Background color"
          color={color}
          setColor={setColor}
          buttonText="Change color"
        />
      </div>
    </>
  );
};
