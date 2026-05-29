import type { Meta, StoryObj } from "@storybook/react";
import { Alert } from "./Alert";

const meta: Meta<typeof Alert> = {
  title: "Components/Alert",
  component: Alert,
  args: { title: "Alert title", description: "Additional context about this alert message." },
};
export default meta;
type Story = StoryObj<typeof Alert>;

const statuses = ["info", "success", "warning", "danger", "neutral"] as const;

export const Subtle: Story = {
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, width: 420 }}>
      {statuses.map((s) => <Alert key={s} {...args} status={s} variant="subtle" />)}
    </div>
  ),
};

export const Solid: Story = {
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, width: 420 }}>
      {statuses.map((s) => <Alert key={s} {...args} status={s} variant="solid" />)}
    </div>
  ),
};

export const Dismissible: Story = {
  args: { onClose: () => {}, status: "success" },
  render: (args) => <div style={{ width: 420 }}><Alert {...args} /></div>,
};
