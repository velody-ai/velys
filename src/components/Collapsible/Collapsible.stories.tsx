import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "./Collapsible";
import { ChevronDownIcon } from "../icons";

const meta: Meta<typeof Collapsible> = {
  title: "Components/Collapsible",
  component: Collapsible,
};
export default meta;
type Story = StoryObj<typeof Collapsible>;

const panelStyle: React.CSSProperties = {
  padding: "8px 0",
  fontSize: 14,
  color: "var(--velys-color-text-secondary, inherit)",
};

export const Playground: Story = {
  render: () => (
    <div style={{ width: 360 }}>
      <Collapsible>
        <CollapsibleTrigger>Show details</CollapsibleTrigger>
        <CollapsibleContent>
          <div style={panelStyle}>
            Collapsible keeps its content mounted and animates height with a CSS
            grid-rows transition, just like Accordion.
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  ),
};

export const DefaultOpen: Story = {
  render: () => (
    <div style={{ width: 360 }}>
      <Collapsible defaultOpen>
        <CollapsibleTrigger>Hide details</CollapsibleTrigger>
        <CollapsibleContent>
          <div style={panelStyle}>Starts open via defaultOpen.</div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  ),
};

function ControlledDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ width: 360, display: "flex", flexDirection: "column", gap: 8 }}>
      <button type="button" onClick={() => setOpen((v) => !v)}>
        External toggle (open: {String(open)})
      </button>
      <Collapsible open={open} onOpenChange={setOpen}>
        <CollapsibleTrigger>Toggle from inside</CollapsibleTrigger>
        <CollapsibleContent>
          <div style={panelStyle}>State is owned by the parent component.</div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
export const Controlled: Story = { render: () => <ControlledDemo /> };

export const Disabled: Story = {
  render: () => (
    <div style={{ width: 360 }}>
      <Collapsible disabled>
        <CollapsibleTrigger>Can't open me</CollapsibleTrigger>
        <CollapsibleContent>
          <div style={panelStyle}>Never shown.</div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  ),
};

export const CustomTrigger: Story = {
  render: () => (
    <div style={{ width: 360 }}>
      <style>{`
        .velys-story-chevron { transition: transform 250ms cubic-bezier(0.2, 0, 0, 1); }
        [data-state="open"] > .velys-story-chevron { transform: rotate(180deg); }
      `}</style>
      <Collapsible>
        <CollapsibleTrigger
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            fontWeight: 500,
          }}
        >
          Advanced options
          <ChevronDownIcon className="velys-story-chevron" />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div style={panelStyle}>
            The chevron rotates by styling <code>[data-state="open"]</code> on the trigger.
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  ),
};
