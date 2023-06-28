'use client';

import {
  DragDropContext,
  Draggable,
  Droppable,
  DroppableProvided,
  DropResult,
  ResponderProvided,
} from '@hello-pangea/dnd';
import { get, isEqual } from 'lodash';
import {
  Dispatch,
  FC,
  Fragment,
  SetStateAction,
  useMemo,
  useState,
} from 'react';
import { Spinner } from '../spinner';

export type OnFinishOrdenation<Data> = (
  setList: Dispatch<SetStateAction<Data[] | null | undefined>>,
  options: {
    result: DropResult;
    provided: ResponderProvided;
    reordered: Data[];
    changed: boolean;
  },
) => Promise<void>;

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
  renderRow?: (
    item: Data,
    props: {
      index: number;
      enableOrdernation: boolean;
      droppableProvided: DroppableProvided;
    },
  ) => React.ReactNode;
  rowFatherComponent?: FC<{ item: Data; children: React.ReactNode }>;
  enableOrdernation?: boolean;
  onFinishOrdenation?: OnFinishOrdenation<Data>;
  onDragStart?: () => void;
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
  enableOrdernation = false,
  onFinishOrdenation,
  onDragStart,
  rowFatherComponent: RowFatherComponent,
  loadingDataPlaceholder = (
    <div className="min-h-[300px] w-full flex justify-center items-center">
      <Spinner color="primary" />
    </div>
  ),
}: ListItemsProps<Data>) => {
  const [data, setData] = useState<Data[] | null | undefined>(items);

  const isDataAndItemsEquals = useMemo(() => {
    if (data?.length !== items?.length) {
      return false;
    }

    if (isEqual(data, items)) {
      return true;
    }
    const areEquals = items?.every((item) => {
      const currentDataItem = data?.find(
        (dataItem) => get(dataItem, 'id') === get(item, 'id'),
      );

      return isEqual(currentDataItem, item);
    });
    return areEquals;
  }, [data, items]);

  //YOLO
  if (!isDataAndItemsEquals) {
    setData(items);
  }

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
      <DragDropContext
        onDragStart={onDragStart}
        onDragEnd={async (result, provided) => {
          const startIndex = result.source.index;
          const endIndex = result.destination?.index ?? 0;
          const ordenationItems = Array.from(data ?? []);
          const [removed] = ordenationItems.splice(startIndex, 1);
          ordenationItems.splice(endIndex, 0, removed);

          const hasDataChangedPlaces = ordenationItems.some(
            (item, index) => get(item, 'id') !== get(items, `[${index}]id`),
          );
          if (onFinishOrdenation) {
            await onFinishOrdenation(setData, {
              result,
              provided,
              reordered: ordenationItems,
              changed: hasDataChangedPlaces,
            });
          }
        }}
      >
        <Droppable droppableId="droppable">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="flex flex-col flex-1"
            >
              {isLoadingData
                ? loadingDataPlaceholder
                : !data || data?.length === 0
                ? emptyListComponent
                : data.map((item, index) => {
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
                          {renderRow(item, {
                            index,
                            enableOrdernation,
                            droppableProvided: provided,
                          })}
                        </Container>
                      );
                    }
                    return (
                      <Container
                        {...(containerProps as { item: Data })}
                        key={index.toString()}
                      >
                        <Draggable
                          draggableId={
                            get(item, 'id')
                              ? String(get(item, 'id'))
                              : index.toString()
                          }
                          index={index}
                          isDragDisabled={!enableOrdernation}
                          key={index.toString()}
                        >
                          {(dragProvided) => (
                            <>
                              <div
                                ref={dragProvided.innerRef}
                                {...dragProvided.dragHandleProps}
                                {...dragProvided.draggableProps}
                                className={`${
                                  getRowClassName ? getRowClassName(item) : ''
                                } px-4 sm:px-[5px] p-2 mt-2 rounded-md min-h-[85px] w-full flex flex-col md:flex-row items-center justify-start border-2 border-secondary-dark`}
                              >
                                {columns?.map(
                                  ({
                                    name,
                                    size,
                                    format,
                                    renderColumnValue,
                                    label,
                                  }) => {
                                    const value: string = get(item, name);
                                    const formatedValue = format
                                      ? new Date(value).toLocaleString()
                                      : value;
                                    const customRender = renderColumnValue
                                      ? renderColumnValue(item)
                                      : null;

                                    const defaultValue =
                                      !formatedValue &&
                                      formatedValue?.length === 0 ? (
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
                            </>
                          )}
                        </Draggable>
                      </Container>
                    );
                  })}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};
