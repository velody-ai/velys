import { recipe, type RecipeVariants } from "@vanilla-extract/recipes";
import { vars } from "../../theme/theme.css";

export const stack = recipe({
  base: {
    display: "flex",
    boxSizing: "border-box",
  },
  variants: {
    direction: {
      row: { flexDirection: "row" },
      column: { flexDirection: "column" },
    },
    gap: {
      none: { gap: vars.space.none },
      xxs: { gap: vars.space.xxs },
      xs: { gap: vars.space.xs },
      sm: { gap: vars.space.sm },
      md: { gap: vars.space.md },
      lg: { gap: vars.space.lg },
      xl: { gap: vars.space.xl },
      "2xl": { gap: vars.space["2xl"] },
      "3xl": { gap: vars.space["3xl"] },
      "4xl": { gap: vars.space["4xl"] },
    },
    align: {
      start: { alignItems: "flex-start" },
      center: { alignItems: "center" },
      end: { alignItems: "flex-end" },
      stretch: { alignItems: "stretch" },
      baseline: { alignItems: "baseline" },
    },
    justify: {
      start: { justifyContent: "flex-start" },
      center: { justifyContent: "center" },
      end: { justifyContent: "flex-end" },
      between: { justifyContent: "space-between" },
      around: { justifyContent: "space-around" },
    },
    wrap: {
      true: { flexWrap: "wrap" },
      false: {},
    },
  },
  defaultVariants: {
    direction: "column",
    gap: "none",
    align: "stretch",
    justify: "start",
    wrap: false,
  },
});

export type StackVariants = NonNullable<RecipeVariants<typeof stack>>;
