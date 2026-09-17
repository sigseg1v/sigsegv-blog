# sigsegv.land

My personal blog.

## Quick Start

```bash
# Install dependencies (Hugo + npm packages)
just install

# Serve locally
just serve

# Build for production
just build
```

## Commands

- `just serve` - Build and start local development server
- `just build` - Build and compile static site
- `just build-css` - Build CSS only
- `just new-post "title"` - Create new blog post
- `just test` - Sanity-check the built site in `public/` (run after `just build`)
- `just clean` - Remove build artifacts

## Deploying

Push to `main`. GitHub Actions builds the site with Hugo, runs `npm test` against the output, and deploys to Pages.
`public/` is not tracked. Do not commit it.

Photos are the exception: originals are gitignored, so CI can't process them. After adding photos, run
`just process-photos` and commit `static/photography/dist/`.

## Structure

- `/content/programming/` - Blog posts
- `/content/photography/` - Photo gallery
- `/content/experience/` - Resume
- `/themes/sigsegv-minimal/` - Custom theme
- `/static/photography/` - Photos to ingest. Root is gitignored. Building will produce a /dist/* folder with photos to publish to web.
