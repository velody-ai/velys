import type { Meta, StoryObj } from "@storybook/react";
import { Heading } from "./Heading";

const meta: Meta<typeof Heading> = {
  title: "Components/Heading",
  component: Heading,
  args: { children: "The quick brown fox" },
  argTypes: {
    level: { control: "inline-radio", options: [1, 2, 3, 4] },
    size: { control: "inline-radio", options: ["display", "h1", "h2", "h3", "h4"] },
  },
};
export default meta;
type Story = StoryObj<typeof Heading>;

export const Playground: Story = {};

export const Scale: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Heading size="display">Display</Heading>
      <Heading level={1}>Heading 1</Heading>
      <Heading level={2}>Heading 2</Heading>
      <Heading level={3}>Heading 3</Heading>
      <Heading level={4}>Heading 4</Heading>
    </div>
  ),
};
