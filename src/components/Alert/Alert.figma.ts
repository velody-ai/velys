// url=https://www.figma.com/design/tGCZO8dQPK1hwvOHGsjgJS/Velys?node-id=100-122
// source=src/components/Alert/Alert.tsx
// component=Alert
import figma from "figma";

const instance = figma.selectedInstance;

const status = instance.getEnum("Status", {
  Info: "info",
  Success: "success",
  Warning: "warning",
  Error: "danger",
  Neutral: "neutral",
});
const variant = instance.getEnum("Variant", {
  Subtle: "subtle",
  Solid: "solid",
  Outline: "outline",
});
const textLayers = instance.findLayers((n) => n.type === "TEXT");
const titleNode = textLayers[0];
const title = titleNode && titleNode.type === "TEXT" ? titleNode.textContent : "Title";
const descriptionNode = textLayers[1];
const description =
  descriptionNode && descriptionNode.type === "TEXT" ? descriptionNode.textContent : "";

export default {
  example: figma.code`<Alert status="${status}" variant="${variant}" title="${title}" ${description ? `description="${description}"` : ""} />`,
  imports: ['import { Alert } from "@velody/velys"'],
  id: "alert",
  metadata: { nestable: true },
};
