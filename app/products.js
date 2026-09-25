
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
            { label: "Warm White", tint: "F8F4EA" },
            { label: "Matte Black", tint: "1C1A16" },
            { label: "Custom Color"},
        ],
        },
    ],
    reverse: false,
    tone: "sand",
    },
];