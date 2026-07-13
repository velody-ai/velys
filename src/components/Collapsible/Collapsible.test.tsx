import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { composeStories } from "@storybook/react";

import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "./Collapsible";
import * as stories from "./Collapsible.stories";

const { Playground, DefaultOpen, Controlled, Disabled, CustomTrigger } =
  composeStories(stories);

function Basic(props: React.ComponentProps<typeof Collapsible>) {
  return (
    <Collapsible {...props}>
      <CollapsibleTrigger>Toggle</CollapsibleTrigger>
      <CollapsibleContent>Panel content</CollapsibleContent>
    </Collapsible>
  );
}

describe("Collapsible", () => {
  it("toggles aria-expanded on the trigger (uncontrolled)", async () => {
    render(<Basic />);
    const trigger = screen.getByRole("button", { name: "Toggle" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    await userEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    await userEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("starts open with defaultOpen", () => {
    render(<Basic defaultOpen />);
    expect(screen.getByRole("button", { name: "Toggle" })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
  });

  it("keeps content mounted while closed", () => {
    render(<Basic />);
    expect(screen.getByText("Panel content")).toBeInTheDocument();
  });

  it("respects the controlled open prop and reports via onOpenChange", async () => {
    const onOpenChange = vi.fn();
    render(<Basic open={false} onOpenChange={onOpenChange} />);
    const trigger = screen.getByRole("button", { name: "Toggle" });
    await userEvent.click(trigger);
    expect(onOpenChange).toHaveBeenCalledWith(true);
    // Parent did not update the prop, so the state must not change.
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("calls onOpenChange with the next state when uncontrolled", async () => {
    const onOpenChange = vi.fn();
    render(<Basic onOpenChange={onOpenChange} />);
    const trigger = screen.getByRole("button", { name: "Toggle" });
    await userEvent.click(trigger);
    expect(onOpenChange).toHaveBeenLastCalledWith(true);
    await userEvent.click(trigger);
    expect(onOpenChange).toHaveBeenLastCalledWith(false);
  });

  it("wires aria-controls and aria-labelledby between trigger and content", () => {
    render(<Basic defaultOpen />);
    const trigger = screen.getByRole("button", { name: "Toggle" });
    const contentId = trigger.getAttribute("aria-controls");
    const content = document.getElementById(contentId!);
    expect(content).toHaveTextContent("Panel content");
    expect(content).toHaveAttribute("aria-labelledby", trigger.id);
  });

  it("exposes data-state on trigger and content", async () => {
    render(<Basic />);
    const trigger = screen.getByRole("button", { name: "Toggle" });
    const content = document.getElementById(trigger.getAttribute("aria-controls")!)!;
    expect(trigger).toHaveAttribute("data-state", "closed");
    expect(content).toHaveAttribute("data-state", "closed");
    await userEvent.click(trigger);
    expect(trigger).toHaveAttribute("data-state", "open");
    expect(content).toHaveAttribute("data-state", "open");
  });

  it("blocks toggling when disabled on the root", async () => {
    const onOpenChange = vi.fn();
    render(<Basic disabled onOpenChange={onOpenChange} />);
    const trigger = screen.getByRole("button", { name: "Toggle" });
    expect(trigger).toBeDisabled();
    await userEvent.click(trigger);
    expect(onOpenChange).not.toHaveBeenCalled();
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("supports disabled directly on the trigger", async () => {
    const onOpenChange = vi.fn();
    render(
      <Collapsible onOpenChange={onOpenChange}>
        <CollapsibleTrigger disabled>Toggle</CollapsibleTrigger>
        <CollapsibleContent>Panel content</CollapsibleContent>
      </Collapsible>,
    );
    const trigger = screen.getByRole("button", { name: "Toggle" });
    expect(trigger).toBeDisabled();
    await userEvent.click(trigger);
    expect(onOpenChange).not.toHaveBeenCalled();
  });

  it("throws when parts are used outside <Collapsible>", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<CollapsibleTrigger>Orphan</CollapsibleTrigger>)).toThrow(
      /within <Collapsible>/,
    );
    spy.mockRestore();
  });
});

describe("Collapsible stories", () => {
  it.each([
    ["Playground", Playground],
    ["DefaultOpen", DefaultOpen],
    ["Controlled", Controlled],
    ["Disabled", Disabled],
    ["CustomTrigger", CustomTrigger],
  ])("renders the %s story", (_name, Story) => {
    const { container } = render(<Story />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no axe accessibility violations", async () => {
    const { container } = render(<DefaultOpen />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
