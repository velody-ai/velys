import { recipe, type RecipeVariants } from "@vanilla-extract/recipes";
import { style } from "@vanilla-extract/css";
import { vars } from "../../theme/theme.css";

export const wrapper = style({
  width: "100%",
  overflowX: "auto",
});

export const table = recipe({
  base: {
    width: "100%",
    borderCollapse: "collapse",
    fontFamily: vars.font.family.sans,
    fontSize: vars.font.size.md,
    color: vars.color.text.primary,
  },
  variants: {
    size: {
      sm: {},
      md: {},
    },
  },
  defaultVariants: { size: "md" },
});

export const caption = style({
  captionSide: "bottom",
  paddingTop: vars.space.sm,
  fontSize: vars.font.size.sm,
  color: vars.color.text.secondary,
  textAlign: "start",
});

export const head = recipe({
  base: {
    textAlign: "start",
    fontWeight: vars.font.weight.semibold,
    color: vars.color.text.secondary,
    borderBottom: `1px solid ${vars.color.border.default}`,
    whiteSpace: "nowrap",
  },
  variants: {
    size: {
      sm: { padding: `${vars.space.xs} ${vars.space.sm}`, fontSize: vars.font.size.sm },
      md: { padding: `${vars.space.sm} ${vars.space.md}` },
    },
  },
  defaultVariants: { size: "md" },
});

export const cell = recipe({
  base: {
    borderBottom: `1px solid ${vars.color.border.subtle}`,
    color: vars.color.text.primary,
    verticalAlign: "middle",
  },
  variants: {
    size: {
      sm: { padding: `${vars.space.xs} ${vars.space.sm}`, fontSize: vars.font.size.sm },
      md: { padding: `${vars.space.sm} ${vars.space.md}` },
    },
  },
  defaultVariants: { size: "md" },
});

export const row = recipe({
  base: {
    transition: `background-color ${vars.motion.duration.fast} ${vars.motion.easing.standard}`,
  },
  variants: {
    interactive: {
      true: {
        cursor: "pointer",
        selectors: { "&:hover": { backgroundColor: vars.color.bg.hover } },
      },
    },
    striped: {
      true: {
        selectors: { "&:nth-child(even)": { backgroundColor: vars.color.bg.subtle } },
      },
    },
  },
});

export type TableVariants = NonNullable<RecipeVariants<typeof table>>;
export type RowVariants = NonNullable<RecipeVariants<typeof row>>;
