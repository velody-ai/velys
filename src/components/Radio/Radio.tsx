import { forwardRef, type InputHTMLAttributes, type ReactNode, type FieldsetHTMLAttributes } from "react";
import * as css from "./Radio.css";
import { cx } from "../../utils/cx";

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  size?: "sm" | "md";
  label?: ReactNode;
  description?: ReactNode;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { size = "md", label, description, className, disabled, ...rest },
  ref,
) {
  return (
    <label className={cx(css.root, className)}>
      <input ref={ref} type="radio" className={css.input} disabled={disabled} {...rest} />
      <span className={cx(css.boxBase, css.boxSize[size])}>
        <span className={cx(css.dotBase, css.dotSize[size])} />
      </span>
      {(label || description) && (
        <span className={css.textBlock}>
          {label && <span className={css.labelText}>{label}</span>}
          {description && <span className={css.descText}>{description}</span>}
        </span>
      )}
    </label>
  );
});

export interface RadioGroupProps extends FieldsetHTMLAttributes<HTMLFieldSetElement> {
  orientation?: "vertical" | "horizontal";
}

export const RadioGroup = forwardRef<HTMLFieldSetElement, RadioGroupProps>(function RadioGroup(
  { orientation = "vertical", className, children, ...rest },
  ref,
) {
  return (
    <fieldset ref={ref} className={cx(css.group({ orientation }), className)} {...rest}>
      {children}
    </fieldset>
  );
});
