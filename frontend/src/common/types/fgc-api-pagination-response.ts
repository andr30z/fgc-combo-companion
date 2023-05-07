export interface FGCApiPaginationResponse<Data> {
  currentPage: number;
  perPage: number;
  totalPages: number;
  totalItems: number;
  hasNext: boolean;
  data: Array<Data>;
}
