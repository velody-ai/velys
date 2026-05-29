import { recipe, type RecipeVariants } from "@vanilla-extract/recipes";
import { vars } from "../../theme/theme.css";

export const iconButton = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: vars.radius.md,
    border: "1px solid transparent",
    cursor: "pointer",
    color: vars.color.icon.default,
    transition: "background-color 0.15s, border-color 0.15s, color 0.15s",
    flexShrink: 0,
    selectors: {
      "&:focus-visible": { outline: "none", boxShadow: vars.shadow.focus },
      "&:disabled": { cursor: "not-allowed", backgroundColor: vars.color.bg.disabled, borderColor: "transparent", color: vars.color.text.disabled },
    },
  },
  variants: {
    size: {
      sm: { width: "32px", height: "32px", fontSize: "16px" },
      md: { width: "40px", height: "40px", fontSize: "20px" },
      lg: { width: "48px", height: "48px", fontSize: "24px" },
    },
    variant: {
      solid: { backgroundColor: vars.color.brand.solid, color: vars.color.text.onBrand, selectors: { "&:not(:disabled):hover": { backgroundColor: vars.color.brand.solidHover } } },
      outline: { backgroundColor: "transparent", borderColor: vars.color.border.default, selectors: { "&:not(:disabled):hover": { backgroundColor: vars.color.bg.hover }, "&:disabled": { backgroundColor: "transparent" } } },
      ghost: { backgroundColor: "transparent", selectors: { "&:not(:disabled):hover": { backgroundColor: vars.color.bg.hover }, "&:disabled": { backgroundColor: "transparent" } } },
    },
    round: { true: { borderRadius: vars.radius.full } },
  },
  defaultVariants: { size: "md", variant: "ghost" },
});

export type IconButtonVariants = NonNullable<RecipeVariants<typeof iconButton>>;
