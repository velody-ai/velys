# Modal

Controlled modal dialog. Rendered into `document.body` via a `react-dom` portal. Closes on Escape or overlay click.

```tsx
import { Modal } from "@velody/velys";
```

## Props
| Prop | Type | Default | Description |
|---|---|---|---|
| `open` | `boolean` | — (required) | Visibility |
| `onClose` | `() => void` | — (required) | Close callback |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Max width 400/512/640 |
| `title` | `ReactNode` | — | Header title |
| `showClose` | `boolean` | `true` | Header close (X) button |
| `footer` | `ReactNode` | — | Footer action area |
| `closeOnOverlay` | `boolean` | `true` | Close on overlay click |
| `children` | `ReactNode` | — | Body |

## Example
```tsx
const [open, setOpen] = useState(false);

<Modal
  open={open}
  onClose={() => setOpen(false)}
  title="Confirm deletion"
  footer={<>
    <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
    <Button color="destructive" onClick={confirm}>Delete</Button>
  </>}
>
  Are you sure you want to delete this?
</Modal>
```

## Notes
- Applies `aria-modal="true"` and `role="dialog"`. Reflecting the theme class onto the body portal may require a theme outside the app root, so when using dark mode, consider applying the theme class to the portal container as well.
