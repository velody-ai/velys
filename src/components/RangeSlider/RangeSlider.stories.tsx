import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { RangeSlider } from "./RangeSlider";
import { Text } from "../Text";

const meta: Meta<typeof RangeSlider> = {
  title: "Components/RangeSlider",
  component: RangeSlider,
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md"] },
  },
};
export default meta;
type Story = StoryObj<typeof RangeSlider>;

export const Playground: Story = {
  render: (args) => {
    const [value, setValue] = useState<[number, number]>([20, 60]);
    return (
      <div style={{ width: 280 }}>
        <RangeSlider {...args} value={value} onChange={setValue} />
        <Text size="sm" tone="secondary" style={{ marginTop: 8 }}>
          Value: {value[0]} – {value[1]}
        </Text>
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => (
    <div
      style={{ width: 280, display: "flex", flexDirection: "column", gap: 20 }}
    >
      <RangeSlider defaultValue={[20, 60]} size="sm" />
      <RangeSlider defaultValue={[20, 60]} size="md" />
    </div>
  ),
};

export const MinDistance: Story = {
  render: () => {
    const [value, setValue] = useState<[number, number]>([40, 60]);
    return (
      <div style={{ width: 280 }}>
        <RangeSlider value={value} onChange={setValue} minDistance={10} />
        <Text size="sm" tone="secondary" style={{ marginTop: 8 }}>
          The thumbs keep a gap of at least 10.
        </Text>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div style={{ width: 280 }}>
      <RangeSlider value={[30, 70]} disabled />
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState<[number, number]>([25, 75]);
    const [committed, setCommitted] = useState<[number, number]>([25, 75]);
    return (
      <div style={{ width: 280 }}>
        <RangeSlider
          value={value}
          onChange={setValue}
          onChangeEnd={setCommitted}
          step={5}
          thumbLabels={["Lowest price", "Highest price"]}
        />
        <Text size="sm" tone="secondary" style={{ marginTop: 8 }}>
          Live: {value[0]}–{value[1]} · Committed: {committed[0]}–
          {committed[1]}
        </Text>
      </div>
    );
  },
};
