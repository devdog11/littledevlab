// Date and time helpers shared by the build step and the browser. Formatting
// is done by hand (not Intl/toLocaleDateString) so the pre-rendered text and
// the browser's first render always match, whatever the visitor's locale.
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const parts = (iso) => iso.split('-').map(Number)

// "2026-10-01" -> "October 1, 2026"
export function longDate(iso) {
  const [y, m, d] = parts(iso)
  return `${MONTHS[m - 1]} ${d}, ${y}`
}

// "2026-10-01" -> "Oct 1, 2026"
export function shortDate(iso) {
  const [y, m, d] = parts(iso)
  return `${MONTHS[m - 1].slice(0, 3)} ${d}, ${y}`
}

// "5:18 PM", "17:40 PDT", "23:15" -> minutes after midnight, for sorting.
export function minutesOf(time = '') {
  const m = /(\d{1,2}):(\d{2})\s*(AM|PM)?/i.exec(time)
  if (!m) return 0
  let h = Number(m[1])
  const ampm = m[3]?.toUpperCase()
  if (ampm === 'PM' && h < 12) h += 12
  if (ampm === 'AM' && h === 12) h = 0
  return h * 60 + Number(m[2])
}

// Newest first: by date, then time of day.
export function newestFirst(a, b) {
  if (a.date !== b.date) return a.date < b.date ? 1 : -1
  return minutesOf(b.time) - minutesOf(a.time)
}
