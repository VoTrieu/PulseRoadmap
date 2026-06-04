type PaginatedResponse<T> = {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

type PaginatedApiResponse<T> = {
  items: T[];
  page: number;
  page_size: number;
  total: number;
  total_pages: number;
};

type PaginationParams = {
  skip: number;
  take: number;
};

export type { PaginatedApiResponse, PaginatedResponse, PaginationParams };
