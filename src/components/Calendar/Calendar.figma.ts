// url=https://www.figma.com/design/tGCZO8dQPK1hwvOHGsjgJS/Velys?node-id=300-221
// source=src/components/Calendar/Calendar.tsx
// component=Calendar
import figma from "figma";

const instance = figma.selectedInstance;

const state = instance.getEnum("State", {
  Default: "default",
  "With Value": "with-value",
});

export default {
  example: figma.code`<Calendar ${state === "with-value" ? "defaultValue={new Date()}" : ""} onValueChange={(date) => {}} />`,
  imports: ['import { Calendar } from "@velody/velys"'],
  id: "calendar",
  metadata: { nestable: false },
};
