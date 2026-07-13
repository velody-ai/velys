import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Tag } from "./Tag";
import { CheckIcon } from "../icons";

const meta: Meta<typeof Tag> = {
  title: "Components/Tag",
  component: Tag,
  args: { children: "Tag" },
};
export default meta;
type Story = StoryObj<typeof Tag>;

const colors = ["neutral", "brand", "success", "warning", "danger", "info"] as const;

export const Playground: Story = {
  args: { children: "Tag", onDismiss: () => {} },
};

export const ColorsAndVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {(["subtle", "outline"] as const).map((variant) => (
        <div key={variant} style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {colors.map((c) => (
            <Tag key={c} color={c} variant={variant}>
              {c}
            </Tag>
          ))}
        </div>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
      <Tag size="sm">Small</Tag>
      <Tag size="md">Medium</Tag>
      <Tag size="sm" onDismiss={() => {}} dismissLabel="Remove Small">
        Small
      </Tag>
      <Tag size="md" onDismiss={() => {}} dismissLabel="Remove Medium">
        Medium
      </Tag>
    </div>
  ),
};

export const WithIcon: Story = {
  args: { icon: <CheckIcon />, color: "success", children: "Verified" },
};

const DismissibleExample = () => {
  const [tags, setTags] = useState(["React", "TypeScript", "vanilla-extract"]);
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      {tags.map((name) => (
        <Tag
          key={name}
          color="brand"
          onDismiss={() => setTags((prev) => prev.filter((t) => t !== name))}
          dismissLabel={`Remove ${name}`}
        >
          {name}
        </Tag>
      ))}
      {tags.length === 0 && <span style={{ fontSize: 13 }}>All tags removed</span>}
    </div>
  );
};

export const Dismissible: Story = {
  render: () => <DismissibleExample />,
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      <Tag disabled>Disabled</Tag>
      <Tag disabled variant="outline">
        Disabled outline
      </Tag>
      <Tag disabled color="danger" onDismiss={() => {}} dismissLabel="Remove Disabled">
        Disabled dismissible
      </Tag>
    </div>
  ),
};
