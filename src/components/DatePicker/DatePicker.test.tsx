import { useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { composeStories } from "@storybook/react";

import { DatePicker } from "./DatePicker";
import * as stories from "./DatePicker.stories";

const { Playground, Sizes, Invalid, Disabled, MinMax, Controlled, WithFormName } =
  composeStories(stories);

/** en-US display format used by the input. */
const display = (d: Date) =>
  new Intl.DateTimeFormat("en-US", { year: "numeric", month: "2-digit", day: "2-digit" }).format(d);
/** en-US `dateStyle: "full"` — the calendar day buttons' accessible name. */
const fullDate = (d: Date) => new Intl.DateTimeFormat("en-US", { dateStyle: "full" }).format(d);

function renderPicker(props?: Partial<React.ComponentProps<typeof DatePicker>>) {
  return render(<DatePicker aria-label="Date" locale="en-US" {...props} />);
}

const getInput = () => screen.getByRole("textbox", { name: "Date" });

describe("DatePicker", () => {
  it("commits an ISO date typed into the input on Enter", async () => {
    const onValueChange = vi.fn();
    renderPicker({ onValueChange });
    await userEvent.type(getInput(), "2026-07-11{Enter}");
    expect(onValueChange).toHaveBeenCalledTimes(1);
    expect(onValueChange).toHaveBeenCalledWith(new Date(2026, 6, 11));
    expect(getInput()).toHaveValue("07/11/2026");
  });

  it("commits a locale-pattern date (en-US MM/DD/YYYY) on Enter", async () => {
    const onValueChange = vi.fn();
    renderPicker({ onValueChange });
    await userEvent.type(getInput(), "07/11/2026{Enter}");
    expect(onValueChange).toHaveBeenCalledWith(new Date(2026, 6, 11));
    expect(getInput()).toHaveValue("07/11/2026");
  });

  it("uses the locale numeric pattern as the default placeholder", () => {
    renderPicker();
    expect(getInput()).toHaveAttribute("placeholder", "MM/DD/YYYY");
  });

  it("reverts garbage input to the formatted value on blur", async () => {
    const onValueChange = vi.fn();
    renderPicker({ defaultValue: new Date(2026, 6, 11), onValueChange });
    const input = getInput();
    expect(input).toHaveValue("07/11/2026");
    await userEvent.clear(input);
    await userEvent.type(input, "not a date");
    await userEvent.tab();
    expect(input).toHaveValue("07/11/2026");
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it("rejects a typed date outside min/max and reverts", async () => {
    const onValueChange = vi.fn();
    renderPicker({
      defaultValue: new Date(2026, 6, 11),
      min: new Date(2026, 6, 1),
      max: new Date(2026, 6, 31),
      onValueChange,
    });
    const input = getInput();
    await userEvent.clear(input);
    await userEvent.type(input, "2026-08-15{Enter}");
    expect(onValueChange).not.toHaveBeenCalled();
    expect(input).toHaveValue("07/11/2026");
  });

  it("commits null when the input is cleared", async () => {
    const onValueChange = vi.fn();
    renderPicker({ defaultValue: new Date(2026, 6, 11), onValueChange });
    const input = getInput();
    await userEvent.clear(input);
    await userEvent.keyboard("{Enter}");
    expect(onValueChange).toHaveBeenCalledWith(null);
    expect(input).toHaveValue("");
  });

  it("opens the popup and focuses the calendar grid on ArrowDown", async () => {
    renderPicker({ defaultValue: new Date(2026, 6, 11) });
    getInput().focus();
    await userEvent.keyboard("{ArrowDown}");
    expect(screen.getByRole("dialog", { name: "Choose date" })).toBeInTheDocument();
    expect(document.activeElement).toHaveAccessibleName(fullDate(new Date(2026, 6, 11)));
  });

  it("selects a date from the popup: formats the input, closes, refocuses the input", async () => {
    const onValueChange = vi.fn();
    renderPicker({ defaultValue: new Date(2026, 6, 11), onValueChange });
    await userEvent.click(screen.getByRole("button", { name: "Open calendar" }));
    expect(screen.getByRole("dialog", { name: "Choose date" })).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: fullDate(new Date(2026, 6, 15)) }));
    expect(onValueChange).toHaveBeenCalledWith(new Date(2026, 6, 15));
    expect(getInput()).toHaveValue(display(new Date(2026, 6, 15)));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(getInput()).toHaveFocus();
  });

  it("closes on Escape and refocuses the input", async () => {
    renderPicker({ defaultValue: new Date(2026, 6, 11) });
    await userEvent.click(screen.getByRole("button", { name: "Open calendar" }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    await userEvent.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(getInput()).toHaveFocus();
  });

  it("closes on outside pointerdown", async () => {
    renderPicker({});
    await userEvent.click(screen.getByRole("button", { name: "Open calendar" }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    await userEvent.click(document.body);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("mirrors the value into a hidden ISO input when name is set", () => {
    const { container } = renderPicker({ name: "dob", defaultValue: new Date(2026, 6, 11) });
    const hidden = container.querySelector<HTMLInputElement>('input[type="hidden"][name="dob"]');
    expect(hidden).not.toBeNull();
    expect(hidden!.value).toBe("2026-07-11");
    // The visible text input must not carry the name (no double submission).
    expect(getInput()).not.toHaveAttribute("name");
  });

  it("supports a controlled value round-trip", async () => {
    function Harness() {
      const [value, setValue] = useState<Date | null>(new Date(2026, 6, 11));
      return (
        <>
          <DatePicker aria-label="Date" locale="en-US" value={value} onValueChange={setValue} />
          <button type="button" onClick={() => setValue(new Date(2026, 11, 25))}>
            Set external
          </button>
          <span data-testid="state">{value ? value.toDateString() : "null"}</span>
        </>
      );
    }
    render(<Harness />);
    const input = getInput();
    expect(input).toHaveValue("07/11/2026");

    await userEvent.clear(input);
    await userEvent.type(input, "2026-08-01{Enter}");
    expect(screen.getByTestId("state")).toHaveTextContent("Sat Aug 01 2026");
    expect(input).toHaveValue("08/01/2026");

    await userEvent.click(screen.getByRole("button", { name: "Set external" }));
    expect(input).toHaveValue("12/25/2026");
  });

  it("does not open when disabled", async () => {
    renderPicker({ disabled: true, defaultValue: new Date(2026, 6, 11) });
    const toggle = screen.getByRole("button", { name: "Open calendar" });
    expect(toggle).toBeDisabled();
    expect(getInput()).toBeDisabled();
    await userEvent.click(toggle);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});

describe("DatePicker stories", () => {
  it.each([
    ["Playground", Playground],
    ["Sizes", Sizes],
    ["Invalid", Invalid],
    ["Disabled", Disabled],
    ["MinMax", MinMax],
    ["Controlled", Controlled],
    ["WithFormName", WithFormName],
  ])("renders the %s story", (_name, Story) => {
    const { container } = render(<Story />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no axe accessibility violations", async () => {
    const { container } = render(<Playground />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
