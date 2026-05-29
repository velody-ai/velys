import { createElement, forwardRef, type HTMLAttributes } from "react";
import { heading, type HeadingVariants } from "./Heading.css";
import { cx } from "../../utils/cx";

type Level = 1 | 2 | 3 | 4;

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement>, HeadingVariants {
  /** Semantic heading level (h1–h4). Defaults to 1. Visual size comes from `size`. */
  level?: Level;
}

/**
 * Section heading mapping the Figma `heading/*` text styles. `level` controls
 * the semantic element (`h1`–`h4`); `size` controls the visual scale so the two
 * can differ when document structure requires it.
 */
export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(function Heading(
  { level = 1, size, truncate, className, ...rest },
  ref,
) {
  const resolvedSize = size ?? (`h${level}` as NonNullable<HeadingVariants["size"]>);
  return createElement(`h${level}`, {
    ref,
    className: cx(heading({ size: resolvedSize, truncate }), className),
    ...rest,
  });
});
