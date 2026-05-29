# EmptyState

Center-aligned placeholder shown when there is no data/result.

```tsx
import { EmptyState } from "@velody/velys";
```

## Props
| Prop | Type | Default | Description |
|---|---|---|---|
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Icon/typography scale |
| `icon` | `ReactNode` | — | Top icon (shown on a muted circular background) |
| `title` | `ReactNode` | — | Title |
| `description` | `ReactNode` | — | Description |
| `actions` | `ReactNode` | — | Bottom action area (buttons, etc.) |
| ...rest | `HTMLAttributes<HTMLDivElement>` | — | |

## Examples
```tsx
<EmptyState
  icon={<FolderIcon/>}
  title="No items yet"
  description="Try creating your first item."
  actions={<>
    <Button size="sm">Get started</Button>
    <Button size="sm" variant="outline">Learn more</Button>
  </>}
/>
```
