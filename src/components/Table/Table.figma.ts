// url=https://www.figma.com/design/tGCZO8dQPK1hwvOHGsjgJS/Velys?node-id=188-2
// source=src/components/Table/Table.tsx
// component=Table
import figma from "figma";

export default {
  example: figma.code`<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Inter</TableCell>
      <TableCell>Active</TableCell>
    </TableRow>
  </TableBody>
</Table>`,
  imports: [
    'import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@velody/velys"',
  ],
  id: "table",
  metadata: { nestable: false },
};
