// url=https://www.figma.com/design/tGCZO8dQPK1hwvOHGsjgJS/Velys?node-id=106-47
// source=src/components/Select/Select.tsx
// component=Select
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
  Disabled: "disabled",
});
const textLayers = instance.findLayers((n) => n.type === "TEXT");
const placeholderNode = textLayers[0];
const placeholder =
  placeholderNode && placeholderNode.type === "TEXT"
    ? placeholderNode.textContent
    : "Select an option";

export default {
  example: figma.code`<Select size="${size}" placeholder="${placeholder}" ${state === "disabled" ? "disabled" : ""}>
  <option value="option">Option</option>
</Select>`,
  imports: ['import { Select } from "@velody/velys"'],
  id: "select",
  metadata: { nestable: true },
};
