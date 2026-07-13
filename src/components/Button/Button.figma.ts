// url=https://www.figma.com/design/tGCZO8dQPK1hwvOHGsjgJS/Velys?node-id=38-155
// source=src/components/Button/Button.tsx
// component=Button
import figma from "figma";

const instance = figma.selectedInstance;

const color = instance.getEnum("Color", {
  Primary: "primary",
  Secondary: "secondary",
  Destructive: "destructive",
});
const variant = instance.getEnum("Variant", {
  Solid: "solid",
  Outline: "outline",
  Ghost: "ghost",
});
const size = instance.getEnum("Size", {
  Mini: "mini",
  Small: "small",
  Medium: "medium",
  Large: "large",
});
// Figma `State` (Default/Hover) is interaction-only — no code prop.
const textLayers = instance.findLayers((n) => n.type === "TEXT");
const labelNode = textLayers[0];
const label = labelNode && labelNode.type === "TEXT" ? labelNode.textContent : "Button";

export default {
  example: figma.code`<Button color="${color}" variant="${variant}" size="${size}">${label}</Button>`,
  imports: ['import { Button } from "@velody/velys"'],
  id: "button",
  metadata: { nestable: true },
};
