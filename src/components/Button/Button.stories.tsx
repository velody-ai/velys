import { useState } from "react";
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

// The `loading` prop renders a Spinner (tone="current", so it inherits the
// button's label color) and disables the button. It reads correctly on every
// color × variant — including brand (primary) and secondary solid fills.
export const Loading: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {(["primary", "secondary", "destructive"] as const).map((c) => (
        <div key={c} style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <Button color={c} loading>
            Saving
          </Button>
          <Button color={c} variant="outline" loading>
            Saving
          </Button>
          <Button color={c} variant="ghost" loading>
            Saving
          </Button>
        </div>
      ))}
    </div>
  ),
};

// Interactive: click to enter the loading state, auto-resets after ~1.6s.
export const LoadingInteractive: Story = {
  render: () => {
    function Demo({ color }: { color: "primary" | "secondary" }) {
      const [loading, setLoading] = useState(false);
      const run = () => {
        setLoading(true);
        setTimeout(() => setLoading(false), 1600);
      };
      return (
        <Button color={color} loading={loading} onClick={run}>
          {loading ? "Saving…" : "Save changes"}
        </Button>
      );
    }
    return (
      <div style={{ display: "flex", gap: 12 }}>
        <Demo color="primary" />
        <Demo color="secondary" />
      </div>
    );
  },
};
