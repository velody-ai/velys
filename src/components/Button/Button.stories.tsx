import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  args: { children: "Button" },
  argTypes: {
    variant: { control: "inline-radio", options: ["solid", "outline", "ghost"] },
    color: { control: "inline-radio", options: ["primary", "secondary", "destructive"] },
    size: { control: "inline-radio", options: ["mini", "small", "medium", "large"] },
  },
};
export default meta;
type Story = StoryObj<typeof Button>;

export const Playground: Story = {};

export const Colors: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {(["primary", "secondary", "destructive"] as const).map((c) => (
        <div key={c} style={{ display: "flex", gap: 12 }}>
          <Button color={c} variant="solid">Solid</Button>
          <Button color={c} variant="outline">Outline</Button>
          <Button color={c} variant="ghost">Ghost</Button>
        </div>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <Button {...args} size="mini">Mini</Button>
      <Button {...args} size="small">Small</Button>
      <Button {...args} size="medium">Medium</Button>
      <Button {...args} size="large">Large</Button>
    </div>
  ),
};

export const Disabled: Story = { args: { disabled: true } };

export const Loading: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <Button {...args} loading>
        Saving
      </Button>
      <Button {...args} loading variant="outline">
        Saving
      </Button>
      <Button {...args} loading variant="ghost">
        Saving
      </Button>
    </div>
  ),
};
