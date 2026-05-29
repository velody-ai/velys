import { forwardRef, type HTMLAttributes, type LabelHTMLAttributes } from "react";
import * as css from "./Label.css";
import { cx } from "../../utils/cx";

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  size?: "sm" | "md" | "lg";
  /** Force the error (red) color — for standalone labels. Inside a <Field>, prefer <Field invalid>. */
  error?: boolean;
  /** Show a red required asterisk after the label text. */
  required?: boolean;
  disabled?: boolean;
}

export const Label = forwardRef<HTMLLabelElement, LabelProps>(function Label(
  { size = "md", error, required, disabled, className, children, ...rest },
  ref,
) {
  return (
    <label ref={ref} className={cx(css.label({ size, error, disabled }), className)} {...rest}>
      {children}
      {required && (
        <span className={css.required} aria-hidden>
          *
        </span>
      )}
    </label>
  );
});

export interface FieldProps extends HTMLAttributes<HTMLDivElement> {
  /** Marks the field invalid — turns the nested Label red. */
  invalid?: boolean;
  disabled?: boolean;
}

/**
 * Wraps a Label with its control (Input/Select/Textarea…). The nested Label turns
 * brand-colored while the control is focused (`:focus-within`) and red when `invalid`.
 */
export const Field = forwardRef<HTMLDivElement, FieldProps>(function Field(
  { invalid, disabled, className, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cx(css.field, className)}
      data-invalid={invalid || undefined}
      data-disabled={disabled || undefined}
      {...rest}
    />
  );
});
