"use client";
import type { FC, MouseEventHandler, ReactNode } from "react";

export interface ButtonProps {
  text?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  color?: "primary" | "secondary" | "dark" | "light";
  extraStyles?: string;
  useHoverStyles?: boolean;
}
export const Button: FC<ButtonProps> = ({
  onClick,
  text,
  leftIcon,
  rightIcon,
  color = "primary",
  extraStyles = "",
  useHoverStyles = true,
}) => {
  const classMappings = {
    primary: {
      default: "bg-primary text-white",
      hover: "hover:bg-light hover:text-primary",
    },
    secondary: {
      default: "bg-secondary text-white",
      hover: "hover:bg-secondary-dark",
    },
    dark: { default: "bg-dark text-white", hover: "hover:bg-light hover:text-dark" },
    light: {
      default: "bg-light text-primary",
      hover: "hover:bg-primary hover:text-light",
    },
  };
  return (
    <button
      className={`px-4 py-2 sm font-semibold text-sm ${
        classMappings[color].default
      } ${
        useHoverStyles ? classMappings[color].hover : ""
      } rounded-full shadow-sm flex items-center justify-center gap-1 ${extraStyles}`}
      onClick={onClick}
    >
      {leftIcon}
      {text && <span className="font-primary text-lg text-center">{text}</span>}
      {rightIcon}
    </button>
  );
};
