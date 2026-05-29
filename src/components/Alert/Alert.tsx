import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import * as css from "./Alert.css";
import type { AlertVariants } from "./Alert.css";
import { InfoIcon, SuccessIcon, WarningIcon, ErrorIcon, CloseIcon } from "../icons";
import { cx } from "../../utils/cx";

const statusIcon = {
  info: InfoIcon,
  success: SuccessIcon,
  warning: WarningIcon,
  danger: ErrorIcon,
  neutral: InfoIcon,
} as const;

export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, "title">, AlertVariants {
  title?: ReactNode;
  description?: ReactNode;
  /** Custom icon (defaults to the status icon) */
  icon?: ReactNode;
  /** Action slot */
  action?: ReactNode;
  /** Close handler (shows the X button when provided) */
  onClose?: () => void;
}

export const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  { status = "info", variant, title, description, icon, action, onClose, className, children, ...rest },
  ref,
) {
  const Icon = statusIcon[status ?? "info"];
  return (
    <div ref={ref} role="alert" className={cx(css.alert({ status, variant }), className)} {...rest}>
      <span className={css.icon}>{icon ?? <Icon />}</span>
      <div className={css.content}>
        {title && <div className={css.title}>{title}</div>}
        {description && <div className={css.description}>{description}</div>}
        {children}
        {action}
      </div>
      {onClose && (
        <button type="button" className={css.close} aria-label="Close" onClick={onClose}>
          <CloseIcon />
        </button>
      )}
    </div>
  );
});
