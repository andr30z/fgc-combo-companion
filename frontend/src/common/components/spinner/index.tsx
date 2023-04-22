import type { FC } from 'react';

export const Spinner: FC<{ color: 'primary' | 'secondary' | 'light' }> = ({
  color,
}) => {
  return (
    <div
      className={`inline-block h-14 w-14 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-${color} motion-reduce:animate-[spin_1.5s_linear_infinite]`}
      role="status"
    >
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
        Loading...
      </span>
    </div>
  );
};
