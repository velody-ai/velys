import { recipe, type RecipeVariants } from "@vanilla-extract/recipes";
import { style } from "@vanilla-extract/css";
import { vars } from "../../theme/theme.css";

export const list = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.xs,
  margin: 0,
  padding: 0,
  listStyle: "none",
});

export const item = recipe({
  base: {
    all: "unset",
    boxSizing: "border-box",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    fontFamily: vars.font.family.sans,
    fontWeight: vars.font.weight.medium,
    color: vars.color.text.primary,
    border: `1px solid transparent`,
    borderRadius: vars.radius.sm,
    transition: `background-color ${vars.motion.duration.base} ${vars.motion.easing.standard}`,
    selectors: {
      "&:hover:not([aria-disabled='true'])": { backgroundColor: vars.color.bg.hover },
      "&:focus-visible": { outline: "none", boxShadow: vars.shadow.focus },
      "&[aria-current='page']": {
        backgroundColor: vars.color.bg.inverse,
        color: vars.color.text.inverse,
      },
      "&[aria-disabled='true']": { cursor: "not-allowed", color: vars.color.text.disabled },
    },
  },
  variants: {
    size: {
      sm: { minWidth: "28px", height: "28px", paddingInline: vars.space.xs, fontSize: vars.font.size.sm },
      md: { minWidth: "36px", height: "36px", paddingInline: vars.space.sm, fontSize: vars.font.size.md },
    },
  },
  defaultVariants: { size: "md" },
});

export const ellipsis = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  minWidth: "36px",
  color: vars.color.text.tertiary,
});

export type ItemVariants = NonNullable<RecipeVariants<typeof item>>;
