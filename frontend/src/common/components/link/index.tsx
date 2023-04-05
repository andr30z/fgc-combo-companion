import type { FC, ReactNode } from 'react';
import NextLink from 'next/link';

interface LinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}
export const Link: FC<LinkProps> = ({ children, href, className }) => {
  return (
    <NextLink
      href={href}
      className={`hover:text-light text-secondary font-primary ${className}`}
    >
      {children}
    </NextLink>
  );
};
