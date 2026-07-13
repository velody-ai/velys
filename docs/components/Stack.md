# Stack

Flexbox layout primitive that stacks children with token-based gaps. Built on `<div>`.

```tsx
import { Stack } from "@velody/velys";
```

## Props
| Prop | Type | Default | Description |
|---|---|---|---|
| `direction` | `"row" \| "column"` | `"column"` | Flex direction |
| `gap` | `"none" \| "xxs" \| "xs" \| "sm" \| "md" \| "lg" \| "xl" \| "2xl" \| "3xl" \| "4xl"` | `"none"` | Gap between children (space tokens) |
| `align` | `"start" \| "center" \| "end" \| "stretch" \| "baseline"` | `"stretch"` | Cross-axis alignment (`align-items`) |
| `justify` | `"start" \| "center" \| "end" \| "between" \| "around"` | `"start"` | Main-axis alignment (`justify-content`) |
| `wrap` | `boolean` | `false` | Allow children to wrap onto multiple lines |
| ...rest | `HTMLAttributes<HTMLDivElement>` | — | |

## Examples
```tsx
<Stack gap="md">
  <Card>One</Card>
  <Card>Two</Card>
</Stack>

<Stack direction="row" gap="sm" align="center" justify="between">
  <Heading level={3}>Title</Heading>
  <Button size="sm">Action</Button>
</Stack>

<Stack direction="row" gap="sm" wrap>
  <Badge>alpha</Badge>
  <Badge>beta</Badge>
</Stack>
```
