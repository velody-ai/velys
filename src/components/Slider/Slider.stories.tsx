import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Slider } from "./Slider";
import { Text } from "../Text";

const meta: Meta<typeof Slider> = {
  title: "Components/Slider",
  component: Slider,
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md"] },
  },
};
export default meta;
type Story = StoryObj<typeof Slider>;

export const Playground: Story = {
  render: (args) => {
    const [value, setValue] = useState(40);
    return (
      <div style={{ width: 280 }}>
        <Slider {...args} value={value} onChange={setValue} aria-label="Volume" />
        <Text size="sm" tone="secondary" style={{ marginTop: 8 }}>
          Value: {value}
        </Text>
      </div>
    );
  },
};

export const Steps: Story = {
  render: () => {
    const [value, setValue] = useState(50);
    return (
      <div style={{ width: 280 }}>
        <Slider value={value} onChange={setValue} step={10} aria-label="Brightness" />
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div style={{ width: 280 }}>
      <Slider value={30} disabled aria-label="Disabled" />
    </div>
  ),
};
