// url=https://www.figma.com/design/tGCZO8dQPK1hwvOHGsjgJS/Velys?node-id=281-45
// source=src/components/CopyButton/CopyButton.tsx
// component=CopyButton
import figma from "figma";

const instance = figma.selectedInstance;

const size = instance.getEnum("Size", {
  Sm: "sm",
  Md: "md",
});
// Figma `Copied` is transient UI state driven by the component itself in code.
const state = instance.getEnum("State", {
  Default: "default",
  Hover: "hover",
  Disabled: "disabled",
});

export default {
  example: figma.code`<CopyButton value="Text to copy" size="${size}" ${state === "disabled" ? "disabled" : ""} />`,
  imports: ['import { CopyButton } from "@velody/velys"'],
  id: "copy-button",
  metadata: { nestable: true },
};
