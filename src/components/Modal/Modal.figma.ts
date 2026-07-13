// url=https://www.figma.com/design/tGCZO8dQPK1hwvOHGsjgJS/Velys?node-id=107-41
// source=src/components/Modal/Modal.tsx
// component=Modal
import figma from "figma";

const instance = figma.selectedInstance;

const size = instance.getEnum("Size", {
  sm: "sm",
  md: "md",
  lg: "lg",
});
const textLayers = instance.findLayers((n) => n.type === "TEXT");
const titleNode = textLayers[0];
const title = titleNode && titleNode.type === "TEXT" ? titleNode.textContent : "Modal title";
const bodyNode = textLayers[1];
const body = bodyNode && bodyNode.type === "TEXT" ? bodyNode.textContent : "Body content";
const cancelNode = textLayers[2];
const cancelLabel = cancelNode && cancelNode.type === "TEXT" ? cancelNode.textContent : "Cancel";
const confirmNode = textLayers[3];
const confirmLabel =
  confirmNode && confirmNode.type === "TEXT" ? confirmNode.textContent : "Confirm";

export default {
  example: figma.code`<Modal
  open
  onClose={() => {}}
  size="${size}"
  title="${title}"
  footer={
    <>
      <Button variant="outline" color="secondary">${cancelLabel}</Button>
      <Button>${confirmLabel}</Button>
    </>
  }
>
  ${body}
</Modal>`,
  imports: ['import { Modal, Button } from "@velody/velys"'],
  id: "modal",
  metadata: { nestable: false },
};
