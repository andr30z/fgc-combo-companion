import { FGCApiPaginationResponse } from '@/common/types/fgc-api-pagination-response';
import { useMemo } from 'react';
import { Button } from '../button';

interface PaginationProps<Data> {
  pagination: FGCApiPaginationResponse<Data>;
  onSelectPage: (page: number) => void;
  showTotal?: boolean;
}

const LEFT_PAGE = 'LEFT';
const RIGHT_PAGE = 'RIGHT';

const range = (from: number, to: number, step = 1) => {
  let i = from;
  const range = [];

  while (i <= to) {
    range.push(i);
    i += step;
  }

  return range;
};

export const Pagination = <Data,>({
  pagination,
  onSelectPage,
  showTotal = false,
}: PaginationProps<Data>) => {
  let pageNeighbours = 3;

  pageNeighbours =
    typeof pageNeighbours === 'number'
      ? Math.max(0, Math.min(pageNeighbours, 2))
      : 3;

  const totalPages = pagination.totalPages;

  const fetchPageNumbers = () => {
    const currentPage = pagination.currentPage;

    const totalNumbers = pageNeighbours * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
      const startPage = Math.max(2, currentPage - pageNeighbours);
      const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);
      let pages: Array<string | number> = range(startPage, endPage);

      const hasLeftSpill = startPage > 2;
      const hasRightSpill = totalPages - endPage > 1;
      const spillOffset = totalNumbers - (pages.length + 1);

      switch (true) {
        case hasLeftSpill && !hasRightSpill: {
          const extraPages = range(startPage - spillOffset, startPage - 1);
          pages = [LEFT_PAGE, ...extraPages, ...pages];
          break;
        }

        case !hasLeftSpill && hasRightSpill: {
          const extraPages = range(endPage + 1, endPage + spillOffset);
          pages = [...pages, ...extraPages, RIGHT_PAGE];
          break;
        }

        case hasLeftSpill && hasRightSpill:
        default: {
          pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
          break;
        }
      }

      return [1, ...pages, totalPages];
    }

    return range(1, totalPages);
  };
  const goToPage = (page: number) => {
    const currentPage = Math.max(0, Math.min(page, totalPages));

    onSelectPage(currentPage);
  };

  const onClick = (position: string | number | null) => {
    if (!position) {
      return;
    }
    if (typeof position === 'string') {
      onSelectPage(Number(position.substring(Number(position))));
      return;
    }
    onSelectPage(position);
  };

  const arrayPages = useMemo(() => fetchPageNumbers(), [pagination]);
  return (
    <div className="flex flex-col w-full">
      {showTotal && (
        <p className="text-light mb-2">
          Total:
          {pagination.totalItems}
        </p>
      )}
      <div className="flex flex-row w-full items-center justify-center gap-1">
        {arrayPages.map((_pag) => {
          const pos = _pag;
          if (_pag === LEFT_PAGE) {
            return (
              <Button
                key={pos}
                text="&laquo;"
                color="secondary-dark"
                onClick={() => onClick(pagination.currentPage - 1)}
                extraStyles="h-[34px] w-[34px] rounded-[10px] p-0"
              />
            );
          }
          if (_pag === RIGHT_PAGE) {
            return (
              <Button
                key={pos}
                onClick={() => onClick(pagination.currentPage + 1)}
                color="secondary-dark"
                extraStyles="h-[34px] w-[34px] rounded-[10px] p-0"
                text="&raquo;"
              />
            );
          }
          return (
            <Button
              extraStyles="h-[34px] w-[34px] rounded-[10px] p-0"
              color={
                Number(pos) - 1 === pagination.currentPage
                  ? 'secondary'
                  : 'light'
              }
              onClick={() => goToPage(Number(pos) - 1)}
              key={pos}
              text={String(pos)}
            />
          );
        })}
      </div>
    </div>
  );
};
