import { useContext } from "react";
import { ToastContext, type ToastContextValue } from "../provider/context";

/**
 * Imperatively show toasts from anywhere in the tree. Must be used within a
 * `<VelysProvider>`, which renders the toast viewport.
 */
export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within <VelysProvider>");
  return ctx;
}
