import { useMemo, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Combobox, ComboboxInput, ComboboxList, ComboboxItem, ComboboxEmpty } from "./Combobox";

const FRUITS = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "blueberry", label: "Blueberry" },
  { value: "cherry", label: "Cherry" },
  { value: "grape", label: "Grape" },
  { value: "kiwi", label: "Kiwi" },
  { value: "mango", label: "Mango" },
];

const meta: Meta<typeof Combobox> = {
  title: "Components/Combobox",
  component: Combobox,
  render: (args) => (
    <div style={{ width: 240 }}>
      <Combobox {...args}>
        <ComboboxInput aria-label="Fruit" placeholder="Search a fruit…" />
        <ComboboxList>
          {FRUITS.map((f) => (
            <ComboboxItem key={f.value} value={f.value}>
              {f.label}
            </ComboboxItem>
          ))}
          <ComboboxEmpty>No results found.</ComboboxEmpty>
        </ComboboxList>
      </Combobox>
    </div>
  ),
};
export default meta;
type Story = StoryObj<typeof Combobox>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, width: 240 }}>
      {(["sm", "md", "lg"] as const).map((size) => (
        <Combobox key={size} defaultValue="apple" defaultInputValue="Apple">
          <ComboboxInput size={size} aria-label={`Fruit (${size})`} placeholder="Search a fruit…" />
          <ComboboxList>
            {FRUITS.map((f) => (
              <ComboboxItem key={f.value} value={f.value}>
                {f.label}
              </ComboboxItem>
            ))}
          </ComboboxList>
        </Combobox>
      ))}
    </div>
  ),
};

export const Invalid: Story = {
  render: () => (
    <div style={{ width: 240 }}>
      <Combobox>
        <ComboboxInput invalid aria-label="Fruit" placeholder="Search a fruit…" />
        <ComboboxList>
          {FRUITS.map((f) => (
            <ComboboxItem key={f.value} value={f.value}>
              {f.label}
            </ComboboxItem>
          ))}
        </ComboboxList>
      </Combobox>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div style={{ width: 240 }}>
      <Combobox disabled defaultValue="banana" defaultInputValue="Banana">
        <ComboboxInput aria-label="Fruit" placeholder="Search a fruit…" />
        <ComboboxList>
          {FRUITS.map((f) => (
            <ComboboxItem key={f.value} value={f.value}>
              {f.label}
            </ComboboxItem>
          ))}
        </ComboboxList>
      </Combobox>
    </div>
  ),
};

export const Controlled: Story = {
  render: function ControlledStory() {
    const [value, setValue] = useState<string | null>("cherry");
    const [inputValue, setInputValue] = useState("Cherry");
    return (
      <div style={{ width: 240, display: "grid", gap: 8 }}>
        <Combobox
          value={value}
          onValueChange={setValue}
          inputValue={inputValue}
          onInputValueChange={setInputValue}
        >
          <ComboboxInput aria-label="Fruit" placeholder="Search a fruit…" />
          <ComboboxList>
            {FRUITS.map((f) => (
              <ComboboxItem key={f.value} value={f.value}>
                {f.label}
              </ComboboxItem>
            ))}
            <ComboboxEmpty>No results found.</ComboboxEmpty>
          </ComboboxList>
        </Combobox>
        <span style={{ fontSize: 13 }}>Selected: {value ?? "none"}</span>
      </div>
    );
  },
};

export const CustomFilter: Story = {
  name: "Custom Filter (startsWith)",
  render: () => (
    <div style={{ width: 240 }}>
      <Combobox filter={(text, search) => text.toLowerCase().startsWith(search.toLowerCase())}>
        <ComboboxInput aria-label="Fruit" placeholder="Type the first letters…" />
        <ComboboxList>
          {FRUITS.map((f) => (
            <ComboboxItem key={f.value} value={f.value}>
              {f.label}
            </ComboboxItem>
          ))}
          <ComboboxEmpty>No results found.</ComboboxEmpty>
        </ComboboxList>
      </Combobox>
    </div>
  ),
};

export const ExternalFilter: Story = {
  name: "External Filtering (filter={null})",
  render: function ExternalFilterStory() {
    // With filter={null} the component never hides items itself — the consumer
    // decides what to render (e.g. results of an async/server-side search).
    const [inputValue, setInputValue] = useState("");
    const results = useMemo(
      () => FRUITS.filter((f) => f.label.toLowerCase().includes(inputValue.trim().toLowerCase())),
      [inputValue],
    );
    return (
      <div style={{ width: 240 }}>
        <Combobox filter={null} inputValue={inputValue} onInputValueChange={setInputValue}>
          <ComboboxInput aria-label="Fruit" placeholder="Search a fruit…" />
          <ComboboxList>
            {results.map((f) => (
              <ComboboxItem key={f.value} value={f.value}>
                {f.label}
              </ComboboxItem>
            ))}
            <ComboboxEmpty>No results found.</ComboboxEmpty>
          </ComboboxList>
        </Combobox>
      </div>
    );
  },
};

export const EmptyState: Story = {
  render: () => (
    <div style={{ width: 240 }}>
      <Combobox defaultInputValue="zzz" defaultOpen>
        <ComboboxInput aria-label="Fruit" placeholder="Search a fruit…" />
        <ComboboxList>
          {FRUITS.map((f) => (
            <ComboboxItem key={f.value} value={f.value}>
              {f.label}
            </ComboboxItem>
          ))}
          <ComboboxEmpty>No results found.</ComboboxEmpty>
        </ComboboxList>
      </Combobox>
    </div>
  ),
};
