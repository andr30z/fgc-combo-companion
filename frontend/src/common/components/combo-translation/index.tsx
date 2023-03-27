import { useComboTranslator } from '@/common/hooks/combo-translator';
import { GameTypes } from '@/common/types/combo';
import { FC } from 'react';
interface ComboTranslationProps {
  game: GameTypes;
  combo: string;
}

export const ComboTranslation: FC<ComboTranslationProps> = ({
  combo,
  game,
}) => {
  const result = useComboTranslator({ combo, game });
  return <div className='text-light'>{result}</div>;
};
