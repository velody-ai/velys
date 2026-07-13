import type { Meta, StoryObj } from "@storybook/react";
import { Snippet } from "./Snippet";

const meta: Meta<typeof Snippet> = {
  title: "Components/Snippet",
  component: Snippet,
  args: { text: "npm install @velody/velys" },
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md"] },
  },
};
export default meta;
type Story = StoryObj<typeof Snippet>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Snippet {...args} size="sm" />
      <Snippet {...args} size="md" />
    </div>
  ),
};

export const MultiLine: Story = {
  args: {
    text: [
      "git clone https://github.com/velody-ai/velys.git",
      "cd velys",
      "npm install",
    ],
  },
};

export const NoPrompt: Story = {
  args: { prompt: false, text: "VELYS_TOKEN=xxxxxxxx" },
};

export const NonCopyable: Story = {
  args: { copyable: false },
};
