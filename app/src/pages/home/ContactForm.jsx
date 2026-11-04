import { useEffect, useRef, useState } from 'react'

const INBOX = 'hello@littledevlab.com'
const SUBJECT = 'New message from littledevlab.com'

// Sends through FormSubmit (no backend needed). The first-ever submission
// triggers a one-time confirmation email to hello@littledevlab.com; after
// that, messages land in the inbox. If the request fails (offline, blocked),
// fall back to the visitor's own email app with the message filled in, so a
// message is never silently lost.
//
// Without JavaScript the form still works: it posts to FormSubmit directly
// (action/method below), which shows its own thank-you page.
export default function ContactForm() {
  const [status, setStatus] = useState('idle') // idle | sending | sent | mailto
  const resetTimer = useRef(null)
  useEffect(() => () => clearTimeout(resetTimer.current), [])

  async function handleSubmit(e) {
    e.preventDefault()
    const form = e.currentTarget
    const payload = {
      name: form.elements.name.value,
      email: form.elements.email.value,
      interest: form.elements.interest.selectedOptions[0]?.text ?? '',
      message: form.elements.message.value,
      _subject: SUBJECT,
      _template: 'table',
      _replyto: form.elements.email.value,
    }
    setStatus('sending')
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${INBOX}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('FormSubmit request failed')
      setStatus('sent')
      form.reset()
    } catch {
      const body = `${payload.message}\n\n— ${payload.name} (${payload.email})\nInterested in: ${payload.interest || 'n/a'}`
      window.location.href = `mailto:${INBOX}?subject=${encodeURIComponent(SUBJECT)}&body=${encodeURIComponent(body)}`
      setStatus('mailto')
    } finally {
      clearTimeout(resetTimer.current)
      resetTimer.current = setTimeout(() => setStatus('idle'), 3500)
    }
  }

  const label = { idle: 'Send Message', sending: 'Sending…', sent: 'Sent! ✓', mailto: 'Opening email…' }[status]

  return (
    <form action={`https://formsubmit.co/${INBOX}`} method="POST" onSubmit={handleSubmit}>
      <input type="hidden" name="_subject" value={SUBJECT} />
      <input type="hidden" name="_template" value="table" />
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          {' '}
          <input type="text" id="name" name="name" placeholder="Your name" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          {' '}
          <input type="email" id="email" name="email" placeholder="you@example.com" required />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="interest">I'm interested in…</label>
        {' '}
        <select id="interest" name="interest" defaultValue="">
          <option value="">Select a product or topic</option>
          <option value="glasses-holder">Glasses + Contact Lens Holder</option>
          <option value="coaster-round">Chilewich Coaster Holder (Round)</option>
          <option value="coaster-hex">Chilewich Coaster Holder (Hexagonal)</option>
          <option value="custom">Custom Design Request</option>
          <option value="other">Something else</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="message">Message</label>
        {' '}
        <textarea id="message" name="message" placeholder="Tell me what you need — quantity, color, any custom details…" required></textarea>
      </div>
      <button
        type="submit"
        className="btn btn-primary form-submit"
        disabled={status !== 'idle'}
        style={status === 'sent' ? { background: '#2d6a4f' } : undefined}
        aria-live="polite"
      >
        {label}
      </button>
    </form>
  )
}
