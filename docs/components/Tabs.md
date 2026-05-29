# Tabs (compound)

Tab navigation. `Tabs` (provides context) + `TabList` + `Tab` + `TabPanel`. Supports both controlled and uncontrolled usage.

```tsx
import { Tabs, TabList, Tab, TabPanel } from "@velody/velys";
```

## Tabs Props
| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `string` | — | Controlled selected value |
| `defaultValue` | `string` | `""` | Uncontrolled initial value |
| `onValueChange` | `(value: string) => void` | — | Change callback |
| `variant` | `"underline" \| "pill"` | `"underline"` | Style |
| `size` | `"sm" \| "md"` | `"md"` | 32/40 height |

- `Tab` (props: `value: string` required, + `ButtonHTMLAttributes`, e.g. `disabled`)
- `TabPanel` (props: `value: string` required) — rendered only when it is the active value

## Example
```tsx
<Tabs defaultValue="a" variant="pill">
  <TabList>
    <Tab value="a">Overview</Tab>
    <Tab value="b">Settings</Tab>
    <Tab value="c" disabled>Disabled</Tab>
  </TabList>
  <TabPanel value="a">Overview content</TabPanel>
  <TabPanel value="b">Settings content</TabPanel>
</Tabs>
```
