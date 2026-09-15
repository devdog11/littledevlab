import { useState } from 'react';
import { Layout } from '../components/Layout';
import { Lightbox } from '../components/Lightbox';
import { ProductBlock } from '../components/ProductBlock';
import { VariantGroup } from '../components/VariantGroup';
import { SheetTitleBlock, SITE_TITLE_BLOCK } from '../components/SheetTitleBlock';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useHashScrollFix } from '../hooks/useHashScrollFix';
import { landingTiles, products } from '../data/products';

const byId = (id: string) => {
  const p = products.find((x) => x.id === id);
  if (!p) throw new Error(`missing product ${id}`);
  return p;
};

const WHITE = 'F8F4EA';
const BLACK = '1C1A16';

export default function Products() {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  useScrollReveal();
  useHashScrollFix();
  const enlarge = (src: string) => setLightboxSrc(src);

  // ── Trading card display: colour swaps the rendered photo and tints the model.
  const gaming = byId('gaming-card-display');
  const [gamingPhoto, setGamingPhoto] = useState(gaming.mainPhoto);
  const [gamingColor, setGamingColor] = useState('Warm White');
  const [gamingTint, setGamingTint] = useState<string | null>(WHITE);
  const gamingColorPick = (slug: string, hex: string) => {
    setGamingPhoto(`/images/gaming-card-display/gaming-card-display-${slug}.png`);
    setGamingTint(hex);
  };

  // ── Glasses holder: size swaps model + photo, colour only tints the model.
  const glasses = byId('glasses-holder');
  const GLASSES_GLB: Record<string, string> = {
    '3-Lens': '/images/glasses/three-contacts+glasses.glb',
    '2-Lens (15-Day)': '/images/glasses/15-days-2-lens.glb',
  };
  const GLASSES_PHOTO: Record<string, string> = {
    '3-Lens': '/images/glasses/glasses-holder-counter.jpg',
    '2-Lens (15-Day)': '/images/glasses/15-days-2-lens-white.png',
  };
  const [glassesSize, setGlassesSize] = useState('2-Lens (15-Day)');
  const [glassesPhoto, setGlassesPhoto] = useState(glasses.mainPhoto);
  const [glassesGlb, setGlassesGlb] = useState(glasses.glb);
  const [glassesColor, setGlassesColor] = useState('Warm White');
  const [glassesTint, setGlassesTint] = useState<string | null>(WHITE);

  // ── Coaster holder: shape swaps the real photo + model; colour is a 3D tint
  // only, because the photos are real prints in their actual filament colour.
  const coaster = byId('coaster-holder');
  const [coasterShape, setCoasterShape] = useState('Round');
  const [coasterPhoto, setCoasterPhoto] = useState(coaster.mainPhoto);
  const [coasterGlb, setCoasterGlb] = useState(coaster.glb);
  const [coasterColor, setCoasterColor] = useState('Olive / Khaki');
  const [coasterTint, setCoasterTint] = useState<string | null>('6B6454');
  const pickShape = (shape: 'round' | 'hexagonal') => {
    if (shape === 'round') {
      setCoasterPhoto('/images/coasters/coaster-round-tan.jpg');
      setCoasterGlb('/images/coasters/chilewich-round.glb');
    } else {
      setCoasterPhoto('/images/coasters/coaster-hex-holder.jpg');
      setCoasterGlb('/images/coasters/chilewich-hexagonal.glb');
    }
  };

  // ── Hunter Douglas: style and colour combine into one filename.
  // Carried over as-is from the original page, which starts out inconsistent:
  // the chip and hero photo say 2-Gang while the model and the style used to
  // build filenames are the 3M claw. Picking a colour therefore switches the
  // photo to the claw variant. Preserved rather than silently corrected.
  const hd = byId('hunter-douglas-mount');
  const HD_GLB: Record<string, string> = {
    'wall-mount-3m-claw': '/images/hunter-douglass/hunter-douglas-wall-mount-3m-claw.glb',
    '2-gang': '/images/hunter-douglass/hunter-douglas-2-gang.glb',
    '1-gang': '/images/hunter-douglass/hd-1-gang.glb',
  };
  const HD_STYLE_SLUG: Record<string, string> = {
    '3M Claw': 'wall-mount-3m-claw',
    '1-Gang': '1-gang',
    '2-Gang': '2-gang',
  };
  const [hdStyleSlug, setHdStyleSlug] = useState('wall-mount-3m-claw');
  const [hdColorSlug, setHdColorSlug] = useState('white');
  const [hdStyleChip, setHdStyleChip] = useState('2-Gang');
  const [hdColorChip, setHdColorChip] = useState('Warm White');
  const [hdPhoto, setHdPhoto] = useState(hd.mainPhoto);
  const [hdGlb, setHdGlb] = useState(hd.glb);
  const [hdTint, setHdTint] = useState<string | null>(null);
  const hdUpdate = (styleSlug: string, colorSlug: string) => {
    setHdPhoto(`/images/hunter-douglass/hunter-douglas-${styleSlug}-${colorSlug}.png`);
    if (HD_GLB[styleSlug]) setHdGlb(HD_GLB[styleSlug]);
    setHdTint(colorSlug === 'black' ? BLACK : WHITE);
  };

  // ── Steak knife holder and ZBiotic carrier: colour swaps photo + tints.
  const knife = byId('steak-knife-holder');
  const [knifePhoto, setKnifePhoto] = useState(knife.mainPhoto);
  const [knifeColor, setKnifeColor] = useState('Matte Black');
  const [knifeTint, setKnifeTint] = useState<string | null>(null);
  const knifePick = (slug: string, hex: string) => {
    setKnifePhoto(`/images/knives-holder/steak-knife-holder-${slug}.png`);
    setKnifeTint(hex);
  };

  const zbiotic = byId('zbiotic-gift-box');
  const [zbioticPhoto, setZbioticPhoto] = useState(zbiotic.mainPhoto);
  const [zbioticColor, setZbioticColor] = useState('Warm White');
  const [zbioticTint, setZbioticTint] = useState<string | null>(null);
  const zbioticPick = (slug: string, hex: string) => {
    setZbioticPhoto(`/images/six-pack-gift-zbiotic/zbiotic-six-pack-gift-box-${slug}.png`);
    setZbioticTint(hex);
  };

  return (
    <Layout
      current="products"
      after={<Lightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />}
    >
      <section id="products">
        <div className="container">
          <div className="section-header">
            <span className="tag">Products</span>
            <h2>Designed for the things you actually use every day</h2>
            <p>
              Each product starts as a problem — a cluttered counter, a misplaced lens case — and
              ends as a clean, permanent solution. Designed in Shapr3D, printed on Bambu Lab.
            </p>
          </div>

          <div className="products-landing-grid">
            {landingTiles.map((t) => (
              <a className={`products-landing-tile ${t.tone}`} href={t.href} key={t.href}>
                <img
                  src={t.src}
                  alt={t.alt}
                  loading="lazy"
                  style={t.objectPosition ? { objectPosition: t.objectPosition } : undefined}
                />
                <span>{t.label}</span>
              </a>
            ))}
          </div>

          <ProductBlock
            content={gaming}
            mainPhoto={gamingPhoto}
            glb={gaming.glb}
            tint={gamingTint}
            onSelectThumb={setGamingPhoto}
            onEnlarge={enlarge}
            variants={
              <div className="product-variants">
                <VariantGroup
                  label="Available colors"
                  selected={gamingColor}
                  onChange={setGamingColor}
                  options={[
                    { label: 'Warm White', onSelect: () => gamingColorPick('white', WHITE) },
                    { label: 'Matte Black', onSelect: () => gamingColorPick('black', BLACK) },
                    { label: 'Custom Color' },
                  ]}
                />
              </div>
            }
          />

          <ProductBlock
            content={glasses}
            mainPhoto={glassesPhoto}
            glb={glassesGlb}
            tint={glassesTint}
            onSelectThumb={setGlassesPhoto}
            onEnlarge={enlarge}
            variants={
              <>
                <div className="product-variants">
                  <VariantGroup
                    label="Holder size"
                    selected={glassesSize}
                    onChange={(label) => {
                      setGlassesSize(label);
                      if (GLASSES_GLB[label]) setGlassesGlb(GLASSES_GLB[label]);
                      if (GLASSES_PHOTO[label]) setGlassesPhoto(GLASSES_PHOTO[label]);
                    }}
                    options={[{ label: '3-Lens' }, { label: '2-Lens (15-Day)' }]}
                  />
                </div>
                <div className="product-variants">
                  <VariantGroup
                    label="Available colors"
                    selected={glassesColor}
                    onChange={setGlassesColor}
                    options={[
                      { label: 'Warm White', onSelect: () => setGlassesTint(WHITE) },
                      { label: 'Matte Black', onSelect: () => setGlassesTint(BLACK) },
                      { label: 'Light Gray', onSelect: () => setGlassesTint('A49A82') },
                      { label: 'Custom Color' },
                    ]}
                  />
                </div>
              </>
            }
          />

          <ProductBlock
            content={coaster}
            mainPhoto={coasterPhoto}
            glb={coasterGlb}
            tint={coasterTint}
            onSelectThumb={setCoasterPhoto}
            onEnlarge={enlarge}
            variants={
              // Shape and Color share one .product-variants div in the original
              // markup, matching its DOM exactly.
              <div className="product-variants">
                <VariantGroup
                  label="Shape"
                  selected={coasterShape}
                  onChange={(label) => {
                    setCoasterShape(label);
                    pickShape(label === 'Round' ? 'round' : 'hexagonal');
                  }}
                  options={[{ label: 'Round' }, { label: 'Hexagonal' }]}
                />
                <VariantGroup
                  label="Color"
                  selected={coasterColor}
                  onChange={setCoasterColor}
                  tagStyle={{ marginTop: '12px' }}
                  options={[
                    { label: 'Olive / Khaki', onSelect: () => setCoasterTint('6B6454') },
                    { label: 'Matte Black', onSelect: () => setCoasterTint(BLACK) },
                    { label: 'Natural Tan', onSelect: () => setCoasterTint('C9B896') },
                    { label: 'Classic Birch', onSelect: () => setCoasterTint('918669') },
                    { label: 'Black Walnut', onSelect: () => setCoasterTint('4F3F24') },
                    { label: 'Custom Color' },
                  ]}
                />
              </div>
            }
          />

          <ProductBlock
            content={hd}
            mainPhoto={hdPhoto}
            glb={hdGlb}
            tint={hdTint}
            onSelectThumb={setHdPhoto}
            onEnlarge={enlarge}
            variants={
              <>
                <div className="product-variants">
                  <VariantGroup
                    label="Mount style"
                    selected={hdStyleChip}
                    onChange={(label) => {
                      setHdStyleChip(label);
                      const slug = HD_STYLE_SLUG[label];
                      if (!slug) return; // "coming soon" sizes are inert
                      setHdStyleSlug(slug);
                      hdUpdate(slug, hdColorSlug);
                    }}
                    options={[
                      { label: '3M Claw' },
                      { label: '1-Gang' },
                      { label: '2-Gang' },
                      { label: '3-Gang (coming soon)' },
                      { label: '4-Gang (coming soon)' },
                    ]}
                  />
                </div>
                <div className="product-variants">
                  <VariantGroup
                    label="Color"
                    selected={hdColorChip}
                    onChange={(label) => {
                      setHdColorChip(label);
                      const slug = label === 'Matte Black' ? 'black' : 'white';
                      setHdColorSlug(slug);
                      hdUpdate(hdStyleSlug, slug);
                    }}
                    options={[{ label: 'Warm White' }, { label: 'Matte Black' }]}
                  />
                </div>
              </>
            }
          />

          <ProductBlock
            content={knife}
            mainPhoto={knifePhoto}
            glb={knife.glb}
            tint={knifeTint}
            onSelectThumb={setKnifePhoto}
            onEnlarge={enlarge}
            variants={
              <div className="product-variants">
                <VariantGroup
                  label="Available colors"
                  selected={knifeColor}
                  onChange={setKnifeColor}
                  options={[
                    { label: 'Matte Black', onSelect: () => knifePick('black', BLACK) },
                    { label: 'Warm White', onSelect: () => knifePick('white', WHITE) },
                    { label: 'Classic Birch', onSelect: () => knifePick('classic-birch', '918669') },
                    { label: 'Black Walnut', onSelect: () => knifePick('black-walnut', '4F3F24') },
                    { label: 'Custom Color' },
                  ]}
                />
              </div>
            }
          />

          <ProductBlock
            content={zbiotic}
            mainPhoto={zbioticPhoto}
            glb={zbiotic.glb}
            tint={zbioticTint}
            onSelectThumb={setZbioticPhoto}
            onEnlarge={enlarge}
            variants={
              <div className="product-variants">
                <VariantGroup
                  label="Available colors"
                  selected={zbioticColor}
                  onChange={setZbioticColor}
                  options={[
                    { label: 'Warm White', onSelect: () => zbioticPick('white', WHITE) },
                    { label: 'Matte Black', onSelect: () => zbioticPick('black', BLACK) },
                    { label: 'Custom Color' },
                  ]}
                />
              </div>
            }
          />
        </div>
      </section>

      <SheetTitleBlock rows={SITE_TITLE_BLOCK} />
    </Layout>
  );
}
