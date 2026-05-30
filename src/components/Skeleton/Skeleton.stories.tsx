import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "./Skeleton";

const meta: Meta<typeof Skeleton> = {
  title: "Components/Skeleton",
  component: Skeleton,
  argTypes: {
    variant: { control: "inline-radio", options: ["text", "rectangular", "circular"] },
  },
};
export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Playground: Story = {
  args: { variant: "rectangular", width: 240, height: 80 },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
      <Skeleton variant="circular" width={48} height={48} />
      <Skeleton variant="rectangular" width={160} height={80} />
      <Skeleton variant="text" width={160} />
    </div>
  ),
};

export const TextLines: Story = {
  render: () => (
    <div style={{ width: 280 }}>
      <Skeleton variant="text" lines={4} />
    </div>
  ),
};

export const CardPlaceholder: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12, width: 320 }}>
      <Skeleton variant="circular" width={40} height={40} />
      <div style={{ flex: 1 }}>
        <Skeleton variant="text" width="80%" />
        <Skeleton variant="text" width="60%" />
      </div>
    </div>
  ),
};
