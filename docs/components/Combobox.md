# Combobox

An accessible autocomplete input (ARIA 1.2 combobox pattern, single-select). A text input filters a portaled listbox of options; selection commits both a `value` and the input text. Fully custom on all pointer types — no native fallback.

- **Compound API:** `Combobox` (state root) → `ComboboxInput` (field) → `ComboboxList` (portaled listbox) → `ComboboxItem` (option) + `ComboboxEmpty` (no-results row).
- **Keyboard:** ArrowDown/ArrowUp open the popup and move the highlight (no wrap), Enter selects the highlighted option, Escape/Tab/outside click close and revert the input text. Home/End keep their native text-caret behavior.
- **Filtering:** case-insensitive `includes` by default, replaceable per instance, or `filter={null}` to disable internal filtering entirely (external/async filtering).
- Closing without selecting reverts the input text to the selected option's label (or empty). Clearing the input and closing deselects — `onValueChange(null)`.
- The listbox portals to `document.body`, matches the field's width, and follows the field on scroll/resize.
- Field, panel, and option styling share the same design tokens as `Select` for visual parity.

```tsx
import { Combobox, ComboboxInput, ComboboxList, ComboboxItem, ComboboxEmpty } from "@velody/velys";
```

## Props

### Combobox
| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `string \| null` | — | Controlled selected value (`null` = no selection) |
| `defaultValue` | `string \| null` | `null` | Initial value (uncontrolled) |
| `onValueChange` | `(value: string \| null) => void` | — | Fires on select, and with `null` on deselection |
| `inputValue` | `string` | — | Controlled input text |
| `defaultInputValue` | `string` | `""` | Initial input text (uncontrolled) |
| `onInputValueChange` | `(value: string) => void` | — | Fires on typing, on commit, and on revert |
| `open` | `boolean` | — | Controlled popup state |
| `defaultOpen` | `boolean` | `false` | Initial popup state (uncontrolled) |
| `onOpenChange` | `(open: boolean) => void` | — | Popup state change |
| `filter` | `((textValue, search) => boolean) \| null` | case-insensitive `includes` | Item filter; `null` disables internal filtering |
| `disabled` | `boolean` | `false` | Disables the whole control |
| `className` | `string` | — | Class for the wrapper div |
| `children` | `ReactNode` | — | `ComboboxInput` + `ComboboxList` |

### ComboboxInput
| Prop | Type | Default | Description |
|---|---|---|---|
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Height 32/40/48 |
| `invalid` | `boolean` | `false` | Error state |
| `placeholder` | `string` | — | Input placeholder |
| ...rest | `InputHTMLAttributes` | — | Except `size`, `value`, `defaultValue`, `onChange`. Give it an accessible name (`aria-label` or a `Label`) |

Renders the field: the text input (`role="combobox"`, `aria-expanded`, `aria-controls`, `aria-autocomplete="list"`, `aria-activedescendant`) plus a trailing chevron toggle kept out of the tab order.

### ComboboxList
| Prop | Type | Default | Description |
|---|---|---|---|
| ...rest | `HTMLAttributes<HTMLDivElement>` | — | The portaled `role="listbox"` panel. Renders `null` while closed |

### ComboboxItem
| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `string` | required | Value committed on selection |
| `textValue` | `string` | string children, else `value` | Plain-text label used for filtering and as the committed input text |
| `disabled` | `boolean` | — | Skipped by arrow keys, not selectable |
| ...rest | `HTMLAttributes<HTMLDivElement>` (no `onSelect`) | — | `role="option"` row; shows a check mark when selected |

### ComboboxEmpty
| Prop | Type | Default | Description |
|---|---|---|---|
| ...rest | `HTMLAttributes<HTMLDivElement>` | — | Rendered only while open with zero visible items |

## Examples

```tsx
<Combobox>
  <ComboboxInput aria-label="Fruit" placeholder="Search a fruit…" />
  <ComboboxList>
    <ComboboxItem value="apple">Apple</ComboboxItem>
    <ComboboxItem value="banana">Banana</ComboboxItem>
    <ComboboxItem value="cherry">Cherry</ComboboxItem>
    <ComboboxEmpty>No results found.</ComboboxEmpty>
  </ComboboxList>
</Combobox>
```

### Controlled

```tsx
const [value, setValue] = useState<string | null>(null);
const [inputValue, setInputValue] = useState("");

<Combobox
  value={value}
  onValueChange={setValue}
  inputValue={inputValue}
  onInputValueChange={setInputValue}
>
  <ComboboxInput aria-label="Fruit" />
  <ComboboxList>
    <ComboboxItem value="apple">Apple</ComboboxItem>
    <ComboboxItem value="banana">Banana</ComboboxItem>
  </ComboboxList>
</Combobox>
```

### Custom filter

```tsx
<Combobox filter={(text, search) => text.toLowerCase().startsWith(search.toLowerCase())}>
  {/* … */}
</Combobox>
```

### External / async filtering

Pass `filter={null}` and render only the items you want visible (e.g. server-side search results):

```tsx
const [inputValue, setInputValue] = useState("");
const results = useFruitSearch(inputValue); // async lookup

<Combobox filter={null} inputValue={inputValue} onInputValueChange={setInputValue}>
  <ComboboxInput aria-label="Fruit" />
  <ComboboxList>
    {results.map((f) => (
      <ComboboxItem key={f.value} value={f.value}>
        {f.label}
      </ComboboxItem>
    ))}
    <ComboboxEmpty>No results found.</ComboboxEmpty>
  </ComboboxList>
</Combobox>
```
