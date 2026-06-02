import { recipe, type RecipeVariants } from "@vanilla-extract/recipes";
import { style, keyframes } from "@vanilla-extract/css";
import { vars } from "../../theme/theme.css";

const spin = keyframes({
  to: { transform: "rotate(360deg)" },
});

export const spinner = recipe({
  base: {
    display: "inline-block",
    borderRadius: vars.radius.full,
    borderStyle: "solid",
    animationName: spin,
    animationDuration: "0.6s",
    animationTimingFunction: "linear",
    animationIterationCount: "infinite",
  },
  variants: {
    size: {
      sm: { width: "16px", height: "16px", borderWidth: "2px" },
      md: { width: "20px", height: "20px", borderWidth: "2px" },
      lg: { width: "28px", height: "28px", borderWidth: "3px" },
    },
    // The full ring is a faint (25%) version of the arc color, the arc (top) is
    // solid. Deriving the track from the arc color keeps the spinner legible on
    // any surface — including dark mode — instead of a fixed grey track.
    tone: {
      current: {
        borderColor: "color-mix(in srgb, currentColor 25%, transparent)",
        borderTopColor: "currentColor",
      },
      brand: {
        borderColor: `color-mix(in srgb, ${vars.color.brand.solid} 25%, transparent)`,
        borderTopColor: vars.color.brand.solid,
      },
      muted: {
        borderColor: `color-mix(in srgb, ${vars.color.text.tertiary} 25%, transparent)`,
        borderTopColor: vars.color.text.tertiary,
      },
    },
  },
  defaultVariants: {
    size: "md",
    tone: "brand",
  },
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

export type SpinnerVariants = NonNullable<RecipeVariants<typeof spinner>>;
