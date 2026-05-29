import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { composeStories } from "@storybook/react";

import { EmptyState } from "./EmptyState";
import * as stories from "./EmptyState.stories";

const { Default, Sizes } = composeStories(stories);

describe("EmptyState", () => {
  it("renders the title and description", () => {
    render(<EmptyState title="Nothing here" description="Add something" />);
    expect(screen.getByText("Nothing here")).toBeInTheDocument();
    expect(screen.getByText("Add something")).toBeInTheDocument();
  });

  it("renders an icon when provided", () => {
    render(<EmptyState title="x" icon={<span data-testid="icon" />} />);
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("does not render an icon box when no icon is provided", () => {
    render(<EmptyState title="x" />);
    expect(screen.queryByTestId("icon")).not.toBeInTheDocument();
  });

  it("renders actions when provided", () => {
    render(<EmptyState title="x" actions={<button>Do it</button>} />);
    expect(screen.getByRole("button", { name: "Do it" })).toBeInTheDocument();
  });

  it("renders children", () => {
    render(
      <EmptyState title="x">
        <span data-testid="child" />
      </EmptyState>,
    );
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("merges a custom className", () => {
    const { container } = render(<EmptyState title="x" className="my-class" />);
    expect(container.firstChild).toHaveClass("my-class");
  });
});

describe("EmptyState stories", () => {
  it.each([
    ["Default", Default],
    ["Sizes", Sizes],
  ])("renders the %s story", (_name, Story) => {
    const { container } = render(<Story />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no axe accessibility violations", async () => {
    const { container } = render(<Default />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
