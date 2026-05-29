import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { composeStories } from "@storybook/react";

import { Separator } from "./Separator";
import * as stories from "./Separator.stories";

const { Horizontal, Vertical } = composeStories(stories);

describe("Separator", () => {
  it("is decorative (role=none) by default", () => {
    const { container } = render(<Separator />);
    expect(container.firstChild).toHaveAttribute("role", "none");
  });

  it("exposes a separator role with orientation when not decorative", () => {
    render(<Separator decorative={false} orientation="vertical" />);
    const sep = screen.getByRole("separator");
    expect(sep).toHaveAttribute("aria-orientation", "vertical");
  });

  it("merges a custom className", () => {
    const { container } = render(<Separator className="my-class" />);
    expect(container.firstChild).toHaveClass("my-class");
  });
});

describe("Separator stories", () => {
  it.each([
    ["Horizontal", Horizontal],
    ["Vertical", Vertical],
  ])("renders the %s story", (_name, Story) => {
    const { container } = render(<Story />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no axe accessibility violations", async () => {
    const { container } = render(<Horizontal />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
