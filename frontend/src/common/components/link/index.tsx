import type { FC, ReactNode } from 'react';
import NextLink from 'next/link';

interface LinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  color?: 'primary' | 'secondary' | 'light' | 'dark' | 'light-active';
}
export const Link: FC<LinkProps> = ({
  children,
  href,
  className,
  color = 'primary',
}) => {
  const hoverStyleMap = {
    primary: 'hover:text-light',
    secondary: 'hover:text-light',
    light: 'hover:text-sub-info',
    dark: 'hover:text-light',
    'light-active': 'hover:text-light-darker',
  };
  return (
    <NextLink
      href={href}
      className={`${hoverStyleMap[color]} text-${color} transition-all font-primary ${className}`}
    >
      {children}
    </NextLink>
  );
};
