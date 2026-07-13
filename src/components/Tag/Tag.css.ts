import { style } from "@vanilla-extract/css";
import { recipe, type RecipeVariants } from "@vanilla-extract/recipes";
import { vars } from "../../theme/theme.css";

const colors = {
  neutral: { subtleBg: vars.color.bg.muted, text: vars.color.text.secondary, border: vars.color.border.default },
  brand: { subtleBg: vars.color.brand.subtle, text: vars.color.brand.text, border: vars.color.brand.border },
  success: { subtleBg: vars.color.success.subtle, text: vars.color.success.text, border: vars.color.success.border },
  warning: { subtleBg: vars.color.warning.subtle, text: vars.color.warning.text, border: vars.color.warning.border },
  danger: { subtleBg: vars.color.danger.subtle, text: vars.color.danger.text, border: vars.color.danger.border },
  info: { subtleBg: vars.color.info.subtle, text: vars.color.info.text, border: vars.color.info.border },
} as const;

export const tag = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    gap: vars.space.xs,
    border: "1px solid transparent",
    borderRadius: vars.radius.md,
    fontFamily: vars.font.family.sans,
    fontWeight: vars.font.weight.medium,
    whiteSpace: "nowrap",
    width: "fit-content",
  },
  variants: {
    size: {
      sm: { height: "24px", paddingInline: vars.space.sm, fontSize: vars.font.size.xs },
      md: { height: "28px", paddingInline: vars.space.md, fontSize: vars.font.size.sm },
    },
    color: { neutral: {}, brand: {}, success: {}, warning: {}, danger: {}, info: {} },
    variant: { subtle: {}, outline: {} },
    disabled: { true: {}, false: {} },
  },
  compoundVariants: [
    ...(Object.keys(colors) as Array<keyof typeof colors>).flatMap((c) => [
      { variants: { color: c, variant: "subtle" as const }, style: { backgroundColor: colors[c].subtleBg, color: colors[c].text } },
      { variants: { color: c, variant: "outline" as const }, style: { backgroundColor: "transparent", borderColor: colors[c].border, color: colors[c].text } },
    ]),
    // Disabled overrides come last so they win over the color compounds.
    { variants: { disabled: true, variant: "subtle" as const }, style: { backgroundColor: vars.color.bg.disabled, color: vars.color.text.disabled } },
    { variants: { disabled: true, variant: "outline" as const }, style: { backgroundColor: "transparent", borderColor: vars.color.border.subtle, color: vars.color.text.disabled } },
  ],
  defaultVariants: { size: "md", color: "neutral", variant: "subtle", disabled: false },
});

export const closeButton = style({
  appearance: "none",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  width: "16px",
  height: "16px",
  padding: 0,
  border: "none",
  borderRadius: vars.radius.full,
  background: "transparent",
  color: "currentColor",
  fontSize: "12px", // CloseIcon is 1em → ~12px
  opacity: 0.7,
  cursor: "pointer",
  transition: `opacity ${vars.motion.duration.base} ${vars.motion.easing.standard}, background-color ${vars.motion.duration.base} ${vars.motion.easing.standard}`,
  selectors: {
    "&:hover:not(:disabled)": { opacity: 1, backgroundColor: vars.palette.alpha[200] },
    "&:focus-visible": { outline: "none", boxShadow: vars.shadow.focus, opacity: 1 },
    "&:disabled": { cursor: "not-allowed" },
  },
});

export type TagVariants = NonNullable<RecipeVariants<typeof tag>>;
