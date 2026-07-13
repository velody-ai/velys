import {
  forwardRef,
  useCallback,
  useRef,
  useState,
  type HTMLAttributes,
  type KeyboardEvent,
  type PointerEvent,
} from "react";
import * as css from "./RangeSlider.css";
import { cx } from "../../utils/cx";
import { clamp, roundToStep } from "../../utils/number";

export interface RangeSliderProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  /** Controlled `[lower, upper]` pair. */
  value?: [number, number];
  /** Initial `[lower, upper]` pair when uncontrolled. Defaults to `[min, max]`. */
  defaultValue?: [number, number];
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: [number, number]) => void;
  /** Fired when the user finishes interacting (pointer up / key commit). */
  onChangeEnd?: (value: [number, number]) => void;
  /** Minimum gap between the two thumbs, in value units. */
  minDistance?: number;
  disabled?: boolean;
  size?: "sm" | "md";
  /** Accessible labels for the [lower, upper] thumbs. */
  thumbLabels?: [string, string];
}

/** Dual-thumb range slider with keyboard and pointer support. */
export const RangeSlider = forwardRef<HTMLDivElement, RangeSliderProps>(
  function RangeSlider(
    {
      value,
      defaultValue,
      min = 0,
      max = 100,
      step = 1,
      onChange,
      onChangeEnd,
      minDistance = 0,
      disabled,
      size,
      className,
      thumbLabels = ["Minimum", "Maximum"],
      ...rest
    },
    ref,
  ) {
    const [internal, setInternal] = useState<[number, number]>(
      () => defaultValue ?? [min, max],
    );
    const isControlled = value !== undefined;
    const raw = isControlled ? value : internal;
    const upper = clamp(raw[1], min, max);
    const lower = Math.min(clamp(raw[0], min, max), upper - minDistance);
    const current: [number, number] = [lower, upper];
    const trackRef = useRef<HTMLDivElement | null>(null);
    const activeRef = useRef<0 | 1>(0);
    const [activeIndex, setActiveIndex] = useState<0 | 1 | null>(null);
    const lowerPercent = ((lower - min) / (max - min)) * 100;
    const upperPercent = ((upper - min) / (max - min)) * 100;

    const commit = useCallback(
      (index: 0 | 1, next: number, end = false) => {
        const stepped = clamp(roundToStep(next, min, step), min, max);
        const pair: [number, number] =
          index === 0
            ? [clamp(stepped, min, upper - minDistance), upper]
            : [lower, clamp(stepped, lower + minDistance, max)];
        if (!isControlled) setInternal(pair);
        onChange?.(pair);
        if (end) onChangeEnd?.(pair);
      },
      [isControlled, min, max, step, minDistance, lower, upper, onChange, onChangeEnd],
    );

    const valueFromPointer = useCallback(
      (clientX: number): number | null => {
        const rect = trackRef.current?.getBoundingClientRect();
        if (!rect || rect.width === 0) return null;
        const ratio = clamp((clientX - rect.left) / rect.width, 0, 1);
        return min + ratio * (max - min);
      },
      [min, max],
    );

    const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
      if (disabled) return;
      const pointerValue = valueFromPointer(e.clientX);
      if (pointerValue === null) return;
      // Pick the nearest thumb; on a tie, the one that can move toward the pointer.
      const distLower = Math.abs(pointerValue - lower);
      const distUpper = Math.abs(pointerValue - upper);
      const index: 0 | 1 =
        distLower < distUpper
          ? 0
          : distUpper < distLower
            ? 1
            : pointerValue < lower
              ? 0
              : 1;
      activeRef.current = index;
      setActiveIndex(index);
      e.currentTarget.setPointerCapture(e.pointerId);
      commit(index, pointerValue);
    };
    const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
      if (disabled || !e.currentTarget.hasPointerCapture(e.pointerId)) return;
      const pointerValue = valueFromPointer(e.clientX);
      if (pointerValue === null) return;
      commit(activeRef.current, pointerValue);
    };
    const onPointerUp = (e: PointerEvent<HTMLDivElement>) => {
      if (disabled || !e.currentTarget.hasPointerCapture(e.pointerId)) return;
      e.currentTarget.releasePointerCapture(e.pointerId);
      const pointerValue = valueFromPointer(e.clientX);
      if (pointerValue === null) return;
      commit(activeRef.current, pointerValue, true);
    };

    const onThumbKeyDown =
      (index: 0 | 1) => (e: KeyboardEvent<HTMLDivElement>) => {
        if (disabled) return;
        const thumbValue = current[index];
        const lowerBound = index === 0 ? min : lower + minDistance;
        const upperBound = index === 0 ? upper - minDistance : max;
        const big = step * 10;
        let next: number | null = null;
        switch (e.key) {
          case "ArrowRight":
          case "ArrowUp":
            next = thumbValue + step;
            break;
          case "ArrowLeft":
          case "ArrowDown":
            next = thumbValue - step;
            break;
          case "PageUp":
            next = thumbValue + big;
            break;
          case "PageDown":
            next = thumbValue - big;
            break;
          case "Home":
            next = lowerBound;
            break;
          case "End":
            next = upperBound;
            break;
          default:
            return;
        }
        e.preventDefault();
        commit(index, next, true);
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
          <div
            className={css.range}
            style={{
              left: `${lowerPercent}%`,
              width: `${upperPercent - lowerPercent}%`,
            }}
          />
        </div>
        {([0, 1] as const).map((index) => (
          <div
            key={index}
            role="slider"
            tabIndex={disabled ? -1 : 0}
            aria-label={thumbLabels[index]}
            aria-valuemin={index === 0 ? min : lower + minDistance}
            aria-valuemax={index === 0 ? upper - minDistance : max}
            aria-valuenow={current[index]}
            aria-disabled={disabled || undefined}
            aria-orientation="horizontal"
            className={cx(
              css.thumb({ size }),
              css.rangeThumb,
              activeIndex === index && css.thumbActive,
            )}
            style={{ left: `${index === 0 ? lowerPercent : upperPercent}%` }}
            onKeyDown={onThumbKeyDown(index)}
          />
        ))}
      </div>
    );
  },
);
