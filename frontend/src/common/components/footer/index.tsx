import React from 'react';
import { ImGithub } from 'react-icons/im';

export const Footer = () => {
  return (
    <footer className="bg-dark h-10vh w-full flex-1 flex items-end justify-center text-center pb-10">
      <span className="text-light">
        Created by{' '}
        <a
          target="_blank"
          href="https://github.com/andr30z/fgc-combo-companion"
          className="hover:text-secondary cursor-pointer text-light inline-flex items-center gap-2"
        >
          @andr30z
          <ImGithub size={25} />
        </a>
      </span>
    </footer>
  );
};
