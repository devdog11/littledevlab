import type { CSSProperties } from 'react';

export interface VariantOption {
  label: string;
  /** Omitted for inert chips like "Custom Color" or "coming soon" sizes. */
  onSelect?: () => void;
}

const TAG_STYLE: CSSProperties = {
  fontSize: '.7rem',
  marginBottom: '8px',
  display: 'block',
  width: '100%',
};

interface VariantGroupProps {
  label: string;
  options: VariantOption[];
  selected: string;
  onChange: (label: string) => void;
  tagStyle?: CSSProperties;
}

export function VariantGroup({ label, options, selected, onChange, tagStyle }: VariantGroupProps) {
  return (
    <>
      <span className="tag" style={{ ...TAG_STYLE, ...tagStyle }}>
        {label}
      </span>
      {options.map((o) => (
        <span
          key={o.label}
          className={`variant-chip${o.label === selected ? ' active' : ''}`}
          onClick={() => {
            onChange(o.label);
            o.onSelect?.();
          }}
        >
          {o.label}
        </span>
      ))}
    </>
  );
}
