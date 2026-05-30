import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { composeStories } from "@storybook/react";

import { Heading } from "./Heading";
import * as stories from "./Heading.stories";

const { Playground, Scale } = composeStories(stories);

describe("Heading", () => {
  it("renders an <h1> by default", () => {
    render(<Heading>Title</Heading>);
    expect(screen.getByRole("heading", { level: 1, name: "Title" })).toBeInTheDocument();
  });

  it("renders the semantic level given by `level`", () => {
    render(<Heading level={3}>Sub</Heading>);
    expect(screen.getByRole("heading", { level: 3, name: "Sub" })).toBeInTheDocument();
  });

  it("merges a custom className", () => {
    render(<Heading className="my-class">Styled</Heading>);
    expect(screen.getByRole("heading", { name: "Styled" })).toHaveClass("my-class");
  });
});

describe("Heading stories", () => {
  it.each([
    ["Playground", Playground],
    ["Scale", Scale],
  ])("renders the %s story", (_name, Story) => {
    const { container } = render(<Story />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no axe accessibility violations", async () => {
    const { container } = render(<Scale />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
