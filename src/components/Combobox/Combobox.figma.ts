// url=https://www.figma.com/design/tGCZO8dQPK1hwvOHGsjgJS/Velys?node-id=295-1163
// source=src/components/Combobox/Combobox.tsx
// component=Combobox
import figma from "figma";

const instance = figma.selectedInstance;

const placeholder = instance.getString("Placeholder");
const value = instance.getString("Value");
const size = instance.getEnum("Size", {
  Sm: "sm",
  Md: "md",
  Lg: "lg",
});
const state = instance.getEnum("State", {
  Default: "default",
  Open: "open",
  Invalid: "invalid",
  Disabled: "disabled",
});

export default {
  example: figma.code`<Combobox ${value ? `defaultValue="${value}"` : ""} ${state === "open" ? "defaultOpen" : ""} ${state === "disabled" ? "disabled" : ""}>
  <ComboboxInput size="${size}" placeholder="${placeholder}" aria-label="Framework" ${state === "invalid" ? "invalid" : ""} />
  <ComboboxList>
    ${value ? `<ComboboxItem value="${value}">${value}</ComboboxItem>` : '<ComboboxItem value="option">Option</ComboboxItem>'}
    <ComboboxEmpty>No results found.</ComboboxEmpty>
  </ComboboxList>
</Combobox>`,
  imports: [
    'import { Combobox, ComboboxInput, ComboboxList, ComboboxItem, ComboboxEmpty } from "@velody/velys"',
  ],
  id: "combobox",
  metadata: { nestable: false },
};
