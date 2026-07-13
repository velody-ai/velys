import { style, keyframes } from "@vanilla-extract/css";
import { recipe, type RecipeVariants } from "@vanilla-extract/recipes";
import { vars } from "../../theme/theme.css";

const fadeIn = keyframes({ from: { opacity: 0 }, to: { opacity: 1 } });
const panelIn = keyframes({
  from: { opacity: 0, transform: "translateY(-8px) scale(0.98)" },
  to: { opacity: 1, transform: "translateY(0) scale(1)" },
});

export const overlay = style({
  position: "fixed",
  inset: 0,
  zIndex: 100,
  backgroundColor: vars.color.bg.overlay,
  animationName: fadeIn,
  animationDuration: vars.motion.duration.base,
  animationTimingFunction: vars.motion.easing.standard,
});

export const panel = style({
  position: "fixed",
  top: "15vh",
  insetInline: 0,
  marginInline: "auto",
  width: "min(640px, calc(100vw - 32px))",
  display: "flex",
  flexDirection: "column",
  backgroundColor: vars.color.bg.default,
  border: `1px solid ${vars.color.border.subtle}`,
  borderRadius: vars.radius.xl,
  boxShadow: vars.shadow.modal,
  fontFamily: vars.font.family.sans,
  overflow: "hidden",
  animationName: panelIn,
  animationDuration: vars.motion.duration.base,
  animationTimingFunction: vars.motion.easing.decelerate,
});

export const inputRow = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.sm,
  height: "48px",
  flexShrink: 0,
  paddingInline: vars.space.lg,
  borderBottom: `1px solid ${vars.color.border.subtle}`,
});

export const inputIcon = style({
  display: "inline-flex",
  flexShrink: 0,
  fontSize: "16px",
  color: vars.color.icon.muted,
});

export const input = style({
  flex: 1,
  minWidth: 0,
  height: "100%",
  border: "none",
  outline: "none",
  background: "transparent",
  padding: 0,
  fontFamily: vars.font.family.sans,
  fontSize: vars.font.size.md,
  color: vars.color.text.primary,
  "::placeholder": { color: vars.color.text.tertiary },
});

export const list = style({
  overflowY: "auto",
  maxHeight: "min(400px, 50vh)",
  padding: vars.space.xs,
});

export const group = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.xxs,
});

export const groupHeading = style({
  paddingInline: vars.space.sm,
  paddingBlock: vars.space.xxs,
  fontSize: vars.font.size.xs,
  fontWeight: vars.font.weight.medium,
  color: vars.color.text.tertiary,
});

export const item = recipe({
  base: {
    boxSizing: "border-box",
    display: "flex",
    alignItems: "center",
    gap: vars.space.sm,
    minHeight: "40px",
    paddingInline: vars.space.sm,
    borderRadius: vars.radius.sm,
    fontSize: vars.font.size.sm,
    color: vars.color.text.primary,
    cursor: "pointer",
    userSelect: "none",
  },
  variants: {
    active: {
      true: { backgroundColor: vars.color.bg.hover },
    },
    disabled: {
      true: { color: vars.color.text.disabled, cursor: "not-allowed" },
    },
  },
});

export const itemIcon = style({
  display: "inline-flex",
  flexShrink: 0,
  fontSize: "16px",
  color: vars.color.icon.default,
});

export const itemLabel = style({
  flex: 1,
  minWidth: 0,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const itemHint = style({
  marginLeft: "auto",
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.xxs,
  flexShrink: 0,
  fontSize: vars.font.size.xs,
  color: vars.color.text.tertiary,
});

export const empty = style({
  padding: `${vars.space.xl} ${vars.space.lg}`,
  textAlign: "center",
  fontSize: vars.font.size.sm,
  color: vars.color.text.tertiary,
});

export const separator = style({
  height: "1px",
  flexShrink: 0,
  backgroundColor: vars.color.border.subtle,
  marginBlock: vars.space.xxs,
});

export type ItemVariants = NonNullable<RecipeVariants<typeof item>>;
