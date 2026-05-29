# Radio / RadioGroup

A radio button and its group container. Grouped by a shared `name`.

```tsx
import { Radio, RadioGroup } from "@velody/velys";
```

## Radio Props
| Prop | Type | Default | Description |
|---|---|---|---|
| `size` | `"sm" \| "md"` | `"md"` | 16/20 |
| `label` | `ReactNode` | — | Label |
| `description` | `ReactNode` | — | Helper text |
| `disabled` | `boolean` | — | Disabled |
| ...rest | `InputHTMLAttributes` | — | `name`, `value`, `checked`, `defaultChecked`, `onChange` |

## RadioGroup Props
| Prop | Type | Default | Description |
|---|---|---|---|
| `orientation` | `"vertical" \| "horizontal"` | `"vertical"` | Layout direction (`<fieldset>`) |
| ...rest | `FieldsetHTMLAttributes` | — | |

## Examples
```tsx
<RadioGroup>
  <Radio name="plan" value="free" label="Free" defaultChecked />
  <Radio name="plan" value="pro" label="Pro" description="$20/mo" />
</RadioGroup>
```
