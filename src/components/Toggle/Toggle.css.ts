import { style } from "@vanilla-extract/css";
import { recipe, type RecipeVariants } from "@vanilla-extract/recipes";
import { vars } from "../../theme/theme.css";

export const toggle = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: vars.font.family.sans,
    fontWeight: vars.font.weight.semibold,
    borderRadius: vars.radius.sm,
    border: "1px solid transparent",
    backgroundColor: "transparent",
    color: vars.color.text.secondary,
    cursor: "pointer",
    whiteSpace: "nowrap",
    userSelect: "none",
    transition: "background-color 0.15s, border-color 0.15s, color 0.15s",
    selectors: {
      "&:focus-visible": { outline: "none", boxShadow: vars.shadow.focus },
      "&:not(:disabled):hover": { backgroundColor: vars.color.bg.hover },
      '&[aria-pressed="true"]': {
        backgroundColor: vars.color.bg.active,
        color: vars.color.text.primary,
        borderColor: vars.color.border.default,
      },
      "&:disabled": {
        cursor: "not-allowed",
        color: vars.color.text.disabled,
      },
      '&:disabled[aria-pressed="true"]': {
        backgroundColor: vars.color.bg.disabled,
        borderColor: vars.color.border.subtle,
      },
    },
  },
  variants: {
    // Sizes mirror Button's small/medium/large (height 32/40/48).
    size: {
      small: { height: "32px", paddingInline: "10px", gap: vars.space.xs, fontSize: vars.font.size.md },
      medium: { height: "40px", paddingInline: vars.space.md, gap: "6px", fontSize: vars.font.size.md },
      large: { height: "48px", paddingInline: vars.space.lg, gap: vars.space.sm, fontSize: vars.font.size.lg },
    },
    // Inside a ToggleGroup the container owns the border/radius; items are
    // square segments separated by a 1px divider.
    inGroup: {
      true: {
        borderRadius: 0,
        border: "none",
        borderRight: `1px solid ${vars.color.border.default}`,
        selectors: {
          "&:first-child": {
            borderTopLeftRadius: `calc(${vars.radius.md} - 1px)`,
            borderBottomLeftRadius: `calc(${vars.radius.md} - 1px)`,
          },
          "&:last-child": {
            borderRight: "none",
            borderTopRightRadius: `calc(${vars.radius.md} - 1px)`,
            borderBottomRightRadius: `calc(${vars.radius.md} - 1px)`,
          },
        },
      },
    },
  },
  defaultVariants: { size: "medium" },
});

export type ToggleVariants = NonNullable<RecipeVariants<typeof toggle>>;

export const group = style({
  display: "inline-flex",
  alignItems: "center",
  border: `1px solid ${vars.color.border.default}`,
  borderRadius: vars.radius.md,
  overflow: "hidden",
});
