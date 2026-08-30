import test from "node:test";
import assert from "node:assert/strict";

import {
  accentPalettes,
  accentPaletteFor,
  createCustomAccentPalette,
  generateDesignMarkdown,
  getPreviewConfig,
  normalizeHex,
  withPreviewDefaults
} from "../src/design.js";
import { getTemplateById, resolveExportStyle, resolvePreviewStyle } from "../src/data.js";

const northstar = getTemplateById("northstar-soft-utility");
const essentials = {
  colorMode: "both",
  accent: "amber",
  typography: "sans",
  radius: "rounded",
  density: "spacious"
};

test("custom accent normalization and preview color derivation remain deterministic", () => {
  assert.equal(normalizeHex("#abc"), "#AABBCC");
  assert.equal(normalizeHex("12abef"), "#12ABEF");
  assert.equal(normalizeHex("not-a-color"), null);
  assert.deepEqual(createCustomAccentPalette("#12abef"), createCustomAccentPalette("12ABEF"));
  const palette = accentPaletteFor("custom", "#12abef");
  assert.equal(palette.main, "#12ABEF");
  assert.match(palette.hover, /^#[0-9A-F]{6}$/);
  assert.match(palette.soft, /^#[0-9A-F]{6}$/);
  assert.match(palette.ring, /^rgba\(/);
});

test("every fixed accent keeps its V1 deterministic preview mapping", () => {
  assert.equal(Object.keys(accentPalettes).length, 14);
  for (const palette of Object.values(accentPalettes)) {
    assert.match(palette.main, /^#[0-9a-f]{6}$/i);
    assert.match(palette.hover, /^#[0-9a-f]{6}$/i);
  }
});

test("preview config consumes template defaults plus explicit selections", () => {
  const preview = resolvePreviewStyle(northstar, {
    essentials: { accent: "custom", customAccent: "#12abef", radius: "square" }
  });
  const light = getPreviewConfig(preview, "light");
  const dark = getPreviewConfig(preview, "dark");
  assert.equal(light.mode, "light");
  assert.equal(dark.mode, "dark");
  assert.notEqual(light.vars["--pv-bg"], dark.vars["--pv-bg"]);
  assert.equal(light.vars["--pv-accent"], "#12ABEF");
  assert.equal(light.vars["--pv-card-radius"], "0px");
});

test("global preview fallbacks remain render-only and deterministic", () => {
  const defaults = withPreviewDefaults({ accent: "rose" });
  assert.equal(defaults.accent, "rose");
  assert.equal(defaults.colorMode, "both");
  assert.ok(getPreviewConfig({ visual: {} }, "light").vars["--pv-bg"]);
});

test("DESIGN.md exports template structure and all five explicit Essentials", () => {
  const output = generateDesignMarkdown(resolveExportStyle(northstar, { essentials }));
  assert.match(output, /^# DESIGN\.md/m);
  assert.ok(output.includes("This is the UI profile of current application"));
  assert.ok(output.includes("## Template / Structure"));
  assert.ok(output.includes("Direction: **Northstar - Soft Utility**"));
  assert.ok(output.includes("Domain: **Tool / Utility**"));
  assert.ok(output.includes("Navigation: **Top**"));
  assert.ok(output.includes("Page structure: **Marketing scroll**"));
  assert.ok(output.includes("## Visual Identity"));
  assert.ok(output.includes("Accent: **Amber** (#b45309)"));
  assert.ok(output.includes("Logo treatment: **Wordmark**"));
  assert.ok(output.includes("Section - Workspace preview: **Primary**"));
  assert.ok(!output.includes("Optional Details"));
  assert.ok(!output.includes("Implementation Rules"));
  assert.ok(!output.includes("breakpoint"));
});

test("explicit selections equal to preview defaults still export", () => {
  const output = generateDesignMarkdown(resolveExportStyle(northstar, { essentials }));
  assert.ok(output.includes("Color mode: **Both Dark and Light**"));
  assert.ok(output.includes("Typography: **Sans**"));
  assert.ok(output.includes("Radius: **Rounded**"));
  assert.ok(output.includes("Density: **Spacious**"));
});

test("custom accent and optional details export only when explicitly selected", () => {
  const selected = {
    essentials: { ...essentials, accent: "custom", customAccent: "#12abef", radius: "square" },
    optional: { surface: "shadow", iconStyle: "filled" },
    templateDetails: { ctaModel: "single" }
  };
  const output = generateDesignMarkdown(resolveExportStyle(northstar, selected));
  assert.ok(output.includes("Radius: **Square**"));
  assert.ok(output.includes("Accent: **Custom** (#12ABEF)"));
  assert.ok(output.includes("## Optional Details"));
  assert.ok(output.includes("Surface treatment: **Subtle shadow**"));
  assert.ok(output.includes("Icon style: **Filled**"));
  assert.ok(output.includes("CTA model: **Single action**"));
  assert.ok(!output.includes("Neutral tone"));
  assert.ok(!output.includes("Hover:"));
});

test("DESIGN.md rejects missing Essentials and invalid custom accents", () => {
  assert.throws(() => generateDesignMarkdown(resolveExportStyle(northstar)), /All 5 Essentials/);
  const invalid = resolveExportStyle(northstar, { essentials: { ...essentials, accent: "custom", customAccent: "nope" } });
  assert.throws(() => generateDesignMarkdown(invalid), /All 5 Essentials|valid HEX/);
  assert.throws(() => generateDesignMarkdown(null), /selected template/);
});
