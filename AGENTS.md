# AGENTS.md — Velys UI Working Guide (for LLMs/agents)

This repository is the **Velys design system**. The Figma source and the vanilla-extract-based React library (`@velody/velys`) map 1:1. This document is the single reference for how a coding agent should **use** and **extend** the library.

> For per-component APIs, see the [`llms.txt`](llms.txt) index and [`docs/components/`](docs/components/); for token values, see [`docs/tokens.md`](docs/tokens.md).

## Stack
- Styling: [vanilla-extract](https://vanilla-extract.style/) (`@vanilla-extract/css`, `@vanilla-extract/recipes`) — zero-runtime, CSS extracted at build time
- Framework: React 18 (peer dep), `forwardRef` pattern
- Build: `tsup` (esbuild) → ESM(`.js`) + CJS(`.cjs`) + `.d.ts` + a single `index.css`
- Docs: Storybook 8 (`@storybook/react-vite` + `@vanilla-extract/vite-plugin`)

## Repository structure
```
src/
  theme/
    theme.css.ts     # createTheme contract(vars) + lightThemeClass/darkThemeClass
    global.css.ts    # theme root baseline (font/background) + box-sizing
    index.ts
  components/
    <Name>/
      <Name>.css.ts        # recipe/style (all visual definitions)
      <Name>.tsx           # React component (forwardRef)
      <Name>.stories.tsx   # Storybook
      index.ts
    icons.tsx        # internal default icons (currentColor-based SVG)
  utils/cx.ts        # className merge
  index.ts           # public barrel (+ "./theme/global.css" import)
docs/                # docs for LLMs/humans (these files)
.storybook/          # main.ts, preview.tsx (light/dark toggle + token preview)
```

## Theming model (important)
- `theme.css.ts` uses `createTheme` to create the **contract `vars`** and **`lightThemeClass`**, and `darkThemeClass` binds dark values to the same contract.
- Components always reference only `vars.*` (no hardcoded colors/spacing). The actual values are determined by the **theme class applied to an ancestor element**.
- Consumers apply `lightThemeClass` or `darkThemeClass` at the app root.
- **Portal components (Modal, etc.)** render into `document.body`, so to use dark mode it is recommended to apply the theme class to a higher level such as **`<html>` or `<body>`** (applying it only to the app root div leaves portal content without a theme).
- The app must load `import "@velody/velys/styles.css"` (or `dist/index.css`) once for the extracted CSS to take effect.

## Token usage rules
- Colors: `vars.color.{bg,text,icon,border,brand,success,warning,danger,info}.*`
- Spacing: `vars.space.*` (keys containing a `.` like `2xl/3xl/4xl` use `vars.space["2xl"]`)
- Radius: `vars.radius.*`, typography: `vars.font.{family,size,lineHeight,weight}.*`, shadows: `vars.shadow.*`
- Status color mapping: `info`/`success`/`warning`/`danger` have `{solid,subtle,text,border}` (danger adds `solidHover`). For neutrals, use `bg.muted`/`bg.inverse`/`text.primary`, etc.

## Component authoring conventions
1. **All visual definitions go in `<Name>.css.ts`.** Express variant axes with `recipe({ variants })` (= the same names/values as the Figma variant axes).
2. **States (hover/checked/focus/disabled)** should be handled in CSS where possible:
   - hover/disabled: `selectors: { "&:hover": ..., "&:disabled": ... }` or `"&:not(:disabled):hover"`.
   - Form controls (Checkbox/Radio/Switch) keep a visually hidden native `<input>` and style the box via the sibling selector **`${input}:checked + &`** pattern (works for both controlled/uncontrolled).
   - **vanilla-extract constraint**: in a selector, `&` must always be the **target (rightmost)**. To target a child, put `&` on the child like `[`${input}:checked + ${baseClass} &`]`. Descendant selectors like `& [data-x]` cause a build error.
3. Components forward refs via `forwardRef` + native attribute passthrough. `className` is merged onto the root with `cx()`.
4. Variant types are extracted from `RecipeVariants<typeof recipe>` and merged into props.
5. The focus ring is `boxShadow: vars.shadow.focus`.
6. New components are added to the `src/index.ts` barrel, `docs/components/<Name>.md`, and the `llms.txt` list.

### Procedure for adding a new component
1. Create `*.css.ts`, `*.tsx`, `*.stories.tsx`, `index.ts` under `src/components/<Name>/`.
2. Add the export to `src/index.ts`.
3. Verify types/build with `npx tsc --noEmit` + `npx tsup` (especially vanilla-extract selector errors).
4. Update `docs/components/<Name>.md` and `llms.txt`.

## Build & scripts
```bash
npm run build            # dist/ (ESM+CJS+d.ts+index.css)
npm run typecheck        # tsc --noEmit
npm run storybook        # dev server
npm run build-storybook  # storybook-static/
```
- `package.json`: `sideEffects: ["**/*.css","**/*.css.ts"]` (tree-shake but preserve global styles), provides `.` and `./styles.css` via `exports`.

## Storybook
- The **toolbar theme toggle (Light/Dark)** in `.storybook/preview.tsx` lets you check every story in both modes (globalTypes `theme`).
- The **Foundations/Tokens** story visually shows color/spacing/radius/typography tokens.
