'use - client';
import { useComboTranslator } from '@/common/hooks/combo-translator';
import { GameTypes } from '@/common/types/game-types';
import Image from 'next/image';
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
  if (!result.combo) return null;
  return (
    <div className="text-light rounded p-3 bg-secondary w-100 flex items-center flex-row flex-wrap">
      {result.actions.map((action, index) => (
        <Fragment key={index.toString()}>
          {action.map((step, idx) => {
            if (step.action.trim().length === 0) {
              return (
                <Image
                  key={step.action + idx.toString()}
                  alt="next step"
                  width={10}
                  height={20}
                  src={'/special/green-triangle-right.svg'}
                  className="mx-2"
                />
              );
            }

            if (step.imagePath) {
              return (
                <Image
                  key={step.action + idx.toString()}
                  src={step.imagePath}
                  alt={step.action}
                  width={step.width ?? 40}
                  height={step.height ?? 50}
                  className="m-[1px]"
                />
              );
            }
            return (
              <span
                className="bg-dark px-[5px] mx-[3px] text-xl font-semibold"
                key={step.action + idx.toString()}
              >
                {step.action}{' '}
              </span>
            );
          })}
        </Fragment>
      ))}
    </div>
  );
};
