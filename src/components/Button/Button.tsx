import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { button, type ButtonVariants } from "./Button.css";
import { Spinner } from "../Spinner";
import { cx } from "../../utils/cx";

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color">,
    ButtonVariants {
  /** Leading icon slot */
  leadingIcon?: ReactNode;
  /** Trailing icon slot */
  trailingIcon?: ReactNode;
  /** Show a spinner in place of the leading icon and disable interaction. */
  loading?: boolean;
}

const spinnerSize = { mini: "sm", small: "sm", medium: "md", large: "md" } as const;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    size,
    variant,
    color,
    fullWidth,
    leadingIcon,
    trailingIcon,
    loading,
    disabled,
    className,
    children,
    type,
    ...rest
  },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type ?? "button"}
      className={cx(button({ size, variant, color, fullWidth }), className)}
      disabled={disabled ?? loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading ? <Spinner size={spinnerSize[size ?? "medium"]} tone="current" label="" /> : leadingIcon}
      {children}
      {trailingIcon}
    </button>
  );
});
