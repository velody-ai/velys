import type { Meta, StoryObj } from "@storybook/react";
import { DropdownMenu, MenuItem, MenuSeparator, MenuLabel } from "./DropdownMenu";
import { Button } from "../Button";

const meta: Meta<typeof DropdownMenu> = {
  title: "Components/DropdownMenu",
  component: DropdownMenu,
};
export default meta;
type Story = StoryObj<typeof DropdownMenu>;

export const Default: Story = {
  render: () => (
    <DropdownMenu trigger={<Button variant="outline">Open menu</Button>}>
      <MenuLabel>Actions</MenuLabel>
      <MenuItem hint="⌘E">Edit</MenuItem>
      <MenuItem hint="⌘D">Duplicate</MenuItem>
      <MenuItem>Share</MenuItem>
      <MenuSeparator />
      <MenuItem tone="danger">Delete</MenuItem>
    </DropdownMenu>
  ),
};
