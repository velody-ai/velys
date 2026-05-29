import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { composeStories } from "@storybook/react";

import { Modal } from "./Modal";
import * as stories from "./Modal.stories";

const { Default } = composeStories(stories);

describe("Modal", () => {
  it("renders nothing when closed", () => {
    render(
      <Modal open={false} onClose={() => {}}>
        Hidden body
      </Modal>,
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(screen.queryByText("Hidden body")).not.toBeInTheDocument();
  });

  it("renders content in a portal with role='dialog' when open", () => {
    render(
      <Modal open onClose={() => {}} title="Title">
        Body content
      </Modal>,
    );
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(screen.getByText("Body content")).toBeInTheDocument();
    // Portal renders into document.body, not the render container.
    expect(dialog.closest("body")).toBe(document.body);
  });

  it("fires onClose when the close button is clicked", async () => {
    const onClose = vi.fn();
    render(
      <Modal open onClose={onClose} title="Title">
        Body
      </Modal>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Close" }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("fires onClose when Escape is pressed", async () => {
    const onClose = vi.fn();
    render(
      <Modal open onClose={onClose}>
        Body
      </Modal>,
    );
    await userEvent.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("fires onClose when the overlay is clicked", async () => {
    const onClose = vi.fn();
    render(
      <Modal open onClose={onClose}>
        Body
      </Modal>,
    );
    // The overlay is the dialog's parent element.
    const overlay = screen.getByRole("dialog").parentElement as HTMLElement;
    await userEvent.click(overlay);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("does not close on overlay click when closeOnOverlay is false", async () => {
    const onClose = vi.fn();
    render(
      <Modal open onClose={onClose} closeOnOverlay={false}>
        Body
      </Modal>,
    );
    const overlay = screen.getByRole("dialog").parentElement as HTMLElement;
    await userEvent.click(overlay);
    expect(onClose).not.toHaveBeenCalled();
  });

  it("hides the close button when showClose is false", () => {
    render(
      <Modal open onClose={() => {}} title="Title" showClose={false}>
        Body
      </Modal>,
    );
    expect(screen.queryByRole("button", { name: "Close" })).not.toBeInTheDocument();
  });
});

describe("Modal stories", () => {
  it.each([["Default", Default]])("renders the %s story", (_name, Story) => {
    const { container } = render(<Story />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no axe accessibility violations when opened", async () => {
    const { container } = render(<Default />);
    // Open the modal via its trigger so axe runs against the visible dialog.
    await userEvent.click(screen.getByRole("button", { name: "Open modal" }));
    expect(await screen.findByRole("dialog")).toBeInTheDocument();
    expect(await axe(container)).toHaveNoViolations();
  });
});
