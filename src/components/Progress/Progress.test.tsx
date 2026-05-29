import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { composeStories } from "@storybook/react";

import { Progress, CircularProgress } from "./Progress";
import * as stories from "./Progress.stories";

const { Playground, Tones, Indeterminate, Circular } = composeStories(stories);

describe("Progress", () => {
  it("exposes progressbar role with value attributes", () => {
    render(<Progress value={40} />);
    const bar = screen.getByRole("progressbar");
    expect(bar).toHaveAttribute("aria-valuenow", "40");
    expect(bar).toHaveAttribute("aria-valuemax", "100");
  });

  it("omits aria-valuenow when indeterminate", () => {
    render(<Progress />);
    expect(screen.getByRole("progressbar")).not.toHaveAttribute("aria-valuenow");
  });

  it("clamps the fill width to 0–100%", () => {
    const { container } = render(<Progress value={150} />);
    const fill = container.querySelector('[role="progressbar"] > div') as HTMLElement;
    expect(fill.style.width).toBe("100%");
  });

  it("renders a circular variant as a progressbar", () => {
    render(<CircularProgress value={50} />);
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "50");
  });
});

describe("Progress stories", () => {
  it.each([
    ["Playground", Playground],
    ["Tones", Tones],
    ["Indeterminate", Indeterminate],
    ["Circular", Circular],
  ])("renders the %s story", (_name, Story) => {
    const { container } = render(<Story />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no axe accessibility violations", async () => {
    const { container } = render(<Tones />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
