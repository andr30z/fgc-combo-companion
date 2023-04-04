import Image from 'next/image';
import { AppLogo } from '../app-logo';
import { Button } from '../button';

export const Header = () => {
  return (
    <header className="px-10 sm:px20 py-5 bg-dark w-full flex justify-between items-center py-3 h-10vh">
      <Image
        priority
        src="/full-logo.svg"
        height={200}
        width={200}
        alt="FGC Combo Companion logo"
        className="hidden sm:inline-flex"
      />
      <AppLogo extraStyles="inline-flex sm:hidden" />
      <div className="flex flex-row gap-2">
        <Button text="Login" color="dark" extraStyles="hover:text-primary" />
        <Button text="Sign Up" color="primary" />
      </div>
    </header>
  );
};
