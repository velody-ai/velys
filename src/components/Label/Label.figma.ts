// url=https://www.figma.com/design/tGCZO8dQPK1hwvOHGsjgJS/Velys?node-id=151-26
// source=src/components/Label/Label.tsx
// component=Label
import figma from "figma";

const instance = figma.selectedInstance;

const text = instance.getString("text");
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

export default {
  example: figma.code`<Label size="${size}" htmlFor="field" ${state === "error" ? "error" : ""} ${state === "disabled" ? "disabled" : ""}>${text}</Label>`,
  imports: ['import { Label } from "@velody/velys"'],
  id: "label",
  metadata: { nestable: true },
};
