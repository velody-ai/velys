// url=https://www.figma.com/design/tGCZO8dQPK1hwvOHGsjgJS/Velys?node-id=177-5
// source=src/components/Skeleton/Skeleton.tsx
// component=Skeleton
import figma from "figma";

const instance = figma.selectedInstance;

const variant = instance.getEnum("Variant", {
  Text: "text",
  Rectangular: "rectangular",
  Circular: "circular",
});

export default {
  example: figma.code`<Skeleton variant="${variant}" ${variant === "circular" ? "width={40} height={40}" : "width={240}"} ${variant === "rectangular" ? "height={96}" : ""} />`,
  imports: ['import { Skeleton } from "@velody/velys"'],
  id: "skeleton",
  metadata: { nestable: true },
};
