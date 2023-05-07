'use client';

import { get } from 'lodash';
import { Spinner } from '../spinner';
import { FC, Fragment } from 'react';

export interface ListItemsProps<Data> {
  columns?: Array<{
    size: string;
    label: React.ReactNode;
    name: string;
    format?: 'date';
    renderColumnValue?: (item: Data) => React.ReactNode;
  }>;
  items?: Array<Data> | null;
  emptyListComponent?: React.ReactNode;
  getRowClassName?: (rowItem: Data) => string;
  headerClassName?: string;
  className?: string;
  isLoadingData?: boolean;
  loadingDataPlaceholder?: React.ReactNode;
  hideHeader?: boolean;
  renderRow?: (item: Data) => React.ReactNode;
  rowFatherComponent?: FC<{ item: Data; children: React.ReactNode }>;
}
export const ListItems = <Data,>({
  columns,
  emptyListComponent,
  items,
  getRowClassName,
  headerClassName,
  className,
  isLoadingData,
  hideHeader = false,
  renderRow,
  rowFatherComponent: RowFatherComponent,
  loadingDataPlaceholder = (
    <div className="min-h-[300px] w-full flex justify-center items-center">
      <Spinner color="primary" />
    </div>
  ),
}: ListItemsProps<Data>) => {
  const content =
    !items || items?.length === 0
      ? emptyListComponent
      : items.map((item, index) => {
          const Container = RowFatherComponent ?? Fragment;
          const containerProps = RowFatherComponent
            ? {
                item,
              }
            : {};
          if (renderRow) {
            return (
              <Container
                {...(containerProps as { item: Data })}
                key={index.toString()}
              >
                {renderRow(item)}
              </Container>
            );
          }
          return (
            <Container
              {...(containerProps as { item: Data })}
              key={index.toString()}
            >
              <div
                className={`${
                  getRowClassName ? getRowClassName(item) : ''
                } px-4 sm:px-[5px] p-2 mt-2 rounded-md min-h-[85px] w-full flex flex-col md:flex-row items-center justify-start border-2 border-secondary-dark`}
              >
                {columns?.map(
                  ({ name, size, format, renderColumnValue, label }) => {
                    const value: string = get(item, name);
                    const formatedValue = format
                      ? new Date(value).toLocaleString()
                      : value;
                    const customRender = renderColumnValue
                      ? renderColumnValue(item)
                      : null;

                    const defaultValue =
                      !formatedValue && formatedValue?.length === 0 ? (
                        <strong>-</strong>
                      ) : (
                        formatedValue
                      );
                    return (
                      <div
                        key={name}
                        className={`text-ellipsis truncate px-1 md:mt-0 mt-4 text-light flex justify-between flex-row font-primary ${size} min-w-[100%] md:min-w-[unset]`}
                      >
                        <span className="md:hidden font-bold">
                          {typeof label === 'string' && label
                            ? label + ':'
                            : ''}
                        </span>
                        {customRender || defaultValue}
                      </div>
                    );
                  },
                )}
              </div>
            </Container>
          );
        });

  return (
    <div className={`w-full ${className ?? ''}`}>
      {!hideHeader && (
        <header
          className={`hidden md:flex flex-row p-2 text-light w-full ${
            headerClassName ?? ''
          }`}
        >
          {columns?.map(({ label, name, size }) => (
            <div key={name} className={`${size} py-2`}>
              <span className="font-primary text-light text-lg font-semibold">
                {label}
              </span>
            </div>
          ))}
        </header>
      )}
      {isLoadingData ? loadingDataPlaceholder : content}
    </div>
  );
};
