# Collapsible

A single show/hide disclosure region. Compound: `Collapsible` / `CollapsibleTrigger` / `CollapsibleContent`. Follows the APG disclosure pattern (button + `aria-expanded` + `aria-controls`); height animates via a CSS grid-rows transition and the content stays mounted while closed.

Unlike Accordion, the trigger is intentionally unstyled (a button reset plus a focus ring) — bring your own trigger design and style open/closed states via the `data-state` attribute.

```tsx
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@velody/velys";
```

## Props
**Collapsible** (root, extends div attrs):
| Prop | Type | Default | Description |
|---|---|---|---|
| `open` | `boolean` | — | Controlled open state |
| `defaultOpen` | `boolean` | `false` | Initial open state (uncontrolled) |
| `onOpenChange` | `(open: boolean) => void` | — | Change handler |
| `disabled` | `boolean` | `false` | Prevents the trigger from toggling |

**CollapsibleTrigger**: native button attrs except `type` (always `type="button"`); `disabled` also inherited from the root. **CollapsibleContent**: native div attrs.

`CollapsibleTrigger` and `CollapsibleContent` (and the root) carry `data-state="open" | "closed"` for styling, e.g. a chevron rotation.

## Examples
```tsx
<Collapsible defaultOpen>
  <CollapsibleTrigger>Show details</CollapsibleTrigger>
  <CollapsibleContent>Hidden until expanded.</CollapsibleContent>
</Collapsible>
```

Controlled:
```tsx
const [open, setOpen] = useState(false);
<Collapsible open={open} onOpenChange={setOpen}>
  <CollapsibleTrigger>Advanced options</CollapsibleTrigger>
  <CollapsibleContent>…</CollapsibleContent>
</Collapsible>
```

Chevron rotation via `data-state`:
```css
.trigger [data-icon] { transition: transform 250ms; }
.trigger[data-state="open"] [data-icon] { transform: rotate(180deg); }
```
