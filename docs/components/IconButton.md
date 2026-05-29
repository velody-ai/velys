# IconButton

Square icon-only button. `aria-label` is **required** for accessibility.

```tsx
import { IconButton } from "@velody/velys";
```

## Props
| Prop | Type | Default | Description |
|---|---|---|---|
| `icon` | `ReactNode` | — (required) | Icon to display |
| `aria-label` | `string` | — (required) | Screen reader label |
| `variant` | `"solid" \| "outline" \| "ghost"` | `"ghost"` | Visual style |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | 32/40/48 square |
| `round` | `boolean` | `false` | Fully circular (radius full) |
| `disabled` | `boolean` | — | Disabled |
| ...rest | `ButtonHTMLAttributes` | — | `onClick`, etc. |

## Examples
```tsx
<IconButton aria-label="Close" icon={<CloseIcon/>} />
<IconButton aria-label="Settings" icon={<GearIcon/>} variant="outline" size="lg" />
<IconButton aria-label="More" icon={<DotsIcon/>} round />
```
