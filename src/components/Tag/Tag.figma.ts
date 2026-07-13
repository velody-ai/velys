// url=https://www.figma.com/design/tGCZO8dQPK1hwvOHGsjgJS/Velys?node-id=285-170
// source=src/components/Tag/Tag.tsx
// component=Tag
import figma from "figma";

const instance = figma.selectedInstance;

const label = instance.getString("Label");
const dismissible = instance.getBoolean("Dismissible");
const hasIcon = instance.getBoolean("Icon");
const color = instance.getEnum("Color", {
  Neutral: "neutral",
  Brand: "brand",
  Success: "success",
  Warning: "warning",
  Danger: "danger",
  Info: "info",
});
const variant = instance.getEnum("Variant", {
  Subtle: "subtle",
  Outline: "outline",
});
const size = instance.getEnum("Size", {
  Sm: "sm",
  Md: "md",
});
const state = instance.getEnum("State", {
  Default: "default",
  Disabled: "disabled",
});
const iconSwap = hasIcon ? instance.getInstanceSwap("Icon Swap") : undefined;
let iconCode;
if (iconSwap && iconSwap.type === "INSTANCE") {
  iconCode = iconSwap.executeTemplate().example;
}

export default {
  example: figma.code`<Tag color="${color}" variant="${variant}" size="${size}" ${iconCode ? figma.code`icon={${iconCode}}` : ""} ${dismissible ? "onDismiss={() => {}}" : ""} ${state === "disabled" ? "disabled" : ""}>${label}</Tag>`,
  imports: ['import { Tag } from "@velody/velys"'],
  id: "tag",
  metadata: { nestable: true },
};
