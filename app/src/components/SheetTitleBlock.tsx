export interface TitleBlockRow {
  label: string;
  value: string;
}

/** The drafting-style title block that closes several pages. */
export function SheetTitleBlock({ rows }: { rows: TitleBlockRow[] }) {
  return (
    <div className="sheet-titleblock">
      <div className="container">
        <div className="titleblock">
          {rows.map((r) => (
            <div key={r.label}>
              <span className="label">{r.label}</span>
              {r.value}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Shared by the home and products pages. */
export const SITE_TITLE_BLOCK: TitleBlockRow[] = [
  { label: 'Title', value: 'LittleDevLab' },
  { label: 'Material', value: 'PLA+ · Custom Colors' },
  { label: 'Scale', value: 'Designed to Fit' },
  { label: 'Dr. No.', value: 'littledevlab.com' },
];
