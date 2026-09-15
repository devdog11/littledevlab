// Writes the per-page HTML shells Vite uses as multi-page entries. Content is
// injected into <!--app-html--> at prerender time.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const appRoot = resolve(here, '..');
const { pages } = JSON.parse(readFileSync(resolve(appRoot, 'pages.manifest.json'), 'utf8'));

const MODEL_VIEWER_SRC = 'https://unpkg.com/@google/model-viewer@3.5.0/dist/model-viewer.min.js';

// Values came verbatim out of a double-quoted attribute in the original HTML,
// so they cannot contain a raw `"`. Re-emit as-is to preserve entities.
const attr = (s) => s.replace(/"/g, '&quot;');

let written = 0;
for (const page of pages) {
  if (!existsSync(resolve(appRoot, page.entry))) continue;

  const shell = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="icon" type="image/png" href="/images/profile/littledevlab-icon.png" />
  <title>${page.title}</title>
  <meta name="description" content="${attr(page.description)}" />
${page.modelViewer ? `  <script type="module" src="${MODEL_VIEWER_SRC}"></script>\n` : ''}</head>
<body>
  <div id="root"><!--app-html--></div>
  <script type="module" src="/${page.entry}"></script>
</body>
</html>
`;

  const out = resolve(appRoot, page.path);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, shell);
  written++;
}
console.log(`generated ${written} page shell(s)`);
