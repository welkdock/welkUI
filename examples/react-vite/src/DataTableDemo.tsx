import { WelkBadge, WelkDataTable } from "@welkui/react";
import type { WelkDataTableColumn, WelkDataTableProps } from "@welkui/react";

interface Mission {
  id: string;
  name: string;
  status: string;
  points: number;
}

const missions: readonly Mission[] = [
  { id: "M1", name: "Rescue the moon", status: "Ready", points: 90 },
  { id: "M2", name: "Find the missing ink", status: "In progress", points: 40 },
  { id: "M3", name: "Catch the plot twist", status: "Ready", points: 75 },
  { id: "M4", name: "Deliver the punchline", status: "Complete", points: 100 },
  { id: "M5", name: "Save the last panel", status: "In progress", points: 60 },
];

const columns: readonly WelkDataTableColumn<Mission>[] = [
  { id: "name", header: "Mission", accessor: (row) => row.name },
  {
    id: "status",
    header: "Status",
    accessor: (row) => row.status,
    cell: (row) => (
      <WelkBadge variant={row.status === "Complete" ? "success" : "info"}>
        {row.status}
      </WelkBadge>
    ),
  },
  {
    id: "points",
    header: "Points",
    accessor: (row) => row.points,
    align: "right",
  },
];

export function DataTableDemo(props: Partial<WelkDataTableProps<Mission>>) {
  return (
    <WelkDataTable
      caption="Mission board"
      data={missions}
      columns={columns}
      getRowId={(row) => row.id}
      getRowLabel={(row) => row.name}
      pageSize={3}
      searchable
      selectable
      {...props}
    />
  );
}
