import type {
  PaginatedApiResponse,
  PaginatedResponse,
} from "../types/pagination";

function mapPaginatedApiResponse<TApiItem, TItem>(
  response: PaginatedApiResponse<TApiItem>,
  mapItem: (item: TApiItem) => TItem,
): PaginatedResponse<TItem> {
  return {
    items: response.items.map(mapItem),
    total: response.total,
    page: response.page,
    pageSize: response.page_size,
    totalPages: response.total_pages,
  };
}

export { mapPaginatedApiResponse };
