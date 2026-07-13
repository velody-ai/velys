// url=https://www.figma.com/design/tGCZO8dQPK1hwvOHGsjgJS/Velys?node-id=102-36
// source=src/components/Tabs/Tabs.tsx
// component=Tabs
// The Figma "Tab" set is a single tab item; the representative example shows
// the full Tabs composition (Tabs / TabList / Tab / TabPanel).
import figma from "figma";

const instance = figma.selectedInstance;

const variant = instance.getEnum("Variant", {
  Underline: "underline",
  Pill: "pill",
});
const size = instance.getEnum("Size", {
  sm: "sm",
  md: "md",
});
const state = instance.getEnum("State", {
  Default: "default",
  Hover: "hover",
  Active: "active",
  Disabled: "disabled",
});
const textLayers = instance.findLayers((n) => n.type === "TEXT");
const labelNode = textLayers[0];
const label = labelNode && labelNode.type === "TEXT" ? labelNode.textContent : "Tab";

export default {
  example: figma.code`<Tabs defaultValue="tab-1" variant="${variant}" size="${size}">
  <TabList aria-label="Tabs">
    <Tab value="tab-1" ${state === "disabled" ? "disabled" : ""}>${label}</Tab>
  </TabList>
  <TabPanel value="tab-1">Panel content</TabPanel>
</Tabs>`,
  imports: ['import { Tabs, TabList, Tab, TabPanel } from "@velody/velys"'],
  id: "tabs",
  metadata: { nestable: false },
};
