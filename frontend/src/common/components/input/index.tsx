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
  required?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
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
  required = false,
  iconLeft,
  iconRight,
}) => {
  const hasIcon = !!iconLeft || !!iconRight;
  return (
    <div className={`${width} ${height} ${containerClassName}`}>
      {typeof label === 'string' ? (
        <label className="block mb-1 text-lg font-medium text-light h-[30%]">
          {label} {required && <span className="text-secondary">*</span>}
        </label>
      ) : (
        label
      )}
      <div
        className={`px-2 py-2 ${
          label ? 'h-[70%]' : 'h-full'
        } w-full bg-white shadow-sm border-slate-300 placeholder-slate-400 flex flex-row items-center justify-center focus:outline-none focus:border-sky-500 focus:ring-sky-500 rounded-md  focus:ring-1 font-primary disabled:shadow-none`}
      >
        {iconLeft}
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
          className={`h-full w-full outline-none ${
            hasIcon ? 'px-2' : ''
          } ${className}`}
          placeholder={placeholder}
          data-testid={dataTestId}
          {...inputProps}
        />
        {iconRight}
      </div>
      {error && <p className="mt-2 opacity-10 text-primary text-sm">{error}</p>}
    </div>
  );
};
