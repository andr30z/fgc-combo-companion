'use client';
import * as Portal from '@radix-ui/react-portal';
import Image from 'next/image';
import { FC, useEffect } from 'react';
interface LoadingBackdropProps {
  isLoading: boolean;
}

export const LoadingBackdrop: FC<LoadingBackdropProps> = ({ isLoading }) => {
  useEffect(() => {
    if (!isLoading) {
      return;
    }
    document.body.classList.add('overflow-hidden');
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isLoading]);
  return isLoading ? (
    <Portal.Root>
      <div className="absolute top-0 left-0 w-full h-full flex items-end justify-end z-50 bg-dark bg-opacity-50 p-10">
        <span className="animate-pulse bg-light rounded-full h-10 w-[140px] flex justify-center items-center gap-1">
          <Image
            priority
            alt="FGC Combo"
            src="/combo-fist.svg"
            height={20}
            width={20}
          />
          <span className="text-primary text-lg font-semibold">Loading...</span>
        </span>
      </div>
    </Portal.Root>
  ) : null;
};
