import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { composeStories } from "@storybook/react";

import { Toggle, ToggleGroup, ToggleGroupItem, type ToggleGroupProps } from "./Toggle";
import * as stories from "./Toggle.stories";

// Reuse the Storybook stories as test fixtures (theme decorator + args applied).
const { Playground, Sizes, Pressed, Disabled, SingleGroup, SingleGroupAlwaysOn, MultipleGroup } =
  composeStories(stories);

describe("Toggle", () => {
  it("renders a type='button' with aria-pressed='false' by default", () => {
    render(<Toggle>Bold</Toggle>);
    const btn = screen.getByRole("button", { name: "Bold" });
    expect(btn).toHaveAttribute("type", "button");
    expect(btn).toHaveAttribute("aria-pressed", "false");
  });

  it("honors defaultPressed", () => {
    render(<Toggle defaultPressed>Bold</Toggle>);
    expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "true");
  });

  it("toggles aria-pressed on click (uncontrolled)", async () => {
    render(<Toggle>Bold</Toggle>);
    const btn = screen.getByRole("button");
    await userEvent.click(btn);
    expect(btn).toHaveAttribute("aria-pressed", "true");
    await userEvent.click(btn);
    expect(btn).toHaveAttribute("aria-pressed", "false");
  });

  it("calls onPressedChange with the next state", async () => {
    const onPressedChange = vi.fn();
    render(<Toggle onPressedChange={onPressedChange}>Bold</Toggle>);
    const btn = screen.getByRole("button");
    await userEvent.click(btn);
    expect(onPressedChange).toHaveBeenLastCalledWith(true);
    await userEvent.click(btn);
    expect(onPressedChange).toHaveBeenLastCalledWith(false);
  });

  it("stays at the controlled value until the prop changes", async () => {
    const onPressedChange = vi.fn();
    const { rerender } = render(
      <Toggle pressed={false} onPressedChange={onPressedChange}>
        Bold
      </Toggle>,
    );
    const btn = screen.getByRole("button");
    await userEvent.click(btn);
    expect(onPressedChange).toHaveBeenCalledWith(true);
    expect(btn).toHaveAttribute("aria-pressed", "false"); // prop not updated yet
    rerender(
      <Toggle pressed onPressedChange={onPressedChange}>
        Bold
      </Toggle>,
    );
    expect(btn).toHaveAttribute("aria-pressed", "true");
  });

  it("does not toggle or call handlers while disabled", async () => {
    const onPressedChange = vi.fn();
    render(
      <Toggle disabled onPressedChange={onPressedChange}>
        Bold
      </Toggle>,
    );
    const btn = screen.getByRole("button");
    expect(btn).toBeDisabled();
    await userEvent.click(btn);
    expect(onPressedChange).not.toHaveBeenCalled();
    expect(btn).toHaveAttribute("aria-pressed", "false");
  });

  it("applies a different recipe class per size", () => {
    render(
      <>
        <Toggle size="small">S</Toggle>
        <Toggle size="large">L</Toggle>
      </>,
    );
    const [small, large] = screen.getAllByRole("button");
    expect(small.className).not.toBe(large.className);
  });

  it("merges a custom className with the recipe class", () => {
    render(<Toggle className="my-class">Bold</Toggle>);
    expect(screen.getByRole("button")).toHaveClass("my-class");
  });
});

describe("ToggleGroup", () => {
  const renderSingle = (props: Partial<ToggleGroupProps> = {}) =>
    render(
      <ToggleGroup aria-label="Text alignment" {...props}>
        <ToggleGroupItem value="left">Left</ToggleGroupItem>
        <ToggleGroupItem value="center">Center</ToggleGroupItem>
        <ToggleGroupItem value="right">Right</ToggleGroupItem>
      </ToggleGroup>,
    );

  it("renders a role='group' with an accessible name", () => {
    renderSingle();
    expect(screen.getByRole("group", { name: "Text alignment" })).toBeInTheDocument();
  });

  it("single: pressing an item unpresses the others", async () => {
    const onValueChange = vi.fn();
    renderSingle({ defaultValue: "left", onValueChange });
    expect(screen.getByRole("button", { name: "Left" })).toHaveAttribute("aria-pressed", "true");
    await userEvent.click(screen.getByRole("button", { name: "Center" }));
    expect(screen.getByRole("button", { name: "Center" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: "Left" })).toHaveAttribute("aria-pressed", "false");
    expect(onValueChange).toHaveBeenLastCalledWith(["center"]);
  });

  it("single: allowEmpty (default) lets the active item be unpressed", async () => {
    const onValueChange = vi.fn();
    renderSingle({ defaultValue: "left", onValueChange });
    await userEvent.click(screen.getByRole("button", { name: "Left" }));
    expect(screen.getByRole("button", { name: "Left" })).toHaveAttribute("aria-pressed", "false");
    expect(onValueChange).toHaveBeenLastCalledWith([]);
  });

  it("single: allowEmpty=false keeps the active item pressed", async () => {
    const onValueChange = vi.fn();
    renderSingle({ defaultValue: "left", allowEmpty: false, onValueChange });
    await userEvent.click(screen.getByRole("button", { name: "Left" }));
    expect(screen.getByRole("button", { name: "Left" })).toHaveAttribute("aria-pressed", "true");
    expect(onValueChange).not.toHaveBeenCalled();
    // Switching to another item still works.
    await userEvent.click(screen.getByRole("button", { name: "Right" }));
    expect(onValueChange).toHaveBeenLastCalledWith(["right"]);
  });

  it("multiple: toggles items independently", async () => {
    const onValueChange = vi.fn();
    render(
      <ToggleGroup type="multiple" aria-label="Text formatting" onValueChange={onValueChange}>
        <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
        <ToggleGroupItem value="italic">Italic</ToggleGroupItem>
      </ToggleGroup>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Bold" }));
    await userEvent.click(screen.getByRole("button", { name: "Italic" }));
    expect(screen.getByRole("button", { name: "Bold" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: "Italic" })).toHaveAttribute("aria-pressed", "true");
    expect(onValueChange).toHaveBeenLastCalledWith(["bold", "italic"]);
    await userEvent.click(screen.getByRole("button", { name: "Bold" }));
    expect(screen.getByRole("button", { name: "Bold" })).toHaveAttribute("aria-pressed", "false");
    expect(onValueChange).toHaveBeenLastCalledWith(["italic"]);
  });

  it("controlled: follows the value prop, accepting a plain string", async () => {
    const onValueChange = vi.fn();
    renderSingle({ value: "center", onValueChange });
    expect(screen.getByRole("button", { name: "Center" })).toHaveAttribute("aria-pressed", "true");
    await userEvent.click(screen.getByRole("button", { name: "Left" }));
    expect(onValueChange).toHaveBeenLastCalledWith(["left"]);
    // Still controlled by the unchanged prop.
    expect(screen.getByRole("button", { name: "Center" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: "Left" })).toHaveAttribute("aria-pressed", "false");
  });

  it("disabled cascades to every item", async () => {
    const onValueChange = vi.fn();
    renderSingle({ disabled: true, onValueChange });
    for (const btn of screen.getAllByRole("button")) expect(btn).toBeDisabled();
    await userEvent.click(screen.getByRole("button", { name: "Left" }));
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it("size cascades from the group to its items", () => {
    render(
      <>
        <ToggleGroup aria-label="Small group" size="small">
          <ToggleGroupItem value="a">A</ToggleGroupItem>
        </ToggleGroup>
        <ToggleGroup aria-label="Large group" size="large">
          <ToggleGroupItem value="b">B</ToggleGroupItem>
        </ToggleGroup>
      </>,
    );
    const [small, large] = screen.getAllByRole("button");
    expect(small.className).not.toBe(large.className);
  });

  it("throws when ToggleGroupItem is used outside a ToggleGroup", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<ToggleGroupItem value="a">A</ToggleGroupItem>)).toThrow(
      /must be used within <ToggleGroup>/,
    );
    spy.mockRestore();
  });
});

describe("Toggle stories", () => {
  // Smoke-test every exported story renders without throwing.
  it.each([
    ["Playground", Playground],
    ["Sizes", Sizes],
    ["Pressed", Pressed],
    ["Disabled", Disabled],
    ["SingleGroup", SingleGroup],
    ["SingleGroupAlwaysOn", SingleGroupAlwaysOn],
    ["MultipleGroup", MultipleGroup],
  ])("renders the %s story", (_name, Story) => {
    const { container } = render(<Story />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no axe accessibility violations (standalone)", async () => {
    const { container } = render(<Playground />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it("has no axe accessibility violations (group)", async () => {
    const { container } = render(<SingleGroup />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
