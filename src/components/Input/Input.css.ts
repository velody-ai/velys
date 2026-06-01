import { style } from "@vanilla-extract/css";
import { recipe, type RecipeVariants } from "@vanilla-extract/recipes";
import { vars } from "../../theme/theme.css";

export const inputRoot = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    gap: vars.space.sm,
    width: "100%",
    backgroundColor: vars.color.bg.default,
    border: `1px solid ${vars.color.border.default}`,
    borderRadius: vars.radius.md,
    color: vars.color.text.primary,
    fontFamily: vars.font.family.sans,
    transition: "border-color 0.15s, box-shadow 0.15s",
    selectors: {
      "&:focus-within": {
        borderColor: vars.color.border.focus,
        boxShadow: vars.shadow.focus,
      },
    },
  },
  variants: {
    size: {
      sm: { height: "32px", paddingInline: vars.space.md, fontSize: vars.font.size.xs },
      md: { height: "40px", paddingInline: vars.space.md, fontSize: vars.font.size.md },
      lg: { height: "48px", paddingInline: vars.space.lg, fontSize: vars.font.size.lg },
    },
    invalid: {
      true: {
        borderColor: vars.color.danger.border,
        selectors: {
          "&:focus-within": { borderColor: vars.color.danger.border, boxShadow: "0 0 0 3px #e5484d33" },
        },
      },
    },
    disabled: {
      true: {
        backgroundColor: vars.color.bg.disabled,
        color: vars.color.text.tertiary,
        borderColor: vars.color.border.subtle,
        cursor: "not-allowed",
      },
    },
  },
  defaultVariants: { size: "md" },
});

export const inputControl = style({
  all: "unset",
  flex: 1,
  minWidth: 0,
  fontFamily: "inherit",
  fontSize: "inherit",
  color: "inherit",
  "::placeholder": { color: vars.color.text.placeholder },
  ":disabled": { cursor: "not-allowed" },
});

export const inputAffix = style({
  display: "inline-flex",
  alignItems: "center",
  color: vars.color.icon.muted,
  fontSize: "1.1em",
  flexShrink: 0,
});

export type InputVariants = NonNullable<RecipeVariants<typeof inputRoot>>;
