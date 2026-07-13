// url=https://www.figma.com/design/tGCZO8dQPK1hwvOHGsjgJS/Velys?node-id=184-4
// source=src/components/Separator/Separator.tsx
// component=Separator
import figma from "figma";

const instance = figma.selectedInstance;

const orientation = instance.getEnum("Orientation", {
  Horizontal: "horizontal",
  Vertical: "vertical",
});

export default {
  example: figma.code`<Separator orientation="${orientation}" />`,
  imports: ['import { Separator } from "@velody/velys"'],
  id: "separator",
  metadata: { nestable: true },
};
