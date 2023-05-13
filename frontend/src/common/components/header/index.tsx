'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { AppLogo } from '../app-logo';

export const Header = () => {
  const router = useRouter();

  const onClickLogo = () => {
    router.push('/');
  };
  return (
    <header className="layout-padding-x py-5 bg-dark w-full flex justify-center items-center h-10vh">
      <Image
        priority
        src="/full-logo.svg"
        height={200}
        width={200}
        alt="FGC Combo Companion logo"
        onClick={onClickLogo}
        className="hidden sm:block cursor-pointer"
      />
      <AppLogo
        extraStyles="inline-flex sm:hidden cursor-pointer"
        onClick={onClickLogo}
      />
    </header>
  );
};
