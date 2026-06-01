import type { Meta, StoryObj } from "@storybook/react";
import { VelysProvider } from "./VelysProvider";
import { useTheme } from "../hooks/useTheme";
import { useDisclosure } from "../hooks/useDisclosure";
import { Button } from "../components/Button";
import { Text } from "../components/Text";

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
        <DisclosureDemo />
        <Text size="sm" tone="tertiary">
          Toasts (useToast) live under Components → Toast → “Imperative”.
        </Text>
      </div>
    </VelysProvider>
  ),
};
