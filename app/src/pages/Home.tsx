import { useState } from 'react';
import { Layout } from '../components/Layout';
import { Lightbox } from '../components/Lightbox';
import { ContactForm } from '../components/ContactForm';
import { SheetTitleBlock, SITE_TITLE_BLOCK } from '../components/SheetTitleBlock';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useHashScrollFix } from '../hooks/useHashScrollFix';

const GALLERY = [
  { src: '/images/glasses/glasses-holder-counter.jpg', alt: 'Glasses holder on marble counter', label: 'Glasses Holder' },
  { src: '/images/coasters/coaster-hex-holder.jpg', alt: 'Hexagonal coaster holder', label: 'Hex Coaster Holder' },
  { src: '/images/coasters/coaster-cuff-black.jpg', alt: 'Cuff style coaster holder in black', label: 'Cuff Holder · Black' },
  { src: '/images/glasses/glasses-holder-side.jpg', alt: 'Glasses holder side angle', label: 'Glasses Holder · Side' },
  { src: '/images/coasters/coaster-round-side.jpg', alt: 'Round coaster holder side view', label: 'Round Holder · Side' },
  { src: '/images/glasses/glasses-holder-top.jpg', alt: 'Glasses holder top view showing all compartments', label: 'Glasses Holder · Top' },
  { src: '/images/coasters/coaster-hex-top.jpg', alt: 'Hexagonal coaster holder top view', label: 'Hex Holder · Top' },
  { src: '/images/coasters/coaster-hex-angle.jpg', alt: 'Hexagonal coaster holder angled', label: 'Hex Holder · Angle' },
  { src: '/images/gaming-card-display/card-holder-left.png', alt: 'Trading card display rack loaded with booster packs', label: 'Trading Card Display Rack' },
];

export default function Home() {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  useScrollReveal();
  useHashScrollFix();

  return (
    <Layout
      current="home"
      after={<Lightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />}
    >
      <section className="hero" id="home">
        <div className="hero-content">
          <p className="hero-eyebrow">SF Bay Area · Dev’d by a curious engineer</p>
          <h1>
            A <em>little dev</em>.<br />A <em>little lab</em>.<br />A lot of “why doesn’t this
            exist?”
          </h1>
          <p className="hero-sub">
            I design useful, oddly specific organizers and home goods around real objects, test them
            in real life, and make them to order.
          </p>
          <p className="hero-sub">
            LittleDevLab is also where I’m learning by building—with 3D design, Python, AI,
            automation, and whatever problem catches my attention next. I document what works, what
            doesn’t, and what I break along the way.
          </p>
          <div className="hero-actions">
            <a href="/products.html" className="btn btn-primary">
              See What I’ve Made
            </a>
            <a href="/lab-notes/index.html" className="btn btn-ghost">
              Enter the Lab
            </a>
          </div>
          <div className="hero-badges">
            <div className="hero-badge-item">
              <div className="hero-badge-num">100%</div>
              <div className="hero-badge-label">Custom designed</div>
            </div>
            <div className="hero-badge-item">
              <div className="hero-badge-num">PLA+</div>
              <div className="hero-badge-label">Premium filament</div>
            </div>
            <div className="hero-badge-item">
              <div className="hero-badge-num">∞</div>
              <div className="hero-badge-label">Color options</div>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-photo-grid">
            <img
              src="/images/glasses/glasses-holder-counter.jpg"
              alt="Glasses and contact lens holder on countertop"
            />
            <img src="/images/coasters/coaster-round-tan.jpg" alt="Chilewich coaster holder in tan" />
            <img
              src="/images/coasters/coaster-hex-holder.jpg"
              alt="Hexagonal Chilewich coaster holder"
            />
          </div>
        </div>
      </section>

      <section id="process">
        <div className="container">
          <div className="section-header">
            <span className="tag">How It's Made</span>
            <h2>Tangible Developments</h2>
            <p>
              I never learned to whittle. I did, however, spend years imagining things I wished
              existed. Then 3D printers showed up and suddenly all that engineering, drafting, and
              "there has to be a better way to make this" had somewhere to go. Now AI has made the
              gap between random thought and actual object wonderfully small. A few words. Maybe a
              Python script. Possibly a sketch on paper. A little engineering. Then… print. Turns
              out I didn't need a pocketknife. I needed a robot that melts plastic.
            </p>
          </div>
          <div className="process-grid">
            <div className="process-card">
              <div className="process-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
                </svg>
              </div>
              <h4>Designed in Shapr3D</h4>
              <p>
                Every model is built from scratch using Shapr3D on iPad Pro — parametric 3D CAD, not
                guesswork. Dimensions are measured against the real product before a single layer is
                printed.
              </p>
            </div>
            <div className="process-card">
              <div className="process-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="3" width="20" height="14" rx="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
              </div>
              <h4>Sliced & Optimized</h4>
              <p>
                Files are prepped in Bambu Studio — layer heights, wall counts, and infill are tuned
                per part geometry. Functional parts like the glasses cradle get extra perimeters for
                strength where it counts.
              </p>
            </div>
            <div className="process-card">
              <div className="process-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <h4>Printed on Bambu Lab</h4>
              <p>
                Printed on a Bambu Lab X1 Carbon using PLA+ filament. Fast, accurate, and consistent
                across every run — what you see in the photos is what arrives in the mail.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="about">
        <div className="container">
          <div className="about-grid">
            <div className="about-image-stack">
              <img
                src="/images/coasters/coaster-round-tan.jpg"
                alt="Chilewich coaster holder on walnut table"
              />
              <img
                src="/images/glasses/glasses-holder-cabinet.jpg"
                alt="Glasses holder mounted under cabinet"
              />
            </div>
            <div className="about-content">
              <span className="tag">About LittleDevLab</span>
              <h2>Built by someone who couldn't find what they needed, so they made it.</h2>
              <p>
                LittleDevLab started the way most good projects do — out of frustration. The glasses
                and contacts holder came first: an attempt to clear counter clutter without buying a
                plastic organizer that almost-fit. One model, one print, one problem solved.
              </p>
              <p>
                The Chilewich coaster holders came from the same instinct. The coasters were too
                nice to leave in a pile, and nothing on the market held the hexagonal shape well. So
                the holder was designed around the coasters themselves — not the other way around.
              </p>
              <p>
                Based in the SF Bay Area. Every piece is designed, printed, and quality-checked here
                before it ships. If you have a specific product, shape, or problem you want solved,
                reach out — that's the fun part.
              </p>
              <div className="about-stats">
                <div className="stat-item">
                  <div className="stat-num">20+</div>
                  <div className="stat-label">Designs printed</div>
                </div>
                <div className="stat-item">
                  <div className="stat-num">100%</div>
                  <div className="stat-label">Made in Bay Area</div>
                </div>
                <div className="stat-item">
                  <div className="stat-num">0</div>
                  <div className="stat-label">Template downloads</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="gallery">
        <div className="container">
          <div className="section-header">
            <span className="tag">Gallery</span>
            <h2>All the angles</h2>
            <p>Click any image to view full size.</p>
          </div>
          <div className="gallery-grid">
            {GALLERY.map((item) => (
              <div className="gallery-item" key={item.src} onClick={() => setLightboxSrc(item.src)}>
                <img src={item.src} alt={item.alt} loading="lazy" />
                <div className="overlay">
                  <span>{item.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="custom">
        <div className="container">
          <div className="custom-inner">
            <div>
              <h2>Have something specific in mind?</h2>
              <p>
                If you have a product you love but can't find the right holder, stand, or organizer
                for — there's a good chance it can be designed and printed. Send a message with the
                details and let's figure it out.
              </p>
            </div>
            <div className="custom-actions">
              <a href="#contact" className="btn btn-ghost">
                Start a Custom Order
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="lab-journey">
        <div className="container">
          <div className="journey-grid">
            <div className="journey-image">
              <img
                src="/images/profile/3DPrint_Tyson_Transparent.png"
                alt="Tyson at the Bambu Lab X1 Carbon printer that makes every LittleDevLab piece"
                loading="lazy"
              />
            </div>
            <div className="about-content">
              <span className="tag">Lab Journey</span>
              <h2>Building this in public, one skill at a time</h2>
              <p>
                LittleDevLab is the shop, but it's also the lab. Every page here doubles as practice
                for the skills behind AI/Data Architect work — prompt and context engineering,
                agentic workflows, and the judgment calls that come with directing an AI coworker on
                a live production site.
              </p>
              <p>
                <strong>Build Log</strong> is the day-to-day record — what shipped on the site,
                logged roughly twice a day, in plain terms. <strong>Lab Notes</strong> is the slower
                reflection — what actually got learned building it, wins and dead ends included.
              </p>
              <div className="journey-links">
                <a href="/lab-notes/index.html" className="btn btn-ghost">
                  Read Lab Notes
                </a>
                <a href="/build-log.html" className="btn btn-ghost">
                  View Build Log
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact">
        <div className="container">
          <div className="section-header">
            <span className="tag">Contact</span>
            <h2>Get in touch</h2>
            <p>
              Order an existing design, request a custom piece, or just ask a question. Usually
              respond within 24 hours.
            </p>
          </div>
          <div className="contact-grid">
            <div className="contact-info">
              <h3>Let's make something</h3>
              <p>
                Whether you want to order one of the products above, need a specific color or size
                variation, or have a completely new idea — the form is the fastest way to get a
                conversation started.
              </p>
              <ul className="contact-links">
                <li>
                  <a href="mailto:hello@littledevlab.com">
                    <span className="icon-wrap">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                    </span>
                    hello@littledevlab.com
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.etsy.com/shop/LittleDevLab?ref=dashboard-header"
                    target="_blank"
                    rel="noopener"
                  >
                    <span className="icon-wrap">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="9" cy="21" r="1" />
                        <circle cx="20" cy="21" r="1" />
                        <path d="M1 1h4l2.68 13.39a2 2 0 001.93 1.61h9.72a2 2 0 001.93-1.61L23 6H6" />
                      </svg>
                    </span>
                    Shop on Etsy
                  </a>
                </li>
                <li>
                  <a href="https://github.com" target="_blank" rel="noopener">
                    <span className="icon-wrap">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
                      </svg>
                    </span>
                    GitHub
                  </a>
                </li>
                <li>
                  <a href="https://linkedin.com" target="_blank" rel="noopener">
                    <span className="icon-wrap">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
                        <rect x="2" y="9" width="4" height="12" />
                        <circle cx="4" cy="4" r="2" />
                      </svg>
                    </span>
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>

      <SheetTitleBlock rows={SITE_TITLE_BLOCK} />
    </Layout>
  );
}
