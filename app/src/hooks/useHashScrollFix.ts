import { useEffect } from 'react';

/**
 * `scroll-behavior: smooth` turns the browser's initial hash-scroll into an
 * animation aimed at a fixed pixel target. If layout is still settling (3D
 * viewers, images) while that animation plays, the browser stops at a stale
 * position and never corrects itself. Once loading has truly finished, snap
 * instantly to the real position instead.
 */
export function useHashScrollFix() {
  useEffect(() => {
    const correct = () => {
      if (!location.hash) return;
      let target: Element | null;
      try {
        target = document.querySelector(location.hash);
      } catch {
        return;
      }
      if (!target) return;
      const prev = document.documentElement.style.scrollBehavior;
      document.documentElement.style.scrollBehavior = 'auto';
      target.scrollIntoView({ block: 'start' });
      document.documentElement.style.scrollBehavior = prev;
    };

    // Double rAF lets layout from the load event itself (fonts, late image
    // decodes, custom-element upgrades) finish painting first.
    const onLoad = () => {
      requestAnimationFrame(() => requestAnimationFrame(correct));
      // A GLB can still resize things after 'load'; one more pass covers that.
      window.setTimeout(correct, 600);
    };

    if (document.readyState === 'complete') onLoad();
    else window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, []);
}
