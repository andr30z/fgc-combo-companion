'use client';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { FiLogOut } from 'react-icons/fi';
import { AppLogo } from '../app-logo';
import { Button } from '../button';

export const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, status } = useSession();

  const hasSession = !!session;
  const showLoginButton = !hasSession && pathname !== '/login';
  const showSignupButton = !hasSession && pathname !== '/signup';

  const isLoadingSession = status === 'loading';
  return (
    <header className="px-10 sm:px20 py-5 bg-dark w-full flex justify-between items-center py-3 h-10vh">
      <Image
        priority
        src="/full-logo.svg"
        height={200}
        width={200}
        alt="FGC Combo Companion logo"
        onClick={() => {
          router.push(hasSession ? '/dashboard' : '/');
        }}
        className="hidden sm:block cursor-pointer"
      />
      <AppLogo
        extraStyles="inline-flex sm:hidden cursor-pointer"
        onClick={() => {
          router.push('/');
        }}
      />
      {isLoadingSession ? (
        <div />
      ) : (
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
              href="/signup"
              text="Sign Up"
              color="primary"
            />
          )}

          {hasSession && (
            <Button
              text="Sign out"
              color="primary"
              leftIcon={<FiLogOut size={17} />}
              onClick={() => {
                signOut({ callbackUrl: '/' });
              }}
            />
          )}
        </div>
      )}
    </header>
  );
};
