import type { Meta, StoryObj } from "@storybook/react";
import { Radio, RadioGroup } from "./Radio";

const meta: Meta<typeof Radio> = {
  title: "Components/Radio",
  component: Radio,
};
export default meta;
type Story = StoryObj<typeof Radio>;

export const Group: Story = {
  render: () => (
    <RadioGroup>
      <Radio name="plan" value="free" label="Free" defaultChecked />
      <Radio name="plan" value="pro" label="Pro" description="$20/mo" />
      <Radio name="plan" value="enterprise" label="Enterprise" />
      <Radio name="plan" value="x" label="Disabled" disabled />
    </RadioGroup>
  ),
};
