import { Button, ButtonProps } from '@/common/components/button';
import type { FC } from 'react';
import { BiTransfer } from 'react-icons/bi';

type PresentationProps = Omit<ButtonProps, 'onClick'>;

export const PresentationButtons: FC<PresentationProps> = () => {
  return (
    <div className="z-10 flex items-center justify-center flex-wrap gap-3">
      <Button
        renderAsInnerLink
        href="/combo-translator"
        text="Translate Combos"
        extraStyles="flex-auto"
        rightIcon={<BiTransfer size={23} />}
      />
    </div>
  );
};
