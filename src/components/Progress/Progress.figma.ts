// url=https://www.figma.com/design/tGCZO8dQPK1hwvOHGsjgJS/Velys?node-id=178-10
// source=src/components/Progress/Progress.tsx
// component=Progress
import figma from "figma";

const instance = figma.selectedInstance;

const tone = instance.getEnum("Tone", {
  Brand: "brand",
  Success: "success",
  Warning: "warning",
  Danger: "danger",
});

export default {
  example: figma.code`<Progress value={60} tone="${tone}" />`,
  imports: ['import { Progress } from "@velody/velys"'],
  id: "progress",
  metadata: { nestable: true },
};
