import { useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { composeStories } from "@storybook/react";

import {
  CommandMenu,
  CommandInput,
  CommandList,
  CommandGroup,
  CommandItem,
  CommandEmpty,
  CommandSeparator,
  type CommandMenuProps,
} from "./CommandMenu";
import * as stories from "./CommandMenu.stories";

const { Playground, WithShortcut, CloseOnSelectFalse, EmptyState } = composeStories(stories);

interface HarnessProps extends Partial<CommandMenuProps> {
  onSelectHome?: (value: string) => void;
}

/** Trigger button + a two-group palette (one disabled item, one separator). */
function Harness({ onSelectHome, ...menuProps }: HarnessProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>
        Trigger
      </button>
      <CommandMenu open={open} onOpenChange={setOpen} {...menuProps}>
        <CommandInput />
        <CommandList>
          <CommandGroup heading="Navigation">
            <CommandItem value="home" onSelect={onSelectHome}>
              Go to Home
            </CommandItem>
            <CommandItem value="calendar">Go to Calendar</CommandItem>
            <CommandItem value="admin" disabled>
              Go to Admin
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Actions">
            <CommandItem value="copy">Copy link</CommandItem>
            <CommandItem value="open-tab">Open in new tab</CommandItem>
          </CommandGroup>
          <CommandEmpty>No results found.</CommandEmpty>
        </CommandList>
      </CommandMenu>
    </>
  );
}

async function openMenu() {
  await userEvent.click(screen.getByRole("button", { name: "Trigger" }));
  return screen.findByRole("dialog");
}

describe("CommandMenu", () => {
  it("renders nothing when closed and a dialog in a portal when open", async () => {
    render(<Harness />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    const dialog = await openMenu();
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(dialog).toHaveAttribute("aria-label", "Command menu");
    expect(dialog.closest("body")).toBe(document.body);
    expect(screen.getByRole("combobox")).toHaveFocus();
  });

  it("opens via a controlled `open` prop", () => {
    render(
      <CommandMenu open onOpenChange={() => {}}>
        <CommandInput />
        <CommandList>
          <CommandItem value="a">Alpha</CommandItem>
        </CommandList>
      </CommandMenu>,
    );
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Alpha" })).toBeInTheDocument();
  });

  it("toggles via the shortcut keydown (mod resolves to Ctrl on non-mac platforms)", async () => {
    render(<Harness shortcut="mod+k" />);
    // jsdom's navigator.platform is not macOS-like, so mod = ctrlKey.
    await userEvent.keyboard("{Control>}k{/Control}");
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    await userEvent.keyboard("{Control>}k{/Control}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    // A bare "k" (no modifier) must not toggle.
    await userEvent.keyboard("k");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("filters items, hides emptied groups, and hides separators while searching", async () => {
    render(<Harness />);
    await openMenu();

    expect(screen.getByRole("separator")).toBeInTheDocument();

    await userEvent.keyboard("copy");

    // Matching item remains; non-matching items are removed.
    expect(screen.getByRole("option", { name: "Copy link" })).toBeInTheDocument();
    expect(screen.queryByRole("option", { name: "Go to Home" })).not.toBeInTheDocument();
    // The emptied "Navigation" group auto-hides; "Actions" stays visible.
    expect(screen.getByText("Navigation")).not.toBeVisible();
    expect(screen.getByText("Actions")).toBeVisible();
    // Separators are hidden while the search is non-empty.
    expect(screen.queryByRole("separator")).not.toBeInTheDocument();
  });

  it("shows CommandEmpty only when a non-empty search matches nothing", async () => {
    render(<Harness />);
    await openMenu();
    expect(screen.queryByText("No results found.")).not.toBeInTheDocument();

    await userEvent.keyboard("zzz");
    expect(screen.getByText("No results found.")).toBeInTheDocument();
    expect(screen.queryByRole("option")).not.toBeInTheDocument();

    await userEvent.keyboard("{Backspace}{Backspace}{Backspace}");
    expect(screen.queryByText("No results found.")).not.toBeInTheDocument();
    expect(screen.getAllByRole("option")).toHaveLength(5);
  });

  it("fires onSelect with the item value on Enter and closes", async () => {
    const onSelectHome = vi.fn();
    render(<Harness onSelectHome={onSelectHome} />);
    await openMenu();

    // First enabled item ("Go to Home") is active by default.
    await userEvent.keyboard("{Enter}");
    expect(onSelectHome).toHaveBeenCalledTimes(1);
    expect(onSelectHome).toHaveBeenCalledWith("home");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("fires onSelect on click and closes", async () => {
    const onSelectHome = vi.fn();
    render(<Harness onSelectHome={onSelectHome} />);
    await openMenu();

    await userEvent.click(screen.getByRole("option", { name: "Go to Home" }));
    expect(onSelectHome).toHaveBeenCalledWith("home");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("stays open after selection when closeOnSelect is false", async () => {
    const onSelectHome = vi.fn();
    render(<Harness onSelectHome={onSelectHome} closeOnSelect={false} />);
    await openMenu();

    await userEvent.keyboard("{Enter}");
    expect(onSelectHome).toHaveBeenCalledWith("home");
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("wraps arrow navigation across group boundaries and skips disabled items", async () => {
    render(<Harness />);
    await openMenu();
    const input = screen.getByRole("combobox");

    const activeName = () => {
      const id = input.getAttribute("aria-activedescendant");
      return id ? document.getElementById(id)?.textContent : null;
    };

    // First enabled item is active on open.
    expect(activeName()).toBe("Go to Home");

    // ArrowUp from the first item wraps to the last enabled item.
    await userEvent.keyboard("{ArrowUp}");
    expect(activeName()).toBe("Open in new tab");

    // ArrowDown from the last item wraps back to the first.
    await userEvent.keyboard("{ArrowDown}");
    expect(activeName()).toBe("Go to Home");

    // ArrowDown crosses the group boundary and skips the disabled item.
    await userEvent.keyboard("{ArrowDown}"); // → Go to Calendar
    await userEvent.keyboard("{ArrowDown}"); // skips disabled Admin → Copy link
    expect(activeName()).toBe("Copy link");
  });

  it("tracks aria-activedescendant and marks the active option aria-selected", async () => {
    render(<Harness />);
    await openMenu();
    const input = screen.getByRole("combobox");

    const home = screen.getByRole("option", { name: "Go to Home" });
    expect(input).toHaveAttribute("aria-activedescendant", home.id);
    expect(home).toHaveAttribute("aria-selected", "true");

    await userEvent.keyboard("{ArrowDown}");
    const calendar = screen.getByRole("option", { name: "Go to Calendar" });
    expect(input).toHaveAttribute("aria-activedescendant", calendar.id);
    expect(calendar).toHaveAttribute("aria-selected", "true");
    expect(home).toHaveAttribute("aria-selected", "false");

    // Search change resets the active item to the first visible one.
    await userEvent.keyboard("go");
    expect(input).toHaveAttribute(
      "aria-activedescendant",
      screen.getByRole("option", { name: "Go to Home" }).id,
    );
  });

  it("closes on Escape and restores focus to the previously focused element", async () => {
    render(<Harness />);
    const trigger = screen.getByRole("button", { name: "Trigger" });
    await openMenu();
    expect(screen.getByRole("combobox")).toHaveFocus();

    await userEvent.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it("closes on overlay click", async () => {
    render(<Harness />);
    const dialog = await openMenu();
    await userEvent.click(dialog.parentElement as HTMLElement);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("locks body scroll while open and restores it after close", async () => {
    render(<Harness />);
    expect(document.body.style.overflow).not.toBe("hidden");

    await openMenu();
    expect(document.body.style.overflow).toBe("hidden");

    await userEvent.keyboard("{Escape}");
    expect(document.body.style.overflow).not.toBe("hidden");
  });

  it("respects a custom filter and filter=null", async () => {
    const startsWith = (textValue: string, search: string) =>
      textValue.toLowerCase().startsWith(search.toLowerCase());
    const { unmount } = render(<Harness filter={startsWith} />);
    await openMenu();
    await userEvent.keyboard("go");
    // "Go to *" matches; "Copy link" does not start with "go".
    expect(screen.getByRole("option", { name: "Go to Home" })).toBeInTheDocument();
    expect(screen.queryByRole("option", { name: "Copy link" })).not.toBeInTheDocument();
    unmount();

    render(<Harness filter={null} />);
    await openMenu();
    await userEvent.keyboard("zzz");
    // filter=null disables filtering entirely.
    expect(screen.getAllByRole("option")).toHaveLength(5);
    expect(screen.queryByText("No results found.")).not.toBeInTheDocument();
  });
});

describe("CommandMenu stories", () => {
  it.each([
    ["Playground", Playground],
    ["WithShortcut", WithShortcut],
    ["CloseOnSelectFalse", CloseOnSelectFalse],
    ["EmptyState", EmptyState],
  ])("renders the %s story", (_name, Story) => {
    const { container } = render(<Story />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no axe accessibility violations when opened", async () => {
    const { container } = render(<Playground />);
    await userEvent.click(screen.getByRole("button", { name: "Open command menu" }));
    expect(await screen.findByRole("dialog")).toBeInTheDocument();
    expect(await axe(container)).toHaveNoViolations();
  });
});
