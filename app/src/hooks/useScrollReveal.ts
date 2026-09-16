import { useEffect } from 'react';

const REVEAL_SELECTOR =
  '.product-block, .section-header, .about-content, .process-step, .sheet-titleblock, #contact .container > *';

/** Fades elements in as they scroll into view. */
export function useScrollReveal() {
  useEffect(() => {
    const targets = Array.from(document.querySelectorAll(REVEAL_SELECTOR));
    targets.forEach((el) => el.classList.add('reveal'));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in-view');
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}
