import { Button, ButtonProps } from '@/common/components/button';
import Image from 'next/image';
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
      <Button
        renderAsInnerLink
        href="/dashboard/combos"
        text="Create Combos"
        color="light"
        useHoverStyles={false}
        extraStyles="group/combo flex-auto"
        rightIcon={
          <Image
            priority
            className="group-hover/combo:scale-125 group-hover/combo:transition-all group-hover/combo:duration-300 group-hover/combo:ease-in-out"
            alt="FGC Combo"
            src="/combo-fist.svg"
            height={23}
            width={23}
          />
        }
      />
    </div>
  );
};
