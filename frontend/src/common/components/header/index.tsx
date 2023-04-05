'use client';
import Image from 'next/image';
import { AppLogo } from '../app-logo';
import { Button } from '../button';
import { usePathname, useRouter } from 'next/navigation';

export const Header = () => {
  const router = useRouter();
  const pathname = usePathname();

  const showLoginButton = pathname !== '/login';
  const showSignupButton = pathname !== '/signup';
  return (
    <header className="px-10 sm:px20 py-5 bg-dark w-full flex justify-between items-center py-3 h-10vh">
      <Image
        priority
        src="/full-logo.svg"
        height={200}
        width={200}
        alt="FGC Combo Companion logo"
        onClick={() => {
          router.push('/');
        }}
        className="hidden sm:inline-flex cursor-pointer"
      />
      <AppLogo
        extraStyles="inline-flex sm:hidden cursor-pointer"
        onClick={() => {
          router.push('/');
        }}
      />
      <div className="flex flex-row gap-2">
        {showLoginButton && (
          <Button
            renderAsInnerLink
            href="/login"
            text="Login"
            color="dark"
            extraStyles="hover:text-primary"
          />
        )}
        {showSignupButton && (
          <Button
            renderAsInnerLink
            href="/login"
            text="Sign Up"
            color="primary"
          />
        )}
      </div>
    </header>
  );
};
