'use client';
import type { Url } from 'next/dist/shared/lib/router/router';
import Link from 'next/link';
import type { FC, MouseEventHandler, ReactNode } from 'react';

export interface ButtonProps {
  text?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  color?: 'primary' | 'secondary' | 'dark' | 'light';
  extraStyles?: string;
  useHoverStyles?: boolean;
  renderAsInnerLink?: boolean;
  href?: Url;
  dataTestId?: string;
  disabled?: boolean;
}

const classMappings = {
  primary: {
    default: 'bg-primary text-white',
    hover: 'hover:bg-light hover:text-primary',
  },
  secondary: {
    default: 'bg-secondary text-white',
    hover: 'hover:bg-secondary-dark',
  },
  dark: {
    default: 'bg-dark text-white',
    hover: 'hover:bg-light hover:text-dark',
  },
  light: {
    default: 'bg-light text-primary',
    hover: 'hover:bg-primary hover:text-light',
  },
};

export const Button: FC<ButtonProps> = ({
  onClick,
  text,
  leftIcon,
  rightIcon,
  color = 'primary',
  extraStyles = '',
  useHoverStyles = true,
  renderAsInnerLink = false,
  href = '',
  dataTestId = '',
  disabled = false,
}) => {
  const className = `px-4 py-2 font-semibold ${classMappings[color].default} ${
    useHoverStyles ? classMappings[color].hover : ''
  } rounded-full shadow-sm flex items-center justify-center gap-1 ${extraStyles}`;

  const children = (
    <>
      {leftIcon}
      {text && <span className="font-primary text-lg">{text}</span>}
      {rightIcon}
    </>
  );

  if (renderAsInnerLink) {
    return (
      <Link data-testid={dataTestId} href={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <button
      disabled={disabled}
      data-testid={dataTestId}
      className={className}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
