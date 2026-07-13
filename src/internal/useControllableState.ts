import { useCallback, useState } from "react";

export interface UseControllableStateOptions<T> {
  /** Controlled value. When not `undefined`, the hook does not own the state. */
  value?: T;
  /** Initial value for uncontrolled usage. */
  defaultValue: T;
  onChange?: (next: T) => void;
}

/**
 * Generic controlled/uncontrolled state, following the `useDisclosure`
 * pattern: `value !== undefined` means controlled, and `onChange` is always
 * called regardless of mode.
 */
export function useControllableState<T>({
  value,
  defaultValue,
  onChange,
}: UseControllableStateOptions<T>): [T, (next: T) => void] {
  const [internal, setInternal] = useState<T>(defaultValue);
  const isControlled = value !== undefined;
  const current = isControlled ? (value as T) : internal;

  const setValue = useCallback(
    (next: T) => {
      if (!isControlled) setInternal(next);
      onChange?.(next);
    },
    [isControlled, onChange],
  );

  return [current, setValue];
}
