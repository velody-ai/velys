import type { Meta, StoryObj } from "@storybook/react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "./Table";
import { Badge } from "../Badge";

const meta: Meta<typeof Table> = {
  title: "Components/Table",
  component: Table,
  argTypes: { size: { control: "inline-radio", options: ["sm", "md"] } },
};
export default meta;
type Story = StoryObj<typeof Table>;

const rows = [
  { name: "Inter", role: "Sans", status: "Active" },
  { name: "Geist Mono", role: "Mono", status: "Active" },
  { name: "Roboto", role: "Sans", status: "Deprecated" },
];

export const Playground: Story = {
  render: (args) => (
    <div style={{ width: 480 }}>
      <Table {...args}>
        <TableCaption>Font families in the design system.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((r) => (
            <TableRow key={r.name}>
              <TableCell>{r.name}</TableCell>
              <TableCell>{r.role}</TableCell>
              <TableCell>
                <Badge color={r.status === "Active" ? "success" : "neutral"} variant="subtle">
                  {r.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  ),
};

export const Striped: Story = {
  render: () => (
    <div style={{ width: 480 }}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((r) => (
            <TableRow key={r.name} striped interactive>
              <TableCell>{r.name}</TableCell>
              <TableCell>{r.role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  ),
};
