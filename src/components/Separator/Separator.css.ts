import { recipe, type RecipeVariants } from "@vanilla-extract/recipes";
import { vars } from "../../theme/theme.css";

export const separator = recipe({
  base: {
    border: "none",
    backgroundColor: vars.color.border.default,
    flexShrink: 0,
  },
  variants: {
    orientation: {
      horizontal: { width: "100%", height: "1px" },
      vertical: { width: "1px", height: "100%", alignSelf: "stretch" },
    },
    spacing: {
      none: {},
      sm: {},
      md: {},
      lg: {},
    },
  },
  compoundVariants: [
    { variants: { orientation: "horizontal", spacing: "sm" }, style: { marginBlock: vars.space.sm } },
    { variants: { orientation: "horizontal", spacing: "md" }, style: { marginBlock: vars.space.md } },
    { variants: { orientation: "horizontal", spacing: "lg" }, style: { marginBlock: vars.space.lg } },
    { variants: { orientation: "vertical", spacing: "sm" }, style: { marginInline: vars.space.sm } },
    { variants: { orientation: "vertical", spacing: "md" }, style: { marginInline: vars.space.md } },
    { variants: { orientation: "vertical", spacing: "lg" }, style: { marginInline: vars.space.lg } },
  ],
  defaultVariants: { orientation: "horizontal", spacing: "none" },
});

export type SeparatorVariants = NonNullable<RecipeVariants<typeof separator>>;
