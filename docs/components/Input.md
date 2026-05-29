# Input

Single-line text input. A container wrapping icon / prefix-suffix slots plus an `<input>`.

```tsx
import { Input } from "@velody/velys";
```

## Props
| Prop | Type | Default | Description |
|---|---|---|---|
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Height 32/40/48 |
| `invalid` | `boolean` | `false` | Error state (red border + `aria-invalid`) |
| `leadingIcon` | `ReactNode` | — | Left icon |
| `trailingIcon` | `ReactNode` | — | Right icon |
| `rootClassName` | `string` | — | Container className |
| `className` | `string` | — | `<input>` className |
| `disabled` | `boolean` | — | Disabled |
| ...rest | `InputHTMLAttributes` | — | `value`, `onChange`, `placeholder`, `type`, etc. |

## Examples
```tsx
<Input placeholder="Email" type="email" />
<Input invalid defaultValue="bad" />
<Input leadingIcon={<SearchIcon/>} placeholder="Search" />
```

## Notes
- Focus is rendered as a ring on the container's `:focus-within`, and a red ring when `invalid`.
