// url=https://www.figma.com/design/tGCZO8dQPK1hwvOHGsjgJS/Velys?node-id=283-93
// source=src/components/Link/Link.tsx
// component=Link
import figma from "figma";

const instance = figma.selectedInstance;

const label = instance.getString("Label");
const external = instance.getBoolean("External");
const tone = instance.getEnum("Tone", {
  Brand: "brand",
  Neutral: "neutral",
  Inherit: "inherit",
});
const underline = instance.getEnum("Underline", {
  Hover: "hover",
  Always: "always",
  None: "none",
});
// Figma `State` (Default/Hover) is interaction-only — no code prop.

export default {
  example: figma.code`<Link href="#" tone="${tone}" underline="${underline}" ${external ? "external" : ""}>${label}</Link>`,
  imports: ['import { Link } from "@velody/velys"'],
  id: "link",
  metadata: { nestable: true },
};
