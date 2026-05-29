# Avatar

User avatar. Priority: `src` (image) → `initials` → `icon` (custom) → default person glyph.

```tsx
import { Avatar } from "@velody/velys";
```

## Props
| Prop | Type | Default | Description |
|---|---|---|---|
| `size` | `"xs" \| "sm" \| "md" \| "lg" \| "xl"` | `"md"` | 20/24/32/40/48 |
| `shape` | `"circle" \| "square"` | `"circle"` | Shape |
| `src` | `string` | — | Image URL |
| `alt` | `string` | `""` | Image alt text |
| `initials` | `string` | — | Initials (e.g. "AB") |
| `icon` | `ReactNode` | — | Custom icon |
| ...rest | `HTMLAttributes<HTMLSpanElement>` | — | |

## Examples
```tsx
<Avatar src="/u.png" alt="Jane" />
<Avatar initials="VK" size="lg" />
<Avatar shape="square" />        {/* default glyph */}
```
