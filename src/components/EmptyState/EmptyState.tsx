import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import * as css from "./EmptyState.css";
import { cx } from "../../utils/cx";

export interface EmptyStateProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  size?: "sm" | "md" | "lg";
  icon?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  /** Action buttons area */
  actions?: ReactNode;
}

export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(function EmptyState(
  { size = "md", icon, title, description, actions, className, children, ...rest },
  ref,
) {
  return (
    <div ref={ref} className={cx(css.root({ size }), className)} {...rest}>
      {icon && <span className={cx(css.iconBoxBase, css.iconBox[size])}>{icon}</span>}
      {title && <p className={cx(css.titleBase, css.title[size])}>{title}</p>}
      {description && <p className={css.description}>{description}</p>}
      {children}
      {actions && <div className={css.actions}>{actions}</div>}
    </div>
  );
});
