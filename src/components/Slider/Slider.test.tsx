import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { composeStories } from "@storybook/react";

import { Slider } from "./Slider";
import * as stories from "./Slider.stories";

const { Playground, Steps, Disabled } = composeStories(stories);

describe("Slider", () => {
  it("exposes a slider role with value attributes", () => {
    render(<Slider value={40} aria-label="Volume" />);
    const slider = screen.getByRole("slider");
    expect(slider).toHaveAttribute("aria-valuenow", "40");
    expect(slider).toHaveAttribute("aria-valuemin", "0");
    expect(slider).toHaveAttribute("aria-valuemax", "100");
  });

  it("increments with ArrowRight by the step", async () => {
    const onChange = vi.fn();
    render(<Slider value={40} step={5} onChange={onChange} aria-label="Volume" />);
    screen.getByRole("slider").focus();
    await userEvent.keyboard("{ArrowRight}");
    expect(onChange).toHaveBeenCalledWith(45);
  });

  it("jumps to min/max with Home/End", async () => {
    const onChange = vi.fn();
    render(<Slider value={40} onChange={onChange} aria-label="Volume" />);
    screen.getByRole("slider").focus();
    await userEvent.keyboard("{Home}");
    expect(onChange).toHaveBeenLastCalledWith(0);
    await userEvent.keyboard("{End}");
    expect(onChange).toHaveBeenLastCalledWith(100);
  });

  it("does not respond to keys when disabled", async () => {
    const onChange = vi.fn();
    render(<Slider value={40} disabled onChange={onChange} aria-label="Volume" />);
    const slider = screen.getByRole("slider");
    expect(slider).toHaveAttribute("tabindex", "-1");
    await userEvent.keyboard("{ArrowRight}");
    expect(onChange).not.toHaveBeenCalled();
  });
});

describe("Slider stories", () => {
  it.each([
    ["Playground", Playground],
    ["Steps", Steps],
    ["Disabled", Disabled],
  ])("renders the %s story", (_name, Story) => {
    const { container } = render(<Story />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no axe accessibility violations", async () => {
    const { container } = render(<Playground />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
