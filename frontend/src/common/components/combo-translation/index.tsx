'use - client';
import { useComboTranslator } from '@/common/hooks/combo-translator';
import { GameTypes } from '@/common/types/game-types';
import { FC, Fragment } from 'react';
interface ComboTranslationProps {
  game: GameTypes;
  combo: string;
}

export const ComboTranslation: FC<ComboTranslationProps> = ({
  combo,
  game,
}) => {
  const result = useComboTranslator({ combo, game });
  console.log(result);
  return (
    <div className="text-light">
      {result.actions.map((action, index) => (
        <Fragment key={index.toString()}>
          {action.map((step, idx) => {
            console.log(step.action, step.action.trim().length === 0);
            if (step.action.trim().length === 0) {
              return null;
            }
            return (
              <span key={step.action + idx.toString()}>{step.action} </span>
            );
          })}
          {', '}
        </Fragment>
      ))}
    </div>
  );
};
