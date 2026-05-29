import type { Meta, StoryObj } from "@storybook/react";
import { EmptyState } from "./EmptyState";
import { Button } from "../Button";

const FolderIcon = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
  </svg>
);

const meta: Meta<typeof EmptyState> = {
  title: "Components/EmptyState",
  component: EmptyState,
  args: {
    icon: <FolderIcon />,
    title: "No items yet",
    description: "Get started by creating your first item. It will show up right here.",
  },
};
export default meta;
type Story = StoryObj<typeof EmptyState>;

export const Default: Story = {
  args: {
    actions: (
      <>
        <Button size="small">Get started</Button>
        <Button size="small" variant="outline">Learn more</Button>
      </>
    ),
  },
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
      <EmptyState {...args} size="sm" />
      <EmptyState {...args} size="md" />
      <EmptyState {...args} size="lg" />
    </div>
  ),
};
