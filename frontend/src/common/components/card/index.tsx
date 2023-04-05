import type { FC, ReactNode } from 'react';

interface CardProps {
  className?: string;
  children: ReactNode;
  cardTitle?: ReactNode;
  size?: 'xl' | 'lg' | 'md';
  theme?: 'primary' | 'secondary' | 'secondary-dark' | 'dark';
  shadowSize?: 'none' | 'xl' | 'lg' | 'md' | 'sm';
}

export const Card: FC<CardProps> = ({
  className = '',
  cardTitle,
  children,
  size,
  theme = 'secondary-dark',
  shadowSize = 'none',
}) => {
  const sizes = {
    xl: 'sm:w-[400px] sm:h-[500px]',
    lg: 'sm:w-[300px] sm:h-[400px]',
    md: 'sm:w-[250px] sm:h-[300px]',
  };

  const themes = {
    primary: 'bg-primary shadow-primary',
    secondary: 'bg-secondary shadow-secondary',
    'secondary-dark': 'bg-secondary-dark shadow-secondary-dark',
    dark: 'bg-dark shadow-primary',
  };

  const themeClass = theme ? themes[theme] : '';

  const sizeClass = size ? sizes[size] : '';
  return (
    <div
      className={`${className} ${sizeClass} ${themeClass} ${
        shadowSize === 'none' ? '' : 'shadow-' + shadowSize
      } p-5 border-2 flex flex-col justify-center items-center rounded-lg`}
    >
      {typeof cardTitle === 'string' ? (
        <>
          <h1 className="text-lg font-bold text-light text-left">
            {cardTitle}
          </h1>
          <hr />
        </>
      ) : (
        cardTitle
      )}
      {children}
    </div>
  );
};
