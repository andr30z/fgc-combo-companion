import type { FC, ReactNode } from 'react';
import NextLink from 'next/link';

interface LinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  color?: 'primary' | 'secondary' | 'light' | 'dark' | 'light-active';
  title?: string;
}
export const Link: FC<LinkProps> = ({
  children,
  href,
  className,
  color = 'primary',
  title,
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
      title={title}
      className={`${hoverStyleMap[color]} text-${color} transition-all font-primary ${className}`}
    >
      {children}
    </NextLink>
  );
};
