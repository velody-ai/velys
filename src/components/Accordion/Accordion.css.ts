import { style, globalStyle } from "@vanilla-extract/css";
import { recipe, type RecipeVariants } from "@vanilla-extract/recipes";
import { vars } from "../../theme/theme.css";

export const root = recipe({
  base: { width: "100%" },
  variants: {
    variant: {
      separated: { display: "flex", flexDirection: "column", gap: vars.space.sm },
      bordered: {
        border: `1px solid ${vars.color.border.default}`,
        borderRadius: vars.radius.lg,
        overflow: "hidden",
      },
    },
  },
  defaultVariants: { variant: "bordered" },
});

export const item = recipe({
  base: {},
  variants: {
    variant: {
      separated: {
        border: `1px solid ${vars.color.border.default}`,
        borderRadius: vars.radius.lg,
        overflow: "hidden",
      },
      bordered: {
        borderBottom: `1px solid ${vars.color.border.default}`,
        selectors: { "&:last-child": { borderBottom: "none" } },
      },
    },
  },
  defaultVariants: { variant: "bordered" },
});

export const heading = style({ margin: 0 });

export const trigger = style({
  all: "unset",
  boxSizing: "border-box",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: vars.space.sm,
  width: "100%",
  padding: `${vars.space.md} ${vars.space.lg}`,
  cursor: "pointer",
  fontFamily: vars.font.family.sans,
  fontSize: vars.font.size.md,
  fontWeight: vars.font.weight.medium,
  color: vars.color.text.primary,
  transition: `background-color ${vars.motion.duration.base} ${vars.motion.easing.standard}`,
  selectors: {
    "&:hover": { backgroundColor: vars.color.bg.hover },
    "&:focus-visible": { outline: "none", boxShadow: `inset ${vars.shadow.focus}` },
    "&:disabled": { cursor: "not-allowed", color: vars.color.text.disabled },
  },
});

export const icon = style({
  flexShrink: 0,
  color: vars.color.icon.default,
  transition: `transform ${vars.motion.duration.base} ${vars.motion.easing.standard}`,
});

// Rotate the chevron when its trigger is expanded.
globalStyle(`${trigger}[aria-expanded="true"] ${icon}`, {
  transform: "rotate(180deg)",
});

export const contentOuter = recipe({
  base: {
    display: "grid",
    transition: `grid-template-rows ${vars.motion.duration.slow} ${vars.motion.easing.standard}`,
  },
  variants: {
    open: {
      true: { gridTemplateRows: "1fr" },
      false: { gridTemplateRows: "0fr" },
    },
  },
});

export const contentInner = style({ overflow: "hidden", minHeight: 0 });

export const contentBody = style({
  padding: `0 ${vars.space.lg} ${vars.space.md}`,
  fontSize: vars.font.size.md,
  lineHeight: vars.font.lineHeight.md,
  color: vars.color.text.secondary,
});

export type RootVariants = NonNullable<RecipeVariants<typeof root>>;
