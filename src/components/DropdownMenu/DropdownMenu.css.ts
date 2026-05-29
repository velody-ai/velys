import { style } from "@vanilla-extract/css";
import { recipe, type RecipeVariants } from "@vanilla-extract/recipes";
import { vars } from "../../theme/theme.css";

export const wrapper = style({ position: "relative", display: "inline-block" });

export const menu = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.xxs,
  minWidth: "200px",
  padding: vars.space.xs,
  backgroundColor: vars.color.bg.default,
  border: `1px solid ${vars.color.border.subtle}`,
  borderRadius: vars.radius.lg,
  boxShadow: vars.shadow.menu,
  fontFamily: vars.font.family.sans,
});

export const positioned = style({ position: "absolute", top: "calc(100% + 4px)", left: 0, zIndex: 50 });

export const item = recipe({
  base: {
    all: "unset",
    boxSizing: "border-box",
    display: "flex",
    alignItems: "center",
    gap: vars.space.sm,
    width: "100%",
    height: "32px",
    paddingInline: vars.space.sm,
    borderRadius: vars.radius.sm,
    fontSize: vars.font.size.sm,
    fontWeight: vars.font.weight.medium,
    color: vars.color.text.primary,
    cursor: "pointer",
    selectors: { "&:focus-visible": { boxShadow: vars.shadow.focus } },
  },
  variants: {
    tone: {
      default: { selectors: { "&:hover:not([aria-disabled='true'])": { backgroundColor: vars.color.bg.hover } } },
      danger: { color: vars.color.danger.text, selectors: { "&:hover:not([aria-disabled='true'])": { backgroundColor: vars.color.danger.subtle } } },
    },
    disabled: { true: { color: vars.color.text.disabled, cursor: "not-allowed" } },
  },
  defaultVariants: { tone: "default" },
});

export const itemIcon = style({ display: "inline-flex", fontSize: "16px", flexShrink: 0 });
export const itemHint = style({ marginLeft: "auto", color: vars.color.text.tertiary, fontSize: vars.font.size.xs });
export const separator = style({ height: "1px", backgroundColor: vars.color.border.subtle, marginBlock: vars.space.xxs });
export const label = style({
  paddingInline: vars.space.sm,
  paddingBlock: vars.space.xxs,
  fontSize: vars.font.size.xs,
  fontWeight: vars.font.weight.semibold,
  letterSpacing: "0.04em",
  textTransform: "uppercase",
  color: vars.color.text.tertiary,
});

export type ItemVariants = NonNullable<RecipeVariants<typeof item>>;
