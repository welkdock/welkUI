import type { CSSProperties, HTMLAttributes, ReactNode } from "react";

export type WelkDataTableRowId = string | number;
export type WelkDataTableValue = string | number | boolean | null | undefined;

export interface WelkDataTableColumn<T> {
  id: string;
  header: ReactNode;
  accessor: (row: T) => WelkDataTableValue;
  cell?: (row: T) => ReactNode;
  sortable?: boolean;
  searchable?: boolean;
  compare?: (a: T, b: T) => number;
  align?: "left" | "center" | "right";
  width?: CSSProperties["width"];
}

export interface WelkDataTableSort {
  columnId: string;
  direction: "asc" | "desc";
}

export interface WelkDataTableProps<T> extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "children" | "onSelect"
> {
  caption: ReactNode;
  data: readonly T[];
  columns: readonly WelkDataTableColumn<T>[];
  getRowId: (row: T) => WelkDataTableRowId;
  getRowLabel?: (row: T) => string;
  searchable?: boolean;
  searchLabel?: string;
  searchPlaceholder?: string;
  search?: string;
  defaultSearch?: string;
  onSearchChange?: (search: string) => void;
  sortable?: boolean;
  sort?: WelkDataTableSort | null;
  defaultSort?: WelkDataTableSort;
  onSortChange?: (sort: WelkDataTableSort | null) => void;
  pagination?: boolean;
  pageSize?: number;
  selectable?: boolean;
  selectedRowIds?: readonly WelkDataTableRowId[];
  defaultSelectedRowIds?: readonly WelkDataTableRowId[];
  onSelectionChange?: (ids: WelkDataTableRowId[]) => void;
  loading?: boolean;
  loadingMessage?: ReactNode;
  emptyMessage?: ReactNode;
  noResultsMessage?: ReactNode;
  striped?: boolean;
  density?: "comfortable" | "compact";
  getRowClassName?: (row: T) => string | undefined;
}
