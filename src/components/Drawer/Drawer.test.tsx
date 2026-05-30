import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { composeStories } from "@storybook/react";

import { Drawer } from "./Drawer";
import * as stories from "./Drawer.stories";

const { Playground, Sides } = composeStories(stories);

describe("Drawer", () => {
  it("renders nothing when closed", () => {
    render(
      <Drawer open={false} onClose={() => {}} title="Hi">
        Body
      </Drawer>,
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders a modal dialog when open", () => {
    render(
      <Drawer open onClose={() => {}} title="Settings">
        Body
      </Drawer>,
    );
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(screen.getByText("Settings")).toBeInTheDocument();
  });

  it("calls onClose from the close button", async () => {
    const onClose = vi.fn();
    render(
      <Drawer open onClose={onClose} title="Settings">
        Body
      </Drawer>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Close" }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose on Escape", async () => {
    const onClose = vi.fn();
    render(
      <Drawer open onClose={onClose} title="Settings">
        Body
      </Drawer>,
    );
    await userEvent.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});

describe("Drawer stories", () => {
  it.each([
    ["Playground", Playground],
    ["Sides", Sides],
  ])("renders the %s story", (_name, Story) => {
    const { container } = render(<Story />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no axe accessibility violations when open", async () => {
    const { container } = render(
      <Drawer open onClose={() => {}} title="Settings">
        Body content
      </Drawer>,
    );
    expect(await axe(document.body)).toHaveNoViolations();
    void container;
  });
});
