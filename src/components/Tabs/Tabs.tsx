import {
  createContext,
  forwardRef,
  useContext,
  useState,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import * as css from "./Tabs.css";
import { cx } from "../../utils/cx";

type Variant = "underline" | "pill";
type Size = "sm" | "md";

interface TabsContextValue {
  value: string;
  setValue: (v: string) => void;
  variant: Variant;
  size: Size;
}
const TabsContext = createContext<TabsContextValue | null>(null);
const useTabs = () => {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error("Tabs components must be used within <Tabs>");
  return ctx;
};

export interface TabsProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  variant?: Variant;
  size?: Size;
  children?: ReactNode;
}

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(function Tabs(
  { value, defaultValue, onValueChange, variant = "underline", size = "md", children, ...rest },
  ref,
) {
  const [internal, setInternal] = useState(defaultValue ?? "");
  const current = value ?? internal;
  const setValue = (v: string) => {
    if (value === undefined) setInternal(v);
    onValueChange?.(v);
  };
  return (
    <TabsContext.Provider value={{ value: current, setValue, variant, size }}>
      <div ref={ref} {...rest}>
        {children}
      </div>
    </TabsContext.Provider>
  );
});

export const TabList = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(function TabList(
  { className, ...rest },
  ref,
) {
  const { variant } = useTabs();
  return <div ref={ref} role="tablist" className={cx(css.list({ variant }), className)} {...rest} />;
});

export interface TabProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}
export const Tab = forwardRef<HTMLButtonElement, TabProps>(function Tab(
  { value, className, ...rest },
  ref,
) {
  const { value: current, setValue, variant, size } = useTabs();
  const selected = current === value;
  return (
    <button
      ref={ref}
      type="button"
      role="tab"
      aria-selected={selected}
      className={cx(css.tab({ variant, size, selected }), className)}
      onClick={() => setValue(value)}
      {...rest}
    />
  );
});

export interface TabPanelProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
}
export const TabPanel = forwardRef<HTMLDivElement, TabPanelProps>(function TabPanel(
  { value, className, children, ...rest },
  ref,
) {
  const { value: current } = useTabs();
  if (current !== value) return null;
  return (
    <div ref={ref} role="tabpanel" className={className} {...rest}>
      {children}
    </div>
  );
});
