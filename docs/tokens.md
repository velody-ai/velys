# Design Tokens (`vars`)

Accessed via `import { vars } from "@velody/velys"`. Values are CSS variable references, and the actual colors are determined by the applied theme class (`lightThemeClass`/`darkThemeClass`). They map 1:1 to Figma Variables (`Color`/`Spacing`/`Radius`).

## Color — `vars.color.*`

Both light and dark mode values are provided (below is light → dark).

### bg (background)
| Token | light | dark | Usage |
|---|---|---|---|
| `bg.canvas` | #ffffff | #18181b | Bottommost page background |
| `bg.default` | #ffffff | #27272a | Card/surface default |
| `bg.subtle` | #fafafa | #3f3f46 | One step lower surface |
| `bg.muted` | #f4f4f5 | #52525b | Filled controls/placeholders |
| `bg.hover` | #fafafa | #3f3f46 | Hover overlay |
| `bg.active` | #f4f4f5 | #52525b | active/selected, switch off track |
| `bg.inverse` | #18181b | #ffffff | High-contrast inverted surface |
| `bg.overlay` | #0000004d | #00000080 | Modal backdrop |
| `bg.disabled` | #fafafa | #3f3f46 | Disabled background |

### text / icon
| Token | light | dark |
|---|---|---|
| `text.primary` | #18181b | #fafafa |
| `text.secondary` | #71717a | #d4d4d8 |
| `text.tertiary` | #a1a1aa | #a1a1aa |
| `text.disabled` | #d4d4d8 | #71717a |
| `text.placeholder` | #d4d4d8 | #71717a |
| `text.onBrand` | #ffffff | #ffffff |
| `text.inverse` | #ffffff | #18181b |
| `icon.default` | #71717a | #d4d4d8 |
| `icon.muted` | #d4d4d8 | #71717a |

### brand / border
| Token | light | dark |
|---|---|---|
| `brand.solid` | #0070f3 | #338eff |
| `brand.solidHover` | #005cc4 | #66aaff |
| `brand.subtle` | #e5f1ff | #001b3a |
| `brand.text` | #0070f3 | #66aaff |
| `brand.border` | #0070f3 | #338eff |
| `border.default` | #e4e4e7 | #52525b |
| `border.strong` | #d4d4d8 | #71717a |
| `border.subtle` | #f4f4f5 | #3f3f46 |
| `border.focus` | #0070f3 | #338eff |

### status — `success` / `warning` / `danger` / `info`
Each group has `solid`, `subtle`, `text`, and `border` keys. `danger` also includes `solidHover`.
E.g. `vars.color.success.solid` (#17c964), `vars.color.danger.text`, `vars.color.warning.subtle`, `vars.color.info.border`.

## Spacing — `vars.space.*`
`none`=0 · `xxs`=2px · `xs`=4px · `sm`=8px · `md`=12px · `lg`=16px · `xl`=24px · `2xl`=32px · `3xl`=48px · `4xl`=64px
> Since the key contains a dot, access it as: `vars.space["2xl"]`.

## Radius — `vars.radius.*`
`none`=0 · `sm`=4px · `md`=6px · `lg`=8px · `xl`=12px · `2xl`=16px · `full`=9999px

## Font — `vars.font.*`
- `family.sans` (Inter stack), `family.mono`
- `size`: `xs`12 · `sm`13 · `md`14 · `lg`16 · `xl`20 · `2xl`24 · `3xl`32 · `display`48 (px)
- `lineHeight`: `xs`16 · `sm`18 · `md`20 · `lg`24 · `xl`28 · `2xl`32 · `3xl`40 · `display`56 (px)
- `weight`: `regular`400 · `medium`500 · `semibold`600 · `bold`700

## Shadow — `vars.shadow.*`
`sm` · `md` · `lg` · `xl` · `menu` · `modal` · `tooltip` · `focus` (focus ring). Separate values for light/dark.
