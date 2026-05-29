import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import * as css from "./Switch.css";
import { cx } from "../../utils/cx";

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  size?: "sm" | "md";
  label?: ReactNode;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch(
  { size = "md", label, className, disabled, ...rest },
  ref,
) {
  return (
    <label className={cx(css.root, className)}>
      <input ref={ref} type="checkbox" role="switch" className={css.input} disabled={disabled} {...rest} />
      <span className={cx(css.trackBase, css.trackSize[size])}>
        <span className={css.thumbSize[size]} />
      </span>
      {label && <span className={css.labelText}>{label}</span>}
    </label>
  );
});
