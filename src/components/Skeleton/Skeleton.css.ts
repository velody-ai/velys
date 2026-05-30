import { recipe, type RecipeVariants } from "@vanilla-extract/recipes";
import { keyframes, style } from "@vanilla-extract/css";
import { vars } from "../../theme/theme.css";

const pulse = keyframes({
  "0%, 100%": { opacity: 1 },
  "50%": { opacity: 0.4 },
});

export const skeleton = recipe({
  base: {
    display: "block",
    backgroundColor: vars.color.bg.muted,
    animationName: pulse,
    animationDuration: "1.5s",
    animationTimingFunction: vars.motion.easing.standard,
    animationIterationCount: "infinite",
  },
  variants: {
    variant: {
      text: { height: "0.8em", borderRadius: vars.radius.sm, margin: "0.2em 0" },
      rectangular: { borderRadius: vars.radius.md },
      circular: { borderRadius: vars.radius.full },
    },
  },
  defaultVariants: { variant: "rectangular" },
});

export const textGroup = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.xs,
});

export type SkeletonVariants = NonNullable<RecipeVariants<typeof skeleton>>;
