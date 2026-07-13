import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { composeStories } from "@storybook/react";

import { StatusDot } from "./StatusDot";
import { dot } from "./StatusDot.css";
import * as stories from "./StatusDot.stories";

const { Playground, Statuses, Sizes, WithoutLabel, Pulse } = composeStories(stories);

/** The dot is always the aria-hidden span inside the root. */
function getDot(container: HTMLElement): HTMLElement {
  const el = container.querySelector('[aria-hidden="true"]');
  expect(el).not.toBeNull();
  return el as HTMLElement;
}

describe("StatusDot", () => {
  it("renders the label when provided", () => {
    render(<StatusDot label="Operational" />);
    expect(screen.getByText("Operational")).toBeInTheDocument();
  });

  it("renders only the dot when no label is provided", () => {
    const { container } = render(<StatusDot aria-label="online" />);
    expect(container.firstChild?.childNodes).toHaveLength(1);
  });

  it("always hides the dot from assistive technology", () => {
    const { container } = render(<StatusDot label="Live" />);
    expect(getDot(container)).toHaveAttribute("aria-hidden", "true");
  });

  it("applies the default variant classes (neutral / md, no pulse)", () => {
    const { container } = render(<StatusDot />);
    expect(getDot(container).className).toBe(dot());
  });

  it("applies status and size variant classes", () => {
    const { container } = render(<StatusDot status="danger" size="sm" />);
    expect(getDot(container).className).toBe(dot({ status: "danger", size: "sm" }));
  });

  it("adds the pulse class when pulse is set", () => {
    const { container } = render(<StatusDot status="success" pulse />);
    const el = getDot(container);
    expect(el.className).toBe(dot({ status: "success", pulse: true }));
    expect(el.className).not.toBe(dot({ status: "success" }));
  });

  it("merges a custom className and passes rest props through", () => {
    const { container } = render(<StatusDot className="my-class" data-testid="sd" />);
    expect(container.firstChild).toHaveClass("my-class");
    expect(screen.getByTestId("sd")).toBe(container.firstChild);
  });

  it("forwards its ref to the root span", () => {
    const ref = createRef<HTMLSpanElement>();
    const { container } = render(<StatusDot ref={ref} label="Ready" />);
    expect(ref.current).toBe(container.firstChild);
    expect(ref.current?.tagName).toBe("SPAN");
  });
});

describe("StatusDot stories", () => {
  it.each([
    ["Playground", Playground],
    ["Statuses", Statuses],
    ["Sizes", Sizes],
    ["WithoutLabel", WithoutLabel],
    ["Pulse", Pulse],
  ])("renders the %s story", (_name, Story) => {
    const { container } = render(<Story />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no axe accessibility violations", async () => {
    const { container } = render(<Statuses />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
