// url=https://www.figma.com/design/tGCZO8dQPK1hwvOHGsjgJS/Velys?node-id=95-102
// source=src/components/Avatar/Avatar.tsx
// component=Avatar
import figma from "figma";

const instance = figma.selectedInstance;

const size = instance.getEnum("Size", {
  xs: "xs",
  sm: "sm",
  md: "md",
  lg: "lg",
  xl: "xl",
});
const shape = instance.getEnum("Shape", {
  Circle: "circle",
  Square: "square",
});
const type = instance.getEnum("Type", {
  Image: "image",
  Initials: "initials",
  Icon: "icon",
});
const textLayers = instance.findLayers((n) => n.type === "TEXT");
const initialsNode = textLayers[0];
const initials =
  initialsNode && initialsNode.type === "TEXT" ? initialsNode.textContent : "AB";

export default {
  example: figma.code`<Avatar size="${size}" shape="${shape}" ${type === "image" ? 'src="avatar.png" alt="User"' : ""} ${type === "initials" ? `initials="${initials}"` : ""} />`,
  imports: ['import { Avatar } from "@velody/velys"'],
  id: "avatar",
  metadata: { nestable: true },
};
