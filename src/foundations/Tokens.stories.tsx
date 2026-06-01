import type { Meta, StoryObj } from "@storybook/react";
import { vars } from "../theme/theme.css";

const meta: Meta = {
  title: "Foundations/Tokens",
  parameters: { layout: "fullscreen" },
};
export default meta;
type Story = StoryObj;

const grid: React.CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 12 };
const heading: React.CSSProperties = { fontSize: vars.font.size.lg, fontWeight: vars.font.weight.semibold, margin: "24px 0 8px" };
const sub: React.CSSProperties = { fontSize: vars.font.size.sm, color: vars.color.text.tertiary, marginBottom: 4 };

function Swatch({ name, value }: { name: string; value: string }) {
  return (
    <div style={{ border: `1px solid ${vars.color.border.default}`, borderRadius: vars.radius.md, overflow: "hidden" }}>
      <div style={{ height: 56, background: value }} />
      <div style={{ padding: "6px 8px", fontSize: vars.font.size.xs, fontFamily: vars.font.family.mono, color: vars.color.text.secondary }}>{name}</div>
    </div>
  );
}

const colorGroups: Record<string, [string, string][]> = {
  bg: Object.entries(vars.color.bg),
  text: Object.entries(vars.color.text),
  brand: Object.entries(vars.color.brand),
  border: Object.entries(vars.color.border),
  success: Object.entries(vars.color.success),
  warning: Object.entries(vars.color.warning),
  danger: Object.entries(vars.color.danger),
  info: Object.entries(vars.color.info),
};

export const Colors: Story = {
  render: () => (
    <div>
      <p style={sub}>Switch the Theme (Light/Dark) in the toolbar to see token values per mode.</p>
      {Object.entries(colorGroups).map(([group, entries]) => (
        <div key={group}>
          <h3 style={heading}>color.{group}</h3>
          <div style={grid}>
            {entries.map(([k, v]) => <Swatch key={k} name={`${group}.${k}`} value={v} />)}
          </div>
        </div>
      ))}
    </div>
  ),
};

const paletteScales: [string, Record<string, string>][] = [
  ["gray", vars.palette.gray],
  ["blue", vars.palette.blue],
  ["red", vars.palette.red],
  ["amber", vars.palette.amber],
  ["green", vars.palette.green],
  ["teal", vars.palette.teal],
];

const chip: React.CSSProperties = {
  width: 72,
  height: 48,
  borderRadius: vars.radius.md,
  border: `1px solid ${vars.color.border.subtle}`,
};
const chipLabel: React.CSSProperties = {
  fontSize: vars.font.size.xs,
  fontFamily: vars.font.family.mono,
  color: vars.color.text.secondary,
};

export const Primitives: Story = {
  render: () => (
    <div>
      <p style={sub}>
        Raw palette — mode-invariant (same in Light/Dark). Access via <code>vars.palette.gray[500]</code>.
        Prefer semantic <code>color.*</code> tokens; reach for these only when no semantic token fits.
      </p>
      {paletteScales.map(([name, scale]) => (
        <div key={name}>
          <h3 style={heading}>palette.{name}</h3>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {Object.entries(scale).map(([step, v]) => (
              <div key={step} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <div style={{ ...chip, background: v }} />
                <span style={chipLabel}>{step}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
      <h3 style={heading}>palette.white / palette.black</h3>
      <div style={{ display: "flex", gap: 8 }}>
        {([["white", vars.palette.white], ["black", vars.palette.black]] as const).map(([k, v]) => (
          <div key={k} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <div style={{ ...chip, background: v }} />
            <span style={chipLabel}>{k}</span>
          </div>
        ))}
      </div>
      <h3 style={heading}>palette.alpha (over white)</h3>
      <div style={{ display: "flex", gap: 8, background: "#fff", padding: 12, borderRadius: vars.radius.md, width: "fit-content" }}>
        {Object.entries(vars.palette.alpha).map(([step, v]) => (
          <div key={step} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <div style={{ ...chip, background: v }} />
            <span style={chipLabel}>{step}</span>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const Spacing: Story = {
  render: () => (
    <div>
      <h3 style={heading}>space</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {Object.entries(vars.space).map(([k, v]) => (
          <div key={k} style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ width: 64, fontSize: vars.font.size.xs, fontFamily: vars.font.family.mono, color: vars.color.text.secondary }}>{k}</span>
            <span style={{ height: 16, width: v, background: vars.color.brand.solid, borderRadius: vars.radius.sm }} />
          </div>
        ))}
      </div>
    </div>
  ),
};

export const Radius: Story = {
  render: () => (
    <div>
      <h3 style={heading}>radius</h3>
      <div style={grid}>
        {Object.entries(vars.radius).map(([k, v]) => (
          <div key={k} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <div style={{ width: 80, height: 56, background: vars.color.bg.muted, border: `1px solid ${vars.color.border.default}`, borderRadius: v }} />
            <span style={{ fontSize: vars.font.size.xs, fontFamily: vars.font.family.mono, color: vars.color.text.secondary }}>{k}</span>
          </div>
        ))}
      </div>
    </div>
  ),
};

const typeScale: [string, string, string, string][] = [
  ["display", vars.font.size.display, vars.font.lineHeight.display, vars.font.weight.bold],
  ["3xl", vars.font.size["3xl"], vars.font.lineHeight["3xl"], vars.font.weight.bold],
  ["2xl", vars.font.size["2xl"], vars.font.lineHeight["2xl"], vars.font.weight.semibold],
  ["xl", vars.font.size.xl, vars.font.lineHeight.xl, vars.font.weight.semibold],
  ["lg", vars.font.size.lg, vars.font.lineHeight.lg, vars.font.weight.medium],
  ["md", vars.font.size.md, vars.font.lineHeight.md, vars.font.weight.regular],
  ["sm", vars.font.size.sm, vars.font.lineHeight.sm, vars.font.weight.regular],
  ["xs", vars.font.size.xs, vars.font.lineHeight.xs, vars.font.weight.regular],
];

export const Typography: Story = {
  render: () => (
    <div>
      <h3 style={heading}>font.size / lineHeight</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {typeScale.map(([k, size, lh, w]) => (
          <div key={k}>
            <div style={sub}>{k} · {size} / {lh}</div>
            <div style={{ fontSize: size, lineHeight: lh, fontWeight: w, fontFamily: vars.font.family.sans, color: vars.color.text.primary }}>
              The quick brown fox jumps over the lazy dog
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const Shadows: Story = {
  render: () => (
    <div>
      <h3 style={heading}>shadow</h3>
      <div style={grid}>
        {(["sm", "md", "lg", "xl", "menu", "modal", "tooltip"] as const).map((k) => (
          <div key={k} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, padding: 12 }}>
            <div style={{ width: 96, height: 56, background: vars.color.bg.default, borderRadius: vars.radius.lg, boxShadow: vars.shadow[k] }} />
            <span style={{ fontSize: vars.font.size.xs, fontFamily: vars.font.family.mono, color: vars.color.text.secondary }}>{k}</span>
          </div>
        ))}
      </div>
    </div>
  ),
};
