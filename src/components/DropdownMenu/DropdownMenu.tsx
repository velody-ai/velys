import {
  forwardRef,
  useEffect,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import * as css from "./DropdownMenu.css";
import type { ItemVariants } from "./DropdownMenu.css";
import { cx } from "../../utils/cx";

export interface MenuProps extends HTMLAttributes<HTMLDivElement> {}
export const Menu = forwardRef<HTMLDivElement, MenuProps>(function Menu({ className, ...rest }, ref) {
  return <div ref={ref} role="menu" className={cx(css.menu, className)} {...rest} />;
});

export interface MenuItemProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "disabled">,
    ItemVariants {
  leadingIcon?: ReactNode;
  hint?: ReactNode;
  disabled?: boolean;
}
export const MenuItem = forwardRef<HTMLButtonElement, MenuItemProps>(function MenuItem(
  { tone, disabled, leadingIcon, hint, className, children, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type="button"
      role="menuitem"
      aria-disabled={disabled || undefined}
      disabled={disabled}
      className={cx(css.item({ tone, disabled }), className)}
      {...rest}
    >
      {leadingIcon && <span className={css.itemIcon}>{leadingIcon}</span>}
      {children}
      {hint && <span className={css.itemHint}>{hint}</span>}
    </button>
  );
});

export const MenuSeparator = () => <div role="separator" className={css.separator} />;
export const MenuLabel = ({ children }: { children: ReactNode }) => (
  <div className={css.label}>{children}</div>
);

export interface DropdownMenuProps {
  /** Trigger element (onClick is injected) */
  trigger: ReactNode;
  children: ReactNode;
}
export function DropdownMenu({ trigger, children }: DropdownMenuProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className={css.wrapper}>
      <span onClick={() => setOpen((o) => !o)}>{trigger}</span>
      {open && (
        <div className={css.positioned} onClick={() => setOpen(false)}>
          <Menu>{children}</Menu>
        </div>
      )}
    </div>
  );
}
