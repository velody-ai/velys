// url=https://www.figma.com/design/tGCZO8dQPK1hwvOHGsjgJS/Velys?node-id=283-1024
// source=src/components/Stack/Stack.tsx
// component=Stack
import figma from "figma";

const instance = figma.selectedInstance;

const direction = instance.getEnum("Direction", {
  Row: "row",
  Column: "column",
});
const gap = instance.getEnum("Gap", {
  Sm: "sm",
  Md: "md",
  Lg: "lg",
});

export default {
  example: figma.code`<Stack direction="${direction}" gap="${gap}">
  {children}
</Stack>`,
  imports: ['import { Stack } from "@velody/velys"'],
  id: "stack",
  metadata: { nestable: false },
};
