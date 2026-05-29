import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { inputRoot, inputControl, inputAffix } from "./Input.css";
import { cx } from "../../utils/cx";

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: "sm" | "md" | "lg";
  /** Error (invalid) state */
  invalid?: boolean;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  /** className applied to the root container */
  rootClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { size = "md", invalid, leadingIcon, trailingIcon, disabled, className, rootClassName, ...rest },
  ref,
) {
  return (
    <div className={cx(inputRoot({ size, invalid, disabled }), rootClassName)}>
      {leadingIcon && <span className={inputAffix}>{leadingIcon}</span>}
      <input ref={ref} className={cx(inputControl, className)} disabled={disabled} aria-invalid={invalid} {...rest} />
      {trailingIcon && <span className={inputAffix}>{trailingIcon}</span>}
    </div>
  );
});
