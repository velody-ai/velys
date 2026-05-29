# Badge

Small label indicating status/category. Built on `<span>`.

```tsx
import { Badge } from "@velody/velys";
```

## Props
| Prop | Type | Default | Description |
|---|---|---|---|
| `color` | `"neutral" \| "brand" \| "success" \| "warning" \| "danger" \| "info"` | `"neutral"` | Color |
| `variant` | `"solid" \| "subtle"` | `"subtle"` | Fill style |
| `size` | `"sm" \| "md"` | `"md"` | Height 20/24 |
| `withDot` | `boolean` | `false` | Leading status dot |
| `icon` | `ReactNode` | — | Leading icon |
| ...rest | `HTMLAttributes<HTMLSpanElement>` | — | |

## Examples
```tsx
<Badge color="success">Active</Badge>
<Badge color="danger" variant="solid">Error</Badge>
<Badge color="brand" withDot>New</Badge>
```
