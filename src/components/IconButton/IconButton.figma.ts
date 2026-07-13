// url=https://www.figma.com/design/tGCZO8dQPK1hwvOHGsjgJS/Velys?node-id=90-110
// source=src/components/IconButton/IconButton.tsx
// component=IconButton
import figma from "figma";

const instance = figma.selectedInstance;

const variant = instance.getEnum("Variant", {
  Solid: "solid",
  Outline: "outline",
  Ghost: "ghost",
});
const size = instance.getEnum("Size", {
  Small: "sm",
  Medium: "md",
  Large: "lg",
});
const state = instance.getEnum("State", {
  Default: "default",
  Hover: "hover",
  Disabled: "disabled",
});
// Resolve the icon child dynamically when it is an instance; fall back to a
// representative icon from the Velys icon set.
const iconLayers = instance.findLayers((n) => n.type === "INSTANCE");
const iconLayer = iconLayers[0];
let iconCode;
if (iconLayer && iconLayer.type === "INSTANCE") {
  iconCode = iconLayer.executeTemplate().example;
}

export default {
  example: figma.code`<IconButton aria-label="Action" icon={${iconCode ?? "<CloseIcon />"}} variant="${variant}" size="${size}" ${state === "disabled" ? "disabled" : ""} />`,
  imports: iconCode
    ? ['import { IconButton } from "@velody/velys"']
    : ['import { IconButton, CloseIcon } from "@velody/velys"'],
  id: "icon-button",
  metadata: { nestable: true },
};
