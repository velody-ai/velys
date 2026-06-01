import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { composeStories } from "@storybook/react";

import { Toast } from "./Toast";
import * as stories from "./Toast.stories";

const { Statuses, WithAction, Imperative } = composeStories(stories);

describe("Toast", () => {
  it("renders title and description with role='status'", () => {
    render(<Toast title="Saved" description="Your changes were saved." />);
    const toast = screen.getByRole("status");
    expect(toast).toHaveTextContent("Saved");
    expect(toast).toHaveTextContent("Your changes were saved.");
  });

  it("renders the action button and fires onAction when clicked", async () => {
    const onAction = vi.fn();
    render(<Toast title="Saved" actionLabel="View details" onAction={onAction} />);
    await userEvent.click(screen.getByRole("button", { name: "View details" }));
    expect(onAction).toHaveBeenCalledTimes(1);
  });

  it("renders a dismiss button and fires onClose when clicked", async () => {
    const onClose = vi.fn();
    render(<Toast title="Saved" onClose={onClose} />);
    await userEvent.click(screen.getByRole("button", { name: "Close" }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("omits the close button when onClose is not provided", () => {
    render(<Toast title="Saved" />);
    expect(screen.queryByRole("button", { name: "Close" })).not.toBeInTheDocument();
  });

  it("renders a custom icon when provided", () => {
    render(<Toast title="Saved" icon={<span data-testid="custom-icon" />} />);
    expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
  });

  it("merges a custom className onto the toast", () => {
    render(<Toast title="Saved" className="my-toast" />);
    expect(screen.getByRole("status")).toHaveClass("my-toast");
  });
});

describe("Toast stories", () => {
  it.each([
    ["Statuses", Statuses],
    ["WithAction", WithAction],
    ["Imperative", Imperative],
  ])("renders the %s story", (_name, Story) => {
    const { container } = render(<Story />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no axe accessibility violations", async () => {
    const { container } = render(<WithAction />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
