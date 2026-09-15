import { useCallback, useEffect, useRef, useState } from 'react';
import type { ProductThumb } from '../data/products';

interface ProductThumbsProps {
  thumbs: ProductThumb[];
  activeSrc: string;
  onSelect: (src: string) => void;
}

export function ProductThumbs({ thumbs, activeSrc, onSelect }: ProductThumbsProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<number | undefined>(undefined);
  const [edges, setEdges] = useState({ left: false, right: false });

  const updateEdges = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setEdges({ left: el.scrollLeft > 4, right: el.scrollLeft < maxScroll - 4 });
  }, []);

  useEffect(() => {
    updateEdges();
    return () => window.clearInterval(timerRef.current);
  }, [updateEdges, thumbs]);

  const startScroll = (dir: number) => {
    window.clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => {
      const el = scrollerRef.current;
      if (!el) return;
      el.scrollLeft += dir * 8;
      updateEdges();
    }, 16);
  };

  const stopScroll = () => window.clearInterval(timerRef.current);

  return (
    <div
      className={`product-thumbs-wrap${edges.left ? ' scrollable-left' : ''}${
        edges.right ? ' scrollable-right' : ''
      }`}
    >
      <div
        className="thumb-scroll-zone left"
        onMouseEnter={() => startScroll(-1)}
        onMouseLeave={stopScroll}
      >
        ❮
      </div>
      <div className="product-thumbs" ref={scrollerRef} onScroll={updateEdges}>
        {thumbs.map((t) => (
          <img
            key={t.src}
            src={t.src}
            alt={t.alt}
            className={t.src === activeSrc ? 'active' : undefined}
            onClick={() => onSelect(t.src)}
          />
        ))}
      </div>
      <div
        className="thumb-scroll-zone right"
        onMouseEnter={() => startScroll(1)}
        onMouseLeave={stopScroll}
      >
        ❮
      </div>
    </div>
  );
}
