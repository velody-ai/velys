# Pagination

Page navigation with truncated page ranges. A `nav` landmark of page buttons with Prev/Next controls. Also exports `getPaginationRange` for custom rendering.

```tsx
import { Pagination } from "@velody/velys";
```

## Props
| Prop | Type | Default | Description |
|---|---|---|---|
| `page` | `number` | — | Current page (1-based, required) |
| `count` | `number` | — | Total pages (required) |
| `onPageChange` | `(page: number) => void` | — | Change handler |
| `siblingCount` | `number` | `1` | Pages shown either side of current |
| `boundaryCount` | `number` | `1` | Pages shown at the start/end |
| `showPrevNext` | `boolean` | `true` | Show Prev/Next buttons |
| `size` | `"sm" \| "md"` | `"md"` | Control size |
| ...rest | `HTMLAttributes<HTMLElement>` | — | |

## Examples
```tsx
const [page, setPage] = useState(1);
<Pagination page={page} count={20} onPageChange={setPage} />
```
