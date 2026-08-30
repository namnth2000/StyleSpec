const option = (id, label) => ({ id, label });
const detail = (id, title, options, optionLabels = {}) => ({ id, title, options, optionLabels });

export const essentialDecisionIds = Object.freeze(["colorMode", "accent", "typography", "radius", "density"]);
export const optionalDecisionIds = Object.freeze(["neutralTone", "surface", "hover", "focusMotion", "textBehavior", "iconStyle"]);

export const domains = [
  { id: "tool", name: "Tool / Utility", shortName: "Tool", marker: "⌘" },
  { id: "software", name: "Software / SaaS", shortName: "Software", marker: "◫" },
  { id: "portfolio", name: "Portfolio", shortName: "Portfolio", marker: "↗" },
  { id: "wedding", name: "Wedding", shortName: "Wedding", marker: "♡" },
  { id: "game", name: "Game", shortName: "Game", marker: "◆" },
  { id: "blog", name: "Blog / Editorial", shortName: "Blog", marker: "¶" }
];

export const visualDecisions = [
  { id: "colorMode", layer: "visual", group: "Colors", title: "Color mode", options: [option("light", "Light"), option("dark", "Dark"), option("both", "Both")] },
  {
    id: "accent", layer: "visual", group: "Colors", title: "Accent color", compact: "swatches",
    options: [
      option("red", "Red"), option("orange", "Orange"), option("amber", "Amber"), option("lime", "Lime"), option("emerald", "Emerald"),
      option("teal", "Teal"), option("cyan", "Cyan"), option("blue", "Blue"), option("indigo", "Indigo"), option("violet", "Violet"),
      option("purple", "Purple"), option("fuchsia", "Fuchsia"), option("pink", "Pink"), option("rose", "Rose"), option("custom", "Custom")
    ]
  },
  { id: "typography", layer: "visual", group: "Typography", title: "Typography", options: [option("sans", "Sans"), option("serif", "Serif-led"), option("mono", "Mono-led"), option("display", "Display accent")] },
  { id: "radius", layer: "visual", group: "Shape & Surface", title: "Radius", options: [option("square", "Square"), option("slight", "Slight"), option("rounded", "Rounded"), option("pill", "Pill")] },
  { id: "density", layer: "visual", group: "Density & Spacing", title: "Spacing density", options: [option("compact", "Compact"), option("normal", "Normal"), option("spacious", "Spacious")] },
  { id: "neutralTone", layer: "visual", group: "Colors", title: "Neutral tone", options: [option("warm", "Warm"), option("cool", "Cool")] },
  { id: "surface", layer: "visual", group: "Shape & Surface", title: "Surface treatment", options: [option("flat", "Flat"), option("border", "Subtle border"), option("shadow", "Subtle shadow"), option("elevated", "Elevated")] },
  { id: "hover", layer: "visual", group: "Interaction", title: "Hover", options: [option("tint", "Tint"), option("darken", "Darken"), option("border", "Border"), option("lift", "Lift"), option("none", "None")] },
  { id: "focusMotion", layer: "visual", group: "Interaction", title: "Focus & motion", options: [option("minimal", "Minimal"), option("gentle", "Gentle"), option("expressive", "Expressive")] },
  { id: "textBehavior", layer: "visual", group: "Text Behavior", title: "Text behavior", options: [option("wrap", "Wrap"), option("pretty", "Pretty"), option("balance", "Balance")] },
  { id: "iconStyle", layer: "visual", group: "Icon Style", title: "Icon style", options: [option("outline", "Outline"), option("filled", "Filled"), option("duotone", "Duotone")] }
];

export const compositionDecisions = [
  { id: "navigation", layer: "composition", group: "Composition", title: "Navigation", options: [option("top", "Top"), option("sidebar", "Sidebar"), option("minimal", "Minimal"), option("docs", "Docs-like"), option("index", "Index"), option("hidden", "Hidden")] },
  { id: "heroStructure", layer: "composition", group: "Composition", title: "Opening structure", options: [option("centered", "Centered"), option("split", "Split"), option("asymmetric", "Asymmetric"), option("full-screen", "Full-screen"), option("editorial", "Editorial"), option("invitation", "Invitation"), option("none", "None")] },
  { id: "heroPriority", layer: "composition", group: "Composition", title: "Opening priority", options: [option("copy-first", "Copy-first"), option("product-first", "Product-first"), option("image-first", "Image-first"), option("tool-first", "Tool-first")] },
  { id: "ctaModel", layer: "composition", group: "Composition", title: "Action model", options: [option("primary-secondary", "Primary + secondary"), option("single", "Single action"), option("inline", "Inline links"), option("install-docs", "Install + docs"), option("rsvp", "RSVP"), option("none", "None")] },
  { id: "contentRhythm", layer: "composition", group: "Composition", title: "Content rhythm", options: [option("stacked", "Stacked"), option("alternating", "Alternating"), option("dense", "Dense"), option("narrative", "Narrative"), option("index", "Index"), option("masonry", "Masonry"), option("magazine", "Magazine"), option("collage", "Collage"), option("journal", "Journal")] },
  { id: "grid", layer: "composition", group: "Composition", title: "Grid", options: [option("traditional", "Traditional"), option("asymmetric", "Asymmetric"), option("editorial", "Editorial"), option("freeform", "Freeform"), option("single-column", "Single column")] },
  { id: "informationDensity", layer: "composition", group: "Composition", title: "Information density", options: [option("compact", "Compact"), option("balanced", "Balanced"), option("spacious", "Spacious")] },
  { id: "sectionTransition", layer: "composition", group: "Composition", title: "Section transition", options: [option("whitespace", "Whitespace"), option("border", "Border"), option("background-shift", "Background shift"), option("overlap", "Overlap"), option("full-bleed", "Full bleed")] },
  {
    id: "pageStructure", layer: "composition", group: "Composition", title: "Page structure",
    options: [option("marketing-scroll", "Marketing scroll"), option("workspace", "Workspace"), option("tool-canvas", "Tool canvas"), option("product-showcase", "Product showcase"), option("console", "Technical console"), option("launch-story", "Launch story"), option("project-index", "Project index"), option("case-study-grid", "Case study grid"), option("editorial-document", "Editorial document"), option("invitation", "Invitation"), option("collage", "Paper collage"), option("journal", "Photo journal"), option("arcade-cabinet", "Arcade cabinet"), option("cinematic-game", "Cinematic game"), option("retro-console", "Retro console"), option("publication-index", "Publication index"), option("longform-journal", "Longform journal"), option("visual-magazine", "Visual magazine")]
  }
];

export const decisions = [...compositionDecisions, ...visualDecisions];

const template = ({ id, name, domain, description, composition, previewDefaults, brandMotifs, sections, templateDetails = [], preview }) => ({
  id, name, domain, description,
  tags: [domain, composition.pageStructure, composition.contentRhythm].filter(Boolean),
  status: "active",
  composition,
  previewDefaults,
  brandMotifs,
  sections,
  templateDetails,
  preview,
  research: { provenance: "Original synthesis from the documented StyleSpec archetype", license: "Original", reviewedAt: "2026-08-28" }
});

export const templates = [
  template({
    id: "northstar-soft-utility", name: "Northstar - Soft Utility", domain: "tool", description: "A spacious utility with a friendly marketing lead-in.",
    composition: { navigation: "top", heroStructure: "centered", heroPriority: "copy-first", ctaModel: "primary-secondary", contentRhythm: "stacked", grid: "traditional", informationDensity: "spacious", sectionTransition: "whitespace", pageStructure: "marketing-scroll" },
    previewDefaults: { colorMode: "both", accent: "amber", typography: "sans", radius: "rounded", density: "spacious", neutralTone: "cool", surface: "border", hover: "tint", focusMotion: "gentle", textBehavior: "wrap", iconStyle: "outline" },
    brandMotifs: { logoTreatment: "Wordmark", decorativeMotif: "Soft utility tiles", signatureComponent: "Weekly focus board" },
    sections: [{ type: "Hero", emphasis: "Primary" }, { type: "Workspace preview", emphasis: "Primary" }, { type: "Feature summary", emphasis: "Supporting" }],
    templateDetails: [
      detail("heroStructure", "Opening layout", ["centered", "split", "asymmetric", "none"]),
      detail("ctaModel", "Action pattern", ["primary-secondary", "single", "inline"])
    ],
    preview: { kind: "northstar", label: "Soft utility" }
  }),
  template({
    id: "workspace", name: "Workspace", domain: "tool", description: "A compact, sidebar-led product surface with no hero.",
    composition: { navigation: "sidebar", heroStructure: "none", heroPriority: "tool-first", ctaModel: "inline", contentRhythm: "dense", grid: "traditional", informationDensity: "compact", sectionTransition: "border", pageStructure: "workspace" },
    previewDefaults: { colorMode: "both", accent: "indigo", typography: "sans", radius: "slight", density: "compact", neutralTone: "cool", surface: "border", hover: "tint", focusMotion: "minimal", textBehavior: "wrap", iconStyle: "outline" },
    brandMotifs: { logoTreatment: "Lettermark", signatureComponent: "Command toolbar" },
    sections: [{ type: "Workspace", emphasis: "Primary" }, { type: "Activity", emphasis: "Supporting" }, { type: "Shortcuts", emphasis: "Supporting" }],
    templateDetails: [
      detail("navigation", "Navigation", ["sidebar", "top", "minimal"]),
      detail("grid", "Board layout", ["traditional", "asymmetric", "editorial"], { traditional: "Equal lanes", asymmetric: "Priority lane", editorial: "Focus lane" })
    ],
    preview: { kind: "workspace", label: "Dense workspace" }
  }),
  template({
    id: "editorial-tool", name: "Editorial Tool", domain: "tool", description: "An asymmetric tool canvas framed by concise editorial copy.",
    composition: { navigation: "minimal", heroStructure: "asymmetric", heroPriority: "tool-first", ctaModel: "inline", contentRhythm: "alternating", grid: "asymmetric", informationDensity: "balanced", sectionTransition: "whitespace", pageStructure: "tool-canvas" },
    previewDefaults: { colorMode: "light", accent: "rose", typography: "serif", radius: "slight", density: "normal", neutralTone: "warm", surface: "flat", hover: "border", focusMotion: "gentle", textBehavior: "wrap", iconStyle: "outline" },
    brandMotifs: { logoTreatment: "Wordmark", decorativeMotif: "Editorial rules", signatureComponent: "Large interactive canvas" },
    sections: [{ type: "Intro", emphasis: "Supporting" }, { type: "Interactive tool", emphasis: "Primary" }, { type: "Method note", emphasis: "Supporting" }],
    templateDetails: [
      detail("heroPriority", "Tool placement", ["tool-first", "copy-first"]),
      detail("grid", "Grid", ["asymmetric", "traditional", "editorial"])
    ],
    preview: { kind: "editorial-tool", label: "Asymmetric canvas" }
  }),
  template({
    id: "product-first", name: "Product-first", domain: "software", description: "The product interface leads, with copy in a supporting role.",
    composition: { navigation: "top", heroStructure: "split", heroPriority: "product-first", ctaModel: "single", contentRhythm: "alternating", grid: "asymmetric", informationDensity: "balanced", sectionTransition: "whitespace", pageStructure: "product-showcase" },
    previewDefaults: { colorMode: "both", accent: "blue", typography: "sans", radius: "rounded", density: "normal", neutralTone: "cool", surface: "shadow", hover: "lift", focusMotion: "gentle", textBehavior: "wrap", iconStyle: "outline" },
    brandMotifs: { logoTreatment: "Symbol + Wordmark", signatureComponent: "Product window" },
    sections: [{ type: "Product showcase", emphasis: "Primary" }, { type: "Product proof", emphasis: "Primary" }, { type: "Feature detail", emphasis: "Supporting" }],
    templateDetails: [
      detail("heroPriority", "Product placement", ["product-first", "image-first", "copy-first"]),
      detail("grid", "Product frame", ["asymmetric", "traditional"], { asymmetric: "Offset", traditional: "Balanced" })
    ],
    preview: { kind: "product-first", label: "Product focal point" }
  }),
  template({
    id: "technical-console", name: "Technical Console", domain: "software", description: "A docs-like technical surface built around commands and artifacts.",
    composition: { navigation: "docs", heroStructure: "none", heroPriority: "product-first", ctaModel: "install-docs", contentRhythm: "dense", grid: "traditional", informationDensity: "compact", sectionTransition: "border", pageStructure: "console" },
    previewDefaults: { colorMode: "dark", accent: "emerald", typography: "mono", radius: "slight", density: "compact", neutralTone: "cool", surface: "border", hover: "border", focusMotion: "minimal", textBehavior: "wrap", iconStyle: "outline" },
    brandMotifs: { logoTreatment: "Wordmark", decorativeMotif: "Terminal prompts", signatureComponent: "Install command" },
    sections: [{ type: "Command", emphasis: "Primary" }, { type: "Quickstart", emphasis: "Primary" }, { type: "API capability", emphasis: "Supporting" }],
    templateDetails: [
      detail("navigation", "Documentation navigation", ["docs", "sidebar", "top"]),
      detail("ctaModel", "Quickstart actions", ["install-docs", "single", "inline"])
    ],
    preview: { kind: "technical-console", label: "Command-led docs" }
  }),
  template({
    id: "narrative-launch", name: "Narrative Launch", domain: "software", description: "A cinematic sequence that reveals one product story at a time.",
    composition: { navigation: "hidden", heroStructure: "full-screen", heroPriority: "image-first", ctaModel: "single", contentRhythm: "narrative", grid: "single-column", informationDensity: "spacious", sectionTransition: "background-shift", pageStructure: "launch-story" },
    previewDefaults: { colorMode: "dark", accent: "violet", typography: "display", radius: "rounded", density: "spacious", neutralTone: "cool", surface: "flat", hover: "tint", focusMotion: "expressive", textBehavior: "balance", iconStyle: "filled" },
    brandMotifs: { logoTreatment: "Symbol + Wordmark", decorativeMotif: "Luminous horizon", backgroundTreatment: "Cinematic gradients" },
    sections: [{ type: "Cinematic opening", emphasis: "Primary" }, { type: "Story beat", emphasis: "Primary" }, { type: "Product reveal", emphasis: "Primary" }],
    templateDetails: [
      detail("navigation", "Navigation", ["hidden", "minimal", "top"]),
      detail("heroPriority", "Opening focus", ["image-first", "copy-first", "product-first"]),
      detail("sectionTransition", "Story transition", ["background-shift", "full-bleed", "whitespace"])
    ],
    preview: { kind: "narrative-launch", label: "Cinematic sequence" }
  }),
  template({
    id: "project-index", name: "Project Index", domain: "portfolio", description: "A typographic project list that begins with the work itself.",
    composition: { navigation: "index", heroStructure: "none", heroPriority: "copy-first", ctaModel: "inline", contentRhythm: "index", grid: "traditional", informationDensity: "compact", sectionTransition: "border", pageStructure: "project-index" },
    previewDefaults: { colorMode: "light", accent: "indigo", typography: "mono", radius: "square", density: "compact", neutralTone: "cool", surface: "flat", hover: "border", focusMotion: "minimal", textBehavior: "wrap", iconStyle: "outline" },
    brandMotifs: { logoTreatment: "Wordmark", signatureComponent: "Numbered project index" },
    sections: [{ type: "Project index", emphasis: "Primary" }, { type: "Short profile", emphasis: "Supporting" }, { type: "Contact links", emphasis: "Supporting" }],
    templateDetails: [],
    preview: { kind: "project-index", label: "Work-first index" }
  }),
  template({
    id: "case-study-grid", name: "Case Study Grid", domain: "portfolio", description: "An image-led, asymmetric field of case studies.",
    composition: { navigation: "minimal", heroStructure: "none", heroPriority: "image-first", ctaModel: "none", contentRhythm: "masonry", grid: "asymmetric", informationDensity: "balanced", sectionTransition: "whitespace", pageStructure: "case-study-grid" },
    previewDefaults: { colorMode: "light", accent: "orange", typography: "sans", radius: "slight", density: "normal", neutralTone: "warm", surface: "flat", hover: "lift", focusMotion: "gentle", textBehavior: "wrap", iconStyle: "outline" },
    brandMotifs: { logoTreatment: "Lettermark", signatureComponent: "Variable-scale project thumbnails" },
    sections: [{ type: "Case study grid", emphasis: "Primary" }, { type: "Studio note", emphasis: "Supporting" }],
    templateDetails: [detail("grid", "Project grid", ["asymmetric", "traditional", "freeform"])],
    preview: { kind: "case-study-grid", label: "Asymmetric projects" }
  }),
  template({
    id: "personal-editorial", name: "Personal Editorial", domain: "portfolio", description: "A magazine-like personal introduction with an article rhythm.",
    composition: { navigation: "minimal", heroStructure: "editorial", heroPriority: "copy-first", ctaModel: "inline", contentRhythm: "magazine", grid: "editorial", informationDensity: "spacious", sectionTransition: "whitespace", pageStructure: "editorial-document" },
    previewDefaults: { colorMode: "light", accent: "amber", typography: "serif", radius: "square", density: "spacious", neutralTone: "warm", surface: "flat", hover: "border", focusMotion: "gentle", textBehavior: "pretty", iconStyle: "outline" },
    brandMotifs: { logoTreatment: "Wordmark", decorativeMotif: "Issue numbering", signatureComponent: "Editorial byline" },
    sections: [{ type: "Editorial introduction", emphasis: "Primary" }, { type: "Selected writing", emphasis: "Primary" }, { type: "Profile note", emphasis: "Supporting" }],
    templateDetails: [
      detail("heroStructure", "Intro style", ["editorial", "asymmetric", "none"]),
      detail("contentRhythm", "Article rhythm", ["magazine", "index", "stacked"])
    ],
    preview: { kind: "personal-editorial", label: "Magazine opening" }
  }),
  template({
    id: "editorial-invitation", name: "Editorial Invitation", domain: "wedding", description: "A quiet invitation where names, date, and whitespace lead.",
    composition: { navigation: "hidden", heroStructure: "invitation", heroPriority: "copy-first", ctaModel: "rsvp", contentRhythm: "stacked", grid: "single-column", informationDensity: "spacious", sectionTransition: "whitespace", pageStructure: "invitation" },
    previewDefaults: { colorMode: "light", accent: "rose", typography: "serif", radius: "slight", density: "spacious", neutralTone: "warm", surface: "flat", hover: "none", focusMotion: "gentle", textBehavior: "balance", iconStyle: "outline" },
    brandMotifs: { logoTreatment: "Monogram", decorativeMotif: "Fine botanical rule", backgroundTreatment: "Warm paper" },
    sections: [{ type: "Invitation", emphasis: "Primary" }, { type: "Ceremony", emphasis: "Primary" }, { type: "Schedule", emphasis: "Supporting" }, { type: "RSVP", emphasis: "Primary" }],
    templateDetails: [
      detail("heroStructure", "Invitation layout", ["invitation", "centered", "editorial"]),
      detail("ctaModel", "Response style", ["rsvp", "inline", "none"])
    ],
    preview: { kind: "editorial-invitation", label: "Type-led invitation" }
  }),
  template({
    id: "paper-collage", name: "Paper Collage", domain: "wedding", description: "Layered paper, overlapping keepsakes, and romantic depth.",
    composition: { navigation: "minimal", heroStructure: "asymmetric", heroPriority: "image-first", ctaModel: "inline", contentRhythm: "collage", grid: "freeform", informationDensity: "balanced", sectionTransition: "overlap", pageStructure: "collage" },
    previewDefaults: { colorMode: "light", accent: "orange", typography: "display", radius: "rounded", density: "normal", neutralTone: "warm", surface: "shadow", hover: "lift", focusMotion: "gentle", textBehavior: "wrap", iconStyle: "filled" },
    brandMotifs: { logoTreatment: "Badge", decorativeMotif: "Torn paper and pressed leaves", backgroundTreatment: "Layered paper" },
    sections: [{ type: "Collage opening", emphasis: "Primary" }, { type: "Our story", emphasis: "Primary" }, { type: "Keepsakes", emphasis: "Supporting" }, { type: "RSVP note", emphasis: "Supporting" }],
    templateDetails: [
      detail("grid", "Collage layout", ["freeform", "asymmetric", "editorial"]),
      detail("sectionTransition", "Paper layering", ["overlap", "background-shift", "whitespace"], { overlap: "Layered", "background-shift": "Two-tone", whitespace: "Clean paper" })
    ],
    preview: { kind: "paper-collage", label: "Layered keepsakes" }
  }),
  template({
    id: "photo-journal", name: "Photo Journal", domain: "wedding", description: "A full-bleed photographic story with short, quiet captions.",
    composition: { navigation: "hidden", heroStructure: "full-screen", heroPriority: "image-first", ctaModel: "inline", contentRhythm: "journal", grid: "single-column", informationDensity: "spacious", sectionTransition: "full-bleed", pageStructure: "journal" },
    previewDefaults: { colorMode: "both", accent: "rose", typography: "serif", radius: "square", density: "spacious", neutralTone: "warm", surface: "flat", hover: "tint", focusMotion: "gentle", textBehavior: "balance", iconStyle: "outline" },
    brandMotifs: { logoTreatment: "Wordmark", decorativeMotif: "Film-frame captions", backgroundTreatment: "Full-bleed photography" },
    sections: [{ type: "Photo opening", emphasis: "Primary" }, { type: "Story timeline", emphasis: "Primary" }, { type: "Album sequence", emphasis: "Primary" }, { type: "Event note", emphasis: "Supporting" }],
    templateDetails: [
      detail("heroPriority", "Opening focus", ["image-first", "copy-first"]),
      detail("contentRhythm", "Photo rhythm", ["journal", "stacked", "narrative"]),
      detail("sectionTransition", "Photo spacing", ["full-bleed", "background-shift", "whitespace"])
    ],
    preview: { kind: "photo-journal", label: "Full-bleed story" }
  }),
  template({
    id: "arcade-cabinet", name: "Arcade Cabinet", domain: "game", description: "A high-energy play surface framed by score, mode, and status.",
    composition: { navigation: "minimal", heroStructure: "none", heroPriority: "tool-first", ctaModel: "single", contentRhythm: "dense", grid: "asymmetric", informationDensity: "balanced", sectionTransition: "background-shift", pageStructure: "arcade-cabinet" },
    previewDefaults: { colorMode: "dark", accent: "cyan", typography: "display", radius: "slight", density: "normal", neutralTone: "cool", surface: "border", hover: "lift", focusMotion: "expressive", textBehavior: "balance", iconStyle: "filled" },
    brandMotifs: { logoTreatment: "Badge", decorativeMotif: "Cabinet score rails", signatureComponent: "Central game viewport" },
    sections: [{ type: "Game viewport", emphasis: "Primary" }, { type: "Score and level status", emphasis: "Primary" }, { type: "Mode select", emphasis: "Supporting" }],
    preview: { kind: "arcade-cabinet", label: "Play-first cabinet" }
  }),
  template({
    id: "cinematic-game", name: "Cinematic Game", domain: "game", description: "An artwork-led launch screen with restrained chrome and story beats.",
    composition: { navigation: "hidden", heroStructure: "full-screen", heroPriority: "image-first", ctaModel: "single", contentRhythm: "narrative", grid: "single-column", informationDensity: "spacious", sectionTransition: "full-bleed", pageStructure: "cinematic-game" },
    previewDefaults: { colorMode: "dark", accent: "amber", typography: "display", radius: "square", density: "spacious", neutralTone: "cool", surface: "flat", hover: "tint", focusMotion: "expressive", textBehavior: "balance", iconStyle: "outline" },
    brandMotifs: { logoTreatment: "Wordmark", decorativeMotif: "Atmospheric key art", backgroundTreatment: "Cinematic full bleed" },
    sections: [{ type: "Game title opening", emphasis: "Primary" }, { type: "World story", emphasis: "Primary" }, { type: "Chapter and trailer prompt", emphasis: "Supporting" }],
    preview: { kind: "cinematic-game", label: "Artwork-led story" }
  }),
  template({
    id: "retro-console", name: "Retro Console", domain: "game", description: "A compact state-driven console with menu, lives, and control hints.",
    composition: { navigation: "minimal", heroStructure: "none", heroPriority: "tool-first", ctaModel: "inline", contentRhythm: "dense", grid: "traditional", informationDensity: "compact", sectionTransition: "border", pageStructure: "retro-console" },
    previewDefaults: { colorMode: "dark", accent: "lime", typography: "mono", radius: "square", density: "compact", neutralTone: "cool", surface: "border", hover: "tint", focusMotion: "minimal", textBehavior: "wrap", iconStyle: "outline" },
    brandMotifs: { logoTreatment: "Lettermark", decorativeMotif: "Pixel status lines", signatureComponent: "State and inventory console" },
    sections: [{ type: "Console status", emphasis: "Primary" }, { type: "Game menu", emphasis: "Primary" }, { type: "Inventory and controls", emphasis: "Supporting" }],
    preview: { kind: "retro-console", label: "Compact game state" }
  }),
  template({
    id: "publication-index", name: "Publication Index", domain: "blog", description: "A masthead-led publication where story hierarchy begins immediately.",
    composition: { navigation: "index", heroStructure: "none", heroPriority: "copy-first", ctaModel: "none", contentRhythm: "index", grid: "editorial", informationDensity: "compact", sectionTransition: "border", pageStructure: "publication-index" },
    previewDefaults: { colorMode: "light", accent: "indigo", typography: "serif", radius: "square", density: "compact", neutralTone: "cool", surface: "flat", hover: "border", focusMotion: "minimal", textBehavior: "pretty", iconStyle: "outline" },
    brandMotifs: { logoTreatment: "Wordmark", decorativeMotif: "Editorial rules", signatureComponent: "Lead and secondary story index" },
    sections: [{ type: "Publication masthead", emphasis: "Primary" }, { type: "Lead story", emphasis: "Primary" }, { type: "Article index", emphasis: "Primary" }],
    preview: { kind: "publication-index", label: "Story-first index" }
  }),
  template({
    id: "longform-journal", name: "Longform Journal", domain: "blog", description: "A quiet reading column shaped by type, context, and whitespace.",
    composition: { navigation: "minimal", heroStructure: "editorial", heroPriority: "copy-first", ctaModel: "none", contentRhythm: "journal", grid: "single-column", informationDensity: "spacious", sectionTransition: "whitespace", pageStructure: "longform-journal" },
    previewDefaults: { colorMode: "light", accent: "amber", typography: "serif", radius: "square", density: "spacious", neutralTone: "warm", surface: "flat", hover: "border", focusMotion: "minimal", textBehavior: "pretty", iconStyle: "outline" },
    brandMotifs: { logoTreatment: "Wordmark", decorativeMotif: "Margin notes", signatureComponent: "Measured reading column" },
    sections: [{ type: "Article opening", emphasis: "Primary" }, { type: "Essay body", emphasis: "Primary" }, { type: "Author and reading context", emphasis: "Supporting" }],
    preview: { kind: "longform-journal", label: "Reading-first essay" }
  }),
  template({
    id: "visual-magazine", name: "Visual Magazine", domain: "blog", description: "An expressive cover story with offset imagery and headline rhythm.",
    composition: { navigation: "minimal", heroStructure: "asymmetric", heroPriority: "image-first", ctaModel: "none", contentRhythm: "magazine", grid: "asymmetric", informationDensity: "balanced", sectionTransition: "overlap", pageStructure: "visual-magazine" },
    previewDefaults: { colorMode: "light", accent: "rose", typography: "display", radius: "slight", density: "normal", neutralTone: "warm", surface: "flat", hover: "lift", focusMotion: "gentle", textBehavior: "balance", iconStyle: "filled" },
    brandMotifs: { logoTreatment: "Wordmark", decorativeMotif: "Cropped issue type", signatureComponent: "Offset cover story" },
    sections: [{ type: "Magazine cover", emphasis: "Primary" }, { type: "Image-led features", emphasis: "Primary" }, { type: "Culture index", emphasis: "Supporting" }],
    preview: { kind: "visual-magazine", label: "Image-led issue" }
  })
];

const decisionMap = new Map(decisions.map((decision) => [decision.id, decision]));
const templateMap = new Map(templates.map((item) => [item.id, item]));

export const previewDefaults = {
  colorMode: "both", accent: "amber", typography: "sans", radius: "rounded", density: "normal", neutralTone: "cool",
  surface: "border", hover: "tint", focusMotion: "gentle", textBehavior: "wrap", iconStyle: "outline"
};

export function domainFor(id) {
  return domains.find((domain) => domain.id === id);
}

export function getTemplatesForDomain(domainId) {
  return templates.filter((item) => item.domain === domainId && item.status === "active");
}

export function getTemplateById(templateId) {
  return templateMap.get(templateId);
}

export function decisionFor(id) {
  return decisionMap.get(id);
}

export function labelFor(decisionId, optionId) {
  return decisionFor(decisionId)?.options.find((item) => item.id === optionId)?.label ?? optionId;
}

export function isValidDecisionOption(decisionId, optionId) {
  return Boolean(decisionFor(decisionId)?.options.some((item) => item.id === optionId));
}

function baseTemplateStyle(selectedTemplate, includePreviewDefaults) {
  if (!selectedTemplate) return null;
  const style = {
    template: { id: selectedTemplate.id, name: selectedTemplate.name, domain: selectedTemplate.domain },
    composition: { ...selectedTemplate.composition },
    visual: includePreviewDefaults ? { ...previewDefaults, ...selectedTemplate.previewDefaults } : {}
  };
  if (selectedTemplate.brandMotifs && Object.keys(selectedTemplate.brandMotifs).length) style.brandMotifs = { ...selectedTemplate.brandMotifs };
  if (selectedTemplate.sections?.length) style.sections = selectedTemplate.sections.map((section) => ({ ...section }));
  return style;
}

function applyVisualSelections(target, source, allowedIds) {
  for (const decisionId of allowedIds) {
    const value = source?.[decisionId];
    if (!isValidDecisionOption(decisionId, value)) continue;
    target[decisionId] = value;
  }
  if (target.accent === "custom" && typeof source?.customAccent === "string") target.customAccent = source.customAccent;
}

export function templateDetailControls(selectedTemplate) {
  if (!selectedTemplate) return [];
  return selectedTemplate.templateDetails.map((config) => {
    const decision = decisionFor(config.id);
    if (!decision) return null;
    return {
      ...decision,
      title: config.title ?? decision.title,
      options: decision.options
        .filter((item) => config.options.includes(item.id))
        .map((item) => ({ ...item, label: config.optionLabels?.[item.id] ?? item.label }))
    };
  }).filter(Boolean);
}

export function isAvailableTemplateDetailOption(selectedTemplate, decisionId, optionId) {
  const detailConfig = selectedTemplate?.templateDetails.find((item) => item.id === decisionId);
  return Boolean(detailConfig?.options.includes(optionId) && isValidDecisionOption(decisionId, optionId));
}

function applyTemplateDetailSelections(style, selectedTemplate, selections = {}) {
  for (const [decisionId, value] of Object.entries(selections)) {
    if (!isAvailableTemplateDetailOption(selectedTemplate, decisionId, value)) continue;
    const decision = decisionFor(decisionId);
    style[decision.layer][decisionId] = value;
  }
}

export function resolvePreviewStyle(selectedTemplate, selections = {}) {
  const previewStyle = baseTemplateStyle(selectedTemplate, true);
  if (!previewStyle) return null;
  applyVisualSelections(previewStyle.visual, selections.essentials, essentialDecisionIds);
  applyVisualSelections(previewStyle.visual, selections.optional, optionalDecisionIds);
  applyTemplateDetailSelections(previewStyle, selectedTemplate, selections.templateDetails);
  return previewStyle;
}

export function resolveExportStyle(selectedTemplate, selections = {}) {
  const exportStyle = baseTemplateStyle(selectedTemplate, false);
  if (!exportStyle) return null;
  applyVisualSelections(exportStyle.visual, selections.essentials, essentialDecisionIds);
  applyVisualSelections(exportStyle.visual, selections.optional, optionalDecisionIds);
  applyTemplateDetailSelections(exportStyle, selectedTemplate, selections.templateDetails);
  return exportStyle;
}

export function getEssentialProgress(essentials = {}) {
  const selectedIds = essentialDecisionIds.filter((decisionId) => {
    if (!isValidDecisionOption(decisionId, essentials[decisionId])) return false;
    return decisionId !== "accent" || essentials.accent !== "custom" || /^#[0-9a-f]{6}$/i.test(essentials.customAccent ?? "");
  });
  return {
    selected: selectedIds.length,
    total: essentialDecisionIds.length,
    complete: selectedIds.length === essentialDecisionIds.length,
    missing: essentialDecisionIds.filter((decisionId) => !selectedIds.includes(decisionId))
  };
}

// Kept as a compatibility wrapper for callers that still pass a flat V1-style map.
export function resolveEffectiveStyle(selectedTemplate, flatSelections = {}) {
  const grouped = { essentials: {}, optional: {}, templateDetails: {} };
  for (const [decisionId, value] of Object.entries(flatSelections)) {
    if (essentialDecisionIds.includes(decisionId) || decisionId === "customAccent") grouped.essentials[decisionId] = value;
    else if (optionalDecisionIds.includes(decisionId)) grouped.optional[decisionId] = value;
    else grouped.templateDetails[decisionId] = value;
  }
  return resolvePreviewStyle(selectedTemplate, grouped);
}

export function clearOverride(overrides = {}, decisionId) {
  const next = { ...overrides };
  delete next[decisionId];
  if (decisionId === "accent") delete next.customAccent;
  return next;
}
