import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { composeStories } from "@storybook/react";

import { Tooltip } from "./Tooltip";
import * as stories from "./Tooltip.stories";

const { Sides, AlwaysOpen } = composeStories(stories);

describe("Tooltip", () => {
  it("does not show the tooltip content by default", () => {
    render(
      <Tooltip content="Help text">
        <button>Trigger</button>
      </Tooltip>,
    );
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });

  it("shows the tooltip on hover and hides it on unhover", async () => {
    render(
      <Tooltip content="Help text">
        <button>Trigger</button>
      </Tooltip>,
    );
    const trigger = screen.getByRole("button", { name: "Trigger" });
    await userEvent.hover(trigger);
    expect(screen.getByRole("tooltip")).toHaveTextContent("Help text");
    await userEvent.unhover(trigger);
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });

  it("shows the tooltip when the trigger receives focus", async () => {
    render(
      <Tooltip content="Focus text">
        <button>Trigger</button>
      </Tooltip>,
    );
    await userEvent.tab();
    expect(screen.getByRole("tooltip")).toHaveTextContent("Focus text");
  });

  it("is always visible when the open prop is set", () => {
    render(
      <Tooltip content="Always" open>
        <button>Trigger</button>
      </Tooltip>,
    );
    expect(screen.getByRole("tooltip")).toHaveTextContent("Always");
  });

  it("renders the trigger child element", () => {
    render(
      <Tooltip content="x">
        <button>My Button</button>
      </Tooltip>,
    );
    expect(screen.getByRole("button", { name: "My Button" })).toBeInTheDocument();
  });
});

describe("Tooltip stories", () => {
  it.each([
    ["Sides", Sides],
    ["AlwaysOpen", AlwaysOpen],
  ])("renders the %s story", (_name, Story) => {
    const { container } = render(<Story />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no axe accessibility violations (AlwaysOpen)", async () => {
    const { container } = render(<AlwaysOpen />);
    expect(screen.getByRole("tooltip")).toBeInTheDocument();
    expect(await axe(container)).toHaveNoViolations();
  });
});
