// url=https://www.figma.com/design/tGCZO8dQPK1hwvOHGsjgJS/Velys?node-id=98-50
// source=src/components/Textarea/Textarea.tsx
// component=Textarea
import figma from "figma";

const instance = figma.selectedInstance;

const size = instance.getEnum("Size", {
  sm: "sm",
  md: "md",
  lg: "lg",
});
const state = instance.getEnum("State", {
  Default: "default",
  Focus: "focus",
  Error: "error",
  Disabled: "disabled",
});
const textLayers = instance.findLayers((n) => n.type === "TEXT");
const placeholderNode = textLayers[0];
const placeholder =
  placeholderNode && placeholderNode.type === "TEXT" ? placeholderNode.textContent : "Placeholder";

export default {
  example: figma.code`<Textarea size="${size}" placeholder="${placeholder}" ${state === "error" ? "invalid" : ""} ${state === "disabled" ? "disabled" : ""} />`,
  imports: ['import { Textarea } from "@velody/velys"'],
  id: "textarea",
  metadata: { nestable: true },
};
