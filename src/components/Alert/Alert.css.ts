import { style } from "@vanilla-extract/css";
import { recipe, type RecipeVariants } from "@vanilla-extract/recipes";
import { vars } from "../../theme/theme.css";

const map = {
  info: { subtle: vars.color.info.subtle, solid: vars.color.info.solid, text: vars.color.info.text, border: vars.color.info.border },
  success: { subtle: vars.color.success.subtle, solid: vars.color.success.solid, text: vars.color.success.text, border: vars.color.success.border },
  warning: { subtle: vars.color.warning.subtle, solid: vars.color.warning.solid, text: vars.color.warning.text, border: vars.color.warning.border },
  danger: { subtle: vars.color.danger.subtle, solid: vars.color.danger.solid, text: vars.color.danger.text, border: vars.color.danger.border },
  neutral: { subtle: vars.color.bg.muted, solid: vars.color.bg.inverse, text: vars.color.text.primary, border: vars.color.border.default },
} as const;

const onSolid = (s: keyof typeof map) => (s === "neutral" ? vars.color.text.inverse : vars.color.text.onBrand);

export const alert = recipe({
  base: {
    display: "flex",
    alignItems: "flex-start",
    gap: vars.space.sm,
    padding: vars.space.md,
    borderRadius: vars.radius.md,
    border: "1px solid transparent",
    fontFamily: vars.font.family.sans,
  },
  variants: {
    status: { info: {}, success: {}, warning: {}, danger: {}, neutral: {} },
    variant: { subtle: {}, solid: {}, outline: { backgroundColor: vars.color.bg.default } },
  },
  compoundVariants: (Object.keys(map) as Array<keyof typeof map>).flatMap((s) => [
    { variants: { status: s, variant: "subtle" as const }, style: { backgroundColor: map[s].subtle, borderColor: map[s].border, color: map[s].text } },
    { variants: { status: s, variant: "outline" as const }, style: { borderColor: map[s].border, color: map[s].text } },
    { variants: { status: s, variant: "solid" as const }, style: { backgroundColor: map[s].solid, color: onSolid(s) } },
  ]),
  defaultVariants: { status: "info", variant: "subtle" },
});

export const icon = style({ flexShrink: 0, fontSize: "16px", marginTop: "1px", color: "currentColor", display: "inline-flex" });
export const content = style({ display: "flex", flexDirection: "column", gap: "2px", flex: 1, minWidth: 0 });
export const title = style({ fontWeight: vars.font.weight.semibold, fontSize: vars.font.size.md, lineHeight: vars.font.lineHeight.md });
export const description = style({ fontSize: vars.font.size.sm, lineHeight: vars.font.lineHeight.sm, opacity: 0.85 });
export const close = style({
  all: "unset",
  cursor: "pointer",
  flexShrink: 0,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "20px",
  height: "20px",
  borderRadius: vars.radius.sm,
  color: "currentColor",
  opacity: 0.7,
  fontSize: "16px",
  selectors: { "&:hover": { opacity: 1 }, "&:focus-visible": { boxShadow: vars.shadow.focus } },
});

export type AlertVariants = NonNullable<RecipeVariants<typeof alert>>;
