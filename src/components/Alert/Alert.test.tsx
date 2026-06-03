import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { composeStories } from "@storybook/react";

import { Alert } from "./Alert";
import * as stories from "./Alert.stories";

const { Subtle, Solid, Dismissible, FullWidth } = composeStories(stories);

describe("Alert", () => {
  it("renders with role='alert'", () => {
    render(<Alert title="Heads up" />);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("renders the title and description", () => {
    render(<Alert title="Title text" description="Description text" />);
    expect(screen.getByText("Title text")).toBeInTheDocument();
    expect(screen.getByText("Description text")).toBeInTheDocument();
  });

  it("renders children and action content", () => {
    render(
      <Alert action={<span data-testid="action" />}>
        <span data-testid="child" />
      </Alert>,
    );
    expect(screen.getByTestId("child")).toBeInTheDocument();
    expect(screen.getByTestId("action")).toBeInTheDocument();
  });

  it("does not show a close button without onClose", () => {
    render(<Alert title="No close" />);
    expect(screen.queryByRole("button", { name: "Close" })).not.toBeInTheDocument();
  });

  it("shows a close button and calls onClose when clicked", async () => {
    const onClose = vi.fn();
    render(<Alert title="Closable" onClose={onClose} />);
    const close = screen.getByRole("button", { name: "Close" });
    expect(close).toBeInTheDocument();
    await userEvent.click(close);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("renders a custom icon when provided", () => {
    render(<Alert title="Custom" icon={<span data-testid="custom-icon" />} />);
    expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
  });

  it("merges a custom className", () => {
    render(<Alert title="Styled" className="my-class" />);
    expect(screen.getByRole("alert")).toHaveClass("my-class");
  });

  it("applies an extra recipe class when fullWidth", () => {
    const { rerender } = render(<Alert title="x" data-testid="a" />);
    const normal = screen.getByTestId("a").className;
    rerender(<Alert title="x" fullWidth data-testid="a" />);
    const full = screen.getByTestId("a").className;
    expect(full).not.toEqual(normal);
  });
});

describe("Alert stories", () => {
  it.each([
    ["Subtle", Subtle],
    ["Solid", Solid],
    ["Dismissible", Dismissible],
    ["FullWidth", FullWidth],
  ])("renders the %s story", (_name, Story) => {
    const { container } = render(<Story />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no axe accessibility violations", async () => {
    const { container } = render(<Subtle />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
