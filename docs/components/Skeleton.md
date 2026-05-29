# Skeleton

Loading placeholder with a pulse animation. `aria-hidden` by default.

```tsx
import { Skeleton } from "@velody/velys";
```

## Props
| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `"text" \| "rectangular" \| "circular"` | `"rectangular"` | Shape |
| `width` | `number \| string` | — | CSS width |
| `height` | `number \| string` | — | CSS height |
| `lines` | `number` | — | For `variant="text"`: render multiple lines (last shortened) |
| ...rest | `HTMLAttributes<HTMLDivElement>` | — | |

## Examples
```tsx
<Skeleton width={240} height={80} />
<Skeleton variant="circular" width={40} height={40} />
<Skeleton variant="text" lines={3} />
```
