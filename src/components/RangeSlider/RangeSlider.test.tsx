import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { composeStories } from "@storybook/react";

import { RangeSlider } from "./RangeSlider";
import * as stories from "./RangeSlider.stories";

const { Playground, Sizes, MinDistance, Disabled, Controlled } =
  composeStories(stories);

describe("RangeSlider", () => {
  it("exposes two slider roles with interactive bounds", () => {
    render(<RangeSlider value={[20, 80]} minDistance={10} />);
    const lower = screen.getByRole("slider", { name: "Minimum" });
    const upper = screen.getByRole("slider", { name: "Maximum" });
    expect(lower).toHaveAttribute("aria-valuenow", "20");
    expect(lower).toHaveAttribute("aria-valuemin", "0");
    expect(lower).toHaveAttribute("aria-valuemax", "70");
    expect(lower).toHaveAttribute("aria-orientation", "horizontal");
    expect(upper).toHaveAttribute("aria-valuenow", "80");
    expect(upper).toHaveAttribute("aria-valuemin", "30");
    expect(upper).toHaveAttribute("aria-valuemax", "100");
    expect(upper).toHaveAttribute("aria-orientation", "horizontal");
  });

  it("supports custom thumb labels", () => {
    render(<RangeSlider value={[20, 80]} thumbLabels={["Low", "High"]} />);
    expect(screen.getByRole("slider", { name: "Low" })).toBeInTheDocument();
    expect(screen.getByRole("slider", { name: "High" })).toBeInTheDocument();
  });

  it("moves each thumb with arrow keys by the step", async () => {
    const onChange = vi.fn();
    render(<RangeSlider value={[20, 80]} step={5} onChange={onChange} />);
    screen.getByRole("slider", { name: "Minimum" }).focus();
    await userEvent.keyboard("{ArrowRight}");
    expect(onChange).toHaveBeenLastCalledWith([25, 80]);
    screen.getByRole("slider", { name: "Maximum" }).focus();
    await userEvent.keyboard("{ArrowLeft}");
    expect(onChange).toHaveBeenLastCalledWith([20, 75]);
  });

  it("clamps thumbs against each other honoring minDistance", async () => {
    const onChange = vi.fn();
    render(<RangeSlider value={[60, 75]} minDistance={10} onChange={onChange} />);
    screen.getByRole("slider", { name: "Minimum" }).focus();
    await userEvent.keyboard("{PageUp}"); // 60 + 10 -> clamped to 75 - 10
    expect(onChange).toHaveBeenLastCalledWith([65, 75]);
    screen.getByRole("slider", { name: "Maximum" }).focus();
    await userEvent.keyboard("{PageDown}"); // 75 - 10 -> clamped to 60 + 10
    expect(onChange).toHaveBeenLastCalledWith([60, 70]);
  });

  it("jumps to each thumb's interactive bounds with Home/End", async () => {
    const onChange = vi.fn();
    render(<RangeSlider value={[40, 60]} minDistance={10} onChange={onChange} />);
    screen.getByRole("slider", { name: "Minimum" }).focus();
    await userEvent.keyboard("{Home}");
    expect(onChange).toHaveBeenLastCalledWith([0, 60]);
    await userEvent.keyboard("{End}");
    expect(onChange).toHaveBeenLastCalledWith([50, 60]);
    screen.getByRole("slider", { name: "Maximum" }).focus();
    await userEvent.keyboard("{End}");
    expect(onChange).toHaveBeenLastCalledWith([40, 100]);
    await userEvent.keyboard("{Home}");
    expect(onChange).toHaveBeenLastCalledWith([40, 50]);
  });

  it("fires onChangeEnd on keyboard commit", async () => {
    const onChangeEnd = vi.fn();
    render(<RangeSlider value={[20, 80]} onChangeEnd={onChangeEnd} />);
    screen.getByRole("slider", { name: "Minimum" }).focus();
    await userEvent.keyboard("{ArrowRight}");
    expect(onChangeEnd).toHaveBeenCalledWith([21, 80]);
  });

  it("works uncontrolled with defaultValue", async () => {
    render(<RangeSlider defaultValue={[30, 70]} />);
    const lower = screen.getByRole("slider", { name: "Minimum" });
    lower.focus();
    await userEvent.keyboard("{ArrowRight}");
    expect(lower).toHaveAttribute("aria-valuenow", "31");
    expect(screen.getByRole("slider", { name: "Maximum" })).toHaveAttribute(
      "aria-valuenow",
      "70",
    );
  });

  it("defaults to [min, max] when uncontrolled", () => {
    render(<RangeSlider min={10} max={50} />);
    expect(screen.getByRole("slider", { name: "Minimum" })).toHaveAttribute(
      "aria-valuenow",
      "10",
    );
    expect(screen.getByRole("slider", { name: "Maximum" })).toHaveAttribute(
      "aria-valuenow",
      "50",
    );
  });

  it("stays controlled when value is provided", async () => {
    render(<RangeSlider value={[20, 80]} />);
    const lower = screen.getByRole("slider", { name: "Minimum" });
    lower.focus();
    await userEvent.keyboard("{ArrowRight}");
    expect(lower).toHaveAttribute("aria-valuenow", "20");
  });

  it("does not respond to keys when disabled", async () => {
    const onChange = vi.fn();
    render(<RangeSlider value={[20, 80]} disabled onChange={onChange} />);
    const lower = screen.getByRole("slider", { name: "Minimum" });
    expect(lower).toHaveAttribute("tabindex", "-1");
    await userEvent.keyboard("{ArrowRight}");
    expect(onChange).not.toHaveBeenCalled();
  });

  it("moves the nearest thumb on pointer interaction", () => {
    const onChange = vi.fn();
    const onChangeEnd = vi.fn();
    const { container } = render(
      <RangeSlider
        defaultValue={[20, 80]}
        onChange={onChange}
        onChangeEnd={onChangeEnd}
      />,
    );
    const root = container.firstElementChild as HTMLElement;
    const track = root.firstElementChild as HTMLElement;
    vi.spyOn(track, "getBoundingClientRect").mockReturnValue({
      left: 0,
      width: 100,
      top: 0,
      height: 6,
      right: 100,
      bottom: 6,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    } as DOMRect);
    root.setPointerCapture = vi.fn();
    root.hasPointerCapture = vi.fn().mockReturnValue(true);
    root.releasePointerCapture = vi.fn();

    // clientX 30 is nearest to the lower thumb (20).
    fireEvent.pointerDown(root, { clientX: 30, pointerId: 1 });
    expect(onChange).toHaveBeenLastCalledWith([30, 80]);

    // Drag keeps moving the same (lower) thumb.
    fireEvent.pointerMove(root, { clientX: 45, pointerId: 1 });
    expect(onChange).toHaveBeenLastCalledWith([45, 80]);

    fireEvent.pointerUp(root, { clientX: 50, pointerId: 1 });
    expect(onChangeEnd).toHaveBeenLastCalledWith([50, 80]);

    // clientX 90 is nearest to the upper thumb (80).
    fireEvent.pointerDown(root, { clientX: 90, pointerId: 1 });
    expect(onChange).toHaveBeenLastCalledWith([50, 90]);
  });

  it("picks the thumb that can move toward the pointer on a tie", () => {
    const onChange = vi.fn();
    const { container } = render(
      <RangeSlider defaultValue={[100, 100]} onChange={onChange} />,
    );
    const root = container.firstElementChild as HTMLElement;
    const track = root.firstElementChild as HTMLElement;
    vi.spyOn(track, "getBoundingClientRect").mockReturnValue({
      left: 0,
      width: 100,
      top: 0,
      height: 6,
      right: 100,
      bottom: 6,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    } as DOMRect);
    root.setPointerCapture = vi.fn();

    // Both thumbs sit at 100; the pointer is to their left, so the lower
    // thumb (the only one that can move toward it) is picked.
    fireEvent.pointerDown(root, { clientX: 40, pointerId: 1 });
    expect(onChange).toHaveBeenLastCalledWith([40, 100]);
  });
});

describe("RangeSlider stories", () => {
  it.each([
    ["Playground", Playground],
    ["Sizes", Sizes],
    ["MinDistance", MinDistance],
    ["Disabled", Disabled],
    ["Controlled", Controlled],
  ])("renders the %s story", (_name, Story) => {
    const { container } = render(<Story />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no axe accessibility violations", async () => {
    const { container } = render(<Playground />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
