// url=https://www.figma.com/design/tGCZO8dQPK1hwvOHGsjgJS/Velys?node-id=288-15
// source=src/components/Collapsible/Collapsible.tsx
// component=Collapsible
import figma from "figma";

const instance = figma.selectedInstance;

const trigger = instance.getString("Trigger");
const content = instance.getString("Content");
const state = instance.getEnum("State", {
  Closed: "closed",
  Open: "open",
});

export default {
  example: figma.code`<Collapsible ${state === "open" ? "defaultOpen" : ""}>
  <CollapsibleTrigger>${trigger}</CollapsibleTrigger>
  <CollapsibleContent>${content}</CollapsibleContent>
</Collapsible>`,
  imports: [
    'import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@velody/velys"',
  ],
  id: "collapsible",
  metadata: { nestable: false },
};
