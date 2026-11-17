import { useEffect, useRef, useState } from 'react';
import { Check, Copy, Mail, Send, Sparkles } from 'lucide-react';
import { socials } from '../data/content';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';
import SocialLinks from './SocialLinks';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const copyTimer = useRef(null);
  const submitTimer = useRef(null);
  const successRef = useRef(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('sent') === '1') {
      setSent(true);
      params.delete('sent');
      const query = params.toString();
      try {
        window.history.replaceState(
          null,
          '',
          `${window.location.pathname}${query ? `?${query}` : ''}${window.location.hash}`,
        );
      } catch {
        /* History is best-effort on file URLs. */
      }
    }
  }, []);

  useEffect(() => {
    if (!sent || !successRef.current) return;

    successRef.current.focus({ preventScroll: true });
    successRef.current.scrollIntoView({ block: 'center' });
  }, [sent]);

  useEffect(() => {
    const onPageShow = () => {
      window.clearTimeout(submitTimer.current);
      setSubmitting(false);
    };
    window.addEventListener('pageshow', onPageShow);
    return () => window.removeEventListener('pageshow', onPageShow);
  }, []);

  useEffect(
    () => () => {
      window.clearTimeout(copyTimer.current);
      window.clearTimeout(submitTimer.current);
    },
    [],
  );

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(socials.email);
      setCopied(true);
      window.clearTimeout(copyTimer.current);
      copyTimer.current = window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${socials.email}`;
    }
  };

  const formNext =
    typeof window !== 'undefined'
      ? `${window.location.origin}/?sent=1#contact`
      : 'https://himanshurathiportfolio.netlify.app/?sent=1#contact';

  const handleSubmit = (event) => {
    if (submitting) {
      event.preventDefault();
      return;
    }

    setSubmitting(true);
    window.clearTimeout(submitTimer.current);
    submitTimer.current = window.setTimeout(() => setSubmitting(false), 15000);
  };

  return (
    <section id="contact" className="section contact-section" aria-labelledby="contact-title">
      <div className="contact-atmosphere" aria-hidden="true">
        <span className="contact-glow" />
        <span className="contact-asterisk">✳</span>
        <span className="contact-grid-lines" />
      </div>

      <div className="container contact-inner">
        <SectionHeading
          index="07"
          eyebrow="Contact"
          id="contact-title"
          className="contact-heading"
          title={
            <>
              Have an <em>idea?</em>
              <br />
              Let&apos;s make it <span className="contact-highlight">happen.</span>
            </>
          }
          description="A project, a role, a collaboration, or just a good conversation — my inbox is open."
        />

        <div className="contact-layout">
          <Reveal className="contact-left" delay={0.05}>
            <div className="availability-card">
              <span className="availability-status">
                <span className="availability-dot" aria-hidden="true" />
                Available for work
              </span>
              <p>
                Open to internships &amp; collaborations. Usually replies within 12–24 hours.
              </p>
            </div>

            <div className="contact-email-block">
              <span className="contact-small-label">Start with an email</span>
              <a className="contact-email" href={socials.emailCompose} target="_blank" rel="noopener noreferrer">
                <Mail size={20} strokeWidth={1.7} aria-hidden="true" />
                {socials.email}
              </a>
              <button type="button" className="copy-email" onClick={copyEmail}>
                {copied ? (
                  <>
                    <Check size={14} strokeWidth={2.4} aria-hidden="true" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy size={14} strokeWidth={1.9} aria-hidden="true" />
                    Copy email
                  </>
                )}
              </button>
              <span className="sr-only" role="status">
                {copied ? 'Email address copied to clipboard.' : ''}
              </span>
            </div>

            <div className="contact-social-block">
              <span className="contact-small-label">Find me elsewhere</span>
              <SocialLinks labels />
            </div>

            <div className="contact-quote">
              <Sparkles size={17} strokeWidth={1.7} aria-hidden="true" />
              <p>Whether it&apos;s code, content or community — let&apos;s make something worth sharing.</p>
            </div>
          </Reveal>

          <Reveal className="contact-form-card" delay={0.12}>
            <div className="contact-form-head">
              <span className="contact-form-kicker">Send a message</span>
              <h3 id="contact-form-title">Tell me what you&apos;re building.</h3>
            </div>

            {sent ? (
              <p className="form-success" role="status" ref={successRef} tabIndex={-1}>
                <Check size={16} strokeWidth={2.4} aria-hidden="true" />
                Thanks! Your message has been sent. I&apos;ll get back to you soon.
              </p>
            ) : null}

            <form
              className="contact-form"
              id="contactForm"
              action="https://formsubmit.co/rathihimanshuu@gmail.com"
              method="POST"
              aria-labelledby="contact-form-title"
              aria-busy={submitting}
              onSubmit={handleSubmit}
            >
              <input type="hidden" name="_subject" value="New message from your portfolio" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_next" value={formNext} />
              <input
                type="hidden"
                name="_blacklist"
                value="buy followers, crypto investment, casino, loan offer, seo services, backlinks"
              />
              <input
                className="form-honey"
                type="text"
                name="_honey"
                tabIndex="-1"
                autoComplete="off"
                aria-hidden="true"
              />

              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="cf-name">Your name</label>
                  <input
                    id="cf-name"
                    type="text"
                    name="name"
                    placeholder="Your name"
                    autoComplete="name"
                    required
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="cf-email">Email</label>
                  <input
                    id="cf-email"
                    type="email"
                    name="email"
                    placeholder="you@company.com"
                    autoComplete="email"
                    required
                  />
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="cf-phone">
                  Phone <span>Optional</span>
                </label>
                <input
                  id="cf-phone"
                  type="tel"
                  name="phone"
                  placeholder="+91 00000 00000"
                  autoComplete="tel"
                  inputMode="tel"
                />
              </div>

              <div className="form-field">
                <label htmlFor="cf-message">Your message</label>
                <textarea
                  id="cf-message"
                  name="message"
                  rows="5"
                  placeholder="What are we making happen?"
                  required
                />
              </div>

              <p className="sr-only" role="status">
                {submitting ? 'Sending your message.' : ''}
              </p>
              <button
                type="submit"
                className="btn btn-primary form-submit"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    Sending
                    <span className="submit-spinner" aria-hidden="true" />
                  </>
                ) : (
                  <>
                    Send message
                    <Send size={16} strokeWidth={2} aria-hidden="true" />
                  </>
                )}
              </button>
              <p className="form-note">
                Your details are only used to reply. No newsletters, no spam.
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
