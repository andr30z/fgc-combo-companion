import { FC } from 'react';

export interface SkeletonProps {
  className?: string;
  rounded?: 'full' | '2xl' | 'xl' | 'lg' | 'md' | 'sm';
  backgroundColor?: string;
}
export const Skeleton: FC<SkeletonProps> = ({
  className,
  rounded = 'lg',
  backgroundColor = 'bg-light-active',
}) => {
  return (
    <div
      className={`animate-pulse ${
        rounded ? 'rounded-' + rounded : ''
      }  ${className} ${backgroundColor}`}
    />
  );
};
