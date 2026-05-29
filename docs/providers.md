# Providers & Hooks

`VelysProvider` owns the theme mode and hosts the imperative toast system. Wrap your app once.

```tsx
import { VelysProvider } from "@velody/velys";
import "@velody/velys/styles.css";

<VelysProvider defaultTheme="light">
  <App />
</VelysProvider>;
```

`VelysProvider` applies the active theme class to `<html>` (so portalled content is themed) and renders the toast viewport.

## VelysProvider props
| Prop | Type | Default | Description |
|---|---|---|---|
| `theme` | `"light" \| "dark"` | — | Controlled theme |
| `defaultTheme` | `"light" \| "dark"` | `"light"` | Initial theme (uncontrolled) |
| `onThemeChange` | `(theme) => void` | — | Theme change callback |
| `applyToDocument` | `boolean` | `true` | Apply the theme class to `<html>` |

## Hooks

### `useTheme()` → `{ theme, setTheme, toggleTheme }`
Read and control the current theme mode. Must be used within `VelysProvider`.

### `useToast()` → `{ toast, dismiss, clear }`
Imperatively show toasts. `toast(options)` returns an id.
```tsx
const { toast } = useToast();
toast({ status: "success", title: "Saved", description: "All set.", duration: 5000 });
```
`ToastOptions`: `status?`, `title?`, `description?`, `icon?`, `actionLabel?`, `onAction?`, `duration?` (ms; `0` disables auto-dismiss, default `5000`).

### `useDisclosure(options?)` → `{ open, setOpen, onOpen, onClose, onToggle }`
Headless open/close state for overlays. Supports controlled (`open`/`onOpenChange`) and uncontrolled (`defaultOpen`) usage. No provider needed.

### `useMediaQuery(query)` / `usePrefersDark()`
SSR-safe media-query subscription. `usePrefersDark()` wraps `(prefers-color-scheme: dark)`.
