import { style, keyframes } from "@vanilla-extract/css";
import { vars } from "../theme/theme.css";

const slideIn = keyframes({
  from: { opacity: 0, transform: "translateY(8px)" },
  to: { opacity: 1, transform: "translateY(0)" },
});

export const viewport = style({
  position: "fixed",
  bottom: vars.space.lg,
  right: vars.space.lg,
  zIndex: 1000,
  display: "flex",
  flexDirection: "column",
  gap: vars.space.sm,
  maxWidth: "calc(100vw - 32px)",
  pointerEvents: "none",
});

export const item = style({
  pointerEvents: "auto",
  animationName: slideIn,
  animationDuration: vars.motion.duration.slow,
  animationTimingFunction: vars.motion.easing.decelerate,
});
