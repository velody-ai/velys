import { style } from "@vanilla-extract/css";
import { recipe, type RecipeVariants } from "@vanilla-extract/recipes";
import { vars } from "../../theme/theme.css";

export const root = recipe({
  base: {
    boxSizing: "border-box",
    display: "inline-block",
    padding: vars.space.md,
    backgroundColor: vars.color.bg.default,
    borderRadius: vars.radius.lg,
    color: vars.color.text.primary,
    fontFamily: vars.font.family.sans,
  },
  variants: {
    /** Standalone chrome. Overlay hosts (e.g. DatePicker's popup) pass false. */
    bordered: { true: { border: `1px solid ${vars.color.border.default}` } },
  },
  defaultVariants: { bordered: true },
});

export const header = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: vars.space.sm,
  marginBottom: vars.space.sm,
});

export const caption = style({
  flex: 1,
  textAlign: "center",
  fontSize: vars.font.size.sm,
  fontWeight: vars.font.weight.semibold,
  lineHeight: vars.font.lineHeight.sm,
});

/** Prev/next month buttons — IconButton (ghost, sm) visual language. */
export const navButton = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "28px",
  height: "28px",
  padding: 0,
  border: "1px solid transparent",
  borderRadius: vars.radius.md,
  backgroundColor: "transparent",
  color: vars.color.icon.default,
  fontSize: "16px",
  cursor: "pointer",
  flexShrink: 0,
  transition: `background-color ${vars.motion.duration.fast} ${vars.motion.easing.standard}, color ${vars.motion.duration.fast} ${vars.motion.easing.standard}`,
  selectors: {
    "&:hover:not(:disabled)": { backgroundColor: vars.color.bg.hover },
    "&:focus-visible": { outline: "none", boxShadow: vars.shadow.focus },
    "&:disabled": { color: vars.color.text.disabled, cursor: "not-allowed" },
  },
});

export const table = style({
  borderCollapse: "collapse",
  borderSpacing: 0,
});

export const weekday = style({
  boxSizing: "border-box",
  width: "36px",
  height: "32px",
  padding: 0,
  fontSize: vars.font.size.xs,
  fontWeight: vars.font.weight.medium,
  color: vars.color.text.tertiary,
  textAlign: "center",
});

export const cell = style({
  padding: 0,
  textAlign: "center",
});

export const dayButton = recipe({
  base: {
    position: "relative",
    boxSizing: "border-box",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "36px",
    height: "36px",
    padding: 0,
    border: "none",
    borderRadius: vars.radius.md,
    backgroundColor: "transparent",
    color: vars.color.text.primary,
    fontFamily: "inherit",
    fontSize: vars.font.size.sm,
    fontWeight: vars.font.weight.regular,
    cursor: "pointer",
    transition: `background-color ${vars.motion.duration.fast} ${vars.motion.easing.standard}, color ${vars.motion.duration.fast} ${vars.motion.easing.standard}`,
    selectors: {
      "&:hover:not(:disabled)": { backgroundColor: vars.color.bg.hover },
      "&:focus-visible": { outline: "none", boxShadow: vars.shadow.focus },
    },
  },
  variants: {
    selected: {
      true: {
        backgroundColor: vars.color.brand.solid,
        color: vars.color.brand.onSolid,
        fontWeight: vars.font.weight.medium,
        selectors: {
          "&:hover:not(:disabled)": { backgroundColor: vars.color.brand.solidHover },
        },
      },
    },
    /** Dot marker in brand text under the day number. */
    today: {
      true: {
        "::after": {
          content: '""',
          position: "absolute",
          bottom: "4px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "4px",
          height: "4px",
          borderRadius: vars.radius.full,
          backgroundColor: vars.color.brand.text,
        },
      },
    },
    outside: { true: { color: vars.color.text.tertiary } },
    disabled: {
      true: {
        color: vars.color.text.disabled,
        cursor: "not-allowed",
      },
    },
  },
  compoundVariants: [
    {
      variants: { selected: true, today: true },
      style: { "::after": { backgroundColor: vars.color.brand.onSolid } },
    },
    {
      variants: { selected: true, outside: true },
      style: { color: vars.color.brand.onSolid },
    },
  ],
});

export type DayButtonVariants = NonNullable<RecipeVariants<typeof dayButton>>;
