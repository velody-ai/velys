import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { composeStories } from "@storybook/react";

import { Radio, RadioGroup } from "./Radio";
import * as stories from "./Radio.stories";

const { Group } = composeStories(stories);

describe("Radio", () => {
  it("renders a radio input associated with its label", () => {
    render(<Radio label="Free" value="free" />);
    const radio = screen.getByRole("radio", { name: "Free" });
    expect(radio).toBeInTheDocument();
    expect(radio).not.toBeChecked();
  });

  it("calls onChange and becomes checked when clicked via its label", async () => {
    const onChange = vi.fn();
    render(<Radio label="Pro" value="pro" onChange={onChange} />);
    await userEvent.click(screen.getByText("Pro"));
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("radio")).toBeChecked();
  });

  it("does not fire onChange while disabled", async () => {
    const onChange = vi.fn();
    render(<Radio label="Pro" value="pro" disabled onChange={onChange} />);
    const radio = screen.getByRole("radio");
    expect(radio).toBeDisabled();
    await userEvent.click(radio);
    expect(onChange).not.toHaveBeenCalled();
    expect(radio).not.toBeChecked();
  });

  it("allows only one selection within a shared name group", async () => {
    render(
      <RadioGroup>
        <Radio name="plan" value="free" label="Free" />
        <Radio name="plan" value="pro" label="Pro" />
      </RadioGroup>,
    );
    const free = screen.getByRole("radio", { name: "Free" });
    const pro = screen.getByRole("radio", { name: "Pro" });

    await userEvent.click(free);
    expect(free).toBeChecked();
    expect(pro).not.toBeChecked();

    await userEvent.click(pro);
    expect(pro).toBeChecked();
    expect(free).not.toBeChecked();
  });

  it("RadioGroup renders its children inside a fieldset", () => {
    render(
      <RadioGroup>
        <Radio name="g" value="a" label="A" />
      </RadioGroup>,
    );
    expect(screen.getByRole("group")).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: "A" })).toBeInTheDocument();
  });
});

describe("Radio stories", () => {
  it.each([["Group", Group]])("renders the %s story", (_name, Story) => {
    const { container } = render(<Story />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no axe accessibility violations", async () => {
    const { container } = render(<Group />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
