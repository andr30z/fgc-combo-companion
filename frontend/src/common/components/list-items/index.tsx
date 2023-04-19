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
}
export const ListItems = <Data,>({
  columns,
  emptyListComponent,
  items,
}: ListItemsProps<Data>) => {
  return (
    <div className="w-full">
      <header className="flex-row flex text-light w-full border-b-2 border-secondary-dark">
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
                className="p-2 mt-2 rounded-md min-h-[85px] w-full flex flex-row items-center justify-start border-2 border-secondary-dark"
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
