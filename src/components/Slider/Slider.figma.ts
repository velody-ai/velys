// url=https://www.figma.com/design/tGCZO8dQPK1hwvOHGsjgJS/Velys?node-id=187-10
// source=src/components/Slider/Slider.tsx
// component=Slider
import figma from "figma";

const instance = figma.selectedInstance;

const size = instance.getEnum("Size", {
  Sm: "sm",
  Md: "md",
});

export default {
  example: figma.code`<Slider defaultValue={40} size="${size}" aria-label="Value" />`,
  imports: ['import { Slider } from "@velody/velys"'],
  id: "slider",
  metadata: { nestable: true },
};
