# Contributing to StyleSpec

Thanks for helping improve StyleSpec.

StyleSpec is intentionally small: static HTML, CSS and vanilla JavaScript with deterministic client-side behavior. Contributions should preserve that simplicity unless the product requirements clearly need something else.

## Before you start

Please read:

1. `AGENTS.md`
2. `docs/Project_Spec.md`
3. The most relevant template or system document for the change

For larger product changes, open an issue or discussion first so the intended behavior is clear before implementation.

## Run locally

~~~bash
python3 -m http.server 4173
~~~

Open `http://localhost:4173`.

## Checks

Run the relevant checks before submitting a change:

~~~bash
npm test
npm run check
~~~

For UI changes, also verify the affected desktop and mobile flows. The repository includes `tool/browser-qa.mjs` for the existing browser regression flow.

## Contribution guidelines

- Preserve deterministic preview and export behavior.
- Keep the application client-side unless the product spec changes.
- Prefer existing patterns over new abstractions.
- Do not add dependencies without a current product need.
- Keep templates structurally distinct rather than producing color or font variants of the same composition.
- Preserve the separation between preview defaults and explicit user selections.
- Avoid unrelated refactors in focused changes.
- Update documentation when product truth changes.
- Do not include third-party code or assets unless their license allows the intended reuse.

## Commit messages

Use a short conventional prefix:

- `feat:` new user-visible capability
- `fix:` bug or regression fix
- `docs:` documentation only
- `refactor:` internal restructuring without behavior change
- `test:` tests only
- `chore:` maintenance or repository configuration

Examples:

~~~text
feat: add editorial template direction
fix: preserve viewport when switching templates
docs: clarify export semantics
~~~

## Pull requests

Keep pull requests focused.

Include:

- what changed
- why it changed
- what you verified
- any known limitation

Do not mix unrelated cleanup into the same pull request.

## License

By contributing, you agree that your contribution will be licensed under the repository's MIT License.
