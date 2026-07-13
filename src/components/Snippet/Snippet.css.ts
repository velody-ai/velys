import { style } from "@vanilla-extract/css";
import { recipe, type RecipeVariants } from "@vanilla-extract/recipes";
import { vars } from "../../theme/theme.css";

export const snippet = recipe({
  base: {
    display: "flex",
    alignItems: "flex-start",
    gap: vars.space.sm,
    fontFamily: vars.font.family.mono,
    color: vars.color.text.primary,
    backgroundColor: vars.color.bg.subtle,
    border: `1px solid ${vars.color.border.default}`,
    borderRadius: vars.radius.lg,
  },
  variants: {
    size: {
      sm: {
        fontSize: vars.font.size.xs,
        lineHeight: vars.font.lineHeight.xs,
        padding: vars.space.sm,
      },
      md: {
        fontSize: vars.font.size.sm,
        lineHeight: vars.font.lineHeight.sm,
        padding: vars.space.md,
      },
    },
  },
  defaultVariants: { size: "md" },
});

export const pre = style({
  margin: 0,
  flex: 1,
  minWidth: 0,
  overflowX: "auto",
  fontFamily: "inherit",
  fontSize: "inherit",
  lineHeight: "inherit",
});

export const code = style({
  fontFamily: "inherit",
  fontSize: "inherit",
});

export const line = style({
  display: "block",
});

/**
 * Leading "$ " shell prompt marker. Rendered via ::before so it never appears
 * in text selection or clipboard content; user-select none keeps it visually
 * unselectable as well, and pseudo-element text is not exposed as real content.
 */
export const promptLine = style({
  selectors: {
    "&::before": {
      content: '"$ "',
      color: vars.color.text.tertiary,
      userSelect: "none",
    },
  },
});

/**
 * Pins the CopyButton (sm, 32px) at the trailing edge without inflating the
 * snippet height: negative vertical margins center it on the first text line.
 */
export const copyAction = recipe({
  base: {},
  variants: {
    size: {
      // (line-height 16px − button 32px) / 2 = −8px
      sm: { margin: "-8px -4px -8px 0" },
      // (line-height 18px − button 32px) / 2 = −7px
      md: { margin: "-7px -6px -7px 0" },
    },
  },
  defaultVariants: { size: "md" },
});

export type SnippetVariants = NonNullable<RecipeVariants<typeof snippet>>;
