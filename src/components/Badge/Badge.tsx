import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { badge, dot, type BadgeVariants } from "./Badge.css";
import { cx } from "../../utils/cx";

export interface BadgeProps extends Omit<HTMLAttributes<HTMLSpanElement>, "color">, BadgeVariants {
  /** Show a leading status dot */
  withDot?: boolean;
  icon?: ReactNode;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { size, color, variant, withDot, icon, className, children, ...rest },
  ref,
) {
  return (
    <span ref={ref} className={cx(badge({ size, color, variant }), className)} {...rest}>
      {withDot && <span className={dot()} />}
      {icon}
      {children}
    </span>
  );
});
