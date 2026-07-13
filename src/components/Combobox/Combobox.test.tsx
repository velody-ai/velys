import { useState } from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { composeStories } from "@storybook/react";

import { Combobox, ComboboxInput, ComboboxList, ComboboxItem, ComboboxEmpty } from "./Combobox";
import * as stories from "./Combobox.stories";

const {
  Playground,
  Sizes,
  Invalid,
  Disabled,
  Controlled,
  CustomFilter,
  ExternalFilter,
  EmptyState,
} = composeStories(stories);

const FRUITS = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "blueberry", label: "Blueberry" },
  { value: "durian", label: "Durian", disabled: true },
  { value: "cherry", label: "Cherry" },
];

function renderCombobox(props?: React.ComponentProps<typeof Combobox>) {
  return render(
    <Combobox {...props}>
      <ComboboxInput aria-label="Fruit" placeholder="Search a fruit…" />
      <ComboboxList>
        {FRUITS.map((f) => (
          <ComboboxItem key={f.value} value={f.value} disabled={f.disabled}>
            {f.label}
          </ComboboxItem>
        ))}
        <ComboboxEmpty>No results found.</ComboboxEmpty>
      </ComboboxList>
    </Combobox>,
  );
}

const getInput = () => screen.getByRole("combobox");

describe("Combobox", () => {
  it("stays closed until the user interacts", () => {
    renderCombobox();
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    expect(getInput()).toHaveAttribute("aria-expanded", "false");
  });

  it("opens on typing and filters options case-insensitively", async () => {
    renderCombobox();
    await userEvent.type(getInput(), "B");
    const listbox = screen.getByRole("listbox");
    const options = within(listbox).getAllByRole("option");
    expect(options.map((o) => o.textContent)).toEqual(["Banana", "Blueberry"]);
  });

  it("applies a custom filter", async () => {
    renderCombobox({ filter: (text, search) => text.toLowerCase().startsWith(search.toLowerCase()) });
    await userEvent.type(getInput(), "ch");
    const options = within(screen.getByRole("listbox")).getAllByRole("option");
    expect(options.map((o) => o.textContent)).toEqual(["Cherry"]);
  });

  it("shows all items when filter is null (external filtering)", async () => {
    renderCombobox({ filter: null });
    await userEvent.type(getInput(), "zzz");
    const options = within(screen.getByRole("listbox")).getAllByRole("option");
    expect(options).toHaveLength(FRUITS.length);
  });

  it("commits value and input text on click, firing each callback once", async () => {
    const onValueChange = vi.fn();
    const onInputValueChange = vi.fn();
    renderCombobox({ onValueChange, onInputValueChange });
    await userEvent.type(getInput(), "ban");
    await userEvent.click(screen.getByRole("option", { name: "Banana" }));
    expect(onValueChange).toHaveBeenCalledTimes(1);
    expect(onValueChange).toHaveBeenCalledWith("banana");
    // typing fired 3 changes; the commit adds exactly one more with the item's text
    expect(onInputValueChange).toHaveBeenCalledTimes(4);
    expect(onInputValueChange).toHaveBeenLastCalledWith("Banana");
    expect(getInput()).toHaveValue("Banana");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    expect(getInput()).toHaveFocus();
  });

  it("selects with ArrowDown + Enter", async () => {
    const onValueChange = vi.fn();
    renderCombobox({ onValueChange });
    const input = getInput();
    await userEvent.click(input);
    await userEvent.keyboard("{ArrowDown}"); // opens, highlights first
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    await userEvent.keyboard("{ArrowDown}"); // Apple → Banana
    await userEvent.keyboard("{Enter}");
    expect(onValueChange).toHaveBeenCalledWith("banana");
    expect(input).toHaveValue("Banana");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("opens with the selected item highlighted", async () => {
    renderCombobox({ defaultValue: "cherry", defaultInputValue: "Cherry" });
    const input = getInput();
    await userEvent.click(input);
    await userEvent.keyboard("{ArrowDown}");
    const activeId = input.getAttribute("aria-activedescendant")!;
    expect(document.getElementById(activeId)).toHaveTextContent("Cherry");
  });

  it("reverts the input text on Escape without committing", async () => {
    const onValueChange = vi.fn();
    renderCombobox({ defaultValue: "banana", defaultInputValue: "Banana", onValueChange });
    const input = getInput();
    await userEvent.type(input, "xx");
    expect(input).toHaveValue("Bananaxx");
    await userEvent.keyboard("{Escape}");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    expect(input).toHaveValue("Banana");
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it("reverts the input text on outside click", async () => {
    renderCombobox({ defaultValue: "banana", defaultInputValue: "Banana" });
    const input = getInput();
    await userEvent.clear(input);
    await userEvent.type(input, "che");
    await userEvent.click(document.body);
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    expect(input).toHaveValue("Banana");
  });

  it("deselects (value → null) when cleared and closed", async () => {
    const onValueChange = vi.fn();
    renderCombobox({ defaultValue: "banana", defaultInputValue: "Banana", onValueChange });
    const input = getInput();
    await userEvent.clear(input);
    await userEvent.type(input, "a");
    await userEvent.clear(input);
    await userEvent.keyboard("{Escape}");
    expect(onValueChange).toHaveBeenCalledTimes(1);
    expect(onValueChange).toHaveBeenCalledWith(null);
    expect(input).toHaveValue("");
  });

  it("toggles the empty state with the filter results", async () => {
    renderCombobox();
    const input = getInput();
    await userEvent.type(input, "zzz");
    expect(screen.getByText("No results found.")).toBeInTheDocument();
    expect(screen.queryAllByRole("option")).toHaveLength(0);
    await userEvent.clear(input);
    await userEvent.type(input, "app");
    expect(screen.queryByText("No results found.")).not.toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Apple" })).toBeInTheDocument();
  });

  it("skips disabled items with arrow keys and ignores clicks on them", async () => {
    const onValueChange = vi.fn();
    renderCombobox({ onValueChange });
    const input = getInput();
    await userEvent.click(input);
    // Open (→ Apple), then Banana, Blueberry, and past disabled Durian to Cherry.
    await userEvent.keyboard("{ArrowDown}{ArrowDown}{ArrowDown}{ArrowDown}");
    const activeId = input.getAttribute("aria-activedescendant")!;
    expect(document.getElementById(activeId)).toHaveTextContent("Cherry");
    await userEvent.click(screen.getByRole("option", { name: "Durian" }));
    expect(onValueChange).not.toHaveBeenCalled();
    expect(screen.getByRole("listbox")).toBeInTheDocument();
  });

  it("keeps aria-activedescendant in sync with the highlighted option", async () => {
    renderCombobox();
    const input = getInput();
    expect(input).not.toHaveAttribute("aria-activedescendant");
    await userEvent.type(input, "b");
    let active = document.getElementById(input.getAttribute("aria-activedescendant")!);
    expect(active).toHaveTextContent("Banana");
    await userEvent.hover(screen.getByRole("option", { name: "Blueberry" }));
    active = document.getElementById(input.getAttribute("aria-activedescendant")!);
    expect(active).toHaveTextContent("Blueberry");
    expect(active).toHaveAttribute("role", "option");
  });

  it("wires aria-expanded and aria-controls to the listbox", async () => {
    renderCombobox();
    const input = getInput();
    expect(input).toHaveAttribute("aria-expanded", "false");
    expect(input).not.toHaveAttribute("aria-controls");
    expect(input).toHaveAttribute("aria-autocomplete", "list");
    await userEvent.type(input, "a");
    expect(input).toHaveAttribute("aria-expanded", "true");
    expect(input.getAttribute("aria-controls")).toBe(screen.getByRole("listbox").id);
  });

  it("round-trips controlled value and inputValue", async () => {
    function Harness() {
      const [value, setValue] = useState<string | null>(null);
      const [inputValue, setInputValue] = useState("");
      return (
        <>
          <Combobox
            value={value}
            onValueChange={setValue}
            inputValue={inputValue}
            onInputValueChange={setInputValue}
          >
            <ComboboxInput aria-label="Fruit" />
            <ComboboxList>
              {FRUITS.map((f) => (
                <ComboboxItem key={f.value} value={f.value}>
                  {f.label}
                </ComboboxItem>
              ))}
            </ComboboxList>
          </Combobox>
          <output data-testid="state">{`${value ?? "null"}|${inputValue}`}</output>
        </>
      );
    }
    render(<Harness />);
    const input = getInput();
    await userEvent.type(input, "che");
    expect(screen.getByTestId("state")).toHaveTextContent("null|che");
    await userEvent.click(screen.getByRole("option", { name: "Cherry" }));
    expect(screen.getByTestId("state")).toHaveTextContent("cherry|Cherry");
    expect(input).toHaveValue("Cherry");
  });

  it("does not open when disabled", async () => {
    renderCombobox({ disabled: true });
    const input = getInput();
    expect(input).toBeDisabled();
    await userEvent.type(input, "a");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });
});

describe("Combobox stories", () => {
  it.each([
    ["Playground", Playground],
    ["Sizes", Sizes],
    ["Invalid", Invalid],
    ["Disabled", Disabled],
    ["Controlled", Controlled],
    ["CustomFilter", CustomFilter],
    ["ExternalFilter", ExternalFilter],
    ["EmptyState", EmptyState],
  ])("renders the %s story", (_name, Story) => {
    const { container } = render(<Story />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("has no axe accessibility violations while open", async () => {
    // The listbox portals to document.body, so audit baseElement to include it.
    // The page-level "region" landmark rule doesn't apply to a lone component
    // fixture (test DOM has no <main>), so it is the only rule disabled.
    const { baseElement } = render(<Playground />);
    await userEvent.type(screen.getByRole("combobox"), "a");
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    const results = await axe(baseElement, { rules: { region: { enabled: false } } });
    expect(results).toHaveNoViolations();
  });
});
