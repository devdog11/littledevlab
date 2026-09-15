import { useState, type ReactNode } from 'react';
import { ModelViewer } from './ModelViewer';
import { ProductThumbs } from './ProductThumbs';
import type { ProductContent } from '../data/products';

const CHECK = (
  <span className="icon">
    <svg viewBox="0 0 12 12" fill="none">
      <polyline
        points="2,6 5,9 10,3"
        stroke="#2C2820"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </span>
);

interface ProductBlockProps {
  content: ProductContent;
  /** Variant chip groups — behaviour differs per product. */
  variants: ReactNode;
  /** Current hero photo; changes with thumbnails and colour/style variants. */
  mainPhoto: string;
  /** Current model, which some products swap along with the photo. */
  glb: string;
  tint?: string | null;
  onSelectThumb: (src: string) => void;
  onEnlarge: (src: string) => void;
}

export function ProductBlock({
  content,
  variants,
  mainPhoto,
  glb,
  tint,
  onSelectThumb,
  onEnlarge,
}: ProductBlockProps) {
  // The original markup opens every product with the 3D view active.
  const [show3D, setShow3D] = useState(true);
  const key = content.id;

  const gallery = (
    <div className="product-gallery" style={{ backgroundImage: `url('${content.blueprint}')` }}>
      <div className="gallery-view-toggle">
        <button
          id={`${key}-btn-photo`}
          type="button"
          className={!show3D ? 'active' : undefined}
          onClick={() => setShow3D(false)}
        >
          Photo
        </button>
        <button
          id={`${key}-btn-3d`}
          type="button"
          className={show3D ? 'active' : undefined}
          onClick={() => setShow3D(true)}
        >
          Rotate in 3D
        </button>
      </div>

      <ModelViewer id={`${key}-mv`} src={glb} alt={content.mvAlt} tint={tint} active={show3D} />

      <div className="gallery-3d-hint" id={`${key}-hint`} style={{ opacity: show3D ? '1' : '0' }}>
        Drag to rotate · scroll to zoom
      </div>

      <img
        className={`main-photo${show3D ? ' is-3d-hidden' : ''}`}
        id={`${key}-main`}
        src={mainPhoto}
        alt={content.mainAlt}
        onClick={() => onEnlarge(mainPhoto)}
      />
      <div className="gallery-zoom-hint">Click to enlarge</div>

      <ProductThumbs thumbs={content.thumbs} activeSrc={mainPhoto} onSelect={onSelectThumb} />
    </div>
  );

  const info = (
    <div className="product-info">
      <span className="tag">{content.tag}</span>
      <h3>{content.title}</h3>
      {content.price && <div className="price">{content.price}</div>}
      {variants}
      {content.infoBlocks.map((block, i) =>
        block.type === 'p' ? (
          // Authored HTML from this repo (links, <em>), never user input.
          <p key={i} style={block.style} dangerouslySetInnerHTML={{ __html: block.html }} />
        ) : (
          <ul className="product-features" key={i}>
            {block.items.map((item) => (
              <li key={item.slice(0, 40)}>
                {CHECK}
                <span dangerouslySetInnerHTML={{ __html: item }} />
              </li>
            ))}
          </ul>
        ),
      )}
      <div className="product-actions">
        <a href="/index.html#contact" className="btn btn-primary">
          Order This
        </a>
        <a href="/index.html#contact" className="btn btn-outline">
          Request a Variation
        </a>
      </div>
    </div>
  );

  return (
    <div className={`product-block${content.reverse ? ' reverse' : ''}`} id={content.id}>
      {content.reverse ? (
        <>
          {info}
          {gallery}
        </>
      ) : (
        <>
          {gallery}
          {info}
        </>
      )}
    </div>
  );
}
