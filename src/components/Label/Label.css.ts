import { style } from "@vanilla-extract/css";
import { recipe, type RecipeVariants } from "@vanilla-extract/recipes";
import { vars } from "../../theme/theme.css";

/**
 * Field wrapper — stacks a Label with its control and drives the label color:
 * focus (`:focus-within`) → brand, `data-invalid` → danger, `data-disabled` → muted.
 */
export const field = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.xs,
});

export const label = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    fontFamily: vars.font.family.sans,
    fontWeight: vars.font.weight.medium,
    color: vars.color.text.secondary,
    transition: "color 0.15s",
    // priority (equal specificity, source order = later wins): focus < invalid < disabled
    selectors: {
      [`${field}:focus-within &`]: { color: vars.color.brand.text },
      [`${field}[data-invalid="true"] &`]: { color: vars.color.danger.text },
      [`${field}[data-disabled="true"] &`]: { color: vars.color.text.disabled },
    },
  },
  variants: {
    size: {
      sm: { fontSize: vars.font.size.xs, lineHeight: vars.font.lineHeight.xs },
      md: { fontSize: vars.font.size.md, lineHeight: vars.font.lineHeight.md },
      lg: { fontSize: vars.font.size.lg, lineHeight: vars.font.lineHeight.lg },
    },
    error: { true: { color: vars.color.danger.text } },
    disabled: { true: { color: vars.color.text.disabled, cursor: "not-allowed" } },
  },
  defaultVariants: { size: "md" },
});

export const required = style({
  color: vars.color.danger.text,
  marginLeft: "2px",
});

export type LabelVariants = NonNullable<RecipeVariants<typeof label>>;
