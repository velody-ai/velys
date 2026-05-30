import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { composeStories } from "@storybook/react";

import { Popover, PopoverTrigger, PopoverContent } from "./Popover";
import * as stories from "./Popover.stories";

const { Playground, Sides } = composeStories(stories);

function Basic() {
  return (
    <Popover>
      <PopoverTrigger>
        <button>Open</button>
      </PopoverTrigger>
      <PopoverContent>Panel content</PopoverContent>
    </Popover>
  );
}

describe("Popover", () => {
  it("is closed initially", () => {
    render(<Basic />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Open" })).toHaveAttribute("aria-expanded", "false");
  });

  it("opens on trigger click", async () => {
    render(<Basic />);
    await userEvent.click(screen.getByRole("button", { name: "Open" }));
    expect(await screen.findByRole("dialog")).toHaveTextContent("Panel content");
  });

  it("closes on Escape", async () => {
    render(<Basic />);
    await userEvent.click(screen.getByRole("button", { name: "Open" }));
    expect(await screen.findByRole("dialog")).toBeInTheDocument();
    await userEvent.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
  });

  it("closes on outside pointer down", async () => {
    render(
      <div>
        <Basic />
        <button>outside</button>
      </div>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Open" }));
    expect(await screen.findByRole("dialog")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "outside" }));
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
  });
});

describe("Popover stories", () => {
  it.each([
    ["Playground", Playground],
    ["Sides", Sides],
  ])("renders the %s story", (_name, Story) => {
    const { container } = render(<Story />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no axe accessibility violations", async () => {
    const { container } = render(<Playground />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
