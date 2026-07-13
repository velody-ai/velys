import {
  forwardRef,
  useCallback,
  useRef,
  useState,
  type HTMLAttributes,
  type KeyboardEvent,
  type PointerEvent,
} from "react";
import * as css from "./Slider.css";
import { cx } from "../../utils/cx";
import { clamp, roundToStep } from "../../utils/number";

export interface SliderProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number) => void;
  /** Fired when the user finishes interacting (pointer up / key up). */
  onChangeEnd?: (value: number) => void;
  disabled?: boolean;
  size?: "sm" | "md";
  /** Accessible label for the thumb. */
  "aria-label"?: string;
}

/** Single-value range slider with keyboard and pointer support. */
export const Slider = forwardRef<HTMLDivElement, SliderProps>(function Slider(
  {
    value,
    defaultValue = 0,
    min = 0,
    max = 100,
    step = 1,
    onChange,
    onChangeEnd,
    disabled,
    size,
    className,
    "aria-label": ariaLabel,
    ...rest
  },
  ref,
) {
  const [internal, setInternal] = useState(defaultValue);
  const isControlled = value !== undefined;
  const current = clamp(isControlled ? value : internal, min, max);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const percent = ((current - min) / (max - min)) * 100;

  const commit = useCallback(
    (next: number, end = false) => {
      const clamped = clamp(roundToStep(next, min, step), min, max);
      if (!isControlled) setInternal(clamped);
      onChange?.(clamped);
      if (end) onChangeEnd?.(clamped);
    },
    [isControlled, min, max, step, onChange, onChangeEnd],
  );

  const valueFromPointer = useCallback(
    (clientX: number) => {
      const rect = trackRef.current?.getBoundingClientRect();
      if (!rect) return current;
      const ratio = clamp((clientX - rect.left) / rect.width, 0, 1);
      return min + ratio * (max - min);
    },
    [current, min, max],
  );

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (disabled) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    commit(valueFromPointer(e.clientX));
  };
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (disabled || !e.currentTarget.hasPointerCapture(e.pointerId)) return;
    commit(valueFromPointer(e.clientX));
  };
  const onPointerUp = (e: PointerEvent<HTMLDivElement>) => {
    if (disabled || !e.currentTarget.hasPointerCapture(e.pointerId)) return;
    e.currentTarget.releasePointerCapture(e.pointerId);
    commit(valueFromPointer(e.clientX), true);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;
    const big = step * 10;
    let next: number | null = null;
    switch (e.key) {
      case "ArrowRight":
      case "ArrowUp":
        next = current + step;
        break;
      case "ArrowLeft":
      case "ArrowDown":
        next = current - step;
        break;
      case "PageUp":
        next = current + big;
        break;
      case "PageDown":
        next = current - big;
        break;
      case "Home":
        next = min;
        break;
      case "End":
        next = max;
        break;
      default:
        return;
    }
    e.preventDefault();
    commit(next, true);
  };

  return (
    <div
      ref={ref}
      className={cx(css.root({ size }), className)}
      data-disabled={disabled || undefined}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      {...rest}
    >
      <div ref={trackRef} className={css.track({ size })}>
        <div className={css.range} style={{ width: `${percent}%` }} />
      </div>
      <div
        role="slider"
        tabIndex={disabled ? -1 : 0}
        aria-label={ariaLabel}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={current}
        aria-disabled={disabled || undefined}
        aria-orientation="horizontal"
        className={css.thumb({ size })}
        style={{ left: `${percent}%` }}
        onKeyDown={onKeyDown}
      />
    </div>
  );
});
