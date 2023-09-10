'use client';
import { useComboTranslator } from '@/common/hooks/combo-translator';
import { ComboTranslationInterface } from '@/common/types/combo-translation';
import { GameTypes } from '@/common/types/game-types';
import Image from 'next/image';
import { forwardRef, Fragment, useId } from 'react';
export interface ComboTranslationProps {
  game: GameTypes;
  combo: string;
  className?: string;
  backgroundColor?:
    | null
    | 'primary'
    | 'secondary'
    | 'dark'
    | 'secondary-dark'
    | 'light-active';
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  htmlProps?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >;
  style?: React.CSSProperties;
  rendeHeader?: (
    comboTranslationResult: ComboTranslationInterface,
  ) => React.ReactNode;
  renderFooter?: (
    comboTranslationResult: ComboTranslationInterface,
  ) => React.ReactNode;
}

export const ComboTranslation = forwardRef<
  HTMLDivElement,
  ComboTranslationProps
>(
  (
    {
      combo,
      game,
      className = '',
      rendeHeader,
      renderFooter,
      backgroundColor = 'secondary',
      onClick,
      htmlProps,
      style,
    },
    ref,
  ) => {
    const result = useComboTranslator({ combo, game });
    const componentId = useId();

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
        ref={ref}
        title={result.combo}
        data-testid={result.combo}
        className={`text-light rounded p-3 ${
          backgroundColor ? 'bg-' + backgroundColor : ''
        }  flex items-center flex-row flex-wrap gap-1 ${className}`}
        onClick={onClick}
        style={style}
        {...htmlProps}
      >
        {rendeHeader && rendeHeader(result)}
        {result.actions.map((action, index) => (
          <Fragment key={index.toString()}>
            {action.map((step, idx) => {
              if (step.action.trim().length === 0) {
                return (
                  <Image
                    key={step.action + idx.toString() + componentId}
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
                    key={imagePath + step.action + idx.toString() + componentId}
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
                  key={step.action + idx.toString() + componentId}
                  title={step.actionTitle}
                  className={`${
                    backgroundColor
                      ? nonTranslatedComboColors[backgroundColor]
                      : nonTranslatedComboColors.primary
                  } px-[5px] mx-[3px] ${step.style ?? 'text-xl font-semibold'}`}
                >
                  {step.action}{' '}
                </span>
              );
            })}
          </Fragment>
        ))}
        {renderFooter && renderFooter(result)}
      </div>
    );
  },
);
