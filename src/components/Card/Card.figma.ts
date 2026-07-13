// url=https://www.figma.com/design/tGCZO8dQPK1hwvOHGsjgJS/Velys?node-id=99-29
// source=src/components/Card/Card.tsx
// component=Card
import figma from "figma";

const instance = figma.selectedInstance;

const variant = instance.getEnum("Variant", {
  Elevated: "elevated",
  Outlined: "outlined",
  Filled: "filled",
});
const padding = instance.getEnum("Padding", {
  sm: "sm",
  md: "md",
  lg: "lg",
});
const textLayers = instance.findLayers((n) => n.type === "TEXT");
const titleNode = textLayers[0];
const title = titleNode && titleNode.type === "TEXT" ? titleNode.textContent : "Card title";
const descriptionNode = textLayers[1];
const description =
  descriptionNode && descriptionNode.type === "TEXT" ? descriptionNode.textContent : "";

export default {
  example: figma.code`<Card variant="${variant}" padding="${padding}">
  <CardTitle>${title}</CardTitle>
  ${description ? `<CardDescription>${description}</CardDescription>` : ""}
</Card>`,
  imports: ['import { Card, CardTitle, CardDescription } from "@velody/velys"'],
  id: "card",
  metadata: { nestable: false },
};
