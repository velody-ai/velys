import { forwardRef, useEffect, useRef, type InputHTMLAttributes, type ReactNode } from "react";
import * as css from "./Checkbox.css";
import { CheckIcon, MinusIcon } from "../icons";
import { cx } from "../../utils/cx";

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  size?: "sm" | "md";
  invalid?: boolean;
  indeterminate?: boolean;
  label?: ReactNode;
  description?: ReactNode;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { size = "md", invalid, indeterminate = false, label, description, className, disabled, ...rest },
  ref,
) {
  const innerRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (innerRef.current) innerRef.current.indeterminate = indeterminate;
  }, [indeterminate]);

  const setRefs = (node: HTMLInputElement | null) => {
    innerRef.current = node;
    if (typeof ref === "function") ref(node);
    else if (ref) (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;
  };

  return (
    <label className={cx(css.root, className)}>
      <input ref={setRefs} type="checkbox" className={css.input} disabled={disabled} aria-invalid={invalid} {...rest} />
      <span className={cx(css.boxBase, css.boxSize[size], invalid && css.boxInvalid)}>
        <span className={css.check}><CheckIcon /></span>
        <span className={css.minus}><MinusIcon /></span>
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
