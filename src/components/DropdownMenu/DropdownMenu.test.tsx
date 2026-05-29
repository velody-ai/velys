import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { composeStories } from "@storybook/react";

import { DropdownMenu, MenuItem, MenuSeparator, MenuLabel } from "./DropdownMenu";
import * as stories from "./DropdownMenu.stories";

const { Default } = composeStories(stories);

function renderMenu(extra?: { onSelect?: () => void }) {
  return render(
    <DropdownMenu trigger={<button>Open menu</button>}>
      <MenuLabel>Actions</MenuLabel>
      <MenuItem onClick={extra?.onSelect}>Edit</MenuItem>
      <MenuItem>Duplicate</MenuItem>
      <MenuSeparator />
      <MenuItem tone="danger">Delete</MenuItem>
    </DropdownMenu>,
  );
}

describe("DropdownMenu", () => {
  it("is closed initially (no menu rendered)", () => {
    renderMenu();
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("opens the menu when the trigger is clicked", async () => {
    renderMenu();
    await userEvent.click(screen.getByText("Open menu"));
    expect(screen.getByRole("menu")).toBeInTheDocument();
    expect(screen.getAllByRole("menuitem")).toHaveLength(3);
  });

  it("renders item content and separator/label", async () => {
    renderMenu();
    await userEvent.click(screen.getByText("Open menu"));
    expect(screen.getByRole("menuitem", { name: "Edit" })).toBeInTheDocument();
    expect(screen.getByText("Actions")).toBeInTheDocument();
    expect(screen.getByRole("separator")).toBeInTheDocument();
  });

  it("fires the item handler and closes the menu on item click", async () => {
    const onSelect = vi.fn();
    renderMenu({ onSelect });
    await userEvent.click(screen.getByText("Open menu"));
    await userEvent.click(screen.getByRole("menuitem", { name: "Edit" }));
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("closes the menu when Escape is pressed", async () => {
    renderMenu();
    await userEvent.click(screen.getByText("Open menu"));
    expect(screen.getByRole("menu")).toBeInTheDocument();
    await userEvent.keyboard("{Escape}");
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("disables a disabled MenuItem", async () => {
    render(
      <DropdownMenu trigger={<button>Open</button>}>
        <MenuItem disabled>Locked</MenuItem>
      </DropdownMenu>,
    );
    await userEvent.click(screen.getByText("Open"));
    const item = screen.getByRole("menuitem", { name: "Locked" });
    expect(item).toBeDisabled();
    expect(item).toHaveAttribute("aria-disabled", "true");
  });
});

describe("DropdownMenu stories", () => {
  it.each([["Default", Default]])("renders the %s story", (_name, Story) => {
    const { container } = render(<Story />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no axe accessibility violations when open", async () => {
    const { container } = render(<Default />);
    await userEvent.click(screen.getByText("Open menu"));
    expect(screen.getByRole("menu")).toBeInTheDocument();
    expect(await axe(container)).toHaveNoViolations();
  });
});
