# NumberInput

Numeric input following the APG spinbutton pattern — a text field (`inputMode="decimal"`, `role="spinbutton"`) with a trailing pair of stepper buttons. Free-form text is allowed while editing; the value is parsed, clamped to `min`/`max`, and rounded to the `step` grid on blur or Enter.

```tsx
import { NumberInput } from "@velody/velys";
```

## Props
| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `number \| null` | — | Controlled value (`null` = empty) |
| `defaultValue` | `number \| null` | `null` | Initial value when uncontrolled |
| `onValueChange` | `(value: number \| null) => void` | — | Fires with the parsed + clamped number, or `null` when cleared |
| `min` | `number` | `-Infinity` | Lower bound |
| `max` | `number` | `Infinity` | Upper bound |
| `step` | `number` | `1` | Arrow-key / stepper increment; committed values snap to this grid |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Height 32/40/48 (same as Input) |
| `invalid` | `boolean` | `false` | Error state (red border + `aria-invalid`) |
| `rootClassName` | `string` | — | Container className |
| `className` | `string` | — | `<input>` className |
| `disabled` | `boolean` | — | Disabled |
| ...rest | `InputHTMLAttributes` | — | `placeholder`, `aria-label`, `onBlur`, etc. (`type`, `value`, `onChange`, `min`, `max`, `step` are managed by the component) |

## Examples
```tsx
<NumberInput aria-label="Quantity" min={0} max={10} defaultValue={5} />
<NumberInput aria-label="Price" min={0} step={0.5} size="lg" />

// Controlled
const [qty, setQty] = useState<number | null>(1);
<NumberInput aria-label="Quantity" min={0} max={99} value={qty} onValueChange={setQty} />
```

## Behavior
- **Editing:** any text is allowed while focused (draft state). On blur or Enter the draft is parsed; a valid number is clamped and snapped to the step grid, an empty string commits `null`, and unparseable text reverts to the last committed value.
- **Keyboard:** ArrowUp/ArrowDown = ±`step` (from `min` when empty, or 0 if `min` is `-Infinity`), PageUp/PageDown = ±`step * 10`, Home/End = jump to `min`/`max` (only when finite). Keyboard changes commit immediately.
- **Steppers:** pointer convenience only — removed from the tab order and hidden from assistive tech (`tabIndex={-1}`, `aria-hidden`). Each button disables at its bound. No press-and-hold repeat.
- **ARIA:** `aria-valuemin`/`aria-valuemax` are set only for finite bounds and `aria-valuenow` only when non-empty. Always provide an accessible name (`aria-label` or a `<Label htmlFor>`).

## Notes
- Composes Input's `inputRoot`/`inputControl` styles, so sizing, focus ring, invalid, and disabled visuals match Input exactly.
