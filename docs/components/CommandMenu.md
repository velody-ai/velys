# CommandMenu

cmdk-style command palette rendered as a modal dialog. Opens via a controlled prop, `defaultOpen`, or a global keyboard `shortcut`; filters items as you type; supports full keyboard navigation (arrow keys with wrap, Enter to select, Escape to close). Body scroll is locked and focus is trapped while open; focus returns to the previously focused element on close.

```tsx
import {
  CommandMenu,
  CommandInput,
  CommandList,
  CommandGroup,
  CommandItem,
  CommandEmpty,
  CommandSeparator,
} from "@velody/velys";
```

## CommandMenu Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `open` | `boolean` | — | Controlled open state |
| `defaultOpen` | `boolean` | `false` | Initial open state (uncontrolled) |
| `onOpenChange` | `(open: boolean) => void` | — | Open state change callback |
| `shortcut` | `string` | — | Global shortcut that toggles the menu, e.g. `"mod+k"`. Tokens: `mod`/`ctrl`/`meta`/`alt`/`shift` + a single key, `+`-separated. `mod` = ⌘ on macOS-like platforms, Ctrl elsewhere. Off by default |
| `label` | `string` | `"Command menu"` | Dialog `aria-label` |
| `filter` | `((textValue: string, search: string) => boolean) \| null` | substring | Item filter (case-insensitive substring by default). Pass `null` to disable filtering (e.g. server-side filtering via controlled `search`) |
| `search` | `string` | — | Controlled search value |
| `defaultSearch` | `string` | `""` | Initial search value (uncontrolled) |
| `onSearchChange` | `(value: string) => void` | — | Search change callback |
| `closeOnSelect` | `boolean` | `true` | Close the menu after an item is selected |
| `children` | `ReactNode` | — | `CommandInput`, `CommandList`, … |

## CommandInput Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `placeholder` | `string` | `"Type a command or search…"` | Placeholder (also the accessible name) |
| ...rest | `InputHTMLAttributes` (minus `value`/`defaultValue`/`onChange`) | — | Forwarded to the `<input>` |

Renders a leading search icon and owns the keyboard interactions: ArrowDown/ArrowUp move the active item (wrapping across groups, skipping disabled items), Enter runs the active item's `onSelect`, Escape closes. It is autofocused when the menu opens.

## CommandList Props

| Prop | Type | Description |
|---|---|---|
| ...rest | `HTMLAttributes<HTMLDivElement>` | Scrollable `role="listbox"` container (max height `min(400px, 50vh)`) |

## CommandGroup Props

| Prop | Type | Description |
|---|---|---|
| `heading` | `ReactNode` | Group heading (wired via `aria-labelledby`) |
| ...rest | `HTMLAttributes<HTMLDivElement>` | — |

A group auto-hides while every item inside it is filtered out.

## CommandItem Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `string` | `textValue` | Value passed to `onSelect` |
| `textValue` | `string` | string children | Plain-text label used for filtering |
| `onSelect` | `(value: string) => void` | — | Called on Enter or click |
| `disabled` | `boolean` | — | Skipped by keyboard navigation, not selectable |
| `leadingIcon` | `ReactNode` | — | Left icon slot |
| `hint` | `ReactNode` | — | Right-aligned hint slot (pairs with `Kbd`) |
| ...rest | `HTMLAttributes<HTMLDivElement>` (minus `onSelect`) | — | — |

Items are `role="option"`; the active (highlighted) item is exposed with `aria-selected` and mirrored on the input via `aria-activedescendant` (cmdk convention).

- `CommandEmpty` — rendered only when the search is non-empty and matches zero items (children = empty message).
- `CommandSeparator` — hairline between sections; hidden while the search is non-empty (cmdk convention).

## Example

```tsx
function Palette() {
  const [open, setOpen] = useState(false);
  return (
    <CommandMenu open={open} onOpenChange={setOpen} shortcut="mod+k">
      <CommandInput />
      <CommandList>
        <CommandGroup heading="Navigation">
          <CommandItem
            leadingIcon={<SearchIcon />}
            hint={<><Kbd>⌘</Kbd><Kbd>H</Kbd></>}
            onSelect={() => router.push("/")}
          >
            Go to Home
          </CommandItem>
          <CommandItem onSelect={() => router.push("/settings")}>Go to Settings</CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Actions">
          <CommandItem onSelect={copyLink}>Copy link</CommandItem>
        </CommandGroup>
        <CommandEmpty>No results found.</CommandEmpty>
      </CommandList>
    </CommandMenu>
  );
}
```
