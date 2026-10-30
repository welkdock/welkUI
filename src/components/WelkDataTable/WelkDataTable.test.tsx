import { useState } from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderToString } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { WelkDataTable } from "./WelkDataTable";
import type {
  WelkDataTableColumn,
  WelkDataTableProps,
  WelkDataTableRowId,
  WelkDataTableSort,
} from "./WelkDataTable.types";

interface Row {
  id: number;
  name: string;
  score: number | null;
}
const data: readonly Row[] = [
  { id: 1, name: "Zebra", score: 20 },
  { id: 2, name: "Alpha", score: 3 },
  { id: 3, name: "Beta", score: 100 },
  { id: 4, name: "Delta", score: null },
];
const columns: readonly WelkDataTableColumn<Row>[] = [
  { id: "name", header: "Name", accessor: (row) => row.name },
  {
    id: "score",
    header: "Score",
    accessor: (row) => row.score,
    align: "right",
  },
];
function Table(props: Partial<WelkDataTableProps<Row>>) {
  return (
    <WelkDataTable
      caption="Heroes"
      data={data}
      columns={columns}
      getRowId={(row) => row.id}
      getRowLabel={(row) => row.name}
      {...props}
    />
  );
}
function names() {
  return within(screen.getByRole("table", { name: "Heroes" }))
    .getAllByRole("row")
    .slice(1)
    .map(
      (row) =>
        within(row).getAllByRole("cell")[
          within(row).queryByRole("checkbox") ? 1 : 0
        ].textContent,
    );
}

describe("WelkDataTable", () => {
  it("renders native table semantics, column headers, custom cells and div attributes", () => {
    render(
      <Table
        data-testid="board"
        className="custom"
        title="Mission data"
        columns={[
          columns[0],
          {
            ...columns[1],
            cell: (row) => <strong>{row.score ?? "N/A"}</strong>,
            sortable: false,
            width: "8rem",
          },
        ]}
      />,
    );
    expect(screen.getByRole("table", { name: "Heroes" })).toBeVisible();
    expect(screen.getByRole("region", { name: "Heroes" })).toHaveAttribute(
      "tabindex",
      "0",
    );
    expect(screen.getAllByRole("columnheader")).toHaveLength(2);
    expect(
      screen.getByRole("columnheader", { name: "Score" }),
    ).not.toHaveAttribute("aria-sort");
    expect(screen.queryByRole("button", { name: "Score" })).toBeNull();
    expect(screen.getByText("N/A").tagName).toBe("STRONG");
    expect(screen.getByTestId("board")).toHaveClass("custom");
    expect(screen.getByTestId("board")).toHaveAttribute(
      "title",
      "Mission data",
    );
    expect(screen.queryByRole("searchbox")).toBeNull();
    expect(screen.queryByRole("checkbox")).toBeNull();
  });

  it.each([false, true])(
    "toggles search, sorting, and selection independently of saved state (controlled sort=%s)",
    (controlled) => {
      const savedSort = { columnId: "name", direction: "asc" } as const;
      const sortProps = controlled
        ? { sort: savedSort }
        : { defaultSort: savedSort };
      const view = render(
        <Table
          {...sortProps}
          searchable={false}
          sortable={false}
          selectable={false}
          defaultSearch="Alpha"
          defaultSelectedRowIds={[1]}
        />,
      );
      expect(names()).toEqual(["Zebra", "Alpha", "Beta", "Delta"]);
      expect(screen.queryByRole("searchbox")).toBeNull();
      expect(screen.queryByRole("checkbox")).toBeNull();
      expect(screen.queryByRole("button", { name: "Name" })).toBeNull();
      for (const header of screen.getAllByRole("columnheader")) {
        expect(header).not.toHaveAttribute("aria-sort");
      }
      view.rerender(
        <Table
          {...sortProps}
          searchable
          sortable
          selectable
          defaultSearch="Alpha"
          defaultSelectedRowIds={[1]}
        />,
      );
      expect(names()).toEqual(["Alpha"]);
      expect(screen.getByRole("searchbox")).toBeVisible();
      expect(screen.getByRole("button", { name: "Name" })).toBeVisible();
      expect(
        screen.getByRole("checkbox", { name: "Select row Alpha" }),
      ).toBeVisible();
      view.rerender(
        <Table {...sortProps} searchable={false} sortable selectable={false} />,
      );
      expect(names()).toEqual(["Alpha", "Beta", "Delta", "Zebra"]);
      expect(screen.queryByRole("checkbox")).toBeNull();
      view.rerender(<Table {...sortProps} sortable={false} />);
      expect(names()).toEqual(["Zebra", "Alpha", "Beta", "Delta"]);
    },
  );

  it("cycles numeric sorting ascending, descending and original order without mutating data", async () => {
    const user = userEvent.setup();
    const onSortChange = vi.fn();
    render(<Table onSortChange={onSortChange} />);
    const button = screen.getByRole("button", { name: "Score" });
    await user.click(button);
    expect(names()).toEqual(["Alpha", "Zebra", "Beta", "Delta"]);
    expect(screen.getByRole("columnheader", { name: /Score/ })).toHaveAttribute(
      "aria-sort",
      "ascending",
    );
    await user.click(button);
    expect(names()).toEqual(["Delta", "Beta", "Zebra", "Alpha"]);
    expect(screen.getByRole("columnheader", { name: /Score/ })).toHaveAttribute(
      "aria-sort",
      "descending",
    );
    await user.click(button);
    expect(names()).toEqual(["Zebra", "Alpha", "Beta", "Delta"]);
    expect(onSortChange).toHaveBeenLastCalledWith(null);
    expect(data.map((row) => row.id)).toEqual([1, 2, 3, 4]);
  });

  it("supports default sorting, custom comparisons, and keyboard sort activation", async () => {
    const user = userEvent.setup();
    render(
      <Table
        defaultSort={{ columnId: "name", direction: "desc" }}
        columns={[
          { ...columns[0], compare: (a, b) => a.name.length - b.name.length },
        ]}
      />,
    );
    expect(names()).toEqual(["Zebra", "Alpha", "Delta", "Beta"]);
    screen.getByRole("button", { name: "Name" }).focus();
    await user.keyboard("{Enter}");
    expect(names()).toEqual(["Zebra", "Alpha", "Beta", "Delta"]);
    await user.keyboard(" ");
    expect(names()[0]).toBe("Beta");
  });

  it("searches accessor values, ignores excluded columns, resets pagination, and distinguishes no results", () => {
    const onSearchChange = vi.fn();
    render(
      <Table
        searchable
        pageSize={2}
        onSearchChange={onSearchChange}
        columns={[columns[0], { ...columns[1], searchable: false }]}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Next page" }));
    expect(names()).toEqual(["Beta", "Delta"]);
    fireEvent.change(screen.getByRole("searchbox"), {
      target: { value: "  ALPHA " },
    });
    expect(names()).toEqual(["Alpha"]);
    expect(screen.getByText("Page 1 of 1")).toBeInTheDocument();
    expect(onSearchChange).toHaveBeenLastCalledWith("  ALPHA ");
    fireEvent.change(screen.getByRole("searchbox"), {
      target: { value: "100" },
    });
    expect(
      screen.getByText("No matching rows. Try another clue."),
    ).toBeVisible();
    fireEvent.change(screen.getByRole("searchbox"), { target: { value: "" } });
    expect(names()).toEqual(["Zebra", "Alpha"]);
  });

  it("paginates, disables boundaries and clamps the page when data shrinks", () => {
    const view = render(<Table pageSize={2} />);
    for (const name of ["Previous page", "Next page"]) {
      const button = screen.getByRole("button", { name });
      expect(button).toHaveAttribute("aria-label", name);
      expect(button.textContent).toBe("");
      expect(button.querySelector("svg")).toBeInTheDocument();
    }
    expect(names()).toEqual(["Zebra", "Alpha"]);
    expect(
      screen.getByRole("button", { name: "Previous page" }),
    ).toBeDisabled();
    fireEvent.click(screen.getByRole("button", { name: "Next page" }));
    expect(names()).toEqual(["Beta", "Delta"]);
    expect(screen.getByRole("button", { name: "Next page" })).toBeDisabled();
    view.rerender(<Table pageSize={2} data={data.slice(0, 1)} />);
    expect(names()).toEqual(["Zebra"]);
    expect(screen.getByText("Page 1 of 1")).toBeInTheDocument();
    view.rerender(<Table pagination={false} />);
    expect(names()).toHaveLength(4);
    expect(screen.queryByRole("navigation")).toBeNull();
  });

  it("selects only visible rows, exposes mixed state, and preserves selection across filters/pages", () => {
    const onSelectionChange = vi.fn();
    render(
      <Table
        searchable
        selectable
        pageSize={2}
        onSelectionChange={onSelectionChange}
      />,
    );
    const all = screen.getByRole<HTMLInputElement>("checkbox", {
      name: "Select all rows on this page",
    });

    fireEvent.click(screen.getByRole("checkbox", { name: "Select row Zebra" }));
    expect(all.indeterminate).toBe(true);
    fireEvent.click(all);
    expect(onSelectionChange).toHaveBeenLastCalledWith([1, 2]);
    fireEvent.click(screen.getByRole("button", { name: "Next page" }));
    expect(all).not.toBeChecked();
    fireEvent.click(screen.getByRole("checkbox", { name: "Select row Beta" }));
    expect(onSelectionChange).toHaveBeenLastCalledWith([1, 2, 3]);
    fireEvent.change(screen.getByRole("searchbox"), {
      target: { value: "Alpha" },
    });
    expect(all).toBeChecked();
    fireEvent.click(all);
    expect(onSelectionChange).toHaveBeenLastCalledWith([1, 3]);
    expect(screen.getByText("1 row · 2 selected")).toBeVisible();
  });

  it("resets pages for controlled query/sort changes and page size updates", () => {
    const view = render(<Table searchable search="" pageSize={2} />);
    fireEvent.click(screen.getByRole("button", { name: "Next page" }));
    view.rerender(<Table searchable search="Alpha" pageSize={2} />);
    expect(names()).toEqual(["Alpha"]);
    view.rerender(<Table searchable search="" pageSize={2} />);
    expect(names()).toEqual(["Zebra", "Alpha"]);
    fireEvent.click(screen.getByRole("button", { name: "Next page" }));
    view.rerender(
      <Table
        searchable
        search=""
        pageSize={2}
        sort={{ columnId: "name", direction: "asc" }}
      />,
    );
    expect(names()).toEqual(["Alpha", "Beta"]);
    view.rerender(<Table searchable search="" pageSize={2} sort={null} />);
    expect(names()).toEqual(["Zebra", "Alpha"]);
    fireEvent.click(screen.getByRole("button", { name: "Next page" }));
    view.rerender(<Table searchable search="" pageSize={3} sort={null} />);
    expect(names()).toEqual(["Zebra", "Alpha", "Beta"]);
  });

  it("supports controlled search, sorting and selection", () => {
    function Controlled() {
      const [search, setSearch] = useState("");
      const [sort, setSort] = useState<WelkDataTableSort | null>(null);
      const [selected, setSelected] = useState<WelkDataTableRowId[]>([]);
      return (
        <Table
          searchable
          selectable
          search={search}
          onSearchChange={setSearch}
          sort={sort}
          onSortChange={setSort}
          selectedRowIds={selected}
          onSelectionChange={setSelected}
        />
      );
    }
    render(<Controlled />);
    fireEvent.click(screen.getByRole("button", { name: "Name" }));
    expect(screen.getByRole("columnheader", { name: /Name/ })).toHaveAttribute(
      "aria-sort",
      "ascending",
    );
    fireEvent.change(screen.getByRole("searchbox"), {
      target: { value: "Beta" },
    });
    expect(
      screen.getByRole("checkbox", { name: "Select row Beta" }),
    ).not.toBeChecked();
    fireEvent.click(screen.getByRole("checkbox", { name: "Select row Beta" }));
    expect(
      screen.getByRole("checkbox", { name: "Select row Beta" }),
    ).toBeChecked();
  });

  it("does not mutate controlled values when the consumer has not updated them", () => {
    const onSelectionChange = vi.fn();
    const onSortChange = vi.fn();
    const onSearchChange = vi.fn();
    render(
      <Table
        selectable
        searchable
        search=""
        sort={null}
        selectedRowIds={[]}
        onSelectionChange={onSelectionChange}
        onSortChange={onSortChange}
        onSearchChange={onSearchChange}
      />,
    );
    fireEvent.click(screen.getByRole("checkbox", { name: "Select row Zebra" }));
    expect(onSelectionChange).toHaveBeenLastCalledWith([1]);
    expect(
      screen.getByRole("checkbox", { name: "Select row Zebra" }),
    ).not.toBeChecked();
    fireEvent.click(screen.getByRole("button", { name: "Name" }));
    expect(names()[0]).toBe("Zebra");
    expect(onSortChange).toHaveBeenLastCalledWith({
      columnId: "name",
      direction: "asc",
    });
    fireEvent.change(screen.getByRole("searchbox"), {
      target: { value: "Beta" },
    });
    expect(screen.getByRole("searchbox")).toHaveValue("");
    expect(onSearchChange).toHaveBeenLastCalledWith("Beta");
  });

  it("drops removed row ids from selection and supports default selection", () => {
    const onSelectionChange = vi.fn();
    const view = render(
      <Table
        selectable
        defaultSelectedRowIds={[1, 4]}
        onSelectionChange={onSelectionChange}
      />,
    );
    view.rerender(
      <Table
        selectable
        data={data.slice(0, 2)}
        defaultSelectedRowIds={[1, 4]}
        onSelectionChange={onSelectionChange}
      />,
    );
    expect(screen.getByText("2 rows · 1 selected")).toBeVisible();
    fireEvent.click(screen.getByRole("checkbox", { name: "Select row Alpha" }));
    expect(onSelectionChange).toHaveBeenLastCalledWith([1, 2]);
  });

  it("shows loading instead of stale rows and disables controls, then displays custom empty states", () => {
    const view = render(
      <Table loading selectable searchable loadingMessage="Fetching heroes" />,
    );
    expect(screen.getByText("Fetching heroes")).toBeVisible();
    expect(screen.queryByText("Zebra")).toBeNull();
    expect(screen.getByRole("searchbox")).toBeDisabled();
    expect(screen.getByRole("button", { name: "Name" })).toBeDisabled();
    expect(screen.getByRole("checkbox")).toBeDisabled();
    expect(screen.getByRole("button", { name: "Next page" })).toBeDisabled();
    view.rerender(<Table data={[]} emptyMessage="No heroes" />);
    expect(screen.getByText("No heroes")).toBeVisible();
    view.rerender(
      <Table
        searchable
        defaultSearch="missing"
        noResultsMessage="Nothing matched"
      />,
    );
    fireEvent.change(screen.getByRole("searchbox"), {
      target: { value: "missing" },
    });
    expect(screen.getByText("Nothing matched")).toBeVisible();
  });

  it("does not submit enclosing forms from sort, selection, or pagination buttons", () => {
    const submit = vi.fn((event) => event.preventDefault());
    render(
      <form onSubmit={submit}>
        <Table selectable pageSize={2} />
      </form>,
    );
    fireEvent.click(screen.getByRole("button", { name: "Name" }));
    fireEvent.click(screen.getByRole("checkbox", { name: "Select row Alpha" }));
    fireEvent.click(screen.getByRole("button", { name: "Next page" }));
    expect(submit).not.toHaveBeenCalled();
  });

  it("renders server-side with the same accessible content", () => {
    const html = renderToString(<Table searchable selectable />);
    expect(html).toContain("<caption");
    expect(html).toContain("Heroes");
    expect(html).toContain('aria-sort="none"');
  });

  it.each([0, -1, 1.5, Infinity, NaN])(
    "rejects invalid pageSize %s",
    (pageSize) => {
      expect(() => renderToString(<Table pageSize={pageSize} />)).toThrow(
        /positive integer/,
      );
    },
  );
  it("rejects missing/duplicate column ids, duplicate row ids, and invalid sort columns", () => {
    expect(() => renderToString(<Table columns={[]} />)).toThrow(/columns/);
    expect(() =>
      renderToString(<Table columns={[columns[0], columns[0]]} />),
    ).toThrow(/columns/);
    expect(() => renderToString(<Table getRowId={() => 1} />)).toThrow(
      /getRowId/,
    );
    expect(() =>
      renderToString(
        <Table sort={{ columnId: "missing", direction: "asc" }} />,
      ),
    ).toThrow(/sortable/);
    expect(() =>
      renderToString(
        <Table
          columns={[{ ...columns[0], sortable: false }]}
          defaultSort={{ columnId: "name", direction: "asc" }}
        />,
      ),
    ).toThrow(/sortable/);
  });
});
