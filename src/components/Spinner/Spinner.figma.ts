// url=https://www.figma.com/design/tGCZO8dQPK1hwvOHGsjgJS/Velys?node-id=176-20
// source=src/components/Spinner/Spinner.tsx
// component=Spinner
import figma from "figma";

const instance = figma.selectedInstance;

const size = instance.getEnum("Size", {
  Sm: "sm",
  Md: "md",
  Lg: "lg",
});
const tone = instance.getEnum("Tone", {
  Brand: "brand",
  Muted: "muted",
});

export default {
  example: figma.code`<Spinner size="${size}" tone="${tone}" />`,
  imports: ['import { Spinner } from "@velody/velys"'],
  id: "spinner",
  metadata: { nestable: true },
};
