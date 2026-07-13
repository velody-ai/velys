import type { Meta, StoryObj } from "@storybook/react";
import type { ComponentType, SVGProps } from "react";
import { vars } from "../theme/theme.css";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  ChevronUpIcon,
  MoreHorizontalIcon,
  CloseIcon,
  InfoIcon,
  SuccessIcon,
  WarningIcon,
  ErrorIcon,
  MinusIcon,
  CopyIcon,
  ExternalLinkIcon,
  SearchIcon,
  CalendarIcon,
} from "./icons";

const icons: Array<[string, ComponentType<SVGProps<SVGSVGElement>>]> = [
  ["CheckIcon", CheckIcon],
  ["ChevronDownIcon", ChevronDownIcon],
  ["ChevronRightIcon", ChevronRightIcon],
  ["ChevronLeftIcon", ChevronLeftIcon],
  ["ChevronUpIcon", ChevronUpIcon],
  ["MoreHorizontalIcon", MoreHorizontalIcon],
  ["CloseIcon", CloseIcon],
  ["InfoIcon", InfoIcon],
  ["SuccessIcon", SuccessIcon],
  ["WarningIcon", WarningIcon],
  ["ErrorIcon", ErrorIcon],
  ["MinusIcon", MinusIcon],
  ["CopyIcon", CopyIcon],
  ["ExternalLinkIcon", ExternalLinkIcon],
  ["SearchIcon", SearchIcon],
  ["CalendarIcon", CalendarIcon],
];

const meta = {
  title: "Foundations/Icons",
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Gallery: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
        gap: vars.space.sm,
      }}
    >
      {icons.map(([name, Icon]) => (
        <div
          key={name}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: vars.space.sm,
            padding: vars.space.md,
            border: `1px solid ${vars.color.border.subtle}`,
            borderRadius: vars.radius.md,
            color: vars.color.text.primary,
          }}
        >
          <Icon style={{ fontSize: 20 }} />
          <code style={{ fontSize: vars.font.size.xs, color: vars.color.text.secondary }}>
            {name}
          </code>
        </div>
      ))}
    </div>
  ),
};

export const Sizing: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: vars.space.md, color: vars.color.text.primary }}>
      <SearchIcon style={{ fontSize: 12 }} />
      <SearchIcon style={{ fontSize: 16 }} />
      <SearchIcon style={{ fontSize: 20 }} />
      <SearchIcon style={{ fontSize: 24 }} />
      <SearchIcon style={{ fontSize: 32 }} />
    </div>
  ),
};
