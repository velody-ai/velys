import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from "./Switch";

const meta: Meta<typeof Switch> = {
  title: "Components/Switch",
  component: Switch,
};
export default meta;
type Story = StoryObj<typeof Switch>;

export const States: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Switch label="Off" />
      <Switch label="On" defaultChecked />
      <Switch size="sm" label="Small on" defaultChecked />
      <Switch label="Disabled" disabled />
    </div>
  ),
};
