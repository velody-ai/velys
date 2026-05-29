import { useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { composeStories } from "@storybook/react";

import { Textarea } from "./Textarea";
import * as stories from "./Textarea.stories";

const { Playground, Invalid, Disabled } = composeStories(stories);

describe("Textarea", () => {
  it("updates its value when typing (uncontrolled)", async () => {
    render(<Textarea placeholder="bio" />);
    const el = screen.getByPlaceholderText("bio");
    await userEvent.type(el, "hello");
    expect(el).toHaveValue("hello");
  });

  it("reflects a controlled value and fires onChange", async () => {
    const onChange = vi.fn();

    function Controlled() {
      const [value, setValue] = useState("");
      return (
        <Textarea
          placeholder="bio"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setValue(e.target.value);
          }}
        />
      );
    }

    render(<Controlled />);
    const el = screen.getByPlaceholderText("bio");
    await userEvent.type(el, "ab");
    expect(onChange).toHaveBeenCalledTimes(2);
    expect(el).toHaveValue("ab");
  });

  it("does not accept input while disabled", async () => {
    render(<Textarea placeholder="bio" disabled />);
    const el = screen.getByPlaceholderText("bio");
    expect(el).toBeDisabled();
    await userEvent.type(el, "x");
    expect(el).toHaveValue("");
  });

  it("sets aria-invalid when invalid", () => {
    render(<Textarea placeholder="bio" invalid />);
    expect(screen.getByPlaceholderText("bio")).toHaveAttribute("aria-invalid", "true");
  });

  it("forwards a ref to the underlying textarea element", () => {
    const ref = { current: null as HTMLTextAreaElement | null };
    render(<Textarea placeholder="bio" ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
  });
});

describe("Textarea stories", () => {
  it.each([
    ["Playground", Playground],
    ["Invalid", Invalid],
    ["Disabled", Disabled],
  ])("renders the %s story", (_name, Story) => {
    const { container } = render(<Story />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no axe accessibility violations", async () => {
    const { container } = render(<Playground />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
