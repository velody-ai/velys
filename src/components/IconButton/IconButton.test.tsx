import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { composeStories } from "@storybook/react";

import { IconButton } from "./IconButton";
import * as stories from "./IconButton.stories";

const { Variants, Sizes } = composeStories(stories);

describe("IconButton", () => {
  it("exposes its aria-label as the accessible name", () => {
    render(<IconButton icon={<span />} aria-label="Close" />);
    expect(screen.getByRole("button", { name: "Close" })).toBeInTheDocument();
  });

  it("renders the provided icon", () => {
    render(<IconButton icon={<span data-testid="icon" />} aria-label="Close" />);
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("defaults to type='button'", () => {
    render(<IconButton icon={<span />} aria-label="Close" />);
    expect(screen.getByRole("button")).toHaveAttribute("type", "button");
  });

  it("calls onClick when pressed", async () => {
    const onClick = vi.fn();
    render(<IconButton icon={<span />} aria-label="Close" onClick={onClick} />);
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick while disabled", async () => {
    const onClick = vi.fn();
    render(<IconButton icon={<span />} aria-label="Close" disabled onClick={onClick} />);
    const btn = screen.getByRole("button");
    expect(btn).toBeDisabled();
    await userEvent.click(btn);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("accepts variant and size without throwing", () => {
    render(<IconButton icon={<span />} aria-label="Close" variant="outline" size="lg" />);
    expect(screen.getByRole("button", { name: "Close" })).toBeInTheDocument();
  });

  it("forwards a ref to the underlying button element", () => {
    const ref = { current: null as HTMLButtonElement | null };
    render(<IconButton icon={<span />} aria-label="Close" ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});

describe("IconButton stories", () => {
  it.each([
    ["Variants", Variants],
    ["Sizes", Sizes],
  ])("renders the %s story", (_name, Story) => {
    const { container } = render(<Story />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no axe accessibility violations", async () => {
    const { container } = render(<Variants />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
