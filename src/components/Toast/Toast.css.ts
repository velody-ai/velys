import { style } from "@vanilla-extract/css";
import { recipe, type RecipeVariants } from "@vanilla-extract/recipes";
import { vars } from "../../theme/theme.css";

export const toast = style({
  display: "flex",
  alignItems: "flex-start",
  gap: vars.space.sm,
  padding: vars.space.md,
  width: "360px",
  maxWidth: "100%",
  backgroundColor: vars.color.bg.default,
  border: `1px solid ${vars.color.border.subtle}`,
  borderRadius: vars.radius.lg,
  boxShadow: vars.shadow.lg,
  fontFamily: vars.font.family.sans,
});

export const iconWrap = recipe({
  base: { flexShrink: 0, fontSize: "18px", marginTop: "1px", display: "inline-flex" },
  variants: {
    status: {
      info: { color: vars.color.info.solid },
      success: { color: vars.color.success.solid },
      warning: { color: vars.color.warning.solid },
      danger: { color: vars.color.danger.solid },
      neutral: { color: vars.color.icon.default },
    },
  },
  defaultVariants: { status: "info" },
});

export const content = style({ display: "flex", flexDirection: "column", gap: "2px", flex: 1, minWidth: 0 });
export const title = style({ fontWeight: vars.font.weight.semibold, fontSize: vars.font.size.md, lineHeight: vars.font.lineHeight.md, color: vars.color.text.primary });
export const description = style({ fontSize: vars.font.size.sm, lineHeight: vars.font.lineHeight.sm, color: vars.color.text.secondary });
export const action = style({
  all: "unset",
  marginTop: vars.space.xs,
  cursor: "pointer",
  fontSize: vars.font.size.sm,
  fontWeight: vars.font.weight.semibold,
  color: vars.color.brand.text,
  width: "fit-content",
  selectors: { "&:focus-visible": { boxShadow: vars.shadow.focus, borderRadius: vars.radius.sm } },
});
export const close = style({
  all: "unset",
  cursor: "pointer",
  flexShrink: 0,
  display: "inline-flex",
  width: "20px",
  height: "20px",
  alignItems: "center",
  justifyContent: "center",
  color: vars.color.icon.muted,
  borderRadius: vars.radius.sm,
  fontSize: "16px",
  selectors: { "&:hover": { color: vars.color.icon.default }, "&:focus-visible": { boxShadow: vars.shadow.focus } },
});

export type IconWrapVariants = NonNullable<RecipeVariants<typeof iconWrap>>;
