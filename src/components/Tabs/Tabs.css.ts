import { recipe, type RecipeVariants } from "@vanilla-extract/recipes";
import { vars } from "../../theme/theme.css";

export const list = recipe({
  base: { display: "inline-flex", fontFamily: vars.font.family.sans },
  variants: {
    variant: {
      underline: { gap: vars.space.xs, borderBottom: `1px solid ${vars.color.border.default}` },
      pill: { gap: vars.space.xxs, padding: vars.space.xxs, backgroundColor: vars.color.bg.muted, borderRadius: vars.radius.lg },
    },
  },
  defaultVariants: { variant: "underline" },
});

export const tab = recipe({
  base: {
    all: "unset",
    boxSizing: "border-box",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: vars.space.xs,
    cursor: "pointer",
    fontWeight: vars.font.weight.medium,
    color: vars.color.text.tertiary,
    transition: "color 0.15s, background-color 0.15s, border-color 0.15s",
    selectors: {
      "&:hover:not([aria-selected='true']):not(:disabled)": { color: vars.color.text.secondary },
      "&:focus-visible": { boxShadow: vars.shadow.focus, borderRadius: vars.radius.sm },
      "&:disabled": { color: vars.color.text.disabled, cursor: "not-allowed" },
    },
  },
  variants: {
    variant: {
      underline: { paddingInline: vars.space.md, borderBottom: "2px solid transparent", marginBottom: "-1px" },
      pill: { paddingInline: vars.space.md, borderRadius: vars.radius.md },
    },
    size: { sm: { height: "32px", fontSize: vars.font.size.sm }, md: { height: "40px", fontSize: vars.font.size.md } },
    selected: { true: {} },
  },
  compoundVariants: [
    { variants: { variant: "underline", selected: true }, style: { color: vars.color.text.primary, borderBottomColor: vars.color.brand.solid } },
    { variants: { variant: "pill", selected: true }, style: { color: vars.color.text.primary, backgroundColor: vars.color.bg.default, boxShadow: vars.shadow.sm } },
  ],
  defaultVariants: { variant: "underline", size: "md" },
});

export type TabVariants = NonNullable<RecipeVariants<typeof tab>>;
