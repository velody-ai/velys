import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { composeStories } from "@storybook/react";

import { Spinner } from "./Spinner";
import * as stories from "./Spinner.stories";

const { Playground, Sizes, Tones } = composeStories(stories);

describe("Spinner", () => {
  it("exposes a status role", () => {
    render(<Spinner />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("uses a default accessible label", () => {
    render(<Spinner />);
    expect(screen.getByText("Loading")).toBeInTheDocument();
  });

  it("accepts a custom label", () => {
    render(<Spinner label="Saving…" />);
    expect(screen.getByText("Saving…")).toBeInTheDocument();
  });

  it("merges a custom className", () => {
    render(<Spinner className="my-class" />);
    expect(screen.getByRole("status")).toHaveClass("my-class");
  });
});

describe("Spinner stories", () => {
  it.each([
    ["Playground", Playground],
    ["Sizes", Sizes],
    ["Tones", Tones],
  ])("renders the %s story", (_name, Story) => {
    const { container } = render(<Story />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no axe accessibility violations", async () => {
    const { container } = render(<Playground />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
