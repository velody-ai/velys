import { recipe, type RecipeVariants } from "@vanilla-extract/recipes";
import { style } from "@vanilla-extract/css";
import { vars } from "../../theme/theme.css";

export const text = recipe({
  base: {
    margin: 0,
    fontFamily: vars.font.family.sans,
  },
  variants: {
    size: {
      xs: { fontSize: vars.font.size.xs, lineHeight: vars.font.lineHeight.xs },
      sm: { fontSize: vars.font.size.sm, lineHeight: vars.font.lineHeight.sm },
      md: { fontSize: vars.font.size.md, lineHeight: vars.font.lineHeight.md },
      lg: { fontSize: vars.font.size.lg, lineHeight: vars.font.lineHeight.lg },
      xl: { fontSize: vars.font.size.xl, lineHeight: vars.font.lineHeight.xl },
    },
    weight: {
      regular: { fontWeight: vars.font.weight.regular },
      medium: { fontWeight: vars.font.weight.medium },
      semibold: { fontWeight: vars.font.weight.semibold },
      bold: { fontWeight: vars.font.weight.bold },
    },
    tone: {
      primary: { color: vars.color.text.primary },
      secondary: { color: vars.color.text.secondary },
      tertiary: { color: vars.color.text.tertiary },
      brand: { color: vars.color.brand.text },
      success: { color: vars.color.success.text },
      warning: { color: vars.color.warning.text },
      danger: { color: vars.color.danger.text },
      inherit: { color: "inherit" },
    },
    align: {
      start: { textAlign: "start" },
      center: { textAlign: "center" },
      end: { textAlign: "end" },
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
    size: "md",
    weight: "regular",
    tone: "primary",
  },
});

export const code = style({
  fontFamily: vars.font.family.mono,
  fontSize: "0.9em",
  backgroundColor: vars.color.bg.muted,
  color: vars.color.text.primary,
  border: `1px solid ${vars.color.border.subtle}`,
  borderRadius: vars.radius.sm,
  padding: `1px ${vars.space.xs}`,
});

export const kbd = style({
  fontFamily: vars.font.family.mono,
  fontSize: vars.font.size.xs,
  lineHeight: vars.font.lineHeight.xs,
  display: "inline-flex",
  alignItems: "center",
  minWidth: "20px",
  height: "20px",
  justifyContent: "center",
  padding: `0 ${vars.space.xs}`,
  backgroundColor: vars.color.bg.subtle,
  color: vars.color.text.secondary,
  border: `1px solid ${vars.color.border.default}`,
  borderBottomWidth: "2px",
  borderRadius: vars.radius.sm,
  whiteSpace: "nowrap",
});

export type TextVariants = NonNullable<RecipeVariants<typeof text>>;
