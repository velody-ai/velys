import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Pagination } from "./Pagination";

const meta: Meta<typeof Pagination> = {
  title: "Components/Pagination",
  component: Pagination,
};
export default meta;
type Story = StoryObj<typeof Pagination>;

export const Playground: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    return <Pagination page={page} count={10} onPageChange={setPage} />;
  },
};

export const ManyPages: Story = {
  render: () => {
    const [page, setPage] = useState(8);
    return <Pagination page={page} count={20} onPageChange={setPage} />;
  },
};

export const Small: Story = {
  render: () => {
    const [page, setPage] = useState(3);
    return <Pagination page={page} count={6} size="sm" onPageChange={setPage} />;
  },
};
