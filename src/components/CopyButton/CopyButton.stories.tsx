import type { Meta, StoryObj } from "@storybook/react";
import { CopyButton } from "./CopyButton";

const meta: Meta<typeof CopyButton> = {
  title: "Components/CopyButton",
  component: CopyButton,
  args: { value: "npm install @velody/velys" },
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md"] },
  },
};
export default meta;
type Story = StoryObj<typeof CopyButton>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <CopyButton {...args} size="sm" />
      <CopyButton {...args} size="md" />
    </div>
  ),
};

export const CustomTimeout: Story = {
  args: { timeout: 5000 },
};

export const Disabled: Story = {
  args: { disabled: true },
};
