
export default [
    {
    id: "gaming-card-display",
    tag: "Retail Display Box",
    name: "Trading Card Display Rack",
    price: "$15",
    description: "Tired of flimsy, mismatched packaging eating up space in your display case? This TCG booster pack display box is a durable replacement for the shipping boxes booster packs normally come in — built specifically for the retail display of trading card booster packs. Each box holds a full case of packs, angled back for maximum visibility, so every pack stays easy to see, grab, and restock. Uniform and side-by-side, they help game stores, hobby shops, comic shops, card shops, convention booths, and pop-up events get more product into every display case, right in front of customers.",
    features: [
        "Full booster box capacity — holds an entire box of trading card packs in a smaller, uniform footprint",
        "Angled, front-facing display keeps every pack visible and easy to browse",
        "Space-saving, uniform design — sits side by side with no wasted space, unlike mismatched shipping boxes",
        "2×–3× more display capacity than standard shipping boxes in the same shelf space",
        "Nests in pairs for compact, efficient backroom storage",
        "Fast to reorganize — pull, move, or rearrange stock without spilling packs or damaging boxes",
    ],
    blueprint: "/images/card/gaming-card-display-blueprint.svg",
    model: {
        src: "/images/card/gaming-card-display.glb",
        alt: "Interactive 3D model of the trading card display rack",
    },
    photos: [
        { src: "/images/card/gaming-card-display-3.jpg", alt: "Card holder at a game shop counter, stocked" },
        { src: "/images/card/card-holder-left.png", alt: "Card holder, loaded, angle 1" },
        { src: "/images/card/card-holder-right.png", alt: "Card holder, loaded, angle 2" },
        { src: "/images/card/card-holder-pulled-out.jpg", alt: "Card holder with a pack pulled out" },
        { src: "/images/card/gaming-card-display-5.jpg", alt: "Multiple card holders in retail use at a game shop" },
        { src: "/images/card/gaming-card-display-1.jpg", alt: "Card display photo 1" },
        { src: "/images/card/gaming-card-display-2.jpg", alt: "Card display photo 2" },
        { src: "/images/card/gaming-card-display-4.jpg", alt: "Card display photo 4" },
        { src: "/images/card/gaming-card-display-white.png", alt: "Rendered view" }
    ],
    variants: [
        {
        label: "Available colors",
        options: [
            { label: "Warm White", tint: "F8F4EA", photo: "/images/card/gaming-card-display-white.png" },
            { label: "Matte Black", tint: "1C1A16", photo: "/images/card/gaming-card-display-black.png" },
            { label: "Custom Color", tint: "00BBA0", contact: true },
        ],
        },
    ],
    reverse: false,
    tone: "sand",
    },
    {
    id: "glasses-holder",
    tag: "Eyecare Organizer",
    name: "Glasses + Contact Lens Holder",
    description: "Tired of morning contact lens chaos? Start your day with complete clarity — no more fumbling in the dark, squinting at lens boxes, or accidentally ripping foil covers on your daily lens strips. This organizer streamlines your routine so you can grab your lenses effortlessly and get on with your day. Designed for ultimate convenience, the modular system lets you pre-separate up to 15 days of lenses ahead of time when you're not in a rush — whether you wear standard dual-prescription lenses or need three distinct prescriptions, the 2- and 3-compartment configurations keep every lens organized and within reach.",
    features: [
        "Pre-separated storage — holds up to 15 days of daily lenses per compartment for seamless, rip-free mornings",
        "Flexible prescriptions — 2-compartment and 3-compartment models to fit reading, left-eye, and right-eye prescriptions",
        "Curved glasses cradle add-on — rests your eyewear safely without stressing delicate hinges",
        "Versatile mounting & expansion — mounts under cabinets or sits on countertops, with add-on slots for toothbrushes, razors, and other everyday essentials",
    ],
    blueprint: "/images/glasses/15-days-2-lens-blueprint.svg",
    model: {
        src: "/images/glasses/15-days-2-lens.glb",
        alt: "Interactive 3D model of the glasses and contact lens holder",
    },
    photos: [
        { src: "/images/glasses/glasses-holder-counter.jpg", alt: "Counter view" },
        { src: "/images/glasses/glasses-holder-side.jpg", alt: "Side view" },
        { src: "/images/glasses/glasses-holder-top.jpg", alt: "Top view" },
        { src: "/images/glasses/glasses-holder-cabinet.jpg", alt: "Under-cabinet mount" },
        { src: "/images/glasses/glasses-holder-lifestyle-wide.jpg", alt: "Full holder in daily use, glasses and lenses" },
        { src: "/images/glasses/glasses-holder-lifestyle-detail.jpg", alt: "Close-up in use" },
        { src: "/images/glasses/15-days-2-lens-white.png", alt: "2-Lens 15-day holder, rendered" },
    ],
    variants: [
        {
        label: "Holder size",
        selected: 1,
        options: [
            { label: "3-Lens", model: "/images/glasses/three-contacts+glasses.glb", photo: "/images/glasses/glasses-holder-counter.jpg" },
            { label: "2-Lens (15-Day)", model: "/images/glasses/15-days-2-lens.glb", photo: "/images/glasses/15-days-2-lens-white.png" },
        ],
        },
        {
        label: "Available colors",
        options: [
            { label: "Warm White", tint: "F8F4EA" },
            { label: "Matte Black", tint: "1C1A16" },
            { label: "Light Gray", tint: "A49A82" },
            { label: "Custom Color", tint: "00BBA0", contact: true },
        ],
        },
    ],
    reverse: false,
    tone: "gray",
    },
    {
    id: "coaster-holder",
    tag: "Table Organizer",
    name: "Chilewich Coaster Holder",
    description: "Chilewich coasters deserve a home that matches their quality. These holders are designed specifically around the dimensions of Chilewich woven coasters — not a generic coaster holder, but one that fits your exact coaster shape like it was made for them. (It was.) Available in round and hexagonal profiles to match your coaster style.",
    features: [
        "Precision-fit for Chilewich round and hexagonal coasters — snug enough to hold stacks, open enough to grab one easily",
        "Arch and slot cutouts let the Chilewich texture show through — the coasters become part of the design",
        "Weighted base holds steady even when pulling the last coaster out",
        "Two styles: open-arch caddy for dining tables, slim-cuff wrap for side tables",
    ],
    blueprint: "/images/coasters/chilewich-round-blueprint.svg",
    model: {
        src: "/images/coasters/chilewich-round.glb",
        alt: "Interactive 3D model of the Chilewich coaster holder",
    },
    photos: [
        { src: "/images/coasters/coaster-round-tan.jpg", alt: "Round holder tan" },
        { src: "/images/coasters/coaster-cuff-black.jpg", alt: "Cuff holder black" },
        { src: "/images/coasters/coaster-cuff-front.jpg", alt: "Cuff front" },
        { src: "/images/coasters/coaster-hex-holder.jpg", alt: "Hexagonal holder" },
        { src: "/images/coasters/coaster-hex-top.jpg", alt: "Hex top view" },
        { src: "/images/coasters/coaster-round-side.jpg", alt: "Round side view" },
    ],
    variants: [
        {
        label: "Shape",
        options: [
            { label: "Round", model: "/images/coasters/chilewich-round.glb", photo: "/images/coasters/coaster-round-tan.jpg" },
            { label: "Hexagonal", model: "/images/coasters/chilewich-hexagonal.glb", photo: "/images/coasters/coaster-hex-holder.jpg" },
        ],
        },
        {
        label: "Color",
        options: [
            { label: "Olive / Khaki", tint: "6B6454" },
            { label: "Matte Black", tint: "1C1A16" },
            { label: "Natural Tan", tint: "C9B896" },
            { label: "Classic Birch", tint: "918669" },
            { label: "Black Walnut", tint: "4F3F24" },
            { label: "Custom Color", tint: "00BBA0", contact: true },
        ],
        },
    ],
    reverse: false,
    tone: "sand",
    },
    {
    id: "hunter-douglas-mount",
    tag: "Smart Home Mount",
    name: "Hunter Douglas Remote Wall Mount",
    price: "$25",
    description: "The Hunter Douglas PowerView remote works great until it's buried under a couch cushion. This mount gives it a permanent, obvious home — stuck flush to any wall with a 3M-claw adhesive mount, or bolted straight over an existing switch plate — so the remote lives exactly where your hand already goes for the lights.",
    features: [
        "3M-claw version sticks to any flat wall — no tools, no anchors, no wall damage",
        "Switch-plate versions bolt over your existing gang box — no new holes in the wall",
        "Snug cradle holds the remote securely but pops out one-handed",
        "Sized to match 1, 2, 3, and 4-gang wall plates",
    ],
    note: "Note: 3-Gang and 4-Gang will go live once those model files are ready. The 2-Gang photo shown is a real installed print; other styles are shown as renders until photographed.",
    blueprint: "/images/hunter-douglass/hd-3m-claw-blueprint.svg",
    model: {
        src: "/images/hunter-douglass/hunter-douglas-2-gang.glb",
        alt: "Interactive 3D model of the Hunter Douglas remote mount",
    },
    // Style and color combine into one render filename, e.g. hunter-douglas-2-gang-black.png
    variantPhoto: "/images/hunter-douglass/hunter-douglas-{style}-{color}.png",
    photos: [
        { src: "/images/hunter-douglass/hunter-douglas-2-gang-ref.jpeg", alt: "2-Gang mount, installed" },
        { src: "/images/hunter-douglass/hunter-douglas-wall-mount-3m-claw-white.png", alt: "3M Claw mount" },
        { src: "/images/hunter-douglass/hunter-douglas-1-gang-white.png", alt: "1-Gang mount" },
        { src: "/images/hunter-douglass/hunter-douglas-2-gang-white.png", alt: "2-Gang mount" },
        { src: "/images/hunter-douglass/hunter-douglas-4-gang-ref.jpeg", alt: "Real 4-Gang install, reference photo" },
    ],
    variants: [
        {
        label: "Mount style",
        key: "style",
        selected: 2,
        options: [
            { label: "3M Claw", slug: "wall-mount-3m-claw", model: "/images/hunter-douglass/hunter-douglas-wall-mount-3m-claw.glb" },
            { label: "1-Gang", slug: "1-gang", model: "/images/hunter-douglass/hd-1-gang.glb" },
            { label: "2-Gang", slug: "2-gang", model: "/images/hunter-douglass/hunter-douglas-2-gang.glb" },
            { label: "3-Gang (coming soon)", disabled: true },
            { label: "4-Gang (coming soon)", disabled: true },
        ],
        },
        {
        label: "Color",
        key: "color",
        options: [
            { label: "Warm White", slug: "white", tint: "F8F4EA" },
            { label: "Matte Black", slug: "black", tint: "1C1A16" },
            { label: "Custom Color", tint: "00BBA0", contact: true },
        ],
        },
    ],
    reverse: false,
    tone: "gray",
    },
    {
    id: "steak-knife-holder",
    tag: "Kitchen Organizer",
    name: "Steak Knife Holder",
    price: "$25",
    description: "Steak knives rattling loose in a drawer dull their edges and snag on everything else in there. This holder is sized specifically to drop into a slot of the BAMEOS bamboo drawer organizer — edge protected, handle up, ready to grab — a dedicated home instead of a junk-drawer hazard.",
    features: [
        "Individual slots keep blades separated — no edge-on-edge contact",
        "Open-slot design lets damp blades air-dry instead of trapping moisture",
        "Purpose-fit for one slot of the BAMEOS bamboo drawer organizer, or sits out on the counter on its own",
        "Sized for a standard 4–6 piece steak knife set",
    ],
    blueprint: "/images/knives-holder/knife-holder-blueprint.svg",
    model: {
        src: "/images/knives-holder/steak-knife-holder.glb",
        alt: "Interactive 3D model of the steak knife holder",
    },
    photos: [
        { src: "/images/knives-holder/steak-knife-holder-1.jpeg", alt: "Steak knife holder photo 1", objectPosition: "top" },
        { src: "/images/knives-holder/steak-knife-holder-2.jpeg", alt: "Steak knife holder photo 2" },
        { src: "/images/knives-holder/steak-knife-holder-white.png", alt: "Rendered view" },
    ],
    variants: [
        {
        label: "Available colors",
        options: [
            { label: "Matte Black", tint: "1C1A16", photo: "/images/knives-holder/steak-knife-holder-black.png" },
            { label: "Warm White", tint: "F8F4EA", photo: "/images/knives-holder/steak-knife-holder-white.png" },
            { label: "Classic Birch", tint: "918669", photo: "/images/knives-holder/steak-knife-holder-classic-birch.png" },
            { label: "Black Walnut", tint: "4F3F24", photo: "/images/knives-holder/steak-knife-holder-black-walnut.png" },
            { label: "Custom Color", tint: "00BBA0", contact: true },
        ],
        },
    ],
    reverse: false,
    tone: "sand",
    },
    {
    id: "zbiotic-gift-box",
    tag: "Gift Packaging",
    name: "ZBiotic Six-Pack Gift Carrier",
    price: "$25",
    description: "ZBiotic in its retail cardboard is a genuinely good gift with cheap presentation. This carrier upgrades it to something worth handing someone — a sturdy, reusable six-bottle caddy with a molded handle and the ZBiotic mark cut right into the side, built to survive the trip to a party and then keep working as an everyday six-pack carrier.",
    features: [
        "Molded handle cutout — carries like a real caddy, not a cardboard flat",
        "Individual bottle bays keep glass from clinking or tipping in transit",
        "Reusable after the gift — works as an everyday six-pack carrier",
        "Branded cutout detail — no printing or labels needed",
    ],
    blueprint: "/images/six-pack-gift-zbiotic/zbiotic-holder-blueprint.svg",
    model: {
        src: "/images/six-pack-gift-zbiotic/zbiotic-six-pack.glb",
        alt: "Interactive 3D model of the ZBiotic gift carrier",
    },
    photos: [
        { src: "/images/six-pack-gift-zbiotic/zbiotic-six-pack-gift-box-1.jpeg", alt: "Gift box photo 1" },
        { src: "/images/six-pack-gift-zbiotic/zbiotic-six-pack-gift-box-2.jpeg", alt: "Gift box photo 2" },
        { src: "/images/six-pack-gift-zbiotic/zbiotic-six-pack-gift-box-3.jpeg", alt: "Gift box photo 3" },
        { src: "/images/six-pack-gift-zbiotic/zbiotic-six-pack-gift-box-4.jpeg", alt: "Gift box photo 4" },
        { src: "/images/six-pack-gift-zbiotic/zbiotic-six-pack-gift-box-white.png", alt: "Rendered view" },
    ],
    variants: [
        {
        label: "Available colors",
        options: [
            { label: "Warm White", tint: "F8F4EA", photo: "/images/six-pack-gift-zbiotic/zbiotic-six-pack-gift-box-white.png" },
            { label: "Matte Black", tint: "1C1A16", photo: "/images/six-pack-gift-zbiotic/zbiotic-six-pack-gift-box-black.png" },
            { label: "Custom Color", tint: "00BBA0", contact: true },
        ],
        },
    ],
    reverse: false,
    tone: "gray",
    },
];