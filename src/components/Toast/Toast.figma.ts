// url=https://www.figma.com/design/tGCZO8dQPK1hwvOHGsjgJS/Velys?node-id=101-122
// source=src/components/Toast/Toast.tsx
// component=Toast
import figma from "figma";

const instance = figma.selectedInstance;

const status = instance.getEnum("Status", {
  Info: "info",
  Success: "success",
  Warning: "warning",
  Error: "danger",
  Neutral: "neutral",
});
const state = instance.getEnum("State", {
  Default: "default",
  WithAction: "with-action",
});
const textLayers = instance.findLayers((n) => n.type === "TEXT");
const titleNode = textLayers[0];
const title = titleNode && titleNode.type === "TEXT" ? titleNode.textContent : "Title";
const descriptionNode = textLayers[1];
const description =
  descriptionNode && descriptionNode.type === "TEXT" ? descriptionNode.textContent : "";
const actionNode = textLayers[2];
const actionLabel =
  actionNode && actionNode.type === "TEXT" ? actionNode.textContent : "Action";

export default {
  example: figma.code`<Toast status="${status}" title="${title}" ${description ? `description="${description}"` : ""} ${state === "with-action" ? `actionLabel="${actionLabel}" onAction={() => {}}` : ""} onClose={() => {}} />`,
  imports: ['import { Toast } from "@velody/velys"'],
  id: "toast",
  metadata: { nestable: true },
};
