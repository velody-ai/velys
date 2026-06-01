import { createContext } from "react";
import type { ReactNode } from "react";

export type ThemeMode = "light" | "dark";

export interface ThemeContextValue {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);

export type ToastStatus = "info" | "success" | "warning" | "danger" | "neutral";

export type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export interface ToastOptions {
  status?: ToastStatus;
  title?: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  actionLabel?: ReactNode;
  onAction?: () => void;
  /** Auto-dismiss delay in ms. Set to 0 to disable. Defaults to 5000. */
  duration?: number;
  /** Where this toast appears. Overrides the provider's default position. */
  position?: ToastPosition;
}

export interface ToastContextValue {
  /** Show a toast. Returns its id for manual dismissal. */
  toast: (options: ToastOptions) => string;
  dismiss: (id: string) => void;
  clear: () => void;
}

export const ToastContext = createContext<ToastContextValue | null>(null);
