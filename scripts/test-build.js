#!/usr/bin/env node
// Sanity checks on the built site in public/. Run after `hugo --minify`.
// CI runs this before deploying, so a broken build never goes live.
const fs = require('fs');
const path = require('path');
const assert = require('assert');
const test = require('node:test');

const ROOT = path.join(__dirname, '..');
const PUBLIC = path.join(ROOT, 'public');
const CONTENT = path.join(ROOT, 'content');

function walk(dir, ext) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? walk(p, ext) : p.endsWith(ext) ? [p] : [];
  });
}

// content/blog/foo.md -> public/blog/foo/index.html, content/blog/_index.md -> public/blog/index.html
function outputFor(md) {
  const rel = path.relative(CONTENT, md).replace(/\.md$/, '');
  return path.join(PUBLIC, rel.replace(/(^|\/)_index$/, ''), 'index.html');
}

const isDraft = (md) => /^draft\s*[:=]\s*true/m.test(fs.readFileSync(md, 'utf8'));

test('every non-draft content file has a built page', () => {
  const missing = walk(CONTENT, '.md')
    .filter((md) => !isDraft(md))
    .map(outputFor)
    .filter((html) => !fs.existsSync(html));
  assert.deepStrictEqual(missing, []);
});

test('tailwind css was generated', () => {
  const css = path.join(PUBLIC, 'css', 'tailwind.css');
  assert.ok(fs.existsSync(css) && fs.statSync(css).size > 1000, 'public/css/tailwind.css missing or empty');
});

test('photography page shows every processed photo', () => {
  const thumbs = fs.readdirSync(path.join(ROOT, 'static/photography/dist/thumbnails')).filter((f) => /\.jpe?g$/i.test(f));
  assert.ok(thumbs.length > 0, 'no thumbnails in static/photography/dist/thumbnails');
  const html = fs.readFileSync(path.join(PUBLIC, 'photography', 'index.html'), 'utf8');
  for (const t of thumbs) {
    assert.ok(html.includes(`/photography/dist/thumbnails/${t}`), `${t} not on photography page`);
    assert.ok(fs.existsSync(path.join(PUBLIC, 'photography/dist/medium', t.replace(/\.[^.]+$/, '.jpg'))), `medium version of ${t} not published`);
  }
});

test('internal links and assets resolve', () => {
  const broken = [];
  for (const file of walk(PUBLIC, '.html')) {
    const html = fs.readFileSync(file, 'utf8');
    // --minify drops quotes around attribute values, so handle both forms
    for (const [, , raw] of html.matchAll(/\b(href|src)=["']?([^"'\s>]+)/g)) {
      const url = raw.replace(/^https?:\/\/sigsegv\.land/, '');
      if (!url.startsWith('/') || url.startsWith('//')) continue;
      const target = path.join(PUBLIC, decodeURIComponent(url.split(/[?#]/)[0]));
      const ok = fs.existsSync(target) && (fs.statSync(target).isFile() || fs.existsSync(path.join(target, 'index.html')));
      if (!ok) broken.push(`${path.relative(PUBLIC, file)} -> ${url}`);
    }
  }
  assert.deepStrictEqual(broken, []);
});
