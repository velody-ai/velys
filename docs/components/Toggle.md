# Toggle

A two-state button announced via `aria-pressed`, plus `ToggleGroup` / `ToggleGroupItem` for segmented single- or multiple-selection sets. Built on native `<button type="button">` with attribute pass-through.

```tsx
import { Toggle, ToggleGroup, ToggleGroupItem } from "@velody/velys";
```

## Toggle Props
| Prop | Type | Default | Description |
|---|---|---|---|
| `pressed` | `boolean` | — | Controlled pressed state |
| `defaultPressed` | `boolean` | `false` | Initial pressed state (uncontrolled) |
| `onPressedChange` | `(pressed: boolean) => void` | — | Called with the next pressed state on every toggle |
| `size` | `"small" \| "medium" \| "large"` | `"medium"` | Height 32/40/48 (mirrors Button). Inside a group it cascades from the group |
| `disabled` | `boolean` | — | Disabled |
| ...rest | `ButtonHTMLAttributes` (no `type`) | — | `onClick`, `aria-label`, etc. Always renders `type="button"` |

## ToggleGroup Props
| Prop | Type | Default | Description |
|---|---|---|---|
| `type` | `"single" \| "multiple"` | `"single"` | Single: pressing an item unpresses the others. Multiple: items toggle independently |
| `value` | `string \| string[]` | — | Controlled pressed value(s), normalized to an array |
| `defaultValue` | `string \| string[]` | — | Initial pressed value(s) (uncontrolled) |
| `onValueChange` | `(value: string[]) => void` | — | Called with the full array of pressed values |
| `size` | `"small" \| "medium" \| "large"` | `"medium"` | Cascades to every item |
| `disabled` | `boolean` | `false` | Disables every item |
| `allowEmpty` | `boolean` | `true` | Single mode only: whether the active item can be unpressed. With `false`, one item always stays pressed |
| ...rest | `HTMLAttributes<HTMLDivElement>` | — | Renders `role="group"`; pass `aria-label` for an accessible name |

## ToggleGroupItem Props
| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `string` | required | Identifier reported in the group's value array |
| ...rest | `ButtonHTMLAttributes` (no `type`/`value`) | — | Item-level `disabled`, etc. Renders a `Toggle` wired to the group |

## Examples
```tsx
<Toggle>Bold</Toggle>
<Toggle defaultPressed size="small">Italic</Toggle>
<Toggle pressed={muted} onPressedChange={setMuted} aria-label="Mute" />

{/* Single selection (default) — active item can be unpressed */}
<ToggleGroup aria-label="Text alignment" defaultValue="left" onValueChange={(v) => setAlign(v[0])}>
  <ToggleGroupItem value="left">Left</ToggleGroupItem>
  <ToggleGroupItem value="center">Center</ToggleGroupItem>
  <ToggleGroupItem value="right">Right</ToggleGroupItem>
</ToggleGroup>

{/* Always exactly one selected */}
<ToggleGroup aria-label="View" defaultValue="list" allowEmpty={false}>
  <ToggleGroupItem value="list">List</ToggleGroupItem>
  <ToggleGroupItem value="grid">Grid</ToggleGroupItem>
</ToggleGroup>

{/* Multiple selection */}
<ToggleGroup type="multiple" aria-label="Text formatting" defaultValue={["bold"]}>
  <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
  <ToggleGroupItem value="italic">Italic</ToggleGroupItem>
  <ToggleGroupItem value="underline">Underline</ToggleGroupItem>
</ToggleGroup>
```

## Notes
- A standalone Toggle looks like a ghost Button (transparent, `vars.radius.sm`); pressed fills with `vars.color.bg.active` and a `vars.color.border.default` border.
- Inside a `ToggleGroup`, the group container owns the 1px border and `vars.radius.md` rounding (`overflow: hidden`); items become square segments with 1px dividers.
- `onValueChange` always receives a `string[]` — in single mode it is `[]` (nothing pressed) or `[value]`.
- Keyboard: items are native buttons — `Tab` moves between them (no roving focus, matching Tabs), `Space`/`Enter` toggle. On focus, the `vars.shadow.focus` ring is applied automatically.
