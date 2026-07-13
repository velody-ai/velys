// url=https://www.figma.com/design/tGCZO8dQPK1hwvOHGsjgJS/Velys?node-id=182-12
// source=src/components/Accordion/Accordion.tsx
// component=Accordion
import figma from "figma";

const instance = figma.selectedInstance;

const state = instance.getEnum("State", {
  Collapsed: "collapsed",
  Expanded: "expanded",
});
const textLayers = instance.findLayers((n) => n.type === "TEXT");
const triggerNode = textLayers[0];
const trigger =
  triggerNode && triggerNode.type === "TEXT" ? triggerNode.textContent : "Question";
const contentNode = textLayers[1];
const content = contentNode && contentNode.type === "TEXT" ? contentNode.textContent : "Answer";

export default {
  example: figma.code`<Accordion type="single" ${state === "expanded" ? 'defaultValue="item-1"' : ""}>
  <AccordionItem value="item-1">
    <AccordionTrigger>${trigger}</AccordionTrigger>
    <AccordionContent>${content}</AccordionContent>
  </AccordionItem>
</Accordion>`,
  imports: [
    'import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@velody/velys"',
  ],
  id: "accordion",
  metadata: { nestable: false },
};
