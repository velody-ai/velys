import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { composeStories } from "@storybook/react";

import { Link } from "./Link";
import { link as linkRecipe } from "./Link.css";
import * as stories from "./Link.stories";

const { Playground, Tones, Underlines, External } = composeStories(stories);

describe("Link", () => {
  it("renders an anchor with its href and children", () => {
    render(<Link href="/docs">Docs</Link>);
    const anchor = screen.getByRole("link", { name: "Docs" });
    expect(anchor.tagName).toBe("A");
    expect(anchor).toHaveAttribute("href", "/docs");
  });

  it("applies default tone/underline variant classes", () => {
    render(<Link href="#">Default</Link>);
    const anchor = screen.getByRole("link");
    for (const cls of linkRecipe({ tone: "brand", underline: "hover" }).split(" ")) {
      expect(anchor).toHaveClass(cls);
    }
  });

  it("applies the requested tone and underline variant classes", () => {
    render(
      <Link href="#" tone="neutral" underline="always">
        Neutral
      </Link>,
    );
    const anchor = screen.getByRole("link");
    for (const cls of linkRecipe({ tone: "neutral", underline: "always" }).split(" ")) {
      expect(anchor).toHaveClass(cls);
    }
  });

  it("does not set target/rel or render an icon by default", () => {
    const { container } = render(<Link href="#">Plain</Link>);
    const anchor = screen.getByRole("link");
    expect(anchor).not.toHaveAttribute("target");
    expect(anchor).not.toHaveAttribute("rel");
    expect(container.querySelector("svg")).not.toBeInTheDocument();
  });

  it("external sets target/rel and renders a hidden icon plus screen-reader text", () => {
    const { container } = render(
      <Link href="https://example.com" external>
        Example
      </Link>,
    );
    const anchor = screen.getByRole("link", { name: /Example\s*\(opens in new tab\)/ });
    expect(anchor).toHaveAttribute("target", "_blank");
    expect(anchor).toHaveAttribute("rel", "noopener noreferrer");
    expect(container.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
    expect(screen.getByText("(opens in new tab)")).toBeInTheDocument();
  });

  it("merges a custom rel without duplicating tokens", () => {
    render(
      <Link href="https://example.com" external rel="me noreferrer">
        Profile
      </Link>,
    );
    expect(screen.getByRole("link")).toHaveAttribute("rel", "me noreferrer noopener");
  });

  it("keeps a user-provided rel untouched when not external", () => {
    render(
      <Link href="/docs" rel="prev">
        Previous
      </Link>,
    );
    expect(screen.getByRole("link")).toHaveAttribute("rel", "prev");
  });

  it("merges a custom className", () => {
    render(
      <Link href="#" className="my-class">
        Styled
      </Link>,
    );
    expect(screen.getByRole("link")).toHaveClass("my-class");
  });

  it("forwards its ref to the anchor element", () => {
    const ref = { current: null as HTMLAnchorElement | null };
    render(
      <Link ref={ref} href="#">
        Ref
      </Link>,
    );
    expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
  });
});

describe("Link stories", () => {
  it.each([
    ["Playground", Playground],
    ["Tones", Tones],
    ["Underlines", Underlines],
    ["External", External],
  ])("renders the %s story", (_name, Story) => {
    const { container } = render(<Story />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no axe accessibility violations", async () => {
    const { container } = render(<Tones />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
