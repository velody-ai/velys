import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "./Checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
};
export default meta;
type Story = StoryObj<typeof Checkbox>;

export const States: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Checkbox label="Unchecked" />
      <Checkbox label="Checked" defaultChecked />
      <Checkbox label="Indeterminate" indeterminate />
      <Checkbox label="With description" description="Additional helper text" defaultChecked />
      <Checkbox label="Disabled" disabled />
      <Checkbox label="Invalid" invalid />
    </div>
  ),
};
