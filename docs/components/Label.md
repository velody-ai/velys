# Label

Form label for `Input` / `Select` / `Textarea`. Wrap a label and its control in a `Field` so the label automatically turns brand-colored while the control is focused (`:focus-within`) and red when the field is invalid.

```tsx
import { Label, Field } from "@velody/velys";
```

## Label Props
| Prop | Type | Default | Description |
|---|---|---|---|
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Matches the paired control size |
| `error` | `boolean` | — | Force red color (standalone; inside `Field` prefer `Field invalid`) |
| `required` | `boolean` | — | Show a red required asterisk |
| `disabled` | `boolean` | — | Muted color |
| `htmlFor` | `string` | — | Associates the label with a control `id` |

Extends `<label>` attributes.

## Field Props
| Prop | Type | Default | Description |
|---|---|---|---|
| `invalid` | `boolean` | — | Marks the field invalid → nested Label turns red |
| `disabled` | `boolean` | — | Mutes the nested Label |

Extends `<div>` attributes. Stacks children in a column with `space.xs` gap.

## Examples

```tsx
// Label brand-highlights while the input is focused
<Field>
  <Label htmlFor="email">Email</Label>
  <Input id="email" placeholder="you@example.com" />
</Field>

// Invalid field — label + control go red
<Field invalid>
  <Label htmlFor="email" required>Email</Label>
  <Input id="email" invalid defaultValue="not-an-email" />
</Field>

// Standalone label
<Label htmlFor="plan" size="sm">Plan</Label>
```
