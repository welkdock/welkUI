"use client";

import { useId, useMemo, useState } from "react";
import { WelkIconButton } from "../WelkIconButton";
import { WelkCheckBox } from "../WelkCheckBox";
import { WelkInput } from "../WelkInput";
import { cn } from "../../utils";
import styles from "./WelkDataTable.module.css";
import type {
  WelkDataTableProps,
  WelkDataTableSort,
  WelkDataTableRowId,
  WelkDataTableValue,
} from "./WelkDataTable.types";

function compareValues(a: WelkDataTableValue, b: WelkDataTableValue) {
  if (a == null) return b == null ? 0 : 1;
  if (b == null) return -1;
  if (typeof a === "number" && typeof b === "number") return a - b;
  return String(a).localeCompare(String(b), "en", {
    numeric: true,
    sensitivity: "base",
  });
}

export function WelkDataTable<T>({
  caption,
  data,
  columns,
  getRowId,
  getRowLabel,
  searchable = false,
  searchLabel = "Search table",
  searchPlaceholder = "Find your next clue...",
  search,
  defaultSearch = "",
  onSearchChange,
  sortable = true,
  sort,
  defaultSort,
  onSortChange,
  pagination = true,
  pageSize = 10,
  selectable = false,
  selectedRowIds,
  defaultSelectedRowIds = [],
  onSelectionChange,
  loading = false,
  loadingMessage = "Loading the next chapter...",
  emptyMessage = "No rows yet. The story starts here.",
  noResultsMessage = "No matching rows. Try another clue.",
  striped = true,
  density = "comfortable",
  getRowClassName,
  className,
  ...props
}: WelkDataTableProps<T>) {
  const id = useId();
  const [internalSearch, setInternalSearch] = useState(defaultSearch);
  const [internalSort, setInternalSort] = useState<WelkDataTableSort | null>(
    defaultSort ?? null,
  );
  const [internalSelection, setInternalSelection] = useState<
    readonly WelkDataTableRowId[]
  >(defaultSelectedRowIds);
  const query = search ?? internalSearch;
  const activeSort = sortable
    ? sort === undefined
      ? internalSort
      : sort
    : null;
  const [page, setPage] = useState({
    index: 0,
    query,
    columnId: activeSort?.columnId,
    direction: activeSort?.direction,
    pageSize,
  });

  if (!Number.isInteger(pageSize) || pageSize < 1)
    throw new RangeError("WelkDataTable: pageSize must be a positive integer.");
  if (
    !columns.length ||
    columns.some((column) => !column.id) ||
    new Set(columns.map((column) => column.id)).size !== columns.length
  )
    throw new Error(
      "WelkDataTable: provide columns with unique, non-empty ids.",
    );
  const sortColumn = columns.find(
    (column) => column.id === activeSort?.columnId,
  );
  if (activeSort && (!sortColumn || sortColumn.sortable === false))
    throw new Error("WelkDataTable: sort must reference a sortable column.");

  const rows = data.map((row) => ({ row, id: getRowId(row) }));
  if (
    rows.some(({ id: rowId }) =>
      typeof rowId === "number" ? !Number.isFinite(rowId) : !rowId,
    ) ||
    new Set(rows.map(({ id: rowId }) => String(rowId))).size !== rows.length
  )
    throw new Error(
      "WelkDataTable: getRowId must return unique, non-empty ids.",
    );

  const filtered = useMemo(() => {
    const needle = searchable ? query.trim().toLowerCase() : "";
    const matching = data.filter(
      (row) =>
        !needle ||
        columns.some(
          (column) =>
            column.searchable !== false &&
            String(column.accessor(row) ?? "")
              .toLowerCase()
              .includes(needle),
        ),
    );
    if (activeSort && sortColumn) {
      const direction = activeSort.direction === "asc" ? 1 : -1;
      matching.sort(
        (a, b) =>
          direction *
          (sortColumn.compare
            ? sortColumn.compare(a, b)
            : compareValues(sortColumn.accessor(a), sortColumn.accessor(b))),
      );
    }
    return matching;
  }, [data, columns, searchable, query, activeSort, sortColumn]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageScopeChanged =
    page.query !== query ||
    page.columnId !== activeSort?.columnId ||
    page.direction !== activeSort?.direction ||
    page.pageSize !== pageSize;
  const pageIndex =
    !pagination || pageScopeChanged ? 0 : Math.min(page.index, pageCount - 1);
  if (pageScopeChanged || page.index !== pageIndex) {
    setPage({
      index: pageIndex,
      query,
      columnId: activeSort?.columnId,
      direction: activeSort?.direction,
      pageSize,
    });
  }
  const visible = pagination
    ? filtered.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize)
    : filtered;
  const existingIds = new Set(rows.map(({ id: rowId }) => rowId));
  const selection = new Set(
    (selectedRowIds ?? internalSelection).filter((rowId) =>
      existingIds.has(rowId),
    ),
  );
  const visibleIds = visible.map(getRowId);
  const selectedOnPage = visibleIds.filter((rowId) =>
    selection.has(rowId),
  ).length;
  const select = (next: Set<WelkDataTableRowId>) => {
    const ids = [...next];
    if (selectedRowIds === undefined) setInternalSelection(ids);
    onSelectionChange?.(ids);
  };
  const changePage = (index: number) =>
    setPage({
      index,
      query,
      columnId: activeSort?.columnId,
      direction: activeSort?.direction,
      pageSize,
    });

  return (
    <div
      {...props}
      className={cn(
        styles.root,
        styles[density],
        striped && styles.striped,
        className,
      )}
      aria-busy={loading}
    >
      {searchable && (
        <div className={styles.toolbar}>
          <WelkInput
            type="search"
            label={searchLabel}
            placeholder={searchPlaceholder}
            value={query}
            disabled={loading}
            onChange={(event) => {
              const next = event.currentTarget.value;
              if (search === undefined) setInternalSearch(next);
              onSearchChange?.(next);
            }}
          />
        </div>
      )}
      <div
        className={styles.scroll}
        role="region"
        aria-labelledby={`${id}-caption`}
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex -- Enables keyboard scrolling of wide tables.
        tabIndex={0}
      >
        <table className={styles.table}>
          <caption id={`${id}-caption`}>{caption}</caption>
          <thead>
            <tr>
              {selectable && (
                <th scope="col" className={styles.selection}>
                  <WelkCheckBox
                    label={
                      <span className={styles.srOnly}>
                        Select all rows on this page
                      </span>
                    }
                    checked={
                      visible.length > 0 && selectedOnPage === visible.length
                    }
                    ref={(input) => {
                      if (input)
                        input.indeterminate =
                          selectedOnPage > 0 && selectedOnPage < visible.length;
                    }}
                    disabled={loading || !visible.length}
                    onChange={(event) => {
                      const next = new Set(selection);
                      for (const rowId of visibleIds) {
                        if (event.currentTarget.checked) next.add(rowId);
                        else next.delete(rowId);
                      }
                      select(next);
                    }}
                  />
                </th>
              )}
              {columns.map((column) => (
                <th
                  key={column.id}
                  scope="col"
                  style={{ textAlign: column.align, width: column.width }}
                  aria-sort={
                    !sortable || column.sortable === false
                      ? undefined
                      : activeSort?.columnId === column.id
                        ? activeSort.direction === "asc"
                          ? "ascending"
                          : "descending"
                        : "none"
                  }
                >
                  {!sortable || column.sortable === false ? (
                    column.header
                  ) : (
                    <button
                      type="button"
                      className={styles.sort}
                      disabled={loading}
                      onClick={() => {
                        const next: WelkDataTableSort | null =
                          activeSort?.columnId !== column.id
                            ? { columnId: column.id, direction: "asc" }
                            : activeSort.direction === "asc"
                              ? { columnId: column.id, direction: "desc" }
                              : null;
                        if (sort === undefined) setInternalSort(next);
                        onSortChange?.(next);
                      }}
                    >
                      {column.header}
                      <span aria-hidden="true">
                        {activeSort?.columnId === column.id
                          ? activeSort.direction === "asc"
                            ? " ↑"
                            : " ↓"
                          : " ↕"}
                      </span>
                    </button>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading || !visible.length ? (
              <tr>
                <td
                  colSpan={columns.length + Number(selectable)}
                  className={styles.message}
                >
                  <span role="status">
                    {loading
                      ? loadingMessage
                      : data.length
                        ? noResultsMessage
                        : emptyMessage}
                  </span>
                </td>
              </tr>
            ) : (
              visible.map((row) => {
                const rowId = getRowId(row);
                return (
                  <tr
                    key={rowId}
                    className={getRowClassName?.(row)}
                    data-selected={
                      selectable && selection.has(rowId) ? "true" : undefined
                    }
                  >
                    {selectable && (
                      <td className={styles.selection}>
                        <WelkCheckBox
                          label={
                            <span className={styles.srOnly}>
                              Select row {getRowLabel?.(row) ?? String(rowId)}
                            </span>
                          }
                          checked={selection.has(rowId)}
                          onChange={(event) => {
                            const next = new Set(selection);
                            if (event.currentTarget.checked) next.add(rowId);
                            else next.delete(rowId);
                            select(next);
                          }}
                        />
                      </td>
                    )}
                    {columns.map((column) => (
                      <td key={column.id} style={{ textAlign: column.align }}>
                        {column.cell
                          ? column.cell(row)
                          : String(column.accessor(row) ?? "")}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      <div className={styles.footer}>
        <span role="status" aria-live="polite">
          {loading
            ? "Loading"
            : `${filtered.length} ${filtered.length === 1 ? "row" : "rows"}`}
          {selectable && ` · ${selection.size} selected`}
        </span>
        {pagination && (
          <nav aria-label="Table pagination" className={styles.pagination}>
            <WelkIconButton
              label="Previous page"
              icon={
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  focusable="false"
                >
                  <path d="m14 5-7 7 7 7M7 12h14" />
                </svg>
              }
              disabled={loading || pageIndex === 0}
              onClick={() => changePage(pageIndex - 1)}
            />
            <span>
              Page {pageIndex + 1} of {pageCount}
            </span>
            <WelkIconButton
              label="Next page"
              icon={
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  focusable="false"
                >
                  <path d="m10 5 7 7-7 7M3 12h14" />
                </svg>
              }
              disabled={loading || pageIndex >= pageCount - 1}
              onClick={() => changePage(pageIndex + 1)}
            />
          </nav>
        )}
      </div>
    </div>
  );
}
