// url=https://www.figma.com/design/tGCZO8dQPK1hwvOHGsjgJS/Velys?node-id=104-38
// source=src/components/EmptyState/EmptyState.tsx
// component=EmptyState
import figma from "figma";

const instance = figma.selectedInstance;

const size = instance.getEnum("Size", {
  sm: "sm",
  md: "md",
  lg: "lg",
});
const textLayers = instance.findLayers((n) => n.type === "TEXT");
const titleNode = textLayers[0];
const title = titleNode && titleNode.type === "TEXT" ? titleNode.textContent : "No items yet";
const descriptionNode = textLayers[1];
const description =
  descriptionNode && descriptionNode.type === "TEXT" ? descriptionNode.textContent : "";
const primaryNode = textLayers[2];
const primaryLabel =
  primaryNode && primaryNode.type === "TEXT" ? primaryNode.textContent : "Get started";

export default {
  example: figma.code`<EmptyState
  size="${size}"
  title="${title}"
  ${description ? `description="${description}"` : ""}
  actions={<Button>${primaryLabel}</Button>}
/>`,
  imports: ['import { EmptyState, Button } from "@velody/velys"'],
  id: "empty-state",
  metadata: { nestable: false },
};
