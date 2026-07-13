# Link

Styled inline hyperlink. Built on `<a>`, with an external-link mode that opens in a new tab safely.

```tsx
import { Link } from "@velody/velys";
```

## Props
| Prop | Type | Default | Description |
|---|---|---|---|
| `tone` | `"brand" \| "neutral" \| "inherit"` | `"brand"` | Text color: brand accent, secondary-to-primary neutral, or inherit from surrounding text |
| `underline` | `"hover" \| "always" \| "none"` | `"hover"` | Underline behavior (`hover` underlines on hover/focus only) |
| `external` | `boolean` | `false` | Sets `target="_blank" rel="noopener noreferrer"`, appends a trailing icon and screen-reader-only "(opens in new tab)" text |
| ...rest | `AnchorHTMLAttributes<HTMLAnchorElement>` | — | `href`, `rel` (merged with the external defaults), etc. |

## Examples
```tsx
<Link href="/docs">Read the docs</Link>
<Link href="/settings" tone="neutral" underline="none">Settings</Link>
<p>
  See the <Link href="/changelog" tone="inherit" underline="always">changelog</Link> for details.
</p>
<Link href="https://vercel.com/geist" external>Geist design system</Link>
```
