import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { composeStories } from "@storybook/react";

import { Pagination, getPaginationRange } from "./Pagination";
import * as stories from "./Pagination.stories";

const { Playground, ManyPages, Small } = composeStories(stories);

describe("getPaginationRange", () => {
  it("lists every page when the count is small", () => {
    expect(getPaginationRange(1, 5)).toEqual([1, 2, 3, 4, 5]);
  });

  it("inserts ellipses around the middle for large counts", () => {
    const range = getPaginationRange(8, 20);
    expect(range).toContain("start-ellipsis");
    expect(range).toContain("end-ellipsis");
    expect(range[0]).toBe(1);
    expect(range[range.length - 1]).toBe(20);
  });
});

describe("Pagination", () => {
  it("marks the current page with aria-current", () => {
    render(<Pagination page={3} count={5} />);
    expect(screen.getByRole("button", { name: "Page 3" })).toHaveAttribute("aria-current", "page");
  });

  it("calls onPageChange when a page is clicked", async () => {
    const onPageChange = vi.fn();
    render(<Pagination page={1} count={5} onPageChange={onPageChange} />);
    await userEvent.click(screen.getByRole("button", { name: "Page 3" }));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it("disables Previous on the first page", async () => {
    const onPageChange = vi.fn();
    render(<Pagination page={1} count={5} onPageChange={onPageChange} />);
    const prev = screen.getByRole("button", { name: "Previous page" });
    expect(prev).toHaveAttribute("aria-disabled", "true");
    await userEvent.click(prev);
    expect(onPageChange).not.toHaveBeenCalled();
  });

  it("advances with the Next button", async () => {
    const onPageChange = vi.fn();
    render(<Pagination page={2} count={5} onPageChange={onPageChange} />);
    await userEvent.click(screen.getByRole("button", { name: "Next page" }));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });
});

describe("Pagination stories", () => {
  it.each([
    ["Playground", Playground],
    ["ManyPages", ManyPages],
    ["Small", Small],
  ])("renders the %s story", (_name, Story) => {
    const { container } = render(<Story />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no axe accessibility violations", async () => {
    const { container } = render(<ManyPages />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
