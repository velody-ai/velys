import { recipe, type RecipeVariants } from "@vanilla-extract/recipes";
import { style } from "@vanilla-extract/css";
import { vars } from "../../theme/theme.css";

export const root = recipe({
  base: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    width: "100%",
    cursor: "pointer",
    touchAction: "none",
    selectors: {
      '&[data-disabled="true"]': { cursor: "not-allowed", opacity: 0.5 },
    },
  },
  variants: {
    size: {
      sm: { height: "16px" },
      md: { height: "20px" },
    },
  },
  defaultVariants: { size: "md" },
});

export const track = recipe({
  base: {
    position: "relative",
    width: "100%",
    borderRadius: vars.radius.full,
    backgroundColor: vars.color.bg.muted,
  },
  variants: {
    size: {
      sm: { height: "4px" },
      md: { height: "6px" },
    },
  },
  defaultVariants: { size: "md" },
});

export const range = style({
  position: "absolute",
  height: "100%",
  left: 0,
  borderRadius: vars.radius.full,
  backgroundColor: vars.color.brand.solid,
});

export const thumb = recipe({
  base: {
    position: "absolute",
    top: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: vars.radius.full,
    backgroundColor: vars.color.bg.default,
    border: `2px solid ${vars.color.brand.solid}`,
    boxShadow: vars.shadow.sm,
    outline: "none",
    selectors: {
      "&:focus-visible": { boxShadow: vars.shadow.focus },
    },
  },
  variants: {
    size: {
      sm: { width: "14px", height: "14px" },
      md: { width: "18px", height: "18px" },
    },
  },
  defaultVariants: { size: "md" },
});

export type RootVariants = NonNullable<RecipeVariants<typeof root>>;
