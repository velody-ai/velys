import type { Meta, StoryObj } from "@storybook/react";
import { Stack } from "./Stack";
import { vars } from "../../theme/theme.css";

const meta: Meta<typeof Stack> = {
  title: "Components/Stack",
  component: Stack,
  argTypes: {
    direction: { control: "radio", options: ["row", "column"] },
    gap: {
      control: "select",
      options: ["none", "xxs", "xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl"],
    },
    align: { control: "select", options: ["start", "center", "end", "stretch", "baseline"] },
    justify: { control: "select", options: ["start", "center", "end", "between", "around"] },
    wrap: { control: "boolean" },
  },
};
export default meta;
type Story = StoryObj<typeof Stack>;

function Box({ label, height }: { label: string; height?: number }) {
  return (
    <div
      style={{
        backgroundColor: vars.color.brand.subtle,
        color: vars.color.brand.text,
        border: `1px solid ${vars.color.brand.border}`,
        borderRadius: vars.radius.md,
        padding: vars.space.sm,
        fontFamily: vars.font.family.sans,
        fontSize: vars.font.size.sm,
        minWidth: "48px",
        height: height ? `${height}px` : undefined,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {label}
    </div>
  );
}

export const Playground: Story = {
  args: { direction: "column", gap: "md" },
  render: (args) => (
    <Stack {...args}>
      <Box label="One" />
      <Box label="Two" />
      <Box label="Three" />
    </Stack>
  ),
};

export const Direction: Story = {
  render: () => (
    <Stack gap="lg">
      <Stack direction="column" gap="sm">
        <Box label="column 1" />
        <Box label="column 2" />
        <Box label="column 3" />
      </Stack>
      <Stack direction="row" gap="sm">
        <Box label="row 1" />
        <Box label="row 2" />
        <Box label="row 3" />
      </Stack>
    </Stack>
  ),
};

export const Gap: Story = {
  render: () => (
    <Stack gap="lg">
      {(["none", "xs", "sm", "md", "lg", "xl"] as const).map((g) => (
        <Stack key={g} direction="row" gap={g}>
          <Box label={g} />
          <Box label={g} />
          <Box label={g} />
        </Stack>
      ))}
    </Stack>
  ),
};

export const Align: Story = {
  render: () => (
    <Stack gap="lg">
      {(["start", "center", "end", "stretch", "baseline"] as const).map((a) => (
        <Stack key={a} direction="row" gap="sm" align={a} style={{ minHeight: "80px" }}>
          <Box label={a} height={32} />
          <Box label={a} height={56} />
          <Box label={a} />
        </Stack>
      ))}
    </Stack>
  ),
};

export const Justify: Story = {
  render: () => (
    <Stack gap="lg">
      {(["start", "center", "end", "between", "around"] as const).map((j) => (
        <Stack key={j} direction="row" gap="sm" justify={j} style={{ width: "480px" }}>
          <Box label={j} />
          <Box label={j} />
          <Box label={j} />
        </Stack>
      ))}
    </Stack>
  ),
};

export const Wrap: Story = {
  render: () => (
    <Stack direction="row" gap="sm" wrap style={{ width: "280px" }}>
      {Array.from({ length: 8 }, (_, i) => (
        <Box key={i} label={`Item ${i + 1}`} />
      ))}
    </Stack>
  ),
};
