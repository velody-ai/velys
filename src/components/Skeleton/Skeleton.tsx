import { forwardRef, type CSSProperties, type HTMLAttributes } from "react";
import { skeleton, textGroup, type SkeletonVariants } from "./Skeleton.css";
import { cx } from "../../utils/cx";

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement>, SkeletonVariants {
  width?: number | string;
  height?: number | string;
  /** For `variant="text"`: render multiple lines. Last line is shortened. */
  lines?: number;
}

const toCss = (v?: number | string) => (typeof v === "number" ? `${v}px` : v);

/** Loading placeholder with a pulse animation. */
export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(function Skeleton(
  { variant = "rectangular", width, height, lines, className, style, ...rest },
  ref,
) {
  if (variant === "text" && lines && lines > 1) {
    return (
      <div ref={ref} className={cx(textGroup, className)} aria-hidden {...rest}>
        {Array.from({ length: lines }).map((_, i) => (
          <span
            key={i}
            className={skeleton({ variant: "text" })}
            style={{ width: i === lines - 1 ? "60%" : toCss(width) ?? "100%" }}
          />
        ))}
      </div>
    );
  }

  const mergedStyle: CSSProperties = { width: toCss(width), height: toCss(height), ...style };
  return (
    <div
      ref={ref}
      className={cx(skeleton({ variant }), className)}
      style={mergedStyle}
      aria-hidden
      {...rest}
    />
  );
});
