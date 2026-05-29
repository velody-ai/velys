import { style } from "@vanilla-extract/css";
import { vars } from "../../theme/theme.css";

export const content = style({
  position: "fixed",
  zIndex: 900,
  minWidth: "180px",
  maxWidth: "320px",
  padding: vars.space.md,
  backgroundColor: vars.color.bg.default,
  color: vars.color.text.primary,
  border: `1px solid ${vars.color.border.subtle}`,
  borderRadius: vars.radius.lg,
  boxShadow: vars.shadow.menu,
  fontFamily: vars.font.family.sans,
  fontSize: vars.font.size.md,
  lineHeight: vars.font.lineHeight.md,
  outline: "none",
  opacity: 0,
  transition: `opacity ${vars.motion.duration.base} ${vars.motion.easing.standard}`,
  selectors: {
    '&[data-positioned="true"]': { opacity: 1 },
  },
});
