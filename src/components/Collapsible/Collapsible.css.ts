import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { vars } from "../../theme/theme.css";

/**
 * Minimal reset for the trigger — Collapsible triggers are usually custom,
 * so we only normalize the button and keep the focus ring.
 */
export const trigger = style({
  all: "unset",
  boxSizing: "border-box",
  cursor: "pointer",
  fontFamily: vars.font.family.sans,
  selectors: {
    "&:focus-visible": { outline: "none", boxShadow: vars.shadow.focus },
    "&:disabled": { cursor: "not-allowed", color: vars.color.text.disabled },
  },
});

// Height animation via the grid-template-rows 0fr -> 1fr trick (same as Accordion).
export const contentOuter = recipe({
  base: {
    display: "grid",
    transition: `grid-template-rows ${vars.motion.duration.slow} ${vars.motion.easing.standard}`,
  },
  variants: {
    open: {
      true: { gridTemplateRows: "1fr" },
      false: { gridTemplateRows: "0fr" },
    },
  },
});

export const contentInner = style({ overflow: "hidden", minHeight: 0 });
