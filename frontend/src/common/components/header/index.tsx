'use client';
import { useBoolean } from '@/common/hooks/boolean';
import { useClickAway } from '@/common/hooks/click-outside';
import { useLockBodyScroll } from '@/common/hooks/lock-body-scroll';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import type { FC } from 'react';
import {
  AiOutlineClose,
  AiOutlineKey,
  AiOutlineLogout,
  AiOutlineMenu,
  AiOutlineUser,
} from 'react-icons/ai';
import { BiJoystickButton, BiTransfer } from 'react-icons/bi';
import { CgPlayListCheck } from 'react-icons/cg';
import type { IconType } from 'react-icons/lib';
import { AppLogo } from '../app-logo';
import { Button } from '../button';
import { Link, LinkProps } from '../link';
import { FiSettings } from 'react-icons/fi';
const HideScrollBar = () => {
  useLockBodyScroll();
  return null;
};

const MenuItem: FC<{
  href: string;
  onClick?: () => void;
  className?: string;
  icon?: IconType;
  text: string;
  color?: LinkProps['color'];
}> = ({ href, onClick, className, icon: Icon, text, color = 'light' }) => {
  const isActive = usePathname() === href;
  return (
    <Link
      href={href}
      onClick={onClick}
      color={color}
      className={`flex flex-row gap-2 text-lg w-full ${
        isActive
          ? 'bg-opacity-40 bg-secondary'
          : 'hover:bg-opacity-40 hover:bg-secondary'
      } p-2 rounded-3xl text-opacity-100 ${className}`}
    >
      {Icon && <Icon size={27} />}
      <span>{text}</span>
    </Link>
  );
};

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
  const [isMenuOpen, { toggle: toggleMenu, setFalse: closeMenu }] =
    useBoolean();
  const containerRef = useClickAway<HTMLDivElement>(closeMenu);
  return (
    <>
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
            {!showLoginButton && !showSignupButton && !isLoadingSession && (
              <AiOutlineMenu
                size={25}
                role="button"
                className="cursor-pointer text-light hover:opacity-30"
                onClick={toggleMenu}
              />
            )}
          </div>
        )}
      </header>
      {isMenuOpen && (
        <>
          <div className="w-screen h-screen absolute bg-dark bg-opacity-50 z-40 top-0" />
          <HideScrollBar />
          <div
            ref={containerRef}
            className="w-screen md:w-[30vw] lg:w-[20vw] h-screen min-h-400 absolute right-0 md:top-0 md:top- bg-secondary-dark flex flex-col p-4 z-50"
          >
            <AiOutlineClose
              role="button"
              className="cursor-pointer text-light hover:opacity-30 self-end mb-10"
              size={30}
              onClick={closeMenu}
            />
            <MenuItem
              href="/user/profile"
              icon={AiOutlineUser}
              text="Profile"
              onClick={closeMenu}
            />
            <MenuItem
              href="/dashboard/playlists"
              icon={CgPlayListCheck}
              text="Playlists"
              onClick={closeMenu}
            />
            <MenuItem
              href="/dashboard/combos"
              text="Combos"
              icon={BiJoystickButton}
              onClick={closeMenu}
            />
            <MenuItem
              href="/combo-translator"
              icon={BiTransfer}
              text="Combo Translator"
              onClick={closeMenu}
            />
            <MenuItem
              href="/user/profile/password"
              icon={AiOutlineKey}
              text="Manage your password"
              onClick={closeMenu}
            />
            <MenuItem
              href="/user/profile/settings"
              icon={FiSettings}
              text="Settings"
              onClick={closeMenu}
            />
            <MenuItem
              href="/"
              color="primary"
              className=" self-end"
              icon={AiOutlineLogout}
              text="Logout"
              onClick={() => {
                signOut({ callbackUrl: '/' });
              }}
            />
          </div>
        </>
      )}
    </>
  );
};
