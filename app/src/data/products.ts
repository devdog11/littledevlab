// Generated from the original products.html so copy, prices and photo lists
// carry over exactly. Prose is authored HTML from this repo (never user
// input) because it contains links and emphasis. Variant behaviour lives in
// Products.tsx.
import type { CSSProperties } from 'react';

export interface ProductThumb {
  src: string;
  alt: string;
}

export interface LandingTile {
  tone: string;
  href: string;
  src: string;
  alt: string;
  label: string;
  objectPosition?: string;
}

export type InfoBlock =
  | { type: 'p'; html: string; style?: CSSProperties }
  | { type: 'ul'; items: string[] };

export interface ProductContent {
  id: string;
  /** Reverse blocks put .product-info before .product-gallery in the DOM. */
  reverse: boolean;
  blueprint: string;
  glb: string;
  mvAlt: string;
  mainPhoto: string;
  mainAlt: string;
  thumbs: ProductThumb[];
  tag: string;
  title: string;
  /** Two products are deliberately listed with no price. */
  price: string | null;
  infoBlocks: InfoBlock[];
}

export const landingTiles: LandingTile[] = [
  {
    tone: "tone-sand",
    href: "#gaming-card-display",
    src: "/images/gaming-card-display/gaming-card-display-3.jpg",
    alt: "Trading Card Display Rack",
    label: "Trading Card Display Rack",
  },
  {
    tone: "tone-gray",
    href: "#glasses-holder",
    src: "/images/glasses/glasses-holder-counter.jpg",
    alt: "Glasses + Contact Lens Holder",
    label: "Glasses + Contact Lens Holder",
  },
  {
    tone: "tone-sand",
    href: "#coaster-holder",
    src: "/images/coasters/coaster-round-tan.jpg",
    alt: "Chilewich Coaster Holder",
    label: "Chilewich Coaster Holder",
  },
  {
    tone: "tone-gray",
    href: "#hunter-douglas-mount",
    src: "/images/hunter-douglass/hunter-douglas-2-gang-ref.jpeg",
    alt: "Hunter Douglas Remote Wall Mount",
    label: "Hunter Douglas Remote Wall Mount",
  },
  {
    tone: "tone-sand",
    href: "#steak-knife-holder",
    src: "/images/knives-holder/steak-knife-holder-1.jpeg",
    alt: "Steak Knife Holder",
    label: "Steak Knife Holder",
    objectPosition: "top",
  },
  {
    tone: "tone-gray",
    href: "#zbiotic-gift-box",
    src: "/images/six-pack-gift-zbiotic/zbiotic-six-pack-gift-box-1.jpeg",
    alt: "ZBiotic Six-Pack Gift Carrier",
    label: "ZBiotic Six-Pack Gift Carrier",
  },
];

export const products: ProductContent[] = [
  {
    id: "gaming-card-display",
    reverse: false,
    blueprint: "/images/gaming-card-display/gaming-card-display-blueprint.svg",
    glb: "/images/gaming-card-display/gaming-card-display.glb",
    mvAlt: "Interactive 3D model of the trading card display rack",
    mainPhoto: "/images/gaming-card-display/gaming-card-display-3.jpg",
    mainAlt: "Trading card display rack stocked with Magic: The Gathering booster packs at a game shop counter",
    tag: "Retail Display Box",
    title: "Trading Card Display Rack",
    price: "$35",
    thumbs: [
      { src: "/images/gaming-card-display/gaming-card-display-3.jpg", alt: "Card holder at a game shop counter, stocked" },
      { src: "/images/gaming-card-display/card-holder-left.png", alt: "Card holder, loaded, angle 1" },
      { src: "/images/gaming-card-display/card-holder-right.png", alt: "Card holder, loaded, angle 2" },
      { src: "/images/gaming-card-display/card-holder-pulled-out.jpg", alt: "Card holder with a pack pulled out" },
      { src: "/images/gaming-card-display/gaming-card-display-5.jpg", alt: "Multiple card holders in retail use at a game shop" },
      { src: "/images/gaming-card-display/gaming-card-display-1.jpg", alt: "Card display photo 1" },
      { src: "/images/gaming-card-display/gaming-card-display-2.jpg", alt: "Card display photo 2" },
      { src: "/images/gaming-card-display/gaming-card-display-4.jpg", alt: "Card display photo 4" },
      { src: "/images/gaming-card-display/gaming-card-display-white.png", alt: "Rendered view" },
    ],
    infoBlocks: [
      { type: 'p', html: "Tired of flimsy, mismatched packaging eating up space in your display case? This TCG booster pack display box is a durable replacement for the shipping boxes booster packs normally come in — built specifically for the retail display of trading card booster packs. Each box holds a full case of packs, angled back for maximum visibility, so every pack stays easy to see, grab, and restock. Uniform and side-by-side, they help game stores, hobby shops, comic shops, card shops, convention booths, and pop-up events get more product into every display case, right in front of customers." },
      { type: 'ul', items: [
        "Full booster box capacity — holds an entire box of trading card packs in a smaller, uniform footprint",
        "Angled, front-facing display keeps every pack visible and easy to browse",
        "Space-saving, uniform design — sits side by side with no wasted space, unlike mismatched shipping boxes",
        "2×–3× more display capacity than standard shipping boxes in the same shelf space",
        "Nests in pairs for compact, efficient backroom storage",
        "Fast to reorganize — pull, move, or rearrange stock without spilling packs or damaging boxes",
      ] },
    ],
  },
  {
    id: "glasses-holder",
    reverse: false,
    blueprint: "/images/glasses/15-days-2-lens-blueprint.svg",
    glb: "/images/glasses/15-days-2-lens.glb",
    mvAlt: "Interactive 3D model of the glasses and contact lens holder",
    mainPhoto: "/images/glasses/15-days-2-lens-white.png",
    mainAlt: "Glasses and contact lens organizer",
    tag: "Eyecare Organizer",
    title: "Glasses + Contact Lens Holder",
    price: null,
    thumbs: [
      { src: "/images/glasses/glasses-holder-counter.jpg", alt: "Counter view" },
      { src: "/images/glasses/glasses-holder-side.jpg", alt: "Side view" },
      { src: "/images/glasses/glasses-holder-top.jpg", alt: "Top view" },
      { src: "/images/glasses/glasses-holder-cabinet.jpg", alt: "Under-cabinet mount" },
      { src: "/images/glasses/glasses-holder-lifestyle-wide.jpg", alt: "Full holder in daily use, glasses and lenses" },
      { src: "/images/glasses/glasses-holder-lifestyle-detail.jpg", alt: "Close-up in use" },
      { src: "/images/glasses/15-days-2-lens-white.png", alt: "2-Lens 15-day holder, rendered" },
    ],
    infoBlocks: [
      { type: 'p', html: "Tired of morning contact lens chaos? Start your day with complete clarity — no more fumbling in the dark, squinting at lens boxes, or accidentally ripping foil covers on your daily lens strips. This organizer streamlines your routine so you can grab your lenses effortlessly and get on with your day. Designed for ultimate convenience, the modular system lets you pre-separate up to 15 days of lenses ahead of time when you're not in a rush — whether you wear standard dual-prescription lenses or need three distinct prescriptions, the 2- and 3-compartment configurations keep every lens organized and within reach." },
      { type: 'ul', items: [
        "Pre-separated storage — holds up to 15 days of daily lenses per compartment for seamless, rip-free mornings",
        "Flexible prescriptions — 2-compartment and 3-compartment models to fit reading, left-eye, and right-eye prescriptions",
        "Curved glasses cradle add-on — rests your eyewear safely without stressing delicate hinges",
        "Versatile mounting &amp; expansion — mounts under cabinets or sits on countertops, with add-on slots for toothbrushes, razors, and other everyday essentials",
      ] },
    ],
  },
  {
    id: "coaster-holder",
    reverse: true,
    blueprint: "/images/coasters/chilewich-round-blueprint.svg",
    glb: "/images/coasters/chilewich-round.glb",
    mvAlt: "Interactive 3D model of the Chilewich coaster holder",
    mainPhoto: "/images/coasters/coaster-round-tan.jpg",
    mainAlt: "Chilewich coaster holder",
    tag: "Table Organizer",
    title: "Chilewich Coaster Holder",
    price: null,
    thumbs: [
      { src: "/images/coasters/coaster-round-tan.jpg", alt: "Round holder tan" },
      { src: "/images/coasters/coaster-cuff-black.jpg", alt: "Cuff holder black" },
      { src: "/images/coasters/coaster-cuff-front.jpg", alt: "Cuff front" },
      { src: "/images/coasters/coaster-hex-holder.jpg", alt: "Hexagonal holder" },
      { src: "/images/coasters/coaster-hex-top.jpg", alt: "Hex top view" },
      { src: "/images/coasters/coaster-round-side.jpg", alt: "Round side view" },
    ],
    infoBlocks: [
      { type: 'p', html: "Chilewich coasters deserve a home that matches their quality. These holders are designed specifically around the dimensions of Chilewich woven coasters — not a generic coaster holder, but one that fits your exact coaster shape like it was made for them. (It was.) Available in round and hexagonal profiles to match your coaster style." },
      { type: 'ul', items: [
        "Precision-fit for Chilewich round and hexagonal coasters — snug enough to hold stacks, open enough to grab one easily",
        "Arch and slot cutouts let the Chilewich texture show through — the coasters become part of the design",
        "Weighted base holds steady even when pulling the last coaster out",
        "Two styles: open-arch caddy for dining tables, slim-cuff wrap for side tables",
      ] },
    ],
  },
  {
    id: "hunter-douglas-mount",
    reverse: true,
    blueprint: "/images/hunter-douglass/hd-3m-claw-blueprint.svg",
    glb: "/images/hunter-douglass/hunter-douglas-wall-mount-3m-claw.glb",
    mvAlt: "Interactive 3D model of the Hunter Douglas remote mount",
    mainPhoto: "/images/hunter-douglass/hunter-douglas-2-gang-ref.jpeg",
    mainAlt: "Hunter Douglas 2-Gang remote wall mount, installed",
    tag: "Smart Home Mount",
    title: "Hunter Douglas Remote Wall Mount",
    price: "$25",
    thumbs: [
      { src: "/images/hunter-douglass/hunter-douglas-2-gang-ref.jpeg", alt: "2-Gang mount, installed" },
      { src: "/images/hunter-douglass/hunter-douglas-wall-mount-3m-claw-white.png", alt: "3M Claw mount" },
      { src: "/images/hunter-douglass/hunter-douglas-1-gang-white.png", alt: "1-Gang mount" },
      { src: "/images/hunter-douglass/hunter-douglas-2-gang-white.png", alt: "2-Gang mount" },
      { src: "/images/hunter-douglass/hunter-douglas-4-gang-ref.jpeg", alt: "Real 4-Gang install, reference photo" },
    ],
    infoBlocks: [
      { type: 'p', html: "<em>Note: 3-Gang and 4-Gang will go live once those model files are ready. The 2-Gang photo shown is a real installed print; other styles are shown as renders until photographed.</em>", style: { fontSize: ".78rem", color: "var(--gray-600)", marginTop: "-20px", marginBottom: "28px", lineHeight: "1.6" } },
      { type: 'p', html: "The Hunter Douglas PowerView remote works great until it's buried under a couch cushion. This mount gives it a permanent, obvious home — stuck flush to any wall with a 3M-claw adhesive mount, or bolted straight over an existing switch plate — so the remote lives exactly where your hand already goes for the lights." },
      { type: 'ul', items: [
        "3M-claw version sticks to any flat wall — no tools, no anchors, no wall damage",
        "Switch-plate versions bolt over your existing gang box — no new holes in the wall",
        "Snug cradle holds the remote securely but pops out one-handed",
        "Sized to match 1, 2, 3, and 4-gang wall plates",
      ] },
    ],
  },
  {
    id: "steak-knife-holder",
    reverse: false,
    blueprint: "/images/knives-holder/knife-holder-blueprint.svg",
    glb: "/images/knives-holder/steak-knife-holder.glb",
    mvAlt: "Interactive 3D model of the steak knife holder",
    mainPhoto: "/images/knives-holder/steak-knife-holder-1.jpeg",
    mainAlt: "Steak knife holder",
    tag: "Kitchen Organizer",
    title: "Steak Knife Holder",
    price: "$25",
    thumbs: [
      { src: "/images/knives-holder/steak-knife-holder-1.jpeg", alt: "Steak knife holder photo 1" },
      { src: "/images/knives-holder/steak-knife-holder-2.jpeg", alt: "Steak knife holder photo 2" },
      { src: "/images/knives-holder/steak-knife-holder-white.png", alt: "Rendered view" },
    ],
    infoBlocks: [
      { type: 'p', html: "Steak knives rattling loose in a drawer dull their edges and snag on everything else in there. This holder is sized specifically to drop into a slot of the <a href=\"https://www.amazon.com/dp/B0DJ8XBLDK\" target=\"_blank\" rel=\"noopener\">BAMEOS bamboo drawer organizer</a> — edge protected, handle up, ready to grab — a dedicated home instead of a junk-drawer hazard." },
      { type: 'ul', items: [
        "Individual slots keep blades separated — no edge-on-edge contact",
        "Open-slot design lets damp blades air-dry instead of trapping moisture",
        "Purpose-fit for one slot of the BAMEOS bamboo drawer organizer, or sits out on the counter on its own",
        "Sized for a standard 4–6 piece steak knife set",
      ] },
    ],
  },
  {
    id: "zbiotic-gift-box",
    reverse: true,
    blueprint: "/images/six-pack-gift-zbiotic/zbiotic-holder-blueprint.svg",
    glb: "/images/six-pack-gift-zbiotic/zbiotic-six-pack.glb",
    mvAlt: "Interactive 3D model of the ZBiotic gift carrier",
    mainPhoto: "/images/six-pack-gift-zbiotic/zbiotic-six-pack-gift-box-1.jpeg",
    mainAlt: "ZBiotic six-pack gift carrier",
    tag: "Gift Packaging",
    title: "ZBiotic Six-Pack Gift Carrier",
    price: "$25",
    thumbs: [
      { src: "/images/six-pack-gift-zbiotic/zbiotic-six-pack-gift-box-1.jpeg", alt: "Gift box photo 1" },
      { src: "/images/six-pack-gift-zbiotic/zbiotic-six-pack-gift-box-2.jpeg", alt: "Gift box photo 2" },
      { src: "/images/six-pack-gift-zbiotic/zbiotic-six-pack-gift-box-3.jpeg", alt: "Gift box photo 3" },
      { src: "/images/six-pack-gift-zbiotic/zbiotic-six-pack-gift-box-4.jpeg", alt: "Gift box photo 4" },
      { src: "/images/six-pack-gift-zbiotic/zbiotic-six-pack-gift-box-white.png", alt: "Rendered view" },
    ],
    infoBlocks: [
      { type: 'p', html: "ZBiotic in its retail cardboard is a genuinely good gift with cheap presentation. This carrier upgrades it to something worth handing someone — a sturdy, reusable six-bottle caddy with a molded handle and the ZBiotic mark cut right into the side, built to survive the trip to a party and then keep working as an everyday six-pack carrier." },
      { type: 'ul', items: [
        "Molded handle cutout — carries like a real caddy, not a cardboard flat",
        "Individual bottle bays keep glass from clinking or tipping in transit",
        "Reusable after the gift — works as an everyday six-pack carrier",
        "Branded cutout detail — no printing or labels needed",
      ] },
    ],
  },
];
