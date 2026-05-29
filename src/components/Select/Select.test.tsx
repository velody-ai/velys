import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { composeStories } from "@storybook/react";

import { Select } from "./Select";
import * as stories from "./Select.stories";

const { Playground, WithValue, Sizes, Invalid, Disabled } = composeStories(stories);

function renderSelect(props?: React.ComponentProps<typeof Select>) {
  return render(
    <Select {...props}>
      <option value="">Select an option</option>
      <option value="1">Option one</option>
      <option value="2">Option two</option>
      <option value="3" disabled>
        Option three
      </option>
    </Select>,
  );
}

describe("Select", () => {
  it("shows the placeholder option label until a value is selected", () => {
    renderSelect();
    expect(screen.getByRole("button")).toHaveTextContent("Select an option");
  });

  it("opens a listbox of the non-empty options on click", async () => {
    renderSelect();
    await userEvent.click(screen.getByRole("button"));
    const listbox = screen.getByRole("listbox");
    const options = within(listbox).getAllByRole("option");
    expect(options).toHaveLength(3);
    expect(options[0]).toHaveTextContent("Option one");
  });

  it("selects an option and fires onChange", async () => {
    const onChange = vi.fn();
    renderSelect({ onChange });
    await userEvent.click(screen.getByRole("button"));
    await userEvent.click(screen.getByRole("option", { name: "Option two" }));
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][0].target.value).toBe("2");
    expect(screen.getByRole("button")).toHaveTextContent("Option two");
  });

  it("reflects a defaultValue", () => {
    renderSelect({ defaultValue: "1" });
    expect(screen.getByRole("button")).toHaveTextContent("Option one");
  });

  it("does not select a disabled option", async () => {
    const onChange = vi.fn();
    renderSelect({ onChange });
    await userEvent.click(screen.getByRole("button"));
    await userEvent.click(screen.getByRole("option", { name: "Option three" }));
    expect(onChange).not.toHaveBeenCalled();
  });

  it("does not open when disabled", async () => {
    renderSelect({ disabled: true });
    const trigger = screen.getByRole("button");
    expect(trigger).toBeDisabled();
    await userEvent.click(trigger);
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });
});

describe("Select stories", () => {
  it.each([
    ["Playground", Playground],
    ["WithValue", WithValue],
    ["Sizes", Sizes],
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
