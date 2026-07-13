// url=https://www.figma.com/design/tGCZO8dQPK1hwvOHGsjgJS/Velys?node-id=180-2
// source=src/components/Popover/Popover.tsx
// component=Popover
import figma from "figma";

export default {
  example: figma.code`<Popover>
  <PopoverTrigger>
    <Button variant="outline">Open</Button>
  </PopoverTrigger>
  <PopoverContent side="bottom" align="start">
    Panel content
  </PopoverContent>
</Popover>`,
  imports: ['import { Popover, PopoverTrigger, PopoverContent, Button } from "@velody/velys"'],
  id: "popover",
  metadata: { nestable: false },
};
