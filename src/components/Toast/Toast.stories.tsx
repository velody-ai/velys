import type { Meta, StoryObj } from "@storybook/react";
import { Toast } from "./Toast";

const meta: Meta<typeof Toast> = {
  title: "Components/Toast",
  component: Toast,
  args: { title: "Notification title", description: "Supporting message describing what happened." },
};
export default meta;
type Story = StoryObj<typeof Toast>;

const statuses = ["info", "success", "warning", "danger", "neutral"] as const;

export const Statuses: Story = {
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {statuses.map((s) => <Toast key={s} {...args} status={s} onClose={() => {}} />)}
    </div>
  ),
};

export const WithAction: Story = {
  args: { status: "success", actionLabel: "View details", onAction: () => {}, onClose: () => {} },
};
