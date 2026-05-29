import { style } from "@vanilla-extract/css";
import { recipe, type RecipeVariants } from "@vanilla-extract/recipes";
import { vars } from "../../theme/theme.css";

export const avatar = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    flexShrink: 0,
    backgroundColor: vars.color.bg.muted,
    color: vars.color.text.secondary,
    fontFamily: vars.font.family.sans,
    fontWeight: vars.font.weight.semibold,
    userSelect: "none",
  },
  variants: {
    size: {
      xs: { width: "20px", height: "20px", fontSize: "8px" },
      sm: { width: "24px", height: "24px", fontSize: "10px" },
      md: { width: "32px", height: "32px", fontSize: "13px" },
      lg: { width: "40px", height: "40px", fontSize: "16px" },
      xl: { width: "48px", height: "48px", fontSize: "18px" },
    },
    shape: {
      circle: { borderRadius: vars.radius.full },
      square: { borderRadius: vars.radius.lg },
    },
  },
  defaultVariants: { size: "md", shape: "circle" },
});

export const image = style({ width: "100%", height: "100%", objectFit: "cover" });
export const glyph = style({ width: "60%", height: "60%", color: vars.color.icon.muted });

export type AvatarVariants = NonNullable<RecipeVariants<typeof avatar>>;
