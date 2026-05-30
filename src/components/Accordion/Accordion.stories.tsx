import type { Meta, StoryObj } from "@storybook/react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./Accordion";

const meta: Meta<typeof Accordion> = {
  title: "Components/Accordion",
  component: Accordion,
};
export default meta;
type Story = StoryObj<typeof Accordion>;

const items = [
  { value: "a", q: "What is Velys?", a: "A vanilla-extract React component library." },
  { value: "b", q: "Does it support dark mode?", a: "Yes, via the light/dark theme classes." },
  { value: "c", q: "Is it tree-shakeable?", a: "Yes — components ship as ESM with sideEffects set." },
];

export const Playground: Story = {
  render: () => (
    <div style={{ width: 420 }}>
      <Accordion type="single" defaultValue="a">
        {items.map((it) => (
          <AccordionItem key={it.value} value={it.value}>
            <AccordionTrigger>{it.q}</AccordionTrigger>
            <AccordionContent>{it.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  ),
};

export const Multiple: Story = {
  render: () => (
    <div style={{ width: 420 }}>
      <Accordion type="multiple" defaultValue={["a", "b"]} variant="separated">
        {items.map((it) => (
          <AccordionItem key={it.value} value={it.value}>
            <AccordionTrigger>{it.q}</AccordionTrigger>
            <AccordionContent>{it.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  ),
};
