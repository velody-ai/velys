import { render } from "@testing-library/react";
import { axe } from "vitest-axe";
import { composeStories } from "@storybook/react";

import { Skeleton } from "./Skeleton";
import * as stories from "./Skeleton.stories";

const { Playground, Variants, TextLines, CardPlaceholder } = composeStories(stories);

describe("Skeleton", () => {
  it("applies width/height styles", () => {
    const { container } = render(<Skeleton width={100} height={20} />);
    const el = container.firstChild as HTMLElement;
    expect(el.style.width).toBe("100px");
    expect(el.style.height).toBe("20px");
  });

  it("is hidden from assistive tech", () => {
    const { container } = render(<Skeleton />);
    expect(container.firstChild).toHaveAttribute("aria-hidden");
  });

  it("renders the requested number of text lines", () => {
    const { container } = render(<Skeleton variant="text" lines={3} />);
    expect(container.querySelectorAll("span")).toHaveLength(3);
  });

  it("merges a custom className", () => {
    const { container } = render(<Skeleton className="my-class" />);
    expect(container.firstChild).toHaveClass("my-class");
  });
});

describe("Skeleton stories", () => {
  it.each([
    ["Playground", Playground],
    ["Variants", Variants],
    ["TextLines", TextLines],
    ["CardPlaceholder", CardPlaceholder],
  ])("renders the %s story", (_name, Story) => {
    const { container } = render(<Story />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no axe accessibility violations", async () => {
    const { container } = render(<CardPlaceholder />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
