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
- `just clean` - Remove build artifacts

## Structure

- `/content/programming/` - Blog posts
- `/content/photography/` - Photo gallery
- `/content/experience/` - Resume
- `/themes/sigsegv-minimal/` - Custom theme
- `/static/photography/` - Photos to ingest. Root is gitignored. Building will produce a /dist/* folder with photos to publish to web.
