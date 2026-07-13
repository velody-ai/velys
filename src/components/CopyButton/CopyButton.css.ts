import { style } from "@vanilla-extract/css";
import { recipe, type RecipeVariants } from "@vanilla-extract/recipes";
import { vars } from "../../theme/theme.css";

/**
 * Mirrors IconButton's ghost variant (its recipe is not exported), using the
 * same tokens and sm/md dimensions.
 */
export const copyButton = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: vars.radius.md,
    border: "1px solid transparent",
    backgroundColor: "transparent",
    cursor: "pointer",
    color: vars.color.icon.default,
    transition: "background-color 0.15s, border-color 0.15s, color 0.15s",
    flexShrink: 0,
    selectors: {
      "&:focus-visible": { outline: "none", boxShadow: vars.shadow.focus },
      "&:not(:disabled):hover": { backgroundColor: vars.color.bg.hover },
      "&:disabled": {
        cursor: "not-allowed",
        backgroundColor: "transparent",
        color: vars.color.text.disabled,
      },
    },
  },
  variants: {
    size: {
      sm: { width: "32px", height: "32px", fontSize: "16px" },
      md: { width: "40px", height: "40px", fontSize: "20px" },
    },
  },
  defaultVariants: { size: "md" },
});

/** Success feedback color for the check icon while in the copied state. */
export const checkIcon = style({
  color: vars.color.success.text,
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

export type CopyButtonVariants = NonNullable<RecipeVariants<typeof copyButton>>;
