import { style, styleVariants } from "@vanilla-extract/css";
import { vars } from "../../theme/theme.css";

export const root = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.sm,
  cursor: "pointer",
  fontFamily: vars.font.family.sans,
  selectors: { "&:has(:disabled)": { cursor: "not-allowed" } },
});

export const input = style({ position: "absolute", opacity: 0, width: "1px", height: "1px", margin: 0 });

export const trackBase = style({
  position: "relative",
  flexShrink: 0,
  borderRadius: vars.radius.full,
  backgroundColor: vars.color.bg.active,
  transition: "background-color 0.15s, box-shadow 0.15s",
  selectors: {
    [`${input}:checked + &`]: { backgroundColor: vars.color.brand.solid },
    [`${input}:focus-visible + &`]: { boxShadow: vars.shadow.focus },
    [`${input}:disabled + &`]: { backgroundColor: vars.color.bg.disabled },
  },
});

export const trackSize = styleVariants({
  sm: { width: "32px", height: "18px" },
  md: { width: "44px", height: "24px" },
});

const thumbCommon = {
  position: "absolute",
  top: "2px",
  left: "2px",
  borderRadius: vars.radius.full,
  backgroundColor: vars.color.bg.default,
  border: `1px solid ${vars.color.border.strong}`,
  boxShadow: vars.shadow.sm,
  transition: "transform 0.18s cubic-bezier(.25,.75,.6,.98)",
} as const;

export const thumbSize = styleVariants({
  sm: {
    ...thumbCommon,
    width: "14px",
    height: "14px",
    selectors: { [`${input}:checked + ${trackBase} &`]: { transform: "translateX(14px)" } },
  },
  md: {
    ...thumbCommon,
    width: "20px",
    height: "20px",
    selectors: { [`${input}:checked + ${trackBase} &`]: { transform: "translateX(20px)" } },
  },
});

export const labelText = style({ fontSize: vars.font.size.md, color: vars.color.text.primary, fontWeight: vars.font.weight.medium });
