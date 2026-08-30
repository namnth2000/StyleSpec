# StyleSpec

StyleSpec is a client-side web tool that helps people choose their UI preferences visually and export them as a deterministic DESIGN.md for AI coding agents.

> Don't ask AI to guess your taste.

## Current implementation

StyleSpec V2 is a deterministic Template + Composition system. Its flow is:

~~~text
Choose domain
  ↓
Choose design direction
  ↓
Customize
  ↓
Preview
  ↓
Export DESIGN.md
~~~

- 6 domains: Tool / Utility, Software / SaaS, Portfolio, Wedding, Game and Blog / Editorial.
- 18 structurally distinct templates, with Northstar as one Tool template.
- Template-owned Composition DNA, Visual DNA, Brand Motifs and Section Intent.
- Relevant customization controls with per-decision reset to template defaults.
- One Effective Style resolver shared by Page, Components and States previews and the DESIGN.md exporter.
- Custom accent color support and deterministic preview color calculations.
- Client-side DESIGN.md generation with no account, backend, AI generation or external API.
- Responsive desktop and mobile flows that retain each template's composition identity.

## Run locally

The product is static and has no runtime dependencies.

~~~bash
python3 -m http.server 4173
~~~

Open http://localhost:4173.

## Checks

Node.js is only used for development checks.

~~~bash
npm test
npm run check
~~~

`tool/browser-qa.mjs` contains the Chromium DevTools Protocol regression flow used for desktop and 375px mobile verification.

## Deployment

Deploy the repository root as a static site. Production domain: stylespec.namnth.com.

## Product docs

- [docs/Project_Spec.md](docs/Project_Spec.md) - V2 implementation source of truth.
- [docs/StyleSpec.md](docs/StyleSpec.md) - product concept and positioning.
- [docs/Minimal_UI_Identity.md](docs/Minimal_UI_Identity.md) - Composition Identity + Visual Identity model.
- [docs/Template_System.md](docs/Template_System.md) - template data, inheritance and export model.
- [docs/Template_Catalog.md](docs/Template_Catalog.md) - initial design directions.
- [docs/Template_Research_Guideline.md](docs/Template_Research_Guideline.md) - research, divergence and license rules.
