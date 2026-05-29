import { style, styleVariants } from "@vanilla-extract/css";
import { vars } from "../../theme/theme.css";

export const root = style({
  display: "inline-flex",
  alignItems: "flex-start",
  gap: vars.space.sm,
  cursor: "pointer",
  fontFamily: vars.font.family.sans,
  selectors: { "&:has(:disabled)": { cursor: "not-allowed" } },
});

export const input = style({ position: "absolute", opacity: 0, width: "1px", height: "1px", margin: 0 });

export const boxBase = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  marginTop: "1px",
  border: `1.5px solid ${vars.color.border.strong}`,
  borderRadius: vars.radius.sm,
  backgroundColor: vars.color.bg.default,
  color: vars.color.text.onBrand,
  transition: "background-color 0.12s, border-color 0.12s, box-shadow 0.12s",
  selectors: {
    [`${input}:checked + &`]: { backgroundColor: vars.color.brand.solid, borderColor: vars.color.brand.solid },
    [`${input}:indeterminate + &`]: { backgroundColor: vars.color.brand.solid, borderColor: vars.color.brand.solid },
    [`${input}:focus-visible + &`]: { boxShadow: vars.shadow.focus, borderColor: vars.color.border.focus },
    [`${input}:disabled + &`]: { backgroundColor: vars.color.bg.disabled, borderColor: vars.color.border.subtle, color: vars.color.text.disabled },
  },
});

export const boxSize = styleVariants({
  sm: { width: "16px", height: "16px", fontSize: "12px" },
  md: { width: "20px", height: "20px", fontSize: "14px" },
});

export const boxInvalid = style({ borderColor: vars.color.danger.border });

export const check = style({
  opacity: 0,
  display: "inline-flex",
  transition: "opacity 0.1s",
  selectors: {
    [`${input}:checked + ${boxBase} &`]: { opacity: 1 },
    [`${input}:indeterminate + ${boxBase} &`]: { opacity: 0 },
  },
});

export const minus = style({
  opacity: 0,
  display: "inline-flex",
  position: "absolute",
  transition: "opacity 0.1s",
  selectors: {
    [`${input}:indeterminate + ${boxBase} &`]: { opacity: 1 },
  },
});

export const textBlock = style({ display: "flex", flexDirection: "column", gap: "2px" });
export const labelText = style({ fontSize: vars.font.size.md, lineHeight: vars.font.lineHeight.lg, color: vars.color.text.primary, fontWeight: vars.font.weight.medium });
export const descText = style({ fontSize: vars.font.size.xs, lineHeight: vars.font.lineHeight.md, color: vars.color.text.secondary });
