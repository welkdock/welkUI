import type { Meta, StoryObj } from "@storybook/react-vite";
import { WelkQRCode } from "./WelkQRCode";

const meta = {
  title: "Components/WelkQRCode",
  component: WelkQRCode,
  args: { url: "https://ui.welkdock.com", variant: "default" },
  argTypes: {
    variant: { control: "select", options: ["default", "card"] },
    cardColor: { control: "color" },
    originalCode: { control: "boolean" },
  },
} satisfies Meta<typeof WelkQRCode>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Website: Story = {};
export const Card: Story = {
  args: {
    variant: "card",
    title: "Visit WelkUI",
    subtitle: "Scan to explore the component library.",
    cardColor: "#ffda57",
  },
};
export const InvalidURL: Story = { args: { url: "welkdock.com" } };
