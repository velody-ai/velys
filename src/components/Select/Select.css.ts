import { style } from "@vanilla-extract/css";
import { recipe, type RecipeVariants } from "@vanilla-extract/recipes";
import { vars } from "../../theme/theme.css";

export const root = style({
  position: "relative",
  display: "block",
  width: "100%",
  fontFamily: vars.font.family.sans,
});

/** The visible trigger box. Applied to a <button> (desktop) or a <div> (native/touch). */
export const field = recipe({
  base: {
    all: "unset",
    boxSizing: "border-box",
    display: "flex",
    alignItems: "center",
    gap: vars.space.sm,
    width: "100%",
    cursor: "pointer",
    color: vars.color.text.primary,
    backgroundColor: vars.color.bg.default,
    border: `1px solid ${vars.color.border.default}`,
    borderRadius: vars.radius.md,
    paddingInline: vars.space.md,
    transition: "border-color 0.15s, box-shadow 0.15s",
    selectors: {
      "&:focus-visible": { borderColor: vars.color.border.focus, boxShadow: vars.shadow.focus },
    },
  },
  variants: {
    size: {
      sm: { height: "32px", fontSize: vars.font.size.xs },
      md: { height: "40px", fontSize: vars.font.size.md },
      lg: { height: "48px", fontSize: vars.font.size.lg },
    },
    open: { true: { borderColor: vars.color.border.focus, boxShadow: vars.shadow.focus } },
    invalid: { true: { borderColor: vars.color.danger.border } },
    disabled: {
      true: {
        cursor: "not-allowed",
        backgroundColor: vars.color.bg.disabled,
        borderColor: vars.color.border.subtle,
        color: vars.color.text.disabled,
      },
    },
  },
  defaultVariants: { size: "md" },
});

/** Selected value / placeholder label — centered by the flex row, truncates with ellipsis. */
export const value = style({
  flex: 1,
  minWidth: 0,
  textAlign: "left",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  selectors: {
    "&[data-placeholder='true']": { color: vars.color.text.placeholder },
  },
});

export const chevron = style({
  flexShrink: 0,
  display: "inline-flex",
  fontSize: "16px",
  color: vars.color.icon.muted,
  transition: "transform 0.15s",
  selectors: { "&[data-open='true']": { transform: "rotate(180deg)" } },
});

/** Invisible native <select> overlaying the field on touch devices (OS menu + form semantics). */
export const nativeOverlay = style({
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  margin: 0,
  opacity: 0,
  cursor: "inherit",
  appearance: "none",
  border: "none",
  background: "transparent",
  font: "inherit",
  selectors: { "&:disabled": { cursor: "not-allowed" } },
});

/** Hidden native <select> mirror used in desktop mode for name/value form submission. */
export const hiddenMirror = style({
  position: "absolute",
  width: "1px",
  height: "1px",
  padding: 0,
  margin: "-1px",
  overflow: "hidden",
  clip: "rect(0 0 0 0)",
  whiteSpace: "nowrap",
  border: 0,
});

export const panel = style({
  position: "absolute",
  top: "calc(100% + 4px)",
  left: 0,
  right: 0,
  zIndex: 50,
  display: "flex",
  flexDirection: "column",
  gap: vars.space.xxs,
  maxHeight: "280px",
  overflowY: "auto",
  padding: vars.space.xs,
  backgroundColor: vars.color.bg.default,
  border: `1px solid ${vars.color.border.subtle}`,
  borderRadius: vars.radius.lg,
  boxShadow: vars.shadow.menu,
});

export const option = recipe({
  base: {
    boxSizing: "border-box",
    display: "flex",
    alignItems: "center",
    gap: vars.space.sm,
    width: "100%",
    minHeight: "32px",
    paddingInline: vars.space.sm,
    borderRadius: vars.radius.sm,
    fontSize: vars.font.size.sm,
    color: vars.color.text.primary,
    cursor: "pointer",
    userSelect: "none",
  },
  variants: {
    active: { true: { backgroundColor: vars.color.bg.hover } },
    selected: { true: { fontWeight: vars.font.weight.medium } },
    disabled: { true: { color: vars.color.text.disabled, cursor: "not-allowed" } },
  },
});

export const optionCheck = style({
  marginLeft: "auto",
  flexShrink: 0,
  display: "inline-flex",
  fontSize: "16px",
  color: vars.color.brand.text,
});

export type FieldVariants = NonNullable<RecipeVariants<typeof field>>;
export type OptionVariants = NonNullable<RecipeVariants<typeof option>>;
