import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { composeStories } from "@storybook/react";

import { Checkbox } from "./Checkbox";
import * as stories from "./Checkbox.stories";

const { States } = composeStories(stories);

describe("Checkbox", () => {
  it("renders an unchecked checkbox by default", () => {
    render(<Checkbox label="Accept" />);
    const box = screen.getByRole("checkbox", { name: "Accept" });
    expect(box).toBeInTheDocument();
    expect(box).not.toBeChecked();
  });

  it("honors defaultChecked (uncontrolled)", () => {
    render(<Checkbox label="Accept" defaultChecked />);
    expect(screen.getByRole("checkbox")).toBeChecked();
  });

  it("calls onChange when clicked via its label", async () => {
    const onChange = vi.fn();
    render(<Checkbox label="Accept" onChange={onChange} />);
    await userEvent.click(screen.getByText("Accept"));
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("checkbox")).toBeChecked();
  });

  it("does not toggle or fire onChange while disabled", async () => {
    const onChange = vi.fn();
    render(<Checkbox label="Accept" disabled onChange={onChange} />);
    const box = screen.getByRole("checkbox");
    expect(box).toBeDisabled();
    await userEvent.click(box);
    expect(onChange).not.toHaveBeenCalled();
    expect(box).not.toBeChecked();
  });

  it("respects the controlled checked prop", () => {
    const { rerender } = render(<Checkbox label="Accept" checked={false} onChange={() => {}} />);
    expect(screen.getByRole("checkbox")).not.toBeChecked();
    rerender(<Checkbox label="Accept" checked onChange={() => {}} />);
    expect(screen.getByRole("checkbox")).toBeChecked();
  });

  it("reflects the indeterminate prop on the input element", () => {
    render(<Checkbox label="Accept" indeterminate />);
    expect((screen.getByRole("checkbox") as HTMLInputElement).indeterminate).toBe(true);
  });

  it("sets aria-invalid when invalid", () => {
    render(<Checkbox label="Accept" invalid />);
    expect(screen.getByRole("checkbox")).toHaveAttribute("aria-invalid", "true");
  });
});

describe("Checkbox stories", () => {
  it.each([["States", States]])("renders the %s story", (_name, Story) => {
    const { container } = render(<Story />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no axe accessibility violations", async () => {
    const { container } = render(<States />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
