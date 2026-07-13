import { style } from "@vanilla-extract/css";
import { recipe, type RecipeVariants } from "@vanilla-extract/recipes";
import { vars } from "../../theme/theme.css";

export const root = style({
  position: "relative",
  display: "block",
  width: "100%",
  fontFamily: vars.font.family.sans,
});

/** Field box — identical token bindings to the Select/Input field. */
export const field = recipe({
  base: {
    boxSizing: "border-box",
    display: "flex",
    alignItems: "center",
    gap: vars.space.sm,
    width: "100%",
    backgroundColor: vars.color.bg.default,
    border: `1px solid ${vars.color.border.default}`,
    borderRadius: vars.radius.md,
    color: vars.color.text.primary,
    paddingInline: vars.space.md,
    transition: "border-color 0.15s, box-shadow 0.15s",
    selectors: {
      "&:focus-within": {
        borderColor: vars.color.border.focus,
        boxShadow: vars.shadow.focus,
      },
    },
  },
  variants: {
    size: {
      sm: { height: "32px", fontSize: vars.font.size.xs },
      md: { height: "40px", fontSize: vars.font.size.md },
      lg: { height: "48px", fontSize: vars.font.size.lg },
    },
    open: { true: { borderColor: vars.color.border.focus, boxShadow: vars.shadow.focus } },
    invalid: {
      true: {
        borderColor: vars.color.danger.border,
        selectors: {
          "&:focus-within": {
            borderColor: vars.color.danger.border,
            boxShadow: "0 0 0 3px #e5484d33",
          },
        },
      },
    },
    disabled: {
      true: {
        cursor: "not-allowed",
        backgroundColor: vars.color.bg.disabled,
        borderColor: vars.color.border.subtle,
        color: vars.color.text.tertiary,
      },
    },
  },
  defaultVariants: { size: "md" },
});

export const control = style({
  all: "unset",
  flex: 1,
  minWidth: 0,
  fontFamily: "inherit",
  fontSize: "inherit",
  color: "inherit",
  "::placeholder": { color: vars.color.text.placeholder },
  ":disabled": { cursor: "not-allowed" },
});

/** Trailing calendar toggle button. */
export const toggle = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 0,
  border: "none",
  background: "transparent",
  borderRadius: vars.radius.sm,
  color: vars.color.icon.muted,
  fontSize: "16px",
  cursor: "pointer",
  flexShrink: 0,
  transition: "color 0.15s",
  selectors: {
    "&:hover:not(:disabled)": { color: vars.color.icon.default },
    "&:focus-visible": { outline: "none", boxShadow: vars.shadow.focus },
    "&:disabled": { cursor: "not-allowed", color: vars.color.icon.muted },
  },
});

/** Portaled popup panel hosting the Calendar (which renders borderless inside). */
export const popup = style({
  position: "fixed",
  zIndex: 900,
  backgroundColor: vars.color.bg.default,
  border: `1px solid ${vars.color.border.subtle}`,
  borderRadius: vars.radius.lg,
  boxShadow: vars.shadow.menu,
  opacity: 0,
  transition: `opacity ${vars.motion.duration.base} ${vars.motion.easing.standard}`,
  selectors: {
    '&[data-positioned="true"]': { opacity: 1 },
  },
});

export type FieldVariants = NonNullable<RecipeVariants<typeof field>>;
