import { recipe, type RecipeVariants } from "@vanilla-extract/recipes";
import { vars } from "../../theme/theme.css";

export const button = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: vars.font.family.sans,
    fontWeight: vars.font.weight.semibold,
    borderRadius: vars.radius.sm,
    border: "1px solid transparent",
    cursor: "pointer",
    whiteSpace: "nowrap",
    userSelect: "none",
    transition: "background-color 0.15s, border-color 0.15s, color 0.15s, opacity 0.15s",
    selectors: {
      "&:focus-visible": { outline: "none", boxShadow: vars.shadow.focus },
      // Disabled greying does NOT apply while loading — a loading button keeps
      // its color (brand/secondary/…) and just shows the spinner.
      '&:disabled:not([data-loading="true"])': {
        cursor: "not-allowed",
        backgroundColor: vars.color.bg.disabled,
        borderColor: "transparent",
        color: vars.color.text.disabled,
        opacity: 1,
      },
      '&[data-loading="true"]': { cursor: "progress" },
    },
  },
  variants: {
    size: {
      mini: { height: "24px", paddingInline: vars.space.sm, gap: vars.space.xs, fontSize: vars.font.size.xs },
      small: { height: "32px", paddingInline: "10px", gap: vars.space.xs, fontSize: vars.font.size.md },
      medium: { height: "40px", paddingInline: vars.space.md, gap: "6px", fontSize: vars.font.size.md },
      large: { height: "48px", paddingInline: vars.space.lg, gap: vars.space.sm, fontSize: vars.font.size.lg },
    },
    color: { primary: {}, secondary: {}, destructive: {} },
    variant: {
      solid: {},
      outline: { backgroundColor: "transparent", selectors: { "&:disabled": { backgroundColor: "transparent" } } },
      ghost: { backgroundColor: "transparent", selectors: { "&:disabled": { backgroundColor: "transparent" } } },
    },
    fullWidth: { true: { width: "100%" } },
  },
  compoundVariants: [
    // Primary (brand = teal)
    { variants: { color: "primary", variant: "solid" }, style: { backgroundColor: vars.color.brand.solid, color: vars.color.brand.onSolid, selectors: { "&:not(:disabled):hover": { backgroundColor: vars.color.brand.solidHover } } } },
    { variants: { color: "primary", variant: "outline" }, style: { borderColor: vars.color.brand.border, color: vars.color.brand.text, selectors: { "&:not(:disabled):hover": { backgroundColor: vars.color.bg.hover } } } },
    { variants: { color: "primary", variant: "ghost" }, style: { color: vars.color.brand.text, selectors: { "&:not(:disabled):hover": { backgroundColor: vars.color.bg.hover } } } },
    // Secondary (neutral high-contrast)
    { variants: { color: "secondary", variant: "solid" }, style: { backgroundColor: vars.color.bg.inverse, color: vars.color.text.inverse, selectors: { "&:not(:disabled):hover": { opacity: 0.85 } } } },
    { variants: { color: "secondary", variant: "outline" }, style: { borderColor: vars.color.border.default, color: vars.color.text.primary, selectors: { "&:not(:disabled):hover": { backgroundColor: vars.color.bg.hover } } } },
    { variants: { color: "secondary", variant: "ghost" }, style: { color: vars.color.text.primary, selectors: { "&:not(:disabled):hover": { backgroundColor: vars.color.bg.hover } } } },
    // Destructive
    { variants: { color: "destructive", variant: "solid" }, style: { backgroundColor: vars.color.danger.solid, color: vars.color.text.onBrand, selectors: { "&:not(:disabled):hover": { backgroundColor: vars.color.danger.solidHover } } } },
    { variants: { color: "destructive", variant: "outline" }, style: { borderColor: vars.color.danger.border, color: vars.color.danger.text, selectors: { "&:not(:disabled):hover": { backgroundColor: vars.color.danger.subtle } } } },
    { variants: { color: "destructive", variant: "ghost" }, style: { color: vars.color.danger.text, selectors: { "&:not(:disabled):hover": { backgroundColor: vars.color.danger.subtle } } } },
  ],
  defaultVariants: { size: "medium", color: "primary", variant: "solid" },
});

export type ButtonVariants = NonNullable<RecipeVariants<typeof button>>;
