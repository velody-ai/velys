# Text

Semantic body/inline text. Maps the Figma `body/*` styles via `size`/`weight`/`tone`. Also exports `Code` and `Kbd`.

```tsx
import { Text, Code, Kbd } from "@velody/velys";
```

## Props (Text)
| Prop | Type | Default | Description |
|---|---|---|---|
| `as` | `ElementType` | `"p"` | Element to render |
| `size` | `"xs" \| "sm" \| "md" \| "lg" \| "xl"` | `"md"` | Font size/line-height pair |
| `weight` | `"regular" \| "medium" \| "semibold" \| "bold"` | `"regular"` | Font weight |
| `tone` | `"primary" \| "secondary" \| "tertiary" \| "brand" \| "success" \| "warning" \| "danger" \| "inherit"` | `"primary"` | Text color |
| `align` | `"start" \| "center" \| "end"` | — | Text alignment |
| `truncate` | `boolean` | `false` | Single-line ellipsis |
| ...rest | `HTMLAttributes<HTMLElement>` | — | |

`Code` and `Kbd` accept native `HTMLAttributes` and render `<code>` / `<kbd>`.

## Examples
```tsx
<Text>Default body text.</Text>
<Text size="sm" tone="secondary">Secondary caption.</Text>
<Text as="span" weight="semibold">Inline strong.</Text>
<Text>Press <Kbd>⌘</Kbd> <Kbd>K</Kbd> then run <Code>velys build</Code>.</Text>
```
