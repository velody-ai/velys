import {
  createContext,
  forwardRef,
  useContext,
  useState,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from "react";
import * as css from "./Toggle.css";
import { cx } from "../../utils/cx";

type Size = "small" | "medium" | "large";

interface ToggleGroupContextValue {
  values: string[];
  toggleValue: (value: string) => void;
  size: Size;
  disabled: boolean;
}
const ToggleGroupContext = createContext<ToggleGroupContextValue | null>(null);
const useToggleGroup = () => {
  const ctx = useContext(ToggleGroupContext);
  if (!ctx) throw new Error("ToggleGroupItem must be used within <ToggleGroup>");
  return ctx;
};

export interface ToggleProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  /** Controlled pressed state. */
  pressed?: boolean;
  /** Initial pressed state (uncontrolled). Default false. */
  defaultPressed?: boolean;
  /** Called with the next pressed state on every toggle. */
  onPressedChange?: (pressed: boolean) => void;
  /** Height 32/40/48. Default "medium"; inside a ToggleGroup it cascades from the group. */
  size?: Size;
}

/** A two-state button, announced via `aria-pressed`. */
export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(function Toggle(
  { pressed, defaultPressed = false, onPressedChange, size, disabled, className, onClick, ...rest },
  ref,
) {
  const group = useContext(ToggleGroupContext);
  const [internal, setInternal] = useState(defaultPressed);
  const isControlled = pressed !== undefined;
  const isPressed = isControlled ? pressed : internal;

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) return;
    const next = !isPressed;
    if (!isControlled) setInternal(next);
    onPressedChange?.(next);
  };

  return (
    <button
      ref={ref}
      type="button"
      aria-pressed={isPressed}
      disabled={disabled || group?.disabled}
      className={cx(
        css.toggle({ size: size ?? group?.size, inGroup: group ? true : undefined }),
        className,
      )}
      onClick={handleClick}
      {...rest}
    />
  );
});

export interface ToggleGroupProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  /** Selection mode. Default "single". */
  type?: "single" | "multiple";
  /** Controlled pressed value(s). Normalized to an array. */
  value?: string | string[];
  /** Initial pressed value(s) (uncontrolled). */
  defaultValue?: string | string[];
  /** Called with the full array of pressed values. */
  onValueChange?: (value: string[]) => void;
  /** Size applied to every item. Default "medium". */
  size?: Size;
  /** Disables every item. */
  disabled?: boolean;
  /** Single mode: whether the pressed item can be unpressed. Default true. */
  allowEmpty?: boolean;
  children?: ReactNode;
}

const toArray = (v: string | string[] | undefined): string[] =>
  v === undefined ? [] : Array.isArray(v) ? v : [v];

/** A segmented set of Toggles with single or multiple selection. */
export const ToggleGroup = forwardRef<HTMLDivElement, ToggleGroupProps>(function ToggleGroup(
  {
    type = "single",
    value,
    defaultValue,
    onValueChange,
    size = "medium",
    disabled = false,
    allowEmpty = true,
    className,
    children,
    ...rest
  },
  ref,
) {
  const [internal, setInternal] = useState<string[]>(toArray(defaultValue));
  const isControlled = value !== undefined;
  const values = isControlled ? toArray(value) : internal;

  const toggleValue = (itemValue: string) => {
    const isPressed = values.includes(itemValue);
    let next: string[];
    if (type === "multiple") {
      next = isPressed ? values.filter((v) => v !== itemValue) : [...values, itemValue];
    } else if (isPressed) {
      if (!allowEmpty) return; // keep the active item pressed
      next = [];
    } else {
      next = [itemValue];
    }
    if (!isControlled) setInternal(next);
    onValueChange?.(next);
  };

  return (
    <ToggleGroupContext.Provider value={{ values, toggleValue, size, disabled }}>
      <div ref={ref} role="group" className={cx(css.group, className)} {...rest}>
        {children}
      </div>
    </ToggleGroupContext.Provider>
  );
});

export interface ToggleGroupItemProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type" | "value"> {
  /** Identifier reported in the group's value array. */
  value: string;
}

/** A Toggle wired to the enclosing ToggleGroup's selection state. */
export const ToggleGroupItem = forwardRef<HTMLButtonElement, ToggleGroupItemProps>(
  function ToggleGroupItem({ value, ...rest }, ref) {
    const { values, toggleValue } = useToggleGroup();
    return (
      <Toggle
        ref={ref}
        pressed={values.includes(value)}
        onPressedChange={() => toggleValue(value)}
        {...rest}
      />
    );
  },
);
