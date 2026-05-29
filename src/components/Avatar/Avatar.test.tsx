import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { composeStories } from "@storybook/react";

import { Avatar } from "./Avatar";
import * as stories from "./Avatar.stories";

const { Sizes, Types } = composeStories(stories);

describe("Avatar", () => {
  it("renders an image when src is provided", () => {
    render(<Avatar src="https://example.com/a.png" alt="User avatar" />);
    const img = screen.getByRole("img", { name: "User avatar" });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "https://example.com/a.png");
  });

  it("falls back to an empty alt when src has no alt", () => {
    const { container } = render(<Avatar src="https://example.com/a.png" />);
    const img = container.querySelector("img");
    expect(img).toHaveAttribute("alt", "");
  });

  it("renders initials when no image is provided", () => {
    render(<Avatar initials="AB" />);
    expect(screen.getByText("AB")).toBeInTheDocument();
  });

  it("prefers the image over initials when both are given", () => {
    render(<Avatar src="https://example.com/a.png" alt="pic" initials="AB" />);
    expect(screen.getByRole("img", { name: "pic" })).toBeInTheDocument();
    expect(screen.queryByText("AB")).not.toBeInTheDocument();
  });

  it("renders a custom icon when no image/initials", () => {
    render(<Avatar icon={<span data-testid="custom-icon" />} />);
    expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
  });

  it("renders the fallback glyph when nothing is provided", () => {
    const { container } = render(<Avatar />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("merges a custom className", () => {
    const { container } = render(<Avatar initials="AB" className="my-class" />);
    expect(container.firstChild).toHaveClass("my-class");
  });
});

describe("Avatar stories", () => {
  it.each([
    ["Sizes", Sizes],
    ["Types", Types],
  ])("renders the %s story", (_name, Story) => {
    const { container } = render(<Story />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no axe accessibility violations", async () => {
    const { container } = render(<Sizes />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
