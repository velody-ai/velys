import { recipe, type RecipeVariants } from "@vanilla-extract/recipes";
import { vars } from "../../theme/theme.css";

export const heading = recipe({
  base: {
    margin: 0,
    fontFamily: vars.font.family.sans,
    color: vars.color.text.primary,
    letterSpacing: "-0.01em",
  },
  variants: {
    /** Visual size — decoupled from the heading level so `as` can differ for a11y. */
    size: {
      display: {
        fontSize: vars.font.size.display,
        lineHeight: vars.font.lineHeight.display,
        fontWeight: vars.font.weight.bold,
        letterSpacing: "-0.02em",
      },
      h1: {
        fontSize: vars.font.size["3xl"],
        lineHeight: vars.font.lineHeight["3xl"],
        fontWeight: vars.font.weight.bold,
      },
      h2: {
        fontSize: vars.font.size["2xl"],
        lineHeight: vars.font.lineHeight["2xl"],
        fontWeight: vars.font.weight.semibold,
      },
      h3: {
        fontSize: vars.font.size.xl,
        lineHeight: vars.font.lineHeight.xl,
        fontWeight: vars.font.weight.semibold,
      },
      h4: {
        fontSize: vars.font.size.lg,
        lineHeight: vars.font.lineHeight.lg,
        fontWeight: vars.font.weight.semibold,
      },
    },
    truncate: {
      true: {
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      },
    },
  },
  defaultVariants: {
    size: "h1",
  },
});

export type HeadingVariants = NonNullable<RecipeVariants<typeof heading>>;
