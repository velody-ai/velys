# Slider

Single-value range slider with full keyboard and pointer support. `role="slider"` with `aria-valuemin/max/now`.

```tsx
import { Slider } from "@velody/velys";
```

## Props
| Prop | Type | Default | Description |
|---|---|---|---|
| `value` / `defaultValue` | `number` | `0` | Controlled / initial value |
| `min` | `number` | `0` | Minimum |
| `max` | `number` | `100` | Maximum |
| `step` | `number` | `1` | Step increment |
| `onChange` | `(value: number) => void` | — | Fires on every change |
| `onChangeEnd` | `(value: number) => void` | — | Fires when interaction ends |
| `disabled` | `boolean` | `false` | Disable interaction |
| `size` | `"sm" \| "md"` | `"md"` | Track/thumb size |
| `aria-label` | `string` | — | Accessible label for the thumb |

Keyboard: arrows (± step), Page Up/Down (± 10×step), Home/End (min/max).

## Examples
```tsx
const [value, setValue] = useState(40);
<Slider value={value} onChange={setValue} aria-label="Volume" />
<Slider value={value} onChange={setValue} step={10} aria-label="Brightness" />
```
