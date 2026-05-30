import { style, keyframes } from "@vanilla-extract/css";
import { recipe, type RecipeVariants } from "@vanilla-extract/recipes";
import { vars } from "../../theme/theme.css";

const fadeIn = keyframes({ from: { opacity: 0 }, to: { opacity: 1 } });

export const overlay = style({
  position: "fixed",
  inset: 0,
  zIndex: 950,
  backgroundColor: vars.color.bg.overlay,
  animationName: fadeIn,
  animationDuration: vars.motion.duration.base,
  animationTimingFunction: vars.motion.easing.standard,
});

const slideRight = keyframes({ from: { transform: "translateX(100%)" }, to: { transform: "translateX(0)" } });
const slideLeft = keyframes({ from: { transform: "translateX(-100%)" }, to: { transform: "translateX(0)" } });
const slideUp = keyframes({ from: { transform: "translateY(100%)" }, to: { transform: "translateY(0)" } });
const slideDown = keyframes({ from: { transform: "translateY(-100%)" }, to: { transform: "translateY(0)" } });

export const panel = recipe({
  base: {
    position: "fixed",
    zIndex: 951,
    display: "flex",
    flexDirection: "column",
    backgroundColor: vars.color.bg.default,
    boxShadow: vars.shadow.modal,
    animationDuration: vars.motion.duration.slow,
    animationTimingFunction: vars.motion.easing.emphasized,
    animationFillMode: "both",
  },
  variants: {
    side: {
      right: { top: 0, right: 0, height: "100%", animationName: slideRight },
      left: { top: 0, left: 0, height: "100%", animationName: slideLeft },
      bottom: { left: 0, right: 0, bottom: 0, width: "100%", animationName: slideUp },
      top: { left: 0, right: 0, top: 0, width: "100%", animationName: slideDown },
    },
    size: {
      sm: {},
      md: {},
      lg: {},
    },
  },
  compoundVariants: [
    { variants: { side: "right", size: "sm" }, style: { width: "320px", maxWidth: "100vw" } },
    { variants: { side: "right", size: "md" }, style: { width: "420px", maxWidth: "100vw" } },
    { variants: { side: "right", size: "lg" }, style: { width: "560px", maxWidth: "100vw" } },
    { variants: { side: "left", size: "sm" }, style: { width: "320px", maxWidth: "100vw" } },
    { variants: { side: "left", size: "md" }, style: { width: "420px", maxWidth: "100vw" } },
    { variants: { side: "left", size: "lg" }, style: { width: "560px", maxWidth: "100vw" } },
    { variants: { side: "top", size: "sm" }, style: { height: "200px", maxHeight: "100vh" } },
    { variants: { side: "top", size: "md" }, style: { height: "320px", maxHeight: "100vh" } },
    { variants: { side: "top", size: "lg" }, style: { height: "480px", maxHeight: "100vh" } },
    { variants: { side: "bottom", size: "sm" }, style: { height: "200px", maxHeight: "100vh" } },
    { variants: { side: "bottom", size: "md" }, style: { height: "320px", maxHeight: "100vh" } },
    { variants: { side: "bottom", size: "lg" }, style: { height: "480px", maxHeight: "100vh" } },
  ],
  defaultVariants: { side: "right", size: "md" },
});

export const header = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: vars.space.sm,
  padding: vars.space.lg,
  borderBottom: `1px solid ${vars.color.border.subtle}`,
});

export const title = style({
  margin: 0,
  fontSize: vars.font.size.lg,
  lineHeight: vars.font.lineHeight.lg,
  fontWeight: vars.font.weight.semibold,
  color: vars.color.text.primary,
});

export const close = style({
  all: "unset",
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "28px",
  height: "28px",
  borderRadius: vars.radius.sm,
  color: vars.color.icon.default,
  fontSize: "16px",
  selectors: {
    "&:hover": { backgroundColor: vars.color.bg.hover },
    "&:focus-visible": { boxShadow: vars.shadow.focus },
  },
});

export const body = style({
  flex: 1,
  overflowY: "auto",
  padding: vars.space.lg,
  fontSize: vars.font.size.md,
  lineHeight: vars.font.lineHeight.md,
  color: vars.color.text.primary,
});

export const footer = style({
  display: "flex",
  justifyContent: "flex-end",
  gap: vars.space.sm,
  padding: vars.space.lg,
  borderTop: `1px solid ${vars.color.border.subtle}`,
});

export type PanelVariants = NonNullable<RecipeVariants<typeof panel>>;
