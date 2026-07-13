import { recipe, type RecipeVariants } from "@vanilla-extract/recipes";
import { style, keyframes, createVar } from "@vanilla-extract/css";
import { vars } from "../../theme/theme.css";

const statusColor = {
  neutral: vars.color.text.tertiary,
  brand: vars.color.brand.solid,
  success: vars.color.success.solid,
  warning: vars.color.warning.solid,
  danger: vars.color.danger.solid,
  info: vars.color.info.solid,
} as const;

/** Halo color for the pulse ripple — derived per status from the same solid token. */
const halo = createVar();

const pulseRing = keyframes({
  "0%": { boxShadow: `0 0 0 0 ${halo}` },
  "100%": { boxShadow: "0 0 0 6px transparent" },
});

const statusStyle = (color: string) => ({
  backgroundColor: color,
  vars: { [halo]: `color-mix(in srgb, ${color} 45%, transparent)` },
});

export const root = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space.sm,
});

export const dot = recipe({
  base: {
    borderRadius: vars.radius.full,
    flexShrink: 0,
  },
  variants: {
    status: {
      neutral: statusStyle(statusColor.neutral),
      brand: statusStyle(statusColor.brand),
      success: statusStyle(statusColor.success),
      warning: statusStyle(statusColor.warning),
      danger: statusStyle(statusColor.danger),
      info: statusStyle(statusColor.info),
    },
    size: {
      sm: { width: "6px", height: "6px" },
      md: { width: "8px", height: "8px" },
    },
    pulse: {
      true: {
        animationName: pulseRing,
        animationDuration: `calc(${vars.motion.duration.slower} * 4)`,
        animationTimingFunction: vars.motion.easing.decelerate,
        animationIterationCount: "infinite",
        "@media": {
          "(prefers-reduced-motion: reduce)": { animationName: "none" },
        },
      },
      false: {},
    },
  },
  defaultVariants: { status: "neutral", size: "md", pulse: false },
});

export const label = style({
  fontFamily: vars.font.family.sans,
  fontSize: vars.font.size.sm,
  lineHeight: vars.font.lineHeight.sm,
  color: vars.color.text.secondary,
});

export type StatusDotVariants = NonNullable<RecipeVariants<typeof dot>>;
