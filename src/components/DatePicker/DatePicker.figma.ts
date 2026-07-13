// url=https://www.figma.com/design/tGCZO8dQPK1hwvOHGsjgJS/Velys?node-id=302-326
// source=src/components/DatePicker/DatePicker.tsx
// component=DatePicker
import figma from "figma";

const instance = figma.selectedInstance;

// Figma `Value` shows the locale placeholder pattern (e.g. MM/DD/YYYY) — the
// code component derives the placeholder from `locale`, so it is not emitted.
const size = instance.getEnum("Size", {
  Sm: "sm",
  Md: "md",
  Lg: "lg",
});
const state = instance.getEnum("State", {
  Default: "default",
  Open: "open",
  Invalid: "invalid",
  Disabled: "disabled",
});

export default {
  example: figma.code`<DatePicker size="${size}" aria-label="Date" onValueChange={(date) => {}} ${state === "invalid" ? "invalid" : ""} ${state === "disabled" ? "disabled" : ""} />`,
  imports: ['import { DatePicker } from "@velody/velys"'],
  id: "date-picker",
  metadata: { nestable: true },
};
