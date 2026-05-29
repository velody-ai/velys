import { style } from "@vanilla-extract/css";
import { vars } from "../../theme/theme.css";

export const list = style({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: vars.space.xs,
  margin: 0,
  padding: 0,
  listStyle: "none",
  fontFamily: vars.font.family.sans,
  fontSize: vars.font.size.md,
  lineHeight: vars.font.lineHeight.md,
});

export const item = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.xs,
});

export const link = style({
  color: vars.color.text.secondary,
  textDecoration: "none",
  borderRadius: vars.radius.sm,
  transition: `color ${vars.motion.duration.base} ${vars.motion.easing.standard}`,
  selectors: {
    "&:hover": { color: vars.color.text.primary },
    "&:focus-visible": { outline: "none", boxShadow: vars.shadow.focus },
  },
});

export const page = style({
  color: vars.color.text.primary,
  fontWeight: vars.font.weight.medium,
});

export const separator = style({
  display: "inline-flex",
  alignItems: "center",
  color: vars.color.icon.muted,
  fontSize: "14px",
});
