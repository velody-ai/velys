import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "./Textarea";

const meta: Meta<typeof Textarea> = {
  title: "Components/Textarea",
  component: Textarea,
  args: { placeholder: "Placeholder" },
  render: (args) => <div style={{ width: 320 }}><Textarea {...args} /></div>,
};
export default meta;
type Story = StoryObj<typeof Textarea>;

export const Playground: Story = {};
export const Invalid: Story = { args: { invalid: true, defaultValue: "Too short" } };
export const Disabled: Story = { args: { disabled: true, defaultValue: "Disabled" } };
