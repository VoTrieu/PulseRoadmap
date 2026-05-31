import { DataTable, type DataTableStateEvent, type DataTableValue } from "primereact/datatable";
import type { ReactNode } from "react";
import type { PaginationParams } from "../../types/pagination";

type PaginatorTableProps<T extends DataTableValue> = {
  data: T[];
  totalRecords: number;
  isLoading: boolean;
  onPageChange: (params: PaginationParams) => void;
  first: number;
  children: ReactNode;
  rowsPerPageOptions?: number[];
  rows: number;
  emptyMessage?: string;
};

const DEFAULT_ROWS_PER_PAGE = 10;
const DEFAULT_ROWS_OPTIONS = [5, 10, 20, 50];

function PaginatorTable<T extends DataTableValue>({
  data,
  totalRecords,
  isLoading,
  onPageChange,
  first,
  children,
  rowsPerPageOptions = DEFAULT_ROWS_OPTIONS,
  rows,
  emptyMessage,
}: PaginatorTableProps<T>) {
  function onDataTablePageChange(event: DataTableStateEvent) {
    const newFirst = event.first ?? 0;
    const rows = event.rows ?? DEFAULT_ROWS_PER_PAGE;

    onPageChange({ skip: newFirst, take: rows });
  }

  return (
    <DataTable
      value={data}
      size="small"
      stripedRows
      lazy
      paginator
      first={first}
      rows={rows}
      totalRecords={totalRecords}
      loading={isLoading}
      onPage={onDataTablePageChange}
      paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
      rowsPerPageOptions={rowsPerPageOptions}
      currentPageReportTemplate="Showing {first} to {last} of {totalRecords} items"
      emptyMessage={emptyMessage}
    >
      {children}
    </DataTable>
  );
}

export { PaginatorTable };
