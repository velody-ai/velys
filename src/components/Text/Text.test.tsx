import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { composeStories } from "@storybook/react";

import { Text, Code, Kbd } from "./Text";
import * as stories from "./Text.stories";

const { Playground, Sizes, Tones, Truncated, InlineCodeAndKbd } = composeStories(stories);

describe("Text", () => {
  it("renders a <p> by default", () => {
    const { container } = render(<Text>Hello</Text>);
    expect(container.querySelector("p")).toHaveTextContent("Hello");
  });

  it("renders the element given by `as`", () => {
    const { container } = render(<Text as="span">Inline</Text>);
    expect(container.querySelector("span")).toHaveTextContent("Inline");
    expect(container.querySelector("p")).toBeNull();
  });

  it("merges a custom className", () => {
    render(<Text className="my-class">Styled</Text>);
    expect(screen.getByText("Styled")).toHaveClass("my-class");
  });

  it("renders Code as a <code> element", () => {
    const { container } = render(<Code>npm i</Code>);
    expect(container.querySelector("code")).toHaveTextContent("npm i");
  });

  it("renders Kbd as a <kbd> element", () => {
    const { container } = render(<Kbd>Esc</Kbd>);
    expect(container.querySelector("kbd")).toHaveTextContent("Esc");
  });
});

describe("Text stories", () => {
  it.each([
    ["Playground", Playground],
    ["Sizes", Sizes],
    ["Tones", Tones],
    ["Truncated", Truncated],
    ["InlineCodeAndKbd", InlineCodeAndKbd],
  ])("renders the %s story", (_name, Story) => {
    const { container } = render(<Story />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no axe accessibility violations", async () => {
    const { container } = render(<Playground />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
