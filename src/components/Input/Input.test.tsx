import { useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { composeStories } from "@storybook/react";

import { Input } from "./Input";
import * as stories from "./Input.stories";

const { Playground, Sizes, States } = composeStories(stories);

describe("Input", () => {
  it("updates its value when typing (uncontrolled)", async () => {
    render(<Input placeholder="name" />);
    const input = screen.getByPlaceholderText("name");
    await userEvent.type(input, "hello");
    expect(input).toHaveValue("hello");
  });

  it("reflects a controlled value and fires onChange", async () => {
    const onChange = vi.fn();

    function Controlled() {
      const [value, setValue] = useState("");
      return (
        <Input
          placeholder="name"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setValue(e.target.value);
          }}
        />
      );
    }

    render(<Controlled />);
    const input = screen.getByPlaceholderText("name");
    await userEvent.type(input, "ab");
    expect(onChange).toHaveBeenCalledTimes(2);
    expect(input).toHaveValue("ab");
  });

  it("does not accept input while disabled", async () => {
    render(<Input placeholder="name" disabled />);
    const input = screen.getByPlaceholderText("name");
    expect(input).toBeDisabled();
    await userEvent.type(input, "x");
    expect(input).toHaveValue("");
  });

  it("sets aria-invalid when invalid", () => {
    render(<Input placeholder="name" invalid />);
    expect(screen.getByPlaceholderText("name")).toHaveAttribute("aria-invalid", "true");
  });

  it("forwards a ref to the underlying input element", () => {
    const ref = { current: null as HTMLInputElement | null };
    render(<Input placeholder="name" ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it("renders leading and trailing icon slots", () => {
    render(
      <Input
        placeholder="name"
        leadingIcon={<span data-testid="lead" />}
        trailingIcon={<span data-testid="trail" />}
      />,
    );
    expect(screen.getByTestId("lead")).toBeInTheDocument();
    expect(screen.getByTestId("trail")).toBeInTheDocument();
  });
});

describe("Input stories", () => {
  it.each([
    ["Playground", Playground],
    ["Sizes", Sizes],
    ["States", States],
  ])("renders the %s story", (_name, Story) => {
    const { container } = render(<Story />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no axe accessibility violations", async () => {
    const { container } = render(<Playground />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
