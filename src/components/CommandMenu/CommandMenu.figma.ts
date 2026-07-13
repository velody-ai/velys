// url=https://www.figma.com/design/tGCZO8dQPK1hwvOHGsjgJS/Velys?node-id=299-83
// source=src/components/CommandMenu/CommandMenu.tsx
// component=CommandMenu
import figma from "figma";

const instance = figma.selectedInstance;

const search = instance.getString("Search");
// `State=Empty` shows the CommandEmpty row — always present in the composition.
const state = instance.getEnum("State", {
  Default: "default",
  Empty: "empty",
});

export default {
  example: figma.code`<CommandMenu defaultOpen shortcut="mod+k" ${state === "empty" ? 'defaultSearch="zzz"' : ""}>
  <CommandInput placeholder="${search}" />
  <CommandList>
    <CommandEmpty>No results found.</CommandEmpty>
    <CommandGroup heading="Suggestions">
      <CommandItem onSelect={(value) => {}}>Go to Home</CommandItem>
      <CommandItem onSelect={(value) => {}}>Go to Settings</CommandItem>
    </CommandGroup>
  </CommandList>
</CommandMenu>`,
  imports: [
    'import { CommandMenu, CommandInput, CommandList, CommandGroup, CommandItem, CommandEmpty } from "@velody/velys"',
  ],
  id: "command-menu",
  metadata: { nestable: false },
};
