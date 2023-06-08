import { forwardRef, ReactNode } from 'react';
import NextLink from 'next/link';

export interface LinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  color?: 'primary' | 'secondary' | 'light' | 'dark' | 'light-active';
  title?: string;
  useHoverStyles?: boolean;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      children,
      href,
      className,
      color = 'primary',
      title,
      useHoverStyles = true,
      onClick,
    },
    ref,
  ) => {
    const hoverStyleMap = {
      primary: 'hover:text-light',
      secondary: 'hover:text-light',
      light: 'hover:text-sub-info',
      dark: 'hover:text-light',
      'light-active': 'hover:text-light-darker',
    };
    return (
      <NextLink
        ref={ref}
        href={href}
        title={title}
        onClick={onClick}
        className={`${
          useHoverStyles ? hoverStyleMap[color] : ''
        } text-${color} transition-all font-primary ${className}`}
      >
        {children}
      </NextLink>
    );
  },
);
