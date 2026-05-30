import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { composeStories } from "@storybook/react";

import { Card, CardTitle, CardDescription } from "./Card";
import * as stories from "./Card.stories";

const { Variants } = composeStories(stories);

describe("Card", () => {
  it("renders its children", () => {
    render(<Card>Card body</Card>);
    expect(screen.getByText("Card body")).toBeInTheDocument();
  });

  it("forwards arbitrary HTML attributes", () => {
    render(<Card data-testid="card">content</Card>);
    expect(screen.getByTestId("card")).toBeInTheDocument();
  });

  it("merges a custom className", () => {
    const { container } = render(<Card className="my-class">x</Card>);
    expect(container.firstChild).toHaveClass("my-class");
  });

  it("renders CardTitle as an h3 heading", () => {
    render(<CardTitle>Title</CardTitle>);
    const heading = screen.getByRole("heading", { name: "Title", level: 3 });
    expect(heading).toBeInTheDocument();
  });

  it("renders CardDescription as a paragraph", () => {
    render(<CardDescription>Description</CardDescription>);
    const desc = screen.getByText("Description");
    expect(desc.tagName).toBe("P");
  });

  it("composes title and description inside a card", () => {
    render(
      <Card>
        <CardTitle>My Card</CardTitle>
        <CardDescription>Some text</CardDescription>
      </Card>,
    );
    expect(screen.getByRole("heading", { name: "My Card" })).toBeInTheDocument();
    expect(screen.getByText("Some text")).toBeInTheDocument();
  });
});

describe("Card stories", () => {
  it.each([["Variants", Variants]])("renders the %s story", (_name, Story) => {
    const { container } = render(<Story />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no axe accessibility violations", async () => {
    const { container } = render(<Variants />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
