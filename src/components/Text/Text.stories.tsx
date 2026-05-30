import type { Meta, StoryObj } from "@storybook/react";
import { Text, Code, Kbd } from "./Text";

const meta: Meta<typeof Text> = {
  title: "Components/Text",
  component: Text,
  args: { children: "The quick brown fox jumps over the lazy dog." },
  argTypes: {
    size: { control: "inline-radio", options: ["xs", "sm", "md", "lg", "xl"] },
    weight: { control: "inline-radio", options: ["regular", "medium", "semibold", "bold"] },
    tone: {
      control: "select",
      options: ["primary", "secondary", "tertiary", "brand", "success", "warning", "danger"],
    },
  },
};
export default meta;
type Story = StoryObj<typeof Text>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {(["xl", "lg", "md", "sm", "xs"] as const).map((s) => (
        <Text key={s} size={s}>
          Size {s} — the quick brown fox
        </Text>
      ))}
    </div>
  ),
};

export const Tones: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {(["primary", "secondary", "tertiary", "brand", "success", "warning", "danger"] as const).map(
        (t) => (
          <Text key={t} tone={t}>
            Tone {t}
          </Text>
        ),
      )}
    </div>
  ),
};

export const Truncated: Story = {
  args: { truncate: true },
  render: (args) => (
    <div style={{ width: 220, border: "1px dashed #ccc" }}>
      <Text {...args} />
    </div>
  ),
};

export const InlineCodeAndKbd: Story = {
  render: () => (
    <Text>
      Press <Kbd>⌘</Kbd> <Kbd>K</Kbd> to run <Code>velys build</Code> in the terminal.
    </Text>
  ),
};
