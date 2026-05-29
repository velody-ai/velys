# DropdownMenu

Menu opened by clicking a trigger. Closes on outside click/Escape. The primitives (`Menu`/`MenuItem`/`MenuSeparator`/`MenuLabel`) can also be used standalone.

```tsx
import { DropdownMenu, MenuItem, MenuSeparator, MenuLabel, Menu } from "@velody/velys";
```

## DropdownMenu Props
| Prop | Type | Description |
|---|---|---|
| `trigger` | `ReactNode` | Trigger element (toggles on click) |
| `children` | `ReactNode` | Menu contents (MenuItem, etc.) |

## MenuItem Props
| Prop | Type | Default | Description |
|---|---|---|---|
| `tone` | `"default" \| "danger"` | `"default"` | Tone |
| `leadingIcon` | `ReactNode` | — | Left icon |
| `hint` | `ReactNode` | — | Right-side shortcut/hint |
| `disabled` | `boolean` | — | Disabled |
| ...rest | `ButtonHTMLAttributes` | — | `onClick`, etc. |

- `MenuSeparator` — separator, `MenuLabel` — section label (children).

## Example
```tsx
<DropdownMenu trigger={<Button variant="outline">Menu</Button>}>
  <MenuLabel>Actions</MenuLabel>
  <MenuItem hint="⌘E" onClick={edit}>Edit</MenuItem>
  <MenuSeparator />
  <MenuItem tone="danger" onClick={remove}>Delete</MenuItem>
</DropdownMenu>
```
