import type { Meta, StoryObj } from "@storybook/react";
import { StatusDot } from "./StatusDot";

const meta: Meta<typeof StatusDot> = {
  title: "Components/StatusDot",
  component: StatusDot,
  args: { status: "success", label: "Operational" },
};
export default meta;
type Story = StoryObj<typeof StatusDot>;

const statuses = ["neutral", "brand", "success", "warning", "danger", "info"] as const;

export const Playground: Story = {};

export const Statuses: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
      {statuses.map((s) => (
        <StatusDot key={s} status={s} label={s} />
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
      <StatusDot size="sm" status="success" label="Small" />
      <StatusDot size="md" status="success" label="Medium" />
    </div>
  ),
};

export const WithoutLabel: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12 }}>
      {statuses.map((s) => (
        <StatusDot key={s} status={s} aria-label={s} />
      ))}
    </div>
  ),
};

export const Pulse: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
      <StatusDot status="success" pulse label="Live" />
      <StatusDot status="danger" pulse label="Recording" />
      <StatusDot status="brand" pulse size="sm" label="Syncing" />
    </div>
  ),
};
