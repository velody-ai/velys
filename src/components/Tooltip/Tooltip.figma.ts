// url=https://www.figma.com/design/tGCZO8dQPK1hwvOHGsjgJS/Velys?node-id=97-18
// source=src/components/Tooltip/Tooltip.tsx
// component=Tooltip
import figma from "figma";

const instance = figma.selectedInstance;

const side = instance.getEnum("Side", {
  Top: "top",
  Bottom: "bottom",
  Left: "left",
  Right: "right",
});
const textLayers = instance.findLayers((n) => n.type === "TEXT");
const contentNode = textLayers[0];
const content =
  contentNode && contentNode.type === "TEXT" ? contentNode.textContent : "Tooltip";

export default {
  example: figma.code`<Tooltip content="${content}" side="${side}">
  <Button variant="outline">Hover me</Button>
</Tooltip>`,
  imports: ['import { Tooltip, Button } from "@velody/velys"'],
  id: "tooltip",
  metadata: { nestable: true },
};
