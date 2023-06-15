import { Skeleton } from '@/common/components/skeleton';

export default function Loading() {
  return (
    <div className="w-full h-full flex flex-col gap-2 layout-padding-x">
      <Skeleton
        rounded="lg"
        className="bg-light-active w-full h-[118px] mt-40"
      />
      <Skeleton rounded="lg" className="bg-light-active w-full h-[118px]" />
      <Skeleton rounded="lg" className="bg-light-active w-full h-[118px]" />
      <Skeleton rounded="lg" className="bg-light-active w-full h-[118px]" />
      <Skeleton rounded="lg" className="bg-light-active w-full h-[118px]" />
      <Skeleton rounded="lg" className="bg-light-active w-full h-[118px]" />
    </div>
  );
}
