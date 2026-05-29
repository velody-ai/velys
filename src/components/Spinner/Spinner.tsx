import { forwardRef, type HTMLAttributes } from "react";
import { spinner, srOnly, type SpinnerVariants } from "./Spinner.css";

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement>, SpinnerVariants {
  /** Accessible label announced to screen readers. Defaults to "Loading". */
  label?: string;
}

/** Indeterminate loading indicator. */
export const Spinner = forwardRef<HTMLSpanElement, SpinnerProps>(function Spinner(
  { size, tone, label = "Loading", className, ...rest },
  ref,
) {
  return (
    <span ref={ref} role="status" className={className} {...rest}>
      <span className={spinner({ size, tone })} aria-hidden />
      <span className={srOnly}>{label}</span>
    </span>
  );
});
