// url=https://www.figma.com/design/tGCZO8dQPK1hwvOHGsjgJS/Velys?node-id=93-34
// source=src/components/Radio/Radio.tsx
// component=Radio
import figma from "figma";

const instance = figma.selectedInstance;

const size = instance.getEnum("Size", {
  sm: "sm",
  md: "md",
});
const state = instance.getEnum("State", {
  Unselected: "unselected",
  Selected: "selected",
});
const interaction = instance.getEnum("Interaction", {
  Default: "default",
  Hover: "hover",
  Focus: "focus",
  Disabled: "disabled",
});

export default {
  example: figma.code`<Radio size="${size}" ${state === "selected" ? "defaultChecked" : ""} ${interaction === "disabled" ? "disabled" : ""} label="Label" />`,
  imports: ['import { Radio } from "@velody/velys"'],
  id: "radio",
  metadata: { nestable: true },
};
