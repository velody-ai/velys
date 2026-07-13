import { style } from "@vanilla-extract/css";

// RangeSlider reuses the Slider recipes wholesale — same track, range bar,
// and thumb visuals — and only adds stacking rules for the two thumbs.
export { root, track, range, thumb } from "../Slider/Slider.css";

/**
 * Applied to both RangeSlider thumbs: a keyboard-focused thumb stacks above
 * the other one so its focus ring is not covered when they overlap.
 */
export const rangeThumb = style({
  selectors: {
    "&:focus-visible": { zIndex: 1 },
  },
});

/**
 * Applied to the thumb being dragged so it sits above the other one — e.g.
 * when both thumbs overlap at the max end.
 */
export const thumbActive = style({ zIndex: 1 });
