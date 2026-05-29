import { style } from "@vanilla-extract/css";
import { recipe, type RecipeVariants } from "@vanilla-extract/recipes";
import { vars } from "../../theme/theme.css";

export const wrapper = style({ position: "relative", display: "inline-flex" });

export const bubble = recipe({
  base: {
    position: "absolute",
    zIndex: 50,
    backgroundColor: vars.color.bg.inverse,
    color: vars.color.text.inverse,
    fontFamily: vars.font.family.sans,
    fontSize: vars.font.size.sm,
    fontWeight: vars.font.weight.medium,
    lineHeight: vars.font.lineHeight.sm,
    paddingBlock: vars.space.xs,
    paddingInline: vars.space.sm,
    borderRadius: vars.radius.md,
    boxShadow: vars.shadow.tooltip,
    whiteSpace: "nowrap",
    pointerEvents: "none",
  },
  variants: {
    side: {
      top: { bottom: "100%", left: "50%", transform: "translateX(-50%)", marginBottom: vars.space.sm },
      bottom: { top: "100%", left: "50%", transform: "translateX(-50%)", marginTop: vars.space.sm },
      left: { right: "100%", top: "50%", transform: "translateY(-50%)", marginRight: vars.space.sm },
      right: { left: "100%", top: "50%", transform: "translateY(-50%)", marginLeft: vars.space.sm },
    },
  },
  defaultVariants: { side: "top" },
});

export const arrow = recipe({
  base: { position: "absolute", width: "8px", height: "8px", backgroundColor: vars.color.bg.inverse },
  variants: {
    side: {
      top: { bottom: "-3px", left: "50%", transform: "translateX(-50%) rotate(45deg)" },
      bottom: { top: "-3px", left: "50%", transform: "translateX(-50%) rotate(45deg)" },
      left: { right: "-3px", top: "50%", transform: "translateY(-50%) rotate(45deg)" },
      right: { left: "-3px", top: "50%", transform: "translateY(-50%) rotate(45deg)" },
    },
  },
  defaultVariants: { side: "top" },
});

export type BubbleVariants = NonNullable<RecipeVariants<typeof bubble>>;
