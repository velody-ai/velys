import type { Meta, StoryObj } from "@storybook/react";
import { Card, CardTitle, CardDescription } from "./Card";
import { Button } from "../Button";

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
};
export default meta;
type Story = StoryObj<typeof Card>;

const Inner = () => (
  <>
    <CardTitle>Card title</CardTitle>
    <CardDescription>Supporting description text that explains the card content.</CardDescription>
    <div style={{ marginTop: 8 }}>
      <Button size="small">Action</Button>
    </div>
  </>
);

export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
      <Card variant="elevated" style={{ width: 280 }}><Inner /></Card>
      <Card variant="outlined" style={{ width: 280 }}><Inner /></Card>
      <Card variant="filled" style={{ width: 280 }}><Inner /></Card>
    </div>
  ),
};
