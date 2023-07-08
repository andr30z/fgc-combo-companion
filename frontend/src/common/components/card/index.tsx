import type { FC, ReactNode } from 'react';

interface CardProps {
  className?: string;
  children: ReactNode;
  cardTitle?: ReactNode;
  size?: 'full' | 'xl' | 'lg' | 'md';
  theme?: 'primary' | 'secondary' | 'secondary-dark' | 'dark';
  shadowSize?: 'none' | 'lg' | 'md' | 'sm';
  as?: 'form' | 'div' | 'section' | 'article';
}

export const Card: FC<CardProps> = ({
  className = '',
  cardTitle,
  children,
  size = 'lg',
  theme = 'secondary-dark',
  shadowSize = 'none',
  as = 'div',
}) => {
  const Component = as;
  const sizes = {
    xl: 'sm:w-[400px] sm:h-[500px]',
    lg: 'sm:w-[300px] sm:h-[400px]',
    md: 'sm:w-[250px] sm:h-[300px]',
    full: 'w-full h-full flex-1',
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
    <Component
      className={`${className} ${sizeClass} ${themeClass} ${
        shadowSize === 'none' ? '' : 'shadow-' + shadowSize
      } p-5 border-2 flex flex-col justify-center items-center rounded-lg`}
    >
      {typeof cardTitle === 'string' ? (
        <>
          <h1 className="text-lg font-bold text-light text-left mb-2">
            {cardTitle}
          </h1>
          <hr className="text-light w-full" />
        </>
      ) : (
        cardTitle
      )}
      {children}
    </Component>
  );
};
