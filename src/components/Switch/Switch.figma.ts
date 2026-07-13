// url=https://www.figma.com/design/tGCZO8dQPK1hwvOHGsjgJS/Velys?node-id=94-34
// source=src/components/Switch/Switch.tsx
// component=Switch
import figma from "figma";

const instance = figma.selectedInstance;

const size = instance.getEnum("Size", {
  sm: "sm",
  md: "md",
});
const state = instance.getEnum("State", {
  Off: "off",
  On: "on",
});
const interaction = instance.getEnum("Interaction", {
  Default: "default",
  Hover: "hover",
  Focus: "focus",
  Disabled: "disabled",
});

export default {
  example: figma.code`<Switch size="${size}" ${state === "on" ? "defaultChecked" : ""} ${interaction === "disabled" ? "disabled" : ""} label="Label" />`,
  imports: ['import { Switch } from "@velody/velys"'],
  id: "switch",
  metadata: { nestable: true },
};
