// Makes a non-button element (chip, thumbnail) clickable and keyboard-reachable
// without changing how it looks.
export default function pressable(onPress) {
  return {
    role: 'button',
    tabIndex: 0,
    onClick: onPress,
    onKeyDown: (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        onPress()
      }
    },
  }
}
