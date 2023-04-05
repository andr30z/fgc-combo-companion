import type { ChangeEventHandler, FC, ReactNode } from 'react';

export interface InputProps {
  label?: ReactNode;
  value: string;
  setValue?: (value: string) => void;
  error?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  width?: string;
  height?: string;
  placeholder?: string;
  type?: string;
  className?: string;
  containerClassName?: string;
  inputProps?: Partial<React.InputHTMLAttributes<HTMLInputElement>>;
  dataTestId?: string;
}

export const Input: FC<InputProps> = ({
  label,
  onChange,
  value,
  error,
  setValue,
  className = '',
  height = 'h-[75px]',
  width = 'w-full',
  placeholder,
  type = 'text',
  containerClassName = '',
  inputProps = {},
  dataTestId,
}) => {
  return (
    <div className={`${width} ${height} ${containerClassName}`}>
      {typeof label === 'string' ? (
        <label className="block mb-1 text-lg font-medium text-light h-[30%]">
          {label}
        </label>
      ) : (
        label
      )}
      <input
        type={type}
        value={value}
        onChange={(e) => {
          if (setValue) {
            const value = e.target.value;
            setValue(value);
          }
          if (onChange) {
            onChange(e);
          }
        }}
        className={`h-[70%] w-full px-3 py-2 bg-white shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 rounded-md  focus:ring-1 font-primary disabled:shadow-none ${className}`}
        placeholder={placeholder}
        data-testid={dataTestId}
        {...inputProps}
      />
      {error && <p className="mt-2 opacity-10 text-primary text-sm">{error}</p>}
    </div>
  );
};
