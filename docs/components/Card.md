# Card / CardTitle / CardDescription

A content container. Its children are arbitrary, with `CardTitle`/`CardDescription` helpers provided.

```tsx
import { Card, CardTitle, CardDescription } from "@velody/velys";
```

## Card Props
| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `"elevated" \| "outlined" \| "filled"` | `"outlined"` | elevated=shadow, outlined=border, filled=subtle bg |
| `padding` | `"sm" \| "md" \| "lg"` | `"md"` | Inner padding 12/16/24 |
| ...rest | `HTMLAttributes<HTMLDivElement>` | — | |

`CardTitle` renders an `<h3>` and `CardDescription` renders a `<p>`. Both pass through `HTMLAttributes`.

## Examples
```tsx
<Card variant="elevated" padding="lg">
  <CardTitle>Title</CardTitle>
  <CardDescription>Description text</CardDescription>
  <Button size="sm">Action</Button>
</Card>
```
