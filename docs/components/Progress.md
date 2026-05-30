# Progress

Linear progress bar and `CircularProgress`. Both are `role="progressbar"`; omit `value` for an indeterminate animation.

```tsx
import { Progress, CircularProgress } from "@velody/velys";
```

## Props (Progress)
| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `number` | — | Current value; omit for indeterminate |
| `max` | `number` | `100` | Maximum value |
| `size` | `"sm" \| "md"` | `"md"` | 4/8px height |
| `tone` | `"brand" \| "success" \| "warning" \| "danger"` | `"brand"` | Fill color |
| `label` | `string` | `"Loading"` | Accessible label |
| ...rest | `HTMLAttributes<HTMLDivElement>` | — | |

`CircularProgress` shares the same props with `size` of `"sm" \| "md" \| "lg"`.

## Examples
```tsx
<Progress value={60} />
<Progress tone="success" value={100} />
<Progress />                {/* indeterminate */}
<CircularProgress value={25} />
<CircularProgress />        {/* indeterminate */}
```
