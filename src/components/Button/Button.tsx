import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { button, type ButtonVariants } from "./Button.css";
import { cx } from "../../utils/cx";

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color">,
    ButtonVariants {
  /** Leading icon slot */
  leadingIcon?: ReactNode;
  /** Trailing icon slot */
  trailingIcon?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { size, variant, color, fullWidth, leadingIcon, trailingIcon, className, children, type, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type ?? "button"}
      className={cx(button({ size, variant, color, fullWidth }), className)}
      {...rest}
    >
      {leadingIcon}
      {children}
      {trailingIcon}
    </button>
  );
});
