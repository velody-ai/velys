import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import {
  CommandMenu,
  CommandInput,
  CommandList,
  CommandGroup,
  CommandItem,
  CommandEmpty,
  CommandSeparator,
} from "./CommandMenu";
import { Button } from "../Button";
import { Kbd } from "../Text";
import { SearchIcon, CopyIcon, ExternalLinkIcon, CalendarIcon, InfoIcon } from "../icons";

const meta: Meta<typeof CommandMenu> = {
  title: "Components/CommandMenu",
  component: CommandMenu,
};
export default meta;
type Story = StoryObj<typeof CommandMenu>;

function DemoContent() {
  return (
    <>
      <CommandInput />
      <CommandList>
        <CommandGroup heading="Navigation">
          <CommandItem
            leadingIcon={<SearchIcon />}
            hint={
              <>
                <Kbd>⌘</Kbd>
                <Kbd>H</Kbd>
              </>
            }
            onSelect={() => {}}
          >
            Go to Home
          </CommandItem>
          <CommandItem leadingIcon={<CalendarIcon />} onSelect={() => {}}>
            Go to Calendar
          </CommandItem>
          <CommandItem leadingIcon={<InfoIcon />} disabled onSelect={() => {}}>
            Go to Admin (no access)
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Actions">
          <CommandItem
            leadingIcon={<CopyIcon />}
            hint={
              <>
                <Kbd>⌘</Kbd>
                <Kbd>C</Kbd>
              </>
            }
            onSelect={() => {}}
          >
            Copy link
          </CommandItem>
          <CommandItem leadingIcon={<ExternalLinkIcon />} onSelect={() => {}}>
            Open in new tab
          </CommandItem>
        </CommandGroup>
        <CommandEmpty>No results found.</CommandEmpty>
      </CommandList>
    </>
  );
}

export const Playground: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open command menu</Button>
        <CommandMenu open={open} onOpenChange={setOpen}>
          <DemoContent />
        </CommandMenu>
      </>
    );
  },
};

export const WithShortcut: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <p style={{ fontFamily: "system-ui", fontSize: 14 }}>
          Press <Kbd>⌘</Kbd> <Kbd>K</Kbd> (or <Kbd>Ctrl</Kbd> <Kbd>K</Kbd>) to toggle, or{" "}
          <Button size="small" variant="outline" onClick={() => setOpen(true)}>
            open it
          </Button>
        </p>
        <CommandMenu open={open} onOpenChange={setOpen} shortcut="mod+k">
          <DemoContent />
        </CommandMenu>
      </>
    );
  },
};

export const CloseOnSelectFalse: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const [log, setLog] = useState<string[]>([]);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open (stays open on select)</Button>
        <ul style={{ fontFamily: "system-ui", fontSize: 13 }}>
          {log.map((entry, i) => (
            <li key={i}>{entry}</li>
          ))}
        </ul>
        <CommandMenu open={open} onOpenChange={setOpen} closeOnSelect={false}>
          <CommandInput />
          <CommandList>
            <CommandGroup heading="Toggles">
              <CommandItem onSelect={(v) => setLog((l) => [...l, `Selected: ${v}`])}>
                Toggle sidebar
              </CommandItem>
              <CommandItem onSelect={(v) => setLog((l) => [...l, `Selected: ${v}`])}>
                Toggle dark mode
              </CommandItem>
            </CommandGroup>
            <CommandEmpty>No results found.</CommandEmpty>
          </CommandList>
        </CommandMenu>
      </>
    );
  },
};

export const EmptyState: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open and search for “zzz”</Button>
        <CommandMenu open={open} onOpenChange={setOpen} defaultSearch="zzz">
          <CommandInput />
          <CommandList>
            <CommandGroup heading="Navigation">
              <CommandItem onSelect={() => {}}>Go to Home</CommandItem>
              <CommandItem onSelect={() => {}}>Go to Settings</CommandItem>
            </CommandGroup>
            <CommandEmpty>No results found.</CommandEmpty>
          </CommandList>
        </CommandMenu>
      </>
    );
  },
};
