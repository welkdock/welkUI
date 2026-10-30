import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { WelkDatePicker } from "./WelkDatePicker";

const meta = {
  title: "Components/WelkDatePicker",
  component: WelkDatePicker,
  args: { label: "Pick your adventure date", defaultValue: "2026-10-22" },
} satisfies Meta<typeof WelkDatePicker>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const CircularMarking: Story = { args: { circularMarking: true } };
export const TodaysDate: Story = { args: { showTodaysDate: true } };
export const CustomMarkingColor: Story = {
  args: { circularMarking: true, circularMarkingColor: "#2563eb" },
};
export const Empty: Story = { args: { defaultValue: "", required: true } };
export const LimitedRange: Story = {
  args: { min: "2026-10-10", max: "2026-10-28" },
};
export const Disabled: Story = { args: { disabled: true } };
export const Controlled: Story = {
  render: function ControlledStory(args) {
    const [value, setValue] = useState("2026-10-22");
    return <WelkDatePicker {...args} value={value} onValueChange={setValue} />;
  },
};
