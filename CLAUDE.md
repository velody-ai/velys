# Velys Design System

This is a project to build the Velys design system. The mission and completion criteria follow `MISSION.md`.

1. **Figma planning** — Plan all components from `MVP.md` in Figma, at a variant level usable by the MVP project.
2. **Library implementation** — Implement the Figma plans as a component library based on **vanilla-extract**, package it as an installable package, and document it with **Storybook**.

We are currently at stage 1 (Figma planning); there is no code implementation (package/repository) yet.

## Source of Truth

- **Figma file (design original):** https://www.figma.com/design/tGCZO8dQPK1hwvOHGsjgJS/Velys
  - The single source of truth for design tokens (color/typography/spacing), Variables, and component sets.
  - Design work is read from / written to Figma via the Figma MCP (see the workflow below).
- **Reference design system:** Vercel [Geist](https://vercel.com/geist) — the reference standard for color scale structure, light/dark modes, and component naming.
  - Geist page snapshots are kept in `.playwright-mcp/`.

## MVP Scope

The list of components to build and their progress status are managed in `MVP.md` (17 types, including Button, Input, Select, Modal, Toast, etc.). When a component is completed, update the checkbox in `MVP.md`.

## Figma Workflow

When reading, modifying, or creating Figma designs, you **must load the following skills first**, together with the Figma MCP:

- Before calling `use_figma` (write / JS execution) → `figma:figma-use` skill
- Building/modifying the design system (tokens, Variables, component sets) → `figma:figma-generate-library`
- Frequently used recipes and mistake-avoidance for working on color palettes/tokens/component sets → `vel-utils:figma-ds-patterns`
- Mapping designs to code (Code Connect) → `figma:figma-code-connect`

Principles:
- Use design tokens/Variables instead of hardcoded values.
- Consider both light and dark modes together (following the Geist structure).
- Build components to production quality, with variant sets, states (hover/disabled, etc.), and token bindings.

## Library Stack (Stage 2)

- **Styling:** vanilla-extract (zero-runtime CSS-in-TS). Match design tokens to Figma Variables, and express themes/modes as vanilla-extract themes.
- **Documentation:** Storybook. Write stories per variant and state for each component.
- **Distribution form:** Build it to be installable as an npm package (tree-shakeable, with `.d.ts` types provided).

## Current Status Notes

- Not a git repository, no code/package yet. Work output mainly accumulates inside the Figma file.
- When entering stage 2, bootstrap the repository with the stack above.
