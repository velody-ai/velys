import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { composeStories } from "@storybook/react";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./Accordion";
import * as stories from "./Accordion.stories";

const { Playground, Multiple } = composeStories(stories);

function Basic(props: React.ComponentProps<typeof Accordion>) {
  return (
    <Accordion {...props}>
      <AccordionItem value="a">
        <AccordionTrigger>First</AccordionTrigger>
        <AccordionContent>First content</AccordionContent>
      </AccordionItem>
      <AccordionItem value="b">
        <AccordionTrigger>Second</AccordionTrigger>
        <AccordionContent>Second content</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

describe("Accordion", () => {
  it("toggles aria-expanded on the trigger", async () => {
    render(<Basic />);
    const first = screen.getByRole("button", { name: "First" });
    expect(first).toHaveAttribute("aria-expanded", "false");
    await userEvent.click(first);
    expect(first).toHaveAttribute("aria-expanded", "true");
    await userEvent.click(first);
    expect(first).toHaveAttribute("aria-expanded", "false");
  });

  it("opens only one item at a time in single mode", async () => {
    render(<Basic type="single" defaultValue="a" />);
    const first = screen.getByRole("button", { name: "First" });
    const second = screen.getByRole("button", { name: "Second" });
    expect(first).toHaveAttribute("aria-expanded", "true");
    await userEvent.click(second);
    expect(first).toHaveAttribute("aria-expanded", "false");
    expect(second).toHaveAttribute("aria-expanded", "true");
  });

  it("keeps multiple items open in multiple mode", async () => {
    render(<Basic type="multiple" />);
    const first = screen.getByRole("button", { name: "First" });
    const second = screen.getByRole("button", { name: "Second" });
    await userEvent.click(first);
    await userEvent.click(second);
    expect(first).toHaveAttribute("aria-expanded", "true");
    expect(second).toHaveAttribute("aria-expanded", "true");
  });

  it("wires aria-controls to the content region", () => {
    render(<Basic defaultValue="a" />);
    const first = screen.getByRole("button", { name: "First" });
    const controls = first.getAttribute("aria-controls");
    expect(document.getElementById(controls!)).toHaveTextContent("First content");
  });
});

describe("Accordion stories", () => {
  it.each([
    ["Playground", Playground],
    ["Multiple", Multiple],
  ])("renders the %s story", (_name, Story) => {
    const { container } = render(<Story />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no axe accessibility violations", async () => {
    const { container } = render(<Playground />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
