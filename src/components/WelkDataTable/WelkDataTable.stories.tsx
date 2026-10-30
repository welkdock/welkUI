import type { Meta, StoryObj } from "@storybook/react-vite";
import { WelkDataTable } from "./WelkDataTable";
import type {
  WelkDataTableColumn,
  WelkDataTableProps,
} from "./WelkDataTable.types";

interface Mission {
  id: number;
  name: string;
  points: number;
}

const data: Mission[] = [
  { id: 1, name: "Rescue the moon", points: 90 },
  { id: 2, name: "Find the missing ink", points: 40 },
  { id: 3, name: "Catch the plot twist", points: 75 },
  { id: 4, name: "Deliver the punchline", points: 100 },
];
const columns: WelkDataTableColumn<Mission>[] = [
  { id: "name", header: "Mission", accessor: (row) => row.name },
  {
    id: "points",
    header: "Points",
    accessor: (row) => row.points,
    align: "right",
  },
];

function MissionTable(props: WelkDataTableProps<Mission>) {
  return <WelkDataTable {...props} />;
}

const meta = {
  title: "Components/WelkDataTable",
  component: MissionTable,
  args: {
    caption: "Mission board",
    data,
    columns,
    getRowId: (row) => row.id,
    getRowLabel: (row) => row.name,
    pageSize: 3,
  },
} satisfies Meta<typeof MissionTable>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Interactive: Story = {
  args: { searchable: true, selectable: true },
};
export const DisplayOnly: Story = {
  args: { searchable: false, sortable: false, selectable: false },
};
export const Compact: Story = {
  args: { density: "compact", striped: false, pagination: false },
};
export const Loading: Story = { args: { loading: true } };
export const Empty: Story = { args: { data: [] } };
export const CustomCells: Story = {
  args: {
    columns: [
      columns[0],
      {
        ...columns[1],
        cell: (row) => <strong>{row.points} pts!</strong>,
      },
    ],
  },
};
