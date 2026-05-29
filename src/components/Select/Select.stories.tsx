import type { Meta, StoryObj } from "@storybook/react";
import { Select } from "./Select";

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
  render: (args) => (
    <div style={{ width: 240 }}>
      <Select {...args}>
        <option value="">Select an option</option>
        <option value="1">Option one</option>
        <option value="2">Option two</option>
        <option value="3">Option three</option>
        <option value="4" disabled>
          Option four (disabled)
        </option>
      </Select>
    </div>
  ),
};
export default meta;
type Story = StoryObj<typeof Select>;

export const Playground: Story = {};
export const WithValue: Story = { args: { defaultValue: "2" } };
export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, width: 240 }}>
      {(["sm", "md", "lg"] as const).map((size) => (
        <Select key={size} size={size} defaultValue="1">
          <option value="">Select an option</option>
          <option value="1">Option one</option>
          <option value="2">Option two</option>
        </Select>
      ))}
    </div>
  ),
};
export const Invalid: Story = { args: { invalid: true } };
export const Disabled: Story = { args: { disabled: true, defaultValue: "1" } };
