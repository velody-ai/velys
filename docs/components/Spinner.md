# Spinner

Indeterminate loading indicator. Renders a `role="status"` element with a visually hidden label.

```tsx
import { Spinner } from "@velody/velys";
```

## Props
| Prop | Type | Default | Description |
|---|---|---|---|
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | 16/20/28px |
| `tone` | `"current" \| "brand" \| "muted"` | `"brand"` | Active arc color (`current` = inherit) |
| `label` | `string` | `"Loading"` | Screen-reader label |
| ...rest | `HTMLAttributes<HTMLSpanElement>` | — | |

## Examples
```tsx
<Spinner />
<Spinner size="lg" tone="brand" />
<span style={{ color: "red" }}><Spinner tone="current" /></span>
```
