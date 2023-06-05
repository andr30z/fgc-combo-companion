'use client';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { FiLogOut } from 'react-icons/fi';
import { Button } from '../button';
import { AppLogo } from '../app-logo';

export const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, status } = useSession();

  const hasSession = !!session;
  const showLoginButton = !hasSession && pathname !== '/login';
  const showSignupButton = !hasSession && pathname !== '/signup';

  const isLoadingSession = status === 'loading';

  const onClickLogo = () => {
    router.push(hasSession ? '/dashboard/combos' : '/');
  };
  return (
    <header className="layout-padding-x py-5 bg-dark w-full flex justify-between items-center h-10vh min-h-[60px]">
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
