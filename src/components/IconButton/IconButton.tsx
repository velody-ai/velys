import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { iconButton, type IconButtonVariants } from "./IconButton.css";
import { cx } from "../../utils/cx";

export interface IconButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color">,
    IconButtonVariants {
  icon: ReactNode;
  /** Accessible label (required) */
  "aria-label": string;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { size, variant, round, icon, className, type, ...rest },
  ref,
) {
  return (
    <button ref={ref} type={type ?? "button"} className={cx(iconButton({ size, variant, round }), className)} {...rest}>
      {icon}
    </button>
  );
});
