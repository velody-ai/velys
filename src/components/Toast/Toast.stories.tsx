import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Toast } from "./Toast";
import { VelysProvider } from "../../provider/VelysProvider";
import { useToast } from "../../hooks/useToast";
import type { ToastPosition } from "../../provider/context";
import { Button } from "../Button";
import { Text } from "../Text";

const meta: Meta<typeof Toast> = {
  title: "Components/Toast",
  component: Toast,
  args: { title: "Notification title", description: "Supporting message describing what happened." },
};
export default meta;
type Story = StoryObj<typeof Toast>;

const statuses = ["info", "success", "warning", "danger", "neutral"] as const;

export const Statuses: Story = {
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {statuses.map((s) => <Toast key={s} {...args} status={s} onClose={() => {}} />)}
    </div>
  ),
};

export const WithAction: Story = {
  args: { status: "success", actionLabel: "View details", onAction: () => {}, onClose: () => {} },
};

/* ----------------------------------------------------------------------------
 * Imperative usage — fire toasts from anywhere via `useToast()` inside a
 * `<VelysProvider>`. Toasts pop in/out, auto-dismiss, and stack per position.
 * -------------------------------------------------------------------------- */

const POSITIONS: ToastPosition[] = [
  "top-left",
  "top-center",
  "top-right",
  "bottom-left",
  "bottom-center",
  "bottom-right",
];

const SAMPLES = [
  { status: "success", title: "Saved", description: "Your changes are live." },
  { status: "info", title: "Heads up", description: "A new version is available." },
  { status: "warning", title: "Almost full", description: "Storage is at 90%." },
  { status: "danger", title: "Upload failed", description: "Check your connection and retry." },
] as const;

function ToastLab() {
  const { toast, clear } = useToast();
  const [position, setPosition] = useState<ToastPosition>("bottom-right");
  let n = 0;
  const fire = () => {
    const s = SAMPLES[n % SAMPLES.length];
    n += 1;
    toast({ ...s, position });
  };
  const fireStack = () => SAMPLES.forEach((s, i) => toast({ ...s, position, duration: 6000 + i * 400 }));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Text size="lg" weight="semibold">
        Imperative toasts · useToast()
      </Text>
      <Text size="sm" tone="secondary">
        Pick a corner, then fire one or stack several. Each toast pops in, auto-dismisses, and pops
        out — newest sits closest to the anchored edge.
      </Text>
      <Text size="sm" tone="secondary">
        Position
      </Text>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, auto)", gap: 8, width: "fit-content" }}>
        {POSITIONS.map((p) => (
          <Button
            key={p}
            size="small"
            variant={p === position ? "solid" : "outline"}
            onClick={() => setPosition(p)}
          >
            {p}
          </Button>
        ))}
      </div>
      <div style={{ display: "flex", gap: 12, marginTop: 4 }}>
        <Button onClick={fire}>Show toast</Button>
        <Button variant="outline" onClick={fireStack}>
          Stack 4
        </Button>
        <Button variant="ghost" onClick={clear}>
          Clear all
        </Button>
      </div>
    </div>
  );
}

export const Imperative: Story = {
  name: "Imperative (position + stacking)",
  render: () => (
    <VelysProvider>
      <ToastLab />
    </VelysProvider>
  ),
};
