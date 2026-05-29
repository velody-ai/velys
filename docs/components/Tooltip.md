# Tooltip

Tooltip shown on hover/focus. Wraps a single child element.

```tsx
import { Tooltip } from "@velody/velys";
```

## Props
| Prop | Type | Default | Description |
|---|---|---|---|
| `content` | `ReactNode` | — (required) | Tooltip content |
| `side` | `"top" \| "bottom" \| "left" \| "right"` | `"top"` | Display direction (includes arrow) |
| `open` | `boolean` | — | Force display (for docs/stories). When unset, controlled by hover/focus |
| `children` | `ReactElement` | — (required) | Trigger (single element) |

## Examples
```tsx
<Tooltip content="Delete" side="top">
  <IconButton aria-label="Delete" icon={<TrashIcon/>} />
</Tooltip>
```

## Notes
- Position is CSS absolute relative to the trigger. Make sure a `position: relative` container does not clip the trigger.
