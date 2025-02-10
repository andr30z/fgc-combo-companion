'use client';
import * as RadixSelect from '@radix-ui/react-select';
import { get } from 'lodash';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
export interface SelectProps {
  value: string;
  options: Array<string | { label: string; value: string }>;
  onSelectValue: (value: string) => void;
  isLoadingOptions?: boolean;
}
export const Select: React.FC<SelectProps> = (props) => {
  const { options: opts, value, onSelectValue, isLoadingOptions } = props;
  const options = ['Select an option', ...opts];

  if (isLoadingOptions) {
    options.unshift('Loading options...');
  }
  return (
    <RadixSelect.Root
      value={
        isLoadingOptions
          ? 'Loading options...'
          : value
          ? value
          : 'Select an option'
      }
      onValueChange={onSelectValue}
    >
      <RadixSelect.Trigger className="rounded-lg px-[15px] text-sm leading-none min-h-[52px] min-w-[130px] gap-[5px] bg-light flex flex-row items-center justify-between">
        <RadixSelect.Value placeholder={value ? value : 'Select an option'} />
        <RadixSelect.Icon>
          <FaChevronDown className="text-secondary-dark" size={15} />
        </RadixSelect.Icon>
      </RadixSelect.Trigger>
      <RadixSelect.Portal>
        <RadixSelect.Content
          onEscapeKeyDown={(e) => {
            e.stopPropagation();
          }}
          onClick={(e) => e.stopPropagation()}
          className="px-[15px] py-4 overflow-y-hidden min-h-[52px] min-w-[130px] shadow-sm shadow-light-active bg-secondary-dark rounded-lg w-full"
        >
          <RadixSelect.ScrollUpButton className="flex items-center justify-center h-[25px] bg-light  cursor-default">
            <FaChevronUp size={15} />
          </RadixSelect.ScrollUpButton>
          <RadixSelect.Viewport>
            {options.map((opt) => {
              const value = (get(opt, 'value') ?? opt) as string;
              const label = (get(opt, 'label') ?? opt) as string;
              return (
                <RadixSelect.Item
                  key={value}
                  title={label}
                  className="outline-none border-none rounded-[5px] flex items-center h-[30px] w-full select-none text-light hover:bg-light hover:text-secondary-dark px-1 line-clamp-1"
                  value={value}
                >
                  <RadixSelect.ItemText className="w-full">
                    {label}
                  </RadixSelect.ItemText>
                </RadixSelect.Item>
              );
            })}
          </RadixSelect.Viewport>

          <RadixSelect.ScrollDownButton className="flex items-center justify-center h-[25px] bg-light  cursor-default">
            <FaChevronDown size={15} />
          </RadixSelect.ScrollDownButton>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  );
};
