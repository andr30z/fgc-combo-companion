import { ChangeEventHandler, FC } from 'react';

export interface InputProps {
  label?: string;
  value: string;
  setValue?: (value: string) => void;
  error?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  width?: string;
  height?: string;
  placeholder?: string;
  type?: string;
  className?: string;
}

export const Input: FC<InputProps> = ({
  label,
  onChange,
  value,
  error,
  setValue,
  className = '',
  height = 'h-full',
  width = 'w-full',
  placeholder,
  type = "text",
}) => {
  return (
    <div className={`${width} ${height}`}>
      {label && (
        <label className="block text-sm font-medium text-light">{label}</label>
      )}
      <input
        type={type}
        value={value}
        onChange={(e) => {
          if (setValue) {
            const value = e.target.value;
            setValue(value);
          }
          if (onChange) onChange(e);
        }}
        placeholder={placeholder}
        className={`h-full w-full px-3 py-2 bg-white shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 rounded-md sm:text-sm focus:ring-1 font-primary disabled:shadow-none ${className}`}
      />
      {error && <p className="mt-2 opacity-10 text-primary text-sm">{error}</p>}
    </div>
  );
};
