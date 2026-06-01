import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { VelysProvider } from "./VelysProvider";
import { useTheme } from "../hooks/useTheme";
import { useToast } from "../hooks/useToast";
import { useDisclosure } from "../hooks/useDisclosure";
import { Button } from "../components/Button";
import { Text } from "../components/Text";
import type { ToastPosition } from "./context";

const meta: Meta<typeof VelysProvider> = {
  title: "Foundations/Provider",
  component: VelysProvider,
};
export default meta;
type Story = StoryObj<typeof VelysProvider>;

function ThemeDemo() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <Text>Current theme: {theme}</Text>
      <Button onClick={toggleTheme}>Toggle theme</Button>
    </div>
  );
}

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

function ToastDemo() {
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

function DisclosureDemo() {
  const { open, onToggle } = useDisclosure();
  return (
    <div>
      <Button onClick={onToggle}>{open ? "Hide" : "Show"} details</Button>
      {open && <Text style={{ marginTop: 8 }}>Disclosure content.</Text>}
    </div>
  );
}

export const Playground: Story = {
  render: () => (
    <VelysProvider>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <ThemeDemo />
        <ToastDemo />
        <DisclosureDemo />
      </div>
    </VelysProvider>
  ),
};

export const Toasts: Story = {
  name: "Toasts (position + stacking)",
  render: () => (
    <VelysProvider>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <Text size="lg" weight="semibold">
          Imperative toasts
        </Text>
        <Text size="sm" tone="secondary">
          Pick a corner, then fire one or stack several. Each toast pops in, auto-dismisses, and pops
          out — newest sits closest to the anchored edge.
        </Text>
        <ToastDemo />
      </div>
    </VelysProvider>
  ),
};
