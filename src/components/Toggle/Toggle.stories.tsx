import type { Meta, StoryObj } from "@storybook/react";
import { Toggle, ToggleGroup, ToggleGroupItem } from "./Toggle";

const meta: Meta<typeof Toggle> = {
  title: "Components/Toggle",
  component: Toggle,
  args: { children: "Bold" },
  argTypes: {
    size: { control: "inline-radio", options: ["small", "medium", "large"] },
  },
};
export default meta;
type Story = StoryObj<typeof Toggle>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <Toggle {...args} size="small">Small</Toggle>
      <Toggle {...args} size="medium">Medium</Toggle>
      <Toggle {...args} size="large">Large</Toggle>
    </div>
  ),
};

export const Pressed: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12 }}>
      <Toggle>Unpressed</Toggle>
      <Toggle defaultPressed>Pressed</Toggle>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12 }}>
      <Toggle disabled>Disabled</Toggle>
      <Toggle disabled defaultPressed>
        Disabled pressed
      </Toggle>
    </div>
  ),
};

// Single mode (default): pressing one item unpresses the others. With the
// default allowEmpty, the active item can be unpressed back to an empty state.
export const SingleGroup: Story = {
  render: () => (
    <ToggleGroup aria-label="Text alignment" defaultValue="left">
      <ToggleGroupItem value="left">Left</ToggleGroupItem>
      <ToggleGroupItem value="center">Center</ToggleGroupItem>
      <ToggleGroupItem value="right">Right</ToggleGroupItem>
    </ToggleGroup>
  ),
};

// allowEmpty={false}: exactly one item stays pressed — clicking the active
// item does nothing, so the group always has a selection.
export const SingleGroupAlwaysOn: Story = {
  render: () => (
    <ToggleGroup aria-label="View" defaultValue="list" allowEmpty={false}>
      <ToggleGroupItem value="list">List</ToggleGroupItem>
      <ToggleGroupItem value="grid">Grid</ToggleGroupItem>
      <ToggleGroupItem value="table">Table</ToggleGroupItem>
    </ToggleGroup>
  ),
};

// Multiple mode: each item toggles independently.
export const MultipleGroup: Story = {
  render: () => (
    <ToggleGroup type="multiple" aria-label="Text formatting" defaultValue={["bold"]}>
      <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
      <ToggleGroupItem value="italic">Italic</ToggleGroupItem>
      <ToggleGroupItem value="underline">Underline</ToggleGroupItem>
    </ToggleGroup>
  ),
};
