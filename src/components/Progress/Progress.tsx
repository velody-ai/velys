import { forwardRef, type HTMLAttributes } from "react";
import * as css from "./Progress.css";
import { cx } from "../../utils/cx";

type Tone = "brand" | "success" | "warning" | "danger";

function clampPct(value: number, max: number) {
  if (max <= 0) return 0;
  return Math.min(100, Math.max(0, (value / max) * 100));
}

export interface ProgressProps extends Omit<HTMLAttributes<HTMLDivElement>, "color"> {
  /** Current value. Omit for an indeterminate bar. */
  value?: number;
  max?: number;
  size?: "sm" | "md";
  tone?: Tone;
  label?: string;
}

/** Linear progress bar. Indeterminate when `value` is omitted. */
export const Progress = forwardRef<HTMLDivElement, ProgressProps>(function Progress(
  { value, max = 100, size, tone, label = "Loading", className, ...rest },
  ref,
) {
  const indeterminate = value === undefined;
  const pct = indeterminate ? 0 : clampPct(value, max);
  return (
    <div
      ref={ref}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={indeterminate ? undefined : value}
      aria-label={label}
      className={cx(css.track({ size }), className)}
      {...rest}
    >
      <div
        className={css.fill({ tone, indeterminate: indeterminate || undefined })}
        style={indeterminate ? undefined : { width: `${pct}%` }}
      />
    </div>
  );
});

export interface CircularProgressProps extends Omit<HTMLAttributes<HTMLDivElement>, "color"> {
  value?: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  tone?: Tone;
  label?: string;
}

const RADIUS = 16;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/** Circular progress indicator. Indeterminate when `value` is omitted. */
export const CircularProgress = forwardRef<HTMLDivElement, CircularProgressProps>(
  function CircularProgress({ value, max = 100, size, tone, label = "Loading", className, ...rest }, ref) {
    const indeterminate = value === undefined;
    const pct = indeterminate ? 25 : clampPct(value, max);
    const offset = CIRCUMFERENCE - (pct / 100) * CIRCUMFERENCE;
    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={indeterminate ? undefined : value}
        aria-label={label}
        className={cx(css.circularWrap({ size, tone, indeterminate: indeterminate || undefined }), className)}
        {...rest}
      >
        <svg viewBox="0 0 40 40" width="100%" height="100%">
          <circle className={css.circularTrack} cx="20" cy="20" r={RADIUS} fill="none" strokeWidth="4" />
          <circle
            className={css.circularIndicator}
            cx="20"
            cy="20"
            r={RADIUS}
            fill="none"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={offset}
            transform="rotate(-90 20 20)"
          />
        </svg>
      </div>
    );
  },
);
