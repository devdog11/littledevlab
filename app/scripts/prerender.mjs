// Renders each page to static HTML and injects it into the built shell, so the
// deployed site ships real crawlable markup instead of an empty React root.
import { readFileSync, writeFileSync, existsSync, cpSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const appRoot = resolve(here, '..');
const siteRoot = resolve(appRoot, '..');
const dist = resolve(appRoot, 'dist');

const { pages } = JSON.parse(readFileSync(resolve(appRoot, 'pages.manifest.json'), 'utf8'));
const { render } = await import(resolve(appRoot, 'dist-ssr/entry-server.js'));

const PLACEHOLDER = '<!--app-html-->';

let count = 0;
for (const page of pages) {
  if (!existsSync(resolve(appRoot, page.entry))) continue;

  const builtPath = resolve(dist, page.path);
  if (!existsSync(builtPath)) {
    throw new Error(`expected built shell at ${builtPath}`);
  }

  const shell = readFileSync(builtPath, 'utf8');
  if (!shell.includes(PLACEHOLDER)) {
    throw new Error(`no ${PLACEHOLDER} placeholder in ${page.path}`);
  }

  const html = render(page.component);
  writeFileSync(builtPath, shell.replace(PLACEHOLDER, html));
  count++;
  console.log(`  prerendered ${page.path} (${html.length.toLocaleString()} chars)`);
}

// Images (and the GLB models the 3D viewers load) live at the site root and are
// referenced as /images/..., so they have to ship alongside the built pages.
cpSync(resolve(siteRoot, 'images'), resolve(dist, 'images'), { recursive: true });

console.log(`prerendered ${count} page(s), copied images/`);
