# Velys Design Spec

This document is the **living spec** for the Velys design system in Figma: tokens and components are created in Figma exactly as specified here, and the component inventory is kept in sync with the shipped code. It also serves as the single source of truth for the vanilla-extract theme/components in code.

- **Color source values**: `design/design-tokens.json` (Geist light/dark 92 colors + shadow/focus + spacing/radius/form/motion metadata). Validated to match the values of Figma's existing `Colors` collection (92 Variables, Light/Dark).
- **Reference**: Vercel Geist. **Preserve existing assets**: the Figma `Colors` palette and Button are used/extended as-is.

---

## Part A — Token Foundations (Variables & Styles)

### A0. Collection structure

| Collection | Modes | Contents | scopes principle |
|---|---|---|---|
| `Colors` *(existing, preserved)* | Light / Dark | 92 primitive scale entries (`gray/100`…`pink/1000`, `gray-alpha/*`, `background/100·200`). Values flip per mode (Geist approach). | primitive → ideally `[]` (hidden). Left non-destructively since it is an existing artifact. |
| `Color` *(new, semantic)* | Value (1 mode) | Purpose-based tokens. All are **alias**es of `Colors` primitives. Since primitives flip per mode, a single mode is sufficient for the semantics. | precise per purpose (`FRAME_FILL`/`TEXT_FILL`/`STROKE_COLOR`…) |
| `Spacing` *(new)* | Value | 4px-based spacing scale | `['GAP','WIDTH_HEIGHT','PADDING']` |
| `Radius` *(new)* | Value | corner radius | `['CORNER_RADIUS']` |

> Reason for keeping semantics as a single mode + primitive aliases: Geist primitives themselves invert between Light/Dark, so toggling a frame to Dark makes the aliases automatically resolve to the dark primitives (figma-ds-patterns §7). Only tokens that need a dark-specific branch are handled as exceptions.

### A1. Semantic Color token map (`Color` collection → `Colors` alias)

**Surface / Background**

> The canonical token names follow the implementation (`bg.*` in `src/theme/theme.css.ts`). In dark, `canvas` (page floor) is **darker** than `default` (surface) — an elevation model where the surface appears to float.

| Semantic (canonical) | Implementation key | Purpose | dark value |
|---|---|---|---|
| `bg/canvas` | `bg.canvas` | page floor background | `#030706` |
| `bg/default` | `bg.default` | base surface — card/panel/input/modal/control fill | `#060e0d` |
| `bg/subtle` | `bg.subtle` | secondary surface one level up | `#0e1614` |
| `bg/muted` | `bg.muted` | more emphasized fill | `#172220` |
| `bg/hover` | `bg.hover` | hover background (including ghost/outline) | `#111c19` |
| `bg/active` | `bg.active` | active/selected background | `#1c2825` |
| `bg/inverse` | `bg.inverse` | inverse surface (secondary solid) | `#ffffff` |
| `bg/overlay` | `bg.overlay` | modal overlay | `#00000080` |
| `bg/disabled` | `bg.disabled` | disabled fill | `#0e1614` |

**Text / Foreground**
| Semantic | alias | Purpose |
|---|---|---|
| `text/primary` | `gray/1000` | body/heading |
| `text/secondary` | `gray/900` | secondary |
| `text/tertiary` | `gray/700` | placeholder/caption |
| `text/disabled` | `gray/500` | disabled |
| `text/on-accent` | `background/100` | text on colored backgrounds (§7 rule) |

**Border**
| Semantic | alias |
|---|---|
| `border/default` | `gray/400` |
| `border/strong` | `gray/600` |
| `border/interactive` | `gray/700` |

**Accent — Primary (Geist-style high-contrast neutral)**
| Semantic | alias |
|---|---|
| `accent/primary/bg` | `gray/1000` |
| `accent/primary/bg-hover` | `gray/900` |
| `accent/primary/fg` | `background/100` |

**Brand / Status** (each hue: `bg`=`/700`, `bg-hover`=`/800`, `fg`=`background/100`, `subtle`=`/100`, `border`=`/400`, `text`=`/900`)
| Group | hue |
|---|---|
| `info` / `accent/blue` | blue |
| `success` | green |
| `warning` | amber |
| `error` / `danger` | red |

**Focus**
| Semantic | alias |
|---|---|
| `focus/ring` | `blue/700` |

### A2. Spacing scale (`Spacing`, 4px base)
`space/0=0`, `space/1=4`, `space/2=8`, `space/3=12`, `space/4=16`, `space/5=20`, `space/6=24`, `space/8=32`, `space/10=40`, `space/12=48`, `space/16=64`.

### A3. Radius scale (`Radius`)
`radius/none=0`, `radius/sm=4`, `radius/md=6`, `radius/lg=8`, `radius/xl=12`, `radius/full=9999`. (Geist default radius 5px → the md tier is used as the control default)

### A4. Typography — Text Styles (Inter)
| Style | size / line-height / weight |
|---|---|
| `heading/h1` | 48 / 56 / Bold |
| `heading/h2` | 32 / 40 / Bold |
| `heading/h3` | 24 / 32 / Semi Bold |
| `heading/h4` | 20 / 28 / Semi Bold |
| `label/lg` | 16 / 24 / Medium |
| `label/md` | 14 / 20 / Medium |
| `label/sm` | 12 / 16 / Medium |
| `body/lg` | 16 / 24 / Regular |
| `body/md` | 14 / 20 / Regular |
| `body/sm` | 12 / 16 / Regular |
| `code/md` | 13 / 20 / Geist Mono (Inter if unavailable) |

### A5. Effect Styles — Shadows (Geist)
| Style | value (light) |
|---|---|
| `shadow/sm` | `0 2px 2px #0000000a` |
| `shadow/md` | Geist `--ds-shadow-medium` |
| `shadow/lg` | Geist `--ds-shadow-large` |
| `shadow/menu` | Geist `--ds-shadow-menu` (Dropdown/Select popup) |
| `shadow/modal` | Geist `--ds-shadow-modal` |
| `shadow/tooltip` | Geist `--ds-shadow-tooltip` |
| `border/default(inset)` | `--ds-shadow-border` (as a replacement for the 1px inset border) |

> Form control heights (Geist form): **sm=32, md=40, lg=48**. Fonts: sm=12, md=14, lg=16.

---

## Part B — Components (46 components)

Common rules
- All fill/stroke/gap/padding/radius are **bound** to the tokens above (no hardcoding).
- State representation: make a variant only for things that are fundamentally visually different. Things like icon presence/position, label, helper text, etc. are separated into **Component Property** (BOOLEAN/TEXT/INSTANCE_SWAP) to avoid variant explosion (the >30 separation rule).
- Each component set has explicit Light/Dark modes applied to expose the Appearance toggle.
- Size tokens: form-type controls use sm/md/lg = 32/40/48 heights.

### B1. Button
- **Variant axes**: `Variant`(Solid·Outline·Ghost·Secondary)×`Size`(sm·md·lg)×`State`(Default·Hover·Active·Disabled·Loading). Tone is a separate `Tone`(Primary·Danger) rather than a property — or Danger is a separate set.
- **Properties**: `label`(TEXT), `leadingIcon`(BOOLEAN+INSTANCE_SWAP), `trailingIcon`(BOOLEAN+INSTANCE_SWAP), `fullWidth`(BOOLEAN).
- **Bindings**: Solid→`accent/primary/bg`+`text/on-accent`, hover→`bg-hover`; Outline→transparent+`border/default`+`text/primary` (hover `bg/hover`); Ghost→transparent+`bg/hover`; Secondary→`bg/inverse`(solid). radius `md`, padding `space/3~4`, gap `space/2`.
- Loading: spinner instance + dimmed label. Disabled: opacity/`text/disabled`+`bg/default`.

### B2. Input (text field)
- **Variant**: `Size`(sm·md·lg)×`State`(Default·Hover·Focus·Disabled·Error). 
- **Properties**: `value`/`placeholder`(TEXT), `label`(TEXT,BOOLEAN), `helper`(TEXT,BOOLEAN), `leadingIcon`/`trailingIcon`(BOOLEAN+SWAP), `prefix`/`suffix`(TEXT,BOOLEAN).
- **Bindings**: `bg/default`, border `border/default`→focus `focus/ring` (+2px ring), text `text/primary`, placeholder `text/tertiary`, error border `error/border`+helper `error/text`. radius `md`, height = form size.

### B3. Textarea
- Same tokens/states as Input. Differences: multiple rows (min-height), a resize handle at the bottom-right, and a fixed-height variant with a `rows`-like feel (sm/md/lg = 3/4/6 row guide).

### B4. Select (trigger + menu)
- **Trigger**: same size/states as Input + a fixed trailing chevron icon.
- **Menu panel**: `bg/default`+`shadow/menu`+radius `lg`, items `MenuItem`(Default·Hover·Selected·Disabled), check icon when selected. Shares item styling with Dropdown Menu (B8).
- **Properties**: `value`(TEXT), `placeholder`, `state`.

### B5. Badge
- **Variant**: `Color`(Gray·Blue·Green·Amber·Red·Purple·Pink)×`Variant`(Subtle·Solid·Outline)×`Size`(sm·md).
- **Properties**: `label`(TEXT), `dot`(BOOLEAN), `icon`(BOOLEAN+SWAP).
- **Bindings**: Subtle→`<hue>/100` bg + `<hue>/900` text; Solid→`<hue>/700` bg + `text/on-accent`; Outline→transparent+`<hue>/400` border. radius `full`.

### B6. Avatar
- **Variant**: `Size`(xs·sm·md·lg·xl = 20·24·32·40·48)×`Type`(Image·Initials·Icon)×`Shape`(Circle·Square).
- **Properties**: `image`(INSTANCE_SWAP/fill), `initials`(TEXT), `status`(BOOLEAN online dot), `ring`(BOOLEAN).
- **Bindings**: Initials bg `bg/default`+`text/secondary`, status dot `success/bg`, radius Circle=`full`/Square=`md`.

### B7. Card
- **Variant**: `Variant`(Elevated·Outlined·Filled)×`Padding`(sm·md·lg).
- **Slots (Properties)**: `header`(BOOLEAN), `media`(BOOLEAN), `footer`(BOOLEAN), title/desc(TEXT).
- **Bindings**: `bg/default`, Outlined→`border/default`, Elevated→`shadow/md`, radius `lg`, padding `space/4~6`.

### B8. Dropdown Menu
- **Menu panel**: `bg/default`+`shadow/menu`+radius `lg`, padding `space/1`.
- **MenuItem variant**: `State`(Default·Hover·Disabled)×`Type`(Default·Danger). Properties: `label`(TEXT), `leadingIcon`(BOOLEAN+SWAP), `trailingHint`(TEXT shortcut), `selected`(BOOLEAN check).
- Sub-elements: `Separator`, `SectionLabel`. Danger item `error/text`.

### B9. Modal (Dialog)
- **Variant**: `Size`(sm·md·lg = 400·512·640 width).
- **Structure**: Overlay (`gray-alpha` backdrop) + Panel (`bg/default`, `shadow/modal`, radius `xl`) + Header (title + close IconButton) + Body (slot) + Footer (actions).
- **Properties**: `title`(TEXT), `showClose`(BOOLEAN), `showFooter`(BOOLEAN).

### B10. Toast
- **Variant**: `Status`(Info·Success·Warning·Error·Neutral)×`State`(Default·WithAction).
- **Properties**: `title`(TEXT), `description`(TEXT,BOOLEAN), `icon`(BOOLEAN+SWAP), `action`(TEXT,BOOLEAN), `close`(BOOLEAN).
- **Bindings**: `bg/default`+`shadow/lg`+radius `lg`, per-status leading icon color = `<status>/bg`, optional 4px status bar on the left.

### B11. Tabs
- **Variant**: `Variant`(Underline·Pill)×`State`(per-tab: Default·Hover·Active·Disabled)×`Size`(sm·md).
- **Composition**: `TabList` + `Tab`(item) + active indicator. Properties: `label`(TEXT), `icon`(BOOLEAN+SWAP), `badge`(BOOLEAN).
- **Bindings**: active text `text/primary`+indicator `accent/primary/bg`(underline) or Pill bg `bg/active`; inactive `text/tertiary`.

### B12. Empty State
- **Variant**: `Size`(sm·md·lg).
- **Properties**: `icon/illustration`(BOOLEAN+SWAP), `title`(TEXT), `description`(TEXT,BOOLEAN), `primaryAction`(BOOLEAN), `secondaryAction`(BOOLEAN).
- **Bindings**: icon `text/tertiary`, title `text/primary`, desc `text/secondary`, center-aligned, gap `space/4`.

### B13. Checkbox
- **Variant**: `State`(Unchecked·Checked·Indeterminate)×`Interaction`(Default·Hover·Focus·Disabled)×`Size`(sm·md).
- **Properties**: `label`(TEXT,BOOLEAN), `description`(TEXT,BOOLEAN).
- **Bindings**: box border `border/strong`, checked bg `accent/primary/bg`+check `accent/primary/fg`, focus ring `focus/ring`, radius `sm`.

### B14. Radio
- Same state matrix as Checkbox, circular. **Variant**: `State`(Unselected·Selected)×`Interaction`×`Size`. inner dot `accent/primary/fg` on `accent/primary/bg`. radius `full`. `RadioGroup` container guide.

### B15. Switch
- **Variant**: `State`(Off·On)×`Interaction`(Default·Hover·Focus·Disabled)×`Size`(sm·md).
- **Properties**: `label`(TEXT,BOOLEAN).
- **Bindings**: track Off `bg/active`/On `accent/primary/bg`, thumb `bg/default`+`shadow/sm`, radius `full`, smooth thumb movement (transition in code).

### B16. Tooltip
- **Variant**: `Side`(Top·Bottom·Left·Right) — arrow position.
- **Properties**: `content`(TEXT).
- **Bindings**: bg `accent/primary/bg`(high contrast) + `text/on-accent` or `bg/default`+`border/default`+`shadow/tooltip`; radius `md`, padding `space/1~2`, arrow 6px.

### B17. Alert (inline banner)
- **Variant**: `Status`(Info·Success·Warning·Error·Neutral)×`Variant`(Subtle·Solid·Outline).
- **Properties**: `title`(TEXT), `description`(TEXT,BOOLEAN), `icon`(BOOLEAN+SWAP), `action`(BOOLEAN), `close`(BOOLEAN).
- **Bindings**: Subtle→`<status>/100` bg + `<status>/400` border + `<status>/900` text; leading status icon; radius `md`, padding `space/3~4`.

### B18. Icon Button
- **Variant**: `Variant`(Solid·Outline·Ghost)×`Size`(sm·md·lg = 32·40·48 square)×`State`(Default·Hover·Active·Disabled).
- **Properties**: `icon`(INSTANCE_SWAP), `aria-label`(TEXT, for documentation).
- **Bindings**: same tokens as Button, square + radius `md` (or `full` round variant), icon `text/primary`/Solid uses `accent/primary/fg`.

### B19. Label (+ Field)
- **Variant**: `Size`(sm·md·lg)×`State`(Default·Focus·Error·Disabled). Used with Input/Select/Textarea, wrapped together in a `Field`.
- **Properties**: `text`(TEXT), `required`(BOOLEAN — red asterisk).
- **Bindings**: Default `text/secondary`, Focus `brand/text`, Error `danger/text`, Disabled `text/disabled`. Weight medium, size = paired control's label size. The `Field` wrapper drives the color automatically — brand on `:focus-within`, red when invalid.

### B20. Text (+ Code / Kbd)
- **Variant axes**: `Size`(xs·sm·md·lg·xl)×`Weight`(Regular·Medium·Semibold·Bold)×`Tone`(Primary·Secondary·Tertiary·Brand·Success·Warning·Danger·Inherit).
- **Properties**: `as`(element, default `p`), `align`(start·center·end), `truncate`(BOOLEAN single-line ellipsis).
- **Bindings**: tones→`text/primary·secondary·tertiary`, `brand/text`, `success/text`, `warning/text`, `danger/text`; size/weight map 1:1 onto the `font/size`+`font/lineHeight`+`font/weight` scales. Sub-components: `Code` (`font/family/mono`, `bg/muted`+`border/subtle`, radius `sm`) and `Kbd` (mono at `font/size/xs`, 20px chip, `bg/subtle`+`border/default`, radius `sm`).

### B21. Heading
- **Variant axes**: `Size`(display·h1·h2·h3·h4) — decoupled from `level`(1–4), the semantic element.
- **Properties**: `level`(1–4, default 1; `size` defaults to match), `truncate`(BOOLEAN).
- **Bindings**: `text/primary`; display=`font/size/display`/Bold (tighter −0.02em tracking), h1=`3xl`/Bold, h2=`2xl`/Semibold, h3=`xl`/Semibold, h4=`lg`/Semibold.

### B22. Spinner
- **Variant axes**: `Size`(sm·md·lg = 16·20·28)×`Tone`(Brand·Muted·Current).
- **Properties**: `label`(TEXT, visually hidden — default "Loading"). `role="status"`.
- **Bindings**: active arc Brand→`brand/solid`, Muted→`text/tertiary`, Current→`currentColor`; ring track transparent, radius `full`. Indeterminate rotation only (no determinate mode).

### B23. Progress (+ CircularProgress)
- **Variant axes**: `Size`(sm·md = 4·8px track height; circular sm·md·lg = 20·32·48)×`Tone`(Brand·Success·Warning·Danger)×`Mode`(Determinate·Indeterminate — no `value`).
- **Properties**: `value`(number, omit for indeterminate), `max`(default 100), `label`(TEXT, a11y). `role="progressbar"`.
- **Bindings**: track `bg/muted`; fill `brand/solid`/`success/solid`/`warning/solid`/`danger/solid`; radius `full`; indeterminate sweep `motion/duration/slow`+`motion/easing/standard`.

### B24. Skeleton
- **Variant axes**: `Variant`(Text·Rectangular·Circular).
- **Properties**: `width`/`height`(number|string), `lines`(number — text variant renders multiple lines, last one shortened). `aria-hidden` by default.
- **Bindings**: fill `bg/muted` with a pulse animation (`motion/easing/standard`); radius Text=`sm`, Rectangular=`md`, Circular=`full`; multi-line gap `space/xs`.

### B25. Popover
- **Variant axes**: `Side`(Top·Bottom·Left·Right)×`Align`(Start·Center·End).
- **Composition**: `Popover`(state root, controlled/uncontrolled `open`) + `PopoverTrigger`(clones `aria-haspopup`/`aria-expanded` onto a single focusable child) + `PopoverContent`(portaled panel, `offset` default 8px; Escape/outside click close).
- **Bindings**: panel `bg/default`+`border/subtle`+`shadow/menu`+radius `lg`, padding `space/md`, enter transition `motion/duration/base`+`motion/easing/standard`.

### B26. Drawer
- **Variant axes**: `Side`(Left·Right·Top·Bottom)×`Size`(sm·md·lg = 320·420·560 width for left/right, 200·320·480 height for top/bottom).
- **Structure**: Overlay (`bg/overlay`) + Panel (`bg/default`, `shadow/modal`) + Header (title + close IconButton) + Body (slot) + Footer (slot). Portal-based, controlled (`open`/`onClose`).
- **Properties**: `title`(TEXT — sets `aria-labelledby`), `showClose`(BOOLEAN, default true), `footer`(slot), `closeOnOverlay`(BOOLEAN, default true).
- **Bindings**: header/footer hairline `border/subtle`, slide animation `motion/duration/slow`+`motion/easing/emphasized`, header padding `space/lg`.

### B27. Accordion
- **Variant axes**: `Variant`(Bordered·Separated)×`Type`(Single·Multiple)×per-item `State`(Closed·Open·Disabled).
- **Composition**: `Accordion`(root; `collapsible` default true, `headingLevel` default 3) + `AccordionItem`(`value`) + `AccordionTrigger` + `AccordionContent` (grid-rows height animation).
- **Bindings**: item border `border/default`, radius `lg` (Bordered wraps the set, Separated per item); trigger `text/primary`/hover `bg/hover`/disabled `text/disabled`, chevron `icon/default`; content `text/secondary`; transition `motion/duration/slow`+`motion/easing/standard`; padding `space/md~lg`.

### B28. Separator
- **Variant axes**: `Orientation`(Horizontal·Vertical)×`Spacing`(none·sm·md·lg — surrounding margin via `space/sm·md·lg`).
- **Properties**: `decorative`(BOOLEAN, default true — false exposes `role="separator"`).
- **Bindings**: 1px line `border/default`.

### B29. Breadcrumb
- **Composition**: `Breadcrumb`(`<nav aria-label="Breadcrumb">`) + `BreadcrumbList`(`<ol>`) + `BreadcrumbItem` + `BreadcrumbLink`(`<a>`) + `BreadcrumbPage`(`aria-current="page"`) + `BreadcrumbSeparator`(default chevron, swappable via children).
- **Bindings**: links `text/secondary`→hover `text/primary` (`motion/duration/base`); current page `text/primary` weight medium; separators `icon/muted`; gap `space/xs`; link focus ring `shadow/focus`+radius `sm`.

### B30. Pagination
- **Variant axes**: `Size`(sm·md = 28·36 controls)×per-page `State`(Default·Hover·Current·Disabled).
- **Properties**: `page`/`count`(number, required), `onPageChange`, `siblingCount`/`boundaryCount`(default 1 — truncated ranges with ellipsis), `showPrevNext`(BOOLEAN, default true). `nav` landmark; `getPaginationRange` exported for custom rendering.
- **Bindings**: current page `bg/inverse`+`text/inverse`; others `text/primary`/hover `bg/hover`; ellipsis `text/tertiary`; disabled `text/disabled`; radius `sm`, gap `space/xs`, focus `shadow/focus`.

### B31. Slider
- **Variant axes**: `Size`(sm·md = 4·6px track, 14·18px thumb)×`State`(Default·Focus·Disabled).
- **Properties**: `value`/`defaultValue`, `min`/`max`/`step`, `onChange`/`onChangeEnd`, `aria-label`. Keyboard: arrows ±step, PageUp/Down ±10×step, Home/End. `role="slider"`.
- **Bindings**: track `bg/muted`, filled range `brand/solid`, thumb `bg/default`+`brand/solid` border+`shadow/sm`, radius `full`, focus `shadow/focus`.

### B32. Table
- **Variant axes**: `Size`(sm·md — cell padding/typography)×per-row `State`(Default·Hover [interactive]·Striped).
- **Composition**: `Table`(horizontally scrollable wrapper) + `TableHeader`/`TableBody`/`TableFooter` + `TableRow`(`interactive`/`striped` BOOLEANs) + `TableHead`(`<th scope="col">`) + `TableCell` + `TableCaption`.
- **Bindings**: header `text/secondary` semibold at `font/size/sm` + hairline `border/default`; row dividers `border/subtle`; interactive hover `bg/hover` (`motion/duration/fast`); striped rows `bg/subtle`; cell padding `space/sm~md`.

### B33. Link
- **Variant axes**: `Tone`(Brand·Neutral·Inherit)×`Underline`(Hover·Always·None)×`External`(BOOLEAN).
- **Properties**: anchor attrs (`href`, …); `external` sets `target="_blank" rel="noopener noreferrer"` + trailing icon + SR-only "(opens in new tab)".
- **Bindings**: Brand `brand/text`→hover `brand/solidHover`; Neutral `text/secondary`→hover `text/primary`; Inherit `currentColor`; icon gap `space/xxs`, focus ring `shadow/focus`+radius `sm`, color transition `motion/duration/base`.

### B34. Stack
- **Variant axes**: `Direction`(Row·Column)×`Gap`(none·xxs·xs·sm·md·lg·xl·2xl·3xl·4xl)×`Align`(start·center·end·stretch·baseline)×`Justify`(start·center·end·between·around)×`Wrap`(BOOLEAN).
- **Bindings**: flex layout primitive — `gap` binds 1:1 to the `space/*` scale; no color/typography of its own (pure layout, `<div>`).

### B35. StatusDot
- **Variant axes**: `Status`(Neutral·Brand·Success·Warning·Danger·Info)×`Size`(sm·md = 6·8px dot)×`Pulse`(BOOLEAN halo animation — off under `prefers-reduced-motion`).
- **Properties**: `label`(TEXT, optional — becomes the accessible text; otherwise `aria-label` on the root). Dot itself is `aria-hidden`.
- **Bindings**: dot Neutral→`text/tertiary`, Brand→`brand/solid`, others `<status>/solid`; label `text/secondary` at `font/size/sm`; radius `full`, gap `space/sm`; pulse `motion/duration/slower`+`motion/easing/decelerate`.

### B36. Tag
- **Variant axes**: `Color`(Neutral·Brand·Success·Warning·Danger·Info)×`Variant`(Subtle·Outline)×`Size`(sm·md = 24·28 height)×`State`(Default·Disabled).
- **Properties**: `icon`(leading slot), `onDismiss`(renders a trailing close button), `dismissLabel`(TEXT, default "Remove"). Root is a non-interactive `<span>`; only the close button is focusable.
- **Bindings**: Subtle→`<hue>/subtle` bg + `<hue>/text`; Outline→transparent + `<hue>/border` + `<hue>/text`; disabled `text/disabled`; radius `full`, padding `space/xs~sm`, close-button focus `shadow/focus`.

### B37. Toggle (+ ToggleGroup / ToggleGroupItem)
- **Variant axes**: `Pressed`(Off·On)×`Size`(small·medium·large = 32·40·48, mirrors Button)×`State`(Default·Hover·Focus·Disabled)×`Context`(Standalone·Grouped).
- **Properties**: `pressed`/`defaultPressed`/`onPressedChange` (`aria-pressed`); group: `type`(single·multiple), `value`/`onValueChange`(always `string[]`), `allowEmpty`(BOOLEAN, default true), `size`/`disabled` cascade; item: `value`(required).
- **Bindings**: standalone = ghost-button look, radius `sm`; pressed `bg/active`+`border/default`+`text/primary`; hover `bg/hover`; disabled `bg/disabled`+`text/disabled`. Group container owns the 1px `border/default` + radius `md` (overflow hidden); items become square segments with 1px dividers. Focus `shadow/focus`.

### B38. CopyButton
- **Variant axes**: `Size`(sm·md = 32·40 square, matches IconButton)×`State`(Idle·Copied·Disabled).
- **Properties**: `value`(TEXT, required — written to the clipboard), `timeout`(default 2000ms), `onCopied`, `aria-label`(default "Copy"; "Copied" while active + SR live-region announcement).
- **Bindings**: idle icon `icon/default`, hover `bg/hover`; copied check `success/text`; disabled `text/disabled`; radius `md`, focus `shadow/focus`.

### B39. Snippet
- **Variant axes**: `Size`(sm·md — `font/size/xs·sm` with sm/md padding)×`Prompt`(BOOLEAN, default true)×`Copyable`(BOOLEAN, default true).
- **Properties**: `text`(TEXT | TEXT[] — one line each, copied joined with `\n`), `onCopied`. Lines render in `<pre><code>`.
- **Bindings**: container `bg/subtle`+`border/default`+radius `lg`; text `text/primary` in `font/family/mono`; `$ ` prompt marker via CSS `::before` in `text/tertiary` (never selected/copied); composes CopyButton(sm) at the trailing edge; padding `space/sm~md`.

### B40. Collapsible
- **Variant axes**: `State`(Open·Closed — exposed as `data-state` on root/trigger/content)×`Disabled`(BOOLEAN).
- **Composition**: `Collapsible`(root; controlled/uncontrolled `open`) + `CollapsibleTrigger`(APG disclosure: button + `aria-expanded` + `aria-controls`) + `CollapsibleContent`(grid-rows height animation, stays mounted while closed).
- **Bindings**: trigger intentionally unstyled (button reset + `shadow/focus` ring) — consumers style via `data-state`; disabled `text/disabled`; transition `motion/duration/slow`+`motion/easing/standard`.

### B41. NumberInput
- **Variant axes**: `Size`(sm·md·lg = 32·40·48, same as Input)×`State`(Default·Hover·Focus·Disabled·Invalid).
- **Properties**: `value`/`defaultValue`(number | null), `onValueChange`, `min`/`max`/`step`(commit snaps to the step grid), `invalid`(BOOLEAN), trailing stepper button pair (pointer-only: `tabIndex={-1}`+`aria-hidden`, each disabled at its bound). `role="spinbutton"`, `inputMode="decimal"`; arrows ±step, PageUp/Down ±10×step, Home/End to finite bounds.
- **Bindings**: composes Input's field styles (identical size/focus/invalid/disabled tokens); steppers `icon/default`/`icon/muted`, hover `bg/hover`, active `bg/active`, divider `border/default`, radius `md`.

### B42. RangeSlider
- **Variant axes**: `Size`(sm·md)×`State`(Default·Focus·Disabled) — reuses Slider's track/range/thumb styles verbatim (same token bindings as B31).
- **Properties**: `value`/`defaultValue`(`[lower, upper]`, default `[min, max]`), `min`/`max`/`step`, `onChange`/`onChangeEnd`, `minDistance`(default 0 — enforced gap, reflected in each thumb's `aria-valuemin/max`), `thumbLabels`(default `["Minimum", "Maximum"]`). Two `role="slider"` thumbs; track press grabs the nearest thumb; values kept ordered.

### B43. Combobox
- **Variant axes**: field `Size`(sm·md·lg = 32·40·48)×`State`(Default·Focus·Disabled·Invalid); option `State`(Default·Highlighted·Selected·Disabled).
- **Composition**: `Combobox`(state root: `value`, `inputValue`, `open` — all controllable; `filter` = case-insensitive `includes`, replaceable or `null` for external filtering) + `ComboboxInput`(`role="combobox"` + trailing chevron toggle) + `ComboboxList`(portaled `role="listbox"`, matches field width) + `ComboboxItem`(`value`, `textValue`; check when selected) + `ComboboxEmpty`. ARIA 1.2 single-select; Escape/Tab/outside click revert the input text.
- **Bindings**: shares Select's tokens — field `bg/default`+`border/default`→focus `border/focus`+`shadow/focus`, invalid `danger/border`, placeholder `text/placeholder`, disabled `bg/disabled`; panel `bg/default`+`border/subtle`+`shadow/menu`+radius `lg`; option hover/highlight `bg/hover`, check `brand/text`, empty row `text/tertiary`.

### B44. CommandMenu
- **Variant axes**: item `State`(Default·Active·Disabled); dialog is single-size (modal, max height `min(400px, 50vh)` list).
- **Composition**: `CommandMenu`(dialog root: controlled `open`, optional global `shortcut` e.g. `"mod+k"`, `filter` substring default or `null`, controlled `search`, `closeOnSelect`) + `CommandInput`(leading search icon, autofocused, owns keyboard nav — arrows wrap, Enter selects, Escape closes) + `CommandList`(`role="listbox"`) + `CommandGroup`(`heading`, auto-hides when emptied) + `CommandItem`(`onSelect`, `leadingIcon`, `hint` slot for Kbd) + `CommandEmpty` + `CommandSeparator`(hidden while searching). Focus trap + body scroll lock.
- **Bindings**: overlay `bg/overlay`; panel `bg/default`+`shadow/modal`+radius `xl`; input hairline `border/subtle`; group headings `text/tertiary` at `font/size/xs`; active item `bg/hover`, icons `icon/default·muted`, hints `text/tertiary`, disabled `text/disabled`; enter animation `motion/duration/base`+`motion/easing/decelerate`.

### B45. Calendar
- **Variant axes**: day-cell `State`(Default·Hover·Selected·Today·Outside·Disabled)×`Bordered`(BOOLEAN, default true — popup hosts pass false).
- **Properties**: `value`/`defaultValue`(Date | null), `onValueChange`, `month`/`defaultMonth`/`onMonthChange`, `min`/`max`(inclusive whole-day), `isDateDisabled`, `weekStartsOn`(0–6, default 0), `locale`(BCP 47, Intl-driven captions/labels), `showOutsideDays`(default true), `autoFocus`. `role="grid"` month table with roving tabindex; arrows/Home/End/PageUp-Down/Shift+PageUp-Down keyboard nav; header prev/next + `aria-live` caption.
- **Bindings**: standalone chrome `bg/default`+`border/default`+radius `lg`; weekday headers `text/tertiary` at `font/size/xs`; day hover `bg/hover`, selected `brand/solid`+`brand/onSolid` (hover `brand/solidHover`), today `aria-current="date"` + `brand/text` dot, outside/disabled `text/tertiary`/`text/disabled`; cell radius `md`, transitions `motion/duration/fast`, focus `shadow/focus`.

### B46. DatePicker
- **Variant axes**: `Size`(sm·md·lg = 32·40·48)×`State`(Default·Focus·Open·Disabled·Invalid).
- **Structure**: Input-style field (free-text draft committed on Enter/blur — ISO `YYYY-MM-DD` + locale numeric pattern parsing; invalid text reverts) + trailing calendar toggle + portaled `role="dialog"` popup composing Calendar (B45, `bordered=false`). ArrowDown opens and focuses the grid; Escape/selection refocus the input; `name` renders a hidden ISO input for forms.
- **Properties**: `value`/`defaultValue`(Date | null), `onValueChange`, `min`/`max`, `isDateDisabled`, `weekStartsOn`, `locale`(display + parsing + placeholder, e.g. `MM/DD/YYYY`), `invalid`(BOOLEAN), `placeholder`.
- **Bindings**: field mirrors Input/Select — `bg/default`+`border/default`→focus `border/focus`+`shadow/focus`, invalid `danger/border`, placeholder `text/placeholder`, disabled `bg/disabled`, toggle icon `icon/muted`→`icon/default`; popup `bg/default`+`border/subtle`+`shadow/menu`+radius `lg`.

---

## Execution order (when use_figma is connected)
1. Create the `Color`/`Spacing`/`Radius` semantic collections + aliases + scopes + code syntax (`var(--…)`).
2. Text styles (A4), Effect styles (A5).
3. File page skeleton: Cover · Foundations · — · Components · — · Utilities.
4. Foundations documentation (swatches/type samples/spacing bars).
5. Components in atoms→molecules order: Icon Button→Button→Badge→Avatar→Checkbox→Radio→Switch→Input→Textarea→Tooltip→Card→Tabs→Alert→Toast→Empty State→Select→Dropdown Menu→Modal. Later additions (B20–B46) follow the same atoms→molecules flow: typography/primitives (Text, Heading, Stack, Separator, Link, StatusDot, Tag) → feedback (Spinner, Progress, Skeleton) → controls (Toggle, Slider, RangeSlider, NumberInput, CopyButton, Snippet) → disclosure/overlay (Collapsible, Accordion, Popover, Drawer) → navigation/data (Breadcrumb, Pagination, Table) → composites (Combobox, CommandMenu, Calendar, DatePicker).
6. For each component: base→variants (combineAsVariants+grid)→properties→documentation→`get_metadata`+`get_screenshot` validation.

## Stage 2 mapping (vanilla-extract)
- `Colors`(primitive, light/dark) → `createGlobalThemeContract` + light/dark `createTheme`.
- `Color`/`Spacing`/`Radius` semantics → semantic keys of the same contract.
- Each component variant axis → `variants` of `@vanilla-extract/recipes`.
- Storybook: per-component variant/state stories + light/dark toggle (globalTypes).
