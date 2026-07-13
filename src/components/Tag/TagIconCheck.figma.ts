// url=https://www.figma.com/design/tGCZO8dQPK1hwvOHGsjgJS/Velys?node-id=284-7
// source=src/components/icons.tsx
// component=CheckIcon
// Maps the Figma "Tag Icon / Check" glyph to the exported CheckIcon so the
// Tag `Icon Swap` slot resolves to a real Velys import.
import figma from "figma";

export default {
  example: figma.code`<CheckIcon />`,
  imports: ['import { CheckIcon } from "@velody/velys"'],
  id: "tag-icon-check",
  metadata: { nestable: true },
};
