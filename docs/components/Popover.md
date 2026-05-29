# Popover

Floating panel anchored to a trigger. Compound: `Popover` / `PopoverTrigger` / `PopoverContent`. Renders content in a portal, closes on Escape and outside click.

```tsx
import { Popover, PopoverTrigger, PopoverContent } from "@velody/velys";
```

## Props
**Popover** (root): `open?`, `defaultOpen?`, `onOpenChange?(open)`, `children`.
**PopoverTrigger**: `children` — a single focusable element; gets `aria-haspopup`/`aria-expanded` and an `onClick` toggle cloned onto it.
**PopoverContent**:
| Prop | Type | Default | Description |
|---|---|---|---|
| `side` | `"top" \| "bottom" \| "left" \| "right"` | `"bottom"` | Placement axis |
| `align` | `"start" \| "center" \| "end"` | `"center"` | Cross-axis alignment |
| `offset` | `number` | `8` | Distance from the trigger (px) |
| ...rest | `HTMLAttributes<HTMLDivElement>` | — | |

## Examples
```tsx
<Popover>
  <PopoverTrigger>
    <Button>Open</Button>
  </PopoverTrigger>
  <PopoverContent side="bottom" align="start">
    Panel content
  </PopoverContent>
</Popover>
```
