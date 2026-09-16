import type { ReactNode } from 'react';
import { Nav } from './Nav';
import { Footer } from './Footer';
import type { PageId } from '../site';

interface LayoutProps {
  current: PageId;
  children: ReactNode;
  /** Rendered after the footer, where the original markup puts the lightbox. */
  after?: ReactNode;
}

export function Layout({ current, children, after }: LayoutProps) {
  return (
    <>
      <Nav current={current} />
      {children}
      <Footer current={current} />
      {after}
    </>
  );
}
