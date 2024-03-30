'use client';
import * as Popover from '@radix-ui/react-popover';
import type { FC, ReactNode } from 'react';
type Props = {
  children?: ReactNode;
  trigger?: ReactNode;
} & Partial<Popover.PopoverProps>;
export const PopOver: FC<Props> = ({ children, trigger, ...rest }) => {
  return (
    <Popover.Root {...rest}>
      <Popover.Trigger asChild>{trigger}</Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className="rounded p-5 w-[300px] bg-light shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(primary)] will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade"
          sideOffset={5}
        >
          {children}
          <Popover.Close
            className="rounded-full h-[30px] w-[30px] inline-flex items-center justify-center absolute top-[5px] right-[5px] hover:bg-secondary hover:text-light focus:primary outline-none cursor-default"
            aria-label="Close"
          >
            X
          </Popover.Close>
          <Popover.Arrow className="fill-white" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};
