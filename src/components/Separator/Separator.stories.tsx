import type { Meta, StoryObj } from "@storybook/react";
import { Separator } from "./Separator";
import { Text } from "../Text";

const meta: Meta<typeof Separator> = {
  title: "Components/Separator",
  component: Separator,
  argTypes: {
    orientation: { control: "inline-radio", options: ["horizontal", "vertical"] },
    spacing: { control: "inline-radio", options: ["none", "sm", "md", "lg"] },
  },
};
export default meta;
type Story = StoryObj<typeof Separator>;

export const Horizontal: Story = {
  render: () => (
    <div style={{ width: 280 }}>
      <Text>Above</Text>
      <Separator spacing="md" />
      <Text>Below</Text>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", height: 24 }}>
      <Text>Docs</Text>
      <Separator orientation="vertical" spacing="md" />
      <Text>Blog</Text>
      <Separator orientation="vertical" spacing="md" />
      <Text>About</Text>
    </div>
  ),
};
