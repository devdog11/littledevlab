import type { ComponentType } from 'react';
import { renderToString } from 'react-dom/server';

// Every page under src/pages is picked up automatically, so porting a page is
// just adding the file — there is no registry to keep in sync.
const modules = import.meta.glob<{ default: ComponentType }>('./pages/*.tsx', { eager: true });

const byName = new Map<string, ComponentType>();
for (const [path, mod] of Object.entries(modules)) {
  const name = path.split('/').pop()!.replace(/\.tsx$/, '');
  byName.set(name, mod.default);
}

export function render(componentName: string): string {
  const Page = byName.get(componentName);
  if (!Page) {
    throw new Error(
      `No page component named "${componentName}" (have: ${[...byName.keys()].join(', ')})`,
    );
  }
  return renderToString(<Page />);
}
