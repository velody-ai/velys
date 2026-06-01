import { keyframes } from "@vanilla-extract/css";
import { recipe, type RecipeVariants } from "@vanilla-extract/recipes";
import { vars } from "../theme/theme.css";

const popIn = keyframes({
  from: { opacity: 0, transform: "scale(0.92) translateY(6px)" },
  to: { opacity: 1, transform: "scale(1) translateY(0)" },
});

const popOut = keyframes({
  from: { opacity: 1, transform: "scale(1)" },
  to: { opacity: 0, transform: "scale(0.92)" },
});

export const viewport = recipe({
  base: {
    position: "fixed",
    zIndex: 1000,
    display: "flex",
    flexDirection: "column",
    gap: vars.space.sm,
    maxWidth: "calc(100vw - 32px)",
    pointerEvents: "none",
  },
  variants: {
    y: {
      // Newest toast sits closest to the anchored edge.
      top: { top: vars.space.lg, flexDirection: "column-reverse" },
      bottom: { bottom: vars.space.lg, flexDirection: "column" },
    },
    x: {
      left: { left: vars.space.lg, alignItems: "flex-start" },
      center: { left: "50%", transform: "translateX(-50%)", alignItems: "center" },
      right: { right: vars.space.lg, alignItems: "flex-end" },
    },
  },
});

export const item = recipe({
  base: { pointerEvents: "auto" },
  variants: {
    state: {
      entering: {
        animationName: popIn,
        animationDuration: vars.motion.duration.slow,
        animationTimingFunction: vars.motion.easing.decelerate,
        animationFillMode: "both",
      },
      leaving: {
        animationName: popOut,
        animationDuration: vars.motion.duration.base,
        animationTimingFunction: vars.motion.easing.accelerate,
        animationFillMode: "both",
      },
    },
  },
  defaultVariants: { state: "entering" },
});

/** Exit animation length in ms — keep in sync with the `leaving` duration token. */
export const EXIT_MS = 200;

export type ViewportVariants = NonNullable<RecipeVariants<typeof viewport>>;
