import { style } from "@vanilla-extract/css";
import { recipe, type RecipeVariants } from "@vanilla-extract/recipes";
import { vars } from "../../theme/theme.css";

export const card = recipe({
  base: {
    display: "flex",
    flexDirection: "column",
    gap: vars.space.sm,
    borderRadius: vars.radius.lg,
    backgroundColor: vars.color.bg.default,
    border: "1px solid transparent",
    color: vars.color.text.primary,
    fontFamily: vars.font.family.sans,
  },
  variants: {
    variant: {
      elevated: { boxShadow: vars.shadow.md },
      outlined: { borderColor: vars.color.border.default },
      filled: { backgroundColor: vars.color.bg.subtle },
    },
    padding: {
      sm: { padding: vars.space.md },
      md: { padding: vars.space.lg },
      lg: { padding: vars.space.xl },
    },
  },
  defaultVariants: { variant: "outlined", padding: "md" },
});

export const cardTitle = style({ fontSize: vars.font.size.lg, fontWeight: vars.font.weight.semibold, lineHeight: vars.font.lineHeight.lg, margin: 0 });
export const cardDescription = style({ fontSize: vars.font.size.md, color: vars.color.text.secondary, lineHeight: vars.font.lineHeight.md, margin: 0 });

export type CardVariants = NonNullable<RecipeVariants<typeof card>>;
