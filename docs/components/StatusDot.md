# StatusDot

Small colored dot indicating a status, optionally with a text label. Built on `<span>`.

```tsx
import { StatusDot } from "@velody/velys";
```

## Props
| Prop | Type | Default | Description |
|---|---|---|---|
| `status` | `"neutral" \| "brand" \| "success" \| "warning" \| "danger" \| "info"` | `"neutral"` | Dot color (status solid tokens) |
| `size` | `"sm" \| "md"` | `"md"` | Dot 6/8px |
| `label` | `ReactNode` | — | Text after the dot (secondary text color) |
| `pulse` | `boolean` | `false` | Pulsing halo animation (disabled under `prefers-reduced-motion`) |
| ...rest | `HTMLAttributes<HTMLSpanElement>` | — | |

## Accessibility
The dot itself is always `aria-hidden`. With a `label`, the label is the accessible text. Without a `label`, pass `aria-label` on the root so the status is announced:

```tsx
<StatusDot status="danger" aria-label="Service down" />
```

## Examples
```tsx
<StatusDot status="success" label="Operational" />
<StatusDot status="warning" size="sm" label="Degraded" />
<StatusDot status="danger" pulse label="Recording" />
```
