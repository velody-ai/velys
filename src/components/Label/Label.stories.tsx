import type { Meta, StoryObj } from "@storybook/react";
import { Label, Field } from "./Label";
import { Input } from "../Input";
import { Select } from "../Select";
import { Textarea } from "../Textarea";

const meta: Meta<typeof Label> = {
  title: "Components/Label",
  component: Label,
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof Label>;

export const Playground: Story = {
  args: { children: "Email", htmlFor: "email" },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Label size="sm">Small label</Label>
      <Label size="md">Medium label</Label>
      <Label size="lg">Large label</Label>
    </div>
  ),
};

export const Required: Story = {
  args: { children: "Full name", required: true },
};

/** Inside a <Field>, the label turns brand-colored while the control is focused. Click the input. */
export const WithInput: Story = {
  render: () => (
    <Field style={{ width: 280 }}>
      <Label htmlFor="email">Email</Label>
      <Input id="email" placeholder="you@example.com" />
    </Field>
  ),
};

/** <Field invalid> turns the label red and the control's border red. */
export const ErrorState: Story = {
  render: () => (
    <Field invalid style={{ width: 280 }}>
      <Label htmlFor="email-err" required>
        Email
      </Label>
      <Input id="email-err" invalid defaultValue="not-an-email" />
    </Field>
  ),
};

export const WithSelect: Story = {
  render: () => (
    <Field style={{ width: 280 }}>
      <Label htmlFor="plan">Plan</Label>
      <Select id="plan">
        <option value="">Choose a plan</option>
        <option value="free">Free</option>
        <option value="pro">Pro</option>
      </Select>
    </Field>
  ),
};

export const WithTextarea: Story = {
  render: () => (
    <Field style={{ width: 320 }}>
      <Label htmlFor="bio">Bio</Label>
      <Textarea id="bio" placeholder="Tell us about yourself" />
    </Field>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Field disabled style={{ width: 280 }}>
      <Label htmlFor="disabled-input">Disabled field</Label>
      <Input id="disabled-input" disabled defaultValue="Can't edit" />
    </Field>
  ),
};
