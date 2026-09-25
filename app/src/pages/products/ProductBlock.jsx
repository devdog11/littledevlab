// Checkpoint 1: the Trading Card Rack as static JSX, copied from products.html.
// Content moves into data and clicks get wired up in checkpoint 2.

function CheckIcon() {
  return (
    <span className="icon">
      <svg viewBox="0 0 12 12" fill="none">
        <polyline points="2,6 5,9 10,3" stroke="#2C2820" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  )
}

export default function ProductBlock() {
  return (
    <div className="product-block" id="gaming-card-display">
      <div className="product-gallery" style={{ backgroundImage: "url('/images/card/gaming-card-display-blueprint.svg')" }}>
        <div className="gallery-view-toggle">
          <button type="button">Photo</button>
          <button className="active" type="button">Rotate in 3D</button>
        </div>
        <model-viewer
          class="main-photo main-3d active"
          src="/images/card/gaming-card-display.glb"
          camera-controls=""
          auto-rotate=""
          auto-rotate-delay="0"
          rotation-per-second="18deg"
          shadow-intensity="1"
          exposure="1"
          environment-image="neutral"
          alt="Interactive 3D model of the trading card display rack"
        ></model-viewer>
        <div className="gallery-3d-hint" style={{ opacity: 1 }}>Drag to rotate · scroll to zoom</div>
        <img className="main-photo is-3d-hidden" src="/images/card/gaming-card-display-3.jpg" alt="Trading card display rack stocked with Magic: The Gathering booster packs at a game shop counter" />
        <div className="gallery-zoom-hint">Click to enlarge</div>
        <div className="product-thumbs-wrap">
          <div className="thumb-scroll-zone left">&#10094;</div>
          <div className="product-thumbs">
            <img src="/images/card/gaming-card-display-3.jpg" alt="Card holder at a game shop counter, stocked" className="active" />
            <img src="/images/card/card-holder-left.png" alt="Card holder, loaded, angle 1" />
            <img src="/images/card/card-holder-right.png" alt="Card holder, loaded, angle 2" />
            <img src="/images/card/card-holder-pulled-out.jpg" alt="Card holder with a pack pulled out" />
            <img src="/images/card/gaming-card-display-5.jpg" alt="Multiple card holders in retail use at a game shop" />
            <img src="/images/card/gaming-card-display-1.jpg" alt="Card display photo 1" />
            <img src="/images/card/gaming-card-display-2.jpg" alt="Card display photo 2" />
            <img src="/images/card/gaming-card-display-4.jpg" alt="Card display photo 4" />
            <img src="/images/card/gaming-card-display-white.png" alt="Rendered view" />
          </div>
          <div className="thumb-scroll-zone right">&#10094;</div>
        </div>
      </div>
      <div className="product-info">
        <span className="tag">Retail Display Box</span>
        <h3>Trading Card Display Rack</h3>
        <div className="price">$15</div>
        <div className="product-variants">
          <span className="tag" style={{ fontSize: '.7rem', marginBottom: 8, display: 'block', width: '100%' }}>Available colors</span>
          <span className="variant-chip active">Warm White</span>
          <span className="variant-chip">Matte Black</span>
          <span className="variant-chip">Custom Color</span>
        </div>
        <p>Tired of flimsy, mismatched packaging eating up space in your display case? This TCG booster pack display box is a durable replacement for the shipping boxes booster packs normally come in — built specifically for the retail display of trading card booster packs. Each box holds a full case of packs, angled back for maximum visibility, so every pack stays easy to see, grab, and restock. Uniform and side-by-side, they help game stores, hobby shops, comic shops, card shops, convention booths, and pop-up events get more product into every display case, right in front of customers.</p>
        <ul className="product-features">
          <li><CheckIcon />Full booster box capacity — holds an entire box of trading card packs in a smaller, uniform footprint</li>
          <li><CheckIcon />Angled, front-facing display keeps every pack visible and easy to browse</li>
          <li><CheckIcon />Space-saving, uniform design — sits side by side with no wasted space, unlike mismatched shipping boxes</li>
          <li><CheckIcon />2×–3× more display capacity than standard shipping boxes in the same shelf space</li>
          <li><CheckIcon />Nests in pairs for compact, efficient backroom storage</li>
          <li><CheckIcon />Fast to reorganize — pull, move, or rearrange stock without spilling packs or damaging boxes</li>
        </ul>
        <div className="product-actions">
          <a href="/index.html#contact" className="btn btn-primary">Order This</a>
          <a href="/index.html#contact" className="btn btn-outline">Request a Variation</a>
        </div>
      </div>
    </div>
  )
}
