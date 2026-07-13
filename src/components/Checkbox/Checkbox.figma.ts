// url=https://www.figma.com/design/tGCZO8dQPK1hwvOHGsjgJS/Velys?node-id=92-58
// source=src/components/Checkbox/Checkbox.tsx
// component=Checkbox
import figma from "figma";

const instance = figma.selectedInstance;

const size = instance.getEnum("Size", {
  sm: "sm",
  md: "md",
});
const state = instance.getEnum("State", {
  Unchecked: "unchecked",
  Checked: "checked",
  Indeterminate: "indeterminate",
});
const interaction = instance.getEnum("Interaction", {
  Default: "default",
  Hover: "hover",
  Focus: "focus",
  Disabled: "disabled",
});

export default {
  example: figma.code`<Checkbox size="${size}" ${state === "checked" ? "defaultChecked" : ""} ${state === "indeterminate" ? "indeterminate" : ""} ${interaction === "disabled" ? "disabled" : ""} label="Label" />`,
  imports: ['import { Checkbox } from "@velody/velys"'],
  id: "checkbox",
  metadata: { nestable: true },
};
