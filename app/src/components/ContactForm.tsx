import { useEffect, useRef, useState, type FormEvent } from 'react';

const ENDPOINT = 'https://formsubmit.co/ajax/hello@littledevlab.com';
const SUBJECT = 'New message from littledevlab.com';

type Status = 'idle' | 'sending' | 'sent' | 'fallback';

const LABEL: Record<Status, string> = {
  idle: 'Send Message',
  sending: 'Sending…',
  sent: 'Sent! ✓',
  fallback: 'Opening email…',
};

/**
 * Posts to FormSubmit, which needs no backend. If the request itself fails
 * (offline, blocked) fall back to opening the visitor's own mail client with
 * the message pre-filled, so a message is never silently lost.
 */
export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const formRef = useRef<HTMLFormElement>(null);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const resetSoon = () => {
    timer.current = window.setTimeout(() => setStatus('idle'), 3500);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const interest = form.elements.namedItem('interest') as HTMLSelectElement | null;

    const payload = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      interest: interest?.selectedOptions[0]?.text ?? '',
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
      _subject: SUBJECT,
      _template: 'table',
      _replyto: (form.elements.namedItem('email') as HTMLInputElement).value,
    };

    setStatus('sending');
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('FormSubmit request failed');
      setStatus('sent');
      form.reset();
    } catch {
      const body = `${payload.message}\n\n— ${payload.name} (${payload.email})\nInterested in: ${payload.interest || 'n/a'}`;
      window.location.href = `mailto:hello@littledevlab.com?subject=${encodeURIComponent(SUBJECT)}&body=${encodeURIComponent(body)}`;
      setStatus('fallback');
    } finally {
      resetSoon();
    }
  };

  return (
    <div className="contact-form">
      <form ref={formRef} onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" placeholder="Your name" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" placeholder="you@example.com" required />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="interest">I'm interested in…</label>
          <select id="interest" name="interest">
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
          <textarea
            id="message"
            name="message"
            placeholder="Tell me what you need — quantity, color, any custom details…"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="btn btn-primary form-submit"
          disabled={status !== 'idle'}
          style={status === 'sent' ? { background: '#2d6a4f' } : undefined}
        >
          {LABEL[status]}
        </button>
      </form>
    </div>
  );
}
