// url=https://www.figma.com/design/tGCZO8dQPK1hwvOHGsjgJS/Velys?node-id=289-84
// source=src/components/NumberInput/NumberInput.tsx
// component=NumberInput
import figma from "figma";

const instance = figma.selectedInstance;

const value = instance.getString("Value");
const size = instance.getEnum("Size", {
  Sm: "sm",
  Md: "md",
  Lg: "lg",
});
const state = instance.getEnum("State", {
  Default: "default",
  Invalid: "invalid",
  Disabled: "disabled",
});
const numericValue = Number.isFinite(Number(value)) && value !== "" ? value : "100";

export default {
  example: figma.code`<NumberInput defaultValue={${numericValue}} size="${size}" aria-label="Amount" ${state === "invalid" ? "invalid" : ""} ${state === "disabled" ? "disabled" : ""} />`,
  imports: ['import { NumberInput } from "@velody/velys"'],
  id: "number-input",
  metadata: { nestable: true },
};
