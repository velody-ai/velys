// url=https://www.figma.com/design/tGCZO8dQPK1hwvOHGsjgJS/Velys?node-id=62-26
// source=src/components/Badge/Badge.tsx
// component=Badge
import figma from "figma";

const instance = figma.selectedInstance;

const color = instance.getEnum("Color", {
  Neutral: "neutral",
  Brand: "brand",
  Success: "success",
  Warning: "warning",
  Danger: "danger",
  Info: "info",
});
const variant = instance.getEnum("Variant", {
  Solid: "solid",
  Subtle: "subtle",
});
const textLayers = instance.findLayers((n) => n.type === "TEXT");
const labelNode = textLayers[0];
const label = labelNode && labelNode.type === "TEXT" ? labelNode.textContent : "Badge";

export default {
  example: figma.code`<Badge color="${color}" variant="${variant}">${label}</Badge>`,
  imports: ['import { Badge } from "@velody/velys"'],
  id: "badge",
  metadata: { nestable: true },
};
