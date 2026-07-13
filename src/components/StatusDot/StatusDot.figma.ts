// url=https://www.figma.com/design/tGCZO8dQPK1hwvOHGsjgJS/Velys?node-id=283-1094
// source=src/components/StatusDot/StatusDot.tsx
// component=StatusDot
import figma from "figma";

const instance = figma.selectedInstance;

const label = instance.getString("Label");
const pulse = instance.getBoolean("Pulse");
const status = instance.getEnum("Status", {
  Neutral: "neutral",
  Brand: "brand",
  Success: "success",
  Warning: "warning",
  Danger: "danger",
  Info: "info",
});
const size = instance.getEnum("Size", {
  Sm: "sm",
  Md: "md",
});

export default {
  example: figma.code`<StatusDot status="${status}" size="${size}" ${label ? `label="${label}"` : ""} ${pulse ? "pulse" : ""} />`,
  imports: ['import { StatusDot } from "@velody/velys"'],
  id: "status-dot",
  metadata: { nestable: true },
};
