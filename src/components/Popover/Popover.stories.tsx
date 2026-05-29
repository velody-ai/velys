import type { Meta, StoryObj } from "@storybook/react";
import { Popover, PopoverTrigger, PopoverContent } from "./Popover";
import { Button } from "../Button";
import { Text } from "../Text";
import { Heading } from "../Heading";

const meta: Meta<typeof Popover> = {
  title: "Components/Popover",
  component: Popover,
};
export default meta;
type Story = StoryObj<typeof Popover>;

export const Playground: Story = {
  render: () => (
    <div style={{ display: "flex", justifyContent: "center", padding: 80 }}>
      <Popover>
        <PopoverTrigger>
          <Button>Open popover</Button>
        </PopoverTrigger>
        <PopoverContent side="bottom" align="center">
          <Heading level={4} size="h4" style={{ marginBottom: 4 }}>
            Dimensions
          </Heading>
          <Text size="sm" tone="secondary">
            Set the width and height of the element.
          </Text>
        </PopoverContent>
      </Popover>
    </div>
  ),
};

export const Sides: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 24, justifyContent: "center", padding: 120 }}>
      {(["top", "bottom", "left", "right"] as const).map((side) => (
        <Popover key={side}>
          <PopoverTrigger>
            <Button variant="outline">{side}</Button>
          </PopoverTrigger>
          <PopoverContent side={side}>
            <Text size="sm">Placed on {side}.</Text>
          </PopoverContent>
        </Popover>
      ))}
    </div>
  ),
};
