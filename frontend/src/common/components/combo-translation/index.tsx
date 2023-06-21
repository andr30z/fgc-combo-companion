'use client';
import { useComboTranslator } from '@/common/hooks/combo-translator';
import { ComboTranslationInterface } from '@/common/types/combo-translation';
import { GameTypes } from '@/common/types/game-types';
import Image from 'next/image';
import { FC, Fragment } from 'react';
interface ComboTranslationProps {
  game: GameTypes;
  combo: string;
  className?: string;
  rendeHeader?: (result: ComboTranslationInterface) => React.ReactNode;
  backgroundColor?:
    | 'primary'
    | 'secondary'
    | 'dark'
    | 'secondary-dark'
    | 'light-active';
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export const ComboTranslation: FC<ComboTranslationProps> = ({
  combo,
  game,
  className = '',
  rendeHeader,
  backgroundColor = 'secondary',
  onClick,
}) => {
  const result = useComboTranslator({ combo, game });
  if (!result.combo) {
    return null;
  }

  const nonTranslatedComboColors = {
    primary: 'text-light bg-dark',
    secondary: 'text-light bg-dark',
    dark: 'text-light bg-primary',
    'secondary-dark': 'text-light bg-primary',
    'light-active': 'text-light bg-light-active',
  };

  return (
    <div
      title={result.combo}
      data-testid={result.combo}
      className={`text-light rounded p-3 bg-${backgroundColor} flex items-center flex-row flex-wrap gap-1 ${className}`}
      onClick={onClick}
    >
      {rendeHeader && rendeHeader(result)}
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
              const stepArray = Array.isArray(step.imagePath)
                ? step.imagePath
                : [step.imagePath];
              return stepArray.map((imagePath, idx) => (
                <Image
                  key={imagePath + step.action + idx.toString()}
                  src={imagePath}
                  alt={step.action}
                  title={step.action}
                  width={step.width ?? 40}
                  height={step.height ?? 50}
                  className="m-[1px]"
                />
              ));
            }
            return (
              <span
                data-testid={'combo-action-' + step.action}
                key={step.action + idx.toString()}
                title={step.actionTitle}
                className={`${
                  nonTranslatedComboColors[backgroundColor]
                } px-[5px] mx-[3px] ${step.style ?? 'text-xl font-semibold'}`}
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
