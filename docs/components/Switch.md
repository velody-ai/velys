# Switch

An on/off toggle. Built on a native `<input type=checkbox role=switch>`.

```tsx
import { Switch } from "@velody/velys";
```

## Props
| Prop | Type | Default | Description |
|---|---|---|---|
| `size` | `"sm" \| "md"` | `"md"` | 32×18 / 44×24 |
| `label` | `ReactNode` | — | Label on the right |
| `disabled` | `boolean` | — | Disabled |
| ...rest | `InputHTMLAttributes` | — | `checked`, `defaultChecked`, `onChange` |

## Examples
```tsx
<Switch label="Receive notifications" defaultChecked />
<Switch size="sm" />
<Switch label="Disabled" disabled />
```
