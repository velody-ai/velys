import { useEffect, useId, type ReactNode } from "react";
import { createPortal } from "react-dom";
import * as css from "./Drawer.css";
import { CloseIcon } from "../icons";

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  /** Edge the drawer slides in from. Default "right". */
  side?: "left" | "right" | "top" | "bottom";
  size?: "sm" | "md" | "lg";
  title?: ReactNode;
  /** Show the close button (default true). */
  showClose?: boolean;
  footer?: ReactNode;
  children?: ReactNode;
  /** Close on overlay click (default true). */
  closeOnOverlay?: boolean;
}

/** Edge-anchored overlay panel (sheet). */
export function Drawer({
  open,
  onClose,
  side = "right",
  size = "md",
  title,
  showClose = true,
  footer,
  children,
  closeOnOverlay = true,
}: DrawerProps) {
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
        className={css.panel({ side, size })}
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
