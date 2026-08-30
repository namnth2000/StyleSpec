# Project

StyleSpec is a client-side web tool for turning a user's chosen design direction and visual preferences into a reusable DESIGN.md for AI coding agents.

Current implementation is V2. Requirements and acceptance criteria are in docs/Project_Spec.md.

# Tech

- Static HTML, CSS and vanilla JavaScript ES modules.
- No application framework or runtime dependency is required today.
- The main flow has no backend, account system, external API or AI generation.
- Production domain: stylespec.namnth.com.
- Keep the product deterministic and client-side unless the spec changes.

# Commands

- Run locally: python3 -m http.server 4173
- Unit tests: npm test
- Syntax + unit checks: npm run check
- No build step is required.

# Product source of truth

Use the docs in this order:

1. docs/Project_Spec.md - target V2 requirements and acceptance criteria.
2. docs/Template_System.md - template data model, inheritance and exporter contract.
3. docs/Template_Catalog.md - initial design directions.
4. docs/Template_Research_Guideline.md - rules for adding or reusing templates.
5. docs/StyleSpec.md - product concept and positioning.
6. docs/Minimal_UI_Identity.md - identity model.
7. docs/Roadmap.md - phased scope.

# V2 decisions

- StyleSpec V2 is Template + Composition, not only a visual preference builder.
- The first user choice is domain, followed by a design direction/template.
- Selecting a template is an explicit structural choice. Template composition, Brand Motifs and Section Intent are valid export decisions; visual preview defaults are not.
- Northstar is one template, not the universal preview.
- Do not force every template into badge + giant hero + description + two CTA + cards.
- Templates must be structurally distinct, not color/font variants of the same layout.
- Core V2 domains are Tool / Utility, Software / SaaS, Portfolio and Wedding.
- Game and more domains belong to V2.x unless the product spec changes.
- Template data should own Composition DNA, visual Preview Defaults, optional Brand/Section intent and a small Template Details schema.
- State may keep Essential selections, common Optional selections and template-specific selections separate internally, but preview defaults must remain outside explicit user selections.
- Every template exposes the same 5 required Essentials: Color mode, Accent, Typography, Radius and Density.
- Preview resolves Template Structure + Preview Defaults + explicit selections.
- Export resolves Template Structure + 5 Essentials + explicit Optional selections and stays locked until all Essentials are selected. Template-specific refinements are presented to users inside the same Optional Details group.
- Explicit selection equal to a preview default must remain present in state and count toward readiness.
- Clear on any Optional detail returns preview to the template fallback and omits that explicit decision from export.
- A field that is neither in the selected template nor explicitly overridden must not appear in the export.
- Preview-only fallback must never become an export decision.
- DESIGN.md generation remains deterministic and does not use AI.
- Do not add implementation advice, hidden token values, framework recommendations or generic rules that the user/template did not choose.
- Keep research provenance and license metadata internal. Never export those into DESIGN.md.
- Template implementations should be data-driven. Avoid scattering template-specific conditionals across unrelated DOM/CSS/JS.
- Reuse existing V1 visual controls where they still fit the V2 model instead of duplicating them.
- Preserve a neutral StyleSpec chrome that does not compete with template previews.
- Customize shows exactly two visible groups: always-open 5 Essentials and one collapsed Optional Details group. Template-specific refinements live inside Optional Details, not in a separate third group.
- Clicking between templates must preserve the current viewport. Never auto-scroll to Customize, Export, or another section after template selection.
- Components and States can stay shared samplers, but Page preview must be template-specific.
- Mobile rendering must preserve the template's composition identity rather than collapsing every template into the same generic vertical layout.
- Logo treatment and section archetypes need schema support, but a full logo editor and section editor are not V2 core.
- Deterministic HTML/CSS/JS code export is outside V2 core.

# Template quality

Before adding a template:

- Check Template_Research_Guideline.md.
- Require meaningful structural divergence.
- Prefer original synthesis.
- Verify licenses before reusing any code or asset.
- Commercial templates and unclear-license sources are inspiration only unless explicit rights allow reuse.

# V2 implementation map

- `src/data.js` owns domains, templates, decision metadata, selection groups, and the Preview/Export resolvers.
- `src/preview.js` owns the template thumbnail and Page preview renderer registries.
- `src/design.js` owns preview-only visual fallback calculations and deterministic DESIGN.md export.
- `src/app.js` owns state, explicit selection maps and the Domain -> Template -> Customize -> Preview -> Export flow.
- Components and States remain shared samplers and consume the current Preview Style.
- `tool/browser-qa.mjs` verifies the major desktop and 375px mobile flows through Chromium DevTools Protocol.

# UI regression guardrails

- Treat "Template + Composition" as internal product terminology. Do not surface it as a user-facing kicker or label unless the product copy is explicitly changed.
- When changing icon rendering or Icon Style, verify Outline, Filled and Duotone across every existing preview icon, not only the icon shown in a bug report.
- Outline icons must remain legible strokes. Filled icons must preserve intentional negative space such as document lines, pin holes and similar cutouts instead of becoming solid blobs.
- For small geometric UI glyphs such as expand/collapse controls, center the geometry explicitly rather than relying on font glyph alignment.

# Before completing a task

- Run relevant checks.
- Fix failures caused by the change.
- Review changed behavior and diff.
- Report anything that could not be verified.
