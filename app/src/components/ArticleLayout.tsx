import type { ReactNode } from 'react';
import { SiteNav } from './SiteNav';
import type { PageId } from '../site';

type ArticleSection = 'lab-notes' | 'in-development';

const SECTION_INDEX: Record<ArticleSection, { href: string; label: string }> = {
  'lab-notes': { href: '/lab-notes/index.html', label: 'All Lab Notes' },
  'in-development': { href: '/in-development/index.html', label: 'All In-Development Entries' },
};

interface ArticleLayoutProps {
  section: ArticleSection;
  children: ReactNode;
}

/** Layout for the lab-notes and in-development pages. */
export function ArticleLayout({ section, children }: ArticleLayoutProps) {
  const index = SECTION_INDEX[section];
  const current: PageId = section;

  return (
    <>
      <SiteNav current={current} />
      {children}
      <footer>
        <div className="container">
          <p>
            © 2026 LittleDevLab · SF Bay Area · <a href={index.href}>{index.label}</a> ·{' '}
            <a href="/index.html">Home</a>
          </p>
        </div>
      </footer>
    </>
  );
}
