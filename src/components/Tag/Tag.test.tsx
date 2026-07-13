import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { composeStories } from "@storybook/react";

import { Tag } from "./Tag";
import { tag } from "./Tag.css";
import * as stories from "./Tag.stories";

const { Playground, ColorsAndVariants, Sizes, WithIcon, Dismissible, Disabled } =
  composeStories(stories);

describe("Tag", () => {
  it("renders its children in a span", () => {
    const { container } = render(<Tag>React</Tag>);
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(container.firstChild?.nodeName).toBe("SPAN");
  });

  it("applies the default variant classes (neutral / subtle / md)", () => {
    const { container } = render(<Tag>Default</Tag>);
    for (const cls of tag({ color: "neutral", variant: "subtle", size: "md", disabled: false }).split(" ")) {
      expect(container.firstChild).toHaveClass(cls);
    }
  });

  it("applies color, variant, and size classes", () => {
    const { container } = render(
      <Tag color="danger" variant="outline" size="sm">
        Error
      </Tag>,
    );
    for (const cls of tag({ color: "danger", variant: "outline", size: "sm", disabled: false }).split(" ")) {
      expect(container.firstChild).toHaveClass(cls);
    }
  });

  it("renders a leading icon when provided", () => {
    render(<Tag icon={<span data-testid="icon" />}>Tagged</Tag>);
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("does not render a close button without onDismiss", () => {
    render(<Tag>Plain</Tag>);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("renders a close button with the default aria-label when onDismiss is provided", () => {
    render(<Tag onDismiss={() => {}}>Chip</Tag>);
    expect(screen.getByRole("button", { name: "Remove" })).toBeInTheDocument();
  });

  it("uses a custom dismissLabel for the close button", () => {
    render(
      <Tag onDismiss={() => {}} dismissLabel="Remove React">
        React
      </Tag>,
    );
    expect(screen.getByRole("button", { name: "Remove React" })).toBeInTheDocument();
  });

  it("fires onDismiss once per click", async () => {
    const user = userEvent.setup();
    const onDismiss = vi.fn();
    render(<Tag onDismiss={onDismiss}>Chip</Tag>);
    await user.click(screen.getByRole("button", { name: "Remove" }));
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it("does not fire onDismiss when disabled", async () => {
    const user = userEvent.setup();
    const onDismiss = vi.fn();
    render(
      <Tag disabled onDismiss={onDismiss}>
        Chip
      </Tag>,
    );
    const button = screen.getByRole("button", { name: "Remove" });
    expect(button).toBeDisabled();
    await user.click(button);
    expect(onDismiss).not.toHaveBeenCalled();
  });

  it("fires onDismiss with Enter and Space on the focused close button", async () => {
    const user = userEvent.setup();
    const onDismiss = vi.fn();
    render(<Tag onDismiss={onDismiss}>Chip</Tag>);
    await user.tab();
    expect(screen.getByRole("button", { name: "Remove" })).toHaveFocus();
    await user.keyboard("{Enter}");
    expect(onDismiss).toHaveBeenCalledTimes(1);
    await user.keyboard(" ");
    expect(onDismiss).toHaveBeenCalledTimes(2);
  });

  it("keeps the root span non-focusable", async () => {
    const user = userEvent.setup();
    const { container } = render(<Tag>Plain</Tag>);
    await user.tab();
    expect(container.firstChild).not.toHaveFocus();
    expect(document.body).toHaveFocus();
  });

  it("merges a custom className and passes rest props through", () => {
    render(
      <Tag className="my-class" data-testid="tag">
        Styled
      </Tag>,
    );
    expect(screen.getByTestId("tag")).toHaveClass("my-class");
  });
});

describe("Tag stories", () => {
  it.each([
    ["Playground", Playground],
    ["ColorsAndVariants", ColorsAndVariants],
    ["Sizes", Sizes],
    ["WithIcon", WithIcon],
    ["Dismissible", Dismissible],
    ["Disabled", Disabled],
  ])("renders the %s story", (_name, Story) => {
    const { container } = render(<Story />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no axe accessibility violations", async () => {
    const { container } = render(<Dismissible />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
