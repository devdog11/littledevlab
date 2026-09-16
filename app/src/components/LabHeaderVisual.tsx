interface LabHeaderVisualProps {
  /** The build log wraps the same drawing in `log-header-visual`. */
  className?: string;
}

/** Decorative isometric technical drawing in the lab-notes / in-development header. */
export function LabHeaderVisual({ className = 'lab-header-visual' }: LabHeaderVisualProps) {
  return (
    <div className={className} aria-hidden="true">
      <svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(160,160)">
          <polyline
            points="0.00,-100.00 86.60,-50.00 86.60,50.00 -0.00,100.00 -86.60,50.00 -86.60,-50.00 0.00,-100.00"
            className="edge-solid"
          />
          <line x1="0.00" y1="0.00" x2="86.60" y2="-50.00" className="edge-solid" />
          <line x1="0.00" y1="0.00" x2="-0.00" y2="100.00" className="edge-solid" />
          <line x1="0.00" y1="0.00" x2="-86.60" y2="-50.00" className="edge-solid" />
          <line x1="0.00" y1="0.00" x2="0.00" y2="-100.00" className="edge-hidden" />
          <line x1="0.00" y1="0.00" x2="86.60" y2="50.00" className="edge-hidden" />
          <line x1="0.00" y1="0.00" x2="-86.60" y2="50.00" className="edge-hidden" />
          <g className="dim">
            <line x1="86.60" y1="50.00" x2="99.60" y2="72.52" className="ext-line" />
            <line x1="-0.00" y1="100.00" x2="13.00" y2="122.52" className="ext-line" />
            <line x1="99.60" y1="72.52" x2="13.00" y2="122.52" className="dim-line" />
            <line x1="96.22" y1="71.61" x2="102.98" y2="73.42" className="tick" />
            <line x1="9.62" y1="121.61" x2="16.38" y2="123.42" className="tick" />
            <text
              x="56.30"
              y="97.52"
              className="dim-text"
              transform="rotate(330.00 56.30 97.52)"
              textAnchor="middle"
              dy="-4"
            >
              12'-0"
            </text>
          </g>
          <g className="dim">
            <line x1="-0.00" y1="100.00" x2="-13.00" y2="122.52" className="ext-line" />
            <line x1="-86.60" y1="50.00" x2="-99.60" y2="72.52" className="ext-line" />
            <line x1="-13.00" y1="122.52" x2="-99.60" y2="72.52" className="dim-line" />
            <line x1="-13.91" y1="119.14" x2="-12.09" y2="125.90" className="tick" />
            <line x1="-100.51" y1="69.14" x2="-98.69" y2="75.90" className="tick" />
            <text
              x="-56.30"
              y="97.52"
              className="dim-text"
              transform="rotate(30.00 -56.30 97.52)"
              textAnchor="middle"
              dy="-4"
            >
              12'-0"
            </text>
          </g>
          <g className="dim">
            <line x1="-86.60" y1="50.00" x2="-112.60" y2="50.00" className="ext-line" />
            <line x1="-86.60" y1="-50.00" x2="-112.60" y2="-50.00" className="ext-line" />
            <line x1="-112.60" y1="50.00" x2="-112.60" y2="-50.00" className="dim-line" />
            <line x1="-115.07" y1="52.47" x2="-110.13" y2="47.53" className="tick" />
            <line x1="-115.07" y1="-47.53" x2="-110.13" y2="-52.47" className="tick" />
            <text
              x="-112.60"
              y="0.00"
              className="dim-text"
              transform="rotate(-90.00 -112.60 0.00)"
              textAnchor="middle"
              dy="-4"
            >
              12'-0"
            </text>
          </g>
          <line x1="-6.00" y1="0.00" x2="6.00" y2="0.00" className="center-mark" />
          <line x1="0.00" y1="-6.00" x2="0.00" y2="6.00" className="center-mark" />
        </g>
      </svg>
    </div>
  );
}
