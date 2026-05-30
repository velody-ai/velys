import { recipe, type RecipeVariants } from "@vanilla-extract/recipes";
import { style, keyframes, createVar } from "@vanilla-extract/css";
import { vars } from "../../theme/theme.css";

export const toneColor = createVar();

const toneVariants = {
  brand: { vars: { [toneColor]: vars.color.brand.solid } },
  success: { vars: { [toneColor]: vars.color.success.solid } },
  warning: { vars: { [toneColor]: vars.color.warning.solid } },
  danger: { vars: { [toneColor]: vars.color.danger.solid } },
} as const;

/* ---------------------------------------------------------------- Linear */

export const track = recipe({
  base: {
    width: "100%",
    overflow: "hidden",
    backgroundColor: vars.color.bg.muted,
    borderRadius: vars.radius.full,
  },
  variants: {
    size: {
      sm: { height: "4px" },
      md: { height: "8px" },
    },
  },
  defaultVariants: { size: "md" },
});

const indeterminateSlide = keyframes({
  "0%": { left: "-40%" },
  "100%": { left: "100%" },
});

export const fill = recipe({
  base: {
    height: "100%",
    backgroundColor: toneColor,
    borderRadius: vars.radius.full,
    transition: `width ${vars.motion.duration.slow} ${vars.motion.easing.standard}`,
  },
  variants: {
    tone: toneVariants,
    indeterminate: {
      true: {
        position: "relative",
        width: "40%",
        animationName: indeterminateSlide,
        animationDuration: "1.2s",
        animationTimingFunction: vars.motion.easing.standard,
        animationIterationCount: "infinite",
      },
    },
  },
  defaultVariants: { tone: "brand" },
});

/* -------------------------------------------------------------- Circular */

const spin = keyframes({ to: { transform: "rotate(360deg)" } });

export const circularWrap = recipe({
  base: { display: "inline-flex" },
  variants: {
    size: {
      sm: { width: "20px", height: "20px" },
      md: { width: "32px", height: "32px" },
      lg: { width: "48px", height: "48px" },
    },
    tone: toneVariants,
    indeterminate: {
      true: {
        animationName: spin,
        animationDuration: "0.8s",
        animationTimingFunction: "linear",
        animationIterationCount: "infinite",
      },
    },
  },
  defaultVariants: { size: "md", tone: "brand" },
});

export const circularTrack = style({ stroke: vars.color.bg.muted });
export const circularIndicator = style({
  stroke: toneColor,
  transition: `stroke-dashoffset ${vars.motion.duration.slow} ${vars.motion.easing.standard}`,
});

export const srOnly = style({
  position: "absolute",
  width: "1px",
  height: "1px",
  padding: 0,
  margin: "-1px",
  overflow: "hidden",
  clip: "rect(0 0 0 0)",
  whiteSpace: "nowrap",
  border: 0,
});

export type TrackVariants = NonNullable<RecipeVariants<typeof track>>;
export type FillVariants = NonNullable<RecipeVariants<typeof fill>>;
export type CircularVariants = NonNullable<RecipeVariants<typeof circularWrap>>;
