import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./Input";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  args: { placeholder: "Placeholder" },
};
export default meta;
type Story = StoryObj<typeof Input>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, width: 280 }}>
      <Input size="sm" placeholder="Small" />
      <Input size="md" placeholder="Medium" />
      <Input size="lg" placeholder="Large" />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, width: 280 }}>
      <Input placeholder="Default" />
      <Input placeholder="Invalid" invalid defaultValue="wrong@" />
      <Input placeholder="Disabled (empty)" disabled />
      <Input disabled defaultValue="Disabled value" />
    </div>
  ),
};
