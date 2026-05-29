import { recipe, type RecipeVariants } from "@vanilla-extract/recipes";
import { vars } from "../../theme/theme.css";

const colors = {
  neutral: { subtleBg: vars.color.bg.muted, subtleText: vars.color.text.secondary, solidBg: vars.color.bg.inverse, solidText: vars.color.text.inverse },
  brand: { subtleBg: vars.color.brand.subtle, subtleText: vars.color.brand.text, solidBg: vars.color.brand.solid, solidText: vars.color.text.onBrand },
  success: { subtleBg: vars.color.success.subtle, subtleText: vars.color.success.text, solidBg: vars.color.success.solid, solidText: vars.color.text.onBrand },
  warning: { subtleBg: vars.color.warning.subtle, subtleText: vars.color.warning.text, solidBg: vars.color.warning.solid, solidText: vars.color.text.onBrand },
  danger: { subtleBg: vars.color.danger.subtle, subtleText: vars.color.danger.text, solidBg: vars.color.danger.solid, solidText: vars.color.text.onBrand },
  info: { subtleBg: vars.color.info.subtle, subtleText: vars.color.info.text, solidBg: vars.color.info.solid, solidText: vars.color.text.onBrand },
} as const;

export const badge = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    gap: vars.space.xs,
    borderRadius: vars.radius.full,
    fontFamily: vars.font.family.sans,
    fontWeight: vars.font.weight.medium,
    whiteSpace: "nowrap",
    width: "fit-content",
  },
  variants: {
    size: {
      sm: { height: "20px", paddingInline: vars.space.sm, fontSize: vars.font.size.xs },
      md: { height: "24px", paddingInline: vars.space.md, fontSize: vars.font.size.xs },
    },
    color: { neutral: {}, brand: {}, success: {}, warning: {}, danger: {}, info: {} },
    variant: { solid: {}, subtle: {} },
  },
  compoundVariants: (Object.keys(colors) as Array<keyof typeof colors>).flatMap((c) => [
    { variants: { color: c, variant: "subtle" as const }, style: { backgroundColor: colors[c].subtleBg, color: colors[c].subtleText } },
    { variants: { color: c, variant: "solid" as const }, style: { backgroundColor: colors[c].solidBg, color: colors[c].solidText } },
  ]),
  defaultVariants: { size: "md", color: "neutral", variant: "subtle" },
});

export const dot = recipe({
  base: { width: "6px", height: "6px", borderRadius: vars.radius.full, backgroundColor: "currentColor", flexShrink: 0 },
});

export type BadgeVariants = NonNullable<RecipeVariants<typeof badge>>;
