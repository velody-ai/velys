// url=https://www.figma.com/design/tGCZO8dQPK1hwvOHGsjgJS/Velys?node-id=66-26
// source=src/components/Input/Input.tsx
// component=Input
import figma from "figma";

const instance = figma.selectedInstance;

const size = instance.getEnum("Size", {
  Small: "sm",
  Medium: "md",
  Large: "lg",
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
  example: figma.code`<Input size="${size}" placeholder="${placeholder}" ${state === "error" ? "invalid" : ""} ${state === "disabled" ? "disabled" : ""} />`,
  imports: ['import { Input } from "@velody/velys"'],
  id: "input",
  metadata: { nestable: true },
};
