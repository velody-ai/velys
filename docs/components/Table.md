# Table

Data table. Compound: `Table` / `TableHeader` / `TableBody` / `TableFooter` / `TableRow` / `TableHead` / `TableCell` / `TableCaption`. The table is wrapped in a horizontally scrollable container.

```tsx
import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableCaption,
} from "@velody/velys";
```

## Props
- **Table**: `size?: "sm" | "md"` (default `"md"`, propagated to heads/cells) + native table attrs.
- **TableRow**: `interactive?` (hover highlight), `striped?` (zebra rows).
- **TableHead**: renders `<th scope="col">`. **TableCell**: renders `<td>`.
- **TableCaption**: renders `<caption>`.

## Examples
```tsx
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow interactive>
      <TableCell>Inter</TableCell>
      <TableCell><Badge color="success">Active</Badge></TableCell>
    </TableRow>
  </TableBody>
</Table>
```
