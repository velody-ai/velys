import { style, styleVariants } from "@vanilla-extract/css";
import { recipe, type RecipeVariants } from "@vanilla-extract/recipes";
import { vars } from "../../theme/theme.css";

export const root = recipe({
  base: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    fontFamily: vars.font.family.sans,
    padding: vars.space.xl,
  },
  variants: {
    size: {
      sm: { gap: vars.space.sm },
      md: { gap: vars.space.md },
      lg: { gap: vars.space.md },
    },
  },
  defaultVariants: { size: "md" },
});

export const iconBox = styleVariants({
  sm: { width: "40px", height: "40px", fontSize: "20px" },
  md: { width: "56px", height: "56px", fontSize: "28px" },
  lg: { width: "72px", height: "72px", fontSize: "36px" },
});

export const iconBoxBase = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: vars.radius.full,
  backgroundColor: vars.color.bg.muted,
  color: vars.color.icon.muted,
});

export const title = styleVariants({
  sm: { fontSize: vars.font.size.lg },
  md: { fontSize: vars.font.size.xl },
  lg: { fontSize: vars.font.size["2xl"] },
});

export const titleBase = style({ fontWeight: vars.font.weight.semibold, color: vars.color.text.primary, margin: 0 });
export const description = style({ fontSize: vars.font.size.md, color: vars.color.text.secondary, lineHeight: vars.font.lineHeight.md, margin: 0, maxWidth: "42ch" });
export const actions = style({ display: "flex", gap: vars.space.sm, marginTop: vars.space.xs });

export type RootVariants = NonNullable<RecipeVariants<typeof root>>;
