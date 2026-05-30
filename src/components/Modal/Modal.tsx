import { useEffect, useId, type ReactNode } from "react";
import { createPortal } from "react-dom";
import * as css from "./Modal.css";
import { CloseIcon } from "../icons";

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  size?: "sm" | "md" | "lg";
  title?: ReactNode;
  /** Show close button (default true) */
  showClose?: boolean;
  /** Footer actions area */
  footer?: ReactNode;
  children?: ReactNode;
  /** Close on overlay click (default true) */
  closeOnOverlay?: boolean;
}

export function Modal({
  open,
  onClose,
  size = "md",
  title,
  showClose = true,
  footer,
  children,
  closeOnOverlay = true,
}: ModalProps) {
  const titleId = useId();
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div className={css.overlay} onClick={closeOnOverlay ? onClose : undefined}>
      <div
        className={css.panel({ size })}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        onClick={(e) => e.stopPropagation()}
      >
        {(title || showClose) && (
          <div className={css.header}>
            {title && (
              <h2 id={titleId} className={css.title}>
                {title}
              </h2>
            )}
            {showClose && (
              <button type="button" className={css.close} aria-label="Close" onClick={onClose}>
                <CloseIcon />
              </button>
            )}
          </div>
        )}
        {children && <div className={css.body}>{children}</div>}
        {footer && <div className={css.footer}>{footer}</div>}
      </div>
    </div>,
    document.body,
  );
}
