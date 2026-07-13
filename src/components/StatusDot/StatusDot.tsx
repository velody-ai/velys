import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { root, dot, label as labelClass, type StatusDotVariants } from "./StatusDot.css";
import { cx } from "../../utils/cx";

export interface StatusDotProps extends HTMLAttributes<HTMLSpanElement>, StatusDotVariants {
  /** Optional text rendered after the dot. When present it is the accessible text. */
  label?: ReactNode;
}

/**
 * Small colored dot indicating a status, optionally with a text label.
 *
 * The dot itself is always `aria-hidden`. With a `label`, the label is the
 * accessible text; without one, pass `aria-label` on the root so screen
 * readers can announce the status.
 */
export const StatusDot = forwardRef<HTMLSpanElement, StatusDotProps>(function StatusDot(
  { status, size, pulse, label, className, ...rest },
  ref,
) {
  return (
    <span ref={ref} className={cx(root, className)} {...rest}>
      <span className={dot({ status, size, pulse })} aria-hidden />
      {label != null && <span className={labelClass}>{label}</span>}
    </span>
  );
});
