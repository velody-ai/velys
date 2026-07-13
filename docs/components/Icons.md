# Icons

Velys ships a small built-in icon set used internally by its components (Select chevrons, Alert status icons, Tag close button, …). All icons are exported from the package root so you can reuse them in your own UI.

```tsx
import { SearchIcon, CopyIcon, CheckIcon } from "@velody/velys";
```

## Design

- Each icon is a 16×16 stroke SVG (`stroke: currentColor`, `strokeWidth: 1.5`) with `width`/`height` set to `1em`, so it scales with `font-size` and inherits the text color.
- All icons set `aria-hidden` by default — they are decorative. When an icon is the only content of a control, put the accessible name on the control (e.g. `aria-label` on an `IconButton`).
- Any prop you pass spreads onto the `<svg>` root, so you can override `style`, `strokeWidth`, `aria-hidden`, etc.

## Icon list

| Icon | Typical use |
| --- | --- |
| `CheckIcon` | selection marks (Select, Combobox, CopyButton copied state) |
| `ChevronUpIcon` / `ChevronDownIcon` / `ChevronLeftIcon` / `ChevronRightIcon` | disclosure, navigation, steppers |
| `MoreHorizontalIcon` | overflow menus, truncated breadcrumbs |
| `CloseIcon` | dismiss affordances (Modal, Toast, Tag) |
| `InfoIcon` / `SuccessIcon` / `WarningIcon` / `ErrorIcon` | status communication (Alert, Toast) |
| `MinusIcon` | indeterminate checkbox state |
| `CopyIcon` | copy-to-clipboard (CopyButton, Snippet) |
| `ExternalLinkIcon` | external link affordance (Link) |
| `SearchIcon` | search inputs (CommandMenu) |
| `CalendarIcon` | date fields (DatePicker) |

## Examples

```tsx
import { Button, IconButton, SearchIcon, CopyIcon } from "@velody/velys";

// Sized by font-size, colored by currentColor
<SearchIcon style={{ fontSize: 20 }} />

// Inside Velys components
<Button leadingIcon={<CopyIcon />}>Copy</Button>
<IconButton aria-label="Search" icon={<SearchIcon />} variant="ghost" />
```
