import { Skeleton } from '@/common/components/skeleton';

export const LoadingSearchSkeleton = () => {
  return (
    <>
      <div className="w-full flex flex-col md:flex-row gap-4 layout-padding-x mt-10 mb-2">
        <div className="flex-1 flex flex-col gap-2">
          <Skeleton className="w-full h-[60px] p-4" />
          <Skeleton className="w-full h-[60px] p-4" />
          <Skeleton className="w-full h-[60px] p-4" />
        </div>
        <div className="flex-1 flex flex-col gap-2">
          <Skeleton className="w-full h-[60px] p-5" />
          <Skeleton className="w-full h-[60px] p-5" />
          <Skeleton className="w-full h-[60px] p-5" />
        </div>
      </div>
      <div className="layout-padding-x flex flex-col gap-2 mt-5">
        <Skeleton className="w-full h-[110px]" />
        <Skeleton className="w-full h-[110px]" />
        <Skeleton className="w-full h-[110px]" />
      </div>
    </>
  );
};
