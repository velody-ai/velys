// url=https://www.figma.com/design/tGCZO8dQPK1hwvOHGsjgJS/Velys?node-id=181-2
// source=src/components/Drawer/Drawer.tsx
// component=Drawer
import figma from "figma";

const instance = figma.selectedInstance;

const textLayers = instance.findLayers((n) => n.type === "TEXT");
const titleNode = textLayers[0];
const title = titleNode && titleNode.type === "TEXT" ? titleNode.textContent : "Drawer title";

export default {
  example: figma.code`<Drawer open onClose={() => {}} side="right" title="${title}">
  Drawer content
</Drawer>`,
  imports: ['import { Drawer } from "@velody/velys"'],
  id: "drawer",
  metadata: { nestable: false },
};
