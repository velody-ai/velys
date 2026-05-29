import type { Meta, StoryObj } from "@storybook/react";
import { IconButton } from "./IconButton";
import { CloseIcon } from "../icons";

const meta: Meta<typeof IconButton> = {
  title: "Components/IconButton",
  component: IconButton,
  args: { icon: <CloseIcon />, "aria-label": "Close" },
};
export default meta;
type Story = StoryObj<typeof IconButton>;

export const Variants: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 12 }}>
      <IconButton {...args} variant="solid" />
      <IconButton {...args} variant="outline" />
      <IconButton {...args} variant="ghost" />
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <IconButton {...args} size="sm" variant="outline" />
      <IconButton {...args} size="md" variant="outline" />
      <IconButton {...args} size="lg" variant="outline" />
    </div>
  ),
};
