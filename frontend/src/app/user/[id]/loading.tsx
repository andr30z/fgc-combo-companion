import { Skeleton } from '@/common/components/skeleton';

export default function LoadingUser() {
  return (
    <div className="flex flex-col pt-10 h-80vh w-full layout-padding-x">
      <Skeleton className="w-5/12 h-[35px]" />
      <div className="w-full mt-20 h-full flex gap-3 flex-col">
        <Skeleton className="w-full h-[100px]" />
        <Skeleton className="w-full h-[100px]" />
        <Skeleton className="w-full h-[100px]" />
        <Skeleton className="w-full h-[100px]" />
      </div>
    </div>
  );
}
