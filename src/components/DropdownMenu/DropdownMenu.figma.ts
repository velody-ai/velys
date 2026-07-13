// url=https://www.figma.com/design/tGCZO8dQPK1hwvOHGsjgJS/Velys?node-id=105-38
// source=src/components/DropdownMenu/DropdownMenu.tsx
// component=DropdownMenu
// The Figma "Menu Item" set is the item building block; the representative
// example shows the full DropdownMenu composition.
import figma from "figma";

const instance = figma.selectedInstance;

const tone = instance.getEnum("Type", {
  Default: "default",
  Danger: "danger",
});
const state = instance.getEnum("State", {
  Default: "default",
  Hover: "hover",
  Disabled: "disabled",
});
const textLayers = instance.findLayers((n) => n.type === "TEXT");
const labelNode = textLayers[0];
const label = labelNode && labelNode.type === "TEXT" ? labelNode.textContent : "Menu item";
const hintNode = textLayers[1];
const hint = hintNode && hintNode.type === "TEXT" ? hintNode.textContent : "";

export default {
  example: figma.code`<DropdownMenu trigger={<Button variant="outline">Menu</Button>}>
  <MenuItem ${tone === "danger" ? 'tone="danger"' : ""} ${state === "disabled" ? "disabled" : ""} ${hint ? `hint="${hint}"` : ""} onClick={() => {}}>${label}</MenuItem>
</DropdownMenu>`,
  imports: ['import { DropdownMenu, MenuItem, Button } from "@velody/velys"'],
  id: "dropdown-menu",
  metadata: { nestable: false },
};
