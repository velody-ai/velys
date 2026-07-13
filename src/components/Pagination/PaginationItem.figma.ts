// url=https://www.figma.com/design/tGCZO8dQPK1hwvOHGsjgJS/Velys?node-id=189-10
// source=src/components/Pagination/Pagination.tsx
// component=Pagination
// The Figma "Pagination Item" set is an internal building block rendered by
// Pagination — there is no standalone code export, so it maps to the root usage.
import figma from "figma";

const instance = figma.selectedInstance;

const type = instance.getEnum("Type", {
  Page: "page",
  Current: "current",
});

export default {
  example: figma.code`<Pagination page={${type === "current" ? "1" : "2"}} count={10} onPageChange={(page) => {}} />`,
  imports: ['import { Pagination } from "@velody/velys"'],
  id: "pagination-item",
  metadata: { nestable: false },
};
