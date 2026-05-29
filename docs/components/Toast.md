# Toast

Notification toast (presentational component). Display and queue management are handled by the app.

```tsx
import { Toast } from "@velody/velys";
```

## Props
| Prop | Type | Default | Description |
|---|---|---|---|
| `status` | `"info" \| "success" \| "warning" \| "danger" \| "neutral"` | `"info"` | Icon color |
| `title` | `ReactNode` | — | Title |
| `description` | `ReactNode` | — | Body |
| `icon` | `ReactNode` | Status default | Custom icon |
| `actionLabel` | `ReactNode` | — | Action link label |
| `onAction` | `() => void` | — | Action click |
| `onClose` | `() => void` | — | Shows close (X) when provided |
| ...rest | `HTMLAttributes<HTMLDivElement>` | — | `role="status"` by default |

## Examples
```tsx
<Toast status="success" title="Upload complete" description="Your file has been saved." onClose={() => {}} />
<Toast status="info" title="New version" actionLabel="View details" onAction={() => {}} onClose={() => {}} />
```
