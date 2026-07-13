import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { tag, closeButton, type TagVariants } from "./Tag.css";
import { CloseIcon } from "../icons";
import { cx } from "../../utils/cx";

export interface TagProps extends Omit<HTMLAttributes<HTMLSpanElement>, "color">, TagVariants {
  /** Leading icon */
  icon?: ReactNode;
  /** When provided, renders a trailing close button that calls this on click */
  onDismiss?: () => void;
  /** Accessible label for the close button — interpolate the tag name, e.g. `Remove ${name}` */
  dismissLabel?: string;
}

export const Tag = forwardRef<HTMLSpanElement, TagProps>(function Tag(
  {
    size,
    color,
    variant,
    disabled = false,
    icon,
    onDismiss,
    dismissLabel = "Remove",
    className,
    children,
    ...rest
  },
  ref,
) {
  return (
    <span ref={ref} className={cx(tag({ size, color, variant, disabled }), className)} {...rest}>
      {icon}
      {children}
      {onDismiss && (
        <button
          type="button"
          className={closeButton}
          aria-label={dismissLabel}
          disabled={disabled}
          onClick={onDismiss}
        >
          <CloseIcon />
        </button>
      )}
    </span>
  );
});
