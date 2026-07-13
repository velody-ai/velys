import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { composeStories } from "@storybook/react";

import { Calendar } from "./Calendar";
import * as stories from "./Calendar.stories";

const { Playground, WithValue, MinMax, DisabledDates, WeekStartsMonday, Locale } =
  composeStories(stories);

/** en-US `dateStyle: "full"` — the day buttons' accessible name. */
const fullDate = (d: Date) => new Intl.DateTimeFormat("en-US", { dateStyle: "full" }).format(d);

describe("Calendar", () => {
  it("shows the month caption and navigates with the header buttons", async () => {
    render(<Calendar locale="en-US" defaultMonth={new Date(2026, 5, 15)} />);
    expect(screen.getByRole("group", { name: "June 2026" })).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: "Next month" }));
    expect(screen.getByRole("group", { name: "July 2026" })).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: "Previous month" }));
    await userEvent.click(screen.getByRole("button", { name: "Previous month" }));
    expect(screen.getByRole("group", { name: "May 2026" })).toBeInTheDocument();
  });

  it("notifies onMonthChange with the start of the new month", async () => {
    const onMonthChange = vi.fn();
    render(
      <Calendar locale="en-US" defaultMonth={new Date(2026, 5, 15)} onMonthChange={onMonthChange} />,
    );
    await userEvent.click(screen.getByRole("button", { name: "Next month" }));
    expect(onMonthChange).toHaveBeenCalledWith(new Date(2026, 6, 1));
  });

  it("supports the full keyboard navigation matrix", async () => {
    render(<Calendar locale="en-US" defaultValue={new Date(2026, 6, 15)} />);
    screen.getByRole("button", { name: fullDate(new Date(2026, 6, 15)) }).focus();

    await userEvent.keyboard("{ArrowRight}");
    expect(document.activeElement).toHaveAccessibleName(fullDate(new Date(2026, 6, 16)));

    await userEvent.keyboard("{ArrowDown}");
    expect(document.activeElement).toHaveAccessibleName(fullDate(new Date(2026, 6, 23)));

    await userEvent.keyboard("{ArrowLeft}");
    expect(document.activeElement).toHaveAccessibleName(fullDate(new Date(2026, 6, 22)));

    await userEvent.keyboard("{ArrowUp}");
    expect(document.activeElement).toHaveAccessibleName(fullDate(new Date(2026, 6, 15)));

    await userEvent.keyboard("{Home}");
    expect(document.activeElement).toHaveAccessibleName(fullDate(new Date(2026, 6, 12)));

    await userEvent.keyboard("{End}");
    expect(document.activeElement).toHaveAccessibleName(fullDate(new Date(2026, 6, 18)));

    await userEvent.keyboard("{PageUp}");
    expect(document.activeElement).toHaveAccessibleName(fullDate(new Date(2026, 5, 18)));
    expect(screen.getByRole("group", { name: "June 2026" })).toBeInTheDocument();

    await userEvent.keyboard("{Shift>}{PageUp}{/Shift}");
    expect(document.activeElement).toHaveAccessibleName(fullDate(new Date(2025, 5, 18)));

    await userEvent.keyboard("{PageDown}");
    expect(document.activeElement).toHaveAccessibleName(fullDate(new Date(2025, 6, 18)));

    await userEvent.keyboard("{Shift>}{PageDown}{/Shift}");
    expect(document.activeElement).toHaveAccessibleName(fullDate(new Date(2026, 6, 18)));
    expect(screen.getByRole("group", { name: "July 2026" })).toBeInTheDocument();
  });

  it("respects weekStartsOn for Home/End", async () => {
    render(<Calendar locale="en-US" weekStartsOn={1} defaultValue={new Date(2026, 6, 15)} />);
    screen.getByRole("button", { name: fullDate(new Date(2026, 6, 15)) }).focus();

    await userEvent.keyboard("{Home}");
    expect(document.activeElement).toHaveAccessibleName(fullDate(new Date(2026, 6, 13))); // Monday

    await userEvent.keyboard("{End}");
    expect(document.activeElement).toHaveAccessibleName(fullDate(new Date(2026, 6, 19))); // Sunday
  });

  it("auto-advances the displayed month when arrowing past the edge", async () => {
    render(<Calendar locale="en-US" defaultValue={new Date(2026, 6, 31)} />);
    screen.getByRole("button", { name: fullDate(new Date(2026, 6, 31)) }).focus();

    await userEvent.keyboard("{ArrowRight}");
    expect(screen.getByRole("group", { name: "August 2026" })).toBeInTheDocument();
    expect(document.activeElement).toHaveAccessibleName(fullDate(new Date(2026, 7, 1)));
  });

  it("disables out-of-range days and both nav buttons under min/max", () => {
    render(
      <Calendar
        locale="en-US"
        defaultMonth={new Date(2026, 5, 1)}
        min={new Date(2026, 5, 10)}
        max={new Date(2026, 5, 20)}
      />,
    );
    expect(screen.getByRole("button", { name: fullDate(new Date(2026, 5, 9)) })).toBeDisabled();
    expect(screen.getByRole("button", { name: fullDate(new Date(2026, 5, 10)) })).toBeEnabled();
    expect(screen.getByRole("button", { name: fullDate(new Date(2026, 5, 20)) })).toBeEnabled();
    expect(screen.getByRole("button", { name: fullDate(new Date(2026, 5, 21)) })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Previous month" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Next month" })).toBeDisabled();
  });

  it("disables days flagged by isDateDisabled and ignores clicks on them", async () => {
    const onValueChange = vi.fn();
    render(
      <Calendar
        locale="en-US"
        defaultMonth={new Date(2026, 5, 1)}
        isDateDisabled={(d) => d.getDay() === 0 || d.getDay() === 6}
        onValueChange={onValueChange}
      />,
    );
    const saturday = screen.getByRole("button", { name: fullDate(new Date(2026, 5, 13)) });
    expect(saturday).toBeDisabled();
    await userEvent.click(saturday);
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it("selects a day and fires onValueChange with a local-midnight date", async () => {
    const onValueChange = vi.fn();
    render(
      <Calendar locale="en-US" defaultMonth={new Date(2026, 5, 1)} onValueChange={onValueChange} />,
    );
    await userEvent.click(screen.getByRole("button", { name: fullDate(new Date(2026, 5, 15)) }));
    expect(onValueChange).toHaveBeenCalledTimes(1);
    expect(onValueChange.mock.calls[0][0]).toEqual(new Date(2026, 5, 15));
    expect(
      screen.getByRole("button", { name: fullDate(new Date(2026, 5, 15)) }).closest("td"),
    ).toHaveAttribute("aria-selected", "true");
  });

  it("selects the focused day with Enter", async () => {
    const onValueChange = vi.fn();
    render(
      <Calendar locale="en-US" defaultValue={new Date(2026, 6, 15)} onValueChange={onValueChange} />,
    );
    screen.getByRole("button", { name: fullDate(new Date(2026, 6, 15)) }).focus();
    await userEvent.keyboard("{ArrowRight}{Enter}");
    expect(onValueChange).toHaveBeenCalledTimes(1);
    expect(onValueChange.mock.calls[0][0]).toEqual(new Date(2026, 6, 16));
  });

  it("keeps exactly one day button tabbable (roving tabindex)", async () => {
    render(<Calendar locale="en-US" defaultValue={new Date(2026, 6, 15)} />);
    const grid = screen.getByRole("grid");
    const tabbable = within(grid)
      .getAllByRole("button")
      .filter((b) => b.tabIndex === 0);
    expect(tabbable).toHaveLength(1);
    expect(tabbable[0]).toHaveAccessibleName(fullDate(new Date(2026, 6, 15)));

    tabbable[0].focus();
    await userEvent.keyboard("{ArrowRight}");
    const after = within(grid)
      .getAllByRole("button")
      .filter((b) => b.tabIndex === 0);
    expect(after).toHaveLength(1);
    expect(after[0]).toHaveAccessibleName(fullDate(new Date(2026, 6, 16)));
  });

  it("selecting an outside day selects it and navigates to its month", async () => {
    const onValueChange = vi.fn();
    render(
      <Calendar locale="en-US" defaultMonth={new Date(2026, 5, 1)} onValueChange={onValueChange} />,
    );
    // June 2026 starts on a Monday, so Sunday May 31 leads the grid.
    await userEvent.click(screen.getByRole("button", { name: fullDate(new Date(2026, 4, 31)) }));
    expect(onValueChange).toHaveBeenCalledTimes(1);
    expect(onValueChange.mock.calls[0][0]).toEqual(new Date(2026, 4, 31));
    expect(screen.getByRole("group", { name: "May 2026" })).toBeInTheDocument();
  });

  it("hides outside days when showOutsideDays is false", () => {
    render(
      <Calendar locale="en-US" defaultMonth={new Date(2026, 5, 1)} showOutsideDays={false} />,
    );
    expect(
      screen.queryByRole("button", { name: fullDate(new Date(2026, 4, 31)) }),
    ).not.toBeInTheDocument();
  });

  describe("with today pinned to 2026-07-11", () => {
    beforeEach(() => {
      vi.useFakeTimers({ toFake: ["Date"] });
      vi.setSystemTime(new Date(2026, 6, 11, 12, 0, 0));
    });
    afterEach(() => {
      vi.useRealTimers();
    });

    it("marks today with aria-current=date and defaults the month to today", () => {
      render(<Calendar locale="en-US" />);
      expect(screen.getByRole("group", { name: "July 2026" })).toBeInTheDocument();
      const todayButton = screen.getByRole("button", { name: fullDate(new Date(2026, 6, 11)) });
      expect(todayButton).toHaveAttribute("aria-current", "date");
      // Only today carries aria-current.
      const grid = screen.getByRole("grid");
      const current = within(grid)
        .getAllByRole("button")
        .filter((b) => b.getAttribute("aria-current") === "date");
      expect(current).toHaveLength(1);
    });
  });
});

describe("Calendar stories", () => {
  it.each([
    ["Playground", Playground],
    ["WithValue", WithValue],
    ["MinMax", MinMax],
    ["DisabledDates", DisabledDates],
    ["WeekStartsMonday", WeekStartsMonday],
    ["Locale", Locale],
  ])("renders the %s story", (_name, Story) => {
    const { container } = render(<Story />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no axe accessibility violations", async () => {
    const { container } = render(<WithValue />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
