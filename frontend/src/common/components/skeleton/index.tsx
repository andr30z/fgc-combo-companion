import { FC } from 'react';

export interface SkeletonProps {
  className?: string;
  rounded?: 'full' | '2xl' | 'xl' | 'lg' | 'md' | 'sm';
}
export const Skeleton: FC<SkeletonProps> = ({ className, rounded }) => {
  return (
    <div
      className={`animate-pulse ${
        rounded ? 'rounded-' + rounded : ''
      }  ${className}`}
    />
  );
};
