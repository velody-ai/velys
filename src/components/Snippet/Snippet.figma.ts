// url=https://www.figma.com/design/tGCZO8dQPK1hwvOHGsjgJS/Velys?node-id=282-19
// source=src/components/Snippet/Snippet.tsx
// component=Snippet
import figma from "figma";

const instance = figma.selectedInstance;

const command = instance.getString("Command");
const prompt = instance.getBoolean("Prompt");
const size = instance.getEnum("Size", {
  Sm: "sm",
  Md: "md",
});

export default {
  example: figma.code`<Snippet text="${command}" size="${size}" ${prompt ? "" : "prompt={false}"} />`,
  imports: ['import { Snippet } from "@velody/velys"'],
  id: "snippet",
  metadata: { nestable: true },
};
