type PaginatedResponse<T> = {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

type PaginationParams = {
  skip: number;
  take: number;
};

export type { PaginatedResponse, PaginationParams };
