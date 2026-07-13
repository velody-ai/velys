import type { Meta, StoryObj } from "@storybook/react";
import { Calendar } from "./Calendar";

const meta: Meta<typeof Calendar> = {
  title: "Components/Calendar",
  component: Calendar,
};
export default meta;
type Story = StoryObj<typeof Calendar>;

export const Playground: Story = {};

export const WithValue: Story = {
  args: { defaultValue: new Date(2026, 5, 15) },
};

export const MinMax: Story = {
  args: {
    defaultMonth: new Date(2026, 5, 1),
    min: new Date(2026, 5, 8),
    max: new Date(2026, 5, 24),
  },
};

export const DisabledDates: Story = {
  args: {
    defaultMonth: new Date(2026, 5, 1),
    isDateDisabled: (date) => date.getDay() === 0 || date.getDay() === 6,
  },
};

export const WeekStartsMonday: Story = {
  args: { weekStartsOn: 1, defaultMonth: new Date(2026, 5, 1) },
};

export const Locale: Story = {
  args: { locale: "de-DE", defaultMonth: new Date(2026, 5, 1), weekStartsOn: 1 },
};
