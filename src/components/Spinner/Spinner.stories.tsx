import type { Meta, StoryObj } from "@storybook/react";
import { Spinner } from "./Spinner";

const meta: Meta<typeof Spinner> = {
  title: "Components/Spinner",
  component: Spinner,
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    tone: { control: "inline-radio", options: ["current", "brand", "muted"] },
  },
};
export default meta;
type Story = StoryObj<typeof Spinner>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </div>
  ),
};

export const Tones: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
      <Spinner tone="brand" />
      <Spinner tone="muted" />
      <span style={{ color: "#e5484d" }}>
        <Spinner tone="current" />
      </span>
    </div>
  ),
};
