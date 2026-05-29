# Velys Design System (`@velody/velys`)

A design system built with reference to Vercel Geist. The **Figma source** (tokens and component sets) and the **vanilla-extract-based React library** map 1:1.

- Design source: Figma (Variables: `Color` light/dark · `Spacing` · `Radius`, Text/Effect Styles)
- Code: zero-runtime CSS-in-TS ([vanilla-extract](https://vanilla-extract.style/)) + React, ESM/CJS + `.d.ts` + tree-shaking
- Docs: Storybook (per-component variant/state stories + light/dark toggle)

## Installation

```bash
npm install @velody/velys
# peer deps
npm install react react-dom
```

## Usage

Apply the stylesheet and a theme class. The theme classes (`lightThemeClass` / `darkThemeClass`) provide the CSS variables, so apply them at the app root.

```tsx
import "@velody/velys/styles.css";
import { lightThemeClass, Button, Input, Alert } from "@velody/velys";

export default function App() {
  return (
    <div className={lightThemeClass}>
      <Button>Get started</Button>
      <Input placeholder="Email" />
      <Alert status="success" title="Saved" description="Your changes have been applied." />
    </div>
  );
}
```

### Dark mode

```tsx
import { darkThemeClass } from "@velody/velys";

<div className={darkThemeClass}>{/* all components render with dark tokens */}</div>
```

### Using design tokens directly

```ts
import { vars } from "@velody/velys";

const styles = { color: vars.color.text.primary, padding: vars.space.md, borderRadius: vars.radius.md };
```

## Components (18 total)

Button · IconButton · Badge · Input · Textarea · Select · Checkbox · Radio · Switch ·
Card · Avatar · Alert · Toast · EmptyState · Tabs · Tooltip · DropdownMenu · Modal

## Development

```bash
npm install
npm run build            # tsup: ESM + CJS + d.ts + index.css
npm run storybook        # local docs (http://localhost:6006)
npm run build-storybook  # build static docs → storybook-static/
npm run typecheck
```

## Documentation

- [`llms.txt`](llms.txt) — index for LLMs/agents (installation, theming, component list)
- [`AGENTS.md`](AGENTS.md) — full library guide (architecture, theming, component authoring rules)
- [`docs/components/`](docs/components/) — per-component Props, examples, a11y
- [`docs/tokens.md`](docs/tokens.md) — design token reference
- Storybook **Foundations/Tokens** — visualization of colors/spacing/radius/typography/shadows (switch Light/Dark via the toolbar Theme)

## Source of Truth

Color/spacing/radius tokens match the values extracted from Figma Variables. Both light and dark modes are provided, exposed as semantic tokens (`color/bg/*`, `color/brand/*`, `color/{success,warning,danger,info}/*`, etc.).
