# Button

Action trigger button. Built on `<button>`, with native attribute pass-through. **Maps 1:1 to the Figma Button set's axes.**

```tsx
import { Button } from "@velody/velys";
```

## Props
| Prop | Type | Default | Description |
|---|---|---|---|
| `color` | `"primary" \| "secondary" \| "destructive"` | `"primary"` | Hue. primary=brand(teal), secondary=high-contrast neutral, destructive=red |
| `variant` | `"solid" \| "outline" \| "ghost"` | `"solid"` | Visual style |
| `size` | `"mini" \| "small" \| "medium" \| "large"` | `"medium"` | Height 24/32/40/48 |
| `fullWidth` | `boolean` | `false` | Width 100% |
| `leadingIcon` | `ReactNode` | — | Icon before the label |
| `trailingIcon` | `ReactNode` | — | Icon after the label |
| `disabled` | `boolean` | — | Disabled |
| ...rest | `ButtonHTMLAttributes` | — | `onClick`, `type` (defaults to `"button"`), etc. |

## Examples
```tsx
<Button>Save</Button>                                   {/* primary / solid / medium */}
<Button color="secondary" variant="outline">Cancel</Button>
<Button color="destructive">Delete</Button>
<Button color="destructive" variant="ghost" size="small">Remove</Button>
<Button size="mini" leadingIcon={<Icon/>}>Add</Button>
<Button fullWidth>Continue</Button>
```

## Notes
- The brand (primary) color is unified as **teal** (`vars.color.brand.*`) system-wide.
- radius is `vars.radius.sm` (4px), font is Semi Bold.
- On focus, the `vars.shadow.focus` (teal) ring is applied automatically.
