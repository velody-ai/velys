import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { composeStories } from "@storybook/react";

import { Badge } from "./Badge";
import * as stories from "./Badge.stories";

const { Subtle, Solid, WithDot } = composeStories(stories);

describe("Badge", () => {
  it("renders its children", () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText("New")).toBeInTheDocument();
  });

  it("renders an icon when provided", () => {
    render(<Badge icon={<span data-testid="icon" />}>Tagged</Badge>);
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("renders a leading dot when withDot is set", () => {
    const { container } = render(<Badge withDot>Active</Badge>);
    // The dot is the first child span before the text content.
    expect(container.firstChild?.firstChild?.nodeName).toBe("SPAN");
    expect(screen.getByText("Active")).toBeInTheDocument();
  });

  it("does not render a dot by default", () => {
    const { container } = render(<Badge>Inactive</Badge>);
    expect(container.querySelector("span > span")).not.toBeInTheDocument();
  });

  it("merges a custom className", () => {
    const { container } = render(<Badge className="my-class">Styled</Badge>);
    expect(container.firstChild).toHaveClass("my-class");
  });
});

describe("Badge stories", () => {
  it.each([
    ["Subtle", Subtle],
    ["Solid", Solid],
    ["WithDot", WithDot],
  ])("renders the %s story", (_name, Story) => {
    const { container } = render(<Story />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no axe accessibility violations", async () => {
    const { container } = render(<Subtle />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
