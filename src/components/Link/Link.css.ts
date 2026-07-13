import { style } from "@vanilla-extract/css";
import { recipe, type RecipeVariants } from "@vanilla-extract/recipes";
import { vars } from "../../theme/theme.css";

export const link = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    gap: vars.space.xxs,
    borderRadius: vars.radius.sm,
    transition: `color ${vars.motion.duration.base} ${vars.motion.easing.standard}`,
    selectors: {
      "&:focus-visible": { outline: "none", boxShadow: vars.shadow.focus },
    },
  },
  variants: {
    tone: {
      brand: {
        color: vars.color.brand.text,
        selectors: {
          "&:hover": { color: vars.color.brand.solidHover },
        },
      },
      neutral: {
        color: vars.color.text.secondary,
        selectors: {
          "&:hover": { color: vars.color.text.primary },
        },
      },
      inherit: {
        color: "currentColor",
      },
    },
    underline: {
      hover: {
        textDecoration: "none",
        selectors: {
          "&:hover": { textDecoration: "underline" },
          "&:focus-visible": { textDecoration: "underline" },
        },
      },
      always: { textDecoration: "underline" },
      none: { textDecoration: "none" },
    },
  },
  defaultVariants: { tone: "brand", underline: "hover" },
});

export const externalIcon = style({
  fontSize: "0.85em",
  flexShrink: 0,
});

/** No shared visually-hidden utility exists in the repo yet, so keep a local one. */
export const visuallyHidden = style({
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

export type LinkVariants = NonNullable<RecipeVariants<typeof link>>;
