import { domainFor, getEssentialProgress, labelFor, previewDefaults } from "./data.js";

export const accentPalettes = {
  red: { main: "#b91c1c", hover: "#991b1b", soft: "#fef2f2", ring: "rgba(185, 28, 28, 0.28)" },
  orange: { main: "#c2410c", hover: "#9a3412", soft: "#fff7ed", ring: "rgba(194, 65, 12, 0.28)" },
  amber: { main: "#b45309", hover: "#92400e", soft: "#fffbeb", ring: "rgba(180, 83, 9, 0.28)" },
  lime: { main: "#4d7c0f", hover: "#3f6212", soft: "#f7fee7", ring: "rgba(77, 124, 15, 0.28)" },
  emerald: { main: "#047857", hover: "#065f46", soft: "#ecfdf5", ring: "rgba(4, 120, 87, 0.28)" },
  teal: { main: "#0f766e", hover: "#115e59", soft: "#f0fdfa", ring: "rgba(15, 118, 110, 0.28)" },
  cyan: { main: "#0e7490", hover: "#155e75", soft: "#ecfeff", ring: "rgba(14, 116, 144, 0.28)" },
  blue: { main: "#1d4ed8", hover: "#1e40af", soft: "#eff6ff", ring: "rgba(29, 78, 216, 0.28)" },
  indigo: { main: "#4338ca", hover: "#3730a3", soft: "#eef2ff", ring: "rgba(67, 56, 202, 0.28)" },
  violet: { main: "#6d28d9", hover: "#5b21b6", soft: "#f5f3ff", ring: "rgba(109, 40, 217, 0.28)" },
  purple: { main: "#7e22ce", hover: "#6b21a8", soft: "#faf5ff", ring: "rgba(126, 34, 206, 0.28)" },
  fuchsia: { main: "#a21caf", hover: "#86198f", soft: "#fdf4ff", ring: "rgba(162, 28, 175, 0.28)" },
  pink: { main: "#be185d", hover: "#9d174d", soft: "#fdf2f8", ring: "rgba(190, 24, 93, 0.28)" },
  rose: { main: "#be123c", hover: "#9f1239", soft: "#fff1f2", ring: "rgba(190, 18, 60, 0.28)" }
};

const neutralPalettes = {
  cool: {
    light: { bg: "#f5f7fa", surface: "#ffffff", surfaceAlt: "#eef2f6", text: "#17202a", muted: "#667085", border: "#d9e0e8" },
    dark: { bg: "#11151b", surface: "#181e26", surfaceAlt: "#202833", text: "#f4f7fb", muted: "#9aa7b7", border: "#2e3946" }
  },
  warm: {
    light: { bg: "#f8f6f1", surface: "#fffdfa", surfaceAlt: "#f1ede5", text: "#29251f", muted: "#756d62", border: "#dfd8cc" },
    dark: { bg: "#171512", surface: "#201d19", surfaceAlt: "#29251f", text: "#faf7f0", muted: "#aaa093", border: "#3a342c" }
  }
};

const typographyMap = {
  sans: { body: 'ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', heading: 'ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', bodyWeight: "400", headingWeight: "720" },
  serif: { body: 'ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', heading: 'Georgia, "Times New Roman", serif', bodyWeight: "400", headingWeight: "700" },
  mono: { body: 'ui-monospace, "SFMono-Regular", Consolas, "Liberation Mono", monospace', heading: 'ui-monospace, "SFMono-Regular", Consolas, "Liberation Mono", monospace', bodyWeight: "400", headingWeight: "700" },
  display: { body: 'ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', heading: '"Arial Rounded MT Bold", "Trebuchet MS", ui-sans-serif, sans-serif', bodyWeight: "400", headingWeight: "700" }
};

const radiusMap = {
  square: { control: "0px", card: "0px" },
  slight: { control: "6px", card: "8px" },
  rounded: { control: "12px", card: "16px" },
  pill: { control: "999px", card: "28px" }
};

const surfaceMap = {
  flat: { border: "transparent", shadow: "none" },
  border: { border: "var(--pv-border)", shadow: "none" },
  shadow: { border: "transparent", shadow: "0 8px 24px rgba(15, 23, 42, 0.08)" },
  elevated: { border: "transparent", shadow: "0 16px 42px rgba(15, 23, 42, 0.16)" }
};

const densityMap = {
  compact: { space: "10px", cardPad: "16px", controlH: "36px" },
  normal: { space: "16px", cardPad: "22px", controlH: "42px" },
  spacious: { space: "22px", cardPad: "28px", controlH: "48px" }
};

const motionMap = {
  minimal: { duration: "0ms", distance: "0px", ring: "0 0 0 3px" },
  gentle: { duration: "140ms", distance: "1px", ring: "0 0 0 3px" },
  expressive: { duration: "220ms", distance: "2px", ring: "0 0 0 4px" }
};

const textMap = { wrap: { body: "wrap", heading: "wrap" }, pretty: { body: "pretty", heading: "pretty" }, balance: { body: "wrap", heading: "balance" } };
const iconMap = { outline: { size: "20px", stroke: "1.75" }, filled: { size: "20px", stroke: "0" }, duotone: { size: "20px", stroke: "1.5" } };

export function normalizeHex(value) {
  const raw = String(value ?? "").trim().replace(/^#/, "");
  if (/^[0-9a-f]{3}$/i.test(raw)) return `#${raw.split("").map((char) => char + char).join("").toUpperCase()}`;
  if (/^[0-9a-f]{6}$/i.test(raw)) return `#${raw.toUpperCase()}`;
  return null;
}

function hexToRgb(hex) {
  const normalized = normalizeHex(hex);
  if (!normalized) return null;
  return { r: Number.parseInt(normalized.slice(1, 3), 16), g: Number.parseInt(normalized.slice(3, 5), 16), b: Number.parseInt(normalized.slice(5, 7), 16) };
}

function mixHex(hex, target, amount) {
  const source = hexToRgb(hex);
  const destination = hexToRgb(target);
  if (!source || !destination) return normalizeHex(hex) ?? "#B45309";
  const mix = (a, b) => Math.round(a + (b - a) * amount);
  return `#${[mix(source.r, destination.r), mix(source.g, destination.g), mix(source.b, destination.b)].map((channel) => channel.toString(16).padStart(2, "0")).join("")}`.toUpperCase();
}

export function createCustomAccentPalette(value) {
  const main = normalizeHex(value);
  if (!main) return null;
  const rgb = hexToRgb(main);
  return { main, hover: mixHex(main, "#000000", 0.18), soft: mixHex(main, "#FFFFFF", 0.9), ring: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.28)` };
}

export function accentPaletteFor(accentId, customAccent) {
  if (accentId === "custom") return createCustomAccentPalette(customAccent) ?? accentPalettes.amber;
  return accentPalettes[accentId] ?? accentPalettes.amber;
}

export function withPreviewDefaults(visual = {}) {
  return { ...previewDefaults, ...visual };
}

export function getPreviewConfig(previewStyle = {}, previewMode = null) {
  const visual = previewStyle.visual ?? previewStyle;
  const selected = withPreviewDefaults(visual);
  const mode = selected.colorMode === "dark" ? "dark" : selected.colorMode === "both" && previewMode === "dark" ? "dark" : "light";
  const neutral = (neutralPalettes[selected.neutralTone] ?? neutralPalettes.cool)[mode];
  const accent = accentPaletteFor(selected.accent, selected.customAccent);
  const typography = typographyMap[selected.typography] ?? typographyMap.sans;
  const radius = radiusMap[selected.radius] ?? radiusMap.rounded;
  const surface = surfaceMap[selected.surface] ?? surfaceMap.border;
  const density = densityMap[selected.density] ?? densityMap.normal;
  const motion = motionMap[selected.focusMotion] ?? motionMap.gentle;
  const text = textMap[selected.textBehavior] ?? textMap.wrap;
  const icon = iconMap[selected.iconStyle] ?? iconMap.outline;

  return {
    mode,
    selected,
    attributes: { hover: selected.hover, motion: selected.focusMotion, icon: selected.iconStyle, text: selected.textBehavior },
    vars: {
      "--pv-bg": neutral.bg, "--pv-surface": neutral.surface, "--pv-surface-alt": neutral.surfaceAlt, "--pv-text": neutral.text,
      "--pv-muted": neutral.muted, "--pv-border": neutral.border, "--pv-accent": accent.main, "--pv-accent-hover": accent.hover,
      "--pv-accent-soft": accent.soft, "--pv-ring": accent.ring, "--pv-body-font": typography.body, "--pv-heading-font": typography.heading,
      "--pv-body-weight": typography.bodyWeight, "--pv-heading-weight": typography.headingWeight, "--pv-control-radius": radius.control,
      "--pv-card-radius": radius.card, "--pv-surface-border": surface.border, "--pv-shadow": surface.shadow, "--pv-space": density.space,
      "--pv-card-pad": density.cardPad, "--pv-control-h": density.controlH, "--pv-duration": motion.duration,
      "--pv-motion-distance": motion.distance, "--pv-focus-shadow": motion.ring, "--pv-body-wrap": text.body,
      "--pv-heading-wrap": text.heading, "--pv-icon-size": icon.size, "--pv-icon-stroke": icon.stroke
    }
  };
}

const compositionOrder = ["navigation", "heroStructure", "heroPriority", "ctaModel", "contentRhythm", "grid", "informationDensity", "sectionTransition", "pageStructure"];
const brandLabels = { logoTreatment: "Logo treatment", decorativeMotif: "Decorative motif", illustrationDirection: "Illustration direction", backgroundTreatment: "Background treatment", signatureComponent: "Signature component" };

function titledSection(title, lines) {
  return lines.length ? [`## ${title}`, ...lines].join("\n") : null;
}

export function generateDesignMarkdown(exportStyle) {
  if (!exportStyle?.template || !exportStyle.composition || !exportStyle.visual) {
    throw new Error("A selected template and export style are required before generating DESIGN.md");
  }

  const { template, composition, visual, brandMotifs, sections: sectionIntent } = exportStyle;
  const readiness = getEssentialProgress(visual);
  if (!readiness.complete) throw new Error("All 5 Essentials must be explicitly selected before generating DESIGN.md");
  if (visual.accent === "custom" && !normalizeHex(visual.customAccent)) throw new Error("Custom accent requires a valid HEX value");

  const accent = accentPaletteFor(visual.accent, visual.customAccent);
  const accentLabel = visual.accent === "custom" ? "Custom" : labelFor("accent", visual.accent);
  const compositionLines = compositionOrder
    .filter((key) => composition[key] !== undefined)
    .map((key) => {
      const headings = { navigation: "Navigation", heroStructure: "Opening structure", heroPriority: "Opening priority", ctaModel: "CTA model", contentRhythm: "Content rhythm", grid: "Grid", informationDensity: "Information density", sectionTransition: "Section transition", pageStructure: "Page structure" };
      return `- ${headings[key]}: **${labelFor(key, composition[key])}**.`;
    });
  const structureLines = [
    `- Direction: **${template.name}**.`,
    `- Domain: **${domainFor(template.domain)?.name ?? template.domain}**.`,
    ...compositionLines,
    ...Object.entries(brandMotifs ?? {}).map(([key, value]) => `- ${brandLabels[key] ?? key}: **${value}**.`),
    ...(sectionIntent ?? []).map((section) => `- Section - ${section.type}: **${section.emphasis}**.`)
  ];
  const visualLines = [
    `- Color mode: **${visual.colorMode === "both" ? "Both Dark and Light" : labelFor("colorMode", visual.colorMode)}**.`,
    `- Accent: **${accentLabel}** (${accent.main}).`,
    `- Typography: **${labelFor("typography", visual.typography)}**.`,
    `- Radius: **${labelFor("radius", visual.radius)}**.`,
    `- Density: **${labelFor("density", visual.density)}**.`
  ];
  const optionalLines = [
    visual.neutralTone ? `- Neutral tone: **${labelFor("neutralTone", visual.neutralTone)}**.` : null,
    visual.surface ? `- Surface treatment: **${labelFor("surface", visual.surface)}**.` : null,
    visual.hover ? `- Hover: **${labelFor("hover", visual.hover)}**.` : null,
    visual.focusMotion ? `- Focus & motion: **${labelFor("focusMotion", visual.focusMotion)}**.` : null,
    visual.textBehavior ? `- Text behavior: **${labelFor("textBehavior", visual.textBehavior)}**.` : null,
    visual.iconStyle ? `- Icon style: **${labelFor("iconStyle", visual.iconStyle)}**.` : null
  ].filter(Boolean);

  const sections = [
    "# DESIGN.md",
    "",
    "This is the UI profile of current application",
    "",
    titledSection("Template / Structure", structureLines),
    "",
    titledSection("Visual Identity", visualLines)
  ];
  if (optionalLines.length) sections.push("", titledSection("Optional Details", optionalLines));
  sections.push("");
  return sections.join("\n");
}
