# StyleSpec

StyleSpec is an open-source, client-side web tool that helps people choose a UI direction visually and export it as a deterministic `DESIGN.md` for AI coding agents.

> Don't ask AI to guess your taste.

## What it does

StyleSpec uses a deterministic Template + Composition flow:

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

Current scope:

- 6 domains: Tool / Utility, Software / SaaS, Portfolio, Wedding, Game and Blog / Editorial.
- 18 structurally distinct templates.
- Template-owned Composition DNA, Visual DNA, Brand Motifs and Section Intent.
- 5 required Essentials plus optional refinements.
- Template-specific Page previews plus shared Components and States samplers.
- Deterministic `DESIGN.md` generation.
- Custom accent colors and deterministic preview calculations.
- Responsive desktop and mobile flows.
- No account, backend, AI generation or external API.

## Run locally

The application is static and has no runtime dependencies.

~~~bash
python3 -m http.server 4173
~~~

Open `http://localhost:4173`.

## Checks

Node.js is only used for development checks.

~~~bash
npm test
npm run check
~~~

`tool/browser-qa.mjs` contains the Chromium DevTools Protocol regression flow used for desktop and 375px mobile verification.

## Deployment

Production domain: `stylespec.namnth.com`.

Cloudflare Pages can deploy the repository root directly with no build step. See [docs/Deployment.md](docs/Deployment.md).

## Product docs

- [docs/Project_Spec.md](docs/Project_Spec.md) - V2 implementation source of truth.
- [docs/StyleSpec.md](docs/StyleSpec.md) - product concept and positioning.
- [docs/Minimal_UI_Identity.md](docs/Minimal_UI_Identity.md) - Composition Identity + Visual Identity model.
- [docs/Template_System.md](docs/Template_System.md) - template data, inheritance and export model.
- [docs/Template_Catalog.md](docs/Template_Catalog.md) - design directions.
- [docs/Template_Research_Guideline.md](docs/Template_Research_Guideline.md) - research, divergence and license rules.

## Contributing

Contributions are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

StyleSpec is licensed under the [MIT License](LICENSE).
