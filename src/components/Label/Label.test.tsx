import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { composeStories } from "@storybook/react";

import { Label, Field } from "./Label";
import * as stories from "./Label.stories";

const { Playground, Sizes, Required, WithInput, ErrorState, WithSelect, WithTextarea, Disabled } =
  composeStories(stories);

describe("Label", () => {
  it("renders its children inside a label element", () => {
    render(<Label>Email</Label>);
    expect(screen.getByText("Email").tagName).toBe("LABEL");
  });

  it("associates with an input via htmlFor", () => {
    render(
      <>
        <Label htmlFor="email">Email</Label>
        <input id="email" />
      </>,
    );
    // getByLabelText resolves the htmlFor -> id association.
    expect(screen.getByLabelText("Email")).toBe(screen.getByRole("textbox"));
  });

  it("renders a required asterisk that is hidden from a11y tree", () => {
    render(<Label required>Full name</Label>);
    const asterisk = screen.getByText("*");
    expect(asterisk).toHaveAttribute("aria-hidden");
  });

  it("merges a custom className", () => {
    render(<Label className="my-class">Email</Label>);
    expect(screen.getByText("Email")).toHaveClass("my-class");
  });

  it("Field exposes invalid/disabled as data attributes", () => {
    const { rerender } = render(<Field data-testid="field" invalid disabled />);
    const field = screen.getByTestId("field");
    expect(field).toHaveAttribute("data-invalid", "true");
    expect(field).toHaveAttribute("data-disabled", "true");

    rerender(<Field data-testid="field" />);
    expect(screen.getByTestId("field")).not.toHaveAttribute("data-invalid");
    expect(screen.getByTestId("field")).not.toHaveAttribute("data-disabled");
  });
});

describe("Label stories", () => {
  it.each([
    ["Playground", Playground],
    ["Sizes", Sizes],
    ["Required", Required],
    ["WithInput", WithInput],
    ["ErrorState", ErrorState],
    ["WithSelect", WithSelect],
    ["WithTextarea", WithTextarea],
    ["Disabled", Disabled],
  ])("renders the %s story", (_name, Story) => {
    const { container } = render(<Story />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no axe accessibility violations", async () => {
    const { container } = render(<WithInput />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
