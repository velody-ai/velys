# Snippet

Terminal command display with an optional shell prompt marker and a built-in CopyButton. Lines render inside `<pre><code>` (line breaks preserved, announced as code).

```tsx
import { Snippet } from "@velody/velys";
```

## Props
| Prop | Type | Default | Description |
|---|---|---|---|
| `text` | `string \| string[]` | — (required) | Command text; array renders one line each, copied joined with `"\n"` |
| `prompt` | `boolean` | `true` | Leading `$ ` marker per line (CSS `::before`, never included in selection or clipboard) |
| `copyable` | `boolean` | `true` | Show the CopyButton at the trailing edge |
| `onCopied` | `(value: string) => void` | — | Called after a successful clipboard write |
| `size` | `"sm" \| "md"` | `"md"` | Font size xs/sm with sm/md padding |
| ...rest | `HTMLAttributes<HTMLDivElement>` (minus `onCopy`) | — | `className`, etc. |

## Examples
```tsx
<Snippet text="npm install @velody/velys" />

<Snippet
  text={["git clone https://github.com/velody-ai/velys.git", "cd velys", "npm install"]}
/>

<Snippet text="VELYS_TOKEN=xxxxxxxx" prompt={false} size="sm" />

<Snippet text="npm run build" copyable={false} />
```

## Notes
- The `$ ` prompt marker is purely decorative: it is rendered via CSS, styled with `text.tertiary`, excluded from user selection, and never part of the copied value.
- Composes `CopyButton` (sm), which handles the copied state, live-region announcement, and reset timeout.
