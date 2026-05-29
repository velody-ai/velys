# Textarea

Multi-line text input. Built on `<textarea>`, with vertical resize.

```tsx
import { Textarea } from "@velody/velys";
```

## Props
| Prop | Type | Default | Description |
|---|---|---|---|
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | min-height 72/96/128 |
| `invalid` | `boolean` | `false` | Error state |
| `disabled` | `boolean` | — | Disabled |
| ...rest | `TextareaHTMLAttributes` | — | `value`, `onChange`, `rows`, `placeholder`, etc. |

## Examples
```tsx
<Textarea placeholder="Enter a description" />
<Textarea size="lg" invalid defaultValue="Too short" />
```
