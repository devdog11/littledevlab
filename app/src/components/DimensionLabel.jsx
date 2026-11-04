import useDimension from './useDimension.js'

// <span class="bp-dim bp-dim--x ..."><span>520</span></span>, decorative.
export default function DimensionLabel({ target, axis = 'x', className = '' }) {
  const size = useDimension(target, axis)
  return (
    <span className={`bp-dim bp-dim--${axis} ${className}`.trim()} aria-hidden="true">
      <span>{size}</span>
    </span>
  )
}
