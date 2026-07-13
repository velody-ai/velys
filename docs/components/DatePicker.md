# DatePicker

A single-date input that composes [`Calendar`](./Calendar.md) in a portaled popup. The field looks and behaves like `Input`/`Select` (same size/invalid/disabled/focus token bindings) with a trailing calendar toggle button.

- **Typing:** the input is a free-text draft, committed on Enter or blur via locale-aware parsing — ISO `YYYY-MM-DD` always works, plus the locale's numeric pattern (e.g. `07/11/2026` for `en-US`). Invalid or out-of-range text reverts to the last committed value; clearing the input commits `null`.
- **Display:** committed values are shown with `Intl.DateTimeFormat(locale, { year: "numeric", month: "2-digit", day: "2-digit" })`. The default placeholder is the locale's numeric pattern (e.g. `MM/DD/YYYY`).
- **Popup:** `role="dialog"` anchored below the field (intrinsic width), opened with the toggle button or ArrowDown in the input (which focuses the calendar grid). Escape or outside click closes it; Escape and date selection refocus the input.
- **Forms:** with `name`, a hidden input mirrors the value as ISO `YYYY-MM-DD` for form submission.
- The forwarded `ref` and `className` target the text input; use `rootClassName` for the outer wrapper.

```tsx
import { DatePicker } from "@velody/velys";
```

## Props
| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `Date \| null` | — | Controlled selected date (`null` = empty) |
| `defaultValue` | `Date \| null` | `null` | Initial selected date (uncontrolled) |
| `onValueChange` | `(date: Date \| null) => void` | — | Fired on commit (typed, picked, or cleared) |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Height 32/40/48 |
| `invalid` | `boolean` | `false` | Error state |
| `disabled` | `boolean` | — | Disabled |
| `min` / `max` | `Date` | — | Inclusive whole-day range (typed dates outside it are rejected) |
| `isDateDisabled` | `(date: Date) => boolean` | — | Disable arbitrary days |
| `weekStartsOn` | `0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6` | `0` | First day of the week in the popup |
| `locale` | `string` | runtime locale | BCP 47 locale for display, parsing, and the calendar |
| `placeholder` | `string` | locale pattern (e.g. `MM/DD/YYYY`) | Input placeholder |
| `name` | `string` | — | Renders a hidden input carrying the ISO date for forms |
| `rootClassName` | `string` | — | Class for the outer wrapper |
| ...rest | `InputHTMLAttributes` | — | Spread onto the text input (`aria-label`, `id`, `onFocus`, …) |

## Examples
```tsx
<DatePicker aria-label="Date" defaultValue={new Date(2026, 5, 15)} />
```

### Range limits
```tsx
<DatePicker
  aria-label="Appointment"
  min={new Date(2026, 5, 8)}
  max={new Date(2026, 6, 24)}
  isDateDisabled={(date) => date.getDay() === 0}
/>
```

### Controlled
```tsx
const [date, setDate] = useState<Date | null>(null);

<DatePicker aria-label="Date" value={date} onValueChange={setDate} />
```

### In a form
```tsx
<form onSubmit={handleSubmit}>
  {/* Submits birthday=2026-06-15 */}
  <DatePicker aria-label="Birthday" name="birthday" defaultValue={new Date(2026, 5, 15)} />
</form>
```
