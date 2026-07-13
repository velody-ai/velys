# RangeSlider

Dual-thumb range slider for selecting a `[lower, upper]` value pair, with full keyboard and pointer support. Each thumb is a `role="slider"` element whose `aria-valuemin`/`aria-valuemax` reflect its interactive bounds (the other thumb plus `minDistance`).

```tsx
import { RangeSlider } from "@velody/velys";
```

## Props
| Prop | Type | Default | Description |
|---|---|---|---|
| `value` / `defaultValue` | `[number, number]` | `[min, max]` | Controlled / initial `[lower, upper]` pair |
| `min` | `number` | `0` | Minimum |
| `max` | `number` | `100` | Maximum |
| `step` | `number` | `1` | Step increment |
| `onChange` | `(value: [number, number]) => void` | — | Fires on every change |
| `onChangeEnd` | `(value: [number, number]) => void` | — | Fires when interaction ends (pointer up / key commit) |
| `minDistance` | `number` | `0` | Minimum gap between the thumbs, in value units |
| `disabled` | `boolean` | `false` | Disable interaction |
| `size` | `"sm" \| "md"` | `"md"` | Track/thumb size |
| `thumbLabels` | `[string, string]` | `["Minimum", "Maximum"]` | Accessible labels for the lower and upper thumbs |

Pointer: pressing the track grabs the nearest thumb (on a tie, the thumb that can move toward the pointer) and drags it, clamped against the other thumb honoring `minDistance`.

Keyboard (per focused thumb): arrows (± step), Page Up/Down (± 10×step), Home/End (that thumb's interactive min/max bound).

Values are always kept ordered: `lower <= upper - minDistance`.

## Examples
```tsx
const [range, setRange] = useState<[number, number]>([20, 60]);
<RangeSlider value={range} onChange={setRange} />

// Price range with a minimum gap and commit callback
<RangeSlider
  value={range}
  onChange={setRange}
  onChangeEnd={(value) => console.log("committed", value)}
  step={5}
  minDistance={10}
  thumbLabels={["Lowest price", "Highest price"]}
/>
```
