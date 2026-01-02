# Hugo static site task runner

# Install dependencies
install:
    @echo "Installing Hugo extended..."
    @which hugo || (echo "Please install Hugo: https://gohugo.io/installation/" && exit 1)
    @hugo version
    @echo "Installing npm dependencies..."
    @npm install

# Build CSS
build-css:
    npm run build:css

# Process photography images (thumbnails + medium sizes)
process-photos:
    @echo "Processing photography images..."
    node scripts/process-photos.js

# Serve the site locally with drafts
serve: build-css process-photos
    hugo server -D --bind 0.0.0.0

# Serve without drafts
serve-prod: build-css process-photos
    hugo server --bind 0.0.0.0

# Build the site for production
build: clean build-css process-photos
    hugo --minify

# Clean build artifacts
clean:
    rm -rf public/ resources/
    rm -rf themes/sigsegv-minimal/static/css/tailwind.css

# Clean processed photos
clean-photos:
    rm -rf static/photography/dist/

# Full clean including photos
clean-all: clean clean-photos

# Create a new blog post
new-post title:
    hugo new programming/{{title}}.md

# Full rebuild (clean + build)
rebuild: clean build

# Default: serve with drafts
default: serve
