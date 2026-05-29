import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./Badge";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  args: { children: "Badge" },
};
export default meta;
type Story = StoryObj<typeof Badge>;

const colors = ["neutral", "brand", "success", "warning", "danger", "info"] as const;

export const Subtle: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      {colors.map((c) => (
        <Badge key={c} color={c} variant="subtle">{c}</Badge>
      ))}
    </div>
  ),
};

export const Solid: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      {colors.map((c) => (
        <Badge key={c} color={c} variant="solid">{c}</Badge>
      ))}
    </div>
  ),
};

export const WithDot: Story = {
  args: { withDot: true, color: "success", children: "Active" },
};
