import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { DatePicker } from "./DatePicker";

const meta: Meta<typeof DatePicker> = {
  title: "Components/DatePicker",
  component: DatePicker,
  render: (args) => (
    <div style={{ width: 240 }}>
      <DatePicker aria-label="Date" {...args} />
    </div>
  ),
};
export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, width: 240 }}>
      {(["sm", "md", "lg"] as const).map((size) => (
        <DatePicker
          key={size}
          size={size}
          aria-label={`Date (${size})`}
          defaultValue={new Date(2026, 5, 15)}
        />
      ))}
    </div>
  ),
};

export const Invalid: Story = {
  args: { invalid: true },
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: new Date(2026, 5, 15) },
};

export const MinMax: Story = {
  args: {
    defaultValue: new Date(2026, 5, 15),
    min: new Date(2026, 5, 8),
    max: new Date(2026, 6, 24),
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState<Date | null>(new Date(2026, 5, 15));
    return (
      <div style={{ display: "grid", gap: 12, width: 240 }}>
        <DatePicker aria-label="Date" value={value} onValueChange={setValue} />
        <div style={{ fontSize: 13 }}>Value: {value ? value.toDateString() : "null"}</div>
      </div>
    );
  },
};

export const WithFormName: Story = {
  render: () => (
    <form
      style={{ width: 240 }}
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        alert(`birthday = ${data.get("birthday")}`);
      }}
    >
      <DatePicker aria-label="Birthday" name="birthday" defaultValue={new Date(2026, 5, 15)} />
    </form>
  ),
};
