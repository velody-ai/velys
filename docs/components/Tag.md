# Tag

Dismissible chip for filters, tokens, and selections. Built on `<span>`; only the optional close button is interactive/focusable.

```tsx
import { Tag } from "@velody/velys";
```

## Props
| Prop | Type | Default | Description |
|---|---|---|---|
| `color` | `"neutral" \| "brand" \| "success" \| "warning" \| "danger" \| "info"` | `"neutral"` | Color |
| `variant` | `"subtle" \| "outline"` | `"subtle"` | Fill style |
| `size` | `"sm" \| "md"` | `"md"` | Height 24/28 |
| `icon` | `ReactNode` | — | Leading icon |
| `onDismiss` | `() => void` | — | Renders a trailing close button that calls this on click |
| `dismissLabel` | `string` | `"Remove"` | Accessible label for the close button |
| `disabled` | `boolean` | `false` | Mutes colors and disables the close button |
| ...rest | `HTMLAttributes<HTMLSpanElement>` | — | |

## Examples
```tsx
<Tag color="brand">Design</Tag>
<Tag color="success" variant="outline">Approved</Tag>
<Tag onDismiss={() => removeTag("React")} dismissLabel="Remove React">React</Tag>
```

## Accessibility
- The root is a non-interactive `<span>`; only the close button receives focus.
- When rendering a list of dismissible tags, interpolate the tag name into `dismissLabel` (e.g. `` dismissLabel={`Remove ${name}`} ``) so screen reader users can tell the close buttons apart — a bare "Remove" is ambiguous when repeated.
