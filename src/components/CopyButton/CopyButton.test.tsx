import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { composeStories } from "@storybook/react";

import { CopyButton } from "./CopyButton";
import * as stories from "./CopyButton.stories";

// Reuse the Storybook stories as test fixtures (theme decorator + args applied).
const { Playground, Sizes, CustomTimeout, Disabled } = composeStories(stories);

const writeText = vi.fn();

beforeEach(() => {
  writeText.mockReset().mockResolvedValue(undefined);
  Object.defineProperty(navigator, "clipboard", {
    value: { writeText },
    configurable: true,
  });
});

afterEach(() => {
  vi.useRealTimers();
});

describe("CopyButton", () => {
  it("renders a button with the default 'Copy' aria-label", () => {
    render(<CopyButton value="hello" />);
    expect(screen.getByRole("button", { name: "Copy" })).toBeInTheDocument();
  });

  it("defaults to type='button'", () => {
    render(<CopyButton value="hello" />);
    expect(screen.getByRole("button")).toHaveAttribute("type", "button");
  });

  it("allows overriding the aria-label", () => {
    render(<CopyButton value="hello" aria-label="Copy install command" />);
    expect(screen.getByRole("button", { name: "Copy install command" })).toBeInTheDocument();
  });

  it("writes the value to the clipboard on click", async () => {
    render(<CopyButton value="npm install @velody/velys" />);
    await userEvent.click(screen.getByRole("button"));
    expect(writeText).toHaveBeenCalledTimes(1);
    expect(writeText).toHaveBeenCalledWith("npm install @velody/velys");
  });

  it("swaps to the copied state after a successful write", async () => {
    const { container } = render(<CopyButton value="hello" />);
    const idleIcon = container.querySelector("svg");
    await userEvent.click(screen.getByRole("button"));
    expect(screen.getByRole("button")).toHaveAccessibleName("Copied");
    // The icon swaps from CopyIcon to CheckIcon.
    const copiedIcon = container.querySelector("svg");
    expect(copiedIcon).not.toBeNull();
    expect(copiedIcon?.innerHTML).not.toBe(idleIcon?.innerHTML);
    // The visually-hidden live region announces the copy.
    expect(screen.getByRole("status")).toHaveTextContent("Copied");
  });

  it("fires onCopied with the value after a successful write", async () => {
    const onCopied = vi.fn();
    render(<CopyButton value="hello" onCopied={onCopied} />);
    await userEvent.click(screen.getByRole("button"));
    expect(onCopied).toHaveBeenCalledTimes(1);
    expect(onCopied).toHaveBeenCalledWith("hello");
  });

  it("does not enter the copied state when the clipboard write fails", async () => {
    writeText.mockRejectedValueOnce(new Error("denied"));
    const onCopied = vi.fn();
    render(<CopyButton value="hello" onCopied={onCopied} />);
    await userEvent.click(screen.getByRole("button"));
    expect(screen.getByRole("button")).toHaveAccessibleName("Copy");
    expect(onCopied).not.toHaveBeenCalled();
  });

  it("resets the copied state after the timeout", async () => {
    vi.useFakeTimers();
    render(<CopyButton value="hello" timeout={1000} />);
    // fireEvent (not userEvent) so no real timers are needed for the click itself;
    // the async clipboard write settles inside act.
    await act(async () => {
      fireEvent.click(screen.getByRole("button"));
    });
    expect(screen.getByRole("button")).toHaveAccessibleName("Copied");
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(screen.getByRole("button")).toHaveAccessibleName("Copy");
    expect(screen.getByRole("status")).toBeEmptyDOMElement();
  });

  it("forwards onClick alongside the copy behavior", async () => {
    const onClick = vi.fn();
    render(<CopyButton value="hello" onClick={onClick} />);
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("merges a custom className", () => {
    render(<CopyButton value="hello" className="my-class" />);
    expect(screen.getByRole("button")).toHaveClass("my-class");
  });
});

describe("CopyButton stories", () => {
  // Smoke-test every exported story renders without throwing.
  it.each([
    ["Playground", Playground],
    ["Sizes", Sizes],
    ["CustomTimeout", CustomTimeout],
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
