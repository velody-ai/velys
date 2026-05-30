# Separator

Visual divider between content. Decorative by default; pass `decorative={false}` to expose a `separator` role.

```tsx
import { Separator } from "@velody/velys";
```

## Props
| Prop | Type | Default | Description |
|---|---|---|---|
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Direction |
| `spacing` | `"none" \| "sm" \| "md" \| "lg"` | `"none"` | Margin around the line |
| `decorative` | `boolean` | `true` | When false, exposes `role="separator"` |
| ...rest | `HTMLAttributes<HTMLDivElement>` | — | |

## Examples
```tsx
<Separator spacing="md" />
<Separator orientation="vertical" spacing="md" />
```
