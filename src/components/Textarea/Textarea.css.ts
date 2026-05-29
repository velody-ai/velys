import { recipe, type RecipeVariants } from "@vanilla-extract/recipes";
import { vars } from "../../theme/theme.css";

export const textarea = recipe({
  base: {
    display: "block",
    width: "100%",
    backgroundColor: vars.color.bg.default,
    border: `1px solid ${vars.color.border.default}`,
    borderRadius: vars.radius.md,
    color: vars.color.text.primary,
    fontFamily: vars.font.family.sans,
    fontSize: vars.font.size.md,
    lineHeight: vars.font.lineHeight.md,
    padding: vars.space.sm,
    paddingInline: vars.space.md,
    resize: "vertical",
    transition: "border-color 0.15s, box-shadow 0.15s",
    "::placeholder": { color: vars.color.text.placeholder },
    selectors: {
      "&:focus-visible": { outline: "none", borderColor: vars.color.border.focus, boxShadow: vars.shadow.focus },
      "&:disabled": { backgroundColor: vars.color.bg.disabled, color: vars.color.text.disabled, borderColor: vars.color.border.subtle, cursor: "not-allowed" },
    },
  },
  variants: {
    size: {
      sm: { minHeight: "72px" },
      md: { minHeight: "96px" },
      lg: { minHeight: "128px" },
    },
    invalid: {
      true: {
        borderColor: vars.color.danger.border,
        selectors: { "&:focus-visible": { borderColor: vars.color.danger.border, boxShadow: "0 0 0 3px #e5484d33" } },
      },
    },
  },
  defaultVariants: { size: "md" },
});

export type TextareaVariants = NonNullable<RecipeVariants<typeof textarea>>;
