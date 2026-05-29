# Select

A hybrid select control. On desktop (`pointer: fine`) it renders a custom, accessible listbox; on touch / coarse pointers it falls back to the native `<select>` with the OS menu.

- **Desktop:** a custom listbox (`role=listbox` / `role=option`) with full keyboard support (Arrow keys, Home, End, Enter, Escape), a check mark on the selected option, hover highlighting, and click-outside to close.
- **Touch / coarse pointer:** the native `<select>` and the OS picker.
- The displayed value is always rendered by the component's own flex-centered `<span>`, giving consistent vertical alignment and ellipsis truncation in both modes.
- In desktop mode a hidden mirror `<select>` keeps `name`/`value` form submission and `onChange` in sync, so `onChange` and form submission behave like a native `<select>` in **both** modes.

```tsx
import { Select } from "@velody/velys";
```

## Props
| Prop | Type | Default | Description |
|---|---|---|---|
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Height 32/40/48 |
| `invalid` | `boolean` | `false` | Error state |
| `placeholder` | `string` | — | Text shown when no value is selected (falls back to the empty-value `<option>` label) |
| `disabled` | `boolean` | — | Disabled |
| `children` | `ReactNode` | — | `<option>` elements |
| ...rest | `SelectHTMLAttributes` | — | `value`, `defaultValue`, `onChange`, `name`, etc. |

## Examples
```tsx
<Select defaultValue="">
  <option value="" disabled>Select an option</option>
  <option value="1">Option one</option>
  <option value="2">Option two</option>
</Select>
```

```tsx
<Select placeholder="Choose a fruit">
  <option value="apple">Apple</option>
  <option value="banana">Banana</option>
  <option value="cherry">Cherry</option>
</Select>
```

### Controlled

```tsx
const [value, setValue] = useState("");

<Select value={value} onChange={(e) => setValue(e.target.value)}>
  <option value="" disabled>Select an option</option>
  <option value="1">Option one</option>
  <option value="2">Option two</option>
</Select>
```
