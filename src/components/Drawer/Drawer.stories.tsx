import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Drawer } from "./Drawer";
import { Button } from "../Button";
import { Text } from "../Text";

const meta: Meta<typeof Drawer> = {
  title: "Components/Drawer",
  component: Drawer,
};
export default meta;
type Story = StoryObj<typeof Drawer>;

export const Playground: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open drawer</Button>
        <Drawer
          open={open}
          onClose={() => setOpen(false)}
          title="Settings"
          footer={
            <>
              <Button variant="ghost" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setOpen(false)}>Save</Button>
            </>
          }
        >
          <Text>Drawer body content goes here.</Text>
        </Drawer>
      </>
    );
  },
};

export const Sides: Story = {
  render: () => {
    const [side, setSide] = useState<null | "left" | "right" | "top" | "bottom">(null);
    return (
      <div style={{ display: "flex", gap: 12 }}>
        {(["left", "right", "top", "bottom"] as const).map((s) => (
          <Button key={s} variant="outline" onClick={() => setSide(s)}>
            {s}
          </Button>
        ))}
        <Drawer open={side !== null} onClose={() => setSide(null)} side={side ?? "right"} title={`Side: ${side}`}>
          <Text>Opened from {side}.</Text>
        </Drawer>
      </div>
    );
  },
};
