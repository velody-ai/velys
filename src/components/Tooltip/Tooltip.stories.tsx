import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip } from "./Tooltip";
import { Button } from "../Button";

const meta: Meta<typeof Tooltip> = {
  title: "Components/Tooltip",
  component: Tooltip,
};
export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Sides: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 48, padding: 48 }}>
      <Tooltip content="Top tooltip" side="top"><Button variant="outline">Top</Button></Tooltip>
      <Tooltip content="Bottom tooltip" side="bottom"><Button variant="outline">Bottom</Button></Tooltip>
      <Tooltip content="Left tooltip" side="left"><Button variant="outline">Left</Button></Tooltip>
      <Tooltip content="Right tooltip" side="right"><Button variant="outline">Right</Button></Tooltip>
    </div>
  ),
};

export const AlwaysOpen: Story = {
  render: () => (
    <div style={{ padding: 48 }}>
      <Tooltip content="Always visible" side="top" open><Button>Hover me</Button></Tooltip>
    </div>
  ),
};
