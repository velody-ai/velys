import type { Meta, StoryObj } from "@storybook/react";
import { Link } from "./Link";

const meta: Meta<typeof Link> = {
  title: "Components/Link",
  component: Link,
  args: { children: "Velys documentation", href: "#" },
};
export default meta;
type Story = StoryObj<typeof Link>;

export const Playground: Story = {};

export const Tones: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <Link href="#" tone="brand">Brand link</Link>
      <Link href="#" tone="neutral">Neutral link</Link>
      <p style={{ margin: 0 }}>
        Inline text with an <Link href="#" tone="inherit" underline="always">inherit link</Link> inside.
      </p>
    </div>
  ),
};

export const Underlines: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <Link href="#" underline="hover">Underline on hover</Link>
      <Link href="#" underline="always">Always underlined</Link>
      <Link href="#" underline="none">Never underlined</Link>
    </div>
  ),
};

export const External: Story = {
  args: {
    href: "https://vercel.com/geist",
    external: true,
    children: "Geist design system",
  },
};
