import React from 'react';
import { ImGithub } from 'react-icons/im';

export const Footer = () => {
  return (
    <footer className="bg-dark h-10vh min-h-[100px] w-full flex items-end justify-center text-center pb-1">
      <span className="text-light text-sm">
        Created by{' '}
        <a
          target="_blank"
          href="https://github.com/andr30z/fgc-combo-companion"
          className="hover:text-secondary cursor-pointer text-light inline-flex items-center gap-2"
        >
          @andr30z
          <ImGithub size={20} />
        </a>
      </span>
    </footer>
  );
};
