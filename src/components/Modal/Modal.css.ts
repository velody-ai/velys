import { style } from "@vanilla-extract/css";
import { recipe, type RecipeVariants } from "@vanilla-extract/recipes";
import { vars } from "../../theme/theme.css";

export const overlay = style({
  position: "fixed",
  inset: 0,
  zIndex: 100,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: vars.space.lg,
  backgroundColor: vars.color.bg.overlay,
});

export const panel = recipe({
  base: {
    display: "flex",
    flexDirection: "column",
    gap: vars.space.lg,
    width: "100%",
    padding: vars.space.xl,
    backgroundColor: vars.color.bg.default,
    border: `1px solid ${vars.color.border.subtle}`,
    borderRadius: vars.radius.xl,
    boxShadow: vars.shadow.modal,
    fontFamily: vars.font.family.sans,
    maxHeight: "calc(100vh - 32px)",
    overflow: "auto",
  },
  variants: {
    size: {
      sm: { maxWidth: "400px" },
      md: { maxWidth: "512px" },
      lg: { maxWidth: "640px" },
    },
  },
  defaultVariants: { size: "md" },
});

export const header = style({ display: "flex", alignItems: "center", gap: vars.space.sm });
export const title = style({ flex: 1, margin: 0, fontSize: vars.font.size.xl, fontWeight: vars.font.weight.semibold, color: vars.color.text.primary });
export const body = style({ fontSize: vars.font.size.md, lineHeight: vars.font.lineHeight.lg, color: vars.color.text.secondary });
export const footer = style({ display: "flex", justifyContent: "flex-end", gap: vars.space.sm });
export const close = style({
  all: "unset",
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "28px",
  height: "28px",
  borderRadius: vars.radius.md,
  color: vars.color.icon.default,
  fontSize: "16px",
  flexShrink: 0,
  selectors: { "&:hover": { backgroundColor: vars.color.bg.hover }, "&:focus-visible": { boxShadow: vars.shadow.focus } },
});

export type PanelVariants = NonNullable<RecipeVariants<typeof panel>>;
