# Design Tokens (`vars`)

Every visual value in Velys is a design token. Tokens are exposed as the `vars` object and mirror the Figma Variables (`Color` / `Spacing` / `Radius`) 1:1.

```tsx
import { vars } from "@velody/velys";
```

`vars.*` values are **CSS variable references** (e.g. `var(--…)`), so the actual value is resolved by the nearest applied theme class. Always reference tokens through the `vars` object — never hardcode hex/px, and never type the raw `--…` variable names yourself.

## Setup recap (required for tokens to resolve)

```tsx
import "@velody/velys/styles.css";          // load the extracted CSS once
import { lightThemeClass, darkThemeClass } from "@velody/velys";

// apply a theme class on an ancestor (prefer <html>/<body> so portals inherit it)
<div className={lightThemeClass}>…</div>
```

Switch `lightThemeClass` ↔ `darkThemeClass` to change mode. The same `vars.*` reference resolves to the light or dark value automatically based on the active class — you write the token once and it works in both modes.

## How to use tokens

```tsx
// 1) Inline style
<div style={{ background: vars.color.bg.subtle, padding: vars.space.md }} />

// 2) vanilla-extract style()
import { style } from "@vanilla-extract/css";
export const card = style({
  background: vars.color.bg.default,
  border: `1px solid ${vars.color.border.default}`,
  borderRadius: vars.radius.lg,
  boxShadow: vars.shadow.md,
  padding: vars.space.lg,
  color: vars.color.text.primary,
});
```

> Keys that start with a digit need bracket access: `vars.space["2xl"]`, `vars.radius["2xl"]`, `vars.font.size["3xl"]`.

---

## Color — `vars.color.*`

Each token lists its **light** and **dark** value.

### bg — `vars.color.bg.*`
The background scale is an elevation ramp. In **dark mode** `canvas` (page floor) is *darker* than `default` (the surface that sits on it), so surfaces appear to float.

| Token | light | dark | Use for |
|---|---|---|---|
| `bg.canvas` | `#ffffff` | `#030706` | Page/app floor (the backmost layer) |
| `bg.default` | `#ffffff` | `#060e0d` | Default surface — cards, panels, inputs, modals, control fills |
| `bg.subtle` | `#fafafa` | `#0e1614` | Secondary surface, one step up |
| `bg.muted` | `#f4f4f5` | `#172220` | More emphasized fill |
| `bg.hover` | `#fafafa` | `#111c19` | Hover background (ghost/outline, menu items) |
| `bg.active` | `#f4f4f5` | `#1c2825` | Active/selected background |
| `bg.inverse` | `#18181b` | `#ffffff` | High-contrast inverted surface (e.g. secondary solid button) |
| `bg.overlay` | `#0000004d` | `#00000080` | Modal/dialog backdrop |
| `bg.disabled` | `#fafafa` | `#0e1614` | Disabled control fill |

### text — `vars.color.text.*`
| Token | light | dark | Use for |
|---|---|---|---|
| `text.primary` | `#18181b` | `#fafafa` | Body and headings |
| `text.secondary` | `#71717a` | `#d4d4d8` | Secondary text |
| `text.tertiary` | `#a1a1aa` | `#a1a1aa` | Captions, hints |
| `text.disabled` | `#d4d4d8` | `#71717a` | Disabled text |
| `text.placeholder` | `#d4d4d8` | `#71717a` | Input placeholder |
| `text.onBrand` | `#ffffff` | `#ffffff` | Text on a brand/solid fill |
| `text.inverse` | `#ffffff` | `#18181b` | Text on `bg.inverse` |

### icon — `vars.color.icon.*`
| Token | light | dark | Use for |
|---|---|---|---|
| `icon.default` | `#71717a` | `#d4d4d8` | Default icon color |
| `icon.muted` | `#d4d4d8` | `#71717a` | De-emphasized icons (e.g. chevrons) |

### brand — `vars.color.brand.*` (teal accent)
| Token | light | dark | Use for |
|---|---|---|---|
| `brand.solid` | `#12a594` | `#12a594` | Primary solid fill |
| `brand.solidHover` | `#0d8c7d` | `#0ac7b4` | Hover for solid fill |
| `brand.subtle` | `#eefcf9` | `#04201b` | Subtle brand background |
| `brand.text` | `#12a594` | `#0ac7b4` | Brand-colored text/links |
| `brand.border` | `#12a594` | `#12a594` | Brand border |

### border — `vars.color.border.*`
| Token | light | dark | Use for |
|---|---|---|---|
| `border.default` | `#e4e4e7` | `#52525b` | Default border |
| `border.strong` | `#d4d4d8` | `#71717a` | Stronger/hover border |
| `border.subtle` | `#f4f4f5` | `#3f3f46` | Subtle divider |
| `border.focus` | `#12a594` | `#12a594` | Focus border (pair with `shadow.focus`) |

### status — `success` / `warning` / `danger` / `info`
Each group exposes `solid`, `subtle`, `text`, `border` (`danger` also has `solidHover`). Use `solid` for fills, `subtle` for tinted backgrounds, `text` for foreground, `border` for outlines.

| Token | light | dark |
|---|---|---|
| `success.solid` | `#17c964` | `#17c964` |
| `success.subtle` | `#e6f9ed` | `#052e16` |
| `success.text` | `#12a150` | `#66db93` |
| `success.border` | `#99e7b7` | `#0e7a3c` |
| `warning.solid` | `#f5a623` | `#f5a623` |
| `warning.subtle` | `#fff6e5` | `#3a2407` |
| `warning.text` | `#c4831c` | `#ffc666` |
| `warning.border` | `#ffd999` | `#956115` |
| `danger.solid` | `#e5484d` | `#fa383e` |
| `danger.solidHover` | `#c4282d` | `#ff666c` |
| `danger.subtle` | `#ffe5e6` | `#3a0b0c` |
| `danger.text` | `#c4282d` | `#ff666c` |
| `danger.border` | `#ff999d` | `#951e22` |
| `info.solid` | `#0070f3` | `#338eff` |
| `info.subtle` | `#e5f1ff` | `#001b3a` |
| `info.text` | `#005cc4` | `#66aaff` |
| `info.border` | `#99c7ff` | `#004695` |

---

## Spacing — `vars.space.*`
4px-based scale; used for padding, gap, margins, and fixed sizes.

| Token | value | | Token | value |
|---|---|---|---|---|
| `none` | `0` | | `lg` | `16px` |
| `xxs` | `2px` | | `xl` | `24px` |
| `xs` | `4px` | | `["2xl"]` | `32px` |
| `sm` | `8px` | | `["3xl"]` | `48px` |
| `md` | `12px` | | `["4xl"]` | `64px` |

## Radius — `vars.radius.*`
| Token | value |
|---|---|
| `none` | `0` |
| `sm` | `4px` |
| `md` | `6px` (control default) |
| `lg` | `8px` |
| `xl` | `12px` |
| `["2xl"]` | `16px` |
| `full` | `9999px` (pills/circles) |

## Font — `vars.font.*`
- `family.sans` — `Inter, -apple-system, …, sans-serif`
- `family.mono` — `"Geist Mono", …, monospace`

| `size` | px | | `lineHeight` | px |
|---|---|---|---|---|
| `xs` | 12 | | `xs` | 16 |
| `sm` | 13 | | `sm` | 18 |
| `md` | 14 | | `md` | 20 |
| `lg` | 16 | | `lg` | 24 |
| `xl` | 20 | | `xl` | 28 |
| `["2xl"]` | 24 | | `["2xl"]` | 32 |
| `["3xl"]` | 32 | | `["3xl"]` | 40 |
| `display` | 48 | | `display` | 56 |

`weight`: `regular` 400 · `medium` 500 · `semibold` 600 · `bold` 700

## Shadow — `vars.shadow.*`
Elevation and effects. Light and dark have separate values.

| Token | Use for |
|---|---|
| `sm` | Subtle lift |
| `md` | Cards (elevated) |
| `lg` | Higher elevation |
| `xl` | Fullscreen/large surfaces |
| `menu` | Dropdown / Select popups |
| `modal` | Modal dialogs |
| `tooltip` | Tooltips |
| `focus` | Focus ring (teal, `0 0 0 3px`) — pair with `border.focus` |

---

## Motion — `vars.motion.*`
Transition timing. Mode-independent (identical in light and dark).

| Token | Value | Use for |
|---|---|---|
| `duration.instant` | `0ms` | No animation |
| `duration.fast` | `100ms` | Hover/press feedback |
| `duration.base` | `150ms` | Default UI transitions |
| `duration.slow` | `250ms` | Overlays, expand/collapse |
| `duration.slower` | `400ms` | Drawer/sheet slides |
| `easing.standard` | `cubic-bezier(0.2, 0, 0, 1)` | Most transitions |
| `easing.emphasized` | `cubic-bezier(0.3, 0, 0, 1)` | Entering large surfaces |
| `easing.decelerate` | `cubic-bezier(0, 0, 0, 1)` | Elements entering the screen |
| `easing.accelerate` | `cubic-bezier(0.3, 0, 1, 1)` | Elements leaving the screen |

```ts
transition: `opacity ${vars.motion.duration.base} ${vars.motion.easing.standard}`
```

---

## Recipes

```tsx
// Focus ring (keyboard focus)
selectors: { "&:focus-visible": { borderColor: vars.color.border.focus, boxShadow: vars.shadow.focus } }

// Primary (brand) button surface
{ background: vars.color.brand.solid, color: vars.color.text.onBrand }
// hover → vars.color.brand.solidHover

// Tinted status banner (e.g. success)
{ background: vars.color.success.subtle, color: vars.color.success.text, border: `1px solid ${vars.color.success.border}` }

// Elevated card
{ background: vars.color.bg.default, borderRadius: vars.radius.lg, boxShadow: vars.shadow.md, padding: vars.space.lg }
```

### Override the brand tokens (re-theming)

The brand accent is teal by default. Token values are vanilla-extract CSS variables with hashed names, so override them through the exported `vars` references with `assignInlineVars` — you never need the generated variable names.

```tsx
// npm i @vanilla-extract/dynamic
import { assignInlineVars } from "@vanilla-extract/dynamic";
import { vars } from "@velody/velys";

// Scope to any subtree — buttons, links, focus rings inside now use purple.
<div
  style={assignInlineVars({
    [vars.color.brand.solid]: "#7c3aed",
    [vars.color.brand.solidHover]: "#6d28d9",
    [vars.color.brand.subtle]: "#f3e8ff",
    [vars.color.brand.text]: "#7c3aed",
    [vars.color.brand.border]: "#7c3aed",
    [vars.color.border.focus]: "#7c3aed",     // focus border uses brand by default
    [vars.shadow.focus]: "0 0 0 3px #7c3aed40", // focus ring too
  })}
>
  {/* …app… */}
</div>
```

- **App-wide:** apply the same `style` on a top-level element (prefer `<html>`/`<body>` so portal content — Modal/Toast/Tooltip — inherits it).
- **Full custom theme:** for a complete palette swap, build your own theme class with `createTheme(vars, { color: {...}, space, radius, font, shadow })` and apply it instead of `lightThemeClass`.
