import { style } from "@vanilla-extract/css";
import { recipe, type RecipeVariants } from "@vanilla-extract/recipes";
import { vars } from "../../theme/theme.css";

export const root = style({
  position: "relative",
  display: "block",
  width: "100%",
  fontFamily: vars.font.family.sans,
});

/** The visible field box wrapping the text input + chevron. Token bindings match Select's field. */
export const field = recipe({
  base: {
    boxSizing: "border-box",
    display: "flex",
    alignItems: "center",
    gap: vars.space.sm,
    width: "100%",
    cursor: "text",
    color: vars.color.text.primary,
    backgroundColor: vars.color.bg.default,
    border: `1px solid ${vars.color.border.default}`,
    borderRadius: vars.radius.md,
    paddingInline: vars.space.md,
    transition: "border-color 0.15s, box-shadow 0.15s",
    selectors: {
      "&:focus-within": { borderColor: vars.color.border.focus, boxShadow: vars.shadow.focus },
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
        color: vars.color.text.tertiary,
      },
    },
  },
  defaultVariants: { size: "md" },
});

/** The text input itself — unstyled, fills the field. */
export const input = style({
  all: "unset",
  flex: 1,
  minWidth: 0,
  textAlign: "left",
  fontFamily: "inherit",
  fontSize: "inherit",
  color: "inherit",
  "::placeholder": { color: vars.color.text.placeholder },
  ":disabled": { cursor: "not-allowed" },
});

/** Trailing chevron toggle button (kept out of the tab order, hidden from AT). */
export const chevron = style({
  all: "unset",
  boxSizing: "border-box",
  flexShrink: 0,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "16px",
  color: vars.color.icon.muted,
  cursor: "pointer",
  transition: "transform 0.15s",
  selectors: {
    "&[data-open='true']": { transform: "rotate(180deg)" },
    "&:disabled": { cursor: "not-allowed" },
  },
});

/** Portaled listbox panel. Token bindings match Select's panel; positioning matches Popover. */
export const panel = style({
  position: "fixed",
  zIndex: 900,
  boxSizing: "border-box",
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
  fontFamily: vars.font.family.sans,
  opacity: 0,
  selectors: {
    '&[data-positioned="true"]': { opacity: 1 },
  },
});

/** Option row. Token bindings match Select's option. */
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
    disabled: { true: { color: vars.color.text.tertiary, cursor: "not-allowed" } },
  },
});

export const optionCheck = style({
  marginLeft: "auto",
  flexShrink: 0,
  display: "inline-flex",
  fontSize: "16px",
  color: vars.color.brand.text,
});

/** Empty-state row shown when the filter matches nothing. */
export const empty = style({
  boxSizing: "border-box",
  padding: vars.space.md,
  textAlign: "center",
  fontSize: vars.font.size.sm,
  color: vars.color.text.secondary,
});

export type FieldVariants = NonNullable<RecipeVariants<typeof field>>;
export type OptionVariants = NonNullable<RecipeVariants<typeof option>>;
