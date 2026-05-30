import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { composeStories } from "@storybook/react";

import { Switch } from "./Switch";
import * as stories from "./Switch.stories";

const { States } = composeStories(stories);

describe("Switch", () => {
  it("renders with role switch and is off by default", () => {
    render(<Switch label="Notifications" />);
    const sw = screen.getByRole("switch", { name: "Notifications" });
    expect(sw).toBeInTheDocument();
    expect(sw).not.toBeChecked();
  });

  it("honors defaultChecked (uncontrolled)", () => {
    render(<Switch label="Notifications" defaultChecked />);
    expect(screen.getByRole("switch")).toBeChecked();
  });

  it("calls onChange and toggles on when clicked via its label", async () => {
    const onChange = vi.fn();
    render(<Switch label="Notifications" onChange={onChange} />);
    await userEvent.click(screen.getByText("Notifications"));
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("switch")).toBeChecked();
  });

  it("does not toggle or fire onChange while disabled", async () => {
    const onChange = vi.fn();
    render(<Switch label="Notifications" disabled onChange={onChange} />);
    const sw = screen.getByRole("switch");
    expect(sw).toBeDisabled();
    await userEvent.click(sw);
    expect(onChange).not.toHaveBeenCalled();
    expect(sw).not.toBeChecked();
  });

  it("respects the controlled checked prop", () => {
    const { rerender } = render(<Switch label="N" checked={false} onChange={() => {}} />);
    expect(screen.getByRole("switch")).not.toBeChecked();
    rerender(<Switch label="N" checked onChange={() => {}} />);
    expect(screen.getByRole("switch")).toBeChecked();
  });
});

describe("Switch stories", () => {
  it.each([["States", States]])("renders the %s story", (_name, Story) => {
    const { container } = render(<Story />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no axe accessibility violations", async () => {
    const { container } = render(<States />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
