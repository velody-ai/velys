// url=https://www.figma.com/design/tGCZO8dQPK1hwvOHGsjgJS/Velys?node-id=290-23
// source=src/components/RangeSlider/RangeSlider.tsx
// component=RangeSlider
import figma from "figma";

const instance = figma.selectedInstance;

const size = instance.getEnum("Size", {
  Sm: "sm",
  Md: "md",
});
const state = instance.getEnum("State", {
  Default: "default",
  Disabled: "disabled",
});

export default {
  example: figma.code`<RangeSlider defaultValue={[25, 75]} size="${size}" ${state === "disabled" ? "disabled" : ""} />`,
  imports: ['import { RangeSlider } from "@velody/velys"'],
  id: "range-slider",
  metadata: { nestable: true },
};
