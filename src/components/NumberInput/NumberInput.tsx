import {
  forwardRef,
  useEffect,
  useState,
  type FocusEvent,
  type InputHTMLAttributes,
  type KeyboardEvent,
} from "react";
import { inputRoot, inputControl } from "../Input/Input.css";
import { stepper, stepperButton } from "./NumberInput.css";
import { ChevronUpIcon, ChevronDownIcon } from "../icons";
import { clamp, roundToStep } from "../../utils/number";
import { cx } from "../../utils/cx";

export interface NumberInputProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "size" | "type" | "value" | "defaultValue" | "onChange" | "min" | "max" | "step"
  > {
  /** Controlled value. `null` means empty. */
  value?: number | null;
  /** Initial value when uncontrolled. `null` means empty. */
  defaultValue?: number | null;
  /** Fires with the parsed + clamped number, or `null` when cleared. */
  onValueChange?: (value: number | null) => void;
  min?: number;
  max?: number;
  step?: number;
  size?: "sm" | "md" | "lg";
  /** Error (invalid) state */
  invalid?: boolean;
  /** className applied to the root container */
  rootClassName?: string;
}

const formatValue = (v: number | null | undefined) => (v == null ? "" : String(v));

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(function NumberInput(
  {
    value,
    defaultValue = null,
    onValueChange,
    min = -Infinity,
    max = Infinity,
    step = 1,
    size = "md",
    invalid,
    disabled,
    className,
    rootClassName,
    onKeyDown,
    onBlur,
    onFocus,
    ...rest
  },
  ref,
) {
  const isControlled = value !== undefined;
  const [inner, setInner] = useState<number | null>(defaultValue);
  const current = isControlled ? value : inner;

  /** Free-form text while editing; resynced from `current` whenever the input is not focused. */
  const [draft, setDraft] = useState<string>(() => formatValue(current));
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (!focused) setDraft(formatValue(current));
  }, [current, focused]);

  const normalize = (n: number) => {
    const base = Number.isFinite(min) ? min : 0;
    return clamp(roundToStep(n, base, step), min, max);
  };

  const commitValue = (next: number | null) => {
    setDraft(formatValue(next));
    if (!isControlled) setInner(next);
    if (next !== current) onValueChange?.(next);
  };

  const commitDraft = (text: string) => {
    const trimmed = text.trim();
    if (trimmed === "") {
      commitValue(null);
      return;
    }
    const parsed = Number(trimmed);
    if (Number.isFinite(parsed)) commitValue(normalize(parsed));
    else setDraft(formatValue(current)); // unparseable → revert to last committed value
  };

  const stepBy = (delta: number) => {
    if (disabled) return;
    // Base on the live draft so stepping mid-edit uses what the user sees.
    const trimmed = draft.trim();
    const parsed = trimmed === "" ? null : Number(trimmed);
    const effective = parsed !== null && Number.isFinite(parsed) ? parsed : current;
    const base = effective ?? (Number.isFinite(min) ? min : 0);
    commitValue(normalize(base + delta));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    onKeyDown?.(e);
    if (disabled || e.defaultPrevented) return;
    switch (e.key) {
      case "Enter":
        commitDraft(e.currentTarget.value);
        break;
      case "ArrowUp":
        e.preventDefault();
        stepBy(step);
        break;
      case "ArrowDown":
        e.preventDefault();
        stepBy(-step);
        break;
      case "PageUp":
        e.preventDefault();
        stepBy(step * 10);
        break;
      case "PageDown":
        e.preventDefault();
        stepBy(-step * 10);
        break;
      case "Home":
        if (Number.isFinite(min)) {
          e.preventDefault();
          commitValue(min);
        }
        break;
      case "End":
        if (Number.isFinite(max)) {
          e.preventDefault();
          commitValue(max);
        }
        break;
    }
  };

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    setFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    setFocused(false);
    commitDraft(e.currentTarget.value);
    onBlur?.(e);
  };

  const upDisabled = disabled || (current != null && current >= max);
  const downDisabled = disabled || (current != null && current <= min);

  return (
    <div className={cx(inputRoot({ size, invalid, disabled }), rootClassName)}>
      <input
        ref={ref}
        type="text"
        inputMode="decimal"
        role="spinbutton"
        className={cx(inputControl, className)}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
        disabled={disabled}
        aria-invalid={invalid}
        aria-valuemin={Number.isFinite(min) ? min : undefined}
        aria-valuemax={Number.isFinite(max) ? max : undefined}
        aria-valuenow={current ?? undefined}
        {...rest}
      />
      <div className={stepper({ size })} aria-hidden="true">
        <button
          type="button"
          tabIndex={-1}
          className={stepperButton}
          disabled={upDisabled}
          onClick={() => stepBy(step)}
        >
          <ChevronUpIcon />
        </button>
        <button
          type="button"
          tabIndex={-1}
          className={stepperButton}
          disabled={downDisabled}
          onClick={() => stepBy(-step)}
        >
          <ChevronDownIcon />
        </button>
      </div>
    </div>
  );
});
