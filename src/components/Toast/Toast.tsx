import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import * as css from "./Toast.css";
import type { IconWrapVariants } from "./Toast.css";
import { InfoIcon, SuccessIcon, WarningIcon, ErrorIcon, CloseIcon } from "../icons";
import { cx } from "../../utils/cx";

const statusIcon = {
  info: InfoIcon,
  success: SuccessIcon,
  warning: WarningIcon,
  danger: ErrorIcon,
  neutral: InfoIcon,
} as const;

export interface ToastProps extends Omit<HTMLAttributes<HTMLDivElement>, "title">, IconWrapVariants {
  title?: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  /** Action label + handler */
  actionLabel?: ReactNode;
  onAction?: () => void;
  onClose?: () => void;
}

export const Toast = forwardRef<HTMLDivElement, ToastProps>(function Toast(
  { status = "info", title, description, icon, actionLabel, onAction, onClose, className, ...rest },
  ref,
) {
  const Icon = statusIcon[status ?? "info"];
  return (
    <div ref={ref} role="status" className={cx(css.toast, className)} {...rest}>
      <span className={css.iconWrap({ status })}>{icon ?? <Icon />}</span>
      <div className={css.content}>
        {title && <div className={css.title}>{title}</div>}
        {description && <div className={css.description}>{description}</div>}
        {actionLabel && (
          <button type="button" className={css.action} onClick={onAction}>
            {actionLabel}
          </button>
        )}
      </div>
      {onClose && (
        <button type="button" className={css.close} aria-label="Close" onClick={onClose}>
          <CloseIcon />
        </button>
      )}
    </div>
  );
});
