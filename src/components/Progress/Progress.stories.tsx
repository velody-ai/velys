import type { Meta, StoryObj } from "@storybook/react";
import { Progress, CircularProgress } from "./Progress";

const meta: Meta<typeof Progress> = {
  title: "Components/Progress",
  component: Progress,
  args: { value: 60 },
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md"] },
    tone: { control: "inline-radio", options: ["brand", "success", "warning", "danger"] },
  },
};
export default meta;
type Story = StoryObj<typeof Progress>;

export const Playground: Story = {
  render: (args) => (
    <div style={{ width: 280 }}>
      <Progress {...args} />
    </div>
  ),
};

export const Tones: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, width: 280 }}>
      <Progress value={70} tone="brand" />
      <Progress value={70} tone="success" />
      <Progress value={70} tone="warning" />
      <Progress value={70} tone="danger" />
    </div>
  ),
};

export const Indeterminate: Story = {
  render: () => (
    <div style={{ width: 280 }}>
      <Progress />
    </div>
  ),
};

export const Circular: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
      <CircularProgress value={25} />
      <CircularProgress value={66} tone="success" />
      <CircularProgress />
    </div>
  ),
};
