# Velys Design Spec (Stage 1 — Figma Planning Execution Plan)

This document is the **execution spec** for Stage 1 of MISSION.md. Once `use_figma` is connected, tokens and components are created in Figma exactly as specified here. At the same time, it serves as the single source of truth for the Stage 2 vanilla-extract theme/components.

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

## Part B — Components (17 types)

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

---

## Execution order (when use_figma is connected)
1. Create the `Color`/`Spacing`/`Radius` semantic collections + aliases + scopes + code syntax (`var(--…)`).
2. Text styles (A4), Effect styles (A5).
3. File page skeleton: Cover · Foundations · — · Components · — · Utilities.
4. Foundations documentation (swatches/type samples/spacing bars).
5. Components in atoms→molecules order: Icon Button→Button→Badge→Avatar→Checkbox→Radio→Switch→Input→Textarea→Tooltip→Card→Tabs→Alert→Toast→Empty State→Select→Dropdown Menu→Modal.
6. For each component: base→variants (combineAsVariants+grid)→properties→documentation→`get_metadata`+`get_screenshot` validation.

## Stage 2 mapping (vanilla-extract)
- `Colors`(primitive, light/dark) → `createGlobalThemeContract` + light/dark `createTheme`.
- `Color`/`Spacing`/`Radius` semantics → semantic keys of the same contract.
- Each component variant axis → `variants` of `@vanilla-extract/recipes`.
- Storybook: per-component variant/state stories + light/dark toggle (globalTypes).
