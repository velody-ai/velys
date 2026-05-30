import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { lightThemeClass, darkThemeClass } from "../theme/theme.css";
import { Toast } from "../components/Toast";
import {
  ThemeContext,
  ToastContext,
  type ThemeMode,
  type ToastOptions,
} from "./context";
import * as css from "./toastViewport.css";

interface ActiveToast extends ToastOptions {
  id: string;
}

export interface VelysProviderProps {
  children: ReactNode;
  /** Controlled theme. When set, `setTheme`/`toggleTheme` only emit changes. */
  theme?: ThemeMode;
  /** Initial theme for uncontrolled usage. Defaults to "light". */
  defaultTheme?: ThemeMode;
  onThemeChange?: (theme: ThemeMode) => void;
  /** Apply the theme class to <html> so portalled content is themed. Default true. */
  applyToDocument?: boolean;
}

const themeClassFor = (mode: ThemeMode) => (mode === "dark" ? darkThemeClass : lightThemeClass);

/**
 * Root provider for Velys apps. Owns theme mode (exposed via `useTheme`) and
 * hosts the imperative toast system (exposed via `useToast`).
 */
export function VelysProvider({
  children,
  theme: controlled,
  defaultTheme = "light",
  onThemeChange,
  applyToDocument = true,
}: VelysProviderProps) {
  const [internal, setInternal] = useState<ThemeMode>(defaultTheme);
  const theme = controlled ?? internal;

  const setTheme = useCallback(
    (next: ThemeMode) => {
      if (controlled === undefined) setInternal(next);
      onThemeChange?.(next);
    },
    [controlled, onThemeChange],
  );
  const toggleTheme = useCallback(
    () => setTheme(theme === "dark" ? "light" : "dark"),
    [setTheme, theme],
  );

  // Keep the theme class on <html> so portals (Modal, Drawer, Toast) inherit it.
  useEffect(() => {
    if (!applyToDocument || typeof document === "undefined") return;
    const root = document.documentElement;
    const cls = themeClassFor(theme);
    root.classList.add(cls);
    return () => root.classList.remove(cls);
  }, [theme, applyToDocument]);

  // Toast state ------------------------------------------------------------
  const [toasts, setToasts] = useState<ActiveToast[]>([]);
  const counter = useRef(0);
  const timers = useRef(new Map<string, ReturnType<typeof setTimeout>>());

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    const timer = timers.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timers.current.delete(id);
    }
  }, []);

  const toast = useCallback(
    (options: ToastOptions) => {
      counter.current += 1;
      const id = `toast-${counter.current}`;
      setToasts((prev) => [...prev, { ...options, id }]);
      const duration = options.duration ?? 5000;
      if (duration > 0) {
        timers.current.set(
          id,
          setTimeout(() => dismiss(id), duration),
        );
      }
      return id;
    },
    [dismiss],
  );

  const clear = useCallback(() => {
    timers.current.forEach((t) => clearTimeout(t));
    timers.current.clear();
    setToasts([]);
  }, []);

  useEffect(() => {
    const map = timers.current;
    return () => map.forEach((t) => clearTimeout(t));
  }, []);

  const themeValue = useMemo(
    () => ({ theme, setTheme, toggleTheme }),
    [theme, setTheme, toggleTheme],
  );
  const toastValue = useMemo(() => ({ toast, dismiss, clear }), [toast, dismiss, clear]);

  return (
    <ThemeContext.Provider value={themeValue}>
      <ToastContext.Provider value={toastValue}>
        <div className={themeClassFor(theme)}>{children}</div>
        {typeof document !== "undefined" &&
          createPortal(
            <div className={css.viewport}>
              {toasts.map(({ id, ...rest }) => (
                <div key={id} className={css.item}>
                  <Toast {...rest} onClose={() => dismiss(id)} />
                </div>
              ))}
            </div>,
            document.body,
          )}
      </ToastContext.Provider>
    </ThemeContext.Provider>
  );
}
