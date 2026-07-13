# CopyButton

Icon button that writes a value to the clipboard. On success the copy icon swaps to a check (success color) for `timeout` ms, the accessible name changes to "Copied", and a visually-hidden live region announces it to screen readers.

```tsx
import { CopyButton } from "@velody/velys";
```

## Props
| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `string` | — (required) | Text written to the clipboard on click |
| `timeout` | `number` | `2000` | ms before the copied state resets |
| `size` | `"sm" \| "md"` | `"md"` | 32/40 square (matches IconButton) |
| `onCopied` | `(value: string) => void` | — | Called after a successful clipboard write |
| `aria-label` | `string` | `"Copy"` | Idle accessible name ("Copied" while active) |
| ...rest | `ButtonHTMLAttributes` (minus `value`) | — | `onClick`, `disabled`, etc. |

## Examples
```tsx
<CopyButton value="npm install @velody/velys" />
<CopyButton value={apiKey} size="sm" aria-label="Copy API key" />
<CopyButton value={url} timeout={5000} onCopied={(v) => track("copied", v)} />
```

## Notes
- Uses `navigator.clipboard.writeText`, which requires a secure context (HTTPS/localhost). If the write fails, the button stays in its idle state.
- The reset timer is cleared on unmount, and re-clicking restarts it.
