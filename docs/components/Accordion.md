# Accordion

Vertically stacked, collapsible sections. Compound: `Accordion` / `AccordionItem` / `AccordionTrigger` / `AccordionContent`. Height animates via a CSS grid-rows transition.

```tsx
import {
  Accordion, AccordionItem, AccordionTrigger, AccordionContent,
} from "@velody/velys";
```

## Props
**Accordion** (root):
| Prop | Type | Default | Description |
|---|---|---|---|
| `type` | `"single" \| "multiple"` | `"single"` | One vs many open items |
| `collapsible` | `boolean` | `true` | Allow closing the open item in single mode |
| `value` / `defaultValue` | `string \| string[]` | — | Controlled / initial open item(s) |
| `onValueChange` | `(value: string[]) => void` | — | Change handler |
| `variant` | `"bordered" \| "separated"` | `"bordered"` | Visual style |
| `headingLevel` | `number` | `3` | ARIA heading level for triggers |

**AccordionItem**: `value` (required). **AccordionTrigger**: `disabled?`. **AccordionContent**: native div attrs.

## Examples
```tsx
<Accordion type="single" defaultValue="a">
  <AccordionItem value="a">
    <AccordionTrigger>Question</AccordionTrigger>
    <AccordionContent>Answer</AccordionContent>
  </AccordionItem>
</Accordion>
```
