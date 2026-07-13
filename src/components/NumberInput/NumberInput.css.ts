import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { vars } from "../../theme/theme.css";

/**
 * NumberInput reuses `inputRoot` / `inputControl` from Input.css for the field itself.
 * The styles below cover only the trailing stepper column.
 */

export const stepper = recipe({
  base: {
    display: "flex",
    flexDirection: "column",
    alignSelf: "stretch",
    flexShrink: 0,
    borderLeft: `1px solid ${vars.color.border.default}`,
    borderTopRightRadius: `calc(${vars.radius.md} - 1px)`,
    borderBottomRightRadius: `calc(${vars.radius.md} - 1px)`,
    overflow: "hidden",
  },
  // Cancel the root's trailing paddingInline so the column sits flush with the field edge.
  variants: {
    size: {
      sm: { marginRight: `calc(-1 * ${vars.space.md})` },
      md: { marginRight: `calc(-1 * ${vars.space.md})` },
      lg: { marginRight: `calc(-1 * ${vars.space.lg})` },
    },
  },
  defaultVariants: { size: "md" },
});

export const stepperButton = style({
  all: "unset",
  boxSizing: "border-box",
  flex: 1,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  paddingInline: vars.space.sm,
  cursor: "pointer",
  color: vars.color.icon.default,
  fontSize: "0.8em",
  transition: `background-color ${vars.motion.duration.fast} ${vars.motion.easing.standard}`,
  selectors: {
    "&:hover:not(:disabled)": { backgroundColor: vars.color.bg.hover },
    "&:active:not(:disabled)": { backgroundColor: vars.color.bg.active },
    "&:disabled": { color: vars.color.icon.muted, cursor: "not-allowed" },
  },
});
