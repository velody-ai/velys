import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { NumberInput } from "./NumberInput";

const meta: Meta<typeof NumberInput> = {
  title: "Components/NumberInput",
  component: NumberInput,
  args: { "aria-label": "Quantity", placeholder: "0" },
};
export default meta;
type Story = StoryObj<typeof NumberInput>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, width: 280 }}>
      <NumberInput size="sm" aria-label="Small" placeholder="Small" />
      <NumberInput size="md" aria-label="Medium" placeholder="Medium" />
      <NumberInput size="lg" aria-label="Large" placeholder="Large" />
    </div>
  ),
};

export const MinMaxStep: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, width: 280 }}>
      <NumberInput aria-label="0 to 10" min={0} max={10} defaultValue={5} />
      <NumberInput aria-label="Step 0.5" min={0} max={5} step={0.5} defaultValue={2.5} />
      <NumberInput aria-label="Hundreds" min={-1000} max={1000} step={100} defaultValue={0} />
    </div>
  ),
};

export const Invalid: Story = {
  args: { invalid: true, defaultValue: -1, min: 0, "aria-label": "Invalid quantity" },
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, width: 280 }}>
      <NumberInput aria-label="Disabled (empty)" disabled />
      <NumberInput aria-label="Disabled with value" disabled defaultValue={42} />
    </div>
  ),
};

function ControlledDemo() {
  const [value, setValue] = useState<number | null>(3);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, width: 280 }}>
      <NumberInput aria-label="Controlled" min={0} max={10} value={value} onValueChange={setValue} />
      <span style={{ fontSize: 13 }}>value: {value === null ? "null" : value}</span>
      <button type="button" onClick={() => setValue(10)}>
        Set to max (10)
      </button>
    </div>
  );
}

export const Controlled: Story = {
  render: () => <ControlledDemo />,
};
