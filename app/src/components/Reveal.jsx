import useReveal from './useReveal.js'

// A block that fades in the first time it scrolls into view (see useReveal).
export default function Reveal({ as: Tag = 'div', className = '', children, ...rest }) {
  const [ref, revealClass] = useReveal()
  return (
    <Tag ref={ref} className={className ? `${className} ${revealClass}` : revealClass} {...rest}>
      {children}
    </Tag>
  )
}
