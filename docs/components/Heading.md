# Heading

Section heading mapping the Figma `heading/*` styles. `level` controls the semantic element (`h1`–`h4`); `size` controls the visual scale so the two can differ.

```tsx
import { Heading } from "@velody/velys";
```

## Props
| Prop | Type | Default | Description |
|---|---|---|---|
| `level` | `1 \| 2 \| 3 \| 4` | `1` | Semantic heading element |
| `size` | `"display" \| "h1" \| "h2" \| "h3" \| "h4"` | matches `level` | Visual scale |
| `truncate` | `boolean` | `false` | Single-line ellipsis |
| ...rest | `HTMLAttributes<HTMLHeadingElement>` | — | |

## Examples
```tsx
<Heading>Page title</Heading>
<Heading level={2}>Section</Heading>
<Heading size="display">Hero</Heading>
<Heading level={3} size="h1">h3 element, h1 visual size</Heading>
```
