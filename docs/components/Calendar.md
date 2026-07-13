# Calendar

A single-date month calendar. Renders a `role="grid"` month view with a prev/next month header, full keyboard navigation via a roving tabindex, and `min`/`max`/custom day disabling. Self-contained — it is also the panel that `DatePicker` composes in its popup.

- **Structure:** `role="group"` root labeled with the month caption; header nav buttons + `aria-live` caption; a `<table role="grid">` of `columnheader` weekdays and `gridcell` days, each cell containing a `<button>` labeled with the full date.
- **Keyboard (on the grid):** Arrow keys move by day/week, Home/End jump to the start/end of the week (respecting `weekStartsOn`), PageUp/PageDown move by month, Shift+PageUp/PageDown by year — all auto-switch the displayed month and move DOM focus. Enter/Space select the focused day.
- **Roving tabindex:** exactly one day button is tabbable at a time.
- Today is marked with `aria-current="date"` and a small brand-colored dot.
- Selecting an outside (previous/next-month) day selects it **and** navigates to its month.
- All dates are plain `Date` objects at local midnight — construct them with `new Date(year, monthIndex, day)`, never from `"YYYY-MM-DD"` strings.

```tsx
import { Calendar } from "@velody/velys";
```

## Props
| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `Date \| null` | — | Controlled selected date (`null` = none) |
| `defaultValue` | `Date \| null` | `null` | Initial selected date (uncontrolled) |
| `onValueChange` | `(date: Date) => void` | — | Fired with the selected day at local midnight |
| `month` | `Date` | — | Controlled displayed month (any day within the month) |
| `defaultMonth` | `Date` | selected date, else today | Initial displayed month |
| `onMonthChange` | `(month: Date) => void` | — | Fired with the first day of the new month |
| `min` / `max` | `Date` | — | Inclusive whole-day range; out-of-range days and fully out-of-range nav are disabled |
| `isDateDisabled` | `(date: Date) => boolean` | — | Disable arbitrary days (e.g. weekends) |
| `weekStartsOn` | `0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6` | `0` | First day of the week (0 = Sunday) |
| `locale` | `string` | runtime locale | BCP 47 locale for captions and labels |
| `showOutsideDays` | `boolean` | `true` | Render previous/next-month days in the grid |
| `autoFocus` | `boolean` | `false` | Focus the current day cell on mount |
| `bordered` | `boolean` | `true` | Standalone chrome (1px border). Popup hosts pass `false` |
| ...rest | `HTMLAttributes<HTMLDivElement>` | — | Spread onto the root `div` |

## Examples
```tsx
<Calendar defaultValue={new Date(2026, 5, 15)} />
```

### Range limits and disabled days
```tsx
<Calendar
  min={new Date(2026, 5, 8)}
  max={new Date(2026, 5, 24)}
  isDateDisabled={(date) => date.getDay() === 0 || date.getDay() === 6}
/>
```

### Controlled
```tsx
const [date, setDate] = useState<Date | null>(null);

<Calendar value={date} onValueChange={setDate} />
```

### Locale and week start
```tsx
<Calendar locale="de-DE" weekStartsOn={1} />
```
