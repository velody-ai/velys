import type { Meta, StoryObj } from "@storybook/react";
import { Avatar } from "./Avatar";

const meta: Meta<typeof Avatar> = {
  title: "Components/Avatar",
  component: Avatar,
};
export default meta;
type Story = StoryObj<typeof Avatar>;

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <Avatar size="xs" initials="AB" />
      <Avatar size="sm" initials="AB" />
      <Avatar size="md" initials="AB" />
      <Avatar size="lg" initials="AB" />
      <Avatar size="xl" initials="AB" />
    </div>
  ),
};

export const Types: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <Avatar initials="VK" />
      <Avatar />
      <Avatar shape="square" initials="SQ" />
      <Avatar shape="square" />
    </div>
  ),
};
