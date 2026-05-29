# Drawer

Edge-anchored overlay panel (sheet). Portal-based and controlled, with motion-token slide animations. Closes on Escape and overlay click.

```tsx
import { Drawer } from "@velody/velys";
```

## Props
| Prop | Type | Default | Description |
|---|---|---|---|
| `open` | `boolean` | — | Controlled open state (required) |
| `onClose` | `() => void` | — | Close handler (required) |
| `side` | `"left" \| "right" \| "top" \| "bottom"` | `"right"` | Edge to slide in from |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Panel size |
| `title` | `ReactNode` | — | Header title (sets `aria-labelledby`) |
| `showClose` | `boolean` | `true` | Show the close button |
| `footer` | `ReactNode` | — | Footer actions area |
| `closeOnOverlay` | `boolean` | `true` | Close on overlay click |

## Examples
```tsx
const [open, setOpen] = useState(false);
<Drawer open={open} onClose={() => setOpen(false)} title="Settings" side="right">
  Body content
</Drawer>
```
