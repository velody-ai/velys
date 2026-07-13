import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { composeStories } from "@storybook/react";

import { Stack } from "./Stack";
import { stack } from "./Stack.css";
import * as stories from "./Stack.stories";

const { Playground, Direction, Gap, Align, Justify, Wrap } = composeStories(stories);

describe("Stack", () => {
  it("renders its children", () => {
    render(
      <Stack>
        <span>First</span>
        <span>Second</span>
      </Stack>,
    );
    expect(screen.getByText("First")).toBeInTheDocument();
    expect(screen.getByText("Second")).toBeInTheDocument();
  });

  it("renders a div with the default variant classes", () => {
    const { container } = render(<Stack>Content</Stack>);
    expect(container.firstChild?.nodeName).toBe("DIV");
    expect(container.firstChild).toHaveClass(...stack().split(" "));
  });

  it("applies the direction variant class", () => {
    const { container } = render(<Stack direction="row">Row</Stack>);
    expect(container.firstChild).toHaveClass(...stack({ direction: "row" }).split(" "));
  });

  it("applies the gap variant class", () => {
    const { container } = render(<Stack gap="lg">Gapped</Stack>);
    expect(container.firstChild).toHaveClass(...stack({ gap: "lg" }).split(" "));
  });

  it("applies the align and justify variant classes", () => {
    const { container } = render(
      <Stack align="center" justify="between">
        Aligned
      </Stack>,
    );
    expect(container.firstChild).toHaveClass(
      ...stack({ align: "center", justify: "between" }).split(" "),
    );
  });

  it("applies the wrap variant class", () => {
    const { container } = render(<Stack wrap>Wrapped</Stack>);
    expect(container.firstChild).toHaveClass(...stack({ wrap: true }).split(" "));
  });

  it("merges a custom className", () => {
    const { container } = render(<Stack className="my-class">Styled</Stack>);
    expect(container.firstChild).toHaveClass("my-class");
    expect(container.firstChild).toHaveClass(...stack().split(" "));
  });

  it("passes through role and aria attributes", () => {
    render(
      <Stack role="list" aria-label="Items">
        <span role="listitem">Item</span>
      </Stack>,
    );
    expect(screen.getByRole("list", { name: "Items" })).toBeInTheDocument();
  });
});

describe("Stack stories", () => {
  it.each([
    ["Playground", Playground],
    ["Direction", Direction],
    ["Gap", Gap],
    ["Align", Align],
    ["Justify", Justify],
    ["Wrap", Wrap],
  ])("renders the %s story", (_name, Story) => {
    const { container } = render(<Story />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no axe accessibility violations", async () => {
    const { container } = render(<Playground />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
