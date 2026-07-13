// url=https://www.figma.com/design/tGCZO8dQPK1hwvOHGsjgJS/Velys?node-id=287-39
// source=src/components/Toggle/Toggle.tsx
// component=Toggle
import figma from "figma";

const instance = figma.selectedInstance;

const label = instance.getString("Label");
const size = instance.getEnum("Size", {
  Small: "small",
  Medium: "medium",
  Large: "large",
});
const pressed = instance.getEnum("Pressed", {
  False: "false",
  True: "true",
});
const state = instance.getEnum("State", {
  Default: "default",
  Hover: "hover",
  Disabled: "disabled",
});

export default {
  example: figma.code`<Toggle size="${size}" ${pressed === "true" ? "defaultPressed" : ""} ${state === "disabled" ? "disabled" : ""}>${label}</Toggle>`,
  imports: ['import { Toggle } from "@velody/velys"'],
  id: "toggle",
  metadata: { nestable: true },
};
