// Generates pages.manifest.json from the original static HTML so page titles
// and meta descriptions are carried over exactly rather than retyped.
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const siteRoot = resolve(here, '../..');

// path relative to site root -> [rollup key, component name]
const MAP = [
  ['index.html', 'home', 'Home'],
  ['products.html', 'products', 'Products'],
  ['build-log.html', 'buildLog', 'BuildLog'],
  ['lab-notes/index.html', 'labNotesIndex', 'LabNotesIndex'],
  ['lab-notes/cloud-native-agentic-workflow.html', 'labNotesCloudNative', 'LabNotesCloudNative'],
  ['lab-notes/hands-on-labs-agentic-ai.html', 'labNotesHandsOn', 'LabNotesHandsOn'],
  ['lab-notes/prompt-and-context-engineering.html', 'labNotesPrompt', 'LabNotesPrompt'],
  ['lab-notes/servicenow-mcp-home-assistant-cloudflare.html', 'labNotesServiceNow', 'LabNotesServiceNow'],
  ['lab-notes/soap-dish-mount-puck.html', 'labNotesSoapDish', 'LabNotesSoapDish'],
  ['in-development/index.html', 'inDevIndex', 'InDevIndex'],
  ['in-development/drawer-organizer.html', 'inDevDrawerOrganizer', 'InDevDrawerOrganizer'],
];

const pages = MAP.map(([path, key, component]) => {
  const html = readFileSync(resolve(siteRoot, path), 'utf8');
  const title = html.match(/<title>([\s\S]*?)<\/title>/i)?.[1].trim() ?? '';
  const description =
    html.match(/<meta\s+name="description"\s+content="([\s\S]*?)"\s*\/?>/i)?.[1].trim() ?? '';
  const modelViewer = /model-viewer(@|\.min\.js)/.test(html);
  const cssFile = path.replace(/\.html$/, '').replace(/\//g, '__') + '.css';
  return { key, path, component, entry: `src/entries/${key}.tsx`, css: `src/styles/${cssFile}`, title, description, modelViewer };
});

const outPath = resolve(here, '../pages.manifest.json');
writeFileSync(outPath, JSON.stringify({ pages }, null, 2) + '\n');
console.log(`wrote ${pages.length} pages to pages.manifest.json`);
for (const p of pages) {
  console.log(`  ${p.path.padEnd(52)} mv=${p.modelViewer ? 'yes' : 'no '} title=${p.title.slice(0, 50)}`);
}
