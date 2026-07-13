import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { composeStories } from "@storybook/react";

import { Snippet } from "./Snippet";
import * as stories from "./Snippet.stories";

// Reuse the Storybook stories as test fixtures (theme decorator + args applied).
const { Playground, Sizes, MultiLine, NoPrompt, NonCopyable } = composeStories(stories);

const writeText = vi.fn();

beforeEach(() => {
  writeText.mockReset().mockResolvedValue(undefined);
  Object.defineProperty(navigator, "clipboard", {
    value: { writeText },
    configurable: true,
  });
});

describe("Snippet", () => {
  it("renders a single-line command inside pre > code", () => {
    const { container } = render(<Snippet text="npm install" />);
    expect(screen.getByText("npm install")).toBeInTheDocument();
    expect(container.querySelector("pre > code")).toHaveTextContent("npm install");
  });

  it("renders every line of a multi-line snippet", () => {
    render(<Snippet text={["cd velys", "npm install", "npm test"]} />);
    expect(screen.getByText("cd velys")).toBeInTheDocument();
    expect(screen.getByText("npm install")).toBeInTheDocument();
    expect(screen.getByText("npm test")).toBeInTheDocument();
  });

  it("copies a single line as-is", async () => {
    render(<Snippet text="npm install" />);
    await userEvent.click(screen.getByRole("button", { name: "Copy" }));
    expect(writeText).toHaveBeenCalledWith("npm install");
  });

  it("copies multi-line text joined with newlines", async () => {
    render(<Snippet text={["cd velys", "npm install"]} />);
    await userEvent.click(screen.getByRole("button", { name: "Copy" }));
    expect(writeText).toHaveBeenCalledWith("cd velys\nnpm install");
  });

  it("keeps the prompt marker out of the copied text and the DOM text content", async () => {
    const { container } = render(<Snippet text="npm install" prompt />);
    // "$ " lives in a CSS ::before pseudo-element only.
    expect(container.textContent).not.toContain("$");
    await userEvent.click(screen.getByRole("button", { name: "Copy" }));
    expect(writeText).toHaveBeenCalledWith("npm install");
  });

  it("hides the copy button when copyable is false", () => {
    render(<Snippet text="npm install" copyable={false} />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("forwards onCopied to the copy button", async () => {
    const onCopied = vi.fn();
    render(<Snippet text={["a", "b"]} onCopied={onCopied} />);
    await userEvent.click(screen.getByRole("button", { name: "Copy" }));
    expect(onCopied).toHaveBeenCalledTimes(1);
    expect(onCopied).toHaveBeenCalledWith("a\nb");
  });

  it("merges a custom className", () => {
    const { container } = render(<Snippet text="x" className="my-class" />);
    expect(container.firstChild).toHaveClass("my-class");
  });
});

describe("Snippet stories", () => {
  // Smoke-test every exported story renders without throwing.
  it.each([
    ["Playground", Playground],
    ["Sizes", Sizes],
    ["MultiLine", MultiLine],
    ["NoPrompt", NoPrompt],
    ["NonCopyable", NonCopyable],
  ])("renders the %s story", (_name, Story) => {
    const { container } = render(<Story />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no axe accessibility violations", async () => {
    const { container } = render(<Playground />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
