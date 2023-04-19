'use client';

import { get } from 'lodash';

interface ListItemsProps<Data> {
  columns: Array<{
    size: string;
    label: React.ReactNode;
    name: string;
    format?: 'date';
  }>;
  items?: Array<Data> | null;
  emptyListComponent?: React.ReactNode;
  getRowClassName?: (rowItem: Data) => string;
  headerClassName?: string;
  className?: string;
}
export const ListItems = <Data,>({
  columns,
  emptyListComponent,
  items,
  getRowClassName,
  headerClassName,
  className,
}: ListItemsProps<Data>) => {
  return (
    <div className={`w-full ${className ?? ''}`}>
      <header
        className={`flex-row flex p-2 text-light w-full ${
          headerClassName ?? ''
        }`}
      >
        {columns.map(({ label, name, size }) => (
          <div key={name} className={`${size} py-2`}>
            <span className="font-primary text-light text-lg font-semibold">
              {label}
            </span>
          </div>
        ))}
      </header>
      {!items || items?.length === 0
        ? emptyListComponent
        : items.map((item, index) => {
            return (
              <div
                key={index.toString()}
                className={`${
                  getRowClassName ? getRowClassName(item) : ''
                } p-2 mt-2 rounded-md min-h-[85px] w-full flex flex-row items-center justify-start border-2 border-secondary-dark`}
              >
                {columns.map(({ name, size, format }) => {
                  const value: string = get(item, name);
                  const formatedValue = format
                    ? new Date(value).toLocaleString()
                    : value;
                  return (
                    <span key={name} className={`${size} text-light`}>
                      {!formatedValue && formatedValue?.length === 0 ? (
                        <strong>-</strong>
                      ) : (
                        formatedValue
                      )}
                    </span>
                  );
                })}
              </div>
            );
          })}
      {}
    </div>
  );
};
