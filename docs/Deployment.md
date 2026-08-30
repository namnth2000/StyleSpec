# Deployment

StyleSpec is a static site and can be deployed directly from the repository root.

## Production

- Domain: `stylespec.namnth.com`
- Platform: Cloudflare Pages
- Production branch: `main`
- Framework preset: None
- Build command: leave empty
- Build output directory: `.`
- Root directory: repository root
- Environment variables: none required

## Cloudflare Pages setup

1. Create a new Pages project.
2. Connect the `namnth2000/StyleSpec` repository.
3. Select `main` as the production branch.
4. Use no framework preset and no build command.
5. Set the build output directory to `.`.
6. Deploy.
7. Add `stylespec.namnth.com` under Custom domains.

Cloudflare will manage the DNS record when the custom domain is attached through Pages.

## Verify after deployment

Check:

- the home page loads at `https://stylespec.namnth.com/`
- the favicon loads
- domain selection and template selection work
- Customize updates the live preview
- `DESIGN.md` can be exported after all five Essentials are selected
- the mobile flow works around 375 px
- there is no unintended horizontal overflow

The site does not require a backend, account system or runtime secret.
