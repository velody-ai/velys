// url=https://www.figma.com/design/tGCZO8dQPK1hwvOHGsjgJS/Velys?node-id=186-2
// source=src/components/Pagination/Pagination.tsx
// component=Pagination
import figma from "figma";

export default {
  example: figma.code`<Pagination page={1} count={10} onPageChange={(page) => {}} />`,
  imports: ['import { Pagination } from "@velody/velys"'],
  id: "pagination",
  metadata: { nestable: false },
};
