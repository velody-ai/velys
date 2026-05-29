# Checkbox

A checkbox. Built on a native `<input type=checkbox>` plus a styled box, wrapped in a `label`. The checked/indeterminate states are visualized with CSS, so it works in both controlled and uncontrolled modes.

```tsx
import { Checkbox } from "@velody/velys";
```

## Props
| Prop | Type | Default | Description |
|---|---|---|---|
| `size` | `"sm" \| "md"` | `"md"` | 16/20 |
| `indeterminate` | `boolean` | `false` | Partial selection (dash) |
| `invalid` | `boolean` | `false` | Error border |
| `label` | `ReactNode` | — | Label on the right |
| `description` | `ReactNode` | — | Helper text below the label |
| `disabled` | `boolean` | — | Disabled |
| ...rest | `InputHTMLAttributes` | — | `checked`, `defaultChecked`, `onChange`, `name`, `value` |

## Examples
```tsx
<Checkbox label="Agree to the terms" />
<Checkbox label="Select all" indeterminate />
<Checkbox label="Notifications" description="Receive via email" defaultChecked />
```
