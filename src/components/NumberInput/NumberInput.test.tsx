import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { composeStories } from "@storybook/react";

import { NumberInput } from "./NumberInput";
import * as stories from "./NumberInput.stories";

const { Playground, Sizes, MinMaxStep, Invalid, Disabled, Controlled } = composeStories(stories);

const getInput = () => screen.getByRole("spinbutton");
const getSteppers = (container: HTMLElement) =>
  container.querySelectorAll<HTMLButtonElement>("button");

describe("NumberInput", () => {
  it("commits a typed value clamped to max on blur", async () => {
    const onValueChange = vi.fn();
    render(<NumberInput aria-label="qty" min={0} max={10} onValueChange={onValueChange} />);
    const input = getInput();
    await userEvent.type(input, "15");
    expect(input).toHaveValue("15"); // draft is free-form while focused
    await userEvent.tab();
    expect(input).toHaveValue("10");
    expect(onValueChange).toHaveBeenCalledTimes(1);
    expect(onValueChange).toHaveBeenCalledWith(10);
  });

  it("commits on Enter", async () => {
    const onValueChange = vi.fn();
    render(<NumberInput aria-label="qty" onValueChange={onValueChange} />);
    const input = getInput();
    await userEvent.type(input, "7{Enter}");
    expect(input).toHaveValue("7");
    expect(onValueChange).toHaveBeenCalledWith(7);
  });

  it("rounds a committed value to the step grid", async () => {
    const onValueChange = vi.fn();
    render(<NumberInput aria-label="qty" min={0} max={10} step={2} onValueChange={onValueChange} />);
    const input = getInput();
    await userEvent.type(input, "4.6{Enter}");
    expect(input).toHaveValue("4");
    expect(onValueChange).toHaveBeenCalledWith(4);
  });

  it("reverts unparseable text to the last committed value on blur", async () => {
    const onValueChange = vi.fn();
    render(<NumberInput aria-label="qty" defaultValue={3} onValueChange={onValueChange} />);
    const input = getInput();
    await userEvent.clear(input);
    await userEvent.type(input, "abc");
    await userEvent.tab();
    expect(input).toHaveValue("3");
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it("commits null when cleared", async () => {
    const onValueChange = vi.fn();
    render(<NumberInput aria-label="qty" defaultValue={5} onValueChange={onValueChange} />);
    const input = getInput();
    await userEvent.clear(input);
    await userEvent.tab();
    expect(input).toHaveValue("");
    expect(onValueChange).toHaveBeenCalledWith(null);
    expect(input).not.toHaveAttribute("aria-valuenow");
  });

  it("steps with ArrowUp / ArrowDown and fires onValueChange immediately", async () => {
    const onValueChange = vi.fn();
    render(<NumberInput aria-label="qty" defaultValue={5} onValueChange={onValueChange} />);
    const input = getInput();
    fireEvent.keyDown(input, { key: "ArrowUp" });
    expect(input).toHaveValue("6");
    expect(onValueChange).toHaveBeenLastCalledWith(6);
    fireEvent.keyDown(input, { key: "ArrowDown" });
    fireEvent.keyDown(input, { key: "ArrowDown" });
    expect(input).toHaveValue("4");
    expect(onValueChange).toHaveBeenLastCalledWith(4);
    expect(onValueChange).toHaveBeenCalledTimes(3);
  });

  it("steps from min when empty, or from 0 when min is -Infinity", () => {
    const onValueChange = vi.fn();
    const { unmount } = render(
      <NumberInput aria-label="qty" min={10} max={100} onValueChange={onValueChange} />,
    );
    fireEvent.keyDown(getInput(), { key: "ArrowUp" });
    expect(onValueChange).toHaveBeenCalledWith(11);
    unmount();

    render(<NumberInput aria-label="unbounded" />);
    const input = screen.getByRole("spinbutton");
    fireEvent.keyDown(input, { key: "ArrowUp" });
    expect(input).toHaveValue("1");
  });

  it("PageUp / PageDown step by step*10", () => {
    const onValueChange = vi.fn();
    render(
      <NumberInput aria-label="qty" defaultValue={50} step={2} onValueChange={onValueChange} />,
    );
    const input = getInput();
    fireEvent.keyDown(input, { key: "PageUp" });
    expect(input).toHaveValue("70");
    expect(onValueChange).toHaveBeenLastCalledWith(70);
    fireEvent.keyDown(input, { key: "PageDown" });
    expect(input).toHaveValue("50");
  });

  it("Home / End jump to finite min / max", () => {
    const onValueChange = vi.fn();
    render(
      <NumberInput aria-label="qty" min={0} max={10} defaultValue={5} onValueChange={onValueChange} />,
    );
    const input = getInput();
    fireEvent.keyDown(input, { key: "Home" });
    expect(input).toHaveValue("0");
    expect(onValueChange).toHaveBeenLastCalledWith(0);
    fireEvent.keyDown(input, { key: "End" });
    expect(input).toHaveValue("10");
    expect(onValueChange).toHaveBeenLastCalledWith(10);
  });

  it("does not handle Home / End when bounds are infinite", () => {
    render(<NumberInput aria-label="qty" defaultValue={5} />);
    const input = getInput();
    fireEvent.keyDown(input, { key: "Home" });
    fireEvent.keyDown(input, { key: "End" });
    expect(input).toHaveValue("5");
  });

  it("steps via the stepper buttons and disables them at the bounds", async () => {
    const onValueChange = vi.fn();
    const { container } = render(
      <NumberInput aria-label="qty" min={0} max={2} defaultValue={1} onValueChange={onValueChange} />,
    );
    const [up, down] = getSteppers(container);
    await userEvent.click(up);
    expect(getInput()).toHaveValue("2");
    expect(onValueChange).toHaveBeenLastCalledWith(2);
    expect(up).toBeDisabled(); // at max
    await userEvent.click(down);
    await userEvent.click(down);
    expect(getInput()).toHaveValue("0");
    expect(down).toBeDisabled(); // at min
    expect(up).not.toBeDisabled();
  });

  it("disables the input and both steppers when disabled", async () => {
    const { container } = render(<NumberInput aria-label="qty" defaultValue={5} disabled />);
    const input = getInput();
    expect(input).toBeDisabled();
    await userEvent.type(input, "9");
    expect(input).toHaveValue("5");
    const [up, down] = getSteppers(container);
    expect(up).toBeDisabled();
    expect(down).toBeDisabled();
  });

  it("exposes spinbutton ARIA attributes", () => {
    render(<NumberInput aria-label="qty" min={0} max={10} defaultValue={5} invalid />);
    const input = getInput();
    expect(input).toHaveAttribute("role", "spinbutton");
    expect(input).toHaveAttribute("aria-valuemin", "0");
    expect(input).toHaveAttribute("aria-valuemax", "10");
    expect(input).toHaveAttribute("aria-valuenow", "5");
    expect(input).toHaveAttribute("aria-invalid", "true");
  });

  it("omits aria-valuemin/valuemax when bounds are infinite and aria-valuenow when empty", () => {
    render(<NumberInput aria-label="qty" />);
    const input = getInput();
    expect(input).not.toHaveAttribute("aria-valuemin");
    expect(input).not.toHaveAttribute("aria-valuemax");
    expect(input).not.toHaveAttribute("aria-valuenow");
  });

  it("resyncs the displayed value when the controlled value changes externally", () => {
    const { rerender } = render(<NumberInput aria-label="qty" value={5} />);
    expect(getInput()).toHaveValue("5");
    rerender(<NumberInput aria-label="qty" value={9} />);
    expect(getInput()).toHaveValue("9");
    rerender(<NumberInput aria-label="qty" value={null} />);
    expect(getInput()).toHaveValue("");
  });

  it("forwards a ref to the underlying input element", () => {
    const ref = { current: null as HTMLInputElement | null };
    render(<NumberInput aria-label="qty" ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});

describe("NumberInput stories", () => {
  it.each([
    ["Playground", Playground],
    ["Sizes", Sizes],
    ["MinMaxStep", MinMaxStep],
    ["Invalid", Invalid],
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
