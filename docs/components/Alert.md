# Alert

Inline status banner. Automatic icon per status, optional close button.

```tsx
import { Alert } from "@velody/velys";
```

## Props
| Prop | Type | Default | Description |
|---|---|---|---|
| `status` | `"info" \| "success" \| "warning" \| "danger" \| "neutral"` | `"info"` | Status |
| `variant` | `"subtle" \| "solid" \| "outline"` | `"subtle"` | Fill style |
| `fullWidth` | `boolean` | `false` | Force `width: 100%` (fills parent even in flex/grid/inline contexts) |
| `title` | `ReactNode` | — | Title |
| `description` | `ReactNode` | — | Body |
| `icon` | `ReactNode` | Default status icon | Custom icon |
| `action` | `ReactNode` | — | Right/bottom action slot |
| `onClose` | `() => void` | — | Shows close (X) when provided |
| ...rest | `HTMLAttributes<HTMLDivElement>` | — | `role="alert"` by default |

## Examples
```tsx
<Alert status="success" title="Saved" description="Your changes have been applied." />
<Alert status="danger" variant="solid" title="An error occurred" onClose={() => {}} />
```
